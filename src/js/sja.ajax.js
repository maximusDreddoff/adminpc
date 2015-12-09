(function ($) {
  var SJA = window.SJA;

  SJA.ajax = function (data, successCallback, beforeSend, errorCallback) {
    var options = {
      data: JSON.stringify(data),
      success: successCallback
    };

    if (beforeSend) {
      options.beforeSend = beforeSend;
    }

    if (errorCallback === true) {
      options.errorCallback = function() {
        alert('������ �������. ���������� �����.');
      };
    }

    $.ajax($.extend(SJA.Config.ajax, options));
  };

}(jQuery));