/** Pull the sandbox options chain for a symbol. Premiums are simulated. */
const BASE = "https://elgonrpc.xyz/api/v1";
const KEY = process.env.ELGON_API_KEY || "elgon_sandbox_pub";

async function main() {
  const res = await fetch(`${BASE}/options/AAPL?key=${KEY}`);
  const { data, source } = await res.json();

  console.log(`${data.symbol} underlying $${data.underlying}  [${source}]`);
  const front = data.expirations[0];
  for (const c of data.chain.filter((x: { expiry: string }) => x.expiry === front).slice(0, 10)) {
    console.log(`  ${front} ${String(c.strike).padStart(7)} ${c.type.padEnd(4)} ${c.bid}/${c.ask}  iv ${c.iv}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
