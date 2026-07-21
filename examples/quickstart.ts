/**
 * Fetch a quote with the shared sandbox key — no signup needed.
 *   npx tsx examples/quickstart.ts
 */
const BASE = "https://elgonrpc.xyz/api/v1";
const KEY = process.env.ELGON_API_KEY || "elgon_sandbox_pub";

async function main() {
  const res = await fetch(`${BASE}/quotes?symbols=AAPL,BTC-USD&key=${KEY}`);
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);

  const { data, receipt } = await res.json();
  for (const q of data) {
    console.log(`${q.symbol.padEnd(8)} $${q.price.toFixed(2)}  ${q.changePct.toFixed(2)}%  (${q.assetClass})`);
  }
  console.log(`\nreceipt ${receipt.alg}:${receipt.hash.slice(0, 16)}…  as of ${receipt.ts}`);
  console.log("Quotes are delayed — do not trade on them.");
}

main().catch((e) => { console.error(e); process.exit(1); });
