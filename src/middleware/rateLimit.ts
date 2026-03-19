import { Request, Response, NextFunction } from "express";

const windows = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const key = (req.query.key as string) || req.ip || "unknown";
  const now = Date.now();
  const limit = (req as any).rateLimit || 60;

  let entry = windows.get(key);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    windows.set(key, entry);
  }

  entry.count++;

  res.setHeader("X-RateLimit-Limit", limit);
  res.setHeader("X-RateLimit-Remaining", Math.max(0, limit - entry.count));
  res.setHeader("X-RateLimit-Reset", Math.ceil(entry.resetAt / 1000));

  if (entry.count > limit) {
    res.status(429).json({
      error: "Rate limit exceeded",
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    });
    return;
  }

  next();
}

// Prune stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of windows) {
    if (now > entry.resetAt + WINDOW_MS) windows.delete(key);
  }
}, 300_000);
