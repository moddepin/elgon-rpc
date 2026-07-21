# API reference

Base URL: `https://elgonrpc.xyz/api/v1`

Every authenticated response has the same envelope:

```json
{ "data": …, "source": "live" | "sandbox", "plan": "free", "receipt": { … } }
```

## GET /quotes

| Param | Type | Notes |
|-------|------|-------|
| `symbols` | string | Comma-separated, max 20 |

Stocks, ETFs and crypto. `source: "live"` — delayed, not real-time.

## GET /search

| Param | Type | Notes |
|-------|------|-------|
| `q` | string | Name or ticker fragment |

Returns up to 10 matches with `symbol`, `name`, `exchange`, `assetClass`.

## GET /options/:symbol

Strikes and expiries are built around the live underlying price; premiums,
implied volatility and open interest are simulated. `source: "sandbox"`.

## GET /predictions

Event contracts with `yes`/`no` prices. Simulated. `source: "sandbox"`.

## GET /movers

Session gainers and losers across a large-cap universe.

```json
{ "data": { "gainers": [ … ], "losers": [ … ] } }
```

## POST /api/keys

Mints a free key. Rate limited to 5 keys per hour per IP.

## GET /api/health

No key required. Returns `status`, `version`, `uptime`, `memoryMb`.

## Brokerage connect

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/connect/session` | Whether a live connection is configured |
| `POST` | `/api/connect/session` | Start a read-only Robinhood link via SnapTrade |

Elgon never receives brokerage credentials and cannot place orders.
