/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { IndicesSection } from './components/IndicesSection';
import { DualColumnMarkets } from './components/DualColumnMarkets';
import { CryptoCommodities } from './components/CryptoCommodities';
import { CategoryView } from './components/CategoryView';
import { SecondaryViews } from './components/SecondaryViews';
import { SearchModal } from './components/SearchModal';
import { SymbolDetailModal, DetailInstrument } from './components/SymbolDetailModal';
import { WatchlistModal } from './components/WatchlistModal';
import { GetStartedModal } from './components/GetStartedModal';
import { Footer } from './components/Footer';

import {
  INDICES_DATA,
  WORLD_INDICES,
  US_STOCKS,
  QUICK_MOVERS,
  CRYPTO_ASSETS,
  COMMODITIES_DATA,
  MarketInstrument,
  WorldIndex,
  USStock,
  CryptoAsset,
  CommodityAsset,
} from './data/marketData';

export default function App() {
  // Navigation & Category states
  const [activeNavTab, setActiveNavTab] = useState<string>('Markets');
  const [activeCategory, setActiveCategory] = useState<string>('US stocks');
  const [selectedRegion, setSelectedRegion] = useState<string>('Global Overview');

  // Featured Index in main widget
  const [indices, setIndices] = useState<MarketInstrument[]>(INDICES_DATA);
  const [selectedIndexId, setSelectedIndexId] = useState<string>('spx');

  // Market datasets (with live updates)
  const [usStocks, setUsStocks] = useState<USStock[]>(US_STOCKS);
  const [worldIndices, setWorldIndices] = useState<WorldIndex[]>(WORLD_INDICES);
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>(CRYPTO_ASSETS);
  const [commodityAssets, setCommodityAssets] = useState<CommodityAsset[]>(COMMODITIES_DATA);

  // Live simulation tick engine toggle
  const [liveSimulation, setLiveSimulation] = useState<boolean>(true);

  // Modals
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [getStartedModalOpen, setGetStartedModalOpen] = useState<boolean>(false);
  const [watchlistModalOpen, setWatchlistModalOpen] = useState<boolean>(false);
  const [activeDetailInstrument, setActiveDetailInstrument] = useState<DetailInstrument | null>(null);

  // Watchlist stored in state & synced with localStorage
  const [watchlist, setWatchlist] = useState<
    { symbol: string; name: string; price: number; changePercent: number }[]
  >(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      { symbol: 'SPX', name: 'S&P 500 Index', price: 5864.67, changePercent: 0.35 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 141.98, changePercent: -3.26 },
      { symbol: 'BTC', name: 'Bitcoin', price: 91248.5, changePercent: 3.42 },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('tv_watchlist', JSON.stringify(watchlist));
    } catch {
      // ignore
    }
  }, [watchlist]);

  // Live price tick simulation
  useEffect(() => {
    if (!liveSimulation) return;

    const interval = setInterval(() => {
      // Update indices
      setIndices((prev) =>
        prev.map((idx) => {
          const delta = (Math.random() - 0.49) * 0.4;
          const newPrice = Number((idx.price + delta).toFixed(2));
          return {
            ...idx,
            price: newPrice,
          };
        })
      );

      // Update US stocks
      setUsStocks((prev) =>
        prev.map((stock) => {
          const delta = (Math.random() - 0.49) * 0.15;
          return {
            ...stock,
            price: Number((stock.price + delta).toFixed(2)),
          };
        })
      );

      // Update Crypto
      setCryptoAssets((prev) =>
        prev.map((c) => {
          const delta = (Math.random() - 0.49) * (c.price * 0.001);
          return {
            ...c,
            price: Number((c.price + delta).toFixed(2)),
          };
        })
      );
    }, 3200);

    return () => clearInterval(interval);
  }, [liveSimulation]);

  // Watchlist toggle handler
  const handleToggleWatchlist = (item: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
  }) => {
    setWatchlist((prev) => {
      const exists = prev.some((w) => w.symbol === item.symbol);
      if (exists) {
        return prev.filter((w) => w.symbol !== item.symbol);
      } else {
        return [
          ...prev,
          {
            symbol: item.symbol,
            name: item.name,
            price: item.price,
            changePercent: item.changePercent,
          },
        ];
      }
    });
  };

  const isWatchlisted = (symbol: string) => watchlist.some((w) => w.symbol === symbol);

  // Symbol selection handlers
  const handleSelectStock = (stock: USStock) => {
    setActiveDetailInstrument({
      symbol: stock.symbol,
      name: stock.name,
      price: stock.price,
      changePercent: stock.changePercent,
      exchange: stock.exchange,
      volume: stock.volume,
      marketCap: stock.marketCap,
      peRatio: stock.peRatio,
      badge: stock.badge,
      badgeBg: stock.badgeBg,
    });
  };

  const handleSelectWorldIndex = (index: WorldIndex) => {
    setActiveDetailInstrument({
      symbol: index.symbol,
      name: index.name,
      price: index.price,
      changePercent: index.changePercent,
      exchange: index.country,
      badge: index.countryCode,
      badgeBg: index.flagBg,
    });
  };

  const handleSelectCrypto = (crypto: CryptoAsset) => {
    setActiveDetailInstrument({
      symbol: crypto.symbol,
      name: crypto.name,
      price: crypto.price,
      changePercent: crypto.changePercent,
      exchange: 'Crypto',
      volume: crypto.volume24h,
      marketCap: crypto.marketCap,
      badge: crypto.badge,
      badgeBg: crypto.badgeBg,
    });
  };

  const handleSelectCommodity = (commodity: CommodityAsset) => {
    setActiveDetailInstrument({
      symbol: commodity.symbol,
      name: commodity.name,
      price: commodity.price,
      changePercent: commodity.changePercent,
      exchange: commodity.market,
      badge: commodity.badge,
      badgeBg: commodity.badgeBg,
    });
  };

  const handleSelectQuickMover = (symbol: string) => {
    const foundStock = usStocks.find((s) => s.symbol === symbol);
    if (foundStock) {
      handleSelectStock(foundStock);
    } else {
      const mover = QUICK_MOVERS.find((m) => m.symbol === symbol);
      setActiveDetailInstrument({
        symbol,
        name: `${symbol} Equity`,
        price: symbol === 'PLTR' ? 62.45 : symbol === 'DIS' ? 104.2 : 210.0,
        changePercent: mover ? mover.changePercent : 5.0,
        exchange: 'NASDAQ',
        badge: symbol.slice(0, 2),
        badgeBg: 'bg-indigo-900',
      });
    }
  };

  const handleSelectSearchItem = (item: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    badge?: string;
    badgeBg?: string;
  }) => {
    // If it's one of the main 3 indices, set it active in the chart
    const matchIndex = indices.find((idx) => idx.symbol === item.symbol || idx.id === item.symbol.toLowerCase());
    if (matchIndex) {
      setSelectedIndexId(matchIndex.id);
    } else {
      setActiveDetailInstrument({
        symbol: item.symbol,
        name: item.name,
        price: item.price,
        changePercent: item.changePercent,
        badge: item.badge,
        badgeBg: item.badgeBg,
      });
    }
  };

  const handleLegalClick = (type: string) => {
    alert(`TradingView Markets: ${type}\n\nAll real-time data displayed is simulated for educational and developmental demonstration purposes.`);
  };

  return (
    <div className="bg-white text-[#131722] min-h-screen antialiased selection:bg-blue-100 selection:text-[#2962FF] flex flex-col font-sans">
      {/* BEGIN: TopNavigationBar */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenGetStarted={() => setGetStartedModalOpen(true)}
        onOpenWatchlist={() => setWatchlistModalOpen(true)}
        watchlistCount={watchlist.length}
        liveSimulation={liveSimulation}
        onToggleLiveSimulation={() => setLiveSimulation(!liveSimulation)}
        activeNavTab={activeNavTab}
        onSelectNavTab={(tab) => setActiveNavTab(tab)}
      />
      {/* END: TopNavigationBar */}

      {/* Main Content View Switcher */}
      {activeNavTab !== 'Markets' ? (
        <SecondaryViews
          view={activeNavTab}
          onBackToMarkets={() => setActiveNavTab('Markets')}
          onSelectSymbol={handleSelectQuickMover}
        />
      ) : (
        <>
          {/* BEGIN: HeroHeader */}
          <HeroHeader
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
            selectedRegion={selectedRegion}
            onSelectRegion={(reg) => setSelectedRegion(reg)}
          />
          {/* END: HeroHeader */}

          {/* Render Specialized Category Screen if user picked a dedicated non-overview pill */}
          {['Forex', 'Government bonds', 'Corporate bonds', 'ETFs', 'Economy'].includes(
            activeCategory
          ) ? (
            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex-1 w-full">
              <CategoryView
                category={activeCategory}
                onClose={() => setActiveCategory('US stocks')}
                onSelectInstrument={(symbol, name, price, changePercent) =>
                  setActiveDetailInstrument({
                    symbol,
                    name,
                    price,
                    changePercent,
                    exchange: activeCategory,
                  })
                }
              />
            </main>
          ) : (
            /* Standard Full Markets Overview Grid */
            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-4 space-y-12 flex-1 w-full">
              {/* BEGIN: PrimaryIndicesSection */}
              <IndicesSection
                indices={indices}
                selectedIndexId={selectedIndexId}
                onSelectIndex={(id) => setSelectedIndexId(id)}
                onOpenInstrumentDetail={(inst) =>
                  setActiveDetailInstrument({
                    symbol: inst.symbol,
                    name: inst.name,
                    price: inst.price,
                    changePercent: inst.changePercent,
                    exchange: inst.exchange,
                    open: inst.open,
                    high: inst.high,
                    low: inst.low,
                    volume: inst.volume,
                    marketCap: inst.marketCap,
                    peRatio: inst.peRatio,
                    badge: inst.badgeText,
                    badgeBg: inst.badgeBg,
                  })
                }
                isWatchlisted={isWatchlisted}
                onToggleWatchlist={(inst) =>
                  handleToggleWatchlist({
                    symbol: inst.symbol,
                    name: inst.name,
                    price: inst.price,
                    changePercent: inst.changePercent,
                  })
                }
              />
              {/* END: PrimaryIndicesSection */}

              {/* BEGIN: DualColumnMarketsGrid */}
              <DualColumnMarkets
                worldIndices={worldIndices}
                usStocks={usStocks}
                quickMovers={QUICK_MOVERS}
                onSelectStock={handleSelectStock}
                onSelectWorldIndex={handleSelectWorldIndex}
                onSelectQuickMover={handleSelectQuickMover}
              />
              {/* END: DualColumnMarketsGrid */}

              {/* BEGIN: CryptoAndCommoditiesSection */}
              <CryptoCommodities
                cryptoAssets={cryptoAssets}
                commodityAssets={commodityAssets}
                onSelectCrypto={handleSelectCrypto}
                onSelectCommodity={handleSelectCommodity}
              />
              {/* END: CryptoAndCommoditiesSection */}
            </main>
          )}
        </>
      )}

      {/* BEGIN: MinimalFooter */}
      <Footer onLegalClick={handleLegalClick} />
      {/* END: MinimalFooter */}

      {/* MODALS */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelect={handleSelectSearchItem}
      />

      <SymbolDetailModal
        instrument={activeDetailInstrument}
        onClose={() => setActiveDetailInstrument(null)}
        isWatchlisted={
          activeDetailInstrument ? isWatchlisted(activeDetailInstrument.symbol) : false
        }
        onToggleWatchlist={() => {
          if (activeDetailInstrument) {
            handleToggleWatchlist({
              symbol: activeDetailInstrument.symbol,
              name: activeDetailInstrument.name,
              price: activeDetailInstrument.price,
              changePercent: activeDetailInstrument.changePercent,
            });
          }
        }}
      />

      <WatchlistModal
        isOpen={watchlistModalOpen}
        onClose={() => setWatchlistModalOpen(false)}
        watchlist={watchlist}
        onRemove={(symbol) =>
          setWatchlist((prev) => prev.filter((w) => w.symbol !== symbol))
        }
        onSelect={handleSelectQuickMover}
      />

      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={() => setGetStartedModalOpen(false)}
      />
    </div>
  );
}
