import { TimeoutError, NetworkError } from "./errors";

export interface RetryOptions {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
}

const DEFAULTS: RetryOptions = {
  maxAttempts: 3,
  baseDelayMs: 200,
  maxDelayMs: 5000,
};

function jitteredDelay(attempt: number, opts: RetryOptions): number {
  const exp = Math.min(opts.baseDelayMs * 2 ** attempt, opts.maxDelayMs);
  return exp * (0.5 + Math.random() * 0.5);
}

function isRetryable(err: unknown): boolean {
  if (err instanceof TimeoutError) return true;
  if (err instanceof NetworkError) {
    const code = err.statusCode ?? 0;
    return code === 0 || code === 429 || code >= 500;
  }
  return false;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: Partial<RetryOptions> = {},
): Promise<T> {
  const merged = { ...DEFAULTS, ...opts };
  let lastErr: unknown;
  for (let i = 0; i < merged.maxAttempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isRetryable(err) || i === merged.maxAttempts - 1) throw err;
      await new Promise((r) => setTimeout(r, jitteredDelay(i, merged)));
    }
  }
  throw lastErr;
}
