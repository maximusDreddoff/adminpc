(function ($) {
  var SJA = window.SJA;

  SJA.Product = {
    setProductEnabled: function (e) {
      var $checkbox = $(this),
          dataToSend = {
            method: 'setProductEnabled',
            params: {
              productId: $checkbox.closest('tr').data('product-id'),
              enabled: $checkbox.prop('checked') ? true : false
            }
          };

      SJA.ajax(dataToSend, function (respond)  {
        if (!respond.result) {
          $checkbox.prop('checked', ($checkbox.prop('checked') ? false : true));
        }
      });
    },

    deleteProduct: function (e) {
      e.preventDefault();

      var $product = $(this).closest('tr'),
          dataToSend = {
            method: 'deleteProduct',
            params: {
              productId: $product.data('product-id')
            }
          };

      SJA.ajax(dataToSend, function (respond)  {
        if (respond.result) {
          $product.remove();
        }
      });
    },

    getProductStat: function () {
      var productNameVal = $('select.product-filter-product-name').val(),
        advertizerTypeVal = $('select.product-filter-advertizer-type').val(),
        enabled = $('.product-filter-enabled').val(),
        snId = $('select.product-soc-network').val(),
        archived = (enabled === 'arch');

      if (enabled === '0' || archived) {
        enabled = null;
      } else if (!archived) {
        enabled = enabled === 'true';
      }

      var that = this,
          dataToSend = {
            method: 'getProductStat',
            params: {
              filter: {
                snId: snId !== '0' ? snId : null,
                productId: (productNameVal !== '0' && !that.initialSubmit) ? productNameVal : null,
                enabled: enabled,
                archive: archived,
                advertizerType: advertizerTypeVal !== '0' ? advertizerTypeVal : null,
                dateMin: $('.product-date-min').val(),
                dateMax: $('.product-date-max').val()
              }
            }
          };

      SJA.ajax(dataToSend, function (respond) {
        var $tbody = that.$tableProductStat.find('tbody'),
            $tfoot = that.$tableProductStat.find('tfoot'),
            row,
            total,
            i, max,
            totalsProductsLastNumber,
            totalProductsTitle,
            blockProductEnable = that.roleId === 5 || that.roleId === 6;

        if (respond.result !== false) {
          total = respond.total;

          $tbody.empty();
          $tfoot.empty();

          for (i = 0, max = respond.rows.length; i < max; i += 1) {
            row = respond.rows[i];

            $tbody.append([
              '<tr data-product-id="' + row.id + '">',
                '<td>' + row.id + '</td>',
                '<td class="line-break">',
                  '<div class="dropdown">',
                    '<a href="#" data-toggle="dropdown" role="button">' + row.name + ' <span class="caret"></span></a>',
                    '<ul class="dropdown-menu" role="menu">',
                      '<li class="view-mode5-hidden"><a href="' + row.adListUrl + '">Смотреть посты</a></li>',
                      '<li class="view-mode6-hidden"><a href="' + row.editUrl + '">Редактировать</a></li>',
                      '<li class="view-mode5-hidden view-mode6-hidden"><a href="#" class="link-delete-product">Удалить</a></li>',
                    '</ul>',
                  '</div>',
                '</td>',
                '<td>',
                  '<div class="checkbox toggle toggle-sm">',
                    '<label>',
                      '<input type="checkbox" class="product-enabled"' + (row.enabled ? 'checked' : '') + (blockProductEnable ? ' disabled' : ' ') + '>',
                      '<span class="checkbox-input"></span>',
                    '</label>',
                  '</div>',
                '</td>',
                '<td><span class="country text-success">' + row.enabledAdCount + '</span> / <span class="country text-danger">' + row.disabledAdCount + '</span></td>',
                '<td>',
                  '<a href="' + row.publicationStatUrl + '">' + row.publicationCount + '</a>',
                '</td>',
                '<td class="text-right">' + $.number(row.clickCount, 0, ',', ' ') + ' / ' + $.number(row.clickUniqCount, 0, ',', ' ') + '</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + row.orderCount + '</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + row.saleCount + '</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + row.declineCount + '</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + row.waitCount + '</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(row.orderIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(row.income, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(row.declineIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(row.waitIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + (row.saleRatio !== null ? $.number(row.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(row.totalCpc, 2, ',', ' ') + ' р. / ' + $.number(row.cpc, 2, ',', ' ') + ' р.</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + (row.viewCount !== null ? $.number(row.viewCount, 0, ',', ' ') : '-') + '</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + (row.cpm !== null ? $.number(row.cpm, 2, ',', ' ') + ' р.' : '-') + '</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden">' + (row.ctr !== null ? $.number(row.ctr, 2, ',', ' ') : '-') + '</td>',
                '<td class="text-right">' + $.number(row.totalChannelUserCount, 0, ',', ' ') + ' / ' + $.number(row.channelUserCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + (row.totalEpks !== null ? $.number(row.totalEpks, 2, ',', ' ') + ' р.' : '-') + ' / ' + (row.epks !== null ? $.number(row.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
                '<td class="view-mode5-hidden view-mode6-hidden">',
                  '<button class="btn js-add-to-archive-button" data-value="' + (!row.archive).toString() + '">' + ( (row.archive) ? '<span class="icon icon-from-archive"></span>' : '<span class="icon icon-to-archive"></span>' ) + '</button>',
                '</td>',
              '</tr>'
            ].join(''));

            that.$productFilterNameSelect[0].selectize.addOption({
              value: row.id,
              text: row.name
            });
          }

          if (that.initialSubmit) {
            that.$productFilterNameSelect[0].selectize.addOption({
              value: 0,
              text: 'Все продукты'
            });
            that.$productFilterNameSelect[0].selectize.setValue(0);

            that.initialSubmit = false;
          }

          totalsProductsLastNumber = total.productCount % 10;

          if (totalsProductsLastNumber === 0 || (totalsProductsLastNumber >= 5 && totalsProductsLastNumber <=9)) {
            totalProductsTitle = ' пролуктов';
          } else if (totalsProductsLastNumber === 1) {
            totalProductsTitle = ' продукт';
          } else if (totalsProductsLastNumber >= 2 && totalsProductsLastNumber <= 4) {
            totalProductsTitle = ' продукта';
          }

          $tfoot.append([
            '<tr>',
              '<td></td>',
              '<td>' + (total.productCount + totalProductsTitle) + '</td>',
              '<td></td>',
              '<td></td>',
              '<td>' + total.publicationCount + '</td>',
              '<td class="text-right">' + $.number(total.clickCount, 0, ',', ' ') + ' / ' + $.number(total.clickUniqCount, 0, ',', ' ') + '</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + total.orderCount + '</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + total.saleCount + '</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + total.declineCount + '</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + total.waitCount + '</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(total.orderIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(total.income, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(total.declineIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(total.waitIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + (total.saleRatio !== null ? $.number(total.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + $.number(total.totalCpc, 2, ',', ' ') + ' р. / ' + $.number(total.cpc, 2, ',', ' ') + ' р.</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + (total.viewCount !== null ? $.number(total.viewCount, 0, ',', ' ') : '-') + '</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + (total.cpm !== null ? $.number(total.cpm, 2, ',', ' ') + ' р.' : '-') + '</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden">' + (total.ctr !== null ? $.number(total.ctr, 2, ',', ' ') : '-') + '</td>',
              '<td class="text-right">' + $.number(total.totalChannelUserCount, 0, ',', ' ') + ' / ' + $.number(total.channelUserCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + (total.totalEpks !== null ? $.number(total.totalEpks, 2, ',', ' ') + ' р.' : '-') + ' / ' + (total.epks !== null ? $.number(total.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
              '<td class="view-mode5-hidden view-mode6-hidden"></td>',
            '</tr>'
          ].join(''));

          $tbody.find('.checkbox input').each(SJA.Common.setCheckboxValue);

          that.$tableProductStat.trigger('update');
        }
      });
    },

    setProductArchiveStatus: function (e) {
      var that = e.data.that,
        $this = $(this),
        dataToSend = {
          method: 'setProductArchiveStatus',
          params: {
            productId: $this.closest('tr').data('product-id'),
            archive: $this.data('value')
          }
        };

      SJA.ajax(dataToSend, function(respond) {
        if (respond.result) {
          that.getProductStat();
        }
      });
    },

    init: function () {
      var that = this;

      this.roleId = window.roleId;
      this.initialSubmit = true;

      this.$productFilterForm = $('.product-filter-form');
      this.$productFilterNameSelect = this.$productFilterForm.find('select.product-filter-product-name');
      this.$tableProductStat = $('.table-product-stat');

      SJA.Common.initTableSorter(this.$tableProductStat);

      this.$productFilterForm.on('submit', function (e) {
        e.preventDefault();

        that.getProductStat.apply(that);
      });

      this.$tableProductStat.on('click', 'input[type=checkbox]', {that: this}, this.setProductEnabled)
        .on('click', '.link-delete-product', this.deleteProduct);

      this.$tableProductStat.on('click', '.js-add-to-archive-button', {that: this}, this.setProductArchiveStatus);

      this.getProductStat();
    }
  };

  if ($('#product').length) SJA.Product.init();
}(jQuery));