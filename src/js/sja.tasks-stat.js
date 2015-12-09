(function ($) {
  var SJA = window.SJA;

  SJA.TasksStat = {
    getPublicationTaskStat: function (e) {
      var that = e ? e.data.that : this,
          dataToSend = {
            method: 'getPublicationTaskStat',
            params: {
              filter: {
                adId: that.$adId.val() !== '' ? that.$adId.val() : null,
                dateMin: that.$tasksStatFilterDateMin.val(),
                dateMax: that.$tasksStatFilterDateMax.val()
              }
            }
          };

      if (e) e.preventDefault();

      SJA.ajax(dataToSend, function(respond) {
        var $tbody = that.$tasksStatTable.find('tbody'),
            $tfoot = that.$tasksStatTable.find('tfoot');

        $tbody.empty();
        $tfoot.empty();

        if (respond !== false) {
          $.each(respond.rows, function (index, row) {
            $tbody.append([
              '<tr>',
                '<td>' + row.date + '</td>',
                '<td>' + row.count + '</td>',
                '<td>' + $.number(row.money, 0, ',', ' ') + ' р.</td>',
              '</tr>'
            ].join(''));
          });

          $tfoot.append([
            '<tr>',
              '<td></td>',
              '<td>' + respond.total.count + '</td>',
              '<td>' + $.number(respond.total.money, 0, ',', ' ') + ' р.</td>',
            '</tr>'
          ].join(''));

          that.$tasksStatTable.trigger('update');
        }
      });
    },

    setFilterValues: function () {
      if (window.adId) {
        this.$adId.val(window.adId);
      }
      if (window.dateMin) {
        this.$tasksStatFilterDateMin.val(window.dateMin);
      }
      if (window.dateMax) {
        this.$tasksStatFilterDateMax.val(window.dateMax);
      }

      this.getPublicationTaskStat();
    },

    init: function () {
      this.$tasksStatFilterForm = $('.filter-form');
      this.$adId = this.$tasksStatFilterForm.find('.post-id');
      this.$tasksStatFilterDateMin = this.$tasksStatFilterForm.find('.date-from');
      this.$tasksStatFilterDateMax = this.$tasksStatFilterForm.find('.date-to');
      this.$tasksStatTable = $('.table-tasks-stat');

      this.$tasksStatFilterForm.on('submit', {that: this}, this.getPublicationTaskStat);

      this.setFilterValues();
    }
  };

  if ($('#tasks-stat').length) SJA.TasksStat.init();

}(jQuery));