/**
 * FEATURE 2: BENTO-TO-ACCORDION WRAPPER WITH STATE PERSISTENCE
 * Manages responsive layout interactions and handles the Context Lock Constraint seamlessly[cite: 44, 45, 46].
 */

// Singular source of truth tracking active component focus index across viewports [cite: 48, 74]
let activeAisleIndex = 0;

/**
 * Initializes interaction listeners for both the desktop Bento Nodes and mobile Accordion triggers.
 */
export function initBentoAccordion() {
  const bentoNodes = document.querySelectorAll('.bento-node');
  const accordionItems = document.querySelectorAll('.accordion-item');

  // 1. DESKTOP BENTO GRID: Track user interaction coordinates / active hovers [cite: 45, 48]
  bentoNodes.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      const index = parseInt(node.getAttribute('data-index'), 10);
      activeAisleIndex = index;
      highlightBentoNode(index);
    });
  });

  // 2. MOBILE ACCORDION: Handle standard click expansions [cite: 46]
  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'), 10);
      
      // Toggle logic: click open, or collapse if clicking already opened item
      if (activeAisleIndex === index && isAccordionOpen(item)) {
        collapseAccordionItem(item);
      } else {
        activeAisleIndex = index;
        syncAccordionView(activeAisleIndex);
      }
    });
  });

  // 3. THE CONTEXT LOCK GUARDRAIL: Seamlessly transfer index on browser window resize [cite: 48, 74]
  window.addEventListener('resize', () => {
    // Check if browser layout reflows past the mobile viewport threshold [cite: 48]
    if (window.innerWidth < 768) {
      // Programmatically open the corresponding panel smoothly upon layout transition [cite: 48, 74]
      syncAccordionView(activeAisleIndex);
    } else {
      highlightBentoNode(activeAisleIndex);
    }
  });

  // Run initial sync on load to set baseline layout states
  if (window.innerWidth < 768) {
    syncAccordionView(activeAisleIndex);
  } else {
    highlightBentoNode(activeAisleIndex);
  }
}

/**
 * Syncs the mobile view panels to match the current active shared variable index context[cite: 48].
 */
function syncAccordionView(activeIndex) {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach((item) => {
    const itemIndex = parseInt(item.getAttribute('data-index'), 10);
    if (itemIndex === activeIndex) {
      expandAccordionItem(item);
    } else {
      collapseAccordionItem(item);
    }
  });
}

/**
 * Handles smooth, hardware-accelerated accordion structural transitions (300ms - 400ms ease-in-out)[cite: 48, 65].
 */
function expandAccordionItem(item) {
  const content = item.querySelector('.accordion-content');
  const arrow = item.querySelector('.accordion-trigger span');
  
  // Dynamic height configuration utilizing native scrollHeight properties [cite: 48]
  content.style.maxHeight = `${content.scrollHeight}px`;
  if (arrow) arrow.style.transform = 'rotate(180deg)';
  item.classList.add('border-emerald-500/30');
}

function collapseAccordionItem(item) {
  const content = item.querySelector('.accordion-content');
  const arrow = item.querySelector('.accordion-trigger span');
  
  content.style.maxHeight = '0px';
  if (arrow) arrow.style.transform = 'rotate(0deg)';
  item.classList.remove('border-emerald-500/30');
}

function isAccordionOpen(item) {
  const content = item.querySelector('.accordion-content');
  return content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
}

/**
 * Highlights active desktop nodes visually to make sure motion remains closely synchronized[cite: 48, 53].
 */
function highlightBentoNode(activeIndex) {
  const bentoNodes = document.querySelectorAll('.bento-node');
  bentoNodes.forEach((node) => {
    const index = parseInt(node.getAttribute('data-index'), 10);
    if (index === activeIndex) {
      node.classList.add('ring-1', 'ring-emerald-500/30', 'scale-[1.01]');
    } else {
      node.classList.remove('ring-1', 'ring-emerald-500/30', 'scale-[1.01]');
    }
  });
}