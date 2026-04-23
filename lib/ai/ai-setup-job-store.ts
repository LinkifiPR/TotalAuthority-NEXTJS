import { getStore } from '@netlify/blobs';
import type { AiSetupRequest, AiSetupResponse } from '../types/ai-setup';

export type AiSetupJobStatus = 'queued' | 'running' | 'completed' | 'failed';

export interface AiSetupJobRecord {
  id: string;
  status: AiSetupJobStatus;
  createdAt: string;
  updatedAt: string;
  request: AiSetupRequest;
  stepIndex: number;
  stepLabel: string;
  warnings: string[];
  result?: AiSetupResponse;
  error?: string;
}

const STORE_NAME = 'ai-setup-jobs-v1';
const MEMORY_JOB_TTL_MS = 6 * 60 * 60 * 1000;

type GlobalWithAiJobs = typeof globalThis & {
  __aiSetupJobs?: Map<string, AiSetupJobRecord>;
};

function getMemoryStore(): Map<string, AiSetupJobRecord> {
  const runtime = globalThis as GlobalWithAiJobs;

  if (!runtime.__aiSetupJobs) {
    runtime.__aiSetupJobs = new Map<string, AiSetupJobRecord>();
  }

  return runtime.__aiSetupJobs;
}

function cloneRecord(record: AiSetupJobRecord): AiSetupJobRecord {
  return JSON.parse(JSON.stringify(record)) as AiSetupJobRecord;
}

function pruneMemoryStore(): void {
  const store = getMemoryStore();
  const now = Date.now();

  for (const [jobId, record] of store.entries()) {
    const updatedAtMs = new Date(record.updatedAt).getTime();
    if (!Number.isFinite(updatedAtMs) || now - updatedAtMs > MEMORY_JOB_TTL_MS) {
      store.delete(jobId);
    }
  }
}

function getBlobStoreSafe() {
  try {
    return getStore(STORE_NAME);
  } catch {
    return null;
  }
}

function getBlobKey(jobId: string): string {
  return `job:${jobId}`;
}

export function createAiSetupJobId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function createAiSetupJob(request: AiSetupRequest): Promise<AiSetupJobRecord> {
  const now = new Date().toISOString();
  const record: AiSetupJobRecord = {
    id: createAiSetupJobId(),
    status: 'queued',
    createdAt: now,
    updatedAt: now,
    request,
    stepIndex: 0,
    stepLabel: 'Queued for processing',
    warnings: [],
  };

  await writeAiSetupJob(record);
  return cloneRecord(record);
}

export async function getAiSetupJob(jobId: string): Promise<AiSetupJobRecord | null> {
  if (!jobId) {
    return null;
  }

  const blobStore = getBlobStoreSafe();
  if (blobStore) {
    try {
      const data = await blobStore.get(getBlobKey(jobId), { type: 'json' });
      if (data && typeof data === 'object') {
        return cloneRecord(data as AiSetupJobRecord);
      }
    } catch {
      // Fall through to in-memory fallback.
    }
  }

  pruneMemoryStore();
  const memoryRecord = getMemoryStore().get(jobId);
  return memoryRecord ? cloneRecord(memoryRecord) : null;
}

export async function writeAiSetupJob(record: AiSetupJobRecord): Promise<void> {
  const normalized = cloneRecord(record);
  normalized.updatedAt = new Date().toISOString();

  const blobStore = getBlobStoreSafe();
  if (blobStore) {
    try {
      await blobStore.set(getBlobKey(normalized.id), JSON.stringify(normalized));
      return;
    } catch {
      // Fall through to in-memory fallback.
    }
  }

  pruneMemoryStore();
  getMemoryStore().set(normalized.id, normalized);
}

export async function updateAiSetupJob(
  jobId: string,
  updater: (record: AiSetupJobRecord) => AiSetupJobRecord,
): Promise<AiSetupJobRecord | null> {
  const existing = await getAiSetupJob(jobId);
  if (!existing) {
    return null;
  }

  const updated = updater(existing);
  await writeAiSetupJob(updated);
  return cloneRecord(updated);
}
