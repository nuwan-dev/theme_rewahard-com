class ProductScroller {
    constructor(container) {  // 添加 container 参数
      this.container = container;  // 存储容器引用
      this.init();
    }

    init() {
      // 在容器内查找元素，而不是整个文档
      this.wrapper = this.container.querySelector('.pk-popular-products__wrapper');
      this.leftButton = this.container.querySelector('.scroll-left');
      this.rightButton = this.container.querySelector('.scroll-right');
      
      if (!this.wrapper || !this.leftButton || !this.rightButton) return;

      this.leftButton.addEventListener('click', () => this.scroll('left'));
      this.rightButton.addEventListener('click', () => this.scroll('right'));
      this.wrapper.addEventListener('scroll', () => this.updateButtonVisibility());

      this.updateButtonVisibility();
      window.addEventListener('resize', () => this.updateButtonVisibility());
    }

    scroll(direction) {
      const scrollAmount = this.getScrollAmount();
      const currentScroll = this.wrapper.scrollLeft;
      this.wrapper.scrollTo({
        left: direction === 'left'
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }

    getScrollAmount() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        return 300;
      } else if(screenWidth < 1440)  {
        return 800;
      } else if(screenWidth < 1840)  {
        return 1000;
      } else {
        return 1200;
      }
    }

    updateButtonVisibility() {
      const isAtStart = this.wrapper.scrollLeft <= 0;
      const isAtEnd = this.wrapper.scrollLeft + this.wrapper.clientWidth >= this.wrapper.scrollWidth - 10;
      this.leftButton.classList.toggle('hidden', isAtStart);
      this.rightButton.classList.toggle('hidden', isAtEnd);
    }
}

// 初始化时，为每个模块创建独立的实例
document.addEventListener('DOMContentLoaded', () => {
  // 查找所有的滚动模块容器
  const scrollContainers = document.querySelectorAll('.popular-products');
  
  // 为每个容器创建一个新的 ProductScroller 实例
  scrollContainers.forEach(container => {
    new ProductScroller(container);
  });
});