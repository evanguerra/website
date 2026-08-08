(function () {
  "use strict";

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navMenu.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- active nav link on scroll ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav__link[href^='#']");

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var linkFor = function (id) {
      return document.querySelector(".nav__link[href='#" + id + "']");
    };

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkFor(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("is-active"); });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- interactive hover cards (tap-to-toggle for touch/keyboard) ---------- */
  var interactiveCards = document.querySelectorAll(".hover-card");

  interactiveCards.forEach(function (card) {
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    var toggle = function () {
      var isActive = card.classList.toggle("is-active");
      card.setAttribute("aria-expanded", isActive ? "true" : "false");
    };

    card.addEventListener("click", toggle);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* ---------- publications filter ---------- */
  var filterButtons = document.querySelectorAll(".pub-filter");
  var pubCards = document.querySelectorAll(".pub-card");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");

      filterButtons.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      pubCards.forEach(function (card) {
        var type = card.getAttribute("data-type");
        var show = filter === "all" || filter === type;
        card.style.display = show ? "" : "none";
      });
    });
  });
})();
