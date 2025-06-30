import { useState, useEffect } from 'react';

export const useSpecialOffer = () => {
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    // Check if the popup should be hidden (24h)
    const hide24h = localStorage.getItem('hideSpecialOffer24h');
    if (hide24h && new Date().getTime() < parseInt(hide24h)) {
      return;
    }
    
    // Check if the popup should be hidden (15min)
    const hide15min = localStorage.getItem('hideSpecialOffer15min');
    if (hide15min && new Date().getTime() < parseInt(hide15min)) {
      return;
    }

    // Show the popup after a short delay
    const timer = setTimeout(() => {
      setShowOffer(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowOffer(false);
  };

  return {
    showOffer,
    handleClose
  };
}; 