(() => {
  "use strict";

  const EMAIL = "barkngroom68@gmail.com";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: scrolled state + mobile call button ---------- */
  const header = document.querySelector("[data-header]");
  const hero = document.querySelector(".hero");
  const fab = document.querySelector(".fab-call");

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    if (fab && hero) fab.classList.toggle("is-visible", y > hero.offsetHeight * 0.8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.getElementById("nav-links");

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => {
    if (links.classList.contains("is-open") && !e.target.closest(".navbar")) setMenu(false);
  });

  /* ---------- Current section highlight in the nav ---------- */
  const navAnchors = [...links.querySelectorAll('a[href^="#"]:not(.btn)')];
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navAnchors.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === id));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealEls.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Services list: active row follows hover / focus / tap ---------- */
  const svcList = document.querySelector("[data-svc-list]");
  if (svcList) {
    const rows = [...svcList.querySelectorAll(".svc")];
    const activate = (row) => rows.forEach((r) => r.classList.toggle("is-active", r === row));
    rows.forEach((row) => {
      row.addEventListener("mouseenter", () => activate(row));
      row.addEventListener("focusin", () => activate(row));
      row.addEventListener("click", () => activate(row));
    });
  }

  /* ---------- "Book Now" buttons preselect the service in the form ---------- */
  const serviceSelect = document.getElementById("f-service");
  document.querySelectorAll("[data-service]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (serviceSelect) serviceSelect.value = btn.dataset.service;
    });
  });

  /* ---------- Reviews carousel ---------- */
  const track = document.querySelector("[data-carousel]");
  if (track) {
    const cards = [...track.children];
    const dotsWrap = document.querySelector("[data-dots]");
    const prev = document.querySelector("[data-prev]");
    const next = document.querySelector("[data-next]");

    const dots = cards.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Go to review ${i + 1}`);
      b.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(b);
      return b;
    });

    const currentIndex = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    };

    const goTo = (i) => {
      const card = cards[Math.max(0, Math.min(cards.length - 1, i))];
      track.scrollTo({
        left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    const update = () => {
      const i = currentIndex();
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4;
    };

    prev.addEventListener("click", () => goTo(currentIndex() - 1));
    next.addEventListener("click", () => goTo(currentIndex() + 1));
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(currentIndex() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(currentIndex() - 1); }
    });
    window.addEventListener("resize", update);

    // Start on the second card on wide screens so partial cards peek from both sides.
    if (track.scrollWidth > track.clientWidth && window.innerWidth > 900) {
      track.scrollLeft = cards[1].offsetLeft - (track.clientWidth - cards[1].offsetWidth) / 2;
    }
    update();
  }

  /* ---------- Booking form → opens the visitor's email app ---------- */
  const form = document.querySelector("[data-booking]");
  if (form) {
    const status = form.querySelector("[data-status]");
    const date = form.querySelector("#f-date");
    if (date) date.min = new Date().toISOString().slice(0, 10);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      let firstInvalid = null;
      ["name", "phone"].forEach((key) => {
        const input = form.elements[key];
        const ok = input.value.trim().length > 1;
        input.setAttribute("aria-invalid", String(!ok));
        if (!ok && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        status.textContent = "Please add your name and a phone number so we can call you back.";
        status.classList.add("is-error");
        firstInvalid.focus();
        return;
      }

      const lines = [
        "Hello Bark n' Groom,",
        "",
        "I'd like to book an appointment.",
        "",
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        data.dog ? `Dog: ${data.dog}` : "",
        `Service: ${data.service}`,
        data.date ? `Preferred date: ${data.date}` : "",
        data.message ? `\nNotes: ${data.message}` : "",
      ].filter((l) => l !== "");

      const subject = `Booking request: ${data.service}${data.dog ? " for " + data.dog : ""}`;
      window.location.href =
        `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

      status.classList.remove("is-error");
      status.textContent = "Your email app should open with the request ready to send. Prefer the phone? Call 21 3099 4470.";
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
