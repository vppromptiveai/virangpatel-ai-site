document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     ELEMENT QUERIES
  ============================================================ */
  const header = document.querySelector("header");
  const backToTop = document.getElementById("backToTop");
  const sections = document.querySelectorAll("section[id]");
  const fadeElements = document.querySelectorAll(".fade-in");
  const navLinks = document.querySelectorAll("nav a");
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const heroPhoto = document.querySelector(".hero-photo");
  const heroPhotoWrapper = document.querySelector(".hero-photo-wrapper");
  const metricStrip = document.querySelector(".metric-strip");
  const typedEl = document.getElementById("hero-typed");

  /* ============================================================
     1) STICKY HEADER SHRINK
  ============================================================ */
  const handleHeaderShrink = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  };

  /* ============================================================
     2) UNIFIED INTERSECTION OBSERVER
        - Fade-in sections
        - Scroll-spy active nav
  ============================================================ */
  const observerOptions = {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px"
  };

  const unifiedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target;
      const id = target.getAttribute("id");

      // Fade-in effect
      if (entry.isIntersecting && target.classList.contains("fade-in")) {
        target.classList.add("visible");
      }

      // Scroll-spy: highlight active section in nav
      if (entry.isIntersecting && id) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => unifiedObserver.observe(el));
  sections.forEach((sec) => unifiedObserver.observe(sec));

  /* ============================================================
     3) BACK-TO-TOP BUTTON
  ============================================================ */
  const handleBackToTopVisibility = () => {
    if (!backToTop) return;
    if (window.scrollY > 420) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  };

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============================================================
     4) PARALLAX HERO & METRIC STRIP
  ============================================================ */
  let ticking = false;

  const handleParallax = () => {
    if (!heroPhotoWrapper && !metricStrip) return;

    const scrollY = window.scrollY;
    const factor = Math.min(scrollY / 400, 1); // clamp 0–1

    // Subtle float on hero photo
    if (heroPhotoWrapper) {
      heroPhotoWrapper.style.transform = `translateY(${factor * 12}px)`;
    }

    // Slight drift on metrics
    if (metricStrip) {
      metricStrip.style.transform = `translateY(${factor * -6}px)`;
    }

    ticking = false;
  };

  const handleScroll = () => {
    handleHeaderShrink();
    handleBackToTopVisibility();

    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll);

  /* ============================================================
     5) MOBILE NAV (HAMBURGER) TOGGLE
  ============================================================ */
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Smooth scroll for nav links with header offset
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    link.addEventListener("click", (e) => {
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 90;
      const rect = target.getBoundingClientRect();
      const targetY = rect.top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });

      // Close mobile nav after click
      if (window.innerWidth <= 900) {
        document.body.classList.remove("nav-open");
        navToggle && navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ============================================================
     6) HERO PHOTO REVEAL
  ============================================================ */
  if (heroPhoto) {
    setTimeout(() => {
      heroPhoto.classList.add("visible");
    }, 350);
  }

  /* ============================================================
     7) TYPEWRITER EFFECT
  ============================================================ */
  const heroText =
    "I build security & telemetry systems that Microsoft teams rely on.";

  if (typedEl) {
    let i = 0;
    const typeWriter = () => {
      if (i < heroText.length) {
        typedEl.textContent += heroText.charAt(i);
        i++;
        setTimeout(typeWriter, 22);
      }
    };
    setTimeout(typeWriter, 450);
  }

  /* ============================================================
     8) SERVICE CARD HOVER LIFT (CSS-driven, JS not required)
        - Left here for future interaction hooks if needed
  ============================================================ */

  /* ============================================================
     9) ORIENTATION CHANGE / MOBILE BOUNCE FIX
  ============================================================ */
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      window.scrollTo(0, window.scrollY);
    }, 200);
  });
});