import React from 'react';

export const Radio = ({ name, value, checked, onChange, label, ...props }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} {...props} />
    <span>{label}</span>
  </label>
);

export default Radio; 