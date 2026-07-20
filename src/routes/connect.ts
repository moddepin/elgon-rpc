import { Router, Request, Response } from "express";
import { SnapTradeClient } from "../providers/snaptrade";
import { logger } from "../lib/logger";

export const connectRouter = Router();

const snaptrade = new SnapTradeClient();

/** Cheap probe so the UI knows whether to show a demo badge. */
connectRouter.get("/session", (_req: Request, res: Response) => {
  res.json({ demo: !snaptrade.isConfigured(), broker: "Robinhood" });
});

connectRouter.post("/session", async (_req: Request, res: Response) => {
  if (!snaptrade.isConfigured()) {
    return res.json({ url: null, demo: true, broker: "Robinhood" });
  }

  try {
    const { userId, userSecret } = await snaptrade.register();
    const url = await snaptrade.loginUrl(userId, userSecret);
    // Read-only by construction: Elgon never receives brokerage credentials and
    // holds no trading permission on the linked account.
    res.json({ url, demo: false, broker: "Robinhood", scope: "read-only" });
  } catch (err) {
    logger.error("snaptrade session failed", { error: String(err) });
    res.status(502).json({ error: "Could not start brokerage connection" });
  }
});
