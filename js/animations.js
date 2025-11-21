document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     ELEMENT REFERENCES
  ============================================================ */
  const header = document.querySelector("header");
  const backToTop = document.getElementById("backToTop");
  const sections = document.querySelectorAll("section[id]");
  const fadeElements = document.querySelectorAll(".fade-in");
  const navToggle = document.getElementById("navToggle");
  const overlay = document.getElementById("navOverlay");
  const overlayLinks = overlay ? overlay.querySelectorAll("a") : [];
  const navLinks = document.querySelectorAll("nav a, #navOverlay a");

  const heroPhoto = document.querySelector(".hero-photo");
  const heroPhotoWrapper = document.querySelector(".hero-photo-wrapper");
  const metricStrip = document.querySelector(".metric-strip");
  const typedEl = document.getElementById("hero-typed");

  /* ============================================================
     1) HEADER SHRINK
  ============================================================ */
  const handleHeaderShrink = () => {
    if (window.scrollY > 50) header.classList.add("shrink");
    else header.classList.remove("shrink");
  };

  /* ============================================================
     2) FADE-IN + SCROLL-SPY
  ============================================================ */
  const observerOptions = {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px"
  };

  const unifiedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target;
      const id = target.getAttribute("id");

      // Fade-in
      if (entry.isIntersecting && target.classList.contains("fade-in")) {
        target.classList.add("visible");
      }

      // Scroll-spy
      if (entry.isIntersecting && id) {
        navLinks.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(`a[href="#${id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => unifiedObserver.observe(el));
  sections.forEach((sec) => unifiedObserver.observe(sec));

  /* ============================================================
     3) BACK TO TOP
  ============================================================ */
  const handleBackToTop = () => {
    if (window.scrollY > 420) backToTop.classList.add("visible");
    else backToTop.classList.remove("visible");
  };

  if (backToTop) {
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  /* ============================================================
     4) PARALLAX HERO + METRICS
  ============================================================ */
  let ticking = false;

  const parallax = () => {
    const y = window.scrollY;
    const f = Math.min(y / 400, 1);

    if (heroPhotoWrapper) {
      heroPhotoWrapper.style.transform = `translateY(${f * 12}px)`;
    }

    if (metricStrip) {
      metricStrip.style.transform = `translateY(${f * -6}px)`;
    }

    ticking = false;
  };

  const onScroll = () => {
    handleHeaderShrink();
    handleBackToTop();

    if (!ticking) {
      window.requestAnimationFrame(parallax);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll);

  /* ============================================================
     5) FULLSCREEN OVERLAY MOBILE NAV (Option B)
  ============================================================ */
  const openOverlay = () => {
    if (!overlay) return;

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    // Stagger fade-in of links
    overlayLinks.forEach((link, i) => {
      setTimeout(() => link.classList.add("visible"), 100 + i * 80);
    });
  };

  const closeOverlay = () => {
    if (!overlay) return;

    overlayLinks.forEach((link) => link.classList.remove("visible"));

    setTimeout(() => {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }, 220);
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      if (overlay.classList.contains("open")) closeOverlay();
      else openOverlay();
    });
  }

  // Close overlay when clicking any link
  overlayLinks.forEach((link) => {
    link.addEventListener("click", () => closeOverlay());
  });

  // Clicking the dim background closes overlay
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });
  }

  /* ============================================================
     6) SMOOTH SCROLL FOR ALL NAV LINKS
  ============================================================ */
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    link.addEventListener("click", (e) => {
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 90;
      const rect = target.getBoundingClientRect();
      const y = rect.top + window.scrollY - offset;

      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  /* ============================================================
     7) HERO PHOTO REVEAL
  ============================================================ */
  if (heroPhoto) {
    setTimeout(() => {
      heroPhoto.classList.add("visible");
    }, 350);
  }

  /* ============================================================
     8) TYPEWRITER EFFECT
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
     9) ORIENTATION FIX
  ============================================================ */
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      window.scrollTo(0, window.scrollY);
    }, 200);
  });
});