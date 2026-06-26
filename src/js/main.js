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
      billingToggle.classList.add('bg-[#FFC801]');
      toggleHandle.classList.replace('translate-x-0', 'translate-x-5');
      // Shift toggle bubble profile accent dynamically
      toggleHandle.classList.replace('bg-[#F1F6F4]', 'bg-[#172836]');
    } else {
      billingToggle.classList.remove('bg-[#FFC801]');
      toggleHandle.classList.replace('translate-x-5', 'translate-x-0');
      toggleHandle.classList.replace('bg-[#172836]', 'bg-[#F1F6F4]');
    }

    // SURGICAL RUNTIME ENGINE: Compute multi-dimensional layout shifts instantly [cite: 43, 59]
    updateGroceryPrices(currentCurrency, isBulkOrder);
  });

  // Run initial baseline pricing evaluation run
  updateGroceryPrices(currentCurrency, isBulkOrder);

  // ==========================================================================
  // HARDWARE-ACCELERATED ISOLATED SMART DATA MATRIX STATE EXTENSION
  // ==========================================================================
  
  // Real Localized State (Keeps data binding strictly out of global view reflows) [cite: 60]
  const cartState = {};

  const cartDrawer = document.getElementById('cart-drawer');
  const cartItemsWrapper = document.getElementById('cart-items-wrapper');
  const cartCountNode = document.getElementById('cart-count');
  const cartTotalNode = document.getElementById('cart-total-value');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  // Object metadata dictionary mapping human strings
  const itemsMeta = {
    organic_avocado: { name: "Neural Shard", icon: "📊" },
    premium_basmati: { name: "Velocity Cluster", icon: "⚙️" },
    almond_milk: { name: "Hyper Pipeline", icon: "🔗" },
    vine_tomatoes: { name: "Memory Pool", icon: "🔄" }
  };

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemKey = button.getAttribute('data-item');
      
      // Increment state tally context
      cartState[itemKey] = (cartState[itemKey] || 0) + 1;
      
      // Flash button state visually as micro-interaction response [cite: 65]
      const originalText = button.innerText;
      button.innerText = "✓ Allocated";
      button.style.color = '#172836';
      button.style.backgroundColor = '#FFC801';
      button.style.borderColor = 'transparent';
      
      setTimeout(() => {
        button.innerText = originalText;
        button.style.color = '';
        button.style.backgroundColor = '';
        button.style.borderColor = '';
      }, 700);

      // Perform a surgical render updates across the drawer metrics [cite: 60]
      renderCartUpdates();
    });
  });

  function renderCartUpdates() {
    let totalItemsCount = 0;
    let computedTotalValue = 0;
    
    // Read active configurations safely from current nodes to match currency selection instantly
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
      itemRow.className = "flex items-center justify-between border-b border-[#114C5A]/30 py-1.5";
      itemRow.innerHTML = `
        <div class="flex items-center space-x-2 truncate">
          <span class="text-xs">${itemsMeta[key].icon}</span>
          <span class="text-[#F1F6F4] truncate font-medium">${itemsMeta[key].name}</span>
          <span class="text-[#FFC801] font-mono text-[10px]">x${quantity}</span>
        </div>
        <span class="font-mono text-[#D9E8E2]">${itemCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      `;
      cartItemsWrapper.appendChild(itemRow);
    });

    // Update system counter strings safely
    cartCountNode.innerText = `${totalItemsCount} node${totalItemsCount !== 1 ? 's' : ''}`;
    cartTotalNode.innerText = computedTotalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Handle high-speed entry transitions (150ms - 200ms ease-out) [cite: 65]
    if (totalItemsCount > 0) {
      cartDrawer.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
    } else {
      cartDrawer.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
      cartItemsWrapper.innerHTML = `<p class="text-[#D9E8E2]/40 py-4 text-center italic">No instances allocated in current buffer pipeline.</p>`;
    }
  }

  // Intercept currency/billing hooks to recalculate values inside the cart automatically
  currencySelect.addEventListener('change', () => setTimeout(renderCartUpdates, 20));
  billingToggle.addEventListener('click', () => setTimeout(renderCartUpdates, 20));

  // ==========================================================================
  // ONLINE OVERLAY MODAL DISPATCH CONTROL LAYER [cite: 61]
  // ==========================================================================
  const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');
  const paymentModal = document.getElementById('payment-modal');
  const closePaymentBtn = document.getElementById('close-payment-btn');
  const modalPayableTotal = document.getElementById('modal-payable-total');
  const processPaymentBtn = document.getElementById('process-payment-btn');
  const modalInnerContainer = paymentModal.querySelector('div');

  checkoutTriggerBtn.addEventListener('click', () => {
    modalPayableTotal.innerText = cartTotalNode.innerText;
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
    processPaymentBtn.innerText = "Synchronizing Block...";
    processPaymentBtn.disabled = true;
    
    setTimeout(() => {
      alert("Pipeline Authorized! Deployment instance structural allocation successfully finalized.");
      processPaymentBtn.innerText = "Simulate Authorization";
      processPaymentBtn.disabled = false;
      
      // Flush cart items variables safely without global refresh
      Object.keys(cartState).forEach(key => delete cartState[key]);
      renderCartUpdates();
      dismissModal();
    }, 1200);
  });

  // 5. PERFORMANCE CAPS WATCHDOG: Log operational telemetry data limits [cite: 62, 80]
  const initializationEnd = performance.now();
  const totalOrchestrationTime = initializationEnd - initializationStart;
  
  console.log(`%cFreshDrop Engine Activated: Core thread initialized in ${totalOrchestrationTime.toFixed(2)}ms`, 
    totalOrchestrationTime < 500 ? 'color: #FFC801; font-weight: bold;' : 'color: #FF9932; font-weight: bold;'
  );
});