import { describe, it, expect, vi } from "vitest";
import { batchRead } from "../batch";
import type { Answer } from "../types";

function mockAnswer(value: string): Answer {
  return {
    answer: value,
    slot: 300000000,
    receipt: { node: "test", stateCommitment: "0x00", sig: "0x00" },
  };
}

describe("batchRead", () => {
  it("reads multiple items", async () => {
    const readFn = vi.fn().mockImplementation(async (req: any) =>
      mockAnswer(req.params[0])
    );
    const result = await batchRead(readFn, [
      { method: "getBalance", params: ["addr1"] },
      { method: "getBalance", params: ["addr2"] },
      { method: "getBalance", params: ["addr3"] },
    ]);
    expect(result.answers).toHaveLength(3);
    expect(result.failed).toHaveLength(0);
    expect(readFn).toHaveBeenCalledTimes(3);
  });

  it("captures failures without stopping others", async () => {
    const readFn = vi.fn()
      .mockResolvedValueOnce(mockAnswer("ok"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce(mockAnswer("ok2"));
    const result = await batchRead(readFn, [
      { method: "getBalance", params: ["a"] },
      { method: "getBalance", params: ["b"] },
      { method: "getBalance", params: ["c"] },
    ]);
    expect(result.answers).toHaveLength(2);
    expect(result.failed).toHaveLength(1);
    expect(result.failed[0].index).toBe(1);
  });

  it("respects concurrency limit", async () => {
    let concurrent = 0;
    let maxConcurrent = 0;
    const readFn = vi.fn().mockImplementation(async () => {
      concurrent++;
      maxConcurrent = Math.max(maxConcurrent, concurrent);
      await new Promise((r) => setTimeout(r, 10));
      concurrent--;
      return mockAnswer("x");
    });
    await batchRead(readFn, Array.from({ length: 10 }, (_, i) => ({
      method: "getBalance",
      params: [`addr${i}`],
    })), 3);
    expect(maxConcurrent).toBeLessThanOrEqual(3);
  });
});
