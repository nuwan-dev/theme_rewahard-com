(function () {
  const headerMobile = () => {
    const headerSection = document.querySelector(".header-mobile-section");
    const header = document.querySelector(".header-mobile");
    let scrollPos = 0;
    window.addEventListener("scroll", () => {
      if (!header.classList.contains("sticky-header")) {
        return;
      }
      const scroll = window.scrollY;
      if (scroll > scrollPos) {
        // down
        if (scroll > 100) {
          hideHeader();
        } else {
          showHeader();
        }
      } else {
        // up
        showHeader();
      }
      scrollPos = scroll;
    });
    function hideHeader() {
      if (header.classList.contains("sticky-header-always")) {
        return "";
      }
      headerSection.classList.add("hide");
    }
    function showHeader() {
      headerSection.classList.remove("hide");
    }

    const burger = document.querySelector(".header-mobile__burger");
    const mobileMenu = document.querySelector(".header-mobile__menu");
    const mobileAnimateBg = document.querySelector(".animate-bg");
    burger.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      mobileAnimateBg.classList.toggle("active");
      document.body.classList.toggle("overflow-hidden");
    });

    const mobileMenuTab = document.querySelectorAll('[role="tab"]');
    // Check if any tab is already selected
    let firstTabSelected =
      document.querySelector('[aria-selected="true"]') !== null;

    mobileMenuTab.forEach((tab) => {
      if (!firstTabSelected && index === 0) {
        tab.setAttribute("aria-selected", "true");
        const firstPanel = document.getElementById(
          tab.getAttribute("aria-controls")
        );
        firstPanel.hidden = false;
        tab.classList.add("current-link");
        firstTabSelected = true;
      }

      tab.addEventListener("click", function () {
        const activeTab = document.querySelector('[aria-selected="true"]');
        if (activeTab) {
          activeTab.setAttribute("aria-selected", "false");
          const activePanel = document.getElementById(
            activeTab.getAttribute("aria-controls")
          );
          activePanel.hidden = true;
          activeTab.classList.remove("current-link");
        }
        this.setAttribute("aria-selected", "true");
        const newPanel = document.getElementById(
          this.getAttribute("aria-controls")
        );
        newPanel.hidden = false;
        this.classList.add("current-link");
      });
    });

    const subMenuButtons = document.querySelectorAll(".header-mobile__sub-menu-button");

    subMenuButtons.forEach(button => {
      button.addEventListener("click", () => {
        const submenuId = button.getAttribute("submenu-id");
        const submenuPanel = document.getElementById(submenuId);

        // Hide all other submenus
        // document.querySelectorAll(".header-mobile__sub-menu-panels").forEach(panel => {
        //   panel.setAttribute("hidden",true)
        // });

        // Show the targeted submenu panel
        if (submenuPanel) {
          
          if(submenuPanel.hidden == true){
            
            submenuPanel.removeAttribute("hidden");
          }
          else{
           
            submenuPanel.setAttribute("hidden",true);
          }
          
        }
      });
    });

    const mobileMenuList = document.querySelectorAll(
      ".header-mobile__menu-header a"
    );
    mobileMenuList.forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        const id = this.getAttribute("href");
        mobileMenuList.forEach((_item) => {
          _item.parentElement.classList.remove("active");
        });
        this.parentElement.classList.add("active");
        const menus = document.querySelectorAll(".header-mobile__menus > li");
        const current = document.querySelector(id);
        console.log(current);
        menus.forEach((_menu) => {
          _menu.style.display = "none";
        });
        current.style.display = "block";
      });
    });
  };

  document.addEventListener("shopify:section:load", headerMobile);
  headerMobile();
})();
