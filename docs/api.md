# API Reference

Base URL: `https://elgonrpc.xyz/api/v1`

## Authentication

Pass your API key via query param, header, or Bearer token:

```
?key=elgon_live_abc123
X-Api-Key: elgon_live_abc123
Authorization: Bearer elgon_live_abc123
```

## GET /quotes

Fetch quotes for one or more symbols.

| Param | Type | Description |
|-------|------|-------------|
| symbols | string | Comma-separated symbols (max 20) |

Returns `{ data: Quote[], meta: { count, delayed } }`

## GET /search

Search instruments by name or ticker.

| Param | Type | Description |
|-------|------|-------------|
| q | string | Search query (min 1 char) |

Returns `{ data: SearchResult[], meta: { query, count } }`

## GET /options/:symbol

Get simulated options chain for a symbol.

Returns `{ data: OptionsChain, meta: { symbol, delayed, simulated } }`

## GET /health

Health check. No auth required.

Returns `{ status: "ok", version, uptime }`

## Errors

All errors return `{ error: string }` with appropriate HTTP status code.

| Status | Meaning |
|--------|---------|
| 400 | Bad request (missing params) |
| 401 | Invalid or missing API key |
| 404 | Symbol not found |
| 429 | Rate limit exceeded |
| 500 | Internal error |
