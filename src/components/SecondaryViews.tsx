import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, Filter, Star, Eye } from 'lucide-react';

interface SecondaryViewsProps {
  view: string;
  onBackToMarkets: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const SecondaryViews: React.FC<SecondaryViewsProps> = ({
  view,
  onBackToMarkets,
  onSelectSymbol,
}) => {
  // Stock Heatmap view
  if (view === 'Heatmaps') {
    const heatmapSectors = [
      {
        sector: 'Technology',
        stocks: [
          { symbol: 'NVDA', name: 'NVIDIA', cap: '3.48T', change: -3.26, flex: 3 },
          { symbol: 'AAPL', name: 'Apple', cap: '3.42T', change: 1.38, flex: 3 },
          { symbol: 'MSFT', name: 'Microsoft', cap: '3.09T', change: -0.11, flex: 2.8 },
          { symbol: 'AVGO', name: 'Broadcom', cap: '780B', change: 2.14, flex: 1.2 },
        ],
      },
      {
        sector: 'Consumer Cyclical & Comm',
        stocks: [
          { symbol: 'AMZN', name: 'Amazon', cap: '2.11T', change: 0.85, flex: 2 },
          { symbol: 'META', name: 'Meta', cap: '1.40T', change: -0.40, flex: 1.6 },
          { symbol: 'TSLA', name: 'Tesla', cap: '1.03T', change: 3.07, flex: 1.4 },
        ],
      },
      {
        sector: 'Financial & Healthcare',
        stocks: [
          { symbol: 'BRK.B', name: 'Berkshire', cap: '980B', change: 0.45, flex: 1.2 },
          { symbol: 'JPM', name: 'JPMorgan', cap: '680B', change: 1.12, flex: 1 },
          { symbol: 'LLY', name: 'Eli Lilly', cap: '720B', change: -1.05, flex: 1 },
        ],
      },
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToMarkets}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#2962FF] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Markets</span>
          </button>
          <div className="text-xs text-[#6A6D78]">S&amp;P 500 Market Cap Heatmap</div>
        </div>

        <h2 className="text-3xl font-extrabold text-[#131722]">Stock Market Heatmap</h2>
        <p className="text-xs text-[#6A6D78]">
          Visual distribution of major US equities weighted by market cap and colored by daily percentage change.
        </p>

        <div className="space-y-4">
          {heatmapSectors.map((sector) => (
            <div key={sector.sector} className="space-y-2">
              <div className="text-xs font-bold text-[#6A6D78] uppercase tracking-wider">
                {sector.sector}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {sector.stocks.map((stk) => {
                  const isPos = stk.change >= 0;
                  const intensity = Math.min(Math.abs(stk.change) / 4, 1);
                  return (
                    <button
                      key={stk.symbol}
                      onClick={() => onSelectSymbol(stk.symbol)}
                      style={{ flex: `${stk.flex} 1 180px`, minHeight: '110px' }}
                      className={`p-4 rounded-xl flex flex-col justify-between text-white transition-transform hover:scale-[1.01] shadow-xs cursor-pointer ${
                        isPos
                          ? 'bg-[#089981] hover:bg-[#077f6b]'
                          : 'bg-[#F23645] hover:bg-[#d82a39]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-black text-lg tracking-tight">{stk.symbol}</span>
                        <span className="text-[11px] opacity-90 font-mono font-medium">{stk.cap}</span>
                      </div>
                      <div className="text-left">
                        <div className="text-xs opacity-90 truncate">{stk.name}</div>
                        <div className="text-sm font-black tabular-nums mt-0.5">
                          {isPos ? `+${stk.change}%` : `${stk.change}%`}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Stock Screener view
  if (view === 'Screeners') {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToMarkets}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#2962FF] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Markets</span>
          </button>
          <span className="text-xs text-[#6A6D78]">Screener 2.0 (Live Filters)</span>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-[#131722]">Stock Screener</h2>
          <p className="text-xs text-[#6A6D78] mt-1">
            Filter equities across fundamental criteria, market valuation, and momentum.
          </p>
        </div>

        <div className="p-4 bg-[#F0F3FA] rounded-2xl flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#E0E3EB]">
            <Filter className="w-3.5 h-3.5 text-[#2962FF]" />
            <span className="font-semibold text-[#131722]">Market: US Only</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg border border-[#E0E3EB]">
            <span className="text-[#6A6D78]">Market Cap: </span>
            <span className="font-semibold text-[#131722]">&gt; $10B (Mega/Large)</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg border border-[#E0E3EB]">
            <span className="text-[#6A6D78]">P/E Ratio: </span>
            <span className="font-semibold text-[#131722]">Any Valuation</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg border border-[#E0E3EB]">
            <span className="text-[#6A6D78]">Volume: </span>
            <span className="font-semibold text-[#131722]">&gt; 5M Shares</span>
          </div>
        </div>

        <div className="border border-[#E0E3EB] rounded-2xl bg-white shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F0F3FA] border-b border-[#E0E3EB] text-[#6A6D78] uppercase font-medium">
              <tr>
                <th className="py-3 px-4">Ticker</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">Change %</th>
                <th className="py-3 px-4 text-right">Market Cap</th>
                <th className="py-3 px-4 text-right">P/E</th>
                <th className="py-3 px-4 text-right">Volume</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]">
              {[
                { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 141.98, change: -3.26, cap: '$3.48T', pe: '64.2', vol: '68.4M' },
                { ticker: 'AAPL', name: 'Apple Inc.', price: 225.00, change: 1.38, cap: '$3.42T', pe: '34.5', vol: '42.1M' },
                { ticker: 'TSLA', name: 'Tesla, Inc.', price: 320.72, change: 3.07, cap: '$1.03T', pe: '89.4', vol: '88.9M' },
                { ticker: 'MSFT', name: 'Microsoft Corp.', price: 415.00, change: -0.11, cap: '$3.09T', pe: '32.1', vol: '21.3M' },
                { ticker: 'AMZN', name: 'Amazon.com Inc.', price: 202.61, change: 0.85, cap: '$2.11T', pe: '43.8', vol: '34.2M' },
                { ticker: 'META', name: 'Meta Platforms Inc.', price: 554.40, change: -0.40, cap: '$1.40T', pe: '25.6', vol: '14.8M' },
              ].map((row) => {
                const isPos = row.change >= 0;
                return (
                  <tr
                    key={row.ticker}
                    onClick={() => onSelectSymbol(row.ticker)}
                    className="hover:bg-[#F0F3FA]/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-[#131722]">{row.ticker}</div>
                      <div className="text-[11px] text-[#6A6D78]">{row.name}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-sm tabular-nums text-[#131722]">
                      ${row.price.toFixed(2)}
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-semibold tabular-nums ${
                        isPos ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPos ? `+${row.change}%` : `${row.change}%`}
                    </td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-[#131722] font-medium">{row.cap}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-500 font-medium">{row.pe}</td>
                    <td className="py-3.5 px-4 text-right tabular-nums text-gray-500 font-medium">{row.vol}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSymbol(row.ticker);
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#2962FF] bg-blue-50 hover:bg-blue-100 rounded-md transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Community view
  if (view === 'Community') {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToMarkets}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#2962FF] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Markets</span>
          </button>
          <span className="text-xs text-[#6A6D78]">50M+ Global Traders</span>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-[#131722]">Trading Community &amp; Ideas</h2>
          <p className="text-xs text-[#6A6D78] mt-1">
            Top technical setups, analysis publications, and market discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              author: 'MacroVision',
              symbol: 'SPX',
              title: 'S&P 500: Key Breakout Confirmation Above 5,850 Level',
              likes: '1,420',
              comments: '284',
              time: '2 hours ago',
              tag: 'Long Idea',
            },
            {
              author: 'CryptoQuant_Pro',
              symbol: 'BTCUSD',
              title: 'Bitcoin Consolidating Near $92,000 Before Next Expansion',
              likes: '2,890',
              comments: '512',
              time: '4 hours ago',
              tag: 'Trend Analysis',
            },
            {
              author: 'TechAnalyst_X',
              symbol: 'NVDA',
              title: 'NVIDIA: Retest of Support Channel Following Earnings Momentum',
              likes: '940',
              comments: '138',
              time: '6 hours ago',
              tag: 'Swing Trade',
            },
          ].map((idea, idx) => (
            <div
              key={idx}
              className="border border-[#E0E3EB] rounded-2xl p-5 bg-white shadow-2xs hover:shadow-md transition space-y-3 cursor-pointer"
              onClick={() => onSelectSymbol(idea.symbol)}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#131722]">@{idea.author}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2962FF]">
                  {idea.tag}
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#131722] hover:text-[#2962FF] transition-colors">
                {idea.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-[#6A6D78] pt-2 border-t border-gray-100">
                <span>Symbol: <strong className="text-[#131722]">{idea.symbol}</strong></span>
                <span>{idea.likes} likes · {idea.comments} comments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Brokers view
  if (view === 'Brokers') {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToMarkets}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#2962FF] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Markets</span>
          </button>
          <span className="text-xs text-[#6A6D78]">Verified Integrated Partners</span>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-[#131722]">Integrated Trading Brokers</h2>
          <p className="text-xs text-[#6A6D78] mt-1">
            Execute trades directly from TradingView charts with leading regulated brokerages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Interactive Brokers',
              rating: '4.9 / 5.0',
              reg: 'SEC, FINRA, FCA',
              features: 'Direct chart trading, Global stock access, Options & Futures',
              fee: '$0 Commission on US Stocks',
            },
            {
              name: 'TradeStation',
              rating: '4.8 / 5.0',
              reg: 'SEC, FINRA',
              features: 'Lightning-fast execution, Advanced order routing, API access',
              fee: '$0 per stock trade',
            },
            {
              name: 'Alpaca Securities',
              rating: '4.7 / 5.0',
              reg: 'FINRA, SIPC',
              features: 'Automated algorithmic trading, Fractional shares',
              fee: 'Commission-free trading API',
            },
            {
              name: 'Saxo Bank',
              rating: '4.8 / 5.0',
              reg: 'FSA, FCA, MAS',
              features: 'Multi-asset global coverage, Currencies, Bonds',
              fee: 'Tiered low commissions',
            },
          ].map((b, idx) => (
            <div
              key={idx}
              className="border border-[#E0E3EB] rounded-2xl p-6 bg-white shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-[#131722]">{b.name}</h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#089981]">
                  ★ {b.rating}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-[#6A6D78]">
                <div>Regulation: <strong className="text-[#131722]">{b.reg}</strong></div>
                <div>Coverage: <strong className="text-[#131722]">{b.features}</strong></div>
                <div>Pricing: <strong className="text-[#089981]">{b.fee}</strong></div>
              </div>
              <button
                onClick={onBackToMarkets}
                className="w-full py-2 bg-[#F0F3FA] hover:bg-[#E0E3EB] text-[#131722] font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Connect Broker
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Products view
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToMarkets}
          className="inline-flex items-center space-x-1 text-xs font-bold text-[#2962FF] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Markets</span>
        </button>
        <span className="text-xs text-[#6A6D78]">TradingView Suite</span>
      </div>

      <div>
        <h2 className="text-3xl font-extrabold text-[#131722]">TradingView Products</h2>
        <p className="text-xs text-[#6A6D78] mt-1">
          Explore powerful charting, analysis, and execution tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'SuperCharts', desc: 'World-renowned interactive financial charts with 100+ indicators.' },
          { title: 'Screeners 2.0', desc: 'Search and filter across 100,000+ stocks, crypto, and forex instruments.' },
          { title: 'Pine Script™', desc: 'Create custom indicators and algorithmic strategies in our browser IDE.' },
          { title: 'Heatmaps', desc: 'Real-time multi-asset market capitalization visualization.' },
          { title: 'Economic Calendar', desc: 'Track upcoming central bank announcements, CPI releases, and job reports.' },
          { title: 'Desktop & Mobile App', desc: 'Multi-monitor native desktop workstation and seamless mobile sync.' },
        ].map((prod, idx) => (
          <div key={idx} className="border border-[#E0E3EB] rounded-2xl p-5 bg-white shadow-2xs space-y-2">
            <h4 className="font-extrabold text-base text-[#131722]">{prod.title}</h4>
            <p className="text-xs text-[#6A6D78] leading-relaxed">{prod.desc}</p>
            <div className="pt-2">
              <button
                onClick={onBackToMarkets}
                className="text-xs font-bold text-[#2962FF] hover:underline"
              >
                Launch →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
