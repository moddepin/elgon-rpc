# Changelog

## [0.1.0] — 2026-05-18

### Added
- `ElgonClient` with `getBalance`, `getAccountInfo`, `getTokenAccountBalance`, `getSlot`
- Proof-of-serve receipt verification via `verify()`
- Built-in retry with jittered exponential backoff
- Typed errors: `NetworkError`, `TimeoutError`, `ReceiptVerificationError`
- Freshness check via optional `headSlot` parameter
- Documentation: quickstart, endpoints, receipts, architecture, errors

### Notes
- Public endpoint `rpc.elgonrpc.xyz` is rolling out — SDK is stable, service is pre-launch
