import type { Answer } from "./types";

export interface BatchItem {
  method: string;
  params: unknown[];
}

export interface BatchResult {
  answers: Answer[];
  failed: Array<{ index: number; error: string }>;
}

export async function batchRead(
  readFn: (req: { method: string; params: unknown[] }) => Promise<Answer>,
  items: BatchItem[],
  concurrency = 5,
): Promise<BatchResult> {
  const answers: Answer[] = [];
  const failed: Array<{ index: number; error: string }> = [];

  const queue = items.map((item, index) => ({ item, index }));
  const running: Promise<void>[] = [];

  async function processOne(entry: { item: BatchItem; index: number }) {
    try {
      const answer = await readFn(entry.item);
      answers[entry.index] = answer;
    } catch (err: any) {
      failed.push({ index: entry.index, error: err.message ?? String(err) });
    }
  }

  for (const entry of queue) {
    const p = processOne(entry);
    running.push(p);
    if (running.length >= concurrency) {
      await Promise.race(running);
      running.splice(0, running.length, ...running.filter((r) => {
        let done = false;
        r.then(() => (done = true)).catch(() => (done = true));
        return !done;
      }));
    }
  }

  await Promise.all(running);
  return { answers: answers.filter(Boolean), failed };
}
