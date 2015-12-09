(function ($) {
  var SJA = window.SJA;

  SJA.Tasks = {
    getStatusValue: function (statusValue) {
      var status = {};

      switch (parseInt(statusValue)) {
        case 1:
          status.className = '';
          status.text = 'Ожидает публикации';
          break;
        case 2:
          status.className = 'text-success';
          status.text = 'Успешно размещено';
          break;
        case 3:
          status.className = 'text-warning';
          status.text = 'Ошибка публикации';
          break;
        case 4:
          status.className = 'text-muted';
          status.text = 'Отменено';
          break;
      }

      return status;
    },

    getPublicationTaskChannelNames: function () {
      var that = this,
          dataToSend = {
            method: 'getPublicationTaskChannelNames',
            params: {}
          };

      SJA.ajax(dataToSend, function (respond) {
        var channelNames;

        if (respond.length) {
          channelNames = $.map(respond, function(channel) {
            return {
              value: channel.id,
              text: '(' + channel.id + ') ' + channel.name
            };
          });

          that.$tasksGroupFilter[0].selectize.addOption(channelNames);
          that.$newTaskChannel[0].selectize.addOption(channelNames);
          that.$newTaskChannel[0].selectize.setValue(channelNames[0].value);

          for (var i = 0; i < respond.length; i++) {
            that.$newTaskGroupChannel.append('<div class="checkbox"><label><input data-snid="' + respond[i].snId + '" type="checkbox" name="' + respond[i].id + '"><span class="checkbox-input"></span>(' + respond[i].id + ') ' + respond[i].name + '</label></div>');
          }

          if (that.$newTaskGroupChannel.find('input[type="checkbox"][data-snid="1"]').length === 0) {
            that.$newTaskGroupChannel.find('.js-all-ok').closest('.checkbox').hide();
          }
          if (that.$newTaskGroupChannel.find('input[type="checkbox"][data-snid="2"]').length === 0) {
            that.$newTaskGroupChannel.find('.js-all-vk').closest('.checkbox').hide();
          }

          that.getPublicationTaskList.call(that);
        }
      });
    },

    getPublicationTaskList: function (e) {
      var that = e ? e.data.that : this,
          dataToSend = {
            method: 'getPublicationTaskList',
            params: {
              filter: {
                channelId: that.$tasksGroupFilter.val() !== '0' ? that.$tasksGroupFilter.val() : null,
                status: that.$tasksEnabledFilter.val() !== '0' ? that.$tasksEnabledFilter.val() : null,
                dateMin: that.$tasksDateMinFilter.val(),
                dateMax: that.$tasksDateMaxFilter.val()
              }
            }
          };

      if (e) e.preventDefault();

      SJA.ajax(dataToSend, function (respond) {
        var $tbody = that.$tasksTable.find('tbody'),
            $tfoot = that.$tasksTable.find('tfoot'),
            tasksTitles = ['задача', 'задачи', 'задач'],
            tasksTitle;

        $tbody.empty();
        $tfoot.empty();

        $.each(respond.rows, function (index, row) {
          var status = that.getStatusValue(row.status);

          $tbody.append([
            '<tr data-post-id="' + row.adId + '" data-task-id="' + row.id + '">',
              '<td>' + row.id + '</td>',
              '<td>' + row.publicationTime + '</td>',
              '<td><a class="task-title text-primary" href="#" data-id="' +  row.channelId + '">' + row.channelName + '</a></td>',
              '<td><a href="#" class="view-post">' + row.adId + '</a></td>',
              '<td>' + $.number(row.money, 0, ',', ' ') + ' р.</td>',
              '<td><span class="task-status ' + status.className + '">' + status.text + '</span></td>',
              '<td class="text-right">' + (row.channelUserCount !== null ? $.number(row.channelUserCount, 0, ',', ' ') : '-' ) + '</td>',
              '<td class="text-right">' + (row.clickCount !== null ? $.number(row.clickCount, 0, ',', ' ') : '-' ) + ' / ' + (row.clickUniqCount !== null ? $.number(row.clickUniqCount, 0, ',', ' ') : '-' ) + '</td>',
              '<td class="text-right">' + (row.likeCount !== null ? $.number(row.likeCount, 0, ',', ' ') : '-' ) + '</td>',
              '<td class="text-right">' + (row.repostCount !== null ? $.number(row.repostCount, 0, ',', ' ') : '-' ) + '</td>',
              '<td class="text-right">' + (row.commentsCount !== null ? $.number(row.commentsCount, 0, ',', ' ') : '-' ) + '</td>',
              '<td>' + (row.status === '1' || row.status === '4' ? '<button class="btn"><span class="icon ' + (row.status === '1' ? 'icon-cancel' : 'icon-refresh') + '"></span></button>' : '') + '</td>',
            '</tr>'
          ].join(''));
        });

        if (respond.total.count % 10 === 1) {
          tasksTitle = tasksTitles[0];
        } else if (respond.total.count % 10 >= 2 && respond.total.count % 10 >= 4) {
          tasksTitle = tasksTitles[1];
        } else {
          tasksTitle = tasksTitles[2];
        }

        $tfoot.append([
          '<tr>',
            '<td></td>',
            '<td>' + respond.total.count + ' ' + tasksTitle + '</td>',
            '<td></td>',
            '<td></td>',
            '<td>' + $.number(respond.total.money, 0, ',', ' ') + ' р.</td>',
            '<td></td>',
            '<td class="text-right">' + (respond.total.channelUserCount !== null ? $.number(respond.total.channelUserCount, 0, ',', ' ') : '-' ) + '</td>',
            '<td class="text-right">' + (respond.total.clickCount !== null ? $.number(respond.total.clickCount, 0, ',', ' ') : '-' ) + ' / ' + (respond.total.clickUniqCount !== null ? $.number(respond.total.clickUniqCount, 0, ',', ' ') : '-' ) + '</td>',
            '<td class="text-right">' + (respond.total.likeCount !== null ? $.number(respond.total.likeCount, 0, ',', ' ') : '-' ) + '</td>',
            '<td class="text-right">' + (respond.total.repostCount !== null ? $.number(respond.total.repostCount, 0, ',', ' ') : '-' ) + '</td>',
            '<td class="text-right">' + (respond.total.commentsCount !== null ? $.number(respond.total.commentsCount, 0, ',', ' ') : '-' ) + '</td>',
            '<td></td>',
          '</tr>'
        ].join(''));

        that.$tasksTable.trigger('update');
      });
    },

    getPublicationTaskTimeList: function () {
      var that = this,
          dataToSend = {
            method: 'getPublicationTaskTimeList',
            params: {
              channelId: this.$newTaskChannel.val(),
              date: this.$newTaskDate.val()
            }
          };

      that.$newTaskTimeList[0].selectize.addOption({value: 'loading', text: 'Данные загружаются...', disabled: true});
      that.$newTaskTimeList[0].selectize.setValue('loading');
      that.$newTaskTimeList.attr('disabled', 'disabled');

      SJA.ajax(dataToSend, function (respond) {
        var times;

        if (respond !== false) {
          if (respond.length) {
            times = $.map(respond, function (timeValue) {
              return {
                value: timeValue.time,
                text: timeValue.time + (timeValue.booked ? ' (забронировано)' : '')
              }
            });

            that.$newTaskTimeList[0].selectize.clearOptions();
            that.$newTaskTimeList[0].selectize.addOption({value: '0', text: 'Другое', disabled: true});
            that.$newTaskTimeList[0].selectize.addOption(times);
            that.$newTaskTimeList[0].selectize.setValue(times[0].value);
          }

          that.$newTaskTimeList[0].selectize.removeOption('loading');
          that.$newTaskTimeList.removeAttr('disabled');

          that.toggleTimeFieldDisable.call(that);
        }
      });
    },

    toggleTimeFieldDisable: function () {
      if (this.$newTaskTimeList.val() !== '0') {
        this.$newTaskTimeField.attr('disabled', 'disabled').val('');
      } else {
        this.$newTaskTimeField.removeAttr('disabled');
      }
    },

    resetNewTaskForm: function () {
      this.$newTaskModal.find('.error-msg').remove();
      this.$newTaskTimeList[0].selectize.clearOptions();
      this.$newTaskTimeList[0].selectize.addOption({
        value: '0',
        text: 'Другое'
      });
      this.$newTaskTimeField.val('').attr('disabled', 'disabled');
      this.$newTaskPostId.val('');
      this.$newTaskPrice.val('');
    },

    savePublicationTask: function (e) {
      var that = e.data.that,
          dataToSend = {
            method: 'savePublicationTask',
            params: {
              id: that.$newTaskModal.data('id') || 0,
              channelId: that.$newTaskChannel.val(),
              adId: that.$newTaskPostId.val(),
              date: that.$newTaskDate.val(),
              time: that.$newTaskTimeList.val() !== '0' ? that.$newTaskTimeList.val() : that.$newTaskTimeField.val(),
              money: that.$newTaskPrice.val()
            }
          },
          timeToCheck = dataToSend.params.time.split(':');

      if (e) e.preventDefault();

      that.$newTaskModal.find('.error-msg').remove();

      if (dataToSend.params.adId < 0
        || parseInt(dataToSend.params.adId) !== parseInt(dataToSend.params.adId, 10)
        || parseInt(timeToCheck[0]) > 23
        || parseInt(timeToCheck[1]) > 59
        || that.$newTaskTimeList[0].selectize.getItem( dataToSend.params.time ).text().indexOf(' (забронировано)') !== -1) return;

      SJA.ajax(dataToSend, function (respond) {
        if (respond.result) {
          that.$newTaskModal.modal('hide');
          that.getPublicationTaskList.call(that);
        } else {
          that.$newTaskForm.find('[type=submit]').after('<p class="error-msg">' + respond.errorText + '</p>');
        }
      });
    },

    savePublicationTaskGroup: function (e) {
      var that = e.data.that,
          channelId = [];

      that.$newTaskGroupChannel.find('input[type="checkbox"]').each(function() {
        var $input = $(this);

        if ($input.attr('name') && $input.is(':checked')) {
          channelId.push($input.attr('name'));
        }
      });

      var dataToSend = {
          method: 'savePublicationTask',
          params: {
            id: that.$newTaskGroupModal.data('id') || 0,
            channelId: channelId,
            adId: that.$newTaskGroupPostId.val(),
            date: that.$newTaskGroupDate.val(),
            time: that.$newTaskGroupTimeField.val(),
            money: that.$newTaskGroupPrice.val()
          }
        },
        timeToCheck = dataToSend.params.time.split(':');

      if (e) e.preventDefault();

      that.$newTaskGroupModal.find('.error-msg').remove();

      if (dataToSend.params.adId < 0
        || parseInt(dataToSend.params.adId) !== parseInt(dataToSend.params.adId, 10)
        || parseInt(timeToCheck[0]) > 23
        || parseInt(timeToCheck[1]) > 59) return;

      SJA.ajax(dataToSend, function (respond) {
        if (respond.result) {
          that.$newTaskGroupModal.modal('hide');
          that.getPublicationTaskList.call(that);
        } else {
          that.$newTaskGroupForm.find('[type=submit]').after('<p class="error-msg">' + respond.errorText + '</p>');
        }
      });
    },

    updatePublicationTaskStatus: function (e) {
      var that = e.data.that,
        $this = $(this),
        dataToSend = {
          method: 'updatePublicationTaskStatus',
          params: {
            id: $this.closest('tr').data('task-id'),
            status: $this.find('.icon-cancel').length ? 4 : 1
          }
        };

      SJA.ajax(dataToSend, function (respond) {
        var id = dataToSend.params.id,
          status = that.getStatusValue(dataToSend.params.status),
          $task;

        if (respond.result) {
          $task = that.$tasksTable.find('tr[data-task-id=' + id + ']');

          $task.find('.task-status')
            .removeClass('text-muted')
            .addClass(status.className)
            .text(status.text);

          $task.find('.btn .icon')
            .removeClass('icon-refresh')
            .removeClass('icon-cancel')
            .addClass( dataToSend.params.status === 1 ? 'icon-cancel' : 'icon-refresh' );
        } else {
          if (respond.errorText) {
            that.$alertModal.find('.modal-body p').text(respond.errorText);
          }

          that.$alertModal.modal('show');
        }
      });
    },

    onSelectChannel: function (e) {
      var that = e.data.that,
          $el = $(this),
          $checkboxes = that.$newTaskGroupChannel.find('input[type="checkbox"]');

      // Triggerred a set of groups
      if (!$el.data('snid')) {
        // Triggerred all groups
        if ($el.hasClass('js-all')) {
          if ($el.is(':checked')) {
            $checkboxes.each(function (key, input) {
              $(input).prop('checked', true);
            });
          } else {
            $checkboxes.each(function (key, input) {
              $(input).prop('checked', false);
            });
          }
        // Triggerred OK groups
        } else if ($el.hasClass('js-all-ok')) {
          if ($el.is(':checked')) {
            $checkboxes.filter('[data-snid="1"]').each(function (key, input) {
              $(input).prop('checked', true);
            });

            $checkboxes.filter('.js-all').prop('checked', false)
              .end().filter('.js-all-vk').prop('checked', false)
              .end().filter('[data-snid="2"]').each(function (key, input) {
                $(input).prop('checked', false);
              });
          } else {
            $checkboxes.filter('.js-all').prop('checked', false)
              .end().filter('[data-snid="1"]').each(function (key, input) {
                $(input).prop('checked', false);
              });
          }
        // Triggerred VK groups
        } else if ($el.hasClass('js-all-vk')) {
          if ($el.is(':checked')) {
            $checkboxes.filter('[data-snid="2"]').each(function (key, input) {
              $(input).prop('checked', true);
            });

            $checkboxes.filter('.js-all').prop('checked', false)
              .end().filter('.js-all-ok').prop('checked', false)
              .end().filter('[data-snid="1"]').each(function (key, input) {
                $(input).prop('checked', false);
              });
          } else {
            $checkboxes.filter('.js-all').prop('checked', false)
              .end().filter('[data-snid="2"]').each(function (key, input) {
                $(input).prop('checked', false);
              });
          }
        }
      // Triggered a group
      } else {
        if ($el.is(':checked')) {
          if ($checkboxes.filter('[data-snid]:not(:checked)').length === 0) {
            $checkboxes.filter('.js-all').prop('checked', true);
            $checkboxes.filter('.js-all-ok').prop('checked', true);
            $checkboxes.filter('.js-all-vk').prop('checked', true);
          } else {
            if ($checkboxes.filter('[data-snid=' + $el.data('snid') + ']:not(:checked)').length === 0) {
              switch ($el.data('snid')) {
                case 1:
                  $checkboxes.filter('.js-all-ok').prop('checked', true);
                  break;
                case 2:
                  $checkboxes.filter('.js-all-vk').prop('checked', true);
                  break;
              }
            }
          }
        } else {
          $checkboxes.filter('.js-all').prop('checked', false);

          if ($el.is('[data-snid="1"]')) {
            $checkboxes.filter('.js-all-ok').prop('checked', false);
          }
          if ($el.is('[data-snid="2"]')) {
            $checkboxes.filter('.js-all-vk').prop('checked', false);
          }
        }
      }
    },

    init: function () {
      this.$tasksFilterForm = $('.filter-form');
      this.$tasksGroupFilter = this.$tasksFilterForm.find('select.tasks-group-filter');
      this.$tasksEnabledFilter = this.$tasksFilterForm.find('select.tasks-filter-enabled');
      this.$tasksDateMinFilter = this.$tasksFilterForm.find('.date-from');
      this.$tasksDateMaxFilter = this.$tasksFilterForm.find('.date-to');
      this.$tasksTable = $('.table-tasks');
      this.$newTaskModal = $('.new-task-modal');
      this.$newTaskForm = this.$newTaskModal.find('.new-task-form');
      this.$newTaskChannel = this.$newTaskForm.find('select.tasks-channel-modal');
      this.$newTaskDate = this.$newTaskForm.find('.new-task-date');
      this.$newTaskTimeList = this.$newTaskForm.find('select.new-task-time-list');
      this.$newTaskTimeField = this.$newTaskForm.find('.new-task-time-field');
      this.$newTaskPostId = this.$newTaskForm.find('.new-task-post-id');
      this.$newTaskPrice = this.$newTaskForm.find('.new-task-price');
      this.$alertModal = $('.alert-modal');

      this.$newTaskGroupModal = $('.new-task-group-modal');
      this.$newTaskGroupForm = this.$newTaskGroupModal.find('.new-task-group-form');
      this.$newTaskGroupChannel = this.$newTaskGroupForm.find('.channel-multiselect');
      this.$newTaskGroupTimeField = this.$newTaskGroupForm.find('.new-task-time-field');
      this.$newTaskGroupPostId = this.$newTaskGroupForm.find('.new-task-post-id');
      this.$newTaskGroupDate = this.$newTaskGroupForm.find('.new-task-date');
      this.$newTaskGroupPrice = this.$newTaskGroupForm.find('.new-task-price');

      this.$newTaskTimeField.inputmask("99:99");
      this.$newTaskGroupTimeField.inputmask("99:99");

      $(document).on('submit', '.filter-form', {that: this}, this.getPublicationTaskList)
        .on('shown.bs.modal', '.new-task-modal', $.proxy(this, 'getPublicationTaskTimeList'))
        .on('hidden.bs.modal', '.new-task-modal', $.proxy(this, 'resetNewTaskForm'))
        .on('change', 'select.tasks-group-modal', $.proxy(this, 'getPublicationTaskTimeList'))
        .on('change', 'select.new-task-time-list', $.proxy(this, 'toggleTimeFieldDisable'))
        .on('change', 'select.tasks-channel-modal', $.proxy(this, 'getPublicationTaskTimeList'))
        .on('submit', '.new-task-form', {that: this}, this.savePublicationTask)
        .on('change', '.new-task-group-form input[type="checkbox"]', {that: this}, this.onSelectChannel)
        .on('submit', '.new-task-group-form', {that: this}, this.savePublicationTaskGroup)
        .on('change', '.new-task-date', $.proxy(this, 'getPublicationTaskTimeList'))
        .on('click', '.table-tasks a:not(.view-post)', function (e) { e.preventDefault(); })
        .on('click', '.table-tasks .view-post', {that: this}, SJA.Common.viewPost)
        .on('click', '.table-tasks .btn', {that: this}, this.updatePublicationTaskStatus);

      SJA.Common.initCustomControls({dateMax: '+7'});

      this.getPublicationTaskChannelNames();

      window.test = this;
    }
  };

  if ($('#tasks').length) SJA.Tasks.init();

}(jQuery));
