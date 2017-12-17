'use strict';
(function () {
  var wizards = window.data.getRandomWizards(4);
  var fragment = window.util.getFragment(wizards, window.util.renderWizard);
  window.elements.similarList.appendChild(fragment);
  window.elements.userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var draggedItem = null;

  window.elements.userDialog.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.parentElement.parentElement === window.elements.shopElement ?
        evt.target.cloneNode(true) : evt.target;
      window.elements.artifactsElement.setAttribute('style', 'outline: 2px dashed red;');
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });
  window.elements.artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });
  window.elements.artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    if (evt.target.tagName.toLowerCase() === 'div' && evt.target.children.length === 0) {
      evt.target.appendChild(draggedItem);
    }
    window.elements.artifactsElement.removeAttribute('style');
    draggedItem = null;
    evt.preventDefault();
  });

  window.elements.artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  window.elements.artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
  window.elements.artifactsElement.addEventListener('dragend', function (evt) {
    evt.target.parentElement.removeChild(draggedItem);
    evt.preventDefault();
  });
})();
