var SJA = {
  dataBinding: function($el) {
    var model = {};

    $el.find('[data-bind]').each(function(k, v) {
      var $el = $(v);
      SJA.bindElement(model, $el);
    });

    return model;
  },

  bindElement: function(model, $el) {
    var field = $el.data('bind');

    var bidingThisField = Object.getOwnPropertyDescriptor(model, field);

    if (bidingThisField) {
      Object.defineProperty(model, field, {
        set: function(val) {
          bidingThisField.set(val);
          if ($el.is('input') || $el.is('select') || $el.is('textarea')) {
            $el.val(val);
          } else {

            if ($el.is('a')) {
              $el.attr('href', "mailto:"+val);
            }
            $el.html(val);
          }
        }
      });
    } else {
      Object.defineProperty(model, field, {
        get: function() {
          if ($el.is('input') || $el.is('select') || $el.is('textarea')) {
            return $el.val();
          }
          return $el.html();
        },
        set: function(val) {
          if ($el.is('input') || $el.is('select') || $el.is('textarea')) {
            $el.val(val).trigger('change');
          } else {
            if ($el.is('a')) {
              $el.attr('href', "mailto:"+val);
            }
            $el.html(val);
          }
        },
        enumerable: true,
        configurable: true
      });
    }
  },

  generatePassword: function(length) {
    var symbolList = 'abcdefghijklmnopqrstuvwxyz1234567890-=\|/"<>,.`~!@#$%^&*()_+';
    var password = '';

    for (var i = 0; i < length; i++) {
      password += symbolList.charAt(Math.floor(Math.random() * symbolList.length));
    }

    return password;
  }
};

window.SJA = SJA;