/**
 * FEATURE 2: BENTO-TO-ACCORDION WRAPPER WITH STATE PERSISTENCE
 * Manages responsive layout interactions and handles the Context Lock Constraint seamlessly.
 */

let activeAisleIndex = 0;

export function initBentoAccordion() {
  const bentoNodes = document.querySelectorAll('.bento-node');
  const accordionItems = document.querySelectorAll('.accordion-item');

  bentoNodes.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      const index = parseInt(node.getAttribute('data-index'), 10);
      activeAisleIndex = index;
      highlightBentoNode(index);
    });
  });

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'), 10);
      
      if (activeAisleIndex === index && isAccordionOpen(item)) {
        collapseAccordionItem(item);
      } else {
        activeAisleIndex = index;
        syncAccordionView(activeAisleIndex);
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      syncAccordionView(activeAisleIndex);
    } else {
      highlightBentoNode(activeAisleIndex);
    }
  });

  if (window.innerWidth < 768) {
    syncAccordionView(activeAisleIndex);
  } else {
    highlightBentoNode(activeAisleIndex);
  }
}

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

function expandAccordionItem(item) {
  const content = item.querySelector('.accordion-content');
  const arrow = item.querySelector('.accordion-trigger span');
  
  content.style.maxHeight = `${content.scrollHeight}px`;
  if (arrow) arrow.style.transform = 'rotate(180deg)';
  item.classList.add('border-[#FFC801]/30');
}

function collapseAccordionItem(item) {
  const content = item.querySelector('.accordion-content');
  const arrow = item.querySelector('.accordion-trigger span');
  
  content.style.maxHeight = '0px';
  if (arrow) arrow.style.transform = 'rotate(0deg)';
  item.classList.remove('border-[#FFC801]/30');
}

function isAccordionOpen(item) {
  const content = item.querySelector('.accordion-content');
  return content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
}

function highlightBentoNode(activeIndex) {
  const bentoNodes = document.querySelectorAll('.bento-node');
  bentoNodes.forEach((node) => {
    const index = parseInt(node.getAttribute('data-index'), 10);
    if (index === activeIndex) {
      node.classList.add('ring-1', 'ring-[#FFC801]/30', 'scale-[1.01]');
    } else {
      node.classList.remove('ring-1', 'ring-[#FFC801]/30', 'scale-[1.01]');
    }
  });
}