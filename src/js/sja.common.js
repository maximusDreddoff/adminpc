(function ($) {
  var SJA = window.SJA;

  SJA.Common = {
    specChars: {
      'black-hand-right': '&#9755;',
      'black-hand-left': '&#9754;',
      'black-right-3': '&#9658;&#9658;&#9658;',
      'black-right': '&#9658;',
      'black-phone': '&#9742;',
      'telephone-location': '&#9990;'
    },

    initCustomControls: function (options) {
      var opt = $.extend({}, {
        dateMin: $('.date-from').data('set-date') !== 0 ? $('.date-from').data('set-date') : new Date(),
        dateMax: $('.date-to').data('set-date') !== 0 ? $('.date-to').data('set-date') : new Date()
      }, options)

      $('select.form-control').each(function(k, v) {
        var el = $(v);
        var options = SJA.Config.selectizeOptions;
        if (el.data('sort-field')) {
          $.extend(options, {sortField: el.data('sort-field')});
        }
        el.selectize(options);
      });

      $(document)
        .on('click', '.selectize-control', function (e) {
          if (!$(e.target).closest('.selectize-control').length) return;
          $(this).find('input').focus();
        })
        .on('click', '.checkbox input', this.setCheckboxValue);

      $('.date-from').datepicker($.extend(SJA.Config.datePickerOptions, {
        onClose: function( selectedDate ) {
          $(this).closest('form')
            .find('.date-to').datepicker('option', 'minDate', selectedDate );
        }
      })).datepicker('setDate', (opt && opt.dateMin ? opt.dateMin : -7));

      $('.date-to').datepicker($.extend(SJA.Config.datePickerOptions, {
        onClose: function( selectedDate ) {
          $(this).closest('form')
            .find('.date-from').datepicker('option', 'maxDate', selectedDate );
        }
      })).datepicker('setDate', (opt && opt.dateMax ? opt.dateMax : new Date()) );

      $('.datepicker').datepicker(SJA.Config.datePickerOptions).datepicker('setDate', new Date());
    },

    setCheckboxValue: function () {
      var $this = $(this),
        val = $this.prop('checked') ? 1 : 0;

      $this.closest('.checkbox').find('.checkbox-input').text(val);
    },

    viewPost: function (e) {
      e.preventDefault();

      var that = e.data.that;
          that.postId = $(this).closest('tr').data('id') || $(this).closest('tr').data('post-id');

      SJA.Common.getLinkGroupNamesDef = new $.Deferred();
      SJA.Common.getLinkGroupNames.call(that);

      $.when(SJA.Common.getLinkGroupNamesDef).then( $.proxy(SJA.Common, 'getAd', that.postId) );
    },

    getLinkGroupNames: function (id) {
      var that = this,
        dataToSend = {
          method: 'getLinkGroupNames',
          params: {
            productId: this.productId,
            enabled: null
          }
        };

      SJA.ajax(dataToSend, function (respond) {
        that.linkGroupNames = respond;
        SJA.Common.linkGroupNames = respond;
        SJA.Common.getLinkGroupNamesDef.resolve();
      });
    },

    getAd: function (id) {
      var that = this,
        dataToSend = {
          method: 'getAd',
          params: {
            adId: id
          }
        };

      SJA.ajax(dataToSend, function (respond) {
        var $modalBody = that.$viewModal.find('.modal-body'),
          $container,
          $pollList,
          $lastText,
          video,
          linkText,
          linkGroupId,
          i, j, itemsMax, ansMax, groupLinkNamesMax;

        that.$viewModal.data({
          'id': respond.id,
          'enabled': respond.enabled
        });

        $modalBody.empty();

        for (i = 0, itemsMax = respond.adContent.length; i < itemsMax; i += 1) {
          if ($modalBody.find('.row:last .text').length) {
            $container = $modalBody.find('.row:last .col-xs-12');
          } else {
            $container = $('<div class="row"><div class="col-xs-12"></div></div>').find('.col-xs-12');
          }

          switch (respond.adContent[i].type) {
            case 'text':
              if (!$container.children(':last').hasClass('text')) {
                $container.append('<p class="text"></p>');
              }

              $lastText = $container.children('.text:last');
              $lastText.html( $lastText.html() + respond.adContent[i].text.replace(/\n/g, '<br />') + ' ' );
              break;

            case 'image':
              $container.append('<img src="' + (SJA.Config.postsImgUrl + respond.adContent[i].file) + '" alt="" />').find('img').load();
              break;

            case 'video':
              $container.append( that.getVideoPreview(respond.adContent[i].url) );
              break;

            case 'document':
              $container.append('<img src="' + (SJA.Config.postsImgUrl + respond.adContent[i].file) + '" alt="" />').find('img').load();
              break;

            case 'poll':
              $container.append('<p>' + respond.adContent[i].question + '</p>');
              $container.append('<ul class="poll"></ul>');
              $pollList = $container.find('ul');
              for (j = 0, ansMax = respond.adContent[i].answers.length; j < ansMax; j += 1) {
                $pollList.append('<li><div class="radio"><label><input type="radio" name="poll" /><span class="radio-input"></span>' + respond.adContent[i].answers[j] + '</label></div></li>');
              }
              break;

            case 'link':
              linkGroupId = parseInt(respond.adContent[i].linkGroupId);

              for (j = 0, groupLinkNamesMax = that.linkGroupNames.length; j < groupLinkNamesMax; j += 1) {
                if (that.linkGroupNames[j].id === linkGroupId) {
                  linkText = that.linkGroupNames[j].name.replace(/ /g, '-');
                }
              }

              if (!$container.children(':last').hasClass('text')) {
                $container.append('<p class="text"></p>');
              }

              $lastText = $container.children('.text:last');
              $lastText.html( $lastText.html() +
                (respond.adContent[i].prefix ? respond.adContent[i].prefix : '') +
                (respond.adContent[i].url ? ' <a href="' + respond.adContent[i].url + '">' + respond.adContent[i].url + '</a> ' :
                ' <a href="#">http://' + linkText + '/' + linkGroupId + '</a> ') );
              break;

            case 'repost':
              $container.append('<p>Репост: <a href="' + respond.adContent[i].url + '">' + respond.adContent[i].url + '</a></p>');
              break;
          }

          $modalBody.append($container.closest('.row'));
        }

        that.$viewModal.modal('show');
      });
    },

    getVideoPreview: function (url) {
      var videoUrl = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
      if (videoUrl && videoUrl[2].length == 11) {
        return '<iframe width="100%" height="350px" src="//www.youtube.com/embed/' + videoUrl[2] + '" frameborder="0" allowfullscreen data-url="' + url + '"></iframe>';
      }
    },

    getCountryList: function(skipValueAll) {
      var countryList = [];

      $.each(SJA.Config.countries, function(k, v) {
        if (k === 'null' && skipValueAll) return;

        countryList.push({
          value: k,
          text: v
        });
      });

      return countryList;
    },

    defaultTableSorting: function($table) {
      var $th = $table.find('thead th[data-sort-init]').first();
      $th.trigger('click');
      if ($th.data('sort-init') == 'desc') {
        $th.trigger('click');
      }
    },

    initTableSorter: function ($tables) {
      $tables.each(function () {
        var $table = $(this),
          headersOptions = {};

        $table.find('thead th').each(function () {
          var $headerCell = $(this);

          if ($headerCell.data('sort-type')) {
            headersOptions[$headerCell.index()] = {sorter: $headerCell.data('sort-type')};
          }
        });

        $table.tablesorter({
          headers: headersOptions,
          headerTemplate: ''
        });

        SJA.Common.defaultTableSorting($table);
      });
    },

    setUserViewMode: function () {
      if (window.roleId) {
        $('body').addClass('view-mode' + window.roleId);
      } else {
        $('body').addClass('normal-view');
      }
    },

    init: function () {
      $.tablesorter.addParser({
        id: 'format',
        is: function (s) {
          return false;
        },
        format: function (s) {
          if (s === '-') {
            return '-1';
          } else {
            if (s.indexOf(' /') !== -1) {
              s = s.substring(0, s.indexOf(' /'));
            }

            return s.replace(new RegExp(' р.', 'g'), '')
              .replace(new RegExp(' ', 'g'), '')
              .replace(new RegExp('%', 'g'), '')
              .replace(new RegExp(',', 'g'), '.')
              .replace(new RegExp('-', 'g'), '-1');
          }
        },
        type: 'numeric'
      });

      this.$viewModal = $('.view-post-modal');
      this.$filtercat = $('#posts-filter-cat');

      this.initCustomControls();

      this.setUserViewMode();

      $(document).ajaxStart(function () {
        $('body').addClass('loading');
      }).ajaxStop(function () {
        $('body').removeClass('loading');
      });
    }
  };

  SJA.Common.init();

}(jQuery));