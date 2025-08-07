export interface CryptoItem {
  id: string;
  symbol: string;
  lastPrice: number;
  changePercent: number;
  relativeVolume: number;
}

/**
 * Fetch a list of crypto assets from CoinGecko. The relative volume for each
 * asset is computed as the ratio of its 24h total volume to the average
 * volume of the returned assets. If the API call fails, fallback sample data
 * are returned.
 */
export async function fetchCrypto(): Promise<CryptoItem[]> {
  try {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=250&page=1&price_change_percentage=24h';
    const response = await fetch(url);
    const json = await response.json();
    if (!Array.isArray(json)) {
      throw new Error('Invalid response');
    }
    const volumes = json.map((c: any) => c.total_volume);
    const avgVolume =
      volumes.reduce((sum: number, v: number) => sum + v, 0) / (volumes.length || 1);
    return json.map((c: any) => {
      return {
        id: c.id,
        symbol: c.symbol.toUpperCase(),
        lastPrice: c.current_price,
        changePercent: c.price_change_percentage_24h ?? 0,
        relativeVolume: avgVolume > 0 ? c.total_volume / avgVolume : 1,
      } as CryptoItem;
    });
  } catch (e) {
    console.error(e);
    return [
      {
        id: 'bitcoin',
        symbol: 'BTC',
        lastPrice: 30000,
        changePercent: 10,
        relativeVolume: 6,
      },
      {
        id: 'ethereum',
        symbol: 'ETH',
        lastPrice: 2000,
        changePercent: 9,
        relativeVolume: 5.5,
      },
    ];
  }
}

/**
 * Fetch historical daily price data for a crypto asset. CoinGecko uses the
 * asset ID in the URL, so the symbol is lower-cased to derive the ID. If the
 * API call fails, a cosine dummy dataset is returned.
 */
export async function fetchCryptoHistory(
  symbol: string
): Promise<{ x: number; y: number }[]> {
  try {
    const id = symbol.toLowerCase();
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`;
    const response = await fetch(url);
    const json = await response.json();
    const prices: [number, number][] = json.prices ?? [];
    return prices.map((p, index) => ({ x: index, y: p[1] }));
  } catch (e) {
    console.error(e);
  }
  return Array.from({ length: 30 }, (_, i) => ({ x: i, y: Math.cos(i / 5) * 15 + 100 }));
}
