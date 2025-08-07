import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    name: 'Stock & Crypto Scanner',
    slug: 'stock-crypto-scanner',
    extra: {
      FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
    },
  };
};
