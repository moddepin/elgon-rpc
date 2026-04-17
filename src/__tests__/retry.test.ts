import { describe, it, expect, vi } from "vitest";
import { withRetry } from "../retry";
import { NetworkError, TimeoutError } from "../errors";

describe("withRetry", () => {
  it("returns on first success", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    const result = await withRetry(fn, { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 10 });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on NetworkError 500", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new NetworkError("fail", 500))
      .mockResolvedValue("ok");
    const result = await withRetry(fn, { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 10 });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("retries on TimeoutError", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new TimeoutError(5000))
      .mockResolvedValue("ok");
    const result = await withRetry(fn, { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 10 });
    expect(result).toBe("ok");
  });

  it("does not retry on 400", async () => {
    const fn = vi.fn().mockRejectedValue(new NetworkError("bad request", 400));
    await expect(withRetry(fn, { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 10 }))
      .rejects.toThrow("bad request");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("throws after max attempts", async () => {
    const fn = vi.fn().mockRejectedValue(new NetworkError("fail", 503));
    await expect(withRetry(fn, { maxAttempts: 2, baseDelayMs: 1, maxDelayMs: 10 }))
      .rejects.toThrow("fail");
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
