/**
 * Formats a price number to display with "K" notation
 * Treats the input value as if it's already in thousands (e.g., 120 → "120K")
 * @param {number|string} price - The price to format
 * @returns {string} - Formatted price string (e.g., "120K", "95K", "9.5K")
 */
export const formatPrice = (price) => {
  // Handle null, undefined, or empty string
  if (price === null || price === undefined || price === "") {
    return "0K";
  }
  
  // Convert to number
  const numPrice = typeof price === "string" ? parseFloat(price.replace(/,/g, "")) : Number(price);
  
  // Handle invalid numbers
  if (isNaN(numPrice) || numPrice < 0) {
    return "0K";
  }
  
  // If the number is >= 1000, convert to K notation
  if (numPrice >= 1000) {
    const thousands = numPrice / 1000;
    // If it's a whole number, don't show decimal
    if (thousands % 1 === 0) {
      return `${thousands}K`;
    }
    // Otherwise, show one decimal place
    return `${thousands.toFixed(1)}k`;
  }
  
  // For numbers < 1000, show as-is with K (e.g., 120 → "120K")
  // If it's a whole number, don't show decimal
  if (numPrice % 1 === 0) {
    return `${Math.round(numPrice)}k`;
  }
  // Otherwise, show one decimal place
  return `${numPrice.toFixed(1)}k`;
};

