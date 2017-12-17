'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var setupWizard = document.querySelector('.setup-wizard');
  window.elements = {
    userDialog: userDialog,
    similarList: userDialog.querySelector('.setup-similar-list'),
    similarWizardTemplate: document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'),
    userDialogOpen: document.querySelector('.setup-open'),
    userDialogClose: userDialog.querySelector('.setup-close'),
    userDialogSave: userDialog.querySelector('.setup-submit'),
    userNameInput: userDialog.querySelector('.setup-user-name'),
    setupWizard: setupWizard,
    setupWizardCoat: setupWizard.querySelector('.wizard-coat'),
    setupWizardEyes: setupWizard.querySelector('.wizard-eyes'),
    setupFireballWrap: document.querySelector('.setup-fireball-wrap'),
    wizardCoatInput: document.querySelector('input[name="coat-color"]'),
    wizardEyesInput: document.querySelector('input[name="eyes-color"]'),
    setupFireballInput: document.querySelector('input[name="fireball-color"]'),
    dialogHandle: userDialog.querySelector('.setup-user-pic'),
    dialogAvatarInput: userDialog.querySelector('[name = "avatar"]'),
    shopElement: userDialog.querySelector('.setup-artifacts-shop'),
    artifactsElement: userDialog.querySelector('.setup-artifacts')
  };
})();
