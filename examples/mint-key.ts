/** Mint your own free key (60 req/min). No email, no signup. */
async function main() {
  const res = await fetch("https://elgonrpc.xyz/api/keys", { method: "POST" });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const { key, plan, rateLimit } = await res.json();
  console.log(`key:   ${key}`);
  console.log(`plan:  ${plan} (${rateLimit} req/min)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
