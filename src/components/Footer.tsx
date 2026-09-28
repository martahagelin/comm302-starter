import React from 'react';

interface FooterProps {
  onLegalClick: (type: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  return (
    <footer className="mt-16 border-t border-[#E0E3EB] bg-white text-xs text-[#6A6D78] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-semibold text-[#131722]">TradingView</span>
          <span>Quotes are real-time and simulated for educational purposes.</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onLegalClick('Terms of use')}
            className="hover:underline hover:text-[#131722] cursor-pointer"
          >
            Terms of use
          </button>
          <button
            onClick={() => onLegalClick('Privacy policy')}
            className="hover:underline hover:text-[#131722] cursor-pointer"
          >
            Privacy policy
          </button>
          <button
            onClick={() => onLegalClick('Cookies')}
            className="hover:underline hover:text-[#131722] cursor-pointer"
          >
            Cookies
          </button>
        </div>
      </div>
    </footer>
  );
};
