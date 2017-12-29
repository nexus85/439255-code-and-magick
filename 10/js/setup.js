'use strict';
(function () {
  var draggedItem = null;

  window.element.userDialog.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.parentElement.parentElement === window.element.shopElement ?
        evt.target.cloneNode(true) : evt.target;
      window.element.artifactsElement.setAttribute('style', 'outline: 2px dashed red;');
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });
  window.element.artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });
  window.element.artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    if (evt.target.tagName.toLowerCase() === 'div' && evt.target.children.length === 0) {
      evt.target.appendChild(draggedItem);
    }
    window.element.artifactsElement.removeAttribute('style');
    draggedItem = null;
    evt.preventDefault();
  });

  window.element.artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  window.element.artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
  window.element.artifactsElement.addEventListener('dragend', function (evt) {
    evt.target.parentElement.removeChild(draggedItem);
    window.element.artifactsElement.removeAttribute('style');
    evt.preventDefault();
  });
})();
