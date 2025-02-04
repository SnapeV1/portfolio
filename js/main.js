"use strict";
import form from "./form.js";
import skillbar from "./skillbar.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
  });
  form();
  skillbar();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");

  //Hamburger menu
  navBtn.onclick = () => {
    if (nav.classList.toggle("open")) {
      navBtnImg.src = "img/icons/close.svg";
    } else {
      navBtnImg.src = "img/icons/open.svg";
    }
  };

  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    const hero = document.querySelector("#home");
    let triggerHeight = hero.offsetHeight - 170;

    if (window.scrollY > triggerHeight) {
      header.classList.add("header-sticky");
      goToTop.classList.add("reveal");
    } else {
      header.classList.remove("header-sticky");
      goToTop.classList.remove("reveal");
    }
  });

  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 170;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          document
            .querySelector("header nav a[href*=" + id + "]")
            .classList.add("active");
        });
      }
    });
  };
});

const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');

// Check for saved theme preference, otherwise use system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleIcon.src = 'img/icons/sun.svg'; 
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggleIcon.src = 'img/icons/moon.svg';
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggleIcon.src = 'img/icons/sun.svg';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeToggleIcon.src = 'img/icons/moon.svg';
  }
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleIcon.src = 'img/icons/sun.svg';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleIcon.src = 'img/icons/moon.svg';
    }
  }
});
$(document).ready(function () {
  function initTagCanvas() {
    // Get colors directly from the computed root style
    const rootStyles = getComputedStyle(document.documentElement);
    const textColor = rootStyles.getPropertyValue('--tag-text-color').trim() || '#ffffffff';
    const bgColor = rootStyles.getPropertyValue('--tag-bg-color').trim() || '#000000ff';

    // Destroy existing TagCanvas instance
    if ($.fn.tagcanvas) {
      $('#myCanvas').tagcanvas('destroy');
    }

    // Reinitialize TagCanvas with enhanced settings
    if (
      !$('#myCanvas').tagcanvas(
        {
          textColour: textColor,
          outlineColour: 'transparent',
          reverse: true,
          depth: 0.05,
          maxSpeed: 0.05,
          weight: true,
          shadow: 'transparent',
          shadowBlur: 10,
          shadowOffset: [5, 5],
          bgColour:'transparent' ,
          bgRadius: 10,
          pinchZoom: true,
          wheelZoom: true,
          fadeIn: 2000,
          initial: [0.1, -0.1],
          shape: 'sphere',
          lock: 'xy',
          stretchX: 1,
          stretchY: 1,
          decel: 0.98,
          noSelect: true,
          noMouse: false,
          freezeActive: true,
          freezeDecel: true,
          frontSelect: true,
          tooltip: 'native',
          tooltipDelay: 0,
          tooltipClass: 'tagcanvas-tooltip',
          tooltipNav: true,
          tooltipPosition: 'top',
          tooltipOffset: [0, 0],
          tooltipOn: 'hover',
          tooltipDelay: 0,
          tooltipClass: 'tagcanvas-tooltip',
          tooltipNav: true,
          tooltipPosition: 'top',
          tooltipOffset: [0, 0],
          tooltipOn: 'hover',
        },
        'tags'
      )
    ) {
      console.error("TagCanvas failed to initialize. Hiding container.");
      $('#myCanvasContainer').hide();
    }
  }

  // Initial load
  initTagCanvas();

  // Observe changes to the root element's class
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        initTagCanvas();
      }
    });
  });

  observer.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ['data-theme'] 
  });
});









document.addEventListener("DOMContentLoaded", function() {
  var options = {
      strings: ["Software Engineer", "Web Developer", "Computer Science Student"], 
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true
  };

  var typed = new Typed("#typed-text", options);
});




const soundCloud = document.querySelector('.sound-cloud');
const off = document.querySelector('#off');
const on = document.querySelector('#on');
const myAudio = document.querySelector('#myAudio');

off.addEventListener('click', () => soundTrack('off'));
on.addEventListener('click', () => soundTrack('on'));

const soundTrack = (soundState) => {
if (soundState === 'off') {
on.style.display = 'inline-block'; 
off.style.display = 'none';
soundCloud.style.color = '#08fdd8';

myAudio.play().catch(error => console.log("Audio play error:", error));
} else if (soundState === 'on') {
on.style.display = 'none';
off.style.display = 'inline-block';
soundCloud.style.color = '#f50057';

myAudio.pause();

}
};

