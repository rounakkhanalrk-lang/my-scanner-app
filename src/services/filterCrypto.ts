import type { CryptoItem } from './coinGeckoService';

/**
 * Filters a list of crypto assets based on the following criteria:
 *  - 24h percent change ≥ 8
 *  - relative volume ≥ 5
 */
export function filterCrypto(coins: CryptoItem[]): CryptoItem[] {
  return coins.filter((c) => c.changePercent >= 8 && c.relativeVolume >= 5);
}
