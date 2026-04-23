import { runAiSetupPipeline } from './ai-setup-pipeline';
import { getAiSetupJob, updateAiSetupJob } from './ai-setup-job-store';

export async function processAiSetupJob(jobId: string): Promise<void> {
  const existing = await getAiSetupJob(jobId);

  if (!existing) {
    return;
  }

  await updateAiSetupJob(jobId, (record) => ({
    ...record,
    status: 'running',
    stepIndex: 0,
    stepLabel: 'Scanning your website',
    error: undefined,
  }));

  try {
    const result = await runAiSetupPipeline(
      existing.request,
      {},
      async (progress) => {
        await updateAiSetupJob(jobId, (record) => ({
          ...record,
          status: 'running',
          stepIndex: progress.stepIndex,
          stepLabel: progress.label,
        }));
      },
    );

    await updateAiSetupJob(jobId, (record) => ({
      ...record,
      status: 'completed',
      stepIndex: 3,
      stepLabel: 'Delivery pack ready',
      warnings: result.meta.warnings,
      result,
      error: undefined,
    }));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'The AI setup job failed unexpectedly while processing.';

    await updateAiSetupJob(jobId, (record) => ({
      ...record,
      status: 'failed',
      stepIndex: 0,
      stepLabel: 'Generation failed',
      error: message,
    }));
  }
}
