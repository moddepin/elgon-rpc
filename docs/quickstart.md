# Quickstart

## Get an API key

Generate a free key from the [dashboard](https://elgonrpc.xyz/dashboard).
Or use the public sandbox key `elgon_sandbox_pub` (shared, soft-limited).

## Fetch a quote

```bash
curl "https://elgonrpc.xyz/api/v1/quotes?symbols=AAPL&key=YOUR_KEY"
```

Response:
```json
{
  "data": [{
    "symbol": "AAPL",
    "price": 234.56,
    "change": 2.31,
    "changePct": 0.99,
    "volume": 52340000,
    "name": "Apple Inc.",
    "assetClass": "stock",
    "timestamp": 1721400000000
  }],
  "meta": { "count": 1, "delayed": true }
}
```

## Search instruments

```bash
curl "https://elgonrpc.xyz/api/v1/search?q=tesla&key=YOUR_KEY"
```

## Get options chain

```bash
curl "https://elgonrpc.xyz/api/v1/options/AAPL?key=YOUR_KEY"
```

> Options data is simulated (sandbox). See [API docs](api.md) for details.

## Rate limits

| Plan | Requests/min |
|------|-------------|
| Free | 60 |
| Growth | 600 |
| Sandbox (shared) | 20 |
