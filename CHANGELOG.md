# Changelog

## [0.5.0] - 2026-07-10

### Added
- Prediction market endpoint (`/api/v1/predictions`)
- Finnhub provider adapter (behind env flag)
- Request timing headers
- CSV export option for quotes

### Fixed
- SnapTrade signature with nested JSON objects
- Rate limit memory leak on high traffic
- Options IV calculation for deep OTM contracts

## [0.4.0] - 2026-06-15

### Added
- Brokerage connection via SnapTrade (Robinhood)
- Demo widget endpoint
- Response caching (30s TTL)

### Fixed
- API key validation accepting malformed keys
- Webhook duplicate event processing

## [0.3.0] - 2026-05-20

### Added
- Stripe checkout integration
- Webhook handler with signature verification
- API key self-service minting

### Fixed
- Auth middleware crash on missing key
- Rate limiter IPv6 handling

## [0.2.0] - 2026-04-25

### Added
- Options chain endpoint (simulated)
- Instrument search
- Batch quotes (up to 20 symbols)
- Docker support

## [0.1.0] - 2026-03-15

### Added
- Initial release
- Stock and crypto quotes via Yahoo Finance
- API key authentication
- Rate limiting
- Health check endpoint
