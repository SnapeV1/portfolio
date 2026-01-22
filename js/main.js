"use strict";
import form from "./form.js";
import skillbar from "./skillbar.js";

const initAOS = () => {
  if (window.AOS) {
    AOS.init({ once: true });
  }
};

const initNav = () => {
  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");
  const header = document.querySelector("#header");
  const hero = document.querySelector("#home");
  const goToTop = document.querySelector("#goToTop");
  const navLinks = document.querySelectorAll("header nav a");
  const sections = document.querySelectorAll("section");

  if (!nav || !navBtn || !navBtnImg) {
    return;
  }

  const toggleNav = (forceClose = false) => {
    const isOpen = forceClose ? false : nav.classList.toggle("open");
    if (forceClose) {
      nav.classList.remove("open");
    }
    navBtn.setAttribute("aria-expanded", String(isOpen));
    navBtnImg.src = isOpen ? "img/icons/close.svg" : "img/icons/open.svg";
  };

  navBtn.addEventListener("click", () => toggleNav());

  navLinks.forEach((link) => {
    link.addEventListener("click", () => toggleNav(true));
  });

  window.addEventListener("scroll", () => {
    if (!header || !hero || !goToTop) {
      return;
    }
    const triggerHeight = hero.offsetHeight - 170;
    if (window.scrollY > triggerHeight) {
      header.classList.add("header-sticky");
      goToTop.classList.add("reveal");
    } else {
      header.classList.remove("header-sticky");
      goToTop.classList.remove("reveal");
    }

    sections.forEach((sec) => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 170;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
        });
        const targetLink = document.querySelector(
          "header nav a[href*=" + id + "]"
        );
        if (targetLink) {
          targetLink.classList.add("active");
        }
      }
    });
  });
};

const initTheme = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleIcon = document.getElementById("theme-toggle-icon");

  if (!themeToggle || !themeToggleIcon) {
    return;
  }

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggleIcon.src =
      theme === "dark" ? "img/icons/sun.svg" : "img/icons/moon.svg";
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  };

  if (currentTheme) {
    setTheme(currentTheme);
  } else if (prefersDarkScheme.matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });

  prefersDarkScheme.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });
};

