'use strict';
(function () {
  var getRandomName = function () {
    var name = [];
    name[Math.round(Math.random())] = window.util.getRandomElement(window.settings.Wizard.WIZARD_NAMES);
    var i = name[0] ? 1 : 0;
    name[i] = window.util.getRandomElement(window.settings.Wizard.WIZARD_SURNAMES);
    return name.join(' ');
  };

  var RandomWizard = function () {
    this.name = getRandomName();
    this.coatColor = window.util.getRandomElement(window.settings.Wizard.COAT_COLORS);
    this.eyesColor = window.util.getRandomElement(window.settings.Wizard.EYES_COLORS);
  };

  var getRandomWizards = function (amount) {
    var wizards = [];
    while (amount-- > 0) {
      wizards.push(new RandomWizard());
    }
    return wizards;
  };
  window.data = {
    getRandomWizards: getRandomWizards
  };
})();
