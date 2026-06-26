/**
 * MAIN EXECUTION ORCHESTRATOR
 * Initializes layout systems and enforces strict performance orchestration boundaries (<500ms)[cite: 62, 80].
 */

import { updateGroceryPrices } from './pricingMatrix.js';
import { initBentoAccordion } from './bentoAccordion.js';

// Track execution timelines using high-precision performance markers [cite: 62]
const initializationStart = performance.now();

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Initialize Feature 2: Bento-to-Accordion Grid View Listeners [cite: 74]
  initBentoAccordion();

  // 2. Fetch Core Structural Control Elements
  const currencySelect = document.getElementById('currency-select');
  const billingToggle = document.getElementById('billing-toggle');
  const toggleHandle = document.getElementById('toggle-handle');

  // Localized variables holding baseline layout choices
  let currentCurrency = currencySelect.value || 'INR';
  let isBulkOrder = false;

  // 3. Event Listener: Dynamic Currency Selection Dropdown Switcher [cite: 41, 59]
  currencySelect.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    
    // SURGICAL RUNTIME ENGINE: Triggers zero-parent reflow localized mutations [cite: 59, 60]
    updateGroceryPrices(currentCurrency, isBulkOrder);
  });

  // 4. Event Listener: Isolated Weight Option Toggle Switcher [cite: 41, 59]
  billingToggle.addEventListener('click', () => {
    // Reverse binary checked status state 
    isBulkOrder = !isBulkOrder;
    
    // Update structural ARIA specifications for accessible indexing
    billingToggle.setAttribute('aria-checked', isBulkOrder.toString());
    
    // Hardware-accelerated micro-interaction layout update (150ms - 200ms ease-out) [cite: 65]
    if (isBulkOrder) {
      billingToggle.classList.replace('bg-gray-700', 'bg-emerald-500');
      toggleHandle.classList.replace('translate-x-0', 'translate-x-5');
    } else {
      billingToggle.classList.replace('bg-emerald-500', 'bg-gray-700');
      toggleHandle.classList.replace('translate-x-5', 'translate-x-0');
    }

    // SURGICAL RUNTIME ENGINE: Compute multi-dimensional layout shifts instantly [cite: 43, 59]
    updateGroceryPrices(currentCurrency, isBulkOrder);
  });

  // Run initial baseline pricing evaluation run
  updateGroceryPrices(currentCurrency, isBulkOrder);

  // ==========================================================================
  // HARDWARE-ACCELERATED ISOLATED SMART CART SYSTEM ENGINE
  // ==========================================================================
  
  // Real Localized State (Keeps data binding strictly out of global view reflows)
  const cartState = {};

  const cartDrawer = document.getElementById('cart-drawer');
  const cartItemsWrapper = document.getElementById('cart-items-wrapper');
  const cartCountNode = document.getElementById('cart-count');
  const cartTotalNode = document.getElementById('cart-total-value');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  // Object metadata dictionary mapping human strings
  const itemsMeta = {
    organic_avocado: { name: "Organic Avocado", emoji: "🥑" },
    premium_basmati: { name: "Premium Basmati", emoji: "🌾" },
    almond_milk: { name: "Organic Almond Milk", emoji: "🥛" },
    vine_tomatoes: { name: "Vine Tomatoes", emoji: "🍅" }
  };

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemKey = button.getAttribute('data-item');
      
      // Increment state tally context
      cartState[itemKey] = (cartState[itemKey] || 0) + 1;
      
      // Flash button state visually as micro-interaction response
      const originalText = button.innerText;
      button.innerText = "✓ Allocated";
      button.classList.replace('text-gray-300', 'text-emerald-400');
      setTimeout(() => {
        button.innerText = originalText;
        button.classList.replace('text-emerald-400', 'text-gray-300');
      }, 800);

      // Perform a surgical render updates across the drawer metrics
      renderCartUpdates();
    });
  });

  function renderCartUpdates() {
    let totalItemsCount = 0;
    let computedTotalValue = 0;
    
    // Read active configurations safely from current nodes
    const activePrices = {};
    document.querySelectorAll('.grocery-price-node').forEach(node => {
      activePrices[node.getAttribute('data-item')] = parseFloat(node.innerText.replace(/,/g, ''));
    });

    // Clean html wrapper pool
    cartItemsWrapper.innerHTML = '';

    Object.keys(cartState).forEach(key => {
      const quantity = cartState[key];
      if (quantity === 0) return;

      totalItemsCount += quantity;
      const itemCost = activePrices[key] * quantity;
      computedTotalValue += itemCost;

      // Create isolated wrapper child layout strings
      const itemRow = document.createElement('div');
      itemRow.className = "flex items-center justify-between border-b border-gray-800/40 py-1.5 font-sans";
      itemRow.innerHTML = `
        <div class="flex items-center space-x-2 truncate">
          <span>${itemsMeta[key].emoji}</span>
          <span class="text-white truncate font-medium">${itemsMeta[key].name}</span>
          <span class="text-gray-500 font-mono text-[10px]">x${quantity}</span>
        </div>
        <span class="font-mono text-gray-300">${itemCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      `;
      cartItemsWrapper.appendChild(itemRow);
    });

    // Update system counter strings safely
    cartCountNode.innerText = `${totalItemsCount} item${totalItemsCount !== 1 ? 's' : ''}`;
    cartTotalNode.innerText = computedTotalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Handle high-speed entry transitions (150ms - 200ms ease-out) [cite: 65]
    if (totalItemsCount > 0) {
      cartDrawer.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
    } else {
      cartDrawer.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
      cartItemsWrapper.innerHTML = `<p class="text-gray-500 py-4 text-center italic">Buffer empty. Awaiting stream injection...</p>`;
    }
  }

  // Intercept currency/billing hooks to recalculate values inside the cart automatically
  currencySelect.addEventListener('change', () => setTimeout(renderCartUpdates, 20));
  billingToggle.addEventListener('click', () => setTimeout(renderCartUpdates, 20));

  // ==========================================================================
  // ONLINE OVERLAY PAYMENT TRIGGER FRAMEWORK
  // ==========================================================================
  const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');
  const paymentModal = document.getElementById('payment-modal');
  const closePaymentBtn = document.getElementById('close-payment-btn');
  const modalPayableTotal = document.getElementById('modal-payable-total');
  const processPaymentBtn = document.getElementById('process-payment-btn');
  const modalInnerContainer = paymentModal.querySelector('div');

  checkoutTriggerBtn.addEventListener('click', () => {
    // Dynamically lock down total values right into the payment interface readouts
    modalPayableTotal.innerText = document.getElementById('cart-total-value').innerText;
    
    // Smooth opacity reveal (150ms-200ms ease-out) [cite: 65]
    paymentModal.classList.remove('opacity-0', 'pointer-events-none');
    modalInnerContainer.classList.replace('scale-95', 'scale-100');
  });

  const dismissModal = () => {
    paymentModal.classList.add('opacity-0', 'pointer-events-none');
    modalInnerContainer.classList.replace('scale-100', 'scale-95');
  };

  closePaymentBtn.addEventListener('click', dismissModal);
  paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) dismissModal();
  });

  processPaymentBtn.addEventListener('click', () => {
    processPaymentBtn.innerText = "Authorizing Funds...";
    processPaymentBtn.disabled = true;
    
    setTimeout(() => {
      alert("Fulfillment Buffer cleared. Transaction successfully captured!");
      processPaymentBtn.innerText = "Simulate Instant Authorization";
      processPaymentBtn.disabled = false;
      
      // Flush cart items safely
      Object.keys(cartState).forEach(key => delete cartState[key]);
      renderCartUpdates();
      dismissModal();
    }, 1200);
  });

  // 5. PERFORMANCE CAPS WATCHDOG: Log operational telemetry data limits [cite: 62, 80]
  const initializationEnd = performance.now();
  const totalOrchestrationTime = initializationEnd - initializationStart;
  
  console.log(`%cFreshDrop Engine Activated: Core thread initialized in ${totalOrchestrationTime.toFixed(2)}ms`, 
    totalOrchestrationTime < 500 ? 'color: #10b981; font-weight: bold;' : 'color: #f43f5e; font-weight: bold;'
  );
});