export interface MarketInstrument {
  id: string;
  name: string;
  symbol: string;
  displaySymbol: string;
  category: 'indices' | 'stocks' | 'crypto' | 'futures' | 'forex' | 'bonds' | 'etfs' | 'economy';
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  badgeText: string;
  badgeBg: string;
  badgeTextColor?: string;
  open: number;
  high: number;
  low: number;
  volume: string;
  marketCap?: string;
  peRatio?: string;
  range52w: { low: number; high: number };
  chartData: {
    '1D': { time: string; price: number }[];
    '5D': { time: string; price: number }[];
    '1M': { time: string; price: number }[];
    '1Y': { time: string; price: number }[];
    'ALL': { time: string; price: number }[];
  };
}

// Generate realistic chart data
function generateSeries(basePrice: number, points: number, volatility: number, trend: number, formatTime: (i: number) => string) {
  const result: { time: string; price: number }[] = [];
  let current = basePrice;
  for (let i = 0; i < points; i++) {
    const randomStep = (Math.sin(i * 0.4) * 0.4 + (Math.random() - 0.48)) * volatility * basePrice;
    const trendStep = (i / points) * trend * basePrice;
    current = Number((basePrice + trendStep + randomStep).toFixed(2));
    result.push({ time: formatTime(i), price: current });
  }
  return result;
}

