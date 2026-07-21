/** Resolve a company name to a tradable symbol. */
const BASE = "https://elgonrpc.xyz/api/v1";
const KEY = process.env.ELGON_API_KEY || "elgon_sandbox_pub";

async function main() {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent("tesla")}&key=${KEY}`);
  const { data } = await res.json();
  for (const r of data) console.log(`${r.symbol.padEnd(8)} ${r.exchange.padEnd(8)} ${r.name}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
