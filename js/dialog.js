'use strict';
(function () {
  var initialCoords = {
  };
  var avatarEnterPressHandler = function (evt) {
    if (evt.keyCode === window.settings.KeyCode.ENTER) {
      window.elements.dialogAvatarInput.click();
    }
  };
  var mouseDownHandler = function (evt) {
    if (evt.target === window.elements.dialogHandle) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var isMoved = false;
      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        isMoved = true;
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.elements.userDialog.style.top = (window.elements.userDialog.offsetTop - shift.y) + 'px';
        window.elements.userDialog.style.left = (window.elements.userDialog.offsetLeft - shift.x) + 'px';
      };
      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        if (!isMoved) {
          window.elements.dialogAvatarInput.click();
        }
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  };
  var openPopup = function () {
    window.elements.dialogAvatarInput.style.zIndex = '-1';
    if (initialCoords.y !== window.elements.userDialog.style.top ||
        initialCoords.x !== window.elements.userDialog.style.left) {
      window.elements.userDialog.style.top = initialCoords.y + 'px';
      window.elements.userDialog.style.left = initialCoords.x + 'px';
    }
    window.elements.userDialog.classList.remove('hidden');
    if (initialCoords.x !== null && initialCoords.y !== null) {
      initialCoords.x = window.elements.userDialog.offsetLeft;
      initialCoords.y = window.elements.userDialog.offsetTop;
    }
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
  var popupOpenButtonEnterPressHandler = window.util.getKeydownHandler(window.settings.KeyCode.ENTER, openPopup);
  var popupCloseButtonClickHandler = window.util.getClickHandler(closePopup);
  var popupCloseButtonEnterPressHandler = window.util.getKeydownHandler(window.settings.KeyCode.ENTER, closePopup);
  var popupEscPressHandler = window.util.getKeydownHandler(window.settings.KeyCode.ESC, closePopup);
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
  var changeCoatColor = window.colorize.colorizeElement(window.elements.setupWizardCoat,
      window.settings.Wizard.COAT_COLORS, window.colorize.setFillColor);
  var changeEyesColor = window.colorize.colorizeElement(window.elements.setupWizardEyes,
      window.settings.Wizard.EYES_COLORS, window.colorize.setFillColor);
  var changeFireballColor = window.colorize.colorizeElement(window.elements.setupFireballWrap,
      window.settings.Wizard.FIREBALL_COLORS, window.colorize.setBackgroundColor);
  var wizardClickHandler = function (evt) {
    if (evt.target === window.elements.setupWizardCoat) {
      changeCoatColor();
    }
    if (evt.target === window.elements.setupWizardEyes) {
      changeEyesColor();
    }
    if (evt.target === window.elements.setupFireballWrap
        || evt.target === window.elements.setupFireballWrap.children[0]) {
      changeFireballColor();
    }
  };
  var wizardKeydownHandler = function (evt) {
    if (evt.keyCode === window.settings.KeyCode.ENTER || evt.keyCode === window.settings.KeyCode.SPACE) {
      wizardClickHandler(evt);
    }
  };
  window.elements.userDialog.addEventListener('mousedown', mouseDownHandler);
  window.elements.dialogHandle.addEventListener('keydown', avatarEnterPressHandler);
  window.util.setListeners(window.elements.userDialogOpen, 'add', ['click', 'keydown'],
      [popupOpenButtonClickHandler, popupOpenButtonEnterPressHandler]);
  window.util.setListeners(window.elements.userDialogClose, 'add', ['click', 'keydown'],
      [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
  window.util.setListeners(window.elements.userDialogSave, 'add', ['click', 'keydown'],
      [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
})();