export const INDICES_DATA: MarketInstrument[] = [
  {
    id: 'spx',
    name: 'S&P 500 Index',
    symbol: 'SPX',
    displaySymbol: 'INDEX:SPX',
    category: 'indices',
    exchange: 'S&P',
    price: 5864.67,
    change: 20.44,
    changePercent: 0.35,
    badgeText: '500',
    badgeBg: '#D32F2F',
    open: 5845.12,
    high: 5878.20,
    low: 5839.40,
    volume: '2.48B',
    marketCap: '$45.2T',
    peRatio: '27.4',
    range52w: { low: 4103.78, high: 5900.25 },
    chartData: {
      '1D': [
        { time: '09:30 AM', price: 5844.20 },
        { time: '10:30 AM', price: 5849.60 },
        { time: '11:30 AM', price: 5846.10 },
        { time: '12:30 PM', price: 5852.80 },
        { time: '01:30 PM', price: 5857.40 },
        { time: '02:30 PM', price: 5859.90 },
        { time: '03:30 PM', price: 5861.30 },
        { time: '04:00 PM', price: 5864.67 },
      ],
      '5D': [
        { time: 'Mon', price: 5810.50 },
        { time: 'Tue', price: 5824.10 },
        { time: 'Wed', price: 5838.70 },
        { time: 'Thu', price: 5849.20 },
        { time: 'Fri', price: 5864.67 },
      ],
      '1M': [
        { time: 'Oct 15', price: 5760.20 },
        { time: 'Oct 22', price: 5795.40 },
        { time: 'Oct 29', price: 5815.10 },
        { time: 'Nov 05', price: 5842.30 },
        { time: 'Nov 15', price: 5864.67 },
      ],
      '1Y': [
        { time: 'Nov 23', price: 4550.00 },
        { time: 'Feb 24', price: 4980.50 },
        { time: 'May 24', price: 5270.80 },
        { time: 'Aug 24', price: 5540.20 },
        { time: 'Nov 24', price: 5864.67 },
      ],
      'ALL': [
        { time: '2020', price: 3230.78 },
        { time: '2021', price: 3756.07 },
        { time: '2022', price: 4766.18 },
        { time: '2023', price: 3839.50 },
        { time: '2024', price: 5864.67 },
      ],
    },
  },
  {
    id: 'ndx',
    name: 'Nasdaq 100',
    symbol: 'NDX',
    displaySymbol: 'NDX · NASDAQ',
    category: 'indices',
    exchange: 'NASDAQ',
    price: 20534.20,
    change: 147.20,
    changePercent: 0.72,
    badgeText: '100',
    badgeBg: '#00A3E0',
    open: 20410.80,
    high: 20580.40,
    low: 20395.10,
    volume: '1.82B',
    marketCap: '$24.6T',
    peRatio: '31.8',
    range52w: { low: 14058.30, high: 20690.97 },
    chartData: {
      '1D': [
        { time: '09:30 AM', price: 20410.50 },
        { time: '10:30 AM', price: 20445.10 },
        { time: '11:30 AM', price: 20430.70 },
        { time: '12:30 PM', price: 20475.20 },
        { time: '01:30 PM', price: 20490.80 },
        { time: '02:30 PM', price: 20512.40 },
        { time: '03:30 PM', price: 20525.90 },
        { time: '04:00 PM', price: 20534.20 },
      ],
      '5D': [
        { time: 'Mon', price: 20280.00 },
        { time: 'Tue', price: 20340.50 },
        { time: 'Wed', price: 20410.20 },
        { time: 'Thu', price: 20485.60 },
        { time: 'Fri', price: 20534.20 },
      ],
      '1M': [
        { time: 'Oct 15', price: 20120.00 },
        { time: 'Oct 22', price: 20240.00 },
        { time: 'Oct 29', price: 20310.00 },
        { time: 'Nov 05', price: 20450.00 },
        { time: 'Nov 15', price: 20534.20 },
      ],
      '1Y': [
        { time: 'Nov 23', price: 15800.00 },
        { time: 'Feb 24', price: 17850.00 },
        { time: 'May 24', price: 18600.00 },
        { time: 'Aug 24', price: 19500.00 },
        { time: 'Nov 24', price: 20534.20 },
      ],
      'ALL': [
        { time: '2020', price: 8733.07 },
        { time: '2021', price: 12888.28 },
        { time: '2022', price: 16320.08 },
        { time: '2023', price: 10939.76 },
        { time: '2024', price: 20534.20 },
      ],
    },
  },
  {
    id: 'dji',
    name: 'Dow 30',
    symbol: 'DJI',
    displaySymbol: 'DJI · S&P',
    category: 'indices',
    exchange: 'S&P',
    price: 43820.14,
    change: -65.73,
    changePercent: -0.15,
    badgeText: '30',
    badgeBg: '#0066CC',
    open: 43890.30,
    high: 43940.10,
    low: 43760.50,
    volume: '340M',
    marketCap: '$14.1T',
    peRatio: '22.1',
    range52w: { low: 34650.20, high: 44100.80 },
    chartData: {
      '1D': [
        { time: '09:30 AM', price: 43890.00 },
        { time: '10:30 AM', price: 43860.20 },
        { time: '11:30 AM', price: 43840.50 },
        { time: '12:30 PM', price: 43805.10 },
        { time: '01:30 PM', price: 43830.00 },
        { time: '02:30 PM', price: 43810.40 },
        { time: '03:30 PM', price: 43815.00 },
        { time: '04:00 PM', price: 43820.14 },
      ],
      '5D': [
        { time: 'Mon', price: 43950.00 },
        { time: 'Tue', price: 43910.00 },
        { time: 'Wed', price: 43880.00 },
        { time: 'Thu', price: 43850.00 },
        { time: 'Fri', price: 43820.14 },
      ],
      '1M': [
        { time: 'Oct 15', price: 43100.00 },
        { time: 'Oct 22', price: 43450.00 },
        { time: 'Oct 29', price: 43700.00 },
        { time: 'Nov 05', price: 43900.00 },
        { time: 'Nov 15', price: 43820.14 },
      ],
      '1Y': [
        { time: 'Nov 23', price: 35100.00 },
        { time: 'Feb 24', price: 38600.00 },
        { time: 'May 24', price: 39000.00 },
        { time: 'Aug 24', price: 40500.00 },
        { time: 'Nov 24', price: 43820.14 },
      ],
      'ALL': [
        { time: '2020', price: 28538.44 },
        { time: '2021', price: 30606.48 },
        { time: '2022', price: 36338.30 },
        { time: '2023', price: 33147.25 },
        { time: '2024', price: 43820.14 },
      ],
    },
  },
];

export interface WorldIndex {
  name: string;
  symbol: string;
  country: string;
  countryCode: string;
  flagBg: string;
  flagColor: string;
  price: number;
  changePercent: number;
  trend: 'up' | 'down';
  sparkPath: string;
}

