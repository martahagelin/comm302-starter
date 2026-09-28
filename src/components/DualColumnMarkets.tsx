import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { WorldIndex, USStock, QuickMover } from '../data/marketData';

interface DualColumnMarketsProps {
  worldIndices: WorldIndex[];
  usStocks: USStock[];
  quickMovers: QuickMover[];
  onSelectStock: (stock: USStock) => void;
  onSelectWorldIndex: (index: WorldIndex) => void;
  onSelectQuickMover: (symbol: string) => void;
}

export const DualColumnMarkets: React.FC<DualColumnMarketsProps> = ({
  worldIndices,
  usStocks,
  quickMovers,
  onSelectStock,
  onSelectWorldIndex,
  onSelectQuickMover,
}) => {
  const [showAllIndices, setShowAllIndices] = useState(false);
  const visibleIndices = showAllIndices ? worldIndices : worldIndices.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" data-purpose="market-tables-grid">
      {/* Left Column: World Indices Table (7 Cols) */}
      <section className="lg:col-span-7 space-y-4" data-purpose="world-indices">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAllIndices(!showAllIndices)}
            className="inline-flex items-center space-x-1 text-xl font-bold tracking-tight hover:text-[#2962FF] group cursor-pointer focus:outline-none"
          >
            <span>World indices</span>
            <ChevronRight className="w-4 h-4 text-[#6A6D78] group-hover:text-[#2962FF] transition-colors" />
          </button>
          <button
            onClick={() => setShowAllIndices(!showAllIndices)}
            className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
          >
            {showAllIndices ? 'Show less' : 'View all'}
          </button>
        </div>

        <div className="border border-[#E0E3EB] rounded-xl overflow-hidden bg-white shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F0F3FA] border-b border-[#E0E3EB] text-[#6A6D78] uppercase font-medium">
              <tr>
                <th className="py-3 px-4" scope="col">Index</th>
                <th className="py-3 px-4 text-right" scope="col">Price</th>
                <th className="py-3 px-4 text-right" scope="col">Change %</th>
                <th className="py-3 px-4 text-right hidden sm:table-cell" scope="col">Chart</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]">
              {visibleIndices.map((idx) => {
                const isPos = idx.changePercent >= 0;
                return (
                  <tr
                    key={idx.symbol}
                    onClick={() => onSelectWorldIndex(idx)}
                    className="hover:bg-[#F0F3FA]/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <span
                          className={`w-6 h-6 rounded-full ${idx.flagBg} ${idx.flagColor} flex items-center justify-center font-bold text-[10px] shrink-0`}
                        >
                          {idx.countryCode}
                        </span>
                        <div>
                          <div className="font-bold text-[#131722] hover:text-[#2962FF] transition-colors">
                            {idx.name}
                          </div>
                          <div className="text-[11px] text-[#6A6D78]">
                            {idx.symbol} · {idx.country}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium tabular-nums text-[#131722]">
                      {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-semibold tabular-nums ${
                        isPos ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPos ? `+${idx.changePercent}%` : `${idx.changePercent}%`}
                    </td>
                    <td className="py-3.5 px-4 text-right hidden sm:table-cell">
                      <svg className="w-20 h-5 inline-block overflow-visible" viewBox="0 0 80 20">
                        <path
                          d={idx.sparkPath}
                          fill="none"
                          stroke={isPos ? '#089981' : '#F23645'}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Right Column: US Stocks & Market Movers (5 Cols) */}
      <section className="lg:col-span-5 space-y-4" data-purpose="us-stocks-movers">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-1 text-xl font-bold tracking-tight text-[#131722]">
            <span>Most active US stocks</span>
            <ChevronRight className="w-4 h-4 text-[#6A6D78]" />
          </div>
          <span className="text-xs text-[#6A6D78]">Vol leader: NVDA</span>
        </div>

        {/* Prominent Active Stock Tickers List */}
        <div className="border border-[#E0E3EB] rounded-xl divide-y divide-[#E0E3EB] bg-white shadow-2xs overflow-hidden">
          {usStocks.slice(0, 4).map((stock) => {
            const isPos = stock.changePercent >= 0;
            return (
              <div
                key={stock.symbol}
                onClick={() => onSelectStock(stock)}
                className="p-3.5 flex items-center justify-between hover:bg-[#F0F3FA]/70 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg ${stock.badgeBg} flex items-center justify-center text-white text-[11px] font-black shrink-0 shadow-xs`}
                  >
                    {stock.badge}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#131722] group-hover:text-[#2962FF] transition-colors">
                      {stock.name}
                    </div>
                    <div className="text-[11px] text-[#6A6D78]">
                      {stock.symbol} · {stock.exchange}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#131722] tabular-nums">
                    {stock.price.toFixed(2)}{' '}
                    <span className="text-[10px] text-[#6A6D78] font-normal">{stock.currency}</span>
                  </div>
                  <div
                    className={`text-xs font-semibold tabular-nums ${
                      isPos ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPos ? `+${stock.changePercent}%` : `${stock.changePercent}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Market Movers Quick Tabs (Gainers / Losers Pills) */}
        <div className="pt-2">
          <div className="text-xs font-bold text-[#6A6D78] mb-2 uppercase tracking-wide">
            Quick Movers
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {quickMovers.map((mover) => {
              const isPos = mover.changePercent >= 0;
              return (
                <button
                  key={mover.symbol}
                  onClick={() => onSelectQuickMover(mover.symbol)}
                  className={`inline-flex items-center px-2.5 py-1 rounded-md font-semibold transition-transform hover:scale-105 cursor-pointer tabular-nums ${
                    isPos
                      ? 'bg-[#E8F5F1] text-[#089981] hover:bg-[#d5eee5]'
                      : 'bg-[#FDF0F1] text-[#F23645] hover:bg-[#fad8db]'
                  }`}
                >
                  {mover.symbol} {isPos ? `+${mover.changePercent}%` : `${mover.changePercent}%`}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
