'use strict';
(function () {
  var setupWizard = {
    coatColor: window.settings.Wizard.COAT_COLORS[0],
    eyesColor: window.settings.Wizard.EYES_COLORS[0],
    fireballColor: window.settings.Wizard.FIREBALL_COLORS[0]
  };
  var changeColor = function (property, source) {
    for (var i = 0; i < source.length; i++) {
      if (source[i] === setupWizard[property]) {
        break;
      }
    }
    i = (i + 1 < source.length) ? i + 1 : 0;
    setupWizard[property] = source[i];
  };
  var changeCoatColor = function () {
    changeColor('coatColor', window.settings.Wizard.COAT_COLORS);
    window.elements.wizardCoatInput.value = setupWizard.coatColor;
    window.elements.setupWizardCoat.setAttribute('style', 'fill: ' + setupWizard.coatColor);
  };
  var changeEyesColor = function () {
    changeColor('eyesColor', window.settings.Wizard.EYES_COLORS);
    window.elements.wizardEyesInput.value = setupWizard.eyesColor;
    window.elements.setupWizardEyes.setAttribute('style', 'fill: ' + setupWizard.eyesColor);
  };
  var changeFireballColor = function () {
    changeColor('fireballColor', window.settings.Wizard.FIREBALL_COLORS);
    window.elements.setupFireballInput.value = setupWizard.fireballColor;
    window.elements.setupFireballWrap.setAttribute('style', 'background-color: ' + setupWizard.fireballColor);
  };
  window.colorize = {
    changeCoatColor: changeCoatColor,
    changeEyesColor: changeEyesColor,
    changeFireballColor: changeFireballColor
  };
})();
