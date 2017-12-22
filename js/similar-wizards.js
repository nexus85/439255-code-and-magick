'use strict';
(function () {
  var wizards = null;
  var successLoadHandler = function (data) {
    wizards = data;
  };
  var errorLoadHandler = function (error) {
    error = error + ' Похожие волшебники не могут быть отображены.';
    window.message.show('Ошибка', error, window.message.Color.ERROR, 3000);
  };
  var loadWizards = function () {
    if (!wizards) {
      window.backend.load(successLoadHandler, errorLoadHandler);
    }
  };
  var showWizards = function (num) {
    if (wizards) {
      var wizardsInfo = wizards.slice(0, num);
      var fragment = window.util.getFragment(wizardsInfo, window.util.renderWizard);
      window.element.similarList.appendChild(fragment);
      window.element.userDialog.querySelector('.setup-similar').classList.remove('hidden');
    } else {
      setTimeout(function () {
        showWizards(num);
      }, 1000);
    }
  };
  window.similarWizards = {
    load: loadWizards,
    show: showWizards
  };
})();
