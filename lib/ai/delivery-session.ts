import type { AiSetupRequest, AiSetupResponse } from '@/lib/types/ai-setup';

export const DELIVERY_SESSION_STORAGE_PREFIX = 'ta-ai-setup-delivery:';
const DELIVERY_SESSION_TTL_MS = 4 * 60 * 60 * 1000;

export interface DeliverySessionPayload {
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  jobId?: string;
  request?: AiSetupRequest;
  result?: AiSetupResponse;
  error?: string;
}

type BrowserSessionStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function getStorageKey(sessionId: string): string {
  return `${DELIVERY_SESSION_STORAGE_PREFIX}${sessionId}`;
}

function getSessionStorage(): BrowserSessionStorage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function safeGetItem(sessionId: string): string | null {
  const storage = getSessionStorage();
  if (!storage) {
    return null;
  }

  try {
    return storage.getItem(getStorageKey(sessionId));
  } catch {
    return null;
  }
}

function safeSetPayload(sessionId: string, payload: DeliverySessionPayload): boolean {
  const storage = getSessionStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(getStorageKey(sessionId), JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

function safeRemoveItem(sessionId: string): void {
  const storage = getSessionStorage();
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(getStorageKey(sessionId));
  } catch {
    // Ignore browser storage failures; the session can be recreated.
  }
}

function safeParsePayload(value: string | null): DeliverySessionPayload | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as DeliverySessionPayload;

    if (!parsed || typeof parsed !== 'object' || !parsed.createdAt || !parsed.status) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function createDeliverySession(result: AiSetupResponse): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const sessionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  const payload: DeliverySessionPayload = {
    createdAt: new Date().toISOString(),
    status: 'completed',
    result,
  };

  if (!safeSetPayload(sessionId, payload)) {
    return '';
  }

  return sessionId;
}

export function createPendingDeliverySession(request: AiSetupRequest): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const sessionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  const payload: DeliverySessionPayload = {
    createdAt: new Date().toISOString(),
    status: 'pending',
    request,
  };

  if (!safeSetPayload(sessionId, payload)) {
    return '';
  }

  return sessionId;
}

export function writeDeliverySessionResult(sessionId: string, result: AiSetupResponse): void {
  if (typeof window === 'undefined') {
    return;
  }

  const existing = safeParsePayload(safeGetItem(sessionId));
  const payload: DeliverySessionPayload = {
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    status: 'completed',
    jobId: existing?.jobId,
    request: existing?.request,
    // The job store is the source of truth for generated assets. Keeping the
    // full pack out of browser storage avoids quota and WebContent memory spikes
    // at the exact moment generation completes.
    result: existing?.result && !existing.jobId ? result : undefined,
    error: undefined,
  };

  safeSetPayload(sessionId, payload);
}

export function writeDeliverySessionJob(sessionId: string, jobId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const existing = safeParsePayload(safeGetItem(sessionId));
  const payload: DeliverySessionPayload = {
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    status: 'processing',
    jobId,
    request: existing?.request,
    result: existing?.result,
    error: undefined,
  };

  safeSetPayload(sessionId, payload);
}

export function writeDeliverySessionError(sessionId: string, error: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const existing = safeParsePayload(safeGetItem(sessionId));
  const payload: DeliverySessionPayload = {
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    status: 'failed',
    jobId: existing?.jobId,
    request: existing?.request,
    result: existing?.result,
    error,
  };

  safeSetPayload(sessionId, payload);
}

export function readDeliverySessionPayload(sessionId: string): DeliverySessionPayload | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const payload = safeParsePayload(safeGetItem(sessionId));

  if (!payload) {
    return null;
  }

  const createdAtMs = new Date(payload.createdAt).getTime();
  if (!Number.isFinite(createdAtMs) || Date.now() - createdAtMs > DELIVERY_SESSION_TTL_MS) {
    safeRemoveItem(sessionId);
    return null;
  }

  return payload;
}

export function readDeliverySession(sessionId: string): AiSetupResponse | null {
  const payload = readDeliverySessionPayload(sessionId);
  return payload?.result ?? null;
}
