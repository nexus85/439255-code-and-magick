'use strict';
(function () {
  var openPopup = function () {
    window.elements.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
    window.util.setListeners(window.elements.userNameInput, 'add', ['invalid', 'input'],
        [inputInvalidHandler, inputInputHandler]);
    window.util.setListeners(window.elements.userDialog, 'add', ['click', 'keydown'],
        [wizardClickHandler, wizardKeydownHandler]);
  };

  var closePopup = function () {
    window.elements.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    window.util.setListeners(window.elements.userNameInput, 'remove', ['invalid', 'input'],
        [inputInvalidHandler, inputInputHandler]);
    window.util.setListeners(window.elements.userDialog, 'remove', ['click', 'keydown'],
        [wizardClickHandler, wizardKeydownHandler]);
  };

  var popupOpenButtonClickHandler = window.util.getClickHandler(openPopup);
  var popupOpenButtonEnterPressHandler = window.util.getKeydownHandler(window.settings.KeyCodes.ENTER, openPopup);
  var popupCloseButtonClickHandler = window.util.getClickHandler(closePopup);
  var popupCloseButtonEnterPressHandler = window.util.getKeydownHandler(window.settings.KeyCodes.ENTER, closePopup);
  var popupEscPressHandler = window.util.getKeydownHandler(window.settings.KeyCodes.ESC, closePopup);
  var inputInvalidHandler = function (evt) {
    window.util.setListeners(window.elements.userDialogSave, 'remove', ['click', 'keydown'],
        [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (evt.target.validity.tooLong) {
      evt.target.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
      window.util.setListeners(window.elements.userDialogSave, 'add', ['click', 'keydown'],
          [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
    }
  };
  var inputInputHandler = function (evt) {
    var target = evt.target;
    window.util.setListeners(window.elements.userDialogSave, 'remove', ['click', 'keydown'],
        [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
      window.util.setListeners(window.elements.userDialogSave, 'add', ['click', 'keydown'],
          [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
    }
  };
  var wizardClickHandler = function (evt) {
    if (evt.target === window.elements.setupWizardCoat) {
      window.colorize.changeCoatColor();
    }
    if (evt.target === window.elements.setupWizardEyes) {
      window.colorize.changeEyesColor();
    }
    if (evt.target === window.elements.setupFireballWrap
        || evt.target === window.elements.setupFireballWrap.children[0]) {
      window.colorize.changeFireballColor();
    }
  };
  var wizardKeydownHandler = function (evt) {
    if (evt.keyCode === window.settings.KeyCodes.ENTER || evt.keyCode === window.settings.KeyCodes.SPACE) {
      wizardClickHandler(evt);
    }
  };
  window.util.setListeners(window.elements.userDialogOpen, 'add', ['click', 'keydown'],
      [popupOpenButtonClickHandler, popupOpenButtonEnterPressHandler]);
  window.util.setListeners(window.elements.userDialogClose, 'add', ['click', 'keydown'],
      [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
  window.util.setListeners(window.elements.userDialogSave, 'add', ['click', 'keydown'],
      [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
})();
