import { z } from 'zod';
import { jsonrepair } from 'jsonrepair';

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

interface OpenRouterMessage {
  role: 'system' | 'user';
  content: string;
}

interface OpenRouterRequest {
  systemPrompt: string;
  userPrompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

function readResponseTextContent(content: unknown): string {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') {
          return part;
        }

        if (part && typeof part === 'object' && 'text' in part && typeof part.text === 'string') {
          return part.text;
        }

        return '';
      })
      .join('\n')
      .trim();
  }

  return '';
}

function extractJsonCandidate(rawContent: string): string {
  const fencedMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const firstBraceIndex = rawContent.indexOf('{');
  const lastBraceIndex = rawContent.lastIndexOf('}');

  if (firstBraceIndex !== -1 && lastBraceIndex !== -1 && lastBraceIndex > firstBraceIndex) {
    return rawContent.slice(firstBraceIndex, lastBraceIndex + 1).trim();
  }

  return rawContent.trim();
}

export async function callOpenRouter<T>(
  request: OpenRouterRequest,
  schema: z.ZodType<T>,
): Promise<T> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const configuredModel = process.env.OPENROUTER_MODEL;
  const model = request.model ?? configuredModel;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is missing.');
  }

  if (!model) {
    throw new Error('OPENROUTER_MODEL is missing.');
  }

  const messages: OpenRouterMessage[] = [
    { role: 'system', content: request.systemPrompt },
    { role: 'user', content: request.userPrompt },
  ];

  const timeoutMs = request.timeoutMs ?? 25_000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'https://totalauthority.com',
        'X-Title': 'Total Authority AI Setup Engine',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: request.temperature ?? 0.2,
        max_tokens: request.maxTokens ?? 2_800,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`OpenRouter request failed (${response.status}): ${responseText.slice(0, 400)}`);
    }

    const parsedPayload = z
      .object({
        choices: z
          .array(
            z.object({
              message: z.object({
                content: z.unknown(),
              }),
            }),
          )
          .min(1),
      })
      .safeParse(JSON.parse(responseText));

    if (!parsedPayload.success) {
      throw new Error('OpenRouter returned an unexpected response shape.');
    }

    const rawModelContent = readResponseTextContent(parsedPayload.data.choices[0].message.content);
    const candidateJson = extractJsonCandidate(rawModelContent);

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(candidateJson);
    } catch (parseError) {
      try {
        parsedJson = JSON.parse(jsonrepair(candidateJson));
      } catch {
        const snippet = candidateJson.slice(0, 400).replace(/\s+/g, ' ');
        throw new Error(`OpenRouter did not return valid JSON content. Snippet: ${snippet}`, {
          cause: parseError,
        });
      }
    }

    const validated = schema.safeParse(parsedJson);
    if (!validated.success) {
      throw new Error(`OpenRouter JSON failed schema validation: ${validated.error.message}`);
    }

    return validated.data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`OpenRouter request timed out after ${timeoutMs}ms.`);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('OpenRouter request failed for an unknown reason.');
  } finally {
    clearTimeout(timeoutId);
  }
}
