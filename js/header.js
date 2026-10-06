"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var header = {
  header: document.querySelector('.js-header'),
  screens: document.getElementsByClassName('screen'),
  links: document.querySelectorAll('.header__link'),
  windowOffset: 200,
  offsets: [],
  lastScroll: 0,
  getCurrentScreenIndex: function getCurrentScreenIndex() {
    var screenIndex = 0;

    for (var i = this.offsets.length - 1; i >= 0; i--) {
      if (window.scrollY + this.windowOffset > this.offsets[i]) {
        screenIndex = i;
        break;
      }
    }

    return screenIndex ? screenIndex + 2 : screenIndex;
  },
  showHeader: function showHeader() {
    this.header.classList.add('header--active');
  },
  hideHeader: function hideHeader() {
    this.header.classList.remove('header--active');
  },
  setActiveLink: function setActiveLink(index) {
    for (var i = 0; i < this.links.length; i++) {
      if (this.links[i].classList.contains("header__link--active")) {
        this.links[i].classList.remove("header__link--active");
        break;
      }
    }

    this.links[index - 3].classList.add("header__link--active");
  },
  scrollPosition: function scrollPosition() {
    return document.documentElement.scrollTop;
  },
  isHeaderActive: function isHeaderActive() {
    return this.header.classList.contains('header--active');
  },
  setHeaderState: function setHeaderState() {
    var currentScreenIndex = this.getCurrentScreenIndex();

    if (currentScreenIndex && !this.isHeaderActive() && this.lastScroll > this.scrollPosition()) {
      this.showHeader();
      this.setActiveLink(currentScreenIndex);
    } else if (this.isHeaderActive() && this.scrollPosition() > this.lastScroll) {
      this.hideHeader();
    }

    if (!currentScreenIndex) {
      this.hideHeader();
    }

    this.lastScroll = this.scrollPosition();
  },
  setOffsets: function setOffsets() {
    this.offsets = [0].concat(_toConsumableArray(_toConsumableArray(this.screens).map(function (el) {
      return el.offsetTop;
    })));
  },
  bind: function bind() {
    var _this = this;

    var throttleFunction = this.throttle(this.setHeaderState, 500);
    window.addEventListener('scroll', function () {
      throttleFunction();
    });
    window.addEventListener('resize', function () {
      _this.setOffsets();
    });
  },
  throttle: function throttle(func, ms) {
    var _arguments = arguments,
        _this2 = this;

    var isThrottled = false,
        savedArgs,
        savedThis;

    var wrapper = function wrapper() {
      if (isThrottled) {
        // (2)
        savedArgs = _arguments;
        savedThis = _this2;
        return;
      }

      func.apply(_this2, _arguments); // (1)

      isThrottled = true;
      setTimeout(function () {
        isThrottled = false; // (3)

        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    };

    return wrapper;
  },
  init: function init() {
    this.setOffsets();
    this.bind();
    this.setHeaderState();
  }
};
header.init();

var handleHeaderBg = function handleHeaderBg() {
  var agent = window.navigator.userAgent;
  var conditionWindows = agent.includes('Windows');
  var conditionMacintosh = agent.includes('Macintosh');
  var element = document.querySelector('.screen1');

  if (conditionWindows) {
    // const conditionChrome = agent.includes('Chrome');
    element.style.background = '#0060D0';
  }

  if (conditionMacintosh) {
    element.style.background = '#006CD6'; // const conditionSafari = agent.includes('Safari');
    // const conditionYandex = agent.includes('YaBrowser');
    // if (conditionSafari) {
    //     element.style.background = '#006CD6';
    // }
    // if (conditionYandex) {
    //     element.style.background = '#006CD6';
    // }
  }
};

handleHeaderBg();