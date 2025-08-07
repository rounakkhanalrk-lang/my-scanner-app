import type { StockItem } from './finnHubService';

/**
 * Filters a list of stocks based on the following criteria:
 *  - relative volume ≥ 5
 *  - price change ≥ 8% (percent)
 *  - last price between $1 and $20
 *  - public float ≤ 10 million shares
 *  - at least one news article published today
 */
export function filterStocks(items: StockItem[]): StockItem[] {
  return items.filter(
    (s) =>
      s.relativeVolume >= 5 &&
      s.changePercent >= 8 &&
      s.lastPrice >= 1 &&
      s.lastPrice <= 20 &&
      s.publicFloat <= 10_000_000 &&
      s.newsCount >= 1
  );
}
