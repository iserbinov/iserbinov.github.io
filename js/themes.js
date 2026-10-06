"use strict";

// dark theme switching
function setDarkTheme() {
  var darkThemeTogglers = document.getElementsByClassName('toggler__checkbox');

  for (var i = 0; i < darkThemeTogglers.length; i++) {
    var darkThemeToggler = darkThemeTogglers[i];
    darkThemeToggler.checked = true;
  }

  localStorage.setItem("dark-theme", "true");
  document.getElementsByClassName('screen4')[0].classList.add('screen4--theme-dark');
  document.getElementsByClassName('screen6')[0].classList.add('screen6--theme-dark');
  document.documentElement.style.setProperty("--background-color-dynamic", "#3C4854");
  document.documentElement.style.setProperty("--background-white-dynamic", "#3C4854");
  document.documentElement.style.setProperty("--text-color-dynamic", "#ffffff");
  document.documentElement.style.setProperty("--ac-button-secondary-solid-default-bg-dynamic", "#617794");
  document.documentElement.style.setProperty("--ac-button-secondary-solid-default-text-dynamic", "#EAF0FF");
  document.documentElement.style.setProperty("--ac-button-secondary-solid-hover-bg-dynamic", "#7186A6");
  document.documentElement.style.setProperty("--secondary-light", "#005291");
  handleChangePrimaryColor();
}

function setLightTheme() {
  var darkThemeTogglers = document.getElementsByClassName('toggler__checkbox');

  for (var i = 0; i < darkThemeTogglers.length; i++) {
    var darkThemeToggler = darkThemeTogglers[i];
    darkThemeToggler.checked = false;
  }

  localStorage.removeItem("dark-theme");
  document.getElementsByClassName('screen4')[0].classList.remove('screen4--theme-dark');
  document.getElementsByClassName('screen6')[0].classList.remove('screen6--theme-dark');
  document.documentElement.style.setProperty("--background-color-dynamic", "#EDEEEF");
  document.documentElement.style.setProperty("--background-white-dynamic", "#FFFFFF");
  document.documentElement.style.setProperty("--text-color-dynamic", "#000000");
  document.documentElement.style.setProperty("--ac-button-secondary-solid-default-bg-dynamic", "#D0E9FF");
  document.documentElement.style.setProperty("--ac-button-secondary-solid-default-text-dynamic", "#167FFB");
  document.documentElement.style.setProperty("--ac-button-secondary-solid-hover-bg-dynamic", "#CCD1D4");
  document.documentElement.style.setProperty("--secondary-light", "#E8F5FF");
  handleChangePrimaryColor();
}

var darkThemeTogglers = document.getElementsByClassName('toggler__checkbox');

var _loop = function _loop(i) {
  var darkThemeToggler = darkThemeTogglers[i];
  darkThemeToggler.addEventListener('click', function (event) {
    if (darkThemeToggler.checked) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  });
};

for (var i = 0; i < darkThemeTogglers.length; i++) {
  _loop(i);
}