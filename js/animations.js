document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------------------------
  // Sticky Header Shrink
  // ---------------------------------------------------
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });

  // ---------------------------------------------------
  // Fade-in Sections on Scroll
  // ---------------------------------------------------
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".fade-in").forEach(section => {
    fadeObserver.observe(section);
  });

  // ---------------------------------------------------
  // Scroll-Spy Navigation
  // ---------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let currentId = "";

    sections.forEach(section => {
      const offsetTop = section.offsetTop - 220;
      if (window.scrollY >= offsetTop) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (currentId && href && href.includes(`#${currentId}`)) {
        link.classList.add("active");
      }
    });
  });

  // ---------------------------------------------------
  // Back to Top Visibility
  // ---------------------------------------------------
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  // ---------------------------------------------------
  // Hero Photo Reveal
  // ---------------------------------------------------
  const heroPhoto = document.querySelector(".hero-photo");
  if (heroPhoto) {
    setTimeout(() => {
      heroPhoto.classList.add("visible");
    }, 350);
  }

  // ---------------------------------------------------
  // Typewriter Effect for Hero Headline
  // ---------------------------------------------------
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
    setTimeout(typeWriter, 500);
  }
});