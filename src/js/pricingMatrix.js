/**
 * FEATURE 1: MULTI-DIMENSIONAL PRICING & PERFORMANCE-ISOLATED LOGIC MATRIX
 * Computes final values dynamically without hardcoded UI parameters or global state reflows[cite: 41, 43, 59, 70].
 */

// 1. The Multi-Dimensional Configuration Matrix Structure [cite: 43, 70]
const pricingMatrix = {
  // Exchange rate variables relative to base tokens [cite: 42, 43]
  rates: {
    INR: 1,
    USD: 0.012,
    EUR: 0.011
  },
  // Currency-specific symbol formatting mapping [cite: 42]
  symbols: {
    INR: '₹',
    USD: '$',
    EUR: '€'
  },
  // Base raw inventory rates (stored securely in local baseline currency)
  basePrices: {
    organic_avocado: 120,
    premium_basmati: 150,
    almond_milk: 250,
    vine_tomatoes: 90
  },
  // Strict flat 20% discount multiplier for automated bulk case purchase structures [cite: 43]
  bulkDiscountMultiplier: 0.8
};

/**
 * Executes high-speed isolated DOM text node mutations[cite: 59, 60].
 * Modifies specific leaf elements without triggering global parent re-renders or layout thrashing[cite: 59, 60, 71, 72].
 * @param {string} selectedCurrency - Chosen currency string value ('INR', 'USD', 'EUR') [cite: 42]
 * @param {boolean} isBulkOrder - Reflects state of toggle control switch [cite: 42]
 */
export function updateGroceryPrices(selectedCurrency, isBulkOrder) {
  // Select only the targeted text nodes containing the price strings [cite: 60, 72]
  const priceNodes = document.querySelectorAll('.grocery-price-node');
  const symbolNodes = document.querySelectorAll('.currency-symbol');
  
  // Resolve localized symbol from configuration matrix
  const resolvedSymbol = pricingMatrix.symbols[selectedCurrency] || '₹';
  
  // 1. First update the standalone currency structural symbol nodes [cite: 60]
  symbolNodes.forEach(symbolNode => {
    symbolNode.innerText = resolvedSymbol;
  });

  // 2. Perform localized calculations across data-bound leaf nodes [cite: 43]
  priceNodes.forEach(node => {
    const itemKey = node.getAttribute('data-item');
    
    // Safety check if dynamic node matching fails
    if (!pricingMatrix.basePrices[itemKey]) return;

    const basePrice = pricingMatrix.basePrices[itemKey];
    const currencyRate = pricingMatrix.rates[selectedCurrency];
    const dealMultiplier = isBulkOrder ? pricingMatrix.bulkDiscountMultiplier : 1;
    
    // Multi-dimensional dynamic transformation chain [cite: 43]
    const finalCalculatedPrice = basePrice * currencyRate * dealMultiplier;
    
    // STRICT DOM MUTATION GUARDRAIL: Only rewrite text node contents[cite: 60, 72]. 
    // Prevents global UI rendering engine updates and layout component flash penalties[cite: 59, 73].
    node.innerText = finalCalculatedPrice.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  });
}