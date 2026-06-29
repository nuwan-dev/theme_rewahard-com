class CollectionScroller {
  constructor(container) {
    this.container = container;
    this.scrollList = container.querySelector('.pk-popular-products__wrapper');
    this.scrollLeftBtn = container.querySelector('.scroll-left');
    this.scrollRightBtn = container.querySelector('.scroll-right');
    
    if (!this.scrollList || !this.scrollLeftBtn || !this.scrollRightBtn) {
      console.warn('Required elements not found in container');
      return;
    }
    
    this.init();
  }

  init() {
    // Check if scroll is needed
    this.checkScrollable();
    
    // Add event listeners
    this.scrollLeftBtn.addEventListener('click', () => this.scroll('left'));
    this.scrollRightBtn.addEventListener('click', () => this.scroll('right'));
    
    // Add scroll event listener with throttle
    let timeout;
    this.scrollList.addEventListener('scroll', () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => this.updateButtonVisibility(), 100);
    });
    
    // Update on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.checkScrollable();
        this.updateButtonVisibility();
      }, 250);
    });

    // Initial button visibility check
    this.updateButtonVisibility();
  }

  checkScrollable() {
    const scrollWidth = this.scrollList.scrollWidth;
    const clientWidth = this.scrollList.clientWidth;
    const isScrollable = scrollWidth > clientWidth;
    
    const buttonsWrapper = this.container.querySelector('.scroll-buttons-wrapper');
    if (buttonsWrapper) {
      buttonsWrapper.style.display = isScrollable ? 'flex' : 'none';
    }
  }

  updateButtonVisibility() {
    const currentScroll = this.scrollList.scrollLeft;
    const maxScroll = this.scrollList.scrollWidth - this.scrollList.clientWidth;
    
    // Show/hide left button based on scroll position
    this.scrollLeftBtn.classList.toggle('hidden', currentScroll <= 0);
    
    // Show/hide right button based on whether we can scroll further right
    this.scrollRightBtn.classList.toggle('hidden', 
      Math.ceil(currentScroll) >= maxScroll - 1); // -1 to account for rounding errors
  }

  scroll(direction) {
    const cardWidth = 300; // Base card width
    const gap = 20; // Gap between cards
    const scrollAmount = cardWidth + gap;
    
    const currentScroll = this.scrollList.scrollLeft;
    const targetScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;

    this.scrollList.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }
}

// Initialize scroller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const scrollerContainers = document.querySelectorAll('.pk-collections');
  scrollerContainers.forEach(container => {
    new CollectionScroller(container);
  });
});

// Handle Shopify section updates
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const container = event.target.querySelector('.pk-collections');
    if (container) {
      new CollectionScroller(container);
    }
  });

  document.addEventListener('shopify:section:select', (event) => {
    const container = event.target.querySelector('.pk-collections');
    if (container) {
      new CollectionScroller(container);
    }
  });
}