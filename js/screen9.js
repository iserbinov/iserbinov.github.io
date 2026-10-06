"use strict";

var panelClassName = '.tabs__panel';
var panelClassNameForShow = 'visible';
var tabClassName = '.tab-button';
var tabClassNameForActive = 'active';

var showPanel = function showPanel(tabId) {
  var panels = document.querySelectorAll(panelClassName) || [];
  panels.forEach(function (panel) {
    if (panel && panel.classList.contains(panelClassNameForShow) && panel.id != tabId) {
      panel.classList.remove(panelClassNameForShow);
    }

    if (panel.id == tabId) {
      panel.classList.add(panelClassNameForShow);
    }
  });
};

var toggleTab = function toggleTab(ev, tabId) {
  var tabButton = document.querySelectorAll(tabClassName) || [];
  tabButton.forEach(function (btn) {
    if (btn && btn.classList.contains(tabClassNameForActive)) {
      btn.classList.remove(tabClassNameForActive);
    }
  });
  ev.target.closest('div').classList.add(tabClassNameForActive);

  if (tabId) {
    showPanel(tabId);
  }
};