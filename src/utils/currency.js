/**
 * Format a price with Moroccan Dirham (MAD) symbol
 * @param {number|string} amount - The amount to format
 * @param {Object} options - Formatting options
 * @param {number} [options.decimals=2] - Number of decimal places
 * @param {string} [options.decimal=','] - Decimal separator
 * @param {string} [options.thousands=' '] - Thousands separator
 * @returns {string} Formatted price with MAD symbol
 */
export const formatPrice = (amount, options = {}) => {
  const {
    decimals = 2,
    decimal = ',',
    thousands = ' ',
  } = options;

  // Convert string to number if needed
  const num = typeof amount === 'string' ? parseFloat(amount) : amount || 0;
  
  // Handle invalid numbers
  if (isNaN(num)) return '0,00 MAD';

  // Format the number with specified decimal places
  let parts = num.toFixed(decimals).split('.');
  
  // Add thousands separators
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
  
  // Join with the specified decimal separator
  const formattedAmount = parts.join(decimal);
  
  // Return with MAD symbol (right side)
  return `${formattedAmount} MAD`;
};

/**
 * Format a price range (min - max)
 * @param {number|string} min - Minimum price
 * @param {number|string} max - Maximum price
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (min, max) => {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};
