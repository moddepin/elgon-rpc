import crypto from "crypto";
import { logger } from "../lib/logger";

function stableStringify(obj: any): string {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return "[" + obj.map(stableStringify).join(",") + "]";
  const keys = Object.keys(obj).sort();
  return "{" + keys.map((k) => JSON.stringify(k) + ":" + stableStringify(obj[k])).join(",") + "}";
}

export class SnapTradeClient {
  private clientId: string;
  private consumerKey: string;
  private baseUrl = "https://api.snaptrade.com/api/v1";

  constructor() {
    this.clientId = process.env.SNAPTRADE_CLIENT_ID || "";
    this.consumerKey = process.env.SNAPTRADE_CONSUMER_KEY || "";
  }

  isConfigured(): boolean {
    return !!(this.clientId && this.consumerKey);
  }

  private sign(content: Record<string, any>, path: string): string {
    const payload = stableStringify({ content, path, query: "" });
    return crypto
      .createHmac("sha256", this.consumerKey)
      .update(payload)
      .digest("base64");
  }

  async register(): Promise<string> {
    const userId = "elgon-" + crypto.randomBytes(8).toString("hex");
    const path = "/snapTrade/registerUser";
    const body = { userId };
    const sig = this.sign(body, path);

    const res = await fetch(this.baseUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        clientId: this.clientId,
        Signature: sig,
      },
      body: stableStringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`SnapTrade register failed: ${res.status} ${text}`);
    }

    return userId;
  }

  async getLoginUrl(userId: string): Promise<string> {
    const path = "/snapTrade/login";
    const body = {
      broker: "ROBINHOOD",
      immediateRedirect: true,
      userId,
    };
    const sig = this.sign(body, path);

    const res = await fetch(this.baseUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        clientId: this.clientId,
        Signature: sig,
      },
      body: stableStringify(body),
    });

    if (!res.ok) {
      throw new Error(`SnapTrade login failed: ${res.status}`);
    }

    const data = await res.json();
    return data.redirectURI || data.loginURL || "";
  }
}
