/* =========================================================
   KNOTSUMI
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initScrollReveal();
  initHeaderScrollState();
  initCurrentYear();
  initSmoothAnchorLinks();
});

/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

function initMobileNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navToggle || !navigation) return;

  const openMenu = () => {
    navigation.classList.add("is-open");
    navToggle.classList.add("is-active");

    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");

    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    navToggle.classList.remove("is-active");

    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");

    document.body.style.overflow = "";
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
}

/* =========================================================
   2. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (!revealElements.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  revealElements.forEach((element) => {
    const delay = element.dataset.delay;

    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }
  });

  const observerOptions = {
    root: null,

    /*
      The element must enter farther into the screen
      before becoming visible.

      The negative top/bottom margins also make it fade
      before completely leaving the physical viewport.
    */
    rootMargin: "-8% 0px -8% 0px",

    threshold: 0.08,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

/* =========================================================
   3. HEADER SCROLL STATE
   ========================================================= */

function initHeaderScrollState() {
  const header = document.querySelector(".site-header");

  if (!header) return;

  const updateHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });
}

/* =========================================================
   4. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {
  const yearElement = document.querySelector("#current-year");

  if (!yearElement) return;

  yearElement.textContent = new Date().getFullYear();
}

/* =========================================================
   5. SMOOTH INTERNAL ANCHOR LINKS
   ========================================================= */

function initSmoothAnchorLinks() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });
}
