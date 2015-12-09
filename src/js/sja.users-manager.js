(function ($) {
  'use strict';

  var SJA = window.SJA;

  SJA.UsersManager = {
    setSize: function () {
      var windowHeight = $(window).height(),
        $tableUsersWrap = this.element.find('.table-users-wrap'),
        $usersManagerEditFormWrap = this.element.find('.user-manager-edit-form-wrap');

      $tableUsersWrap.css({
        'height': windowHeight - $tableUsersWrap.offset().top
      });

      $usersManagerEditFormWrap.css({
        'height': windowHeight - $usersManagerEditFormWrap.offset().top
      })
    },

    getUserList: function (userId) {
      var userType = this.element.find('.users-manager-filter-role').val();
      var filter = (userType != 0) ? {role: userType} : {};

      var dataToSend = {
        method: 'getUserList',
        params: { filter: filter }
      };

      SJA.ajax(dataToSend, $.proxy(this, 'applyFilter', userId), false, true);

      return false;
    },

    applyFilter: function (userId, data) {
      console.log('Data — ', data);
      console.log('User — ', userId);

      this.$userList.html('');

      for (var i = 0, length = data.length; i < length; i++) {
        var $row = new $('<tr/>'),
          user = data[i],
          role;

        switch (user.role) {
          case 'admin':
            role = 'Админ';
            break;
          case 'fin':
            role = 'Бухгалтер';
            break;
          case 'manager':
            role = 'Менеджер';
            break;
          case 'product':
            role = 'Менеджер продукта';
            break;
          case 'content':
            role = 'Копирайтер';
            break;
          case 'del':
            role = 'Пользователь с отключенным доступом';
            break;
        }

        $row
          .attr('data-id', user.id)
          .data('id', user.id);

        $row.append('<td>' + user.id + '</td>');
        $row.append('<td class="js-login">' + user.login + '</td>');
        $row.append('<td class="js-name">' + user.name + '</td>');
        $row.append('<td class="js-role">' + role + '</td>');

        this.$userList.append($row);
      }

      this.$userList.closest('table').trigger('update');

      this.selectCurrentUser(userId);
    },

    filterByName: function () {
      var val = this.$filterByName.val().toLowerCase();

      if (val.length == 0) this.$userList.find('tr').removeClass('hidden');

      this.$userList.find('tr').each(function (key, row) {
        var $row = $(row);
        var name = $row.find('.js-name').html().toLowerCase();

        if (name.indexOf(val) + 1) {
          $row.removeClass('hidden');
        } else {
          $row.addClass('hidden');
        }
      });
    },

    generatePassword: function () {
      this.selectedUserData.password = SJA.generatePassword(16);
    },

    selectUser: function (event) {
      var $row = $(event.target).closest('tr');

      this.$userList.find('tr').removeClass('active');
      $row.addClass('active');
      this.$userForm.find('.js-created-at').removeClass('hidden');

      this.$userForm.trigger('selectUser', {
        id: $row.data('id')
      });
    },

    getUserData: function (event, data) {
      var dataToSend = {
        method: 'getUser',
        params: { id: data.id }
      };

      SJA.ajax(dataToSend, $.proxy(this, 'refreshUserForm'), false, true);
    },

    refreshUserForm: function (data) {
      if (!data) {
        this.$userForm.addClass('hidden');
        return;
      }

      this.$userForm.removeClass('hidden');

      $.extend(this.selectedUserData, data);

      var date = data.createdAt.substr(0, 10).split('-');

      this.selectedUserData.password = null;
      this.selectedUserData.createdAt = date[2] + '.' + date[1] + '.' + date[0];

      this.refreshUserRoleBlock();
    },

    selectCurrentUser: function (userId) {
      var $rows = this.$userList.find('tr');
      if (!$rows.length) {
        this.refreshUserForm(false);
        return;
      }

      userId ? $rows.find('[data-id=' + userId + ']').click() : $rows.first().click();
    },

    saveUserData: function () {
      var dataToSend = {
        method: this.selectedUserData.id ? 'updateUser' : 'addUser',
        params: this.selectedUserData
      };

      delete dataToSend.params.createdAt;

      SJA.ajax(dataToSend, $.proxy(this, 'afterUserSave'), false, true);
    },

    afterUserSave: function (data) {
      if (!data || data.result === false) {
        alert('Ошибка сохранения данных. Попробуйте позже.');
        return;
      }

      var $userTableRow = this.$userList.find('tr[data-id="' + this.selectedUserData.id + '"]');

      $userTableRow.find('.js-login').html(this.selectedUserData.login);
      $userTableRow.find('.js-name').html(this.selectedUserData.name);
      $userTableRow.find('.js-role').html(this.selectedUserData.role);

      this.getUserList(this.selectedUserData.id || data);
    },

    changeUserRole: function () {
      this.selectedUserData.role = this.$selectUserRoleBlock.find('input[type="radio"]:checked').val();
    },

    refreshUserRoleBlock: function () {
      this.$selectUserRoleBlock.find('input[type="radio"][value="' + this.selectedUserData.role + '"]').trigger('click');
    },

    resetForm: function () {
      this.$userForm.find('.js-created-at').addClass('hidden');
      this.resetUserRole();

      delete this.selectedUserData.id;
      delete this.selectedUserData.productId;

      // this.selectedUserData.createdAt = '';
      this.selectedUserData.login = '';
      this.selectedUserData.password = '';
      this.selectedUserData.name = '';
      this.selectedUserData.description = '';
    },

    resetUserRole: function () {
      var $defaultRoleInput = this.$selectUserRoleBlock.find('.js-default input[type="radio"]');
      $defaultRoleInput.trigger('click');
      this.selectedUserData.role = $defaultRoleInput.val();
    },

    initEvents: function () {
      $(window).on('resize', $.proxy(this, 'setSize'));
      this.$filterByName.on('keyup', $.proxy(this, 'filterByName'));
      this.$userFilter.on('submit', $.proxy(this, 'getUserList'));
      this.element.find('.js-generate-password').on('click', $.proxy(this, 'generatePassword'));
      this.element.find('.js-add-account').on('click', $.proxy(this, 'resetForm'));
      this.$userList.on('click', 'tr:not(.active)', $.proxy(this, 'selectUser'));
      this.$userForm.on('selectUser', $.proxy(this, 'getUserData'));
      this.$userForm.on('submit', $.proxy(this, 'saveUserData'));
      this.$userForm.on('change', 'input[type="radio"]', $.proxy(this, 'changeUserRole'));
    },

    init: function () {
      this.element = $('#users-manager');
      this.$userFilter = this.element.find('.users-manager-form');
      this.$userList = this.element.find('.table-users tbody');
      this.$userForm = this.element.find('.user-manager-edit-form');
      this.$filterByName = this.element.find('.users-manager-filter-name');
      this.$selectUserRoleBlock = this.element.find('.js-user-role');

      this.selectedUserData = SJA.dataBinding(this.$userForm);

      SJA.Common.initTableSorter(this.$userList.closest('table'));

      this.initEvents();
      this.setSize();
      this.getUserList();
    }
  };

  if ($('#users-manager').length) SJA.UsersManager.init();

}(jQuery));