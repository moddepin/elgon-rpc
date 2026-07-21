# Documentation

| Guide | Description |
|-------|-------------|
| [Quickstart](./quickstart.md) | Get a key, make your first call |
| [API reference](./api.md) | Every endpoint, parameter and response |
| [Rate limits](./rate-limits.md) | Plans, headers, throttling behaviour |
| [Receipts](./receipts.md) | How to verify a response was not altered |
| [Configuration](./configuration.md) | Environment variables |
| [Deployment](./deployment.md) | Vercel, Docker, self-hosting |
| [Errors](./errors.md) | Status codes and what they mean |

## What Elgon is

A market-data API for the Robinhood surface: delayed quotes for stocks, ETFs and
crypto, instrument search, sandbox options chains and prediction feeds, plus an
optional read-only view of a linked Robinhood account.

## What Elgon is not

- Not real-time. Quotes are delayed and every response says so.
- Not a broker. Connections are read-only; Elgon cannot place orders.
- Not affiliated with Robinhood Markets, Inc.
