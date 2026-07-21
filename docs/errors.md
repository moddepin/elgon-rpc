# Errors

Errors return `{ "error": "…" }` with a matching status code.

| Status | Meaning | Typical fix |
|--------|---------|-------------|
| `400` | Bad request | Missing `symbols`/`q`, or more than 20 symbols |
| `401` | Bad or missing key | Pass `?key=`, `X-Api-Key` or a Bearer token |
| `404` | Nothing upstream | Check the ticker; try `/search` first |
| `429` | Rate limited | Back off for `retryAfter` seconds |
| `500` | Internal error | Retry; report if it persists |
| `502` | Upstream failed | SnapTrade or the quote provider is unreachable |
| `503` | Dependency unconfigured | Storage or key service unavailable |

## Retrying

`429`, `502` and `503` are worth retrying with backoff. `400`, `401` and `404`
will not succeed on retry — fix the request instead.
