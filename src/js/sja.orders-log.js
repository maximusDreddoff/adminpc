(function ($) {
  'use strict';

  var SJA = window.SJA;

  SJA.OrdersLog = {
    updateSelect: function (select, data) {
      var i, max, val;

      if (!select) {
        return;
      }

      select.selectize.clearOptions();
      for (i = 0, max = data.length; i < max; i += 1) {
        select.selectize.addOption({
          value: data[i].id,
          text: data[i].name
        });
      }

      select.selectize.setValue('0');
    },

    getProductNames: function () {
      var that = this,
        dataToSend = {
          method: 'getProductNames',
          params: {
            enabled: null
          }
        };

      SJA.ajax(dataToSend, function (respond) {
        if (respond && respond instanceof Array) {
          $.each(respond, function (k, v) {
            respond[k] = {
              id: v.id,
              name: '(' + v.id + ') ' + v.name
            };
          });

          that.productNames = respond;
          that.productNames.push({ id: '0', name: 'Все' });

          if (that.$ordersLogFilterForm.find('select.orders-log-filter-product-name').length) {
            that.updateSelect.apply(that, [that.$ordersLogFilterForm.find('select.orders-log-filter-product-name')[0], that.productNames]);
          }
        }
      });
    },

    getWmNames: function () {
      var that = this,
        dataToSend = {
          method: 'getWmNames'
        };

      SJA.ajax(dataToSend, function (respond) {
        if (respond && respond instanceof Array) {
          $.each(respond, function (k, v) {
            respond[k] = {
              id: v.id,
              name: '(' + v.id + ') ' + v.name
            };
          });

          that.wmNames = respond;
          that.wmNames.push({ id: '0', name: 'Все' });

          if (that.$ordersLogFilterForm.find('select.orders-log-filter-wm-id').length) {
            that.updateSelect.apply(that, [that.$ordersLogFilterForm.find('select.orders-log-filter-wm-id')[0], that.wmNames]);
          }
        }
      });
    },

    getAdvertizerNames: function () {
      var that = this,
        dataToSend = {
          method: 'getAdvertizerNames',
          params: {
            enabled: null
          }
        };

      SJA.ajax(dataToSend, function (respond) {
        if (respond && respond instanceof Array) {
          $.each(respond, function (k, v) {
            respond[k] = {
              id: v.id,
              name: '(' + v.id + ') ' + v.name
            };
          });

          that.advertizerNames = respond;
          that.advertizerNames.push({id: 0, name: 'Все'});

          if (that.$ordersLogFilterForm.find('select.orders-log-filter-advertizer-id').length) {
            that.updateSelect.apply(that, [that.$ordersLogFilterForm.find('select.orders-log-filter-advertizer-id')[0], that.advertizerNames]);
          }
        }
      });
    },

    getOrderList: function(e) {
      var that = e ? e.data.that : this,
        productId = that.$ordersLogFilterForm.find('select.orders-log-filter-product-name').val() === '0' ? null : that.$ordersLogFilterForm.find('select.orders-log-filter-product-name').val(),
        wmId = that.$ordersLogFilterForm.find('select.orders-log-filter-wm-id').val() === '0' ? null : that.$ordersLogFilterForm.find('select.orders-log-filter-wm-id').val(),
        advertizerId = that.$ordersLogFilterForm.find('select.orders-log-filter-advertizer-id').val() === '0' ? null : that.$ordersLogFilterForm.find('select.orders-log-filter-advertizer-id').val(),
        status = that.$ordersLogFilterForm.find('select.orders-log-filter-status').val() === '0' ? null : that.$ordersLogFilterForm.find('select.orders-log-filter-status').val(),
        dataToSend = {
          method: 'getOrderList',
          params: {
            filter: {
              productId: productId,
              wmId: wmId,
              advertizerId: advertizerId,
              status: status,
              dateMin: that.$ordersLogFilterForm.find('.order-log-filter-date-min').val(),
              dateMax: that.$ordersLogFilterForm.find('.order-log-filter-date-max').val()
            }
          }
        };

      if (e) {
        e.preventDefault();
      }

      SJA.ajax(dataToSend, function(respond) {
        var $tbody = that.$tableOrdersLogStat.find('tbody'),
          $tfoot = that.$tableOrdersLogStat.find('tfoot'),
          sum,
          row,
          i, max;

        $tbody.empty();
        $tfoot.empty();

        if (respond && respond.length) {
          sum = 0;

          for (i = 0, max = respond.length; i < max; i += 1) {
            row = respond[i];

            $tbody.append([
              '<tr>',
                '<td>' + row.createdAt + '</td>',
                '<td>' + row.updatedAt + '</td>',
                '<td>' + row.advertizerId + '</td>',
                '<td>' + row.wmName  + '</td>',
                '<td>' + row.productName  + '</td>',
                '<td>' + row.extOrderId  + '</td>',
                '<td>' + row.id  + '</td>',
                '<td>' + row.paramId + '</td>',
                '<td class="status"></td>',
                '<td>' + row.country + '</td>',
                '<td class="text-right view-mode2-hidden view-mode5-hidden view-mode6-hidden view-mode21-hidden">' + $.number(row.income, 0, ',', ' ') + ' р.</td>',
              '</tr>'
            ].join(''));

            switch (parseInt(row.status)) {
              case 3:
                $tbody.find('.status:last').text('Обработка');
                break;
              case 2:
                $tbody.find('.status:last').addClass('text-success').text('Принят');
                break;
              case 4:
                $tbody.find('.status:last').addClass('text-danger').text('Отклонен');
                break;
            }

            sum += parseFloat(row.income);
          }

          $tfoot.append('<tr><td class="text-right" colspan="11">' + $.number(sum, 0, ',', ' ') + ' р.</td></tr>');

          that.$tableOrdersLogStat.trigger('update');
        }
      });
    },

    init: function() {
      this.$ordersLogFilterForm = $('.orders-log-form');
      this.$tableOrdersLogStat = $('.table-orders-log-stat');

      this.getProductNames();
      this.getWmNames();
      this.getAdvertizerNames();

      SJA.Common.initTableSorter(this.$tableOrdersLogStat);

      this.$ordersLogFilterForm.on('submit', {that: this}, this.getOrderList);
    }
  };

  if ($('#orders-log').length) SJA.OrdersLog.init();

}(jQuery));