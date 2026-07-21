# Quickstart

## 1. Get a key

```bash
curl -X POST https://elgonrpc.xyz/api/keys
```

```json
{ "key": "elgon_live_…", "plan": "free", "rateLimit": 60 }
```

No email, no signup. Or skip this and use the shared sandbox key
`elgon_sandbox_pub` (20 req/min, best effort).

## 2. Fetch a quote

```bash
curl "https://elgonrpc.xyz/api/v1/quotes?symbols=AAPL&key=YOUR_KEY"
```

```json
{
  "data": [{
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 234.56,
    "change": 2.31,
    "changePct": 0.99,
    "volume": 52340000,
    "currency": "USD",
    "assetClass": "stock",
    "asOf": "2026-07-21T14:02:11.204Z"
  }],
  "source": "live",
  "plan": "free",
  "receipt": {
    "alg": "sha256",
    "hash": "fe441b52…",
    "ts": "2026-07-21T14:02:11.204Z",
    "endpoint": "/api/v1/quotes",
    "verifyUrl": "https://elgonrpc.xyz/api/v1/verify"
  }
}
```

## 3. Batch, search, chains

```bash
# up to 20 symbols at once
curl "https://elgonrpc.xyz/api/v1/quotes?symbols=AAPL,TSLA,BTC-USD&key=YOUR_KEY"

# find a symbol
curl "https://elgonrpc.xyz/api/v1/search?q=tesla&key=YOUR_KEY"

# sandbox options chain
curl "https://elgonrpc.xyz/api/v1/options/AAPL?key=YOUR_KEY"
```

## Passing the key

Any of these work:

```bash
?key=YOUR_KEY
-H "X-Api-Key: YOUR_KEY"
-H "Authorization: Bearer YOUR_KEY"
```

> Quotes are delayed, and options and prediction figures are simulated. Do not
> trade on this data.
