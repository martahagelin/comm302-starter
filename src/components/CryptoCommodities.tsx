import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { CryptoAsset, CommodityAsset } from '../data/marketData';

interface CryptoCommoditiesProps {
  cryptoAssets: CryptoAsset[];
  commodityAssets: CommodityAsset[];
  onSelectCrypto: (asset: CryptoAsset) => void;
  onSelectCommodity: (asset: CommodityAsset) => void;
}

export const CryptoCommodities: React.FC<CryptoCommoditiesProps> = ({
  cryptoAssets,
  commodityAssets,
  onSelectCrypto,
  onSelectCommodity,
}) => {
  const [showAllCrypto, setShowAllCrypto] = useState(false);
  const [showAllCommodities, setShowAllCommodities] = useState(false);

  const visibleCrypto = showAllCrypto ? cryptoAssets : cryptoAssets.slice(0, 3);
  const visibleCommodities = showAllCommodities ? commodityAssets : commodityAssets.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4" data-purpose="crypto-commodities">
      {/* Crypto Assets Column */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAllCrypto(!showAllCrypto)}
            className="inline-flex items-center space-x-1 text-xl font-bold tracking-tight hover:text-[#2962FF] group cursor-pointer focus:outline-none"
          >
            <span>Cryptocurrency</span>
            <ChevronRight className="w-4 h-4 text-[#6A6D78] group-hover:text-[#2962FF] transition-colors" />
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-[#6A6D78]">Market Cap: $3.12T</span>
            <button
              onClick={() => setShowAllCrypto(!showAllCrypto)}
              className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
            >
              {showAllCrypto ? 'Show less' : 'View all'}
            </button>
          </div>
        </div>

        <div className="border border-[#E0E3EB] rounded-xl divide-y divide-[#E0E3EB] bg-white shadow-2xs overflow-hidden">
          {visibleCrypto.map((coin) => {
            const isPos = coin.changePercent >= 0;
            return (
              <div
                key={coin.symbol}
                onClick={() => onSelectCrypto(coin)}
                className="p-3.5 flex items-center justify-between hover:bg-[#F0F3FA]/70 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full ${coin.badgeBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
                  >
                    {coin.badge}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#131722] group-hover:text-[#2962FF] transition-colors">
                      {coin.name}
                    </div>
                    <div className="text-[11px] text-[#6A6D78]">{coin.pair}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#131722] tabular-nums">
                    {coin.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}{' '}
                    <span className="text-[10px] text-[#6A6D78] font-normal">{coin.currency}</span>
                  </div>
                  <div
                    className={`text-xs font-semibold tabular-nums ${
                      isPos ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPos ? `+${coin.changePercent}%` : `${coin.changePercent}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Futures & Commodities Column */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAllCommodities(!showAllCommodities)}
            className="inline-flex items-center space-x-1 text-xl font-bold tracking-tight hover:text-[#2962FF] group cursor-pointer focus:outline-none"
          >
            <span>Futures &amp; Commodities</span>
            <ChevronRight className="w-4 h-4 text-[#6A6D78] group-hover:text-[#2962FF] transition-colors" />
          </button>
          <button
            onClick={() => setShowAllCommodities(!showAllCommodities)}
            className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
          >
            {showAllCommodities ? 'Show less' : 'View all'}
          </button>
        </div>

        <div className="border border-[#E0E3EB] rounded-xl divide-y divide-[#E0E3EB] bg-white shadow-2xs overflow-hidden">
          {visibleCommodities.map((item) => {
            const isPos = item.changePercent >= 0;
            return (
              <div
                key={item.symbol}
                onClick={() => onSelectCommodity(item)}
                className="p-3.5 flex items-center justify-between hover:bg-[#F0F3FA]/70 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg ${item.badgeBg} ${item.badgeTextColor} flex items-center justify-center font-black text-xs shrink-0 shadow-xs`}
                  >
                    {item.badge}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#131722] group-hover:text-[#2962FF] transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#6A6D78]">{item.market}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#131722] tabular-nums">
                    {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}{' '}
                    <span className="text-[10px] text-[#6A6D78] font-normal">{item.currency}</span>
                  </div>
                  <div
                    className={`text-xs font-semibold tabular-nums ${
                      isPos ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPos ? `+${item.changePercent}%` : `${item.changePercent}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
