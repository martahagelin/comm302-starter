import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Zap, BarChart, Smartphone } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col animate-scaleUp">
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-7 h-7 fill-black" viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 11h-6v17h6V11z" />
            </svg>
            <h3 className="text-lg font-extrabold text-[#131722]">Join TradingView</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-blue-50 text-[#2962FF] font-bold text-xs rounded-full mb-2">
              30-Day Free Pro Trial
            </div>
            <h2 className="text-2xl font-black text-[#131722]">Supercharge your analysis</h2>
            <p className="text-xs text-[#6A6D78] mt-1.5">
              Access real-time streaming data, custom watchlists, unlimited alerts, and institutional-grade charting.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: Zap, text: 'Real-time market depth & zero-delay quotes' },
              { icon: BarChart, text: 'Up to 8 interactive chart layouts per tab' },
              { icon: ShieldCheck, text: 'Custom Pine Script™ strategies & backtesting' },
              { icon: Smartphone, text: 'Cloud sync across web, desktop, and mobile' },
            ].map((f, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-xs text-[#131722]">
                <div className="w-6 h-6 rounded-full bg-[#E8F5F1] text-[#089981] flex items-center justify-center shrink-0">
                  <f.icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">{f.text}</span>
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="p-4 bg-[#E8F5F1] text-[#089981] rounded-2xl text-center text-xs font-bold animate-fadeIn">
              <CheckCircle className="w-6 h-6 mx-auto mb-1 text-[#089981]" />
              Welcome aboard! Your 30-day Pro trial has been activated.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#6A6D78] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E0E3EB] rounded-xl text-xs font-medium text-[#131722] focus:outline-[#2962FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 tv-btn-gradient text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
              >
                Start 30-Day Free Trial
              </button>

              <p className="text-[11px] text-center text-[#6A6D78]">
                No credit card required for trial. Cancel anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
