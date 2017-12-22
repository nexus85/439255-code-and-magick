'use strict';
(function () {
  window.util = {
    getMaxNumber: function (arr) {
      return Math.max.apply(null, arr);
    },
    getRandomColor: function (red, green, blue, opacity) {
      red = red || Math.floor(Math.random() * 256);
      green = green || Math.floor(Math.random() * 256);
      blue = blue || Math.floor(Math.random() * 256);
      opacity = opacity || Math.ceil((Math.random() * 0.9 + 0.1) * 100) / 100;
      return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + opacity + ')';
    },
    getFragment: function (data, renderMethod) {
      var fragment = document.createDocumentFragment();
      data.forEach(function (item) {
        fragment.appendChild(renderMethod(item));
      });
      return fragment;
    },
    renderWizard: function (wizard) {
      var wizardElement = window.element.similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
      return wizardElement;
    },
    setListeners: function (element, action, events, handlers) {
      if (action === 'add') {
        events.forEach(function (event, index) {
          element.addEventListener(event, handlers[index]);
        });
      }
      if (action === 'remove') {
        events.forEach(function (event, index) {
          element.removeEventListener(event, handlers[index]);
        });
      }
    },
    getClickHandler: function (method) {
      return function () {
        method();
      };
    },
    getKeydownHandler: function (keyCode, method) {
      return function (evt) {
        if (evt.keyCode === keyCode) {
          method(evt);
        }
      };
    }
  };
})();
