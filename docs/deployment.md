# Deployment

## Vercel

The API runs as serverless functions. Set the variables from
[configuration](./configuration.md) in the project, then:

```bash
vercel --prod
```

> Hobby projects cap at 12 serverless functions. Fold new endpoints into an
> existing handler with a rewrite rather than adding a thirteenth file.

## Docker

```bash
docker compose up -d
```

## Self-hosted

```bash
npm ci
npm run build
PORT=3000 node dist/index.js
```

Health check: `GET /api/health` returns `200` with `{"status":"ok"}`.
