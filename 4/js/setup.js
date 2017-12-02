'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var setupWizard = {
  coatColor: COAT_COLORS[0],
  eyesColor: EYES_COLORS[0],
  fireballColor: FIREBALL_COLORS[0]
};
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SPACE_KEYCODE = 32;
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogSave = userDialog.querySelector('.setup-submit');
var userNameInput = userDialog.querySelector('.setup-user-name');
var setupWizardElement = document.querySelector('.setup-wizard');
var setupWizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
var setupWizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
var setupFireballWrapElement = document.querySelector('.setup-fireball-wrap');

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomName = function () {
  var name = [];
  name[Math.round(Math.random())] = getRandomElement(WIZARD_NAMES);
  var i = name[0] ? 1 : 0;
  name[i] = getRandomElement(WIZARD_SURNAMES);
  return name.join(' ');
};

var RandomWizard = function () {
  this.name = getRandomName();
  this.coatColor = getRandomElement(COAT_COLORS);
  this.eyesColor = getRandomElement(EYES_COLORS);
};

var getRandomWizards = function (amount) {
  var wizards = [];
  while (amount-- > 0) {
    wizards.push(new RandomWizard());
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var getFragment = function (data, renderMethod) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    fragment.appendChild(renderMethod(item));
  });
  return fragment;
};

var changeColor = function (property, source) {
  var index = source.findIndex(function (value) {
    return value === setupWizard[property];
  });
  index = (index < source.length - 1) ? index + 1 : 0;
  setupWizard[property] = source[index];
};

var changeCoatColor = function () {
  changeColor('coatColor', COAT_COLORS);
  var wizardCoatInputElement = document.querySelector('input[name="coat-color"]');
  wizardCoatInputElement.value = setupWizard.coatColor;
  setupWizardCoatElement.setAttribute('style', 'fill: ' + setupWizard.coatColor);
};

var changeEyesColor = function () {
  changeColor('eyesColor', EYES_COLORS);
  var wizardEyesInputElement = document.querySelector('input[name="eyes-color"]');
  wizardEyesInputElement.value = setupWizard.eyesColor;
  setupWizardEyesElement.setAttribute('style', 'fill: ' + setupWizard.eyesColor);
};

var changeFireballColor = function () {
  changeColor('fireballColor', FIREBALL_COLORS);
  var setupFireballInputElement = document.querySelector('input[name="fireball-color"]');
  setupFireballInputElement.value = setupWizard.fireballColor;
  setupFireballWrapElement.setAttribute('style', 'background-color: ' + setupWizard.fireballColor);
};

var setListeners = function (element, action, events, handlers) {
  if (action === 'add') {
    events.forEach(function (event, index) {
      element.addEventListener(event, handlers[index]);
    });
  }
  if (action === 'remove') {
    events.forEach(function (event, index) {
      element.removeEventListener(event, handlers[index]);
    });
  }
};

var getClickHandler = function (method) {
  return function () {
    method();
  };
};

var getKeydownHandler = function (keyCode, method) {
  return function (evt) {
    if (evt.keyCode === keyCode) {
      method();
    }
  };
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
  setListeners(userNameInput, 'add', ['invalid', 'input'], [inputInvalidHandler, inputInputHandler]);
  setListeners(setupWizardCoatElement, 'add', ['click', 'keydown', 'keydown'], [wizardCoatClickHandler, wizardCoatEnterPressHandler, wizardCoatSpacePressHandler]);
  setListeners(setupWizardEyesElement, 'add', ['click', 'keydown', 'keydown'], [wizardEyesClickHandler, wizardEyesEnterPressHandler, wizardEyesSpacePressHandler]);
  setListeners(setupFireballWrapElement, 'add', ['click', 'keydown', 'keydown'], [setupFireballClickHandler, setupFireballEnterPressHandler, setupFireballSpacePressHandler]);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
  setListeners(userNameInput, 'remove', ['invalid', 'input'], [inputInvalidHandler, inputInputHandler]);
  setListeners(setupWizardCoatElement, 'remove', ['click', 'keydown', 'keydown'], [wizardCoatClickHandler, wizardCoatEnterPressHandler, wizardCoatSpacePressHandler]);
  setListeners(setupWizardEyesElement, 'remove', ['click', 'keydown', 'keydown'], [wizardEyesClickHandler, wizardEyesEnterPressHandler, wizardEyesSpacePressHandler]);
  setListeners(setupFireballWrapElement, 'remove', ['click', 'keydown', 'keydown'], [setupFireballClickHandler, setupFireballEnterPressHandler, setupFireballSpacePressHandler]);
};

var popupOpenButtonClickHandler = getClickHandler(openPopup);
var popupOpenButtonEnterPressHandler = getKeydownHandler(ENTER_KEYCODE, openPopup);
var popupCloseButtonClickHandler = getClickHandler(closePopup);
var popupCloseButtonEnterPressHandler = getKeydownHandler(ENTER_KEYCODE, closePopup);
var popupEscPressHandler = getKeydownHandler(ESC_KEYCODE, closePopup);
var inputInvalidHandler = function (evt) {
  setListeners(userDialogSave, 'remove', ['click', 'keydown'], [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
  if (evt.target.validity.tooShort) {
    evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (evt.target.validity.tooLong) {
    evt.target.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Обязательное поле');
  } else {
    evt.target.setCustomValidity('');
    setListeners(userDialogSave, 'add', ['click', 'keydown'], [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
  }
};
var inputInputHandler = function (evt) {
  var target = evt.target;
  setListeners(userDialogSave, 'remove', ['click', 'keydown'], [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
    setListeners(userDialogSave, 'add', ['click', 'keydown'], [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
  }
};
var wizardCoatClickHandler = getClickHandler(changeCoatColor);
var wizardCoatEnterPressHandler = getKeydownHandler(ENTER_KEYCODE, changeCoatColor);
var wizardCoatSpacePressHandler = getKeydownHandler(SPACE_KEYCODE, changeCoatColor);
var wizardEyesClickHandler = getClickHandler(changeEyesColor);
var wizardEyesEnterPressHandler = getKeydownHandler(ENTER_KEYCODE, changeEyesColor);
var wizardEyesSpacePressHandler = getKeydownHandler(SPACE_KEYCODE, changeEyesColor);
var setupFireballClickHandler = getClickHandler(changeFireballColor);
var setupFireballEnterPressHandler = getKeydownHandler(ENTER_KEYCODE, changeFireballColor);
var setupFireballSpacePressHandler = getKeydownHandler(SPACE_KEYCODE, changeFireballColor);

var wizards = getRandomWizards(4);
var fragment = getFragment(wizards, renderWizard);
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');

setListeners(userDialogOpen, 'add', ['click', 'keydown'], [popupOpenButtonClickHandler, popupOpenButtonEnterPressHandler]);
setListeners(userDialogClose, 'add', ['click', 'keydown'], [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
setListeners(userDialogSave, 'add', ['click', 'keydown'], [popupCloseButtonClickHandler, popupCloseButtonEnterPressHandler]);
