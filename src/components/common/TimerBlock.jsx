import React from 'react';

const TimerBlock = React.memo(({ value, label, isExpired }) => (
  <div 
    className={`relative ${isExpired ? 'opacity-50' : ''}`}
  >
    <div 
      className={`relative text-center p-3 bg-white/90 shadow-sm rounded-xl border ${
        isExpired ? 'border-red-200' : 'border-[#C2A45F]/20'
      }`}
    >
      <div 
        className={`relative text-lg md:text-xl font-bold ${
          isExpired ? 'text-red-400' : 'text-[#4E3B26]'
        }`}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="relative text-[10px] font-medium text-[#4E3B26]/50 uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  </div>
));

export { TimerBlock as default }; 