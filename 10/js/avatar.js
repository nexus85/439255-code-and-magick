'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.element.dialogAvatarInput.addEventListener('change', function () {
    var file = window.element.dialogAvatarInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.element.dialogHandle.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
