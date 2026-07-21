/** Session gainers and losers across the large-cap universe. */
const BASE = "https://elgonrpc.xyz/api/v1";
const KEY = process.env.ELGON_API_KEY || "elgon_sandbox_pub";

async function main() {
  const res = await fetch(`${BASE}/movers?key=${KEY}`);
  const { data } = await res.json();

  console.log("Gainers");
  for (const q of data.gainers) console.log(`  ${q.symbol.padEnd(7)} +${q.changePct.toFixed(2)}%`);
  console.log("Losers");
  for (const q of data.losers) console.log(`  ${q.symbol.padEnd(7)} ${q.changePct.toFixed(2)}%`);
}

main().catch((e) => { console.error(e); process.exit(1); });
