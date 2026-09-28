import React, { useState, useMemo } from 'react';
import { X, Star, TrendingUp, TrendingDown, Bell, CheckCircle, BarChart2 } from 'lucide-react';

export interface DetailInstrument {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  exchange?: string;
  open?: number;
  high?: number;
  low?: number;
  volume?: string;
  marketCap?: string;
  peRatio?: string;
  badge?: string;
  badgeBg?: string;
}

interface SymbolDetailModalProps {
  instrument: DetailInstrument | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: () => void;
}

type ModalTimeframe = '1D' | '5D' | '1M' | '1Y' | 'ALL';

export const SymbolDetailModal: React.FC<SymbolDetailModalProps> = ({
  instrument,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<ModalTimeframe>('1D');
  const [tradeAction, setTradeAction] = useState<'buy' | 'sell'>('buy');
  const [sharesCount, setSharesCount] = useState<number>(10);
  const [orderSubmitted, setOrderSubmitted] = useState<string | null>(null);

  if (!instrument) return null;

  const isPos = instrument.changePercent >= 0;
  const strokeColor = isPos ? '#089981' : '#F23645';

  // Generate timeframe data points
  const points = useMemo(() => {
    const base = instrument.price;
    const count = timeframe === '1D' ? 12 : timeframe === '5D' ? 20 : 30;
    const result: { label: string; price: number }[] = [];
    for (let i = 0; i < count; i++) {
      const wobble = Math.sin(i * 0.5) * (base * 0.015) + (Math.random() - 0.48) * (base * 0.02);
      const trend = (i / count) * (isPos ? 1 : -1) * (base * 0.025);
      result.push({
        label: `T${i + 1}`,
        price: Number((base - (isPos ? base * 0.02 : -base * 0.02) + trend + wobble).toFixed(2)),
      });
    }
    // ensure last matches current price
    result[result.length - 1].price = instrument.price;
    return result;
  }, [instrument.price, isPos, timeframe]);

  // SVG path
  const svgData = useMemo(() => {
    const width = 600;
    const height = 180;
    const prices = points.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;

    const coords = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - 20 - ((p.price - min) / range) * (height - 40);
      return { x, y };
    });

    let d = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const cx = (coords[i].x + coords[i + 1].x) / 2;
      d += ` C ${cx},${coords[i].y} ${cx},${coords[i + 1].y} ${coords[i + 1].x},${coords[i + 1].y}`;
    }

    const area = `${d} L ${width},${height} L 0,${height} Z`;
    return { path: d, area, coords };
  }, [points]);

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(
      `Order Executed: ${tradeAction.toUpperCase()} ${sharesCount} shares of ${instrument.symbol} at $${instrument.price.toFixed(2)}`
    );
    setTimeout(() => setOrderSubmitted(null), 4000);
  };

  const high = instrument.high || instrument.price * 1.018;
  const low = instrument.low || instrument.price * 0.985;
  const open = instrument.open || instrument.price * 0.995;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Header */}
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm ${
                instrument.badgeBg?.startsWith('bg-') ? instrument.badgeBg : 'bg-[#131722]'
              }`}
              style={!instrument.badgeBg?.startsWith('bg-') && instrument.badgeBg ? { backgroundColor: instrument.badgeBg } : {}}
            >
              {instrument.badge || instrument.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-[#131722]">{instrument.name}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-[#6A6D78]">
                  {instrument.symbol}
                </span>
                {instrument.exchange && (
                  <span className="text-xs text-[#6A6D78]">· {instrument.exchange}</span>
                )}
              </div>
              <div className="text-xs text-[#6A6D78]">Real-time Market Quote &amp; Technical Analysis</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleWatchlist}
              title={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
              className="p-2 text-gray-400 hover:text-amber-500 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <Star className={`w-5 h-5 ${isWatchlisted ? 'text-amber-500 fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Price & Timeframe Bar */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <div className="text-3xl font-extrabold text-[#131722] tabular-nums">
                ${instrument.price > 100
                  ? instrument.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
                  : instrument.price.toFixed(4)}
              </div>
              <div
                className={`text-sm font-semibold tabular-nums flex items-center gap-1.5 mt-0.5 ${
                  isPos ? 'text-[#089981]' : 'text-[#F23645]'
                }`}
              >
                {isPos ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>
                  {isPos ? `+${instrument.changePercent}%` : `${instrument.changePercent}%`} Today
                </span>
              </div>
            </div>

            {/* Timeframe Buttons */}
            <div className="inline-flex items-center p-1 bg-[#F0F3FA] rounded-xl text-xs font-semibold text-[#6A6D78]">
              {(['1D', '5D', '1M', '1Y', 'ALL'] as ModalTimeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    timeframe === tf
                      ? 'bg-white text-[#131722] shadow-2xs font-bold'
                      : 'hover:text-[#131722]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chart Area */}
          <div className="border border-[#E0E3EB] rounded-2xl p-4 bg-white shadow-2xs">
            <div className="h-44 w-full">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 180">
                <defs>
                  <linearGradient id="modalGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <path d={svgData.area} fill="url(#modalGrad)" />
                <path d={svgData.path} fill="none" stroke={strokeColor} strokeWidth="2.5" />
                {svgData.coords.length > 0 && (
                  <circle
                    cx={svgData.coords[svgData.coords.length - 1].x}
                    cy={svgData.coords[svgData.coords.length - 1].y}
                    fill={strokeColor}
                    r="4.5"
                  />
                )}
              </svg>
            </div>
          </div>

          {/* Key Statistics Grid */}
          <div>
            <div className="text-xs font-bold text-[#6A6D78] uppercase tracking-wider mb-3">
              Key Market Statistics
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#F0F3FA] rounded-xl">
                <span className="text-[#6A6D78] block">Day High</span>
                <span className="font-bold text-sm text-[#131722] tabular-nums">
                  ${high.toFixed(2)}
                </span>
              </div>
              <div className="p-3 bg-[#F0F3FA] rounded-xl">
                <span className="text-[#6A6D78] block">Day Low</span>
                <span className="font-bold text-sm text-[#131722] tabular-nums">
                  ${low.toFixed(2)}
                </span>
              </div>
              <div className="p-3 bg-[#F0F3FA] rounded-xl">
                <span className="text-[#6A6D78] block">Open</span>
                <span className="font-bold text-sm text-[#131722] tabular-nums">
                  ${open.toFixed(2)}
                </span>
              </div>
              <div className="p-3 bg-[#F0F3FA] rounded-xl">
                <span className="text-[#6A6D78] block">Volume</span>
                <span className="font-bold text-sm text-[#131722] tabular-nums">
                  {instrument.volume || '38.4M'}
                </span>
              </div>
              <div className="p-3 bg-[#F0F3FA] rounded-xl">
                <span className="text-[#6A6D78] block">Market Cap</span>
                <span className="font-bold text-sm text-[#131722] tabular-nums">
                  {instrument.marketCap || '$1.24T'}
                </span>
              </div>
              <div className="p-3 bg-[#F0F3FA] rounded-xl">
                <span className="text-[#6A6D78] block">P/E Ratio</span>
                <span className="font-bold text-sm text-[#131722] tabular-nums">
                  {instrument.peRatio || '28.4'}
                </span>
              </div>
              <div className="p-3 bg-[#F0F3FA] rounded-xl">
                <span className="text-[#6A6D78] block">Technical Rating</span>
                <span className="font-bold text-sm text-[#089981] tabular-nums">
                  Strong Buy (18/26)
                </span>
              </div>
              <div className="p-3 bg-[#F0F3FA] rounded-xl">
                <span className="text-[#6A6D78] block">RSI (14)</span>
                <span className="font-bold text-sm text-[#131722] tabular-nums">58.4 (Neutral)</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulated Order / Trading Widget */}
          <div className="border border-[#E0E3EB] rounded-2xl p-5 bg-[#F0F3FA]/50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#131722]">Paper Trading Simulator</h4>
                <p className="text-xs text-[#6A6D78]">
                  Practice order execution with zero financial risk.
                </p>
              </div>
              <div className="inline-flex rounded-lg p-1 bg-white border border-[#E0E3EB]">
                <button
                  type="button"
                  onClick={() => setTradeAction('buy')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                    tradeAction === 'buy'
                      ? 'bg-[#089981] text-white shadow-xs'
                      : 'text-[#6A6D78] hover:text-[#131722]'
                  }`}
                >
                  Buy / Long
                </button>
                <button
                  type="button"
                  onClick={() => setTradeAction('sell')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                    tradeAction === 'sell'
                      ? 'bg-[#F23645] text-white shadow-xs'
                      : 'text-[#6A6D78] hover:text-[#131722]'
                  }`}
                >
                  Sell / Short
                </button>
              </div>
            </div>

            <form onSubmit={handleExecuteTrade} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#6A6D78] mb-1">
                  Shares / Units
                </label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={sharesCount}
                  onChange={(e) => setSharesCount(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3 py-2 bg-white border border-[#E0E3EB] rounded-xl text-xs font-bold text-[#131722] focus:outline-[#2962FF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6A6D78] mb-1">
                  Estimated Total
                </label>
                <div className="px-3 py-2 bg-white border border-[#E0E3EB] rounded-xl text-xs font-extrabold text-[#131722] tabular-nums">
                  ${(sharesCount * instrument.price).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition cursor-pointer ${
                    tradeAction === 'buy'
                      ? 'bg-[#089981] hover:bg-[#077f6b]'
                      : 'bg-[#F23645] hover:bg-[#d82a39]'
                  }`}
                >
                  Execute Simulated {tradeAction === 'buy' ? 'Buy' : 'Sell'}
                </button>
              </div>
            </form>

            {orderSubmitted && (
              <div className="p-3 bg-[#E8F5F1] text-[#089981] rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{orderSubmitted}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
