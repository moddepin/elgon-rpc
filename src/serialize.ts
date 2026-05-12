import type { Answer } from "./types";

export function answerToJSON(answer: Answer): string {
  return JSON.stringify({
    answer: answer.answer,
    slot: answer.slot,
    receipt: {
      node: answer.receipt.node,
      stateCommitment: answer.receipt.stateCommitment,
      sig: answer.receipt.sig,
    },
  });
}

export function answerFromJSON(json: string): Answer {
  const parsed = JSON.parse(json);
  if (!parsed.answer || typeof parsed.slot !== "number" || !parsed.receipt) {
    throw new Error("Invalid Answer JSON: missing required fields");
  }
  return parsed as Answer;
}