export const WORLD_INDICES: WorldIndex[] = [
  {
    name: 'Nikkei 225',
    symbol: 'NI225',
    country: 'Japan',
    countryCode: 'JP',
    flagBg: 'bg-red-100',
    flagColor: 'text-red-600',
    price: 38642.91,
    changePercent: 0.28,
    trend: 'up',
    sparkPath: 'M0,15 Q20,18 40,8 T80,4',
  },
  {
    name: 'DAX Index',
    symbol: 'DAX',
    country: 'Germany',
    countryCode: 'DE',
    flagBg: 'bg-yellow-100',
    flagColor: 'text-yellow-700',
    price: 19210.85,
    changePercent: -0.27,
    trend: 'down',
    sparkPath: 'M0,5 Q25,8 50,14 T80,18',
  },
  {
    name: 'FTSE 100',
    symbol: 'UKX',
    country: 'London',
    countryCode: 'UK',
    flagBg: 'bg-blue-100',
    flagColor: 'text-blue-700',
    price: 8063.61,
    changePercent: -0.09,
    trend: 'down',
    sparkPath: 'M0,8 Q30,12 55,16 T80,12',
  },
  {
    name: 'CAC 40',
    symbol: 'PX1',
    country: 'France',
    countryCode: 'FR',
    flagBg: 'bg-blue-100',
    flagColor: 'text-blue-800',
    price: 7269.63,
    changePercent: -0.58,
    trend: 'down',
    sparkPath: 'M0,6 Q30,10 50,15 T80,19',
  },
  {
    name: 'Hang Seng',
    symbol: 'HSI',
    country: 'Hong Kong',
    countryCode: 'HK',
    flagBg: 'bg-emerald-100',
    flagColor: 'text-emerald-800',
    price: 19426.34,
    changePercent: 0.77,
    trend: 'up',
    sparkPath: 'M0,17 Q30,12 60,6 T80,3',
  },
  {
    name: 'Euro Stoxx 50',
    symbol: 'SX5E',
    country: 'Europe',
    countryCode: 'EU',
    flagBg: 'bg-indigo-100',
    flagColor: 'text-indigo-700',
    price: 4794.88,
    changePercent: -0.42,
    trend: 'down',
    sparkPath: 'M0,6 Q30,9 50,14 T80,17',
  },
  {
    name: 'TSX 60',
    symbol: 'TX60',
    country: 'Canada',
    countryCode: 'CA',
    flagBg: 'bg-red-100',
    flagColor: 'text-red-700',
    price: 1488.20,
    changePercent: 0.45,
    trend: 'up',
    sparkPath: 'M0,14 Q25,12 50,8 T80,5',
  },
  {
    name: 'KOSPI',
    symbol: 'KS11',
    country: 'South Korea',
    countryCode: 'KR',
    flagBg: 'bg-blue-100',
    flagColor: 'text-blue-600',
    price: 2416.86,
    changePercent: -0.72,
    trend: 'down',
    sparkPath: 'M0,6 Q30,12 55,16 T80,18',
  },
];

export interface USStock {
  name: string;
  symbol: string;
  exchange: string;
  badge: string;
  badgeBg: string;
  badgeTextColor?: string;
  price: number;
  changePercent: number;
  currency: string;
  volume: string;
  marketCap: string;
  peRatio: string;
}

export const US_STOCKS: USStock[] = [
  {
    name: 'NVIDIA Corp.',
    symbol: 'NVDA',
    exchange: 'NASDAQ',
    badge: 'NV',
    badgeBg: 'bg-emerald-950',
    price: 141.98,
    changePercent: -3.26,
    currency: 'USD',
    volume: '68.4M',
    marketCap: '$3.48T',
    peRatio: '64.2',
  },
  {
    name: 'Apple Inc.',
    symbol: 'AAPL',
    exchange: 'NASDAQ',
    badge: '',
    badgeBg: 'bg-neutral-900',
    price: 225.00,
    changePercent: 1.38,
    currency: 'USD',
    volume: '42.1M',
    marketCap: '$3.42T',
    peRatio: '34.5',
  },
  {
    name: 'Tesla, Inc.',
    symbol: 'TSLA',
    exchange: 'NASDAQ',
    badge: 'T',
    badgeBg: 'bg-red-600',
    price: 320.72,
    changePercent: 3.07,
    currency: 'USD',
    volume: '88.9M',
    marketCap: '$1.03T',
    peRatio: '89.4',
  },
  {
    name: 'Microsoft Corp.',
    symbol: 'MSFT',
    exchange: 'NASDAQ',
    badge: 'MS',
    badgeBg: 'bg-blue-600',
    price: 415.00,
    changePercent: -0.11,
    currency: 'USD',
    volume: '21.3M',
    marketCap: '$3.09T',
    peRatio: '32.1',
  },
  {
    name: 'Amazon.com, Inc.',
    symbol: 'AMZN',
    exchange: 'NASDAQ',
    badge: 'a',
    badgeBg: 'bg-amber-600',
    price: 202.61,
    changePercent: 0.85,
    currency: 'USD',
    volume: '34.2M',
    marketCap: '$2.11T',
    peRatio: '43.8',
  },
  {
    name: 'Meta Platforms, Inc.',
    symbol: 'META',
    exchange: 'NASDAQ',
    badge: 'M',
    badgeBg: 'bg-blue-700',
    price: 554.40,
    changePercent: -0.40,
    currency: 'USD',
    volume: '14.8M',
    marketCap: '$1.40T',
    peRatio: '25.6',
  },
];

