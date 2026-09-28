import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface HeroHeaderProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedRegion: string;
  onSelectRegion: (reg: string) => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  activeCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
}) => {
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  const categories = [
    'US stocks',
    'World stocks',
    'Crypto',
    'Futures',
    'Forex',
    'Government bonds',
    'Corporate bonds',
    'ETFs',
    'Economy',
  ];

  const regions = [
    { id: 'Global Overview', label: 'Global Overview' },
    { id: 'US & Americas', label: 'US & Americas' },
    { id: 'Europe', label: 'Europe (DAX, FTSE, CAC)' },
    { id: 'Asia-Pacific', label: 'Asia-Pacific (Nikkei, HSI)' },
    { id: 'Crypto Ecosystem', label: 'Crypto & Digital Assets' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-4 text-center">
      {/* Big Headline with Interactive Dropdown Chevron */}
      <div className="relative inline-block mb-6">
        <button
          onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
          className="inline-flex items-center gap-2 cursor-pointer group focus:outline-none"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#131722] hover:text-[#2962FF] transition-colors">
            Markets, {selectedRegion === 'Global Overview' ? 'everywhere' : selectedRegion}
          </h1>
          <ChevronDown
            className={`w-7 h-7 text-[#131722] group-hover:text-[#2962FF] group-hover:translate-y-0.5 transition-all ${
              regionDropdownOpen ? 'rotate-180 text-[#2962FF]' : ''
            }`}
          />
        </button>

        {regionDropdownOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setRegionDropdownOpen(false)} />
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] py-2 z-30 text-left">
              <div className="px-4 py-2 text-[11px] font-bold text-[#6A6D78] uppercase tracking-wider border-b border-[#E0E3EB]">
                Market Focus View
              </div>
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => {
                    onSelectRegion(reg.id);
                    setRegionDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-xs font-semibold text-[#131722] hover:bg-[#F0F3FA] transition flex items-center justify-between"
                >
                  <span>{reg.label}</span>
                  {selectedRegion === reg.id && <Check className="w-4 h-4 text-[#2962FF]" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Category Pill Filter Navigation */}
      <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar space-x-2 pb-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'font-semibold bg-[#F0F3FA] text-[#131722] shadow-2xs hover:bg-[#E0E3EB]'
                  : 'font-medium text-[#6A6D78] hover:text-[#131722] hover:bg-[#F0F3FA]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
};
