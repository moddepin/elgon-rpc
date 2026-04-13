export const DEFAULT_ENDPOINT = "https://rpc.elgonrpc.xyz";
export const DEFAULT_TIMEOUT_MS = 30_000;
export const MAX_SLOT_DRIFT = 150;
export const SDK_VERSION = "0.1.0";

export const KNOWN_NODES: ReadonlyArray<{
  id: string;
  region: string;
  pubkey: string;
}> = [
  // populated at build time from on-chain registry
];