export interface QuickMover {
  symbol: string;
  changePercent: number;
}

export const QUICK_MOVERS: QuickMover[] = [
  { symbol: 'PLTR', changePercent: 11.14 },
  { symbol: 'DIS', changePercent: 5.43 },
  { symbol: 'AMAT', changePercent: -9.20 },
  { symbol: 'BABA', changePercent: -2.20 },
  { symbol: 'COIN', changePercent: 7.82 },
  { symbol: 'SOFI', changePercent: 4.19 },
];

export interface CryptoAsset {
  name: string;
  symbol: string;
  pair: string;
  badge: string;
  badgeBg: string;
  price: number;
  changePercent: number;
  currency: string;
  marketCap: string;
  volume24h: string;
}

export const CRYPTO_ASSETS: CryptoAsset[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    pair: 'BTCUSD · Crypto',
    badge: '₿',
    badgeBg: 'bg-amber-500',
    price: 91248.50,
    changePercent: 3.42,
    currency: 'USD',
    marketCap: '$1.80T',
    volume24h: '$48.2B',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    pair: 'ETHUSD · Crypto',
    badge: 'Ξ',
    badgeBg: 'bg-indigo-600',
    price: 3124.80,
    changePercent: 1.85,
    currency: 'USD',
    marketCap: '$376.1B',
    volume24h: '$24.5B',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    pair: 'SOLUSD · Crypto',
    badge: 'S',
    badgeBg: 'bg-gradient-to-r from-purple-500 to-teal-400',
    price: 218.40,
    changePercent: 6.12,
    currency: 'USD',
    marketCap: '$103.4B',
    volume24h: '$9.2B',
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    pair: 'XRPUSD · Crypto',
    badge: '✕',
    badgeBg: 'bg-slate-800',
    price: 1.15,
    changePercent: 14.80,
    currency: 'USD',
    marketCap: '$65.3B',
    volume24h: '$8.4B',
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    pair: 'BNBUSD · Crypto',
    badge: 'B',
    badgeBg: 'bg-yellow-500',
    price: 642.10,
    changePercent: -0.65,
    currency: 'USD',
    marketCap: '$93.2B',
    volume24h: '$1.8B',
  },
];

export interface CommodityAsset {
  name: string;
  symbol: string;
  market: string;
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  price: number;
  changePercent: number;
  currency: string;
  unit: string;
}

export const COMMODITIES_DATA: CommodityAsset[] = [
  {
    name: 'Gold Futures',
    symbol: 'GC1!',
    market: 'GC1! · COMEX',
    badge: 'Au',
    badgeBg: 'bg-yellow-400',
    badgeTextColor: 'text-yellow-950',
    price: 2569.80,
    changePercent: -0.12,
    currency: 'USD',
    unit: 'troy oz',
  },
  {
    name: 'Crude Oil WTI',
    symbol: 'CL1!',
    market: 'CL1! · NYMEX',
    badge: 'Oil',
    badgeBg: 'bg-gray-800',
    badgeTextColor: 'text-white',
    price: 68.70,
    changePercent: -1.68,
    currency: 'USD',
    unit: 'barrel',
  },
  {
    name: 'Silver',
    symbol: 'SI1!',
    market: 'SI1! · COMEX',
    badge: 'Ag',
    badgeBg: 'bg-slate-300',
    badgeTextColor: 'text-slate-800',
    price: 30.43,
    changePercent: 0.62,
    currency: 'USD',
    unit: 'troy oz',
  },
  {
    name: 'Natural Gas',
    symbol: 'NG1!',
    market: 'NG1! · NYMEX',
    badge: 'Gas',
    badgeBg: 'bg-cyan-700',
    badgeTextColor: 'text-white',
    price: 2.82,
    changePercent: 3.14,
    currency: 'USD',
    unit: 'MMBtu',
  },
  {
    name: 'Copper',
    symbol: 'HG1!',
    market: 'HG1! · COMEX',
    badge: 'Cu',
    badgeBg: 'bg-amber-700',
    badgeTextColor: 'text-white',
    price: 4.14,
    changePercent: 0.38,
    currency: 'USD',
    unit: 'lb',
  },
];

