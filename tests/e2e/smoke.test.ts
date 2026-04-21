import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../../src/index";

vi.mock("../../src/lib/db", () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
      select: () => ({ single: vi.fn().mockResolvedValue({ data: { plan: "free" }, error: null }) }),
    }),
    rpc: vi.fn().mockResolvedValue({ data: { plan: "free", user_id: null }, error: null }),
  },
}));

vi.mock("../../src/providers/yahoo", () => ({
  getQuote: vi.fn().mockResolvedValue({
    symbol: "AAPL",
    price: 234.56,
    change: 2.31,
    changePct: 0.99,
    volume: 52340000,
    marketCap: 3600000000000,
    name: "Apple Inc.",
    assetClass: "stock",
    timestamp: Date.now(),
  }),
  getBatchQuotes: vi.fn().mockResolvedValue([]),
}));

describe("E2E: key mint → quote", () => {
  it("mints a key and fetches a quote", async () => {
    const health = await request(app).get("/api/health");
    expect(health.status).toBe(200);

    const quote = await request(app).get("/api/v1/quotes?symbols=AAPL&key=elgon_sandbox_pub");
    expect(quote.status).toBe(200);
    expect(quote.body.data[0].symbol).toBe("AAPL");
  });
});
