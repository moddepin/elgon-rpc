# Configuration

All configuration is environment variables.

## Core

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3000` | HTTP port |
| `LOG_LEVEL` | `info` | `debug` \| `info` \| `warn` \| `error` |
| `NODE_ENV` | — | `development` echoes error messages in responses |

## Data and storage

| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_URL` | yes | Key records and usage counters |
| `SUPABASE_SERVICE_KEY` | yes | Service role key |
| `FINNHUB_API_KEY` | no | Enables the licensed quote fallback |

## Payments

| Variable | Required | Purpose |
|----------|----------|---------|
| `STRIPE_SECRET_KEY` | no | Unset renders a labelled demo checkout |
| `STRIPE_WEBHOOK_SECRET` | no | Verifies webhook signatures |

## Brokerage connect

| Variable | Required | Purpose |
|----------|----------|---------|
| `SNAPTRADE_CLIENT_ID` | no | Unset reports `demo: true` |
| `SNAPTRADE_CONSUMER_KEY` | no | Signs SnapTrade requests |
