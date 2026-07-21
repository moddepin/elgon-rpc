# Receipts

Every authenticated response includes a receipt:

```json
{
  "alg": "sha256",
  "hash": "fe441b52…",
  "ts": "2026-07-21T14:02:11.204Z",
  "endpoint": "/api/v1/quotes",
  "verifyUrl": "https://elgonrpc.xyz/api/v1/verify"
}
```

`hash` is `sha256(JSON.stringify(data))` over the exact `data` field returned.

## Verifying locally

```ts
import crypto from "crypto";

const res  = await fetch(url).then((r) => r.json());
const hash = crypto.createHash("sha256")
  .update(JSON.stringify(res.data))
  .digest("hex");

console.log(hash === res.receipt.hash ? "intact" : "MISMATCH");
```

## What a receipt does and does not prove

It proves the `data` you are holding is byte-for-byte what Elgon hashed when it
served the response — useful for caching, audit logs and reproducing a backtest.

It is **not** a signature from an exchange, and it does not attest that the
underlying prices are correct or current. Quotes are delayed; sandbox endpoints
are simulated.
