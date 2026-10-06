"use strict";

function setCopyrightYear() {
  var yearSpan = document.getElementById('copyright-year');
  yearSpan.innerText = new Date().getFullYear();
}

;
setCopyrightYear();

function handleTheme() {
  var isDark = localStorage.getItem("dark-theme");

  if (isDark) {
    setDarkTheme();
  }
}

handleTheme();