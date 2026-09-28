import React, { useState, useEffect } from 'react';
import { Search, Globe, User, ChevronDown, Bell, Star, Activity, Check, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  liveSimulation: boolean;
  onToggleLiveSimulation: () => void;
  activeNavTab: string;
  onSelectNavTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenGetStarted,
  onOpenWatchlist,
  watchlistCount,
  liveSimulation,
  onToggleLiveSimulation,
  activeNavTab,
  onSelectNavTab,
}) => {
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const languages = [
    { code: 'EN', label: 'English (US)' },
    { code: 'DE', label: 'Deutsch' },
    { code: 'FR', label: 'Français' },
    { code: 'ES', label: 'Español' },
    { code: 'JA', label: '日本語' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E3EB] px-4 lg:px-6 h-16 flex items-center justify-between transition-shadow">
      {/* Left Navigation Group (Brand Logo & Main Links) */}
      <div className="flex items-center space-x-6">
        {/* TradingView Geometric Logo Glyph */}
        <button
          onClick={() => onSelectNavTab('Markets')}
          aria-label="TradingView Home"
          className="flex items-center gap-1.5 focus:outline-none cursor-pointer group"
        >
          <svg className="w-8 h-8 fill-black group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 11h-6v17h6V11z" />
          </svg>
        </button>

        {/* Quick Search Bar Trigger with Shortcut */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center justify-between w-64 h-9 px-3 bg-[#F0F3FA] hover:bg-[#E0E3EB] rounded-full text-[#6A6D78] text-sm transition-colors border border-transparent hover:border-gray-300 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#6A6D78]" />
            <span className="text-xs font-medium text-[#131722]">Search markets, stocks...</span>
          </div>
          <kbd className="text-[11px] font-mono text-gray-500 bg-white px-1.5 py-0.5 rounded shadow-xs border border-gray-200">
            (Ctrl+K)
          </kbd>
        </button>

        {/* Primary Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {['Products', 'Community', 'Markets', 'Brokers'].map((tab) => {
            const isActive = activeNavTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onSelectNavTab(tab)}
                className={`transition-colors cursor-pointer relative py-2 ${
                  isActive
                    ? 'text-[#2962FF] font-semibold'
                    : 'text-[#131722] hover:text-[#2962FF]'
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2962FF] rounded-full" />
                )}
              </button>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="text-[#131722] hover:text-[#2962FF] flex items-center gap-1 transition-colors cursor-pointer py-2"
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMoreDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E0E3EB] py-2 z-20">
                  <button
                    onClick={() => {
                      onSelectNavTab('Heatmaps');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] hover:bg-[#F0F3FA] transition flex items-center justify-between"
                  >
                    <span>Stock Heatmap</span>
                    <span className="text-[10px] text-[#2962FF] bg-blue-50 px-1.5 py-0.5 rounded">Popular</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectNavTab('Screeners');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] hover:bg-[#F0F3FA] transition"
                  >
                    Stock Screener 2.0
                  </button>
                  <button
                    onClick={() => {
                      onSelectNavTab('Economic Calendar');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] hover:bg-[#F0F3FA] transition"
                  >
                    Economic Calendar
                  </button>
                  <button
                    onClick={() => {
                      onSelectNavTab('Pine Script');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] hover:bg-[#F0F3FA] transition"
                  >
                    Pine Script™ Editor
                  </button>
                  <div className="border-t border-[#E0E3EB] my-1" />
                  <button
                    onClick={() => {
                      onSelectNavTab('News');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#131722] hover:bg-[#F0F3FA] transition"
                  >
                    Live Financial News
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Right Utility Actions (Live Tick, Watchlist, Language, Profile, CTA) */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 text-[#6A6D78] hover:text-[#2962FF] hover:bg-[#F0F3FA] rounded-full transition"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Live Simulation Pulse Indicator */}
        <button
          onClick={onToggleLiveSimulation}
          title={liveSimulation ? 'Live Simulation Active (Click to pause)' : 'Simulation Paused (Click to resume)'}
          className={`flex items-center space-x-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full border transition cursor-pointer ${
            liveSimulation
              ? 'bg-[#E8F5F1] text-[#089981] border-[#089981]/20'
              : 'bg-[#F0F3FA] text-[#6A6D78] border-gray-200'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${liveSimulation ? 'bg-[#089981] animate-pulse' : 'bg-gray-400'}`} />
          <span className="hidden sm:inline">{liveSimulation ? 'Live Ticks' : 'Paused'}</span>
        </button>

        {/* Watchlist Quick Button */}
        <button
          onClick={onOpenWatchlist}
          title="Open Watchlist"
          className="relative p-2 text-[#131722] hover:text-[#2962FF] hover:bg-[#F0F3FA] rounded-full transition cursor-pointer"
        >
          <Star className="w-4 h-4 text-[#6A6D78] hover:text-[#2962FF]" />
          {watchlistCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#2962FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {watchlistCount}
            </span>
          )}
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center space-x-1.5 text-xs font-semibold text-[#131722] hover:text-[#2962FF] px-2 py-1.5 rounded-md hover:bg-[#F0F3FA] transition cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#6A6D78]" />
            <span>{selectedLang}</span>
          </button>

          {langDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-[#E0E3EB] py-1 z-20">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#131722] hover:bg-[#F0F3FA] flex items-center justify-between"
                  >
                    <span>{lang.label}</span>
                    {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-[#2962FF]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* User Account Icon */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            aria-label="User Account"
            className="p-2 text-[#131722] hover:text-[#2962FF] hover:bg-[#F0F3FA] rounded-full transition cursor-pointer"
          >
            <User className="w-5 h-5 text-[#6A6D78]" />
          </button>

          {userDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E0E3EB] p-3 z-20 text-xs">
                <div className="pb-2 border-b border-[#E0E3EB] mb-2">
                  <div className="font-bold text-sm text-[#131722]">Guest Trader</div>
                  <div className="text-[11px] text-[#6A6D78]">Paper Account: $100,000.00</div>
                </div>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onOpenWatchlist();
                  }}
                  className="w-full text-left py-1.5 hover:text-[#2962FF] flex items-center justify-between"
                >
                  <span>My Watchlists</span>
                  <span className="text-[#6A6D78]">{watchlistCount} symbols</span>
                </button>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onToggleLiveSimulation();
                  }}
                  className="w-full text-left py-1.5 hover:text-[#2962FF] flex items-center justify-between"
                >
                  <span>Real-time Stream</span>
                  <span className={liveSimulation ? 'text-[#089981] font-bold' : 'text-gray-400'}>
                    {liveSimulation ? 'Active' : 'Paused'}
                  </span>
                </button>
                <div className="border-t border-[#E0E3EB] my-2 pt-2">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenGetStarted();
                    }}
                    className="w-full py-1.5 text-center font-bold text-white tv-btn-gradient rounded-lg"
                  >
                    Upgrade to Pro+
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Get Started Button with TradingView signature gradient */}
        <button
          onClick={onOpenGetStarted}
          className="tv-btn-gradient text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xs hover:shadow transition-all duration-150 cursor-pointer"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
