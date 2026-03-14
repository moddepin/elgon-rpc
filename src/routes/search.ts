import { Router, Request, Response } from "express";
import { searchSymbols } from "../providers/yahoo";
import { validateApiKey } from "../middleware/auth";

export const searchRouter = Router();

searchRouter.get("/", validateApiKey, async (req: Request, res: Response) => {
  const query = (req.query.q as string) || "";

  if (!query || query.length < 1) {
    return res.status(400).json({ error: "Missing ?q parameter" });
  }

  try {
    const results = await searchSymbols(query);
    res.json({ data: results, meta: { query, count: results.length } });
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});
