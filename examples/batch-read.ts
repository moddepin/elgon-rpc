/**
 * Read multiple accounts in parallel and verify all receipts.
 *
 *   ELGON_TOKEN=... npx tsx examples/batch-read.ts
 */
import { ElgonClient } from "../src/index";

const ACCOUNTS = [
  "So11111111111111111111111111111111111111112",
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
];

async function main() {
  const client = new ElgonClient({
    endpoint: process.env.ELGON_ENDPOINT ?? "https://rpc.elgonrpc.xyz",
    accessToken: process.env.ELGON_TOKEN,
  });

  const results = await Promise.all(
    ACCOUNTS.map(async (addr) => {
      const answer = await client.getBalance(addr);
      const { ok } = await client.verify(answer);
      return { addr: addr.slice(0, 8) + "...", balance: answer.answer, slot: answer.slot, verified: ok };
    })
  );

  console.table(results);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
