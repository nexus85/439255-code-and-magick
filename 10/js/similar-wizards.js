'use strict';
(function () {
  var wizards = null;
  var LOAD_TIMEOUT = 1000;
  var successLoadHandler = function (data) {
    wizards = data;
  };
  var errorLoadHandler = function (error) {
    error = error + ' Похожие волшебники не могут быть отображены.';
    window.message.show('Ошибка', error, window.message.Color.ERROR, window.settings.MESSAGE_SHOW_TIME);
  };
  var loadWizards = function () {
    if (!wizards) {
      window.backend.load(successLoadHandler, errorLoadHandler);
    }
  };
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.settings.Wizard.CURRENT_COAT_COLOR) {
      rank += 2;
    }
    if (wizard.colorEyes === window.settings.Wizard.CURRENT_EYES_COLOR) {
      rank += 1;
    }
    return rank;
  };
  var showWizards = function (num) {
    if (wizards) {
      var wizardsInfo = sortWizards();
      wizardsInfo.length = num;
      var fragment = window.util.getFragment(wizardsInfo, window.util.renderWizard);
      while (window.element.similarList.children.length) {
        window.element.similarList.removeChild(window.element.similarList.children[0]);
      }
      window.element.similarList.appendChild(fragment);
      window.element.userDialog.querySelector('.setup-similar').classList.remove('hidden');
    } else {
      setTimeout(function () {
        showWizards(num);
      }, LOAD_TIMEOUT);
    }
  };
  var sortWizards = function () {
    return wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    });
  };
  window.similarWizards = {
    load: loadWizards,
    show: showWizards
  };
})();