export interface ForexPair {
  pair: string;
  name: string;
  rate: number;
  changePercent: number;
  high: number;
  low: number;
}

export const FOREX_DATA: ForexPair[] = [
  { pair: 'EUR/USD', name: 'Euro / US Dollar', rate: 1.0542, changePercent: -0.32, high: 1.0585, low: 1.0531 },
  { pair: 'GBP/USD', name: 'British Pound / US Dollar', rate: 1.2618, changePercent: -0.45, high: 1.2680, low: 1.2605 },
  { pair: 'USD/JPY', name: 'US Dollar / Japanese Yen', rate: 154.28, changePercent: 0.81, high: 154.65, low: 153.80 },
  { pair: 'USD/CHF', name: 'US Dollar / Swiss Franc', rate: 0.8874, changePercent: 0.22, high: 0.8890, low: 0.8850 },
  { pair: 'AUD/USD', name: 'Australian Dollar / USD', rate: 0.6465, changePercent: -0.18, high: 0.6492, low: 0.6449 },
  { pair: 'USD/CAD', name: 'US Dollar / Canadian Dollar', rate: 1.4085, changePercent: 0.35, high: 1.4110, low: 1.4050 },
];

export interface BondData {
  name: string;
  code: string;
  yieldRate: number;
  change: number;
  maturity: string;
}

export const BONDS_DATA: BondData[] = [
  { name: 'US 10-Year Treasury Yield', code: 'US10Y', yieldRate: 4.432, change: 0.041, maturity: '10 Years' },
  { name: 'US 2-Year Treasury Yield', code: 'US02Y', yieldRate: 4.305, change: 0.028, maturity: '2 Years' },
  { name: 'US 30-Year Treasury Yield', code: 'US30Y', yieldRate: 4.608, change: 0.035, maturity: '30 Years' },
  { name: 'Germany 10-Year Bund', code: 'DE10Y', yieldRate: 2.355, change: -0.012, maturity: '10 Years' },
  { name: 'UK 10-Year Gilt', code: 'GB10Y', yieldRate: 4.471, change: 0.019, maturity: '10 Years' },
];

export interface ETFData {
  symbol: string;
  name: string;
  issuer: string;
  price: number;
  changePercent: number;
  aum: string;
}

export const ETF_DATA: ETFData[] = [
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', issuer: 'State Street', price: 585.12, changePercent: 0.36, aum: '$592B' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust (Nasdaq 100)', issuer: 'Invesco', price: 501.40, changePercent: 0.74, aum: '$294B' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', issuer: 'Vanguard', price: 537.80, changePercent: 0.35, aum: '$485B' },
  { symbol: 'IWM', name: 'iShares Russell 2000 ETF', issuer: 'BlackRock', price: 230.15, changePercent: -0.42, aum: '$71B' },
  { symbol: 'SMH', name: 'VanEck Semiconductor ETF', issuer: 'VanEck', price: 246.30, changePercent: -1.25, aum: '$23B' },
];

export interface EconomicIndicator {
  title: string;
  country: string;
  current: string;
  previous: string;
  consensus: string;
  impact: 'High' | 'Medium' | 'Low';
  date: string;
}

export const ECONOMIC_DATA: EconomicIndicator[] = [
  { title: 'Federal Reserve Interest Rate', country: 'US', current: '4.75%', previous: '5.00%', consensus: '4.75%', impact: 'High', date: 'Dec 18, 2024' },
  { title: 'Consumer Price Index (CPI YoY)', country: 'US', current: '2.6%', previous: '2.4%', consensus: '2.6%', impact: 'High', date: 'Dec 11, 2024' },
  { title: 'Non-Farm Payrolls (NFP)', country: 'US', current: '12K', previous: '223K', consensus: '105K', impact: 'High', date: 'Dec 06, 2024' },
  { title: 'ECB Main Refinancing Rate', country: 'EU', current: '3.40%', previous: '3.65%', consensus: '3.40%', impact: 'High', date: 'Dec 12, 2024' },
  { title: 'Bank of Japan Policy Rate', country: 'JP', current: '0.25%', previous: '0.25%', consensus: '0.25%', impact: 'Medium', date: 'Dec 19, 2024' },
];
