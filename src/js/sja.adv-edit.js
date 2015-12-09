(function ($) {
  var SJA = window.SJA;

  SJA.AdvEdit = {
    saveAdvertizer: function () {
      var that = this,
          dataToSend = {
            method: 'saveAdvertizer',
            params: {
              id: this.advertizerId,
              name: this.$advNameForm.find('input[type=text]').val()
            }
          };

      SJA.ajax(dataToSend, function (respond) {
        if (respond.result) {
          window.location = respond.editUrl;
        } else {
          that.$advNameForm.find('input[type=submit]').after('<p class="error-msg">' + respond.errorText + '</p>');
        }
      });
    },

    getAdvertizerPostbackParams: function () {
      var that = this,
          dataToSend = {
            method: 'getAdvertizerPostbackParams',
            params: {
              advertizerId: this.advertizerId
            }
          };

      SJA.ajax(dataToSend, function (respond) {
        if (respond !== null) {
          that.$advLinkGenerateForm.find('.adv-create').val(respond.orderEvent);
          that.$advLinkGenerateForm.find('.adv-accepted').val(respond.saleEvent);
          that.$advLinkGenerateForm.find('.adv-decline').val(respond.declineEvent);
          that.$advLinkGenerateForm.find('.adv-parameter').val(respond.paramTag);
          that.$advLinkGenerateForm.find('.adv-id').val(respond.orderIdTag);
          that.$advLinkGenerateForm.find('.adv-fee').val(respond.incomeTag);
          that.$advLinkGenerateForm.find('.adv-status').val(respond.eventTag);
          that.$advLinkGenerateForm.find('select.adv-currency')[0].selectize.setValue(respond.currency);
          that.$advLinkCopyForm.find('input[type=text]').val(respond.postbackUrl);
        }
      });
    },

    saveAdvertizerPostbackParams: function () {
      var that = this,
          dataToSend = {
            method: 'saveAdvertizerPostbackParams',
            params: {
              advertizerId: this.advertizerId,
              orderEvent: this.$advLinkGenerateForm.find('.adv-create').val(),
              saleEvent: this.$advLinkGenerateForm.find('.adv-accepted').val(),
              declineEvent: this.$advLinkGenerateForm.find('.adv-decline').val(),
              paramTag: this.$advLinkGenerateForm.find('.adv-parameter').val(),
              orderIdTag: this.$advLinkGenerateForm.find('.adv-id').val(),
              incomeTag: this.$advLinkGenerateForm.find('.adv-fee').val(),
              eventTag: this.$advLinkGenerateForm.find('.adv-status').val(),
              currency: this.$advLinkGenerateForm.find('select.adv-currency').val()
            }
          };

      SJA.ajax(dataToSend, function (respond) {
        if (respond.result) {
          that.$advLinkCopyForm.find('input[type=text]').val(respond.postbackUrl);
        } else {
          that.$advLinkGenerateForm.find('input[type=submit]').after('<p class="error-msg">' + respond.errorText + '</p>');
        }
      });
    },

    getAdvertizerPaymentHistory: function () {
      var that = this,
          dataToSend = {
            method: 'getAdvertizerPaymentHistory',
            params: {
              advertizerId: this.advertizerId
            }
          };

      SJA.ajax(dataToSend, function (respond) {
        var $tableBody = that.$advPaymentsTable.find('tbody'),
            $tableFooter = that.$advPaymentsTable.find('tfoot'),
            sum = 0,
            el,
            i, max;

        if (!respond.result) {
          $tableBody.empty();
          $tableFooter.empty();

          for (i = 0, max = respond.length; i < max; i += 1) {
            el = '<tr><td>' + respond[i].createdAt + '</td><td class="text-right">' + $.number(respond[i].amount, 2, ',', ' ') + '</td><td>' + respond[i].comment + '</td></tr>';
            $tableBody.append(el);

            sum += parseInt(respond[i].amount);
          }

          $tableFooter.append('<tr><td></td><td class="text-right">' + $.number(sum, 2, ',', ' ') + '</td><td></td></tr>');

          that.$advPaymentsTable.trigger('update');
        }
      });
    },

    addAdvertizerPayment: function () {
      var that = this,
          dataToSend = {
            method: 'addAdvertizerPayment',
            params: {
              advertizerId: this.advertizerId,
              amount: this.$advPaymentsForm.find('.adv-amount').val(),
              comment: this.$advPaymentsForm.find('.adv-comment').val()
            }
          };

      SJA.ajax(dataToSend, function (respond) {
        if (respond.result) {
          that.getAdvertizerPaymentHistory();
          that.getAdvertizer();
        } else {
          that.$advPaymentsForm.find('input[type=submit]').after('<p class="error-msg">' + respond.errorText + '</p>');
        }
      });
    },

    getAdvertizer: function () {
      var that = this,
          dataToSend = {
            method: 'getAdvertizer',
            params: {
              advertizerId: this.advertizerId
            }
          };

      SJA.ajax(dataToSend, function (respond) {
        var $breadcrumb = $('.breadcrumb');

        if (respond !== null) {
          if (respond.name) {
            if (!$breadcrumb.find('li:last').hasClass('active')) {
              $breadcrumb.append('<li class="active">' + respond.name + '</li>');
            }

            that.$advNameForm.find('input[type=text]').val(respond.name);
            $('.adv-balance span').html((respond.balance ? $.number(respond.balance, 2, ',', ' ') : 0) + ' р.');
          } else {
            $('.breadcrumb').append('<li class="active">Новый</li>');
            $('.adv-postback-wrap').hide();
            $('.adv-payments-wrap').hide();
            $('.adv-balance').hide();
          }
        }
      });
    },

    init: function () {
      var that = this;

      ZeroClipboard.config({swfPath: 'swf/ZeroClipboard.swf'});

      this.$advNameForm = $('.adv-name-form');
      this.$advLinkGenerateForm = $('.adv-link-generate-form');
      this.$advLinkCopyForm = $('.adv-link-copy-form');
      this.$advPaymentsForm = $('.adv-payments-form');
      this.$advPaymentsTable = $('.adv-payments-table');
      this.$collapseLink = $('[data-toggle=collapse]');
      this.$filterCollapse = $('#filterCollapse');
      this.copyBtn = new ZeroClipboard($('.copy-link'));

      this.advertizerId = window.advertizerId || 0;

      this.$advNameForm.on('submit', function (e) {
        e.preventDefault();
        that.saveAdvertizer.apply(that);
      });

      this.$advLinkGenerateForm.on('submit', function (e) {
        e.preventDefault();
        that.saveAdvertizerPostbackParams.apply(that);
      });

      this.$advPaymentsForm.on('submit', function (e) {
        e.preventDefault();
        that.addAdvertizerPayment.apply(that);
      });

      this.$filterCollapse.on('shown.bs.collapse', function () {
        that.$collapseLink.html('Свернуть');
      }).on('hidden.bs.collapse', function () {
        that.$collapseLink.html('Развернуть');
      });

      this.getAdvertizer();
      this.getAdvertizerPostbackParams();
      this.getAdvertizerPaymentHistory();
    }
  };

  if ($('#adv-edit').length) SJA.AdvEdit.init();
}(jQuery));