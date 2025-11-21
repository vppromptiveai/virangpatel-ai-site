// Enhanced animations & UX engine for virangpatel.ai
document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     1) STICKY HEADER SHRINK
  ============================================================ */
  const header = document.querySelector("header");

  const handleHeaderShrink = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  };
  window.addEventListener("scroll", handleHeaderShrink);

  /* ============================================================
     2) INTERSECTION OBSERVER (Fade-in + Section Activation)
  ============================================================ */
  const observerOptions = {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px",
  };

  const fadeElements = document.querySelectorAll(".fade-in");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  const unifiedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;

      // Fade-in visibility
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

      // Scroll-spy nav highlight
      if (entry.isIntersecting && id) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => unifiedObserver.observe(el));
  sections.forEach((sec) => unifiedObserver.observe(sec));

  /* ============================================================
     3) BACK-TO-TOP BUTTON BEHAVIOR
  ============================================================ */
  const backToTop = document.getElementById("backToTop");

  const handleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 420) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  };
  window.addEventListener("scroll", handleBackToTop);

  /* Smooth scroll for the button */
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============================================================
     4) HERO PHOTO REVEAL
  ============================================================ */
  const heroPhoto = document.querySelector(".hero-photo");
  if (heroPhoto) {
    setTimeout(() => {
      heroPhoto.classList.add("visible");
    }, 300);
  }

  /* ============================================================
     5) TYPEWRITER EFFECT (Improved)
  ============================================================ */
  const typedEl = document.getElementById("hero-typed");
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

    // Safer delay for mobile + low-power devices
    setTimeout(typeWriter, 450);
  }

  /* ============================================================
     6) MOBILE OPTIMIZATION: Auto-close keyboard scroll bounce fix
     (prevents weird mobile scrolling offsets)
  ============================================================ */
  window.addEventListener("orientationchange", () => {
    setTimeout(() => window.scrollTo(0, window.scrollY), 200);
  });
});