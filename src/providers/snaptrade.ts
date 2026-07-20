import crypto from "crypto";

const BASE = "https://api.snaptrade.com/api/v1";

/**
 * SnapTrade signs base64(HMAC-SHA256(consumerKey, stableJSON({content,path,query}))).
 * Keys must be sorted at every level — JSON.stringify alone does not sort nested
 * objects, which produces a signature that does not match the body sent.
 */
function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(stableStringify).join(",") + "]";
  const obj = value as Record<string, unknown>;
  return "{" + Object.keys(obj).sort()
    .map((k) => JSON.stringify(k) + ":" + stableStringify(obj[k]))
    .join(",") + "}";
}

export class SnapTradeClient {
  private clientId = process.env.SNAPTRADE_CLIENT_ID || "";
  private consumerKey = process.env.SNAPTRADE_CONSUMER_KEY || "";

  isConfigured(): boolean {
    return Boolean(this.clientId && this.consumerKey);
  }

  private sign(content: unknown, path: string): string {
    const payload = stableStringify({ content, path, query: "" });
    return crypto.createHmac("sha256", this.consumerKey).update(payload).digest("base64");
  }

  private async post(path: string, body: Record<string, unknown>) {
    const res = await fetch(BASE + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        clientId: this.clientId,
        Signature: this.sign(body, path),
      },
      body: stableStringify(body),
    });
    if (!res.ok) throw new Error(`SnapTrade ${path} -> ${res.status} ${await res.text()}`);
    return res.json();
  }

  /** userId is generated up front — an undefined field would drop out of the
   *  body while still being signed, breaking the signature. */
  async register(): Promise<{ userId: string; userSecret: string }> {
    const userId = "elgon-" + crypto.randomBytes(8).toString("hex");
    const out = await this.post("/snapTrade/registerUser", { userId });
    return { userId, userSecret: out.userSecret };
  }

  async loginUrl(userId: string, userSecret: string): Promise<string> {
    const out = await this.post("/snapTrade/login", {
      broker: "ROBINHOOD",
      immediateRedirect: true,
      userId,
      userSecret,
    });
    return out.redirectURI || out.loginRedirectURI || "";
  }
}
