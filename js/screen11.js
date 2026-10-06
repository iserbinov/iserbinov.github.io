"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var screen11 = {
  body: document.querySelector('body'),
  scroll: document.getElementsByClassName('slides__scroll')[0],
  pages: document.getElementsByClassName('steps__pointer')[1],
  slides: document.getElementsByClassName('slide'),
  steps: document.getElementsByClassName('step'),
  mores: document.getElementsByClassName('slide__more'),
  title: document.getElementsByClassName('slide__title'),
  description: document.getElementsByClassName('modal11__description'),
  close: document.getElementsByClassName('modal11__close'),
  img: document.getElementsByClassName('modal11__image'),
  ovh: document.getElementsByClassName("slides__ovh"),
  help: document.getElementsByClassName("slides--help"),
  modal: document.getElementsByClassName("modal11__wrapper"),
  header: document.getElementsByClassName("header"),
  width: 0,
  currentSlideIndex: 0,
  previous: 0,
  xStart: 0,
  yStart: 0,
  slidesData: [{
    description: 'Шаблон модального окна можно импортировать в проект из библиотеки дизайн-системы. Компонент построен с правильными интервалами, стилями шрифта, содержит все необходимые функциональные элементы. Дизайнеру не нужно каждый раз проектировать модальное окно по-новому.',
    imageUrl: '../images/slides/slide1_1024.png'
  }, {
    description: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0442\u0440\u043E\u043A \u0434\u043B\u044F \u044F\u0447\u0435\u0435\u043A \u0432\u044B\u0441\u043E\u0442\u043E\u0439 56  \u2014  2 \u0441\u0442\u0440\u043E\u043A\u0438; \u0434\u043B\u044F \u044F\u0447\u0435\u0435\u043A \u0432\u044B\u0441\u043E\u0442\u043E\u0439 40  \u2014  1 \u0441\u0442\u0440\u043E\u043A\u0430.\n             \u0412 \u0442\u043E\u043C \u0441\u043B\u0443\u0447\u0430\u0435, \u0435\u0441\u043B\u0438 \u0442\u0435\u043A\u0441\u0442 \u043D\u0435 \u043F\u043E\u043C\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u044F\u0447\u0435\u0439\u043A\u0443, \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0435\u0433\u043E \u0441\u043E\u043A\u0440\u0430\u0449\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E. \n             \u0421 \u043F\u043E\u043B\u043D\u044B\u043C \u0442\u0435\u043A\u0441\u0442\u043E\u043C \u043C\u043E\u0436\u043D\u043E \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0432 \u0442\u0443\u043B\u0442\u0438\u043F\u0435.",
    imageUrl: '../images/slides/slide2_1024.png'
  }, {
    description: "\u0428\u0438\u0440\u0438\u043D\u0430 \u0441\u0442\u043E\u043B\u0431\u0446\u043E\u0432 \u0432 \u0442\u0430\u0431\u043B\u0438\u0446\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0438\u0445 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0438 \u043E\u0442 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u0432 \u044F\u0447\u0435\u0439\u043A\u0435. \n            \u0415\u0441\u043B\u0438 \u0432 \u0442\u0430\u0431\u043B\u0438\u0446\u0435 \u043C\u0435\u043D\u0435\u0435 8 \u0441\u0442\u043E\u043B\u0431\u0446\u043E\u0432, \u0442\u043E\u0433\u0434\u0430 \u0438\u0445 \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0448\u0438\u0440\u0438\u043D\u0430 \u0440\u0430\u0432\u043D\u0430 192, \u0430 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F  \u2014  384. \n            \u0415\u0441\u043B\u0438 \u0432 \u0442\u0430\u0431\u043B\u0438\u0446\u0435 \u0431\u043E\u043B\u0435\u0435 8 \u0441\u0442\u043E\u043B\u0431\u0446\u043E\u0432, \u0442\u043E\u0433\u0434\u0430 \u0438\u0445 \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0448\u0438\u0440\u0438\u043D\u0430 \u0440\u0430\u0432\u043D\u0430 128, \u0430 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F  \u2014  256.",
    imageUrl: '../images/slides/slide3_1024.png'
  }, {
    description: "\u0413\u0440\u0430\u0444\u0438\u043A\u0438 \u0438 \u0433\u0438\u0441\u0442\u043E\u0433\u0440\u0430\u043C\u043C\u044B  \u2014  \u0441\u043F\u043E\u0441\u043E\u0431 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0442\u0430\u0431\u043B\u0438\u0447\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432 \u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u043E\u043C \u0432\u0438\u0434\u0435. \n            \u0427\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u0438\u044F \u043E\u0442 \u0441\u0442\u0438\u043B\u0435\u0439 \u0438 \u043F\u0440\u0430\u0432\u0438\u043B, \u043F\u0440\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438 \u043C\u0430\u043A\u0435\u0442\u043E\u0432, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \n            \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B \u0438 \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0438\u0437 UI-kit.",
    imageUrl: '../images/slides/slide4_1024.png'
  }, {
    description: "\u041F\u0440\u0438\u043D\u0446\u0438\u043F\u044B \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u0442\u0443\u043B\u0442\u0438\u043F\u043E\u043C \u0437\u0430\u0438\u043C\u0441\u0442\u0432\u043E\u0432\u0430\u043D\u044B \u0438\u0437 Material Design. \u0412 \u043C\u0430\u043A\u0435\u0442\u0430\u0445 \u0432 \u0431\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u0435 \u0441\u043B\u0443\u0447\u0430\u0435\u0432 \u0442\u0443\u043B\u0442\u0438\u043F \n            \u0440\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043D\u0430\u0434 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C (\u043D\u0430\u0434 \u0438\u043D\u043F\u0443\u0442\u0430\u043C\u0438, \u0438\u043A\u043E\u043D\u043A\u0430\u043C\u0438 \u0438 \u0442.\u0434.). \u0412 \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u043B\u0443\u0447\u0430\u044F\u0445 \u0442\u0443\u043B\u0442\u0438\u043F \u0440\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0441\u0431\u043E\u043A\u0443 \n            \u043E\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430.",
    imageUrl: '../images/slides/slide5_1024.png'
  }, {
    description: "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043A\u043D\u043E\u043F\u043E\u043A \u0432 \u043C\u0430\u043A\u0435\u0442\u0430\u0445 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430. \u0411\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E \u0437\u0430\u043A\u043B\u044E\u0447\u0430\u0435\u0442\u0441\u044F \n            \u0432 \u0442\u043E\u043C, \u0447\u0442\u043E \u043A\u043D\u043E\u043F\u043A\u0430 Primary \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0434\u043D\u0430 \u043D\u0430 \u044D\u043A\u0440\u0430\u043D\u0435. \u0412 \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u043B\u0443\u0447\u0430\u044F\u0445 \u0434\u0430\u043D\u043D\u0443\u044E \u043A\u043D\u043E\u043F\u043A\u0443 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E \u0440\u0430\u0437\u043C\u0435\u0449\u0430\u0442\u044C \n            \u0432 \u043A\u0430\u0436\u0434\u043E\u043C \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u043C \u0431\u043B\u043E\u043A\u0435 \u044D\u043A\u0440\u0430\u043D\u0430.",
    imageUrl: '../images/slides/slide6_1024.png'
  }, {
    description: "\u0414\u043B\u044F \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \u0441\u0432\u0435\u0442\u043B\u043E\u0439 \u0438 \u0442\u0435\u043C\u043D\u043E\u0439 \u0442\u0435\u043C\u044B \u0432 UI-kit \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u0440\u0430\u0437\u043D\u044B\u0435 \u043F\u0430\u043B\u0438\u0442\u0440\u044B. \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C\u044B\u0439 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C \n            \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043C\u0430\u043A\u0435\u0442\u043E\u0432 \u0432 \u0442\u0435\u043C\u043D\u043E\u0439 \u0442\u0435\u043C\u0435: \u0438\u0437\u043D\u0430\u0447\u0430\u043B\u044C\u043D\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0438\u0440\u0443\u0435\u043C, \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \u0441\u0432\u0435\u0442\u043B\u043E\u0439 \u0442\u0435\u043C\u044B, \u043F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \n            \u0433\u043E\u0442\u043E\u0432\u044B\u0435 \u043C\u0430\u043A\u0435\u0442\u044B \u043F\u0435\u0440\u0435\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u0435\u043C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043F\u043B\u0430\u0433\u0438\u043D\u0430 Themer.",
    imageUrl: '../images/slides/slide7_1024.png'
  }, {
    description: "\u0412 \u043C\u043E\u0434\u0443\u043B\u0435 \xAB\u0431\u0430\u0440\xBB \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u044B \u043C\u0435\u0436\u0434\u0443 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430\u043C\u0438 \u0440\u0430\u0432\u043D\u044B 24, \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u043C\u0435\u0436\u0434\u0443 \u0431\u043E\u043A\u043E\u0432\u044B\u043C \u043C\u0435\u043D\u044E \u0438 \u043F\u0435\u0440\u0432\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C \u0441\u043B\u0435\u0432\u0430  \u2014  48. \u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u0438 \u043D\u0438\u0436\u043D\u0438\u0439 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u043C\u043E\u0434\u0443\u043B\u044F \u0440\u0430\u0432\u0435\u0442 12. \u0412 UI-kit \u043C\u043E\u0436\u043D\u043E \u043D\u0430\u0439\u0442\u0438 \u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u0438 \u0434\u043B\u044F \u0434\u0440\u0443\u0433\u0438\u0445 \u043C\u043E\u0434\u0443\u043B\u0435\u0439 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430.",
    imageUrl: '../images/slides/slide8_1024.png'
  }],
  handleTouchStart: function handleTouchStart(evt) {
    var firstTouch = evt.touches[0];
    var _ref = [firstTouch.clientX, firstTouch.clientY];
    this.xStart = _ref[0];
    this.yStart = _ref[1];
  },
  handleTouchMove: function handleTouchMove(evt) {
    if (!this.xStart) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = this.xStart - xUp;
    var absoluteXDiff = Math.abs(xDiff);
    var yDiff = this.yStart - yUp;
    var absoluteYDiff = Math.abs(yDiff);

    if (absoluteXDiff > absoluteYDiff) {
      if (xDiff > 0) {
        this.rotateBy(1);
      } else {
        this.rotateBy(-1);
      }
    }

    this.xStart = null;
    this.yStart = null;
  },
  changeSlide: function changeSlide(slide) {
    var isActive = slide ? slide.currentTarget.classList.contains('slide--active') : false;
    var nextSlide = slide ? slide.currentTarget : screen11.slides[screen11.currentSlideIndex];

    if (!isActive) {
      screen11.currentSlideIndex = _toConsumableArray(screen11.slides).findIndex(function (c) {
        return c === nextSlide;
      });
      screen11.scroll.style.transform = "translateX(-".concat(nextSlide.offsetLeft, "px)");
      screen11.pages.style.transform = "translateX(".concat(screen11.currentSlideIndex * 16, "px)");

      var _iterator = _createForOfIteratorHelper(screen11.slides),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _slide = _step.value;

          _slide.classList.remove('slide--active');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      nextSlide.classList.add('slide--active');
    }
  },
  rotateBy: function rotateBy(num) {
    if (screen11.currentSlideIndex + num < 0) {
      screen11.currentSlideIndex = screen11.slides.length - 1;
    } else if (screen11.currentSlideIndex + num > screen11.slides.length - 1) {
      screen11.currentSlideIndex = 0;
    } else {
      screen11.currentSlideIndex += num;
    }

    this.changeSlide();
  },
  init: function init() {
    var _this = this;

    _this.scroll.addEventListener('touchstart', function (ev) {
      _this.handleTouchStart(ev);
    }, false);

    _this.scroll.addEventListener('touchmove', function (ev) {
      _this.handleTouchMove(ev);
    }, false);

    var _iterator2 = _createForOfIteratorHelper(this.mores),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var more = _step2.value;
        more.addEventListener('click', function () {
          _this.modal[0].style.display = 'block';
          _this.header[0].style.display = 'none';
          _this.close[0].style.display = 'block';
          _this.body.style.overflowY = 'hidden';
          _this.body.style.overflowX = 'hidden';
          _this.description[0].innerHTML = _this.slidesData[_this.currentSlideIndex].description;
          _this.img[0].src = _this.slidesData[_this.currentSlideIndex].imageUrl;
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    _this.close[0].addEventListener('click', function () {
      _this.modal[0].style.display = 'none';
      _this.header[0].style.display = 'block';
      _this.close[0].style.display = 'none';
      _this.body.style.overflowY = 'auto';
    });

    var _iterator3 = _createForOfIteratorHelper(this.slides),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var slide = _step3.value;
        slide.addEventListener('click', _this.changeSlide, false);
        slide.slide = slide;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    var _iterator4 = _createForOfIteratorHelper(this.steps),
        _step4;

    try {
      var _loop = function _loop() {
        var step = _step4.value;
        step.addEventListener('click', function () {
          _this.previous = _this.currentSlideIndex;
          _this.currentSlideIndex = _toConsumableArray(step.parentNode.children).findIndex(function (c) {
            return c === step;
          }) - 1;

          if (_this.previous === 0 || _this.previous < _this.currentSlideIndex && _this.previous !== 0) {
            _this.pages.style.transform = "translateX(".concat((_this.currentSlideIndex - 1) * 16, "px)");
            _this.scroll.style.transform = "translateX(-".concat((_this.slides[0].offsetWidth + parseInt(getComputedStyle(_this.slides[0]).marginRight)) * (_this.currentSlideIndex - 1), "px)");

            var _iterator5 = _createForOfIteratorHelper(_this.slides),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var _slide2 = _step5.value;

                _slide2.classList.remove('slide--active');
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }

            _this.slides[_this.currentSlideIndex - 1].classList.add('slide--active');
          } else if (_this.currentSlideIndex === 0) {
            _this.pages.style.transform = "translateX(0px)";
            _this.scroll.style.transform = "translateX(0px)";

            var _iterator6 = _createForOfIteratorHelper(_this.slides),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var _slide3 = _step6.value;

                _slide3.classList.remove('slide--active');
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }

            _this.slides[0].classList.add('slide--active');
          } else if (_this.previous > _this.currentSlideIndex) {
            _this.pages.style.transform = "translateX(".concat(_this.currentSlideIndex * 16, "px)");
            _this.scroll.style.transform = "translateX(-".concat((_this.slides[0].offsetWidth + parseInt(getComputedStyle(_this.slides[0]).marginRight)) * _this.currentSlideIndex, "px)");

            var _iterator7 = _createForOfIteratorHelper(_this.slides),
                _step7;

            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                var _slide4 = _step7.value;

                _slide4.classList.remove('slide--active');
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }

            _this.slides[_this.currentSlideIndex].classList.add('slide--active');
          }
        });
      };

      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
};
screen11.init();