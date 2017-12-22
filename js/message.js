'use strict';

(function () {
  var Color = {
    SUCCESS: '#1cb34d',
    ERROR: '#ee4830'
  };
  var Position = {
    PARENT: window.element.userDialog.parentElement,
    NEXT_SIBLING: window.element.userDialog
  };
  var createMessage = function (title, text, bgColor) {
    var message = document.createElement('div');
    var messageTitle = document.createElement('h2');
    var messageText = document.createElement('p');

    message.appendChild(messageTitle);
    message.appendChild(messageText);
    messageTitle.textContent = title;
    messageText.textContent = text;

    message.classList.add('message');
    message.style.backgroundColor = bgColor;

    return message;
  };
  var showMessage = function (title, text, color, time) {
    var message = createMessage(title, text, color);
    Position.PARENT.insertBefore(message, Position.NEXT_SIBLING);
    setTimeout(function () {
      Position.PARENT.removeChild(message);
    }, time);
  };
  window.message = {
    Color: Color,
    show: showMessage
  };
})();
