export interface Receipt {
  node: string;
  stateCommitment: string;
  sig: string;
}

export interface Answer {
  answer: string;
  slot: number;
  receipt: Receipt;
}

export interface RetryConfig {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
}

export interface ClientOptions {
  endpoint: string;
  accessToken?: string;
  retry?: RetryConfig;
  timeoutMs?: number;
}

export interface VerifyResult {
  ok: boolean;
  reason?: string;
}