const initTyped = () => {
  const typedTarget = document.querySelector("#typed-text");
  if (!typedTarget || !window.Typed) {
    return;
  }

  const options = {
    strings: ["Software Engineer", "Web Developer", "Computer Science Student"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 500,
    loop: true,
  };

  new Typed("#typed-text", options);
};

const initSoundToggle = () => {
  const soundCloud = document.querySelector(".sound-cloud");
  const off = document.querySelector("#off");
  const on = document.querySelector("#on");
  const myAudio = document.querySelector("#myAudio");

  if (!soundCloud || !off || !on || !myAudio) {
    return;
  }

  const soundTrack = (soundState) => {
    if (soundState === "off") {
      on.style.display = "inline-block";
      off.style.display = "none";
      soundCloud.style.color = "#08fdd8";
      on.setAttribute("aria-pressed", "true");
      off.setAttribute("aria-pressed", "false");
      myAudio.play().catch((error) => console.log("Audio play error:", error));
    } else if (soundState === "on") {
      on.style.display = "none";
      off.style.display = "inline-block";
      soundCloud.style.color = "#f50057";
      on.setAttribute("aria-pressed", "false");
      off.setAttribute("aria-pressed", "true");
      myAudio.pause();
    }
  };

  off.addEventListener("click", () => soundTrack("off"));
  on.addEventListener("click", () => soundTrack("on"));
};

const initAskThemOut = () => {
  const askThemOutBtn = document.getElementById("askThemOutBtn");
  const namePopup = document.getElementById("namePopup");
  const nameForm = document.getElementById("nameForm");
  const loverNameInput = document.getElementById("loverName");
  let lastActiveElement = null;

  if (!askThemOutBtn || !namePopup || !nameForm || !loverNameInput) {
    return;
  }

  askThemOutBtn.addEventListener("click", () => {
    namePopup.classList.remove("hidden");
    namePopup.removeAttribute("hidden");
    namePopup.setAttribute("aria-hidden", "false");
    lastActiveElement = document.activeElement;
    loverNameInput.focus();
  });

  nameForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const loverName = loverNameInput.value.trim();
    if (loverName) {
      const url = `${window.location.origin}/portfolio/AskThemOut?name=${encodeURIComponent(
        loverName
      )}`;

      const existingContainer = document.getElementById("buttonContainer");
      if (existingContainer) existingContainer.remove();

      const buttonContainer = document.createElement("div");
      buttonContainer.id = "buttonContainer";
      buttonContainer.style.display = "flex";
      buttonContainer.style.gap = "10px";
      buttonContainer.style.marginTop = "10px";
      buttonContainer.style.position = "relative";

      const copyButton = document.createElement("button");
      copyButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4H20C20.5523 4 21 4.44772 21 5V21C21 21.5523 20.5523 22 20 22H5C4.44772 22 4 21.5523 4 21V5C4 4.44772 4.44772 4 5 4H9M9 2H15C15.5523 2 16 2.44772 16 3V5C16 5.55228 15.5523 6 15 6H9C8.44772 6 8 5.55228 8 5V3C8 2.44772 8.44772 2 9 2Z" stroke="#007bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      copyButton.type = "button";
      copyButton.style.background = "none";
      copyButton.style.border = "none";
      copyButton.style.cursor = "pointer";
      copyButton.style.padding = "5px";
      copyButton.style.borderRadius = "5px";
      copyButton.style.display = "flex";
      copyButton.style.alignItems = "center";
      copyButton.style.justifyContent = "center";
      copyButton.style.transition = "background 0.3s ease";

      copyButton.addEventListener("mouseenter", () => {
        copyButton.style.background = "#f0f0f0";
      });
      copyButton.addEventListener("mouseleave", () => {
        copyButton.style.background = "none";
      });

      const tooltip = document.createElement("div");
      tooltip.textContent = "Link copied!";
      tooltip.style.position = "absolute";
      tooltip.style.top = "-25px";
      tooltip.style.left = "50%";
      tooltip.style.transform = "translateX(-50%)";
      tooltip.style.backgroundColor = "#333";
      tooltip.style.color = "#fff";
      tooltip.style.padding = "5px 10px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "12px";
      tooltip.style.opacity = "0";
      tooltip.style.transition = "opacity 0.3s ease";
      tooltip.style.pointerEvents = "none";
      buttonContainer.appendChild(tooltip);

      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(url);
          tooltip.style.opacity = "1";
          tooltip.style.top = "0";
          tooltip.style.left = "60%";
          tooltip.style.transform = "translateX(-50%)";

          setTimeout(() => {
            tooltip.style.opacity = "0";
          }, 1500);
        } catch (err) {
          console.error("Clipboard copy failed:", err);
        }
      });

      const checkButton = document.createElement("button");
      checkButton.textContent = "Check it Out";
      checkButton.style.background = "#EC4899";
      checkButton.style.color = "#fff";
      checkButton.style.border = "none";
      checkButton.style.padding = "8px 12px";
      checkButton.style.borderRadius = "5px";
      checkButton.style.cursor = "pointer";
      checkButton.style.fontSize = "14px";
      checkButton.addEventListener("click", () => window.open(url, "_blank"));

      buttonContainer.appendChild(copyButton);
      buttonContainer.appendChild(checkButton);
      nameForm.appendChild(buttonContainer);
    } else {
      alert("Please enter a name!");
    }
  });

  namePopup.addEventListener("click", (e) => {
    if (e.target === namePopup) {
      namePopup.classList.add("hidden");
      namePopup.setAttribute("hidden", "");
      namePopup.setAttribute("aria-hidden", "true");
      if (lastActiveElement) {
        lastActiveElement.focus();
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !namePopup.classList.contains("hidden")) {
      namePopup.classList.add("hidden");
      namePopup.setAttribute("hidden", "");
      namePopup.setAttribute("aria-hidden", "true");
      if (lastActiveElement) {
        lastActiveElement.focus();
      }
    }
  });
};

const initTagCanvas = () => {
  if (!window.jQuery || !window.jQuery.fn || !window.jQuery.fn.tagcanvas) {
    return;
  }

  const $canvas = window.jQuery("#myCanvas");
  const $container = window.jQuery("#myCanvasContainer");

  if (!$canvas.length) {
    return;
  }

  const renderCanvas = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const textColor =
      rootStyles.getPropertyValue("--tag-text-color").trim() || "#ffffffff";

    if (window.jQuery.fn.tagcanvas) {
      $canvas.tagcanvas("destroy");
    }

    if (
      !$canvas.tagcanvas(
        {
          textColour: textColor,
          outlineColour: "transparent",
          reverse: true,
          depth: 0.05,
          maxSpeed: 0.05,
          weight: true,
          shadow: "transparent",
          shadowBlur: 10,
          shadowOffset: [5, 5],
          bgColour: "transparent",
          bgRadius: 10,
          pinchZoom: true,
          wheelZoom: true,
          fadeIn: 2000,
          initial: [0.1, -0.1],
          shape: "sphere",
          lock: "xy",
          stretchX: 1,
          stretchY: 1,
          decel: 0.98,
          noSelect: true,
          noMouse: false,
          freezeActive: true,
          freezeDecel: true,
          frontSelect: true,
          tooltip: "native",
          tooltipDelay: 0,
          tooltipClass: "tagcanvas-tooltip",
          tooltipNav: true,
          tooltipPosition: "top",
          tooltipOffset: [0, 0],
          tooltipOn: "hover",
        },
        "tags"
      )
    ) {
      console.error("TagCanvas failed to initialize. Hiding container.");
      $container.hide();
    }
  };

  renderCanvas();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        renderCanvas();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  form();
  skillbar();
  initNav();
  initTheme();
  initTyped();
  initSoundToggle();
  initAskThemOut();
  initTagCanvas();
});
