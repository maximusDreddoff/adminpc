(function ($) {
  var SJA = window.SJA;

  SJA.Stat = {

    templates: {
      filterForms: {
        popupStat: [
          '<div class="stat-filter-form-wrap-inner" data-type="wm">',
          '<div class="row">',
          '<div class="col-xs-12">',
          '<input class="stat-type" type="hidden" value="">',
          '<div class="form-group">',
          '<label for="popupStatFilter">Продукт</label>',
          '<select class="form-control stat-products" id="popupStatFilter">',
          '<option value="null">Все</option>',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label>Период с</label>',
          '<input type="text" class="form-control date-from stat-date-min"/>',
          '<label>по</label>',
          '<input type="text" class="form-control date-to stat-date-max"/>',
          '</div>',
          '<div class="form-group">',
          '<input type="submit" class="btn btn-primary" value="Показать"/>',
          '</div>',
          '</div>',
          '</div>',
          '</div>'
        ].join(''),

        stat: [
          '<div class="stat-filter-form-wrap-inner" data-type="stat">',
          '<div class="row">',
          '<div class="col-xs-12">',
          '<div class="form-group">',
          '<label for="stat-products">Продукты</label>',
          '<select class="form-control stat-products" id="stat-products">',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-advertizer-id">Партнерская сеть</label>',
          '<select class="form-control stat-advertizer-id" id="stat-advertizer-id">',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-country">Страна</label>',
          '<select class="form-control stat-country hide-input" id="stat-country">',
          '<option value="null" selected>Все</option>',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-device">Устройство</label>',
          '<select class="form-control stat-device hide-input" id="stat-device">',
          '<option value="0">Все</option>',
          '<option value="1">Телефон</option>',
          '<option value="2">Компьютер</option>',
          '</select>',
          '</div>',
          '<div class="form-group">',
            '<label for="stat-soc-network">Соц. сеть</label>',
            '<select class="form-control stat-soc-network hide-input" id="stat-soc-network">',
              '<option value="0">Все</option>',
              '<option value="1">Одноклассники</option>',
              '<option value="2">Вконтакте</option>',
            '</select>',
          '</div>',
          '</div>',
          '</div>',
          '<div class="row">',
          '<div class="col-xs-12">',
          '<div class="form-group">',
          '<label for="stat-wmid">Вебмастер</label>',
          '<select class="form-control stat-wmid" id="stat-wmid">',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-group">Группа</label>',
          '<select class="form-control stat-group" id="stat-group">',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-advertizer-type">Тип рекламодателя</label>',
          '<select class="form-control stat-advertizer-type hide-input" id="stat-advertizer-type">',
          '<option value="0">Все</option>',
          '<option value="1">Внешние рекламодатели</option>',
          '<option value="2">Пользователи рекламного сервера</option>',
          '</select>',
          '</div>',
          '</div>',
          '</div>',
          '<div class="row">',
          '<div class="col-xs-12">',
          '<div class="form-group">',
          '<label for="stat-grouping">Группировка</label>',
          '<select class="form-control stat-grouping hide-input" id="stat-grouping">',
          '<option value="date">По дате</option>',
          '<option value="dateHour">По дате и часу</option>',
          '<option value="productId">По продукту</option>',
          '<option value="advertizerId">По рекламодателю</option>',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label>Период с</label>',
          '<input type="text" class="form-control date-from stat-date-min"/>',
          '<label>по</label>',
          '<input type="text" class="form-control date-to stat-date-max"/>',
          '</div>',
          '<div class="form-group">',
          '<input type="submit" class="btn btn-primary" value="Показать"/>',
          '</div>',
          '</div>',
          '</div>',
          '</div>'
        ].join(''),

        wm: [
          '<div class="stat-filter-form-wrap-inner" data-type="wm">',
          '<div class="row">',
          '<div class="col-xs-12">',
          '<div class="form-group">',
          '<label>Период с</label>',
          '<input type="text" class="form-control date-from stat-date-min"/>',
          '<label>по</label>',
          '<input type="text" class="form-control date-to stat-date-max"/>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-soc-network">Соц. сеть</label>',
          '<select class="form-control stat-soc-network hide-input" id="stat-soc-network">',
          '<option value="0">Все</option>',
          '<option value="1">Одноклассники</option>',
          '<option value="2">Вконтакте</option>',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<input type="submit" class="btn btn-primary" value="Показать"/>',
          '</div>',
          '</div>',
          '</div>',
          '</div>'
        ].join(''),

        publication: [
          '<div class="stat-filter-form-wrap-inner" data-type="publication">',
          '<div class="row">',
          '<div class="col-xs-12">',
          '<div class="form-group">',
          '<label for="stat-ad-id">ID</label>',
          '<input type="text" class="form-control stat-ad-id" id="stat-ad-id"/>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-wmid">Вебмастер</label>',
          '<select class="form-control stat-wmid" id="stat-wmid">',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-group">Группа</label>',
          '<select class="form-control stat-group" id="stat-group">',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-products">Продукты</label>',
          '<select class="form-control stat-products" id="stat-products">',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label for="stat-advertizer-type">Тип рекламодателя</label>',
          '<select class="form-control stat-advertizer-type hide-input" id="stat-advertizer-type">',
          '<option value="0">Все</option>',
          '<option value="1">Внешние рекламодатели</option>',
          '<option value="2">Пользователи рекламного сервера</option>',
          '</select>',
          '</div>',
          '</div>',
          '</div>',
          '<div class="row">',
          '<div class="col-xs-12">',
          '<div class="form-group">',
          '<label for="stat-soc-network">Соц. сеть</label>',
          '<select class="form-control stat-soc-network hide-input" id="stat-soc-network">',
          '<option value="0">Все</option>',
          '<option value="1">Одноклассники</option>',
          '<option value="2">Вконтакте</option>',
          '</select>',
          '</div>',
          '<div class="form-group">',
          '<label>Период с</label>',
          '<input type="text" class="form-control date-from stat-date-min"/>',
          '<label>по</label>',
          '<input type="text" class="form-control date-to stat-date-max"/>',
          '</div>',
          '<div class="form-group">',
          '<input type="submit" class="btn btn-primary" value="Показать"/>',
          '</div>',
          '</div>',
          '</div>',
          '</div>'
        ].join('')
      },

      tableHeaders: {
        stat: [
          '<table class="table table-sort table-list" data-type="stat">',
          '<thead>',
          '<tr>',
          '<th>Дата</th>',
          '<th class="namecol" style="display:none;">Название</th>',
          '<th>Разм.</th>',
          '<th data-sort-type="format">Клики/уник</th>',
          '<th><span class="icon icon-phone"></span></th>',
          '<th><span class="icon icon-ok"></span></th>',
          '<th><span class="icon icon-decline"></span></th>',
          '<th><span class="icon icon-time"></span></th>',
          '<th class="view-mode1-visible-table-cell view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">XY</th>',
          '<th data-sort-type="format">Σ заказы</th>',
          '<th data-sort-type="format">Σ принято</th>',
          '<th data-sort-type="format">Σ откл.</th>',
          '<th data-sort-type="format">Σ ожид.</th>',
          '<th class="view-mode4-hidden view-mode5-hidden view-mode6-hidden view-mode21-hidden" data-sort-type="format">Σ СП</th>',
          '<th class="view-mode5-hidden view-mode6-hidden view-mode21-hidden" data-sort-type="format">Σ РС</th>',
          '<th class="view-mode1-visible-table-cell view-mode3-visible-table-cell view-mode2-hidden view-mode4-hidden view-mode5-hidden view-mode6-hidden view-mode21-hidden">Σ XY</th>',
          '<th data-sort-type="format">Конв.</th>',
          '<th data-sort-type="format">CPC</th>',
          '<th data-sort-type="format">Охват</th>',
          '<th data-sort-type="format">CPM</th>',
          '<th data-sort-type="format">CTR</th>',
          '<th data-sort-type="format">Подпис.</th>',
          '<th data-sort-type="format">EPKS</th>',
          '</tr>',
          '</thead>',
          '<tbody></tbody>',
          '<tfoot></tfoot>',
          '</table>'
        ].join(''),

        popupStat: [
          '<table class="table table-sort table-list" data-type="wm">',
          '<thead>',
          '<tr>',
          '<th>Рекламодатель</th>',
          '<th data-sort-type="format">Разм.</th>',
          '<th data-sort-type="format">Клики/уник</th>',
          '<th><span class="icon icon-phone"></span></th>',
          '<th><span class="icon icon-time"></span></th>',
          '<th><span class="icon icon-ok"></span></th>',
          '<th data-sort-type="format">Σ заказы</th>',
          '<th data-sort-type="format">Σ ожид.</th>',
          '<th data-sort-type="format">Σ принято</th>',
          '<th data-sort-type="format">Конв.</th>',
          '<th data-sort-type="format">CPC</th>',
          '<th data-sort-type="format">Подпис.</th>',
          '<th data-sort-type="format">EPKS</th>',
          '</tr>',
          '</thead>',
          '<tbody></tbody>',
          '<tfoot></tfoot>',
          '</table>'
        ].join(''),

        wm: [
          '<table class="table table-sort table-list" data-type="wm">',
          '<thead>',
          '<tr>',
          '<th>ID</th>',
          '<th>Вебмастер</th>',
          '<th data-sort-type="format">Разм.</th>',
          '<th data-sort-type="format">Клики/уник</th>',
          '<th><span class="icon icon-phone"></span></th>',
          '<th><span class="icon icon-ok"></span></th>',
          '<th><span class="icon icon-decline"></span></th>',
          '<th><span class="icon icon-time"></span></th>',
          '<th class="view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">XY</th>',
          '<th data-sort-type="format">Σ заказы</th>',
          '<th data-sort-type="format">Σ принято</th>',
          '<th data-sort-type="format">Σ откл.</th>',
          '<th data-sort-type="format">Σ ожид.</th>',
          '<th class="view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">Σ XY</th>',
          '<th data-sort-type="format">Конв.</th>',
          '<th data-sort-type="format">CPC</th>',
          '<th data-sort-type="format">Охват</th>',
          '<th data-sort-type="format">CPM</th>',
          '<th data-sort-type="format">CTR</th>',
          '<th data-sort-type="format">Подпис.</th>',
          '<th data-sort-type="format">EPKS</th>',
          '</tr>',
          '</thead>',
          '<tbody></tbody>',
          '<tfoot></tfoot>',
          '</table>'
        ].join(''),

        publication: [
          '<table class="table table-sort table-list" data-type="publication">',
          '<thead>',
          '<tr>',
          '<th>ID</th>',
          '<th>Время</th>',
          '<th>Продукт</th>',
          '<th>Вебмастер</th>',
          '<th>Группа</th>',
          '<th>Пост</th>',
          '<th><span class="icon icon-clock"></span></th>',
          '<th>Статус</th>',
          '<th data-sort-type="format">Клики/уник</th>',
          '<th><span class="icon icon-phone"></span></th>',
          '<th><span class="icon icon-ok"></span></th>',
          '<th><span class="icon icon-decline"></span></th>',
          '<th><span class="icon icon-time"></span></th>',
          '<th class="view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">XY</th>',
          '<th data-sort-type="format">Σ <span class="icon icon-phone"></span></th>',
          '<th data-sort-type="format">Σ <span class="icon icon-ok"></span></th>',
          '<th data-sort-type="format">Σ <span class="icon icon-decline"></span></th>',
          '<th data-sort-type="format">Σ <span class="icon icon-time"></span></th>',
          '<th class="view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">Σ XY</th>',
          '<th data-sort-type="format">Конв.</th>',
          '<th data-sort-type="format">CPC</th>',
          '<th data-sort-type="format">Охват</th>',
          '<th data-sort-type="format">CPM</th>',
          '<th data-sort-type="format">CTR</th>',
          '<th data-sort-type="format">Подпис.</th>',
          '<th data-sort-type="format">EPKS</th>',
          '</tr>',
          '</thead>',
          '<tbody></tbody>',
          '<tfoot></tfoot>',
          '</table>'
        ].join('')
      }
    },

    changeTemplate: function (e) {
      var that = e.data.that,
        statType = $(this).val();

      that.$statFilterForm.find('.stat-filter-form-wrap-inner').remove()
        .end().append(that.templates.filterForms[statType]);

      SJA.Common.initCustomControls(statType === 'publication' ? { dateMin: new Date() } : {});

      that.$tableStatWrap.empty().append(that.templates.tableHeaders[statType]);

      SJA.Common.initTableSorter(that.$tableStatWrap.find('.table-sort'));

      if (window.statType === 'publication' && window.adId !== null) {
        that.$statFilterForm.find('.stat-ad-id').val(window.adId);
        window.adId = null;
      }

      if (that.$statFilterForm.find('select').length) {
        that.$statFilterForm.find('select').each(function () {
          var $this = $(this);

          if ($this.hasClass('stat-wmid')) {
            that.getWmNames();
          } else if ($this.hasClass('stat-products')) {
            that.updateSelect.apply(that, [$this[0], that.productNames]);
          } else if ($this.hasClass('stat-advertizer-id')) {
            that.updateSelect.apply(that, [$this[0], that.advertizerNames]);
          }
        });
      }

      if (that.setFieldsValues) {
        for (var i = 0, length = that.setFieldsValues.length; i < length; i++) {
          var v = that.setFieldsValues[i],
              $field = that.$statFilterForm.find('#' + v.fieldId);

          if (v.select) {
            if($field.length > 0) {
              $field.data('set-value', v.value);
              $field[0].selectize.setValue(v.value);
            }
          } else {
            $field.val(v.value);
          }
        }

        that.setFieldsValues = [];
      }

      if (statType === 'wm') {
        that.$statFilterForm.submit();
      }
    },

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

      if ($(select).hasClass('stat-products') && window.productId !== null && this.productNames.length) {
        select.selectize.setValue(window.productId);
        window.productId = null;
      }

      val = $(select).data('set-value');

      if (val) {
        select.selectize.setValue(val);
      }

      this.checkSelectsFilling();
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

          if (that.$statFilterForm.find('select.stat-wmid').length) {
            that.updateSelect.apply(that, [that.$statFilterForm.find('select.stat-wmid')[0], that.wmNames]);
          }
        }
      });
    },

    getChannelNames: function () {
      var that = this,
        dataToSend = {
          method: 'getChannelNames',
          params: {
            wmId: (this.$statFilterForm.find('.stat-wmid').val() !== 'null' && this.$statFilterForm.find('.stat-wmid').val() !== '0') ?
              this.$statFilterForm.find('.stat-wmid').val() :
              null
          }
        };

      SJA.ajax(dataToSend, function (respond) {
        if (respond !== null) {
          var newList = [];
          $.each(respond, function(k, v) {
            newList[k] = {
              id: v.id,
              name: '(' + v.id + ') ' + v.name
            };
          });
          that.channelNames = newList;
          that.channelNames.push({id: '0', name: 'Все'});

          if (that.$statFilterForm.find('select.stat-group').length) {
            that.updateSelect.apply(that, [that.$statFilterForm.find('select.stat-group')[0], that.channelNames]);
          }
        }
      });
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

          if (that.$statFilterForm.find('select.stat-products').length) {
            that.updateSelect.apply(that, [that.$statFilterForm.find('select.stat-products')[0], that.productNames]);
          }
        }
      });
    },

    getProductNameById: function (id) {
      for (var productKey in this.productNames) {
        var product = this.productNames[productKey];
        if (product.id == id) {
          return product.name;
        }
      }
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

          if (that.$statFilterForm.find('select.stat-advertizer-id').length) {
            that.updateSelect.apply(that, [that.$statFilterForm.find('select.stat-advertizer-id')[0], that.advertizerNames]);
          }
        }
      });
    },

    getAdvertizerNameById: function (id) {
      for (var advertizerKey in this.advertizerNames) {
        var advertizer = this.advertizerNames[advertizerKey];
        if (advertizer.id == id) {
          return advertizer.name;
        }
      }
    },

    applyFilter: function () {
      var statType = this.$statTypeSelect.val();

      if (statType === 'publication') {
        this.getPublicationList()
      } else {
        this.getStat();
      }
    },

    getSelectValue: function ($select) {
      if ($select.length) {
        return ($select.val() !== 'null' && $select.val() !== '0') ? $select.val() : null;
      } else {
        return null;
      }
    },

    getItemTitleById: function (data, itemId) {
      var i, max;

      for (i = 0, max = data.length; i < max; i += 1) {
        if (data[i].id == itemId) {
          return data[i].name;
        }
      }
    },

    getStat: function () {
      var countrySelect = this.$statFilterForm.find('select.stat-country');
      if (countrySelect.length > 0) {
        countrySelect[0].selectize.addOption(SJA.Common.getCountryList());
      }

      var statType = this.$statTypeSelect.val();

      var group = 'wmId';
      if (statType === 'popupStat') {
        var productId = this.getSelectValue(this.$statFilterForm.find('select.stat-products'));
        if (!productId) return;

        group = 'advertizerId';
      } else if (statType === 'stat') {
        group = this.$statFilterForm.find('.stat-grouping').val();
      }

      var that = this,
        dataToSend = {
          method: 'getStat',
          params: {
            group: group,
            filter: {
              productId: productId || this.getSelectValue(this.$statFilterForm.find('select.stat-products')),
              snId: this.getSelectValue(this.$statFilterForm.find('select.stat-soc-network')),
              wmId: this.getSelectValue(this.$statFilterForm.find('select.stat-wmid')),
              channelId: this.getSelectValue(this.$statFilterForm.find('select.stat-group')),
              country: this.getSelectValue(this.$statFilterForm.find('select.stat-country')),
              device: this.getSelectValue(this.$statFilterForm.find('select.stat-device')),
              advertizerType: this.getSelectValue(this.$statFilterForm.find('select.stat-advertizer-type')),
              advertizerId: this.getSelectValue(this.$statFilterForm.find('select.stat-advertizer-id')),
              dateMin: this.$statFilterForm.find('.stat-date-min').val(),
              dateMax: this.$statFilterForm.find('.stat-date-max').val()
            }
          }
        },
        requestId = this.getUniqueId();

      this.requests[requestId - 1] = false;
      this.requests[requestId] = true;

      SJA.ajax(dataToSend, function (respond) {
        var $tbody = that.$tableStatWrap.find('tbody'),
            $thead = that.$tableStatWrap.find('thead'),
            $tfoot = that.$tableStatWrap.find('tfoot'),
            $firstTh = $thead.find('th:first'),
            item,
            row,
            xycount,
            xyincome,
            newItem,
            wmName,
            advertizerName,
            wmLastNumber,
            wmTitle;

        if (!that.requests[requestId]) return false;

        $tbody.empty();
        $tfoot.empty();

        if (respond != null && respond.rows != null) {

          if (dataToSend.params.group === 'advertizerId' && that.itsPopup) {
            for (item in respond.rows) {
              row = respond.rows[item];

              advertizerName = that.getItemTitleById(that.advertizerNames, item);
              newItem = [
                '<tr>',
                '<td>' + advertizerName + '</td>',
                '<td class="text-right">' + $.number(row.publicationCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.clickCount, 0, ',', ' ') + ' / ' + $.number(row.clickUniqCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.orderCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.waitCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.saleCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.orderIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + $.number(row.waitIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + $.number(row.income, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + (row.saleRatio !== null ? $.number(row.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
                '<td class="text-right">' + $.number(row.cpc, 2, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + $.number(row.channelUserCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + (row.epks !== null ? $.number(row.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
                '</tr>'
              ].join('');

              $tbody.append(newItem);
            }

            $tfoot.append([
              '<tr>',
              '<td></td>',
              '<td class="text-right">' + $.number(respond.total.publicationCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.clickCount, 0, ',', ' ') + ' / ' + $.number(respond.total.clickUniqCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.orderCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.waitCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.saleCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.orderIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(respond.total.waitIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(respond.total.income, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + (respond.total.saleRatio !== null ? $.number(respond.total.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
              '<td class="text-right">' + $.number(respond.total.cpc, 2, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(respond.total.channelUserCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + (respond.total.epks !== null ? $.number(respond.total.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
              '</tr>'
            ].join(''));
          } else if (dataToSend.params.group !== 'wmId') {
            var statGrouping = that.$statFilterForm.find('select.stat-grouping').val();

            var $nameTh = $thead.find('th.namecol');

            window.statGrouping = statGrouping;

            // Если задана группировка по продукту или рекламодателю, то...
            if (statGrouping == 'productId' || statGrouping == 'advertizerId') {
              // Меняем заголовок первой колонки
              $firstTh.text('ID');

              // Показываем колонку "Название"
              $nameTh.show();

            // Иначе
            } else {
              // Меняем заголовок первой колонки
              $firstTh.text('Дата');

              // Скрываем колонку "Название"
              $nameTh.hide();
            }

            for (item in respond.rows) {
              row = respond.rows[item];

              // Показываем колонку с названием, если нужно
              var nameTd = '<td class="namecol" style="display:none;"></td>';
              if (statGrouping == 'productId') {
                nameTd = '<td class="namecol">' + SJA.Stat.getProductNameById(item) + '<span class="icon icon-zoom js-show-product-stat"></span></td>';
              } else if (statGrouping == 'advertizerId') {
                nameTd = '<td class="namecol">' + SJA.Stat.getAdvertizerNameById(item) + '</td>';
              }

              xycount = (row.xyCount !== undefined && row.xyCount !== null) ? row.xyCount : '-';
              xyincome = (row.xyIncome !== undefined && row.xyIncome !== null) ? $.number(row.xyIncome, 0, ',', ' ') + ' р.' : '-';

              newItem = [
                '<tr>',
                '<td>' + item + '</td>',
                nameTd,
                '<td class="text-right"><span data-table-type="date" class="publication-count js-publication-count">' + row.publicationCount + '</span></td>',
                '<td class="text-right">' + $.number(row.clickCount, 0, ',', ' ') + ' / ' + $.number(row.clickUniqCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.orderCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.saleCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.declineCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.waitCount, 0, ',', ' ') + '</td>',
                '<td class="text-right view-mode1-visible-table-cell view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + xycount + '</td>',
                '<td class="text-right">' + $.number(row.orderIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + $.number(row.income, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + $.number(row.declineIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + $.number(row.waitIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right view-mode4-hidden view-mode5-hidden view-mode6-hidden view-mode21-hidden">' + $.number(row.wmIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right view-mode5-hidden view-mode6-hidden view-mode21-hidden">' + (row.gpIncome ? ($.number(row.income - row.gpIncome, 0, ',', ' ') + ' р.') : '-') + '</td>',
                '<td class="text-right view-mode1-visible-table-cell view-mode3-visible-table-cell view-mode2-hidden view-mode4-hidden view-mode5-hidden view-mode6-hidden view-mode21-hidden">' + xyincome + '</td>',
                '<td class="text-right">' + (row.saleRatio !== null ? $.number(row.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
                '<td class="text-right">' + $.number(row.cpc, 2, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + (row.viewCount !== null ? $.number(row.viewCount, 0, ',', ' ') : '-') + '</td>',
                '<td class="text-right">' + (row.cpm !== null ? $.number(row.cpm, 2, ',', ' ') + ' р.' : '-') + '</td>',
                '<td class="text-right">' + (row.ctr !== null ? $.number(row.ctr, 2, ',', ' ') : '-') + '</td>',
                '<td class="text-right">' + $.number(row.channelUserCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + (row.epks !== null ? $.number(row.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
                '</tr>'
              ].join('');

              $tbody.append(newItem);
            }

            // Скрываем колонку с названием, если нужно
            var style = '';
            if (statGrouping != 'productId' && statGrouping != 'advertizerId') {
              style = ' style="display:none;"';
            }
            $tfoot.append([
              '<tr>',
              '<td></td>',
              '<td class="namecol"' + style + '></td>',
              '<td class="text-right">' + respond.total.publicationCount + '</td>',
              '<td class="text-right">' + $.number(respond.total.clickCount, 0, ',', ' ') + ' / ' + $.number(respond.total.clickUniqCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.orderCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.saleCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.declineCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.waitCount, 0, ',', ' ') + '</td>',
              '<td class="text-right view-mode1-visible-table-cell view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + $.number(respond.total.xyCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.orderIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(respond.total.income, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(respond.total.declineIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(respond.total.waitIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right view-mode4-hidden view-mode5-hidden view-mode6-hidden view-mode21-hidden">' + $.number(respond.total.wmIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right view-mode5-hidden view-mode6-hidden view-mode21-hidden">' + (respond.total.gpIncome ? ($.number(respond.total.income - respond.total.gpIncome, 0, ',', ' ') + ' р.') : '-') + '</td>',
              '<td class="text-right view-mode1-visible-table-cell view-mode3-visible-table-cell view-mode2-hidden view-mode4-hidden view-mode5-hidden view-mode6-hidden view-mode21-hidden">' + $.number(respond.total.xyIncome, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + (respond.total.saleRatio !== null ? $.number(respond.total.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
              '<td class="text-right">' + $.number(respond.total.cpc, 2, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + (respond.total.viewCount !== null ? $.number(respond.total.viewCount, 0, ',', ' ') : '-') + '</td>',
              '<td class="text-right">' + (respond.total.cpm !== null ? $.number(respond.total.cpm, 2, ',', ' ') + ' р.' : '-') + '</td>',
              '<td class="text-right">' + (respond.total.ctr !== null ? $.number(respond.total.ctr, 2, ',', ' ') : '-') + '</td>',
              '<td class="text-right">' + $.number(respond.total.channelUserCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + (respond.total.epks !== null ? $.number(respond.total.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
              '</tr>'
            ].join(''));
          } else {
            for (item in respond.rows) {
              row = respond.rows[item];
              wmName = that.getItemTitleById(that.wmNames, item);

              xycount = (row.xyCount !== undefined && row.xyCount !== null) ? row.xyCount : '-';
              xyincome = (row.xyIncome !== undefined && row.xyIncome !== null) ? $.number(row.xyIncome, 0, ',', ' ') + ' р.' : '-';

              newItem = [
                '<tr>',
                '<td class="text-right">' + item + '</td>',
                '<td>' + wmName + '</td>',
                '<td class="text-right"><span data-table-type="wm" class="publication-count js-publication-count">' + $.number(row.publicationCount, 0, ',', ' ') + '</span></td>',
                '<td class="text-right">' + $.number(row.clickCount, 0, ',', ' ') + ' / ' + $.number(row.clickUniqCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.orderCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.saleCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.declineCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + $.number(row.waitCount, 0, ',', ' ') + '</td>',
                '<td class="text-right view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + xycount + '</td>',
                '<td class="text-right">' + $.number(row.orderIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + $.number(row.income, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + $.number(row.declineIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + $.number(row.waitIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + xyincome + '</td>',
                '<td class="text-right">' + (row.saleRatio !== null ? $.number(row.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
                '<td class="text-right">' + $.number(row.cpc, 2, ',', ' ') + ' р.</td>',
                '<td class="text-right">' + (row.viewCount !== null ? $.number(row.viewCount, 0, ',', ' ') : '-') + '</td>',
                '<td class="text-right">' + (row.cpm !== null ? $.number(row.cpm, 2, ',', ' ') + ' р.' : '-') + '</td>',
                '<td class="text-right">' + (row.ctr !== null ? $.number(row.ctr, 2, ',', ' ') : '-') + '</td>',
                '<td class="text-right">' + $.number(row.channelUserCount, 0, ',', ' ') + '</td>',
                '<td class="text-right">' + (row.epks !== null ? $.number(row.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
                '</tr>'
              ].join('');

              $tbody.append(newItem);
            }

            wmLastNumber = that.wmNames.length % 10;

            if (wmLastNumber === 0 || (wmLastNumber >= 5 && wmLastNumber <=9)) {
              wmTitle = ' вебмастеров';
            } else if (wmLastNumber === 1) {
              wmTitle = ' вебмастер';
            } else if (wmLastNumber >= 2 && wmLastNumber <= 4) {
              wmTitle = ' вебмастера';
            }

            $tfoot.append([
              '<tr>',
              '<td colspan="2">' + (that.wmNames.length + wmTitle) + '</td>',
              '<td class="text-right">' + $.number(respond.total.publicationCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.clickCount, 0, ',', ' ') + ' / ' + $.number(respond.total.clickUniqCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.orderCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.saleCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.declineCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.waitCount, 0, ',', ' ') + '</td>',
              '<td class="text-right view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + $.number(respond.total.xyCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(respond.total.orderIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(respond.total.income, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(respond.total.declineIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(respond.total.waitIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + $.number(respond.total.xyIncome, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + (respond.total.saleRatio !== null ? $.number(respond.total.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
              '<td class="text-right">' + $.number(respond.total.cpc, 2, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + (respond.total.viewCount !== null ? $.number(respond.total.viewCount, 0, ',', ' ') : '-') + '</td>',
              '<td class="text-right">' + (respond.total.cpm !== null ? $.number(respond.total.cpm, 2, ',', ' ') + ' р.' : '-') + '</td>',
              '<td class="text-right">' + (respond.total.ctr !== null ? $.number(respond.total.ctr, 2, ',', ' ') : '-') + '</td>',
              '<td class="text-right">' + $.number(respond.total.channelUserCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + (respond.total.epks !== null ? $.number(respond.total.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
              '</tr>'
            ].join(''));
          }

          that.$tableStatWrap.find('table').trigger('update');
        }
      });
    },

    getPublicationList: function () {
      var that = this,
        dataToSend = {
          method: 'getPublicationList',
          params: {
            filter: {
              productId: this.getSelectValue( this.$statFilterForm.find('select.stat-products') ),
              snId: this.getSelectValue( this.$statFilterForm.find('select.stat-soc-network') ),
              wmId: this.getSelectValue( this.$statFilterForm.find('select.stat-wmid') ),
              channelId: this.getSelectValue( this.$statFilterForm.find('select.stat-group') ),
              adId: this.$statFilterForm.find('.stat-ad-id').val() !== '' ? this.$statFilterForm.find('.stat-ad-id').val() : null,
              advertizerType: this.getSelectValue( this.$statFilterForm.find('select.stat-advertizer-type') ),
              dateMin: this.$statFilterForm.find('.stat-date-min').val(),
              dateMax: this.$statFilterForm.find('.stat-date-max').val()
            }
          }
        },
        requestId = this.getUniqueId();

      this.requests[requestId - 1] = false;
      this.requests[requestId] = true;

      SJA.ajax(dataToSend, function (respond) {
        var $tbody = that.$tableStatWrap.find('tbody'),
          $tfoot = that.$tableStatWrap.find('tfoot'),
          row,
          newItem,
          pubTime,
          i, rowMax;

        if (!that.requests[requestId]) return false;

        $tbody.empty();
        $tfoot.empty();

        if (respond && respond.rows.length) {
          for (i = 0, rowMax = respond.rows.length; i < rowMax; i += 1) {
            row = respond.rows[i];
            pubTime = '';

            if (row.viewPeriod !== null) {
              pubTime += (Math.floor(row.viewPeriod / 60) + ':');

              if (row.viewPeriod % 60 < 10) {
                pubTime += ('0' + row.viewPeriod % 60);
              } else {
                pubTime += row.viewPeriod % 60;
              }
            } else {
              pubTime = '-';
            }

            var xycount = (row.xyCount !== undefined && row.xyCount !== null) ? row.xyCount : '-';
            var xyincome = (row.xyIncome !== undefined && row.xyIncome !== null) ? $.number(row.xyIncome, 0, ',', ' ') + ' р.' : '-';

            newItem = [
              '<tr data-id="' + row.adId + '">',
              '<td class="text-right">' + row.id + '</td>',
              '<td>' + row.createdAt.replace(' ', '<br />') + '</td>',
              '<td class="line-break">' + row.productName + '</td>',
              '<td class="line-break">' + row.wmName + '</td>',
              '<td class="line-break">' + row.channelName + '</td>',
              '<td class="text-right"><a href="#" class="stat-view">' + row.adId + '</a></td>',
              '<td class="text-right">' + pubTime + '</td>',
              '<td><span class="text-' + (row.statusError ? 'danger' : 'success') + '" ' +
              (row.statusErrorText ? ('data-toggle="tooltip" data-placement="right" title="' + row.statusErrorText + '"') : '') +
              '>' + row.statusText + '</span></td>',
              '<td class="text-right">' + $.number(row.clickCount, 0, ',', ' ') + ' / ' + $.number(row.clickUniqCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(row.orderCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(row.saleCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(row.declineCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + $.number(row.waitCount, 0, ',', ' ') + '</td>',
              '<td class="text-right view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + xycount + '</td>',
              '<td class="text-right">' + $.number(row.orderIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(row.income, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(row.declineIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + $.number(row.waitIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="text-right view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + xyincome + '</td>',
              '<td class="text-right">' + (row.saleRatio !== null ? $.number(row.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
              '<td class="text-right">' + $.number(row.cpc, 2, ',', ' ') + ' р.</td>',
              '<td class="text-right">' + (row.viewCount !== null ? $.number(row.viewCount, 0, ',', ' ') : '-') + '</td>',
              '<td class="text-right">' + (row.cpm !== null ? $.number(row.cpm, 2, ',', ' ') + ' р.' : '-') + '</td>',
              '<td class="text-right">' + (row.ctr !== null ? $.number(row.ctr, 2, ',', ' ') : '-') + '</td>',
              '<td class="text-right">' + $.number(row.channelUserCount, 0, ',', ' ') + '</td>',
              '<td class="text-right">' + (row.epks !== null ? $.number(row.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
              '</tr>'
            ].join('');

            $tbody.append(newItem);
          }

          $tfoot.append([
            '<tr>',
            '<td colspan="8"></td>',
            '<td class="text-right">' + $.number(respond.total.clickCount, 0, ',', ' ') + ' / ' + $.number(respond.total.clickUniqCount, 0, ',', ' ') + '</td>',
            '<td class="text-right">' + $.number(respond.total.orderCount, 0, ',', ' ') + '</td>',
            '<td class="text-right">' + $.number(respond.total.saleCount, 0, ',', ' ') + '</td>',
            '<td class="text-right">' + $.number(respond.total.declineCount, 0, ',', ' ') + '</td>',
            '<td class="text-right">' + $.number(respond.total.waitCount, 0, ',', ' ') + '</td>',
            '<td class="text-right view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + $.number(respond.total.xyCount, 0, ',', ' ') + '</td>',
            '<td class="text-right">' + $.number(respond.total.orderIncome, 0, ',', ' ') + ' р.</td>',
            '<td class="text-right">' + $.number(respond.total.income, 0, ',', ' ') + ' р.</td>',
            '<td class="text-right">' + $.number(respond.total.declineIncome, 0, ',', ' ') + ' р.</td>',
            '<td class="text-right">' + $.number(respond.total.waitIncome, 0, ',', ' ') + ' р.</td>',
            '<td class="text-right view-mode3-visible-table-cell view-mode2-hidden view-mode21-hidden">' + $.number(respond.total.xyIncome, 0, ',', ' ') + '</td>',
            '<td class="text-right">' + (respond.total.saleRatio !== null ? $.number(respond.total.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
            '<td class="text-right">' + $.number(respond.total.cpc, 2, ',', ' ') + ' р.</td>',
            '<td class="text-right">' + (respond.total.viewCount !== null ? $.number(respond.total.viewCount, 0, ',', ' ') : '-') + '</td>',
            '<td class="text-right">' + (respond.total.cpm !== null ? $.number(respond.total.cpm, 2, ',', ' ') + ' р.' : '-') + '</td>',
            '<td class="text-right">' + (respond.total.ctr !== null ? $.number(respond.total.ctr, 2, ',', ' ') : '-') + '</td>',
            '<td class="text-right">' + $.number(respond.total.channelUserCount, 0, ',', ' ') + '</td>',
            '<td class="text-right">' + (respond.total.epks !== null ? $.number(respond.total.epks, 2, ',', ' ') + ' р.' : '-') + '</td>',
            '</tr>'
          ].join(''));

          that.$tableStatWrap.find('[data-toggle=tooltip]').tooltip();
          that.$tableStatWrap.find('table').trigger('update');
        }
      });
    },

    submitStatForm: function () {
      if (this.startDates.from) {
        $('#date-from').val(this.startDates.from);
        this.startDates.from = false;
      }
      if (this.startDates.to) {
        $('#date-to').val(this.startDates.to);
        this.startDates.to = false;
      }

      if (this.wmNames.length && this.channelNames.length && this.productNames.length && this.advertizerNames.length) {
        this.$statFilterForm.submit();
      }
    },

    getUniqueId: function () {
      var i = 0;

      return function () {
        return i += 1;
      }
    }(),

    changeStatToPublication: function (e) {
      var that = e.data.that,
        el = $(this),
        groupingByProduct = that.$statFilterForm.find('select#stat-grouping').val() === 'productId',
        $valueInRow = el.closest('tr').find('td:first').text();

      that.setFieldsValues = [];

      that.$statFilterForm.find('select').each(function () {
        var $this = $(this),
          fieldId = $this.attr('id'),
          fieldValue = $this.val();

        if (fieldId != 'stat-type') {
          that.setFieldsValues.push({
            fieldId: fieldId,
            select: true,
            value: fieldValue
          });
        }
      });

      if (groupingByProduct && $valueInRow.length > 0) {
        that.setFieldsValues.push({
          fieldId: 'stat-products',
          select: true,
          value: $valueInRow
        });
      }

      that.setFieldsValues.push({
        fieldId: 'date-from',
        select: false,
        value: that.$statFilterForm.find('.stat-date-min').val()
      });

      that.setFieldsValues.push({
        fieldId: 'date-to',
        select: false,
        value: that.$statFilterForm.find('.stat-date-max').val()
      });

      that.$statTypeSelect[0].selectize.setValue('publication');
    },

    checkSelectsFilling: function () {
      var $selects = this.$statFilterForm.find('select'),
          selectLength = $selects.length,
          filledSelectLength = 0,
          i = 0;

      for (; i < selectLength; i += 1) {
        if ($selects.eq(i).val() !== '') {
          filledSelectLength += 1
        }
      }

      if (selectLength === filledSelectLength) {
        this.applyFilter();
      }
    },

    showProductStat: function(e) {
      var that = e.data.that;
      that.itsPopup = true;
      var productId = $(this).closest('tr').find('td:first').text();

      that.$tableStatWrap = $('.popup-table-stat-wrap');
      that.$statFilterForm = $('.popup-stat-filter-form');
      that.$statTypeSelect = that.$statFilterForm.find('.stat-type');

      that.$statFilterForm.find('#popupStatFilter').data('set-value', productId);
      that.setFieldsValues = [];
      that.setFieldsValues.push({
        fieldId: 'popupStatFilter',
        select: true,
        value: productId
      });

      var $modal = $('#viewProductStat');

      that.$statFilterForm.off().on('submit', function(e) {
        e.preventDefault();
        that.applyFilter();
      });

      that.$statTypeSelect
        .off()
        .on('change', { that: that }, that.changeTemplate)
        .val('popupStat')
        .trigger('change');

      that.getProductNames();
      that.getAdvertizerNames();

      $modal.on('hidden.bs.modal', function() {
        $('.popup-table-stat-wrap').html('');
      });
      $modal.modal('show');
    },

    init: function () {
      var that = this;

      this.wmNames = [];
      this.channelNames = [];
      this.productNames = [];
      this.advertizerNames = [];
      this.requests = {};

      this.$statFilterForm = $('.stat-filter-form');
      this.$statTypeSelect = this.$statFilterForm.find('.stat-type');
      this.$tableStatWrap = $('.content .table-stat-wrap');

      this.$tableStatWrap.on('click', '.stat-view', { that: this }, SJA.Common.viewPost);

      this.$statTypeSelect.on('change', { that: this }, this.changeTemplate);

      this.$statFilterForm.on('submit', function (e) {
        e.preventDefault();
        that.applyFilter.apply(that);
      });

      this.$statFilterForm.on('change', '.stat-wmid', $.proxy(this, 'getChannelNames'));

      this.$tableStatWrap.on('click', '.js-publication-count', { that: this }, this.changeStatToPublication);

      this.$tableStatWrap.on('click', '.js-show-product-stat', { that: $.extend({}, SJA.Stat) }, this.showProductStat);

      this.startDates = {};
      if (window.dateMin) this.startDates.from = window.dateMin;
      if (window.dateMax) this.startDates.to = window.dateMax;

      if (window.statType === null) {
        window.statType = 'stat';
      }

      this.$statTypeSelect[0].selectize.setValue(window.statType);

      this.getProductNames();
      this.getAdvertizerNames();
    }
  };

  if ($('#stat').length) SJA.Stat.init();

}(jQuery));
