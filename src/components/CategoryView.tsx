import React, { useState } from 'react';
import { ChevronRight, ArrowUpDown, Calendar, DollarSign, Percent, ShieldCheck } from 'lucide-react';
import {
  FOREX_DATA,
  BONDS_DATA,
  ETF_DATA,
  ECONOMIC_DATA,
  ForexPair,
  BondData,
  ETFData,
  EconomicIndicator,
} from '../data/marketData';

interface CategoryViewProps {
  category: string;
  onClose: () => void;
  onSelectInstrument: (symbol: string, name: string, price: number, changePercent: number) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  onClose,
  onSelectInstrument,
}) => {
  const [forexAmount, setForexAmount] = useState<number>(1000);
  const [selectedForexPair, setSelectedForexPair] = useState<ForexPair>(FOREX_DATA[0]);

  if (category === 'Forex') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#2962FF] uppercase tracking-wider">
              Foreign Exchange
            </div>
            <h2 className="text-2xl font-bold text-[#131722]">Global Currency Pairs</h2>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#6A6D78] hover:text-[#2962FF] bg-[#F0F3FA] px-3 py-1.5 rounded-full transition"
          >
            ← Back to Overview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forex Table */}
          <div className="lg:col-span-2 border border-[#E0E3EB] rounded-2xl bg-white shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F0F3FA] border-b border-[#E0E3EB] text-[#6A6D78] uppercase font-medium">
                <tr>
                  <th className="py-3 px-4">Pair</th>
                  <th className="py-3 px-4 text-right">Exchange Rate</th>
                  <th className="py-3 px-4 text-right">24h Change</th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell">Day Range</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E3EB]">
                {FOREX_DATA.map((fx) => {
                  const isPos = fx.changePercent >= 0;
                  return (
                    <tr
                      key={fx.pair}
                      onClick={() => setSelectedForexPair(fx)}
                      className={`hover:bg-[#F0F3FA]/70 transition-colors cursor-pointer ${
                        selectedForexPair.pair === fx.pair ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#131722] text-sm">{fx.pair}</div>
                        <div className="text-[11px] text-[#6A6D78]">{fx.name}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-sm tabular-nums text-[#131722]">
                        {fx.rate.toFixed(4)}
                      </td>
                      <td
                        className={`py-3.5 px-4 text-right font-semibold tabular-nums ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? `+${fx.changePercent}%` : `${fx.changePercent}%`}
                      </td>
                      <td className="py-3.5 px-4 text-right hidden sm:table-cell tabular-nums text-gray-500">
                        {fx.low.toFixed(4)} — {fx.high.toFixed(4)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectInstrument(fx.pair, fx.name, fx.rate, fx.changePercent);
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#2962FF] bg-blue-50 hover:bg-blue-100 rounded-md transition"
                        >
                          Chart
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Currency Converter */}
          <div className="border border-[#E0E3EB] rounded-2xl bg-white p-5 shadow-2xs space-y-4">
            <div className="font-bold text-base text-[#131722] flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-[#2962FF]" />
              <span>Currency Calculator</span>
            </div>
            <div className="text-xs text-[#6A6D78]">
              Selected: <strong className="text-[#131722]">{selectedForexPair.pair}</strong> (Rate: {selectedForexPair.rate.toFixed(4)})
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6A6D78] mb-1">
                Base Amount ({selectedForexPair.pair.split('/')[0]})
              </label>
              <input
                type="number"
                value={forexAmount}
                onChange={(e) => setForexAmount(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-[#E0E3EB] rounded-lg text-sm font-semibold text-[#131722] focus:outline-[#2962FF]"
              />
            </div>

            <div className="p-3 bg-[#F0F3FA] rounded-xl text-center">
              <div className="text-xs text-[#6A6D78]">Estimated Conversion</div>
              <div className="text-2xl font-extrabold text-[#131722] tabular-nums mt-1">
                {(forexAmount * selectedForexPair.rate).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                <span className="text-xs font-semibold text-[#6A6D78]">
                  {selectedForexPair.pair.split('/')[1]}
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectInstrument(selectedForexPair.pair, selectedForexPair.name, selectedForexPair.rate, selectedForexPair.changePercent)}
              className="w-full py-2.5 text-xs font-bold text-white tv-btn-gradient rounded-xl shadow-xs hover:shadow transition"
            >
              Open Technical Chart
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (category === 'Government bonds' || category === 'Corporate bonds') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#2962FF] uppercase tracking-wider">
              Fixed Income &amp; Sovereign Debt
            </div>
            <h2 className="text-2xl font-bold text-[#131722]">{category} &amp; Yield Curve</h2>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#6A6D78] hover:text-[#2962FF] bg-[#F0F3FA] px-3 py-1.5 rounded-full transition"
          >
            ← Back to Overview
          </button>
        </div>

        <div className="border border-[#E0E3EB] rounded-2xl bg-white shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F0F3FA] border-b border-[#E0E3EB] text-[#6A6D78] uppercase font-medium">
              <tr>
                <th className="py-3 px-4">Bond / Security</th>
                <th className="py-3 px-4 text-right">Yield Rate</th>
                <th className="py-3 px-4 text-right">Change (bps)</th>
                <th className="py-3 px-4 text-right">Maturity</th>
                <th className="py-3 px-4 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]">
              {BONDS_DATA.map((bond) => {
                const isPos = bond.change >= 0;
                return (
                  <tr
                    key={bond.code}
                    className="hover:bg-[#F0F3FA]/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#131722] text-sm">{bond.name}</div>
                      <div className="text-[11px] text-[#6A6D78]">Ticker: {bond.code}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-sm tabular-nums text-[#131722]">
                      {bond.yieldRate.toFixed(3)}%
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-semibold tabular-nums ${
                        isPos ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPos ? `+${bond.change}` : `${bond.change}`}
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-500 font-medium">
                      {bond.maturity}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onSelectInstrument(bond.code, bond.name, bond.yieldRate, bond.change)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#2962FF] bg-blue-50 hover:bg-blue-100 rounded-md transition"
                      >
                        Chart
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

  if (category === 'ETFs') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#2962FF] uppercase tracking-wider">
              Exchange Traded Funds
            </div>
            <h2 className="text-2xl font-bold text-[#131722]">Popular Index &amp; Sector ETFs</h2>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#6A6D78] hover:text-[#2962FF] bg-[#F0F3FA] px-3 py-1.5 rounded-full transition"
          >
            ← Back to Overview
          </button>
        </div>

        <div className="border border-[#E0E3EB] rounded-2xl bg-white shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F0F3FA] border-b border-[#E0E3EB] text-[#6A6D78] uppercase font-medium">
              <tr>
                <th className="py-3 px-4">Fund Name</th>
                <th className="py-3 px-4 text-right">NAV Price</th>
                <th className="py-3 px-4 text-right">Change %</th>
                <th className="py-3 px-4 text-right">AUM</th>
                <th className="py-3 px-4 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]">
              {ETF_DATA.map((etf) => {
                const isPos = etf.changePercent >= 0;
                return (
                  <tr
                    key={etf.symbol}
                    className="hover:bg-[#F0F3FA]/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#131722] text-sm">{etf.symbol}</div>
                      <div className="text-[11px] text-[#6A6D78]">
                        {etf.name} · {etf.issuer}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-sm tabular-nums text-[#131722]">
                      ${etf.price.toFixed(2)}
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-semibold tabular-nums ${
                        isPos ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPos ? `+${etf.changePercent}%` : `${etf.changePercent}%`}
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-500 font-medium">
                      {etf.aum}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onSelectInstrument(etf.symbol, etf.name, etf.price, etf.changePercent)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#2962FF] bg-blue-50 hover:bg-blue-100 rounded-md transition"
                      >
                        Chart
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

  if (category === 'Economy') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#2962FF] uppercase tracking-wider">
              Macroeconomic Data
            </div>
            <h2 className="text-2xl font-bold text-[#131722]">Key Economic Calendar &amp; Indicators</h2>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#6A6D78] hover:text-[#2962FF] bg-[#F0F3FA] px-3 py-1.5 rounded-full transition"
          >
            ← Back to Overview
          </button>
        </div>

        <div className="border border-[#E0E3EB] rounded-2xl bg-white shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F0F3FA] border-b border-[#E0E3EB] text-[#6A6D78] uppercase font-medium">
              <tr>
                <th className="py-3 px-4">Event / Indicator</th>
                <th className="py-3 px-4 text-right">Actual / Current</th>
                <th className="py-3 px-4 text-right">Consensus</th>
                <th className="py-3 px-4 text-right">Previous</th>
                <th className="py-3 px-4 text-center">Impact</th>
                <th className="py-3 px-4 text-right">Release Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]">
              {ECONOMIC_DATA.map((eco) => (
                <tr key={eco.title} className="hover:bg-[#F0F3FA]/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#131722] text-sm">{eco.title}</div>
                    <div className="text-[11px] text-[#6A6D78]">Country: {eco.country}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-sm tabular-nums text-[#131722]">
                    {eco.current}
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-gray-500 font-medium">
                    {eco.consensus}
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-gray-400">
                    {eco.previous}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        eco.impact === 'High'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {eco.impact}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-gray-500 font-medium">
                    {eco.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};
