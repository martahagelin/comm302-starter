import React from 'react';
import { X, Trash2, Star, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { MarketInstrument } from '../data/marketData';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: WatchlistItem[];
  onRemove: (symbol: string) => void;
  onSelect: (symbol: string) => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemove,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp">
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="text-lg font-bold text-[#131722]">My Watchlist</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#2962FF]">
              {watchlist.length} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#E0E3EB]">
          {watchlist.length === 0 ? (
            <div className="py-12 text-center text-[#6A6D78]">
              <Star className="w-10 h-10 mx-auto text-gray-300 mb-2 stroke-1" />
              <p className="font-semibold text-sm text-[#131722]">Your watchlist is empty</p>
              <p className="text-xs text-gray-400 mt-1">
                Click the star icon next to any symbol or chart to track it here.
              </p>
            </div>
          ) : (
            watchlist.map((item) => {
              const isPos = item.changePercent >= 0;
              return (
                <div
                  key={item.symbol}
                  className="py-3 px-2 flex items-center justify-between hover:bg-[#F0F3FA] rounded-xl transition cursor-pointer group"
                  onClick={() => {
                    onSelect(item.symbol);
                    onClose();
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="font-bold text-sm text-[#131722] group-hover:text-[#2962FF] transition-colors">
                      {item.symbol}
                    </div>
                    <div className="text-xs text-[#6A6D78] truncate max-w-[160px]">{item.name}</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-xs text-[#131722] tabular-nums">
                        ${item.price > 100
                          ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
                          : item.price.toFixed(4)}
                      </div>
                      <div
                        className={`text-[11px] font-semibold tabular-nums ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? `+${item.changePercent}%` : `${item.changePercent}%`}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.symbol);
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-md transition"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 bg-[#F0F3FA] border-t border-[#E0E3EB] flex items-center justify-between text-xs text-[#6A6D78]">
          <span>Synced with local storage</span>
          <button
            onClick={onClose}
            className="font-semibold text-[#2962FF] hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
