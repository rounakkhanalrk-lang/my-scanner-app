import Constants from 'expo-constants';

export interface StockItem {
  symbol: string;
  lastPrice: number;
  changePercent: number;
  relativeVolume: number;
  publicFloat: number;
  newsCount: number;
}

const API_KEY = Constants.expoConfig?.extra?.FINNHUB_API_KEY ?? '';

/**
 * Fetch a list of stocks from Finnhub's screener API. The response is normalized
 * into StockItem objects. If the API call fails, fallback sample data are
 * returned.
 */
export async function fetchStocks(): Promise<StockItem[]> {
  try {
    const url = `https://finnhub.io/api/v1/stock/screener?market=US&token=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const items = json.data ?? [];
    return items.map((s: any) => {
      const lastPrice = s.c ?? 0;
      const changePercent = s.pc ?? 0;
      const volume = s.v ?? 0;
      const avgVol = s.av ?? 1;
      const relativeVolume = avgVol > 0 ? volume / avgVol : 1;
      const publicFloat = s.float ?? 0;
      const newsCount = s.newsCount ?? 0;
      return {
        symbol: s.symbol,
        lastPrice,
        changePercent,
        relativeVolume,
        publicFloat,
        newsCount,
      } as StockItem;
    });
  } catch (e) {
    console.error(e);
    return [
      {
        symbol: 'ABC',
        lastPrice: 10.5,
        changePercent: 9.0,
        relativeVolume: 6.0,
        publicFloat: 5_000_000,
        newsCount: 1,
      },
      {
        symbol: 'XYZ',
        lastPrice: 2.3,
        changePercent: 12.0,
        relativeVolume: 8.0,
        publicFloat: 8_000_000,
        newsCount: 2,
      },
    ];
  }
}

/**
 * Fetch historical daily price data for a stock. The result is returned
 * as an array of {x, y} objects suitable for charting. If the API call fails,
 * a sine wave dummy dataset is returned.
 */
export async function fetchStockHistory(symbol: string): Promise<{ x: number; y: number }[]> {
  try {
    const now = Math.floor(Date.now() / 1000);
    const thirtyDaysAgo = now - 60 * 60 * 24 * 30;
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${thirtyDaysAgo}&to=${now}&token=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    if (json.s === 'ok') {
      const prices: number[] = json.c;
      return prices.map((price, index) => ({ x: index, y: price }));
    }
  } catch (e) {
    console.error(e);
  }
  return Array.from({ length: 30 }, (_, i) => ({ x: i, y: Math.sin(i / 5) * 10 + 50 }));
}
