"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var screen10 = {
  body: document.querySelector('body'),
  cards: document.querySelectorAll('.screen10 .card'),
  modalWindow: document.querySelector('.modal__wrapper'),
  modalWrapper: document.querySelector('.modal__fog'),
  modalTitle: document.querySelector('.modal__title'),
  modalDescription: document.querySelector('.modal__description'),
  modalImage: document.querySelector('.modal__image'),
  closeModalButton: document.querySelectorAll('.js-close-modal'),
  prevModalButton: document.querySelector('.js-prev-modal'),
  nextModalButton: document.querySelector('.js-next-modal'),
  pager10: document.querySelector('.steps_adaptive'),
  steps: document.querySelector('.modal__content').querySelectorAll('.step'),
  slideIndex: 0,
  xStart: 0,
  yStart: 0,
  slidesData: [{
    title: 'Анализ выполнения планов',
    description: 'Аглодоменное производство',
    imageUrl: '../images/screen10/popup_img_1.png',
    mobileImageUrl: '../images/screen10/adaptive_slides/1.png'
  }, {
    title: 'Перемещение мат. ресурса',
    description: 'Аглодоменное производство',
    imageUrl: '../images/screen10/popup_img_2.png',
    mobileImageUrl: '../images/screen10/adaptive_slides/2.png'
  }, {
    title: 'Сменный рапорт',
    description: 'Рапорт',
    imageUrl: '../images/screen10/popup_img_3.png',
    mobileImageUrl: '../images/screen10/adaptive_slides/3.png'
  }, {
    title: 'АРМ калильщика',
    description: 'Метиз',
    imageUrl: '../images/screen10/popup_img_4.png',
    mobileImageUrl: '../images/screen10/adaptive_slides/4.png'
  }, {
    title: 'Паспорт плавки',
    description: 'Сталеплавильное производство',
    imageUrl: '../images/screen10/popup_img_5.png',
    mobileImageUrl: '../images/screen10/adaptive_slides/5.png'
  }, {
    title: 'Регистрация плавки',
    description: 'Сталеплавильное производство',
    imageUrl: '../images/screen10/popup_img_6.png',
    mobileImageUrl: '../images/screen10/adaptive_slides/6.png'
  }, {
    title: 'Первичное описание отклонений',
    description: 'СПЭП',
    imageUrl: '../images/screen10/popup_img_7.png',
    mobileImageUrl: '../images/screen10/adaptive_slides/7.png'
  }, {
    title: 'Модель остывания колпаков печей',
    description: 'ВТО',
    imageUrl: '../images/screen10/popup_img_8.png',
    mobileImageUrl: '../images/screen10/adaptive_slides/8.png'
  }],
  setOpenerProperties: function setOpenerProperties(trigger) {
    this.modalWindow.style.display = trigger ? "block" : "none";
    this.modalWrapper.style.display = trigger ? "block" : "none";
    this.body.style.overflowY = trigger ? "hidden" : "auto";
    this.body.style.overflowX = "hidden";
  },
  openModal: function openModal(cardIndex) {
    this.setOpenerProperties(true);
    this.showSlideByNumber(cardIndex);
  },
  closeModal: function closeModal() {
    this.setOpenerProperties(false);
    this.slideIndex = 0;
  },
  rotateBy: function rotateBy(num) {
    this.showSlideByNumber(this.slideIndex += num);
  },
  showSlideByNumber: function showSlideByNumber(n) {
    var slidesCount = 7;
    this.slideIndex = n > slidesCount ? 0 : n < 0 ? slidesCount : n;
    this.modalTitle.innerHTML = this.slidesData[this.slideIndex].title;
    this.modalDescription.innerHTML = this.slidesData[this.slideIndex].description;
    this.modalImage.src = this.slidesData[this.slideIndex][window.innerWidth > 1400 ? 'imageUrl' : 'mobileImageUrl'];
    this.pager10.style.transform = "translateX(".concat(this.slideIndex * 16, "px)");
  },
  handleTouchStart: function handleTouchStart(evt) {
    var firstTouch = evt.touches[0];
    this.xStart = firstTouch.clientX;
    this.yStart = firstTouch.clientY;
  },
  handleTouchMove: function handleTouchMove(evt) {
    if (!this.xStart) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = this.xStart - xUp;
    var yDiff = this.yStart - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.rotateBy(1);
      } else {
        this.rotateBy(-1);
      }
    }

    this.xStart = null;
    this.yStart = null;
  },
  bind: function bind() {
    var _this = this;

    window.addEventListener('resize', function (event) {
      _this.rotateBy(0);
    });

    var _iterator = _createForOfIteratorHelper(this.closeModalButton),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var closeButton = _step.value;
        closeButton.addEventListener('click', function () {
          _this.closeModal();
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.nextModalButton.addEventListener('click', function () {
      _this.rotateBy(1);
    });
    this.prevModalButton.addEventListener('click', function () {
      _this.rotateBy(-1);
    });

    var _loop = function _loop(cardIndex) {
      _this.cards[cardIndex].addEventListener("click", function (e) {
        e.preventDefault();

        _this.openModal(cardIndex);
      });
    };

    for (var cardIndex = 0; cardIndex < this.cards.length; cardIndex++) {
      _loop(cardIndex);
    }

    ;

    var _loop2 = function _loop2(stepIndex) {
      _this.steps[stepIndex].addEventListener('click', function (e) {
        e.preventDefault();

        _this.showSlideByNumber(stepIndex);
      });
    };

    for (var stepIndex = 0; stepIndex < this.steps.length; stepIndex++) {
      _loop2(stepIndex);
    }

    this.modalWindow.addEventListener('touchstart', function (ev) {
      _this.handleTouchStart(ev);
    }, false);
    this.modalWindow.addEventListener('touchmove', function (ev) {
      _this.handleTouchMove(ev);
    }, false);
  },
  init: function init() {
    this.bind();
  }
};
screen10.init();