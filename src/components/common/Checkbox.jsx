import React from 'react';

export const Checkbox = ({ checked, onChange, label, ...props }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} {...props} />
    <span>{label}</span>
  </label>
);

export default Checkbox; 