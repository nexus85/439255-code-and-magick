'use strict';
(function () {
  var colorizeElement = function (element, colors, setColorMethod, currentColor) {
    var index = 1;
    return function () {
      setColorMethod(element, colors[index]);
      if (currentColor) {
        window.settings.Wizard[currentColor] = colors[index];
      }
      index = index + 1 < colors.length ? index + 1 : 0;
    };
  };
  var setFillColor = function (element, color) {
    element.style.fill = color;
  };
  var setBackgroundColor = function (element, color) {
    element.style.backgroundColor = color;
  };
  window.colorize = {
    colorizeElement: colorizeElement,
    setFillColor: setFillColor,
    setBackgroundColor: setBackgroundColor
  };
})();
