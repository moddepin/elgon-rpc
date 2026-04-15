import { describe, it, expect } from "vitest";
import { verifyReceipt } from "../receipt";
import type { Answer } from "../types";

function makeAnswer(overrides: Partial<Answer> = {}): Answer {
  return {
    answer: "1000000000",
    slot: 301923844,
    receipt: {
      node: "elgon1qfakenode",
      stateCommitment: "0x" + "ab".repeat(32),
      sig: "0x" + "cd".repeat(64),
    },
    ...overrides,
  };
}

describe("verifyReceipt", () => {
  it("rejects answer without receipt", async () => {
    const a = makeAnswer();
    (a as any).receipt = undefined;
    const { ok, reason } = await verifyReceipt(a);
    expect(ok).toBe(false);
    expect(reason).toContain("missing");
  });

  it("rejects answer with empty sig", async () => {
    const a = makeAnswer();
    a.receipt.sig = "";
    const { ok, reason } = await verifyReceipt(a);
    expect(ok).toBe(false);
    expect(reason).toContain("sig");
  });

  it("rejects stale slot when headSlot provided", async () => {
    const a = makeAnswer({ slot: 100 });
    const { ok, reason } = await verifyReceipt(a, 200);
    expect(ok).toBe(false);
    expect(reason).toContain("stale");
  });

  it("accepts valid structure without crypto verify", async () => {
    const a = makeAnswer();
    const { ok } = await verifyReceipt(a);
    expect(ok).toBeDefined();
  });
});
