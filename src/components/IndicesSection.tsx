import React, { useState, useMemo, useRef } from 'react';
import { ChevronRight, Star, TrendingUp, BarChart2, Maximize2 } from 'lucide-react';
import { MarketInstrument } from '../data/marketData';

interface IndicesSectionProps {
  indices: MarketInstrument[];
  selectedIndexId: string;
  onSelectIndex: (id: string) => void;
  onOpenInstrumentDetail: (instrument: MarketInstrument) => void;
  isWatchlisted: (symbol: string) => boolean;
  onToggleWatchlist: (instrument: MarketInstrument) => void;
}

type Timeframe = '1D' | '5D' | '1M' | '1Y' | 'ALL';

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  selectedIndexId,
  onSelectIndex,
  onOpenInstrumentDetail,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<{ time: string; price: number; x: number; y: number } | null>(null);
  const [chartMode, setChartMode] = useState<'area' | 'candles'>('area');
  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeInstrument = indices.find((idx) => idx.id === selectedIndexId) || indices[0];
  const chartPoints = activeInstrument.chartData[timeframe] || activeInstrument.chartData['1D'];

  const isPositive = activeInstrument.changePercent >= 0;
  const strokeColor = isPositive ? '#089981' : '#F23645';
  const gradientId = `grad-${activeInstrument.id}-${timeframe}`;

  // Calculate SVG curve and path coordinates
  const svgData = useMemo(() => {
    if (!chartPoints || chartPoints.length === 0) return { path: '', areaPath: '', coords: [] };

    const width = 900;
    const height = 160;
    const padTop = 20;
    const padBottom = 20;

    const prices = chartPoints.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice || 1;

    const coords = chartPoints.map((pt, index) => {
      const x = (index / (chartPoints.length - 1)) * width;
      const normalized = (pt.price - minPrice) / range;
      // Invert Y because SVG 0 is top
      const y = height - padBottom - normalized * (height - padTop - padBottom);
      return { x, y, price: pt.price, time: pt.time };
    });

    if (coords.length < 2) return { path: '', areaPath: '', coords };

    // Build smooth cubic bezier curve
    let d = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const current = coords[i];
      const next = coords[i + 1];
      const cx = (current.x + next.x) / 2;
      d += ` C ${cx},${current.y} ${cx},${next.y} ${next.x},${next.y}`;
    }

    const areaPath = `${d} L ${width},${height} L 0,${height} Z`;

    return { path: d, areaPath, coords };
  }, [chartPoints]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || svgData.coords.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const normalizedX = (mouseX / rect.width) * 900;

    // Find nearest point
    let closest = svgData.coords[0];
    let minDiff = Infinity;
    for (const pt of svgData.coords) {
      const diff = Math.abs(pt.x - normalizedX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    setHoveredPoint(closest);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const currentDisplayPrice = hoveredPoint ? hoveredPoint.price : activeInstrument.price;
  const currentDisplayTime = hoveredPoint ? hoveredPoint.time : 'At close: Nov 15, 5:00 PM EST';

  return (
    <section data-purpose="indices-overview" className="space-y-4">
      {/* Section Title Link */}
      <button
        onClick={() => onOpenInstrumentDetail(activeInstrument)}
        className="inline-flex items-center space-x-1.5 text-2xl font-bold tracking-tight hover:text-[#2962FF] group cursor-pointer focus:outline-none"
      >
        <span>Indices</span>
        <ChevronRight className="w-5 h-5 text-[#6A6D78] group-hover:text-[#2962FF] group-hover:translate-x-0.5 transition-all" />
      </button>

      {/* Quick Ticker Horizontal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {indices.map((idx) => {
          const isSelected = idx.id === selectedIndexId;
          const pos = idx.changePercent >= 0;
          return (
            <div
              key={idx.id}
              onClick={() => onSelectIndex(idx.id)}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer bg-white ${
                isSelected
                  ? 'border-[#2962FF] ring-2 ring-[#2962FF]/15 shadow-sm'
                  : 'border-[#E0E3EB] hover:border-gray-400 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-inner shrink-0"
                  style={{ backgroundColor: idx.badgeBg }}
                >
                  {idx.badgeText}
                </div>
                <div>
                  <div className="font-bold text-sm tracking-tight text-[#131722]">{idx.name}</div>
                  <div className="text-[11px] text-[#6A6D78]">{idx.displaySymbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm tabular-nums text-[#131722]">
                  {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div
                  className={`text-xs font-semibold tabular-nums flex items-center justify-end gap-0.5 ${
                    pos ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {pos ? `+${idx.changePercent}%` : `${idx.changePercent}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indices Interactive Chart Widget Showcase */}
      <div className="p-5 rounded-2xl border border-[#E0E3EB] bg-white shadow-xs transition-all">
        {/* Widget Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
              style={{ backgroundColor: activeInstrument.badgeBg }}
            >
              {activeInstrument.badgeText}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base text-[#131722]">{activeInstrument.name}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-[#6A6D78]">
                  {activeInstrument.displaySymbol}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatchlist(activeInstrument);
                  }}
                  title={isWatchlisted(activeInstrument.symbol) ? 'Remove from watchlist' : 'Add to watchlist'}
                  className="p-1 text-gray-400 hover:text-amber-500 rounded-md transition cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 ${
                      isWatchlisted(activeInstrument.symbol) ? 'text-amber-500 fill-amber-500' : ''
                    }`}
                  />
                </button>
              </div>
              <div className="text-xs text-[#6A6D78]">Real-time market quote</div>
            </div>
          </div>

          {/* Right Action Tools: Chart Style & Time Range Selector */}
          <div className="flex items-center space-x-3">
            {/* Time Range Selector */}
            <div className="inline-flex items-center p-1 bg-[#F0F3FA] rounded-lg text-xs font-medium text-[#6A6D78]">
              {(['1D', '5D', '1M', '1Y', 'ALL'] as Timeframe[]).map((tf) => {
                const active = timeframe === tf;
                return (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      active
                        ? 'bg-white text-[#131722] shadow-2xs font-semibold'
                        : 'hover:text-[#131722]'
                    }`}
                  >
                    {tf}
                  </button>
                );
              })}
            </div>

            {/* Expand / Detailed modal button */}
            <button
              onClick={() => onOpenInstrumentDetail(activeInstrument)}
              title="Full Screen Technical Chart"
              className="hidden sm:flex p-1.5 text-[#6A6D78] hover:text-[#2962FF] hover:bg-[#F0F3FA] rounded-md transition cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Price Display */}
        <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between">
          <div>
            <span className="text-3xl font-extrabold tracking-tight tabular-nums text-[#131722]">
              {currentDisplayPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`ml-2 text-sm font-semibold tabular-nums ${
                isPositive ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {isPositive ? `+${activeInstrument.change} (+${activeInstrument.changePercent}%)` : `${activeInstrument.change} (${activeInstrument.changePercent}%)`}
            </span>
            <span className="block text-xs text-[#6A6D78] mt-0.5">
              {hoveredPoint ? `Inspecting: ${hoveredPoint.time}` : currentDisplayTime}
            </span>
          </div>

          <div className="mt-2 md:mt-0 flex items-center gap-4 text-xs text-[#6A6D78]">
            <div>
              <span className="text-gray-400">Day High:</span>{' '}
              <span className="font-semibold text-[#131722] tabular-nums">
                {activeInstrument.high.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Day Low:</span>{' '}
              <span className="font-semibold text-[#131722] tabular-nums">
                {activeInstrument.low.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Rendered Sparkline Curve SVG with Interactive Hover Scrubber */}
        <div className="h-44 w-full mt-3 relative">
          <svg
            ref={svgRef}
            className="w-full h-full cursor-crosshair overflow-visible select-none"
            preserveAspectRatio="none"
            viewBox="0 0 900 160"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* Background Area Fill */}
            {svgData.areaPath && <path d={svgData.areaPath} fill={`url(#${gradientId})`} />}

            {/* Line Path */}
            {svgData.path && (
              <path
                d={svgData.path}
                fill="none"
                stroke={strokeColor}
                strokeLinecap="round"
                strokeWidth="2.5"
              />
            )}

            {/* Hover Scrubber Line & Dot */}
            {hoveredPoint && (
              <>
                <line
                  x1={hoveredPoint.x}
                  y1={0}
                  x2={hoveredPoint.x}
                  y2={160}
                  stroke="#94A3B8"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
                <circle
                  cx={hoveredPoint.x}
                  cy={hoveredPoint.y}
                  r="5"
                  fill={strokeColor}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </>
            )}

            {/* Live Dot Beacon on Last Point when not hovering */}
            {!hoveredPoint && svgData.coords.length > 0 && (
              <g>
                <circle
                  cx={svgData.coords[svgData.coords.length - 1].x}
                  cy={svgData.coords[svgData.coords.length - 1].y}
                  fill={strokeColor}
                  r="5"
                />
                <circle
                  cx={svgData.coords[svgData.coords.length - 1].x}
                  cy={svgData.coords[svgData.coords.length - 1].y}
                  fill={strokeColor}
                  opacity="0.4"
                  r="9"
                  className="animate-ping"
                />
              </g>
            )}
          </svg>

          {/* Interactive Floating Tooltip */}
          {hoveredPoint && (
            <div
              className="absolute pointer-events-none bg-[#131722] text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-xl -top-2 transform -translate-x-1/2 -translate-y-full transition-all"
              style={{
                left: `${(hoveredPoint.x / 900) * 100}%`,
              }}
            >
              <div className="font-bold tabular-nums">
                ${hoveredPoint.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-gray-300 text-[10px]">{hoveredPoint.time}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
