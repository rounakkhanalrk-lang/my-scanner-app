import { filterStocks } from '../src/services/filterStocks';

describe('filterStocks', () => {
  it('filters stocks based on criteria', () => {
    const items: any[] = [
      { symbol: 'A', lastPrice: 5, changePercent: 9, relativeVolume: 5, publicFloat: 9_000_000, newsCount: 1 },
      { symbol: 'B', lastPrice: 0.5, changePercent: 10, relativeVolume: 5, publicFloat: 9_000_000, newsCount: 1 }, // price too low
      { symbol: 'C', lastPrice: 10, changePercent: 7, relativeVolume: 5, publicFloat: 9_000_000, newsCount: 1 }, // change too low
      { symbol: 'D', lastPrice: 10, changePercent: 9, relativeVolume: 4, publicFloat: 9_000_000, newsCount: 1 }, // volume too low
      { symbol: 'E', lastPrice: 10, changePercent: 9, relativeVolume: 5, publicFloat: 15_000_000, newsCount: 1 }, // float too high
      { symbol: 'F', lastPrice: 10, changePercent: 9, relativeVolume: 5, publicFloat: 9_000_000, newsCount: 0 }, // no news
    ];
    const result = filterStocks(items);
    expect(result).toEqual([
      { symbol: 'A', lastPrice: 5, changePercent: 9, relativeVolume: 5, publicFloat: 9_000_000, newsCount: 1 },
    ]);
  });
});
