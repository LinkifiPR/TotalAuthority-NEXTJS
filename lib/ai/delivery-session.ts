import type { AiSetupRequest, AiSetupResponse } from '@/lib/types/ai-setup';

export const DELIVERY_SESSION_STORAGE_PREFIX = 'ta-ai-setup-delivery:';
const DELIVERY_SESSION_TTL_MS = 4 * 60 * 60 * 1000;

export interface DeliverySessionPayload {
  createdAt: string;
  status: 'pending' | 'completed';
  request?: AiSetupRequest;
  result?: AiSetupResponse;
}

function getStorageKey(sessionId: string): string {
  return `${DELIVERY_SESSION_STORAGE_PREFIX}${sessionId}`;
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

  window.sessionStorage.setItem(getStorageKey(sessionId), JSON.stringify(payload));

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

  window.sessionStorage.setItem(getStorageKey(sessionId), JSON.stringify(payload));

  return sessionId;
}

export function writeDeliverySessionResult(sessionId: string, result: AiSetupResponse): void {
  if (typeof window === 'undefined') {
    return;
  }

  const existing = safeParsePayload(window.sessionStorage.getItem(getStorageKey(sessionId)));
  const payload: DeliverySessionPayload = {
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    status: 'completed',
    request: existing?.request,
    result,
  };

  window.sessionStorage.setItem(getStorageKey(sessionId), JSON.stringify(payload));
}

export function readDeliverySessionPayload(sessionId: string): DeliverySessionPayload | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const payload = safeParsePayload(window.sessionStorage.getItem(getStorageKey(sessionId)));

  if (!payload) {
    return null;
  }

  const createdAtMs = new Date(payload.createdAt).getTime();
  if (!Number.isFinite(createdAtMs) || Date.now() - createdAtMs > DELIVERY_SESSION_TTL_MS) {
    window.sessionStorage.removeItem(getStorageKey(sessionId));
    return null;
  }

  return payload;
}

export function readDeliverySession(sessionId: string): AiSetupResponse | null {
  const payload = readDeliverySessionPayload(sessionId);
  return payload?.result ?? null;
}
