(function ($) {
  var SJA = window.SJA;

  SJA.Adv = {
    getAdvertizerList: function () {
      var that = this;

      SJA.ajax({method: 'getAdvertizerList'}, function (respond) {
        var $tableBody = that.$advTable.find('tbody'),
            el,
            sumTotalIncome = 0,
            sumBalance = 0,
            i, max;

        if (respond.length) {
          for (i = 0, max = respond.length; i < max; i += 1) {
            respond[i].totalIncome = respond[i].totalIncome !== null ? parseInt(respond[i].totalIncome) : 0;
            respond[i].balance = respond[i].balance !== null ? parseInt(respond[i].balance) : 0;

            el = [
              '<tr>',
                '<td class="text-right">' + respond[i].id + '</td>',
                '<td><a href="' + respond[i].editUrl + '">' + respond[i].name + '</a></td>',
                '<td class="text-right view-mode4-hidden view-mode5-hidden">' + (respond[i].totalIncome !== null ? $.number(respond[i].totalIncome, 0, ',', ' ') : 0) + '</td>',
                '<td class="text-right view-mode4-hidden view-mode5-hidden">' + (respond[i].balance !== null ? $.number(respond[i].balance, 0, ',', ' ') : 0) + '</td>',
              '</tr>'
            ].join('');
            $tableBody.append(el);

            sumTotalIncome += respond[i].totalIncome;
            sumBalance += respond[i].balance;
          }

          that.$advTable.find('tfoot tr').append([
            '<td>&nbsp;</td>',
            '<td>&nbsp;</td>',
            '<td class="text-right view-mode4-hidden view-mode5-hidden">' + $.number(sumTotalIncome, 0, ',', ' ') + '</td>',
            '<td class="text-right view-mode4-hidden view-mode5-hidden">' + $.number(sumBalance, 0, ',', ' ') + '</td>'
          ].join(''));

          that.$advTable.trigger('update');
        }
      });
    },

    init: function () {
      this.$advTable = $('.adv-table');

      this.getAdvertizerList();
    }
  };

  if ($('#adv').length) SJA.Adv.init();
}(jQuery));