import React from 'react';
import { motion } from 'framer-motion';

const TimeUnit = ({ value, label }) => (
  <div className="text-center">
    <motion.div 
      key={value}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="font-bold"
    >
      {String(value).padStart(2, '0')}
    </motion.div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

const Separator = () => (
  <div className="font-bold self-start mt-1">:</div>
);

export default function CountdownTimer({ days, hours, minutes, seconds }) {
  return (
    <div className="flex justify-center items-start gap-2">
      <TimeUnit value={days} label="DAY" />
      <Separator />
      <TimeUnit value={hours} label="HRS" />
      <Separator />
      <TimeUnit value={minutes} label="MIN" />
      <Separator />
      <TimeUnit value={seconds} label="SEC" />
    </div>
  );
} 