import { processAiSetupJob } from '../../lib/ai/ai-setup-job-runner';

type WorkerRequestPayload = {
  jobId?: string;
};

export default async (request: Request) => {
  const expectedSecret = process.env.AI_SETUP_JOB_SECRET;
  const providedSecret = request.headers.get('x-ai-setup-job-secret');

  if (expectedSecret && providedSecret !== expectedSecret) {
    return new Response('Unauthorized', { status: 401 });
  }

  let payload: WorkerRequestPayload;

  try {
    payload = (await request.json()) as WorkerRequestPayload;
  } catch {
    return new Response('Invalid JSON payload.', { status: 400 });
  }

  if (!payload.jobId) {
    return new Response('jobId is required.', { status: 400 });
  }

  await processAiSetupJob(payload.jobId);
  return new Response('Accepted', { status: 202 });
};
