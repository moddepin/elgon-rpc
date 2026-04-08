export class ElgonError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "ElgonError";
  }
}

export class ReceiptVerificationError extends ElgonError {
  constructor(reason: string) {
    super(`Receipt verification failed: ${reason}`, "RECEIPT_INVALID");
    this.name = "ReceiptVerificationError";
  }
}

export class NetworkError extends ElgonError {
  constructor(message: string, public readonly statusCode?: number) {
    super(message, "NETWORK_ERROR");
    this.name = "NetworkError";
  }
}

export class TimeoutError extends ElgonError {
  constructor(ms: number) {
    super(`Request timed out after ${ms}ms`, "TIMEOUT");
    this.name = "TimeoutError";
  }
}
