(function ($) {
  var SJA = window.SJA;

  SJA.ProductEdit = {
    templates: {
      linkTable: [
        '<table class="table table-product">',
          '<col width="122px" />',
          '<col width="32px" />',
          '<col width="117px" />',
          '<col width="121px" />',
          '<col width="51px" />',
          '<col width="204px" />',
          '<col width="132px" />',
          '<col width="117px" />',
          '<col width="70px" span="3" />',
          '<col width="82px" />',
          '<tbody>',
          '<tr>',
            '<td></td>',
            '<td>',
              '<div class="checkbox toggle toggle-sm">',
                '<label>',
                  '<input type="checkbox" class="product-link-enabled" data-toggle="link-enabled">',
                  '<span class="checkbox-input"></span>',
                '</label>',
              '</div>',
            '</td>',
            '<td>',
              '<select class="form-control product-link-advertizer-id">',
              '</select>',
            '</td>',
            '<td><input class="form-control product-link-title" type="text"/></td>',
            '<td><input class="form-control product-link-id" type="text" disabled/></td>',
            '<td><input class="form-control product-link-url" type="text"/></td>',
            '<td>',
              '<select class="form-control product-link-device hide-input">',
                '<option value="0">Все</option>',
                '<option value="1">Телефон</option>',
                '<option value="101">--iOS</option>',
                '<option value="10101">---iphone</option>',
                '<option value="10102">---ipad</option>',
                '<option value="102">--Android</option>',
                '<option value="2">Компьютер</option>',
                '<option value="201">--MAC OS</option>',
                '<option value="202">--PC</option>',
              '</select>',
            '</td>',
            '<td>',
              '<a href="" class="btn btn-default btn-block" data-toggle="collapse">Развернуть</a>',
            '</td>',
            '<td></td>',
            '<td></td>',
            '<td></td>',
            '<td></td>',
          '</tr>',
          '</tbody>',
        '</table>'
      ].join(''),

      collapseContainer: [
        '<div id="" class="collapse">',
          '<div class="text-right"><span class="pseudo-link add-country-link">Добавить страну</span></div>',
        '</div>'
      ].join(''),

      countryTable: [
        '<table class="table table-product table-product-country">',
          '<col width="122px" />',
          '<col width="32px" />',
          '<col width="117px" />',
          '<col width="121px" />',
          '<col width="51px" />',
          '<col width="204px" />',
          '<col width="132px" />',
          '<col width="117px" />',
          '<col width="70px" span="3" />',
          '<col width="82px" />',
          '<tbody>',
          '<tr>',
            '<td></td>',
            '<td></td>',
            '<td></td>',
            '<td></td>',
            '<td></td>',
            '<td></td>',
            '<td></td>',
            '<td>',
              '<select class="form-control product-link-country">',
                '<option value="--">Все</option>',
              '</select>',
            '</td>',
            '<td><input class="form-control product-link-price" type="text"/></td>',
            '<td><input class="form-control product-link-income" type="text"/></td>',
            '<td><input class="form-control product-link-gpincome" type="text"/></td>',
            '<td>',
              '<button class="btn btn-round btn-enabled"><span class="icon icon-pause"></span></button>',
              '<button class="btn btn-round btn-delete view-mode6-hidden"><span class="icon icon-delete"></span></button>',
            '</td>',
          '</tr>',
          '</tbody>',
        '</table>',
      ].join(''),

      addLinkButton: '<button class="btn btn-primary btn-add-link"><b>+</b></button>',

      advertizersList: '',

      categoryItem: [
        '<div class="checkbox">',
          '<label>',
            '<input type="checkbox">',
            '<span class="checkbox-input"></span>',
          '</label>',
        '</div>'
      ].join('')
    },

    advertizersList: [],

    getUniqueId: (function () {
      var i = 1;

      function getUniqueId() {
        return i += 1;
      }

      return getUniqueId;
    }()),

    _getLink: function (group) {
      var $linkTable = $(this.templates.linkTable);

      if (group) {
        $linkTable.find('td:first').append('<input class="form-control product-group-link-name" type="text" class="product-group-link-name"/>');
      }

      $linkTable.find('select').filter('.product-link-advertizer-id').html(this.templates.advertizersList).end()
        .selectize(SJA.Config.selectizeOptions)[0].selectize.addOption(this.advertizersList);

      return $linkTable;
    },

    _getCountry: function (container) {
      var $countryTable = container ? $(this.templates.collapseContainer).prepend(this.templates.countryTable) : $(this.templates.countryTable);

      $countryTable.find('select').selectize(SJA.Config.selectizeOptions)[0].selectize.addOption(SJA.Common.getCountryList(true));

      return $countryTable;
    },

    addLink: function (e) {
      var that = e ? e.data.that : this,
          newId = 'linkGroup' + that.getUniqueId(),
          $linkTable = e ? that._getLink.apply(that) : that._getLink.apply(that, [true]),
          $countryTable = that._getCountry(that, [true]);

      $linkTable.find('[data-toggle=collapse]').attr('href', '#' + newId);
      $countryTable.attr('id', newId);

      if (e) {
        $(this).before($linkTable)
               .before($countryTable);
      } else {
        return $('<div></div>').append($linkTable)
                               .append($countryTable);
      }
    },

    addCountry: function (e) {
      var $container = $(this).closest('div'),
          that = e.data.that,
          $countryTable = that._getCountry.apply(that);

      $container.before($countryTable);
    },

    addGroupLink: function () {
      var $tableProductWrapInner = this.addLink();

      $tableProductWrapInner.addClass('table-product-wrap-inner')
                            .append(this.templates.addLinkButton);

      if (!this.$tableProductWrap.find('.table-product-wrap-inner').length) {
        $tableProductWrapInner.find('> .table-product').data('tb', true)
          .end().find('td:first').html('<span>Traffback</span>')
          .end().find('.product-link-enabled').prop('disabled', true);
      }

      this.$tableProductWrap.append($tableProductWrapInner);
    },

    saveProduct: function () {
      var that = this,
          dataToSend = {
            method: 'saveProduct',
            params: {
              id: this.productId,
              enabled: $('.product-enabled').prop('checked'),
              name: $('.product-name').val(),
              description: $('.product-desc').val(),
              categoryList: [],
              image: $('.product-img-wrap.photo img').data('url'),
              imageSmall: $('.product-img-wrap.preview img').data('url'),
              priceModel: $('.product-work-model').val(),
              approveLevel: $('.product-category').val(),
              clickDomain: $('.product-domain').val(),
              tbLinkId: $('.product-trafficback').val() || 0,
              priceType: $('.product-payment-method').val(),
              price: $('.product-price').is(':visible') ? $('.product-price').val() : 0,
              snId: $('.product-social-network').val() !== 'null' ? $('.product-social-network').val() : null,
              disableComments: $('.product-disable-comments').prop('checked'),
              postbackOut: $('.product-postback-out').val() !== '' ? $('.product-postback-out').val() : null,
              linkGroupList: []
            }
          },
          $productCategories = this.$productEditForm.find('.product-categories input[type=checkbox]:checked'),
          $linkGroups = this.$tableProductWrap.find('.table-product-wrap-inner'),
          $link,
          $country,
          device,
          dataLinkGroup = {},
          dataLink = {},
          dataCountry = {},
          i,
          j,
          l,
          linkGroupMax,
          linkMax,
          countryMax,
          gpIncome;

      this.removeErrors();

      $productCategories.each(function () {
        dataToSend.params.categoryList.push($(this).val());
      });

      for (i = 0, linkGroupMax = $linkGroups.length; i < linkGroupMax; i += 1) {
        dataLinkGroup = {
          id: $linkGroups.eq(i).data('product-link-group-id') || 0,
          enabled: $linkGroups.eq(i).find('input[type=checkbox]:checked').length ? true : false,
          name: $linkGroups.eq(i).find('.product-group-link-name').val() || 'Traffback',
          tb: $linkGroups.eq(i).find('> .table-product').data('tb') ? true : false,
          linkList: []
        };

        $link = $linkGroups.eq(i).find('.table-product:not(.table-product-country)');

        for (j = 0, linkMax = $link.length; j < linkMax; j += 1) {
          dataLink = {
            id: $link.eq(j).find('.product-link-id').val() || 0,
            enabled: $link.eq(j).find('.product-link-enabled').prop('checked') ? true : false,
            name: $link.eq(j).data('tb') ? 'Trafficback' : $link.eq(j).find('.product-link-title').val(),
            advertizerId: $link.eq(j).find('.product-link-advertizer-id').val(),
            url: $link.eq(j).find('.product-link-url').val(),
            countryList: []
          };

          device = $link.eq(j).find('.product-link-device').val();

          switch (device.length) {
            case 1:
              dataLink.deviceFilter = device;
              dataLink.device2Filter = 0;
              dataLink.device3Filter = 0;
              break;
            case 3:
              dataLink.deviceFilter = device.substr(0, 1);
              dataLink.device2Filter = device;
              dataLink.device3Filter = 0;
              break;
            case 5:
              dataLink.deviceFilter = device.substr(0, 1);
              dataLink.device2Filter = device.substr(0, 3);
              dataLink.device3Filter = device;
              break;
          }

          $country = $link.eq(j).next('.collapse').find('.table-product-country');

          for (l = 0, countryMax = $country.length; l < countryMax; l += 1) {
            dataCountry = {
              country: $country.eq(l).find('.product-link-country').val(),
              enabled: $country.eq(l).find('.btn-enabled span').hasClass('icon-play') ? false : true,
              price: $country.eq(l).find('.product-link-price').val(),
              income: $country.eq(l).find('.product-link-income').val()
            };

            gpIncome = $country.eq(l).find('.product-link-gpincome').val();

            if (gpIncome.length) {
              if (!isNaN(parseFloat(gpIncome)) && isFinite(gpIncome)) {
                dataCountry.gpIncome = $country.eq(l).find('.product-link-gpincome').val();
              } else {
                dataCountry.gpIncome = '';
              }
            }

            dataLink.countryList.push(dataCountry);
          }

          dataLinkGroup.linkList.push(dataLink);
        }

        dataToSend.params.linkGroupList.push(dataLinkGroup);
      }

      SJA.ajax(dataToSend, function (respond) {
        if (respond.result) {
          window.location = respond.editUrl;
        } else {
          that.$productEditForm.find('.btn-save-product').after('<p class="error-msg">' + respond.errorText + '</p>');

          if (respond.errorField) {
            that.$productEditForm.find('[name="' + respond.errorField + '"]').addClass('error');
          }
        }
      });
    },

    getAdvertizerNames: function () {
      var that = this,
          dataToSend = {
            method: 'getAdvertizerNames',
            params: {
              enabled: $('.product-category').val()
            }
          },
          i, max;

      SJA.ajax(dataToSend, function (respond) {
        if (respond !== null) {
          for (i = 0, max = respond.length; i < max; i += 1) {
            that.templates.advertizersList += '<option value="' + respond[i].id + '">' + respond[i].name + '</option>';
            that.advertizersList.push({value: respond[i].id, text: respond[i].name});
          }

          that.refreshAdvertizersDropdowns.apply(that);

          that.defGetAdvertizerNames.resolve();
        }
      });
    },

    refreshAdvertizersDropdowns: function () {
      var that = this;

      $('select.product-link-advertizer-id').each(function () {
        $(this).html(that.templates.advertizersList)[0].selectize.addOption(that.advertizersList);
      });
    },

    getProduct: function () {
      var that = this,
          dataToSend = {
            method: 'getProduct',
            params: {
              productId: this.productId
            }
          };

      SJA.ajax(dataToSend, function (respond) {
        var newId,
            $linkTable,
            $countryTable,
            $newGroup,
            groupRow,
            firstCountry,
            linkGroup,
            link,
            country,
            i, j, k, maxCategories, maxGroup, maxLink, maxCountry;

        if (respond !== null) {
          that.setBreadcrumb(respond.name);

          $('.product-enabled').prop('checked', respond.enabled != 0)
            .prop('disabled', that.roleId === 5);

          $('.product-name').val(respond.name);
          $('select.product-category').val(respond.approveLevel)[0].selectize.setValue(respond.approveLevel);
          $('.product-domain').val(respond.clickDomain);
          $('select.product-payment-method').val(respond.priceType)[0].selectize.setValue(respond.priceType);
          $('.product-price').val(respond.price);
          $('.product-social-network').val(respond.snId)[0].selectize.setValue(respond.snId);
          $('.product-disable-comments').prop('checked', respond.disableComments ? true : false);
          $('.product-desc').val(respond.description);
          $('.product-work-model').val(respond.priceModel)[0].selectize.setValue(respond.priceModel);
          $('.product-postback-out').val(respond.postbackOut);

          if (respond.image) {
            $('.product-img-wrap.photo').css({
              'display': 'inline-block'
            }).append('<img src="' + (SJA.Config.productImgUrl + respond.image) + '" alt="" data-url="' + respond.image + '" />').find('img').load();
          }

          if (respond.imageSmall) {
            $('.product-img-wrap.preview').css({
              'display': 'inline-block'
            }).append('<img src="' + (SJA.Config.productImgUrl + respond.imageSmall) + '" alt="" data-url="' + respond.imageSmall + '" />').find('img').load();
          }

          for (i = 0, maxCategories = respond.categoryList.length; i < maxCategories; i += 1) {
            $('.product-categories input[value="' + respond.categoryList[i] + '"]').prop('checked', true).closest('.checkbox').addClass('active');
          }

          for (i = 0, maxGroup = respond.linkGroupList.length; i < maxGroup; i += 1) {
            $newGroup = $('<div class="table-product-wrap-inner"></div>');

            linkGroup = respond.linkGroupList[i];
            groupRow = true;

            $linkTable = that._getLink.apply(that, [true]);

            $newGroup.attr('data-product-link-group-id', linkGroup.id);

            $linkTable.find('.product-link-enabled').prop('checked', linkGroup.enabled).end()
              .find('.product-group-link-name').val(linkGroup.name);

            if (parseInt(linkGroup.tb)) {
              $linkTable.data('tb', true)
                .find('td:first').html('<span>Traffback</span>')
                .end().find('.product-link-enabled').prop('disabled', true);
            }

            for (j = 0, maxLink = linkGroup.linkList.length; j < maxLink; j += 1) {
              newId = that.getUniqueId();
              link = linkGroup.linkList[j];

              if (!groupRow) {
                $linkTable = that._getLink.apply(that);
              }

              $linkTable.find('.product-link-id').val(link.id).end()
                .find('.product-link-enabled').prop('checked', link.enabled).attr('data-link-id', link.id).end()
                .find('.product-link-title').val(link.name).end()
                .find('select.product-link-advertizer-id').val(link.advertizerId).end()
                .find('select.product-link-device').val(link.deviceFilter).end()
                .find('.product-link-url').val(link.url).end()
                .find('[data-toggle=collapse]').attr('href', '#' + newId);

              $linkTable.find('select.product-link-advertizer-id')[0].selectize.setValue(link.advertizerId);
              $linkTable.find('select.product-link-device')[0].selectize.setValue(link.deviceFilter);

              $newGroup.append($linkTable);

              groupRow = false;
              firstCountry = true;

              for (k = 0, maxCountry = link.countryList.length; k < maxCountry; k += 1) {
                country = link.countryList[k];

                if (firstCountry) {
                  $countryTable = that._getCountry.apply(that, [true]);
                  $countryTable.attr('id', newId);
                } else {
                  $countryTable = that._getCountry.apply(that);
                }

                $countryTable.find('select.product-link-country')[0].selectize.addOption(SJA.Common.getCountryList(true));

                $countryTable.find('.product-link-price').val(country.price).end()
                  .find('.product-link-income').val(country.income).end()
                  .find('select.product-link-country')[0].selectize.setValue(country.country);

                if (country.gpIncome) {
                  $countryTable.find('.product-link-gpincome').val(country.gpIncome);
                }

                if (!country.enabled) {
                  $countryTable.find('.btn-enabled span').removeClass('icon-pause').addClass('icon-play');
                }

                if (firstCountry) {
                  $newGroup.append($countryTable);
                } else {
                  $newGroup.find('.collapse:last > div').before($countryTable);
                }

                firstCountry = false;
              }
            }

            $newGroup.append(that.templates.addLinkButton);

            if (parseInt(linkGroup.tb)) {
              that.$tableProductWrap.find('> .table-product:first').after($newGroup);
            } else {
              that.$tableProductWrap.append($newGroup);
            }
          }
        }
      });
    },

    getProductLinkStat: function () {
      var that = this,
          $filterForm = this.$productLinkFilterForm,
          dataToSend = {
            method: 'getProductLinkStat',
            params: {
              productId: this.productId,
              filter: {
                country: $filterForm.find('.product-link-filter-country').val() !== '0' ? $filterForm.find('.product-link-filter-country').val() : null,
                device: $filterForm.find('.product-link-filter-device').val() !== '0' ? $filterForm.find('.product-link-filter-device').val() : null,
                enabled: $filterForm.find('.product-link-filter-enabled').val(),
                dateMin: $filterForm.find('.product-link-date-min').val(),
                dateMax: $filterForm.find('.product-link-date-max').val()
              }
            }
          };

      switch (dataToSend.params.filter.enabled) {
        case 'true':
          dataToSend.params.filter.enabled = true;
          break;
        case 'false':
          dataToSend.params.filter.enabled = false;
          break;
        case '0':
          dataToSend.params.filter.enabled = null;
          break;
        default:
          dataToSend.params.filter.enabled = null;
      }

      SJA.ajax(dataToSend, function (respond) {
        var $table = $('.table-link-product-stat'),
            $tbody,
            $newRow,
            $countries,
            row,
            i, j, rowMax, countryMax,
            groupsTitle = [' групп', ' группа', ' группы'],
            linksTitle = [' ссылок', ' ссылка', ' ссылки'],
            countriesTitle = [' стран', ' страна', ' страны'],
            devicesTitle = [' устройств', ' устроство', ' устройства'];

        $table.find('tbody').empty();
        $table.find('tfoot').empty();

        if (respond.rows.length) {
          $tbody = $table.find('tbody');

          for (i = 0, rowMax = respond.rows.length; i < rowMax; i += 1) {
            row = respond.rows[i];

            $newRow = $([
              '<tr>',
                '<td>' + row.linkId + '</td>',
                '<td class="line-break">' + row.linkGroupName + '</td>',
                '<td class="line-break"><a href="' + row.url + '" target="_blank">' + row.linkName + '</a></td>',
                '<td class="line-break">' + row.advertizerName + '</td>',
                '<td>',
                  '<div class="checkbox toggle toggle-sm">',
                    '<label>',
                      '<input type="checkbox" ' + (row.enabled ? 'checked ' : ' ') + (row.tb || that.roleId === 6 ? 'disabled' : '') + ' data-toggle="link-enabled" data-link-id="' + row.linkId + '">',
                      '<span class="checkbox-input"></span>',
                    '</label>',
                  '</div>',
                '</td>',
                '<td class="table-product-link-stat-country"></td>',
                '<td class="table-product-link-stat-device"></td>',
                '<td>' + $.number(row.clickCount, 0, ',', ' ') + ' / ' + $.number(row.clickUniqCount, 0, ',', ' ') + '</td>',
                '<td>' + $.number(row.orderCount, 0, ',', ' ') + '</td>',
                '<td>' + $.number(row.saleCount, 0, ',', ' ') + '</td>',
                '<td>' + $.number(row.declineCount, 0, ',', ' ') + '</td>',
                '<td>' + $.number(row.waitCount, 0, ',', ' ') + '</td>',
                '<td class="view-mode6-hidden">' + $.number(row.orderIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="view-mode6-hidden">' + $.number(row.income, 0, ',', ' ') + ' р.</td>',
                '<td class="view-mode6-hidden">' + $.number(row.declineIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="view-mode6-hidden">' + $.number(row.waitIncome, 0, ',', ' ') + ' р.</td>',
                '<td class="text-right view-mode6-hidden">' + (row.orderCount == 0 ? '-' : $.number(row.saleCount / row.orderCount * 100, 0, ',', ' ') + '%' ) + '</td>',
                '<td class="text-right view-mode6-hidden">' + (row.saleRatio !== null ? $.number(row.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
                '<td>' + $.number(row.cpc, 2, ',', ' ') + ' р.</td>',
              '</tr>'
            ].join(''));

            $countries = $newRow.find('.table-product-link-stat-country');

            for (j = 0, countryMax = row.countryList.length; j < countryMax; j += 1) {
              $countries.append('<span class="country ' + (row.countryList[j].enabled ? 'text-success' : 'text-danger') + '">' + row.countryList[j].country + '</span>');
            }

            switch (row.device) {
              case '0':
                $newRow.find('.table-product-link-stat-device').html('Все');
                break;
              case '1':
                $newRow.find('.table-product-link-stat-device').html('Телефон');
                break;
              case '101':
                $newRow.find('.table-product-link-stat-device').html('iOS');
                break;
              case '10101':
                $newRow.find('.table-product-link-stat-device').html('iphone');
                break;
              case '10102':
                $newRow.find('.table-product-link-stat-device').html('ipad');
                break;
              case '102':
                $newRow.find('.table-product-link-stat-device').html('Android');
                break;
              case '2':
                $newRow.find('.table-product-link-stat-device').html('Компьютер');
                break;
              case '201':
                $newRow.find('.table-product-link-stat-device').html('MAC OS');
                break;
              case '202':
                $newRow.find('.table-product-link-stat-device').html('PC');
                break;
            }

            $tbody.append($newRow);
          }

          $table.find('tfoot').append([
            '<tr>',
              '<td></td>',
              '<td>' + (respond.total.linkGroupCount + that.getTotalCellText(respond.total.linkGroupCount % 10, groupsTitle)) + '</td>',
              '<td>' + (respond.total.linkCount + that.getTotalCellText(respond.total.linkCount % 10, linksTitle)) + '</td>',
              '<td>' + respond.total.advertizerCount + ' рекламод.</td>',
              '<td></td>',
              '<td class="table-product-link-stat-country">' + (respond.total.countryCount + that.getTotalCellText(respond.total.countryCount % 10, countriesTitle)) + '</td>',
              '<td class="table-product-link-stat-device">' + (respond.total.deviceCount + that.getTotalCellText(respond.total.deviceCount % 10, devicesTitle)) + '</td>',
              '<td>' + $.number(respond.total.clickCount, 0, ',', ' ') + ' / ' + $.number(respond.total.clickUniqCount, 0, ',', ' ') + '</td>',
              '<td>' + $.number(respond.total.orderCount, 0, ',', ' ') + '</td>',
              '<td>' + $.number(respond.total.saleCount, 0, ',', ' ') + '</td>',
              '<td>' + $.number(respond.total.declineCount, 0, ',', ' ') + '</td>',
              '<td>' + $.number(respond.total.waitCount, 0, ',', ' ') + '</td>',
              '<td class="view-mode6-hidden">' + $.number(respond.total.orderIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="view-mode6-hidden">' + $.number(respond.total.income, 0, ',', ' ') + ' р.</td>',
              '<td class="view-mode6-hidden">' + $.number(respond.total.declineIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="view-mode6-hidden">' + $.number(respond.total.waitIncome, 0, ',', ' ') + ' р.</td>',
              '<td class="view-mode6-hidden">' + (respond.total.orderCount == 0 ? '-' : $.number(respond.total.saleCount / respond.total.orderCount * 100, 0, ',', ' ') + '%' ) + '</td>',
              '<td class="text-right view-mode6-hidden">' + (row.saleRatio !== null ? $.number(row.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
              '<td>' + $.number(respond.total.cpc, 2, ',', ' ') + ' р.</td>',
            '</tr>'
          ].join(''));

          $table.find('.checkbox input').each(SJA.Common.setCheckboxValue);

          $table.trigger('update');
          SJA.Common.defaultTableSorting($table);
        }
      });
    },

    setLinkEnabled: function (e) {
      var that = e.data.that,
          $checkbox = $(this),
          dataToSend = {
            method: 'setLinkEnabled',
            params: {
              linkId: $checkbox.data('link-id'),
              enabled: $checkbox.prop('checked') ? true : false
            }
          };

      $('[data-toggle="link-enabled"]').filter('[data-link-id="' + dataToSend.params.linkId + '"]').prop('checked', dataToSend.params.enabled);

      if (that.productId !== 0 && dataToSend.params.linkId !== '') {
        SJA.ajax(dataToSend, function (respond)  {
          if (!respond.result) {
            $checkbox.prop('checked', ($checkbox.prop('checked') ? false : true));
          }
        });
      }
    },

    removeErrors: function () {
      $('.error').removeClass('error')
      $('.error-msg').remove();
    },

    toggleCollapseTitle: function (e) {
      var $this = $(this);

      if ($this.hasClass('collapsed')) {
        $this.text('Свернуть');
      } else {
        $this.text('Развернуть');
      }
    },

    setCountryEnabled: function (e) {
      var $this = $(this),
          $icon = $this.find('.icon');

      if ($icon.hasClass('icon-pause')) {
        $icon.removeClass('icon-pause').addClass('icon-play');
      } else {
        $icon.removeClass('icon-play').addClass('icon-pause');
      }
    },

    deleteCountry: function () {
      var $this = $(this),
          $thisCountry = $this.closest('.table-product-country'),
          $thisCollapse = $this.closest('.collapse'),
          $thisLink = $thisCollapse.prev('.table-product'),
          $thisNextLink = $thisCollapse.next('.table-product');

      $thisCountry.remove();

      if (!$thisCollapse.find('.table-product-country').length) {
        if ($thisLink.find('.product-group-link-name').length) {
          if ($thisNextLink.length) {
            $thisNextLink.find('td:first').append($thisLink.find('.product-group-link-name'));
            $thisLink.remove();
            $thisCollapse.remove();
          } else {
            $thisLink.closest('.table-product-wrap-inner').remove();
          }
        } else {
          $thisLink.remove();
          $thisCollapse.remove();
        }
      }
    },

    togglePriceField: function () {
      if ($(this).val() == 3) {
        $('.product-price-wrap').hide();
      } else {
        $('.product-price-wrap').show();
      }
    },

    getTotalCellText: function (number, titles) {
      if (number === 0 || (number >= 5 && number <=9)) {
        return titles[0];
      } else if (number === 1) {
        return titles[1];
      } else if (number >= 2 && number <= 4) {
        return titles[2];
      }
    },

    setImgToUpload: function () {
      $(this).closest('form').find('input[type=file]').click();
    },

    uploadImg: function (e) {
      var $this = $(this),
          $form = $this.closest('form'),
          formData = new FormData($form[0]),
          $container = $this.closest('form').find('.product-img-wrap');

      $.ajax({
        type:'POST',
        url: SJA.Config.productImgUploadUrl,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
          $container.css('display', 'inline-block').addClass('loading').empty();
        },
        success: function(respond){
          $form[0].reset();
          $container.removeClass('loading').append('<img src="' + (SJA.Config.productImgUrl + respond) + '" alt="" data-url="' + respond + '" />').find('img').load();
        }
      });
    },

    getProductCategoryNames: function () {
      var that = this,
          dataToSend = {
            method: 'getProductCategoryNames',
            params: {}
          };

      SJA.ajax(dataToSend, function (respond) {
        var $wrapper = $('.product-categories .row'),
            $container,
            $el,
            i, maxCols = 6,
            j = 0, maxColEl,
            k = 0, maxEl = respond.length;

        if (respond !== null) {
          for (i = 1; i <= maxCols; i += 1) {
            $container = $('<div class="col-xs-2"></div>');
            k = 0;

            if (maxEl % maxCols) {
              if (i !== maxCols) {
                maxColEl = Math.ceil(maxEl / maxCols);
              } else {
                maxColEl = maxEl % maxCols;
              }
            } else {
              maxColEl = maxEl / maxCols;
            }

            while (j < maxEl) {
              $el = $(that.templates.categoryItem);

              $el.find('input').attr('value', respond[j].id)
                .end().find('label').append(respond[j].name);

              $container.append($el);

              j += 1;
              k += 1;

              if (k === maxColEl) break;
            }

            $wrapper.append($container);
          }

          that.defGetProductCategoryNames.resolve();
        }
      });
    },

    setBreadcrumb: function (title) {
      $('.breadcrumb').append('<li class="active">' + title + '</li>')
    },

    init: function () {
      var that = this;

      $('select#country')[0].selectize.addOption(SJA.Common.getCountryList(true));

      this.roleId = window.roleId;

      this.productId = window.productId || 0;
      this.$breadcrumb = $('.breadcrumb');
      this.$productEdit = $('#product-edit');
      this.$tableProductWrap = $('.table-product-wrap');
      this.$productEditForm = $('.product-edit-form');
      this.$productLinkFilterForm = $('.product-link-filter-form');
      this.defGetProductCategoryNames = new $.Deferred();
      this.defGetAdvertizerNames = new $.Deferred();

      if (!this.productId) {
        this.$productEdit.find('.product-enabled').prop('disabled', true);
      }

      this.$productLinkFilterForm.on('submit', function (e) {
        e.preventDefault();

        that.removeErrors();
        that.getProductLinkStat.apply(that);
      });

      this.$productEdit.on('click', '.btn-add-link', {that: this}, this.addLink)
        .on('click', '.add-country-link', {that: this}, this.addCountry)
        .on('click', '.btn-add-group-link', $.proxy(this, 'addGroupLink'))
        .on('click', '.btn-save-product', $.proxy(this, 'saveProduct'))
        .on('click', '.table-link-product-stat [data-toggle="link-enabled"]', {that: this}, this.setLinkEnabled)
        .on('click', '[data-toggle="collapse"]', this.toggleCollapseTitle)
        .on('click', '.btn-enabled', this.setCountryEnabled)
        .on('click', '.btn-delete', this.deleteCountry)
        .on('click', '.product-img .btn', this.setImgToUpload)
        .on('change', '.product-payment-method', this.togglePriceField)
        .on('change', '.product-img-upload', this.uploadImg);

      $('select.product-payment-method').trigger('change');

      SJA.Common.initTableSorter($('.table-link-product-stat'));

      this.getProductCategoryNames();
      this.getAdvertizerNames();

      $.when(this.defGetAdvertizerNames, this.defGetProductCategoryNames).done(function () {
        if (that.productId) {
          that.getProduct.call(that);
          that.getProductLinkStat.call(that);
        } else {
          that.setBreadcrumb('Новый продукт');
          that.addGroupLink.call(that);
        }
      });
    }
  };

  if ($('#product-edit').length) SJA.ProductEdit.init();
}(jQuery));