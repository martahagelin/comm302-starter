import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, Clock, Star } from 'lucide-react';
import {
  INDICES_DATA,
  WORLD_INDICES,
  US_STOCKS,
  CRYPTO_ASSETS,
  COMMODITIES_DATA,
  FOREX_DATA,
} from '../data/marketData';

interface SearchItem {
  id: string;
  symbol: string;
  name: string;
  type: string;
  price: number;
  changePercent: number;
  badge?: string;
  badgeBg?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: SearchItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Stocks' | 'Indices' | 'Crypto' | 'Futures' | 'Forex'>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Aggregate all items
  const allItems: SearchItem[] = [
    ...INDICES_DATA.map((idx) => ({
      id: idx.id,
      symbol: idx.symbol,
      name: idx.name,
      type: 'Index',
      price: idx.price,
      changePercent: idx.changePercent,
      badge: idx.badgeText,
      badgeBg: idx.badgeBg,
    })),
    ...WORLD_INDICES.map((w) => ({
      id: w.symbol,
      symbol: w.symbol,
      name: `${w.name} (${w.country})`,
      type: 'World Index',
      price: w.price,
      changePercent: w.changePercent,
      badge: w.countryCode,
      badgeBg: 'bg-blue-600',
    })),
    ...US_STOCKS.map((s) => ({
      id: s.symbol,
      symbol: s.symbol,
      name: s.name,
      type: 'Stock',
      price: s.price,
      changePercent: s.changePercent,
      badge: s.badge,
      badgeBg: s.badgeBg,
    })),
    ...CRYPTO_ASSETS.map((c) => ({
      id: c.symbol,
      symbol: c.symbol,
      name: c.name,
      type: 'Crypto',
      price: c.price,
      changePercent: c.changePercent,
      badge: c.badge,
      badgeBg: c.badgeBg,
    })),
    ...COMMODITIES_DATA.map((m) => ({
      id: m.symbol,
      symbol: m.symbol,
      name: m.name,
      type: 'Futures',
      price: m.price,
      changePercent: m.changePercent,
      badge: m.badge,
      badgeBg: m.badgeBg,
    })),
    ...FOREX_DATA.map((f) => ({
      id: f.pair,
      symbol: f.pair,
      name: f.name,
      type: 'Forex',
      price: f.rate,
      changePercent: f.changePercent,
    })),
  ];

  // Filter items
  const filtered = allItems.filter((item) => {
    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Stocks' && item.type === 'Stock') ||
      (activeTab === 'Indices' && (item.type === 'Index' || item.type === 'World Index')) ||
      (activeTab === 'Crypto' && item.type === 'Crypto') ||
      (activeTab === 'Futures' && item.type === 'Futures') ||
      (activeTab === 'Forex' && item.type === 'Forex');

    if (!matchesTab) return false;

    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return item.symbol.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        onSelect(filtered[selectedIndex]);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[80vh] animate-scaleUp"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E0E3EB] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#2962FF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search symbol, company, index, crypto (e.g. NVDA, BTC, SPX)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full text-sm font-medium text-[#131722] focus:outline-none placeholder:text-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-gray-100 rounded-md text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline text-[11px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
            ESC
          </kbd>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center px-4 py-2 border-b border-[#E0E3EB] bg-[#F0F3FA]/50 gap-2 overflow-x-auto no-scrollbar text-xs">
          {(['All', 'Stocks', 'Indices', 'Crypto', 'Futures', 'Forex'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full font-medium transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-[#2962FF] shadow-2xs font-semibold'
                  : 'text-[#6A6D78] hover:text-[#131722]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#E0E3EB] p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#6A6D78]">
              No instruments match &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isPos = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#F0F3FA]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.badge ? (
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0 ${
                          item.badgeBg?.startsWith('bg-') ? item.badgeBg : ''
                        }`}
                        style={!item.badgeBg?.startsWith('bg-') ? { backgroundColor: item.badgeBg } : {}}
                      >
                        {item.badge}
                      </span>
                    ) : (
                      <span className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-700">
                        {item.symbol.slice(0, 2)}
                      </span>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#131722]">{item.symbol}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-gray-100 text-[#6A6D78]">
                          {item.type}
                        </span>
                      </div>
                      <div className="text-xs text-[#6A6D78]">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm text-[#131722] tabular-nums">
                      {item.price > 100
                        ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
                        : item.price.toFixed(4)}
                    </div>
                    <div
                      className={`text-xs font-semibold tabular-nums flex items-center justify-end gap-1 ${
                        isPos ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{isPos ? `+${item.changePercent}%` : `${item.changePercent}%`}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F0F3FA] border-t border-[#E0E3EB] text-[11px] text-[#6A6D78] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="font-medium text-[#2962FF]">TradingView Markets Search</span>
        </div>
      </div>
    </div>
  );
};
