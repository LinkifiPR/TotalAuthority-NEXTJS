import { NextRequest, NextResponse } from 'next/server';
import { createAiSetupJob, writeAiSetupJob } from '@/lib/ai/ai-setup-job-store';
import { processAiSetupJob } from '@/lib/ai/ai-setup-job-runner';
import { normalizeWebsiteUrl } from '@/lib/site/fetch-pages';
import { AiSetupRequestSchema } from '@/lib/types/ai-setup';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WORKER_DISPATCH_TIMEOUT_MS = 4_000;

async function triggerBackgroundWorker(jobId: string, request: NextRequest): Promise<boolean> {
  const origin = request.nextUrl.origin;
  const workerUrl = `${origin}/.netlify/functions/ai-setup-worker-background`;
  const workerSecret = process.env.AI_SETUP_JOB_SECRET;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WORKER_DISPATCH_TIMEOUT_MS);

  try {
    const response = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(workerSecret ? { 'x-ai-setup-job-secret': workerSecret } : {}),
      },
      body: JSON.stringify({ jobId }),
      signal: controller.signal,
      cache: 'no-store',
    });

    return response.ok || response.status === 202;
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

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
    normalizeWebsiteUrl(parsedRequest.data.url);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Please enter a valid URL.',
      },
      { status: 400 },
    );
  }

  const job = await createAiSetupJob(parsedRequest.data);
  const dispatched = await triggerBackgroundWorker(job.id, request);

  if (!dispatched) {
    await writeAiSetupJob({
      ...job,
      warnings: [
        ...job.warnings,
        'Background worker was unavailable on this environment. Job is running on the API node process.',
      ],
    });
    void processAiSetupJob(job.id);
  }

  return NextResponse.json(
    {
      jobId: job.id,
      status: job.status,
    },
    { status: 202 },
  );
}
