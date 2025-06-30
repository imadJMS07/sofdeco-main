import React from 'react';

const HomeSliderIndicator = ({ current, total }) => (
  <div className="flex items-center gap-1 text-lg font-medium text-gray-700 select-none">
    <span>{current}</span>
    <span className="mx-1 text-gray-400">/</span>
    <span>{total}</span>
  </div>
);

export default HomeSliderIndicator; 