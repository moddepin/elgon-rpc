import { NetworkError } from "./errors";

export interface NodeInfo {
  id: string;
  region: string;
  pubkey: string;
  latencyMs?: number;
}

export async function discoverNodes(endpoint: string): Promise<NodeInfo[]> {
  const res = await fetch(`${endpoint}/nodes`);
  if (!res.ok) throw new NetworkError(`discovery failed: HTTP ${res.status}`, res.status);
  const data = await res.json();
  return data.nodes ?? [];
}

export async function closestNode(endpoint: string): Promise<NodeInfo | null> {
  const nodes = await discoverNodes(endpoint);
  if (!nodes.length) return null;

  const withLatency = await Promise.all(
    nodes.map(async (node) => {
      const start = performance.now();
      try {
        await fetch(`${endpoint}/health?node=${node.id}`, { method: "HEAD" });
        return { ...node, latencyMs: performance.now() - start };
      } catch {
        return { ...node, latencyMs: Infinity };
      }
    })
  );

  withLatency.sort((a, b) => (a.latencyMs ?? Infinity) - (b.latencyMs ?? Infinity));
  return withLatency[0] ?? null;
}
