'use strict';
(function () {
  var wizards = window.data.getRandomWizards(4);
  var fragment = window.util.getFragment(wizards, window.util.renderWizard);
  window.elements.similarList.appendChild(fragment);
  window.elements.userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
