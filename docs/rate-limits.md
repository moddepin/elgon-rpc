# Rate limits

| Plan | Requests / minute |
|------|-------------------|
| Sandbox (`elgon_sandbox_pub`, shared) | 20 |
| Free | 60 |
| Growth | 600 |

Every response carries the current state:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 57
X-RateLimit-Reset: 1721570400
```

Over the limit returns `429`:

```json
{ "error": "Rate limit exceeded", "retryAfter": 34 }
```

Limits are per key, counted in a rolling 60-second window. The sandbox key is
shared by everyone, so treat its budget as best effort and mint your own key —
it is free and takes one request.
