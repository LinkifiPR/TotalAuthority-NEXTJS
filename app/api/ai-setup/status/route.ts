import { NextRequest, NextResponse } from 'next/server';
import { getAiSetupJob } from '@/lib/ai/ai-setup-job-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const jobId = request.nextUrl.searchParams.get('jobId')?.trim();

  if (!jobId) {
    return NextResponse.json(
      {
        error: 'jobId is required.',
      },
      { status: 400 },
    );
  }

  const job = await getAiSetupJob(jobId);

  if (!job) {
    return NextResponse.json(
      {
        error: 'Job not found or expired.',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    jobId: job.id,
    status: job.status,
    stepIndex: job.stepIndex,
    stepLabel: job.stepLabel,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    warnings: job.warnings,
    error: job.error,
    result: job.result,
  });
}
