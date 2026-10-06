"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var menu = {
  body: document.querySelector('body'),
  panel: document.getElementsByClassName('header__menu'),
  icon: document.getElementsByClassName('header__menu--icon'),
  header: document.getElementsByClassName('header--active'),
  logo: document.getElementsByClassName('header__logo'),
  screen: document.getElementsByClassName('header__light'),
  links: document.getElementsByClassName('header__link text'),
  hideMenu: function hideMenu() {
    this.body.style.overflow = 'hidden auto';
    this.icon[0].style.color = '#167FFB';
    this.header[0].style.background = '#FFF';
    this.header[0].style.boxShadow = '10px 14px 20px rgba(0, 54, 117, 0.07)';
    this.logo[0].style.color = '#167FFB';
    this.screen[0].style.display = 'none';
  },
  init: function init() {
    var _this = this;

    document.getElementsByClassName('header__menu--icon')[0].addEventListener('click', function () {
      _this.panel[0].classList.toggle("header__menu--active");

      if (_this.panel[0].classList.contains("header__menu--active")) {
        _this.header[0].style.background = 'transparent';
        _this.header[0].style.boxShadow = 'unset';
        _this.logo[0].style.color = 'transparent';
        _this.icon[0].style.color = '#FFF';
        _this.screen[0].style.display = 'block';
        _this.body.style.overflow = 'hidden';
      } else {
        _this.hideMenu();
      }
    });

    _this.screen[0].addEventListener('click', function () {
      _this.panel[0].classList.toggle("header__menu--active");

      _this.hideMenu();
    });

    var _iterator = _createForOfIteratorHelper(this.links),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var link = _step.value;
        link.addEventListener('click', function () {
          _this.panel[0].classList.toggle("header__menu--active");

          _this.hideMenu();
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
};
menu.init();