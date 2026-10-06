"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_LIGHTNESS = {
  c900: 0.1,
  c800: 0.15,
  c700: 0.2,
  c600: 0.3,
  c500: 0.4,
  c400: 0.5,
  c300: 0.6,
  c200: 0.7,
  c100: 0.85,
  c050: 0.9
};

function isDarkTheme() {
  return Boolean(localStorage.getItem("dark-theme"));
}

var defineLightnessLevel = function defineLightnessLevel(L) {
  if (L <= DEFAULT_LIGHTNESS.c900) {
    return 'c900';
  }

  if (L <= DEFAULT_LIGHTNESS.c800) {
    return 'c800';
  }

  if (L <= DEFAULT_LIGHTNESS.c700) {
    return 'c700';
  }

  if (L <= DEFAULT_LIGHTNESS.c600) {
    return 'c600';
  }

  if (L <= DEFAULT_LIGHTNESS.c500) {
    return 'c500';
  }

  if (L <= DEFAULT_LIGHTNESS.c400) {
    return 'c400';
  }

  if (L <= DEFAULT_LIGHTNESS.c300) {
    return 'c300';
  }

  if (L <= DEFAULT_LIGHTNESS.c200) {
    return 'c200';
  }

  if (L <= DEFAULT_LIGHTNESS.c100) {
    return 'c100';
  }

  return 'c050';
};

var getSaturation = function getSaturation(saturation, isDark) {
  return isDark ? saturation - 0.1 : saturation;
};

var generatePalette = function generatePalette(colorHSL) {
  var lightness = _objectSpread({}, DEFAULT_LIGHTNESS);

  var isDark = isDarkTheme();
  return {
    c900: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c900
    }),
    c800: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c800
    }),
    c700: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c700
    }),
    c600: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c600
    }),
    c500: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c500
    }),
    c400: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c400
    }),
    c300: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c300
    }),
    c200: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c200
    }),
    c100: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c100
    }),
    c050: hslToHex({
      h: colorHSL.h,
      s: getSaturation(colorHSL.s, isDark),
      l: lightness.c050
    })
  };
};

var applyColorToElement = function applyColorToElement(elementId, color) {
  var element = document.getElementById(elementId);
  element.style.background = color;
};

var applyPalette = function applyPalette(palette) {
  Object.keys(palette).forEach(function (key) {
    applyColorToElement(key, palette[key]);
  });
};

var updateColorData = function updateColorData(palette) {
  Object.keys(palette).forEach(function (key) {
    var element = document.getElementById(key);
    element.setAttribute('data-color', palette[key]);
  });
};

var updateTooltip = function updateTooltip(elementId, color) {
  var tooltip = document.getElementById("".concat(elementId, "-tooltip"));
  var rgb = hexToRgb(color.replace('#', ''));
  tooltip.innerHTML = "<span>HEX: ".concat(color, " </span>\n  <span>RGBA: ").concat(rgbToString(rgb), "</span>");
};

var updateTooltips = function updateTooltips(palette) {
  Object.keys(palette).forEach(function (key) {
    updateTooltip(key, palette[key]);
  });
};

function updateActiveElement(originLevel) {
  var ACTIVE_CLASS = 'palette__color--active';
  var paletteElements = document.getElementsByClassName('palette__color');

  for (var i = 0; i < paletteElements.length; i++) {
    paletteElements[i].classList.remove(ACTIVE_CLASS);
  }

  var activeColorElement = document.getElementById(originLevel);
  activeColorElement.classList.add(ACTIVE_CLASS);
}

function handleChangePrimaryColor() {
  var colorInput = document.getElementById('color-input');
  var color = colorInput.value;
  var colorHex = color.replace('#', '');
  var colorRGB = hexToRgb(colorHex);
  var colorHSL = rgbToHsl(colorRGB.r, colorRGB.g, colorRGB.b);
  var originLevel = defineLightnessLevel(colorHSL.l);
  var palette = generatePalette(colorHSL);
  var isDark = isDarkTheme();
  document.documentElement.style.setProperty("--user-primary-color", isDark ? palette.c500 : palette.c400);
  document.documentElement.style.setProperty("--user-secondary-color", isDark ? palette.c700 : palette.c200);
  applyPalette(palette);
  updateTooltips(palette);
  updateColorData(palette);
  updateActiveElement(originLevel);
}

handleChangePrimaryColor();

function handleColorInputTextBlur() {
  var colorTextInput = document.getElementById('color-text-input');
  var color = colorTextInput.value;
  var colorInput = document.getElementById('color-input');
  colorInput.value = color;
}

function handleColorInputBlur() {
  var colorInput = document.getElementById('color-input');
  var color = colorInput.value;
  var colorTextInput = document.getElementById('color-text-input');
  colorTextInput.value = color;
} // show tooltip


var tooltipLabel = document.getElementById('help-tooltip-label');
var tooltip = document.getElementById('help-tooltip');

var hideTooltip = function hideTooltip() {
  tooltip.style.display = 'none';
};

var showTooltip = function showTooltip() {
  var condition = window.innerWidth <= 500;
  var rect = tooltipLabel.getBoundingClientRect();
  tooltip.style.display = 'block';
  tooltip.style.position = 'fixed';
  tooltip.style.top = "".concat(rect.top - 180, "px");
  tooltip.style.left = condition ? "".concat(rect.left - 120, "px") : "".concat(rect.left - 150, "px");
};

var checkHoverStatus = function checkHoverStatus() {
  if (getStyle(tooltip, 'display') === 'none') {
    showTooltip();
  } else {
    hideTooltip();
  }
};

tooltipLabel.addEventListener('pointerenter', checkHoverStatus);
tooltipLabel.addEventListener('mouseleave', hideTooltip); // copyColor

function copyColor(el) {
  var color = el.getAttribute("data-color");
  var textarea = document.createElement("textarea");
  textarea.value = color;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  } finally {
    document.body.removeChild(textarea);
    alert('Цвет скопирован');
  }
}

function getStyle(el, styleProp) {
  var value,
      defaultView = (el.ownerDocument || document).defaultView; // W3C standard way:

  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) {
    // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp]; // convert other units to pixels on IE

    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return function (value) {
        var oldLeft = el.style.left,
            oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      }(value);
    }

    return value;
  }
}

function copyAccentColor(el) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function getRGB(str) {
    return str.slice(str.indexOf('(') + 1, str.indexOf(')'));
  }

  var rgb = JSON.parse("[" + getRGB(getStyle(el, 'color')) + "]");
  var hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
  navigator.clipboard.writeText(hex);
  alert('Цвет скопирован');
}

var colorTextInput = document.getElementById('color-text-input');

var checkHexVal = function checkHexVal(event) {
  var val = event.target.value;

  if (!val.includes('#') || val.indexOf('#') !== 0) {
    event.target.value = '#' + val;
  }
};

var handleKeyPress = function handleKeyPress(event) {
  if (event.key === 'Enter') {
    handleColorInputTextBlur();
    handleChangePrimaryColor();
  }
};

colorTextInput.addEventListener('input', checkHexVal);
colorTextInput.addEventListener('keypress', handleKeyPress);
var colorInput = document.getElementById('color-input');
var colorPickerTooltip = document.getElementById('color-picker-tooltip');

var showColorTooltip = function showColorTooltip() {
  colorPickerTooltip.style.display = 'block';
};

var hideColorTooltip = function hideColorTooltip() {
  colorPickerTooltip.style.display = 'none';
};

colorInput.addEventListener('mouseenter', showColorTooltip);
colorInput.addEventListener('mouseleave', hideColorTooltip);