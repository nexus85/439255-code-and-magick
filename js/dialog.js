'use strict';
(function () {
  var initialCoords = {
  };
  var avatarEnterPressHandler = function (evt) {
    if (evt.keyCode === window.settings.KeyCode.ENTER) {
      window.element.dialogAvatarInput.click();
    }
  };
  var mouseDownHandler = function (evt) {
    if (evt.target === window.element.dialogHandle) {
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

        window.element.userDialog.style.top = (window.element.userDialog.offsetTop - shift.y) + 'px';
        window.element.userDialog.style.left = (window.element.userDialog.offsetLeft - shift.x) + 'px';
      };
      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        if (!isMoved) {
          window.element.dialogAvatarInput.click();
        }
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  };
  var openPopup = function () {
    if (!window.element.similarList.children.length) {
      window.similarWizards.load();
      window.similarWizards.show(window.settings.SIMILAR_WIZARDS_AMOUNT);
    }
    window.element.dialogAvatarInput.style.zIndex = '-1';
    if (initialCoords.y !== window.element.userDialog.style.top ||
        initialCoords.x !== window.element.userDialog.style.left) {
      window.element.userDialog.style.top = initialCoords.y + 'px';
      window.element.userDialog.style.left = initialCoords.x + 'px';
    }
    window.element.userDialog.classList.remove('hidden');
    if (initialCoords.x !== null && initialCoords.y !== null) {
      initialCoords.x = window.element.userDialog.offsetLeft;
      initialCoords.y = window.element.userDialog.offsetTop;
    }
    document.addEventListener('keydown', popupEscPressHandler);
    window.util.setListeners(window.element.userNameInput, 'add', ['invalid', 'input'],
        [inputInvalidHandler, inputInputHandler]);
    window.util.setListeners(window.element.userDialog, 'add', ['click', 'keydown'],
        [wizardClickHandler, wizardKeydownHandler]);
  };

  var closePopup = function () {
    window.element.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    window.util.setListeners(window.element.userNameInput, 'remove', ['invalid', 'input'],
        [inputInvalidHandler, inputInputHandler]);
    window.util.setListeners(window.element.userDialog, 'remove', ['click', 'keydown'],
        [wizardClickHandler, wizardKeydownHandler]);
  };

  var popupOpenButtonClickHandler = window.util.getClickHandler(openPopup);
  var popupOpenButtonEnterPressHandler = window.util.getKeydownHandler(window.settings.KeyCode.ENTER, openPopup);
  var popupCloseButtonClickHandler = window.util.getClickHandler(closePopup);
  var popupCloseButtonEnterPressHandler = window.util.getKeydownHandler(window.settings.KeyCode.ENTER, closePopup);
  var popupEscPressHandler = window.util.getKeydownHandler(window.settings.KeyCode.ESC, closePopup);
  var inputInvalidHandler = function (evt) {
    window.util.setListeners(window.element.userDialogSave, 'remove', ['click', 'keydown'],
        [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (evt.target.validity.tooLong) {
      evt.target.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
      window.util.setListeners(window.element.userDialogSave, 'add', ['click', 'keydown'],
          [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
    }
  };
  var inputInputHandler = function (evt) {
    var target = evt.target;
    window.util.setListeners(window.element.userDialogSave, 'remove', ['click', 'keydown'],
        [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
      window.util.setListeners(window.element.userDialogSave, 'add', ['click', 'keydown'],
          [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
    }
  };
  var changeCoatColor = window.colorize.colorizeElement(window.element.setupWizardCoat,
      window.settings.Wizard.COAT_COLORS, window.colorize.setFillColor, 'CURRENT_COAT_COLOR');
  var changeEyesColor = window.colorize.colorizeElement(window.element.setupWizardEyes,
      window.settings.Wizard.EYES_COLORS, window.colorize.setFillColor, 'CURRENT_EYES_COLOR');
  var changeFireballColor = window.colorize.colorizeElement(window.element.setupFireballWrap,
      window.settings.Wizard.FIREBALL_COLORS, window.colorize.setBackgroundColor);
  var wizardClickHandler = function (evt) {
    if (evt.target === window.element.setupWizardCoat) {
      changeCoatColor();
      window.debounce(function () {
        window.similarWizards.show(window.settings.SIMILAR_WIZARDS_AMOUNT);
      });
    }
    if (evt.target === window.element.setupWizardEyes) {
      changeEyesColor();
      window.debounce(function () {
        window.similarWizards.show(window.settings.SIMILAR_WIZARDS_AMOUNT);
      });
    }
    if (evt.target === window.element.setupFireballWrap
        || evt.target === window.element.setupFireballWrap.children[0]) {
      changeFireballColor();
    }
  };
  var wizardKeydownHandler = function (evt) {
    if (evt.keyCode === window.settings.KeyCode.ENTER || evt.keyCode === window.settings.KeyCode.SPACE) {
      wizardClickHandler(evt);
    }
  };
  var successHandler = function () {
    window.message.show('Успех', 'Ваш волшебник успешно добавлен в базу',
        window.message.Color.SUCCESS, window.settings.MESSAGE_SHOW_TIME);
    window.element.userDialog.classList.add('hidden');
  };
  var errorHandler = function (error) {
    window.message.show('Ошибка', error, window.message.Color.ERROR, window.settings.MESSAGE_SHOW_TIME);
  };
  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(window.element.userDialogForm), successHandler, errorHandler);
    evt.preventDefault();
  };
  window.element.userDialogForm.addEventListener('submit', formSubmitHandler);
  window.element.userDialog.addEventListener('mousedown', mouseDownHandler);
  window.element.dialogHandle.addEventListener('keydown', avatarEnterPressHandler);
  window.util.setListeners(window.element.userDialogOpen, 'add', ['click', 'keydown'],
      [popupOpenButtonClickHandler, popupOpenButtonEnterPressHandler]);
  window.util.setListeners(window.element.userDialogClose, 'add', ['click', 'keydown'],
      [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
  window.util.setListeners(window.element.userDialogSave, 'add', ['click', 'keydown'],
      [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
})();
