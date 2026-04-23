import { NextRequest, NextResponse } from 'next/server';
import { runAiSetupPipeline } from '@/lib/ai/ai-setup-pipeline';
import { AiSetupRequestSchema } from '@/lib/types/ai-setup';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SYNC_ROUTE_OPTIONS = {
  fetchTimeoutMs: 2_500,
  discoveredFetchLimit: 4,
  sitemapFetchLimit: 2,
  modelTimeoutMs: 12_000,
  refinementTimeoutMs: 10_000,
  allowRefinement: false,
  requireLlm: true,
  preferredModel:
    process.env.OPENROUTER_RUNTIME_MODEL ??
    process.env.OPENROUTER_FALLBACK_MODEL ??
    process.env.OPENROUTER_MODEL ??
    'openai/gpt-4.1-mini',
} as const;

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: 'Invalid JSON body. Please submit valid request data.',
      },
      { status: 400 },
    );
  }

  const parsedRequest = AiSetupRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return NextResponse.json(
      {
        error: 'Invalid request payload.',
        details: parsedRequest.error.flatten(),
      },
      { status: 400 },
    );
  }

  try {
    const response = await runAiSetupPipeline(parsedRequest.data, SYNC_ROUTE_OPTIONS);
    return NextResponse.json(response);
  } catch (error) {
    console.error('AI setup route failed:', error);

    const message = error instanceof Error ? error.message : 'We could not complete the AI setup generation right now.';
    const isLlmError =
      message.includes('OpenRouter') ||
      message.includes('LLM strict mode') ||
      message.includes('OPENROUTER_');

    if (isLlmError) {
      return NextResponse.json(
        {
          error: `LLM generation failed and fallback is disabled: ${message}`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
