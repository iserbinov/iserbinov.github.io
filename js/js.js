"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var options = {
  // root: document.viewport,
  // rootMargin: '0px',
  threshold: [0.5]
};
var optionsScreen10 = {
  threshold: [0.3]
};
var optionsGame = {
  threshold: [0.1]
};

var twoWays = function twoWays(entries, observer) {
  var _iterator = _createForOfIteratorHelper(entries),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var entry = _step.value;
      var target = entry.target;

      if (entry.isIntersecting) {
        target.classList.add('observered');
      } else {
        target.classList.remove('observered');
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var oneWay = function oneWay(entries, observer) {
  var _iterator2 = _createForOfIteratorHelper(entries),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var entry = _step2.value;
      var target = entry.target;

      if (entry.isIntersecting) {
        target.classList.add('observered');
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
};

var observer = new IntersectionObserver(twoWays, options);
var observer10 = new IntersectionObserver(twoWays, optionsScreen10);
var observerGame = new IntersectionObserver(oneWay, optionsGame);

var observeWhenPresent = function observeWhenPresent(selector, instance) {
  var element = document.querySelector(selector);

  if (element) {
    instance.observe(element);
  }
};

observeWhenPresent('.rectangles', observer);
observeWhenPresent('.screen5__ampersand--back', observer);
observeWhenPresent('.screen5__logo--anm', observer);
observeWhenPresent('.screen8__bg--house', observer);
observeWhenPresent('.screen11__image--anm', observer);
observeWhenPresent('.screen10__part--first', observer10);
observeWhenPresent('.screen10__part--second', observer10);
observeWhenPresent('.screen7', observer);
observeWhenPresent('.graph7', observer);
observeWhenPresent('.screen4__game', observerGame); // painting cards game

var cursorColor = undefined;
var currentCursorName = undefined;
var currentTheme = 'light';
var screen4 = document.querySelector('.screen4__game');

if (document.documentElement.scrollWidth < 1170) {
  var jointInner = document.querySelector('.game__joint--inner');
  var jointOuter = document.querySelector('.game__joint--outer');
  if (jointInner) jointInner.classList.add('game__joint--inner--painted');
  if (jointOuter) jointOuter.classList.add('game__joint--outer--painted');
}

function deleteCursorModifier() {
  var screen4Container = document.querySelector('.screen4');
  if (!screen4Container || !currentCursorName) return;
  var modifierName = 'screen4--cursor-' + currentCursorName;
  screen4Container.classList.remove(modifierName);
  cursorColor = undefined;
  currentCursorName = undefined;
}

var screen4Container = document.querySelector('.screen4');
if (screen4Container) {
  screen4Container.addEventListener('click', function (event) {
  var target = event.target;
  var targetPaletteColor = target.closest('.palette__color');
  var targetCard = target.closest('.game__card');

  if (targetPaletteColor) {
    // clicking palettes and changing cursor icon
    if (cursorColor) {
      deleteCursorModifier();
    }

    cursorColor = window.getComputedStyle(targetPaletteColor, ':before').color;
    currentCursorName = currentTheme + targetPaletteColor.classList[1].replace('palette__color-', '');
    var modifierName = 'screen4--cursor-' + currentCursorName;
    document.getElementsByClassName('screen4')[0].classList.add(modifierName);
  } else if (targetCard && cursorColor) {
    // painting game cards
    targetCard.style.backgroundColor = cursorColor;
    targetCard.classList.add('game__card--painted'); //hide tooltip tip

    var gameTooltip = screen4.getElementsByClassName('tooltip__wrapper')[0];

    if (!gameTooltip.classList.contains('hidden')) {
      gameTooltip.classList.add('hidden');
    }

    if (targetCard.classList.contains('game__card--9')) {
      var jointInner = document.getElementsByClassName('game__joint--inner')[0];
      jointInner.style.backgroundColor = cursorColor;
      jointInner.classList.add('game__joint--inner--painted');
    } else if (targetCard.classList.contains('game__card--10')) {
      var jointOuter = document.getElementsByClassName('game__joint--outer')[0];
      jointOuter.style.backgroundColor = cursorColor;
      jointOuter.classList.add('game__joint--outer--painted');
    }
  } else if (cursorColor) {
    // delete cursor and its color after click
    deleteCursorModifier();
  }
});
}

// how to move up the window after details (screen 5) closing
var details = document.querySelector('.screen5__details');
var summary = document.querySelector('.screen5__summary');
if (summary && details) {
  summary.addEventListener('click', function () {
    if (details.hasAttribute('open')) {
      window.scrollBy(0, -986);
    }
  });
}
var currentWindowWidth = window.innerWidth;
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
window.addEventListener('resize', function () {
  if (currentWindowWidth !== window.innerWidth) {
    document.documentElement.style.setProperty('--vh', "".concat(window.innerHeight * 0.01, "px"));
  }

  currentWindowWidth = window.innerWidth;
});