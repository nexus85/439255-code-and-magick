'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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
var getRandomWizards = function(amount) {
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
  data.forEach(function(item) {
    fragment.appendChild(renderMethod(item));
  });
  return fragment;
};

userDialog.classList.remove('hidden');
var wizards = getRandomWizards(4);
var fragment = getFragment(wizards, renderWizard);
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
