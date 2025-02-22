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
          const targetLink = document.querySelector(
            "header nav a[href*=" + id + "]"
          );
          if (targetLink) {
            targetLink.classList.add("active");
          }
        });
      }
    });
  };
});

const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleIcon.src = 'img/icons/sun.svg'; 
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggleIcon.src = 'img/icons/moon.svg';
}

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
    const rootStyles = getComputedStyle(document.documentElement);
    const textColor = rootStyles.getPropertyValue('--tag-text-color').trim() || '#ffffffff';
    const bgColor = rootStyles.getPropertyValue('--tag-bg-color').trim() || '#000000ff';

    if ($.fn.tagcanvas) {
      $('#myCanvas').tagcanvas('destroy');
    }

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

  initTagCanvas();

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



document.addEventListener('DOMContentLoaded', () => {
  const askThemOutBtn = document.getElementById('askThemOutBtn');
  const namePopup = document.getElementById('namePopup');
  const nameForm = document.getElementById('nameForm');
  const loverNameInput = document.getElementById('loverName');

  
  askThemOutBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    namePopup.classList.remove('hidden'); 
  });

  nameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const loverName = loverNameInput.value.trim();
    if (loverName) {
        const url = `${window.location.origin}/portfolio/AskThemOut?name=${encodeURIComponent(loverName)}`;

        const existingContainer = document.getElementById("buttonContainer");
        if (existingContainer) existingContainer.remove();

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "buttonContainer";
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "10px";
        buttonContainer.style.marginTop = "10px";
        buttonContainer.style.position = "relative"; // For positioning the tooltip

        const linkElement = document.createElement("span");
        linkElement.textContent = url;
        linkElement.style.display = "none"; 

        // Create a simple copy button with an icon
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
                tooltip.style.position = "absolute";
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

        buttonContainer.appendChild(linkElement);
        buttonContainer.appendChild(copyButton);
        buttonContainer.appendChild(checkButton);
        nameForm.appendChild(buttonContainer);
    } else {
        alert("Please enter a name!");
    }
});


  namePopup.addEventListener('click', (e) => {
    if (e.target === namePopup) {
      namePopup.classList.add('hidden');
    }
  });
});