import { describe, it, expect } from "vitest";
import { answerToJSON, answerFromJSON } from "../serialize";
import type { Answer } from "../types";

const SAMPLE: Answer = {
  answer: "5000000000",
  slot: 302000000,
  receipt: {
    node: "elgon1qtest",
    stateCommitment: "0xabcdef",
    sig: "0x112233",
  },
};

describe("serialization", () => {
  it("round-trips through JSON", () => {
    const json = answerToJSON(SAMPLE);
    const restored = answerFromJSON(json);
    expect(restored).toEqual(SAMPLE);
  });

  it("produces valid JSON string", () => {
    const json = answerToJSON(SAMPLE);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it("throws on invalid JSON", () => {
    expect(() => answerFromJSON("{}")).toThrow("missing required");
  });

  it("throws on missing slot", () => {
    expect(() => answerFromJSON(JSON.stringify({ answer: "1" }))).toThrow();
  });
});
