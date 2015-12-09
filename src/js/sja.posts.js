(function ($) {
    var SJA = window.SJA;
    SJA.Posts = {

        filterSelectedCategories: [],

        checkboxToTdBinding: [
            {checkbox: $('#epks'), td: '.epks'},
            {checkbox: $('#conversion'), td: '.conversion'},
            {checkbox: $('#ctr'), td: '.ctr'},
            {checkbox: $('#cpm'), td: '.cpm'},
            {checkbox: $('#cpc'), td: '.cpc'},
            {checkbox: $('#devices'), td: '.devices'},
            {checkbox: $('#years-old'), td: '.years-old'},
            {checkbox: $('#genders'), td: '.genders'},
            {checkbox: $('#category'), td: '.category'},
            {checkbox: $('#subscription'), td: '.subscription'},
            {checkbox: $('#coverage'), td: '.coverage'},
            {checkbox: $('#customers'), td: '.customers'},
            {checkbox: $('#awaited-price'), td: '.awaited-price'},
            {checkbox: $('#rejected-price'), td: '.rejected-price'},
            {checkbox: $('#accepted-price'), td: '.accepted-price'},
            {checkbox: $('#orders-price'), td: '.orders-price'},
            {checkbox: $('#awaited'), td: '.awaited'},
            {checkbox: $('#rejected'), td: '.rejected'},
            {checkbox: $('#accepted'), td: '.accepted'},
            {checkbox: $('#orders-amount'), td: '.orders-amount'},
            {checkbox: $('#clicks'), td: '.clicks'},
            {checkbox: $('#placed-number'), td: '.placed-number'},
            {checkbox: $('#changes'), td: '.changes'},
            {checkbox: $('#social-network'), td: '.social-network'},
            {checkbox: $('#author-name'), td: '.author-name'},
            {checkbox: $('#activation'), td: '.activation'},
            {checkbox: $('#post-id'), td: '.post-id'}
        ],

        templates: {
            text: [
                '<div class="new-post-item" data-type="text">',
                '<div class="form-group"><textarea class="form-control" cols="30" rows="3" placeholder="Текст поста"></textarea></div>',
                '<button class="item-delete">&times;</button>',
                '</div>'
            ].join(''),

            imgWrap: [
                '<div class="new-post-img-wrap clearfix">',
                '<div class="row"></div>',
                '</div>'
            ].join(''),

            img: [
                '<div class="new-post-item" data-type="img">',
                '<button class="item-delete">&times;</button>',
                '</div>'
            ].join(''),

            pollOk: [
                '<div class="new-post-item" data-type="poll">',
                '<div class="form-group">',
                '<input class="form-control poll-question" type="text" placeholder="Ваш вопрос" />',
                '</div>',
                '<ul class="poll-answers">',
                '<li><div class="form-group"><input class="form-control" type="text" placeholder="Вариант ответа" /></div></li>',
                '<li><div class="form-group"><input class="form-control" type="text" placeholder="Вариант ответа" /></div></li>',
                '</ul>',
                '<div class="form-group">',
                '<div class="checkbox">',
                '<label>',
                '<input type="checkbox" class="multiple-answers"/>',
                '<span class="checkbox-input"></span>Отвечающий может выбрать только один вариант ответа',
                '</label>',
                '</div>',
                '</div>',
                '<button class="item-delete">&times;</button>',
                '</div>'
            ].join(''),

            pollVk: [
                '<div class="new-post-item" data-type="poll">',
                '<div class="form-group">',
                '<input class="form-control poll-question" type="text" placeholder="Ваш вопрос" />',
                '</div>',
                '<ul class="poll-answers">',
                '<li><div class="form-group"><input class="form-control" type="text" placeholder="Вариант ответа" /></div></li>',
                '<li><div class="form-group"><input class="form-control" type="text" placeholder="Вариант ответа" /></div></li>',
                '</ul>',
                '<div class="form-group">',
                '<div class="checkbox">',
                '<label>',
                '<input type="checkbox" class="anonymous"/>',
                '<span class="checkbox-input"></span>Анонимный опрос',
                '</label>',
                '</div>',
                '</div>',
                '<button class="item-delete">&times;</button>',
                '</div>'
            ].join(''),

            pollAnswer: '<li><div class="form-group"><input class="form-control" type="text" placeholder="Вариант ответа" /></div></li>',

            video: [
                '<div class="new-post-item" data-type="video">',
                '<div class="form-group">',
                '<input class="form-control" type="text" placeholder="Ссылка на видео с youtube" />',
                '</div>',
                '<button class="item-delete">&times;</button>',
                '</div>'
            ].join(''),

            videoVk: [
                '<div class="new-post-item" data-type="video">',
                '<button class="item-delete">&times;</button>',
                '</div>'
            ].join(''),

            link: [
                '<div class="new-post-item" data-type="link">',
                '<div class="row">',
                '<div class="col-xs-4">',
                '<div class="form-group">',
                '<select class="form-control link-prefix">',
                '<option value="">Символ</option>',
                '<option value="&#9755;">&#9755;</option>',
                '<option value="&#9754;">&#9754;</option>',
                '<option value="&#9658;&#9658;&#9658;">&#9658;&#9658;&#9658;</option>',
                '<option value="&#9658;">&#9658;</option>',
                '<option value="&#9742;">&#9742;</option>',
                '<option value="&#9990;">&#9990;</option>',
                '</select>',
                '</div>',
                '</div>',
                '<div class="col-xs-8">',
                '<div class="form-group">',
                '<input type="text" class="form-control link-group-url view-mode2-visible-block view-mode21-visible-block" />',
                '<select class="form-control link-group-id restricted-view-hide view-mode2-hidden view-mode21-hidden">',
                '<option value="">Выберите ссылку</option>',
                '</select>',
                '</div>',
                '</div>',
                '</div>',
                '<div class="row link-detached">',
                '<div class="col-xs-12">',
                '<div class="checkbox">',
                '<label>',
                '<input type="checkbox">',
                '<span class="checkbox-input"></span>вставить ссылку отдельным блоком',
                '</label>',
                '</div>',
                '</div>',
                '</div>',
                '<button class="item-delete">&times;</button>',
                '</div>'
            ].join(''),

            repost: [
                '<div class="new-post-item" data-type="repost">',
                '<div class="row">',
                '<div class="col-xs-12">',
                '<input type="text" class="form-control repost-link">',
                '</div>',
                '</div>',
                '<button class="item-delete">&times;</button>',
                '</div>'
            ].join(''),

            newItemBtnsOk: [
                '<div class="new-item-btn-wrap ok clearfix">',
                '<button type="button" class="btn btn-primary" data-type="text">Описание</button>',
                '<button type="button" class="btn btn-primary" data-type="img">Фото</button>',
                '<button type="button" class="btn btn-primary" data-type="video">Видео</button>',
                '<button type="button" class="btn btn-primary" data-type="link">Ссылка</button>',
                '<button type="button" class="btn btn-primary" data-type="poll">Опрос</button>',
                '</div>'
            ].join(''),

            newItemBtnsVk: [
                '<div class="new-item-btn-wrap vk clearfix">',
                '<button type="button" class="btn btn-primary" data-type="text">Описание</button>',
                '<button type="button" class="btn btn-primary" data-type="img">Фото</button>',
                '<button type="button" class="btn btn-primary" data-type="video">Видео</button>',
                '<button type="button" class="btn btn-primary" data-type="document">Документ</button>',
                '<button type="button" class="btn btn-primary" data-type="link">Ссылка</button>',
                '<button type="button" class="btn btn-primary" data-type="poll">Опрос</button>',
                '<button type="button" class="btn btn-primary view-mode21-visible-inline-block" data-type="repost">Repost</button>',
                '</div>'
            ].join(''),

            oneMore: '<div class="one-more"><button type="button" class="btn-one-more"></button></div>',

            tablePostsStatRow: _.template($('#tablePostsStatRowTemplate').html())
        },

        saveSelectedValue: function () {
            this.filterSelectedCategories = this.$filtercat.val().split(',');
        },

        activateCheckbox: function () {
            $("#activation, #post-id").prop({
                "checked": true,
                "disabled": true
            });
        },

        createNewPost: function (e) {
            var that = e ? e.data.that : this,
                $socSelect = e ? $(this) : that.$modal.find('select.new-post-soc-network');

            if (!that.$modal.data('id')) {
                that.$modal.data('id', 0);
            }

            that.socNetwork = parseInt($socSelect.val());

            $socSelect[0].selectize.disable();

            that.$modalBody.empty();

            if (that.socNetwork === 1) {
                that.$modalBody.append(that.templates.newItemBtnsOk);
                that.appears.show();

            } else if (that.socNetwork === 2) {
                that.appears.show();
                that.$modalBody.append(that.templates.text)
                    .append(that.templates.imgWrap).find('.new-post-img-wrap:last').addClass('vk images').hide().end()
                    .append(that.templates.imgWrap).find('.new-post-img-wrap:last').addClass('docs').hide().end()
                    .append(that.templates.pollVk).find('[data-type=poll]').hide().end()
                    .append(that.templates.repost).find('[data-type=repost]').hide().end()
                    .append(that.templates.newItemBtnsVk);

                if (that.viewMode === 21) {
                    that.$modalBody.find('.new-item-btn-wrap').addClass('extended');
                }
            }

            that.$modalFooter.find('.btn').removeAttr('disabled');
        },

        addNewItem: function (e) {
            var that = e.data.that,
                $this = $(this),
                $container,
                oneMore,
                $newItem,
                type;

            if (that.socNetwork === 1) {

                if ($this.closest('.one-more').length) {
                    $container = $this.closest('.one-more');
                    oneMore = true;
                } else {
                    $container = $this.closest('.new-item-btn-wrap');
                    oneMore = false;
                }

                switch ($this.data('type')) {
                    case 'text':
                        $newItem = that.templates.text;
                        break;

                    case 'img':
                        $newItem = $(that.templates.imgWrap).addClass('ok');
                        break;

                    case 'video':
                        $newItem = that.templates.video;
                        break;

                    case 'link':
                        $newItem = $(that.templates.link);
                        $newItem.find('select').selectize(SJA.Config.selectizeOptions);
                        if (!that.restrictedView) {
                            $newItem.find('.link-group-url').hide();
                        }
                        that.getProduct.apply(that, [$newItem]);
                        break;

                    case 'poll':
                        $newItem = that.templates.pollOk;
                        break;
                }

                if ($this.data('type') !== 'img' && that.$modalBody.find('.new-post-item').length > 0) {
                    $container.before(that.templates.oneMore);
                }

                if ($this.data('type') === 'img') {
                    if ($container.prev('div').hasClass('new-post-img-wrap') !== true) {
                        $container.before(that.templates.oneMore);
                        $container.before($newItem);
                    }

                    that.$imgContainer = $container.prev('.new-post-img-wrap');

                    that.$addPhotoModal.modal('show');
                } else {
                    $container.before($newItem);
                }

                if (oneMore) {
                    $container.closest('.one-more').find('.btn-one-more').show();
                    $container.find('.new-item-btn-wrap').remove();
                }
            } else if (that.socNetwork === 2) {
                type = $(this).data('type');

                if (type === 'text' || type === 'link') {
                    that.$modalBody.find('.new-post-item[data-type=text], .new-post-item[data-type=link]').last()
                        .after(that.templates[type]);

                    if (type === 'link') {
                        if (!that.restrictedView) {
                            that.$modalBody.find('.new-post-item[data-type=link]:last .link-group-url').hide();
                        }

                        if (that.viewMode === 21) {
                            that.$modalBody.find('.new-post-item[data-type=link]:last .link-detached').show();
                        }

                        that.$modalBody.find('.new-post-item[data-type=link]:last select').selectize(SJA.Config.selectizeOptions).end();
                        that.getProduct.apply(that, [that.$modalBody.find('.new-post-item[data-type="link"]:last')]);
                    }

                } else if (type === 'video') {
                    that.$addVideoModal.modal('show');
                } else if (type === 'img') {
                    $newItem = that.$modalBody.find('.new-post-img-wrap.images');

                    if (!$newItem.is(':visible')) {
                        $newItem.show();
                    }

                    that.$imgContainer = $newItem;
                    that.$addPhotoModal.modal('show');
                } else if (type === 'document') {
                    $newItem = that.$modalBody.find('.new-post-img-wrap.docs');

                    if (!$newItem.is(':visible')) {
                        $newItem.show();
                    }

                    that.$imgContainer = $newItem;
                    that.$uploadImgForm.find('input').click();
                } else {
                    $newItem = that.$modalBody.find('.new-post-item[data-type=' + type + ']');

                    if ($newItem.is(':visible')) {
                        $newItem.hide();
                    } else {
                        $newItem.show();
                    }
                }
            }
        },

        addOneMoreItem: function (e) {
            var that = e.data.that;

            $(this).hide().closest('.one-more').append(that.templates.newItemBtnsOk);
        },

        uploadImg: function (e) {
            var that = e.data.that,
                formData = new FormData($(this).closest('form')[0]);

            that.uploadImgRequest(
                that,
                formData,
                {
                    cache: false,
                    contentType: false,
                    processData: false
                }
            );
        },

        uploadRemoteImg: function (imgUrl) {
            this.$newImg = $(this.templates.img);

            SJA.ajax(
                {
                    method: 'addImage',
                    params: {
                        url: imgUrl
                    }
                },
                $.proxy(this.uploadImgRequestSuccess, this),
                $.proxy(this.uploadImgRequestBeforeSend, this),
                $.proxy(this.uploadImgRequestError, this)
            );
        },

        uploadImgRequest: function (that, dataToSend, requestAttribs) {
            that.$newImg = $(that.templates.img);

            $.ajax($.extend({
                type: 'POST',
                url: SJA.Config.postsImgUploadUrl,
                data: dataToSend,
                beforeSend: $.proxy(that.uploadImgRequestBeforeSend, that),
                success: $.proxy(that.uploadImgRequestSuccess, that),
                error: $.proxy(that.uploadImgRequestError, that)
            }, requestAttribs))
        },

        uploadImgRequestBeforeSend: function () {
            if (this.$imgContainer.find('.row:last .new-post-item').length === 3) {
                this.$imgContainer.append('<div class="row"></div>');
            }

            if (this.socNetwork === 1) {
                this.$newImg.addClass('col-xs-4');
            } else if (this.socNetwork === 2) {
                if (this.$imgContainer.hasClass('images')) {
                    this.setPreviewSize.apply(this, [this.$newImg]);
                } else {
                    this.$newImg.data('type', 'document').addClass('col-xs-4');
                }
            }

            this.$imgContainer.find('.row:last').append(this.$newImg);
        },

        uploadImgRequestSuccess: function (respond) {
            this.$modal.find('.error-photo-upload').remove();
            if (!respond.result && (respond.errorText || respond == 'error')) {
                var errorText = respond.errorText || false;
                this.uploadImgRequestError(errorText);
                return;
            }
            if (respond.file) {
                respond = respond.file;
            }

            this.$uploadImgForm[0].reset();
            this.$newImg.css('background-image', 'none').append('<img src="' + (SJA.Config.postsImgUrl + respond) + '" alt="" data-url="' + respond + '" />').find('img').load();
        },

        uploadImgRequestError: function (errorText) {
            if (!errorText) {
                errorText = 'Ошибка загрузки фото.';
            }

            this.$modal.find('input[type=submit]').after('<p class="error-msg error-photo-upload">' + errorText + '</p>');
            this.$newImg.find('.item-delete').click();
        },

        deleteItem: function () {
            var $newPostItem = $(this).closest('.new-post-item'),
                $newPostItemWrap;

            if ($newPostItem.data('type') !== 'img') {
                if ($newPostItem.prev('.one-more').length) {
                    $newPostItem.prev('.one-more').remove();
                }

                $newPostItem.remove();
            } else {
                $newPostItemWrap = $newPostItem.closest('.new-post-img-wrap');

                if ($newPostItem.closest('.new-post-img-wrap.images').hasClass('vk')) {
                    switch ($newPostItem.closest('.row').find('.new-post-item').length) {
                        case 3:
                            $newPostItem.closest('.row').find('.new-post-item').removeClass('col-xs-4').addClass('col-xs-6');
                            break;
                        case 2:
                            $newPostItem.closest('.row').find('.new-post-item').removeClass('col-xs-6').addClass('col-xs-12');
                            break;
                    }
                }

                if ($newPostItem.closest('.row').find('.new-post-item').length === 1) {
                    if ($newPostItemWrap.find('.row').length === 1) {
                        if ($newPostItemWrap.hasClass('ok')) {
                            if ($newPostItemWrap.prev('.one-more').length) {
                                $newPostItemWrap.prev('.one-more').remove();
                            }

                            $newPostItemWrap.remove();
                        } else {
                            $newPostItemWrap.hide().find('.row').empty();
                        }
                    } else {
                        $newPostItem.closest('.row').remove();
                    }
                } else {
                    $newPostItem.remove();
                }
            }
        },

        saveAd: function (e) {
            var that = e ? e.data.that : this,
                duplicate = e ? e.data.duplicate : false,
                dataToSend = {
                    method: 'saveAd',
                    params: {
                        id: that.$modal.data('id') || 0,
                        enabled: that.$modal.data('enabled') ? that.$modal.data('enabled') : false,
                        productId: that.productId,
                        adAuthorId: that.$modal.find('.new-post-author').val(),
                        snId: that.socNetwork,
                        age: that.$modal.find('.age-post').val() !== 'null' ? $('.age-post').val() : null,
                        gender: that.$modal.find('.gender-post').val() !== 'null' ? $('.gender-post').val() : null,
                        device: that.$modal.find('.device-post').val() !== 'null' ? $('.device-post').val() : null,
                        category: that.$modal.find('.cat-post').val() !== 'null' ? $('.cat-post').val() : null,
                        adContent: []
                    }
                },
                items = that.$modal.find('.new-post-item:visible'),
                link,
                ans,
                adContent,
                i, j, max, ansMax;

            adContent = dataToSend.params.adContent;

            for (i = 0, max = items.length; i < max; i += 1) {
                switch ($(items[i]).data('type')) {
                    case 'text':
                        adContent.push({
                            type: 'text',
                            text: $(items[i]).find('textarea').val()
                        });
                        break;

                    case 'img':
                        adContent.push({
                            type: 'image',
                            file: $(items[i]).find('img').data('url')
                        });
                        break;

                    case 'video':
                        adContent.push({
                            type: 'video',
                            url: dataToSend.params.snId === 1 ? $(items[i]).find('input').val() : $(items[i]).find('iframe').data('url')
                        });
                        break;

                    case 'document':
                        adContent.push({
                            type: 'document',
                            file: $(items[i]).find('img').data('url')
                        });
                        break;

                    case 'poll':
                        adContent.push({
                            type: 'poll',
                            question: $(items[i]).find('.poll-question').val(),
                            answers: [],
                            multipleAnswers: $(items[i]).find('.multiple-answers').prop('checked') !== true,
                            anonymous: $(items[i]).find('.anonymous').prop('checked')
                        });

                        ans = $(items[i]).find('.poll-answers input');

                        for (j = 0, ansMax = ans.length; j < ansMax; j += 1) {
                            if ($(ans[j]).val() !== '') {
                                adContent[adContent.length - 1].answers.push($(ans[j]).val());
                            }
                        }
                        break;

                    case 'link':
                        link = {
                            type: 'link',
                            prefix: $(items[i]).find('select.link-prefix').val()
                        }

                        if (!that.restrictedView) {
                            link.linkGroupId = $(items[i]).find('.link-group-id').val();
                        } else {
                            link.linkGroupId = $(items[i]).find('.link-group-url').data('linkGroupId') || 0;
                            link.url = $(items[i]).find('.link-group-url').val();
                        }

                        if (that.viewMode === 21 && $(items[i]).find('.link-detached input').prop('checked')) {
                            link.detached = true;
                        }

                        adContent.push(link);
                        break;

                    case 'repost':
                        adContent.push({
                            type: 'repost',
                            url: $(items[i]).find('input').val()
                        });
                        break;
                };
            }

            that.$modal.find('.error-msg').remove();

            SJA.ajax(dataToSend, function (respond) {
                if (respond.result) {
                    if (!duplicate) {
                        that.$modal.modal('hide');
                    }

                    that.getAdStat.apply(that);
                } else {
                    that.$modal.find('input[type=submit]').after('<p class="error-msg">' + respond.errorText + '</p>');
                }
            });
        },

        getAuthorNames: function () {
            var that = this,
                dataToSend = {
                    method: 'getAuthorNames',
                    params: {
                        enabled: null
                    }
                };

            SJA.ajax(dataToSend, function (response) {
                var authorSelect = that.$modal.find('.new-post-author')[0].selectize,
                    i, authorMax;

                if (response !== null) {
                    for (i = 0, authorMax = response.length; i < authorMax; i += 1) {
                        authorSelect.addOption({value: response[i].id, text: response[i].name});
                    }
                }
            });
        },

        getProduct: function ($newItem, setValue, setUrl) {
            var that = this,
                dataToSend = {
                    method: 'getProduct',
                    params: {
                        productId: this.productId
                    }
                };

            SJA.ajax(dataToSend, function (respond) {
                var linksSelect,
                    i, maxGroup;

                if (respond !== null) {
                    if ($newItem) {
                        if (that.restrictedView) {
                            $newItem.find('.link-group-url').data('linkGroupId', setValue).val(setUrl ? setUrl : '');
                        } else {
                            $newItem.find('.link-group-url').hide();

                            linksSelect = $newItem.find('select.link-group-id')[0].selectize;

                            for (i = 0, maxGroup = respond.linkGroupList.length; i < maxGroup; i += 1) {
                                if (respond.linkGroupList[i].tb != 1) {
                                    linksSelect.addOption({
                                        value: respond.linkGroupList[i].id,
                                        text: respond.linkGroupList[i].name
                                    });
                                }
                            }

                            if (setValue) {
                                linksSelect.setValue(setValue);
                            }
                        }
                    }
                }
            });
        },

        getCategoryAdCount: function (callback) {
            var that = this,
                dataToSend = {
                    method: 'getCategoryAdCount',
                    params: {
                        productId: this.productId
                    }
                };

            SJA.ajax(dataToSend, function (respond) {
                if (respond) {
                    callback && callback(respond);
                }
            });
        },


        setProductTitle: function () {
            var dataToSend = {
                method: 'getProduct',
                params: {
                    productId: this.productId
                }
            };

            SJA.ajax(dataToSend, function (respond) {
                if (respond) {
                    $('.breadcrumb').append('<li><a href="' + respond.editUrl + '">' + respond.name + '</a></li><li class="active">Посты</li>');
                }
            });
        },

        getAdStat: function () {
            var that = this,
                $tbody = this.$tablePostsStat.find('tbody'),
                $tfoot = this.$tablePostsStat.find('tfoot'),
                dataToSend = {
                    method: 'getAdStat',
                    params: {
                        productId: this.productId,
                        filter: {
                            enabled: $('.posts-filter-enabled').val() === '0' ? null : $('.posts-filter-enabled').val(),
                            snId: $('.posts-filter-soc-network').val() === '0' ? null : $('.posts-filter-soc-network').val(),
                            age: $('.posts-filter-age').val() === '0' ? null : $('.posts-filter-age').val(),
                            device: $('.posts-filter-device').val() === '0' ? null : $('.posts-filter-device').val(),
                            gender: $('.posts-filter-gender').val() === '0' ? null : $('.posts-filter-gender').val(),
                            category: !$('.posts-filter-cat').val() ? null : $('.posts-filter-cat').val().split(','),
                            dateMin: $('.posts-date-min').val(),
                            dateMax: $('.posts-date-max').val(),
                        }
                    }
                };

            $tbody.empty();
            $tfoot.empty();


            SJA.ajax(dataToSend, function (respond) {
                var row, total,
                    totalPostsTitle,
                    totalsPostsLastNumber,
                    $infoIcon,
                    i, j, rowMax, logMax;

                this.getCategoryAdCount(function (categories) {

                    var categorySelect = that.$modal.find('.cat-post')[0].selectize;
                    var filterSelect = this.$filtercat[0].selectize;
                    categorySelect.clearOptions();
                    filterSelect.clearOptions();

                    for (var i in categories) {
                        categorySelect.addOption({value: categories[i].id, text: categories[i].name});
                        filterSelect.addOption({
                            item: categories[i].id,
                            text: categories[i].name + ' (' + categories[i].count + ')'
                        });
                    }
                    if (respond.rows && respond.rows.length) {


                        total = respond.total;

                        for (i = 0, rowMax = respond.rows.length; i < rowMax; i += 1) {
                            row = respond.rows[i];
                            row.viewMode = this.viewMode;

                            switch (row.gender) {
                                case '0':
                                    row.gender = 'любой';
                                    break;
                                case '1':
                                    row.gender = 'мужской';
                                    break;
                                case '2':
                                    row.gender = 'женский';
                                    break;
                                default :
                                    row.gender = 'любой';
                                    break;
                            }

                            switch (row.age) {
                                case '0':
                                    row.age = 'любой';
                                    break;
                                case '1':
                                    row.age = 'до 18';
                                    break;
                                case '2':
                                    row.age = '18-24';
                                    break;
                                case '3':
                                    row.age = '25-34';
                                    break;
                                case '4':
                                    row.age = '35+';
                                    break;
                                default :
                                    row.age = 'любой';
                                    break;
                            }

                            row.cat = 'Любая';
                            for (var categoryIndex in categories) {
                                if (categories[categoryIndex].id == row.category) {
                                    row.cat = categories[categoryIndex].name;
                                }
                            }

                            $tbody.append(this.templates.tablePostsStatRow(row));

                            $infoIcon = $tbody.find('tr:last .icon-info');

                            if (row.startedAt === null || that.restrictedView) {
                                $tbody.find('tr:last .dropdown-menu li:eq(0)').after('<li><a href="#" class="post-edit">Редактировать</a></li>');
                            } else {
                                $infoIcon.removeClass('hide').attr('title', ('<div>' + row.startedAt + '</div>'));
                            }

                            if (row.statusLog.length) {
                                for (j = 0, logMax = row.statusLog.length; j < logMax; j += 1) {
                                    if (j === 0 || j === 1) {
                                        $tbody.find('tr:last .product-stat-last-change')
                                            .append('<div class="' + (row.statusLog[j].status === '1' ? 'text-success' : 'text-danger') + '">' + row.statusLog[j].createdAt + '</div>')
                                    }

                                    $infoIcon.attr('title', $infoIcon.attr('title') + ('<div class="' + (row.statusLog[j].status == 1 ? 'text-success' : 'text-danger') + '">' + row.statusLog[j].createdAt + '</div>'));
                                }
                            }
                        }

                        totalsPostsLastNumber = total.productCount % 10;

                        if (totalsPostsLastNumber === 0 || (totalsPostsLastNumber >= 5 && totalsPostsLastNumber <= 9)) {
                            totalPostsTitle = ' постов';
                        } else if (totalsPostsLastNumber === 1) {
                            totalPostsTitle = ' пост';
                        } else if (totalsPostsLastNumber >= 2 && totalsPostsLastNumber <= 4) {
                            totalPostsTitle = ' поста';
                        }

                        $tfoot.append([
                            '<tr>',
                            '<td class="post-id">' + (total.productCount + totalPostsTitle) + '</td>',
                            '<td class="activation"></td>',
                            '<td class="restricted-view-hide view-mode2-hidden view-mode21-hidden author-name"></td>',
                            '<td class="category"></td>',
                            '<td class="restricted-view-hide view-mode2-hidden view-mode21-hidden social-network"></td>',
                            '<td class="genders"></td>',
                            '<td class="years-old"></td>',
                            '<td class="devices"></td>',
                            '<td class="changes"></td>',
                            '<td class="placed-number"></td>',
                            '<td class="text-right clicks">' + $.number(total.clickCount, 0, ',', ' ') + ' / ' + $.number(total.clickUniqCount, 0, ',', ' ') + '</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode6-hidden view-mode21-hidden orders-amount">' + $.number(total.orderCount, 0, ',', ' ') + '</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode6-hidden view-mode21-hidden accepted">' + $.number(total.saleCount, 0, ',', ' ') + '</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode6-hidden view-mode21-hidden rejected">' + $.number(total.declineCount, 0, ',', ' ') + '</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode6-hidden view-mode21-hidden awaited">' + $.number(total.waitCount, 0, ',', ' ') + '</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode6-hidden view-mode21-hidden orders-price">' + $.number(total.orderIncome, 0, ',', ' ') + ' р.</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode6-hidden view-mode21-hidden accepted-price">' + $.number(total.income, 0, ',', ' ') + ' р.</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode6-hidden view-mode21-hidden rejected-price">' + $.number(total.declineIncome, 0, ',', ' ') + ' р.</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode6-hidden view-mode21-hidden awaited-price">' + $.number(total.waitIncome, 0, ',', ' ') + ' р.</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode6-hidden view-mode21-hidden conversion">' + (total.saleRatio !== null ? $.number(row.saleRatio * 100, 2, ',', ' ') + '%' : '-' ) + '</td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode21-hidden cpc"><strong>' + $.number(total.totalCpc, 0, ',', ' ') + ' р. / ' + $.number(total.cpc, 0, ',', ' ') + ' р.</strong></td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode21-hidden coverage"><strong>' + (total.viewCount !== null ? $.number(total.viewCount, 0, ',', ' ') : '-') + '</strong></td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode21-hidden cpm"><strong>' + (total.cpm !== null ? $.number(total.cpm, 2, ',', ' ') + ' р.' : '-') + '</strong></td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode21-hidden ctr"><strong>' + (total.ctr !== null ? $.number(total.ctr, 2, ',', ' ') : '-') + '</strong></td>',
                            '<td class="text-right subscription"><strong>' + $.number(total.totalChannelUserCount, 0, ',', ' ') + ' / ' + $.number(total.channelUserCount, 0, ',', ' ') + '</strong></td>',
                            '<td class="text-right restricted-view-hide view-mode2-hidden view-mode21-hidden epks"><strong>' + (row.totalEpks !== null ? $.number(total.totalEpks, 2, ',', ' ') + ' р.' : '-') + ' / ' + (row.epks !== null ? $.number(total.epks, 2, ',', ' ') + ' р.' : '-') + '</strong></td>',
                            '</tr>'
                        ].join(''));

                        $('[data-toggle="tooltip"]').tooltip({
                            html: true
                        });

                        that.$tablePostsStat.trigger('update');
                    }

                    if (localStorage['checked']) {
                        that.showHideTdFromLocalStorage();
                        that.checkCheckboxesWithLocalStorage();
                    }
                    else {
                        that.checkboxInputs.attr("checked", true);
                    }

                }.bind(this));
            }.bind(this));
        },

        showHideTdFromLocalStorage: function () {
            var storedData = JSON.parse(localStorage['checked']);
            for (var i = 0; i < storedData.length; i++) {
                var storage = storedData[i];
                for (var key in storage) {
                    var status = storage[key];
                    if (status) {
                        $('.' + key).show();
                    }
                    else if (!status) {
                        $('.' + key).hide();
                    }

                }
            }
        },


        checkCheckboxesWithLocalStorage : function () {
            var storedData = JSON.parse(localStorage['checked']);
            for (var i = 0; i < storedData.length; i++) {
                var storage = storedData[i];
                for (var key in storage) {
                    var status = storage[key];
                    if (status) {
                        $('#' + key).attr('checked', true);
                    }
                    else if (!status) {
                        $('#' + key).attr('checked', false);
                    }
                }
            }
            if ($('.customers-inputs [type="checkbox"]').is(':checked')){
                $('#customers').attr('checked', true)
            }
            if ($('.orders-inputs [type="checkbox"]').is(':checked')) {
                $('#orders').attr('checked', true);
            }
            if ($('.common-inputs [type="checkbox"]').is(':checked')) {
                $('#common').attr('checked', true)
            }
            if ($('.indicator-inputs [type="checkbox"]').is(':checked')) {
                 $('#indicators').attr('checked', true)
            }
            if ($('.traffic-inputs [type="checkbox"]').is(':checked')) {
                 $('#traffic').attr('checked', true)
            }
        },


        storeInLocalStorage: function () {

            var checkedList = this.checkboxToTdBinding.map(function (checkBox) {
                var c = {};
                c[checkBox.checkbox.attr('id')] = checkBox.checkbox.is(":checked");
                return c;
            });
            localStorage['checked'] = JSON.stringify(checkedList);
        },


        fillCheckboxTable: function () {
            var that = this;

            //checkbox
            $('#indicators').on('click', function () {
                $('.indicator-inputs [type="checkbox"]').prop('checked', this.checked)
            });
            $('#common').on('click', function () {
                $('.common-inputs [type="checkbox"]').prop('checked', this.checked);
                that.activateCheckbox();

            });
            $('#traffic').on('click', function () {
                $('.traffic-inputs [type="checkbox"]').prop('checked', this.checked)
            });
            $('#orders').on('click', function () {
                $('.orders-inputs [type="checkbox"]').prop('checked', this.checked)
            });
            $('#customers').on('click', function () {
                $('.customers-inputs [type="checkbox"]').prop('checked', this.checked)
            });
            //checkbox

            this.showHideBtn.on('click', function () {
                that.storeInLocalStorage();
                that.showHideTdFromLocalStorage();

                that.checkboxTable.modal('hide');
            });
        },


        setAdEnabled: function () {
            var $checkbox = $(this),
                dataToSend = {
                    method: 'setAdEnabled',
                    params: {
                        adId: $checkbox.closest('tr').data('id'),
                        enabled: $checkbox.prop('checked')
                    }
                };

            SJA.ajax(dataToSend, function (respond) {
                if (!respond.result) {
                    $checkbox.prop('checked', $checkbox.prop('checked') ? false : true);
                }
            });
        },

        deletePostDropdown: function (e) {
            e.preventDefault();

            var that = e.data.that;

            that.deleteAd.apply(that, [$(this).closest('tr').data('id')]);
        },

        deletePostModal: function (e) {
            var that = e.data.that;

            that.$viewModal.modal('hide');
            that.deleteAd.apply(that, [that.$viewModal.data('id')]);
        },

        deleteAd: function (id) {
            var that = this,
                dataToSend = {
                    method: 'deleteAd',
                    params: {
                        adId: id
                    }
                };

            SJA.ajax(dataToSend, function (respond) {
                if (respond.result) {
                    that.getAdStat.apply(that);
                }
            });
        },

        clearModal: function (e) {
            var $modal = $(e.target);

            if ($modal.hasClass('new-post-modal')) {
                $modal.data('id', 0);
                $modal.find('select.new-post-soc-network')[0].selectize.clear();
                $modal.find('select.new-post-soc-network')[0].selectize.enable();
                $modal.find('select.new-post-author')[0].selectize.clear();
                $modal.find('select.age-post')[0].selectize.setValue(null);
                $modal.find('select.gender-post')[0].selectize.setValue(null);
                $modal.find('select.device-post')[0].selectize.setValue(null);
                $modal.find('select.cat-post')[0].selectize.setValue(null);
                $modal.find('.btn.btn-primary').attr('disabled', 'disabled');
            }

            $modal.find('.error-msg').remove();
            $modal.find('.modal-body').empty();
        },

        addPollAnswer: function (e) {
            var that = e.data.that,
                $pollItem = $(this).closest('li');

            if (!$pollItem.next('li').length) {
                $pollItem.closest('ul').append(that.templates.pollAnswer);
            }
        },

        duplicatePostDropdown: function (e) {
            e.preventDefault();

            var that = e.data.that;

            that.editPost.apply(that, [false, true, $(this).closest('tr').data('id')]);
        },

        duplicatePostModal: function (e) {
            var that = e.data.that;

            that.$viewModal.modal('hide');
            that.editPost.apply(that, [false, true, that.$viewModal.data('id')]);
        },

        editPost: function (e, duplicate, id) {
            if (e) e.preventDefault();

            var that = e ? e.data.that : this,
                duplicate = e ? e.data.duplicate : duplicate,
                dataToSend = {
                    method: 'getAd',
                    params: {
                        adId: e ? $(this).closest('tr').data('id') : id
                    }
                };

            SJA.ajax(dataToSend, function (respond) {
                var $newItem,
                    $imgContainer,
                    $docsContainer,
                    $pollContainer,
                    i, j, itemsMax, ansMax;

                if (respond !== null) {
                    that.$modal.data({
                        'id': duplicate ? 0 : respond.id,
                        'enabled': duplicate ? false : respond.enabled
                    });
                    that.$modal.find('select.new-post-soc-network')[0].selectize.setValue(respond.snId);
                    that.$modal.find('select.new-post-author')[0].selectize.setValue(respond.adAuthorId);
                    that.$modal.find('select.age-post')[0].selectize.setValue(respond.age);
                    that.$modal.find('select.gender-post')[0].selectize.setValue(respond.gender);
                    that.$modal.find('select.device-post')[0].selectize.setValue(respond.device);
                    that.$modal.find('select.cat-post')[0].selectize.setValue(respond.category);

                    that.createNewPost.apply(that);

                    if (respond.snId === '1') {
                        for (i = 0, itemsMax = respond.adContent.length; i < itemsMax; i += 1) {
                            switch (respond.adContent[i].type) {
                                case 'text':
                                    $newItem = $(that.templates.text);
                                    $newItem.find('textarea').text(respond.adContent[i].text);
                                    break;

                                case 'image':
                                    $newItem = $(that.templates.img).addClass('col-xs-4').css('background-image', 'none');
                                    $newItem.append('<img src="' + (SJA.Config.postsImgUrl + respond.adContent[i].file) + '" alt="" data-url="' + respond.adContent[i].file + '" />').find('img').load();
                                    break;

                                case 'video':
                                    $newItem = $(that.templates.video);
                                    $newItem.find('input').val(respond.adContent[i].url);
                                    break;

                                case 'poll':
                                    $newItem = $(that.templates.pollOk);
                                    $newItem.find('.poll-question').val(respond.adContent[i].question);
                                    $newItem.find('.multiple-answers').prop('checked', respond.adContent[i].multipleAnswers !== true);
                                    $newItem.find('.poll-answers').empty();
                                    for (j = 0, ansMax = respond.adContent[i].answers.length; j < ansMax; j += 1) {
                                        $newItem.find('.poll-answers').append(that.templates.pollAnswer).find('li:last input').val(respond.adContent[i].answers[j]);
                                    }
                                    $newItem.find('.poll-answers').append(that.templates.pollAnswer);
                                    break;

                                case 'link':
                                    $newItem = $(that.templates.link);
                                    $newItem.find('select').selectize(SJA.Config.selectizeOptions);
                                    $newItem.find('select.link-prefix')[0].selectize.setValue(respond.adContent[i].prefix);
                                    that.getProduct.call(that, $newItem, respond.adContent[i].linkGroupId, respond.adContent[i].url);
                                    break;
                            }

                            if (respond.adContent[i].type !== 'image') {
                                if (that.$modal.find('.new-item-btn-wrap').prev('.new-post-item').length || that.$modal.find('.new-item-btn-wrap').prev('.new-post-img-wrap').length) {
                                    that.$modal.find('.new-item-btn-wrap').before(that.templates.oneMore);
                                }

                                that.$modal.find('.new-item-btn-wrap').before($newItem);
                            } else {
                                if (!that.$modal.find('.new-item-btn-wrap').prev('.new-post-img-wrap').length) {
                                    that.$modal.find('.new-item-btn-wrap').before(that.templates.oneMore);
                                    that.$modal.find('.new-item-btn-wrap').before(that.templates.imgWrap);
                                }

                                $imgContainer = that.$modal.find('.new-item-btn-wrap').prev('.new-post-img-wrap');

                                if ($imgContainer.find('.row:last').find('new-post-item').length === 3) {
                                    $imgContainer.append('<div class="row"></div>');
                                }

                                $imgContainer.find('.row:last').append($newItem);
                            }
                        }
                    } else if (respond.snId === '2') {
                        for (i = 0, itemsMax = respond.adContent.length; i < itemsMax; i += 1) {
                            switch (respond.adContent[i].type) {
                                case 'text':
                                    if (!that.$modal.find('.new-post-item[data-type=text] textarea').text().length) {
                                        that.$modal.find('.new-post-item[data-type=text]').show()
                                            .find('textarea').text(respond.adContent[i].text);
                                    } else {
                                        $newItem = $(that.templates.text);
                                        $newItem.find('textarea').text(respond.adContent[i].text);
                                    }

                                    break;

                                case 'image':
                                    $imgContainer = that.$modal.find('.new-post-img-wrap.images');
                                    $imgContainer.show();

                                    if ($imgContainer.find('.row:last .new-post-item').length === 3) {
                                        $imgContainer.append('<div class="row"></div>');
                                    }

                                    $imgContainer.find('.row:last')
                                        .append(that.templates.img).find('.new-post-item:last').css('background-image', 'none')
                                        .append('<img src="' + (SJA.Config.postsImgUrl + respond.adContent[i].file) + '" alt="" data-url="' + respond.adContent[i].file + '" />').find('img').load();

                                    switch ($imgContainer.find('.row:last .new-post-item').length) {
                                        case 1:
                                            $imgContainer.find('.row:last .new-post-item').addClass('col-xs-12');
                                            break;
                                        case 2:
                                            $imgContainer.find('.row:last .new-post-item').removeClass('col-xs-12').addClass('col-xs-6');
                                            break;
                                        case 3:
                                            $imgContainer.find('.row:last .new-post-item').removeClass('col-xs-6').addClass('col-xs-4');
                                            break;
                                    }
                                    break;

                                case 'video':
                                    $imgContainer = that.$modal.find('.new-post-img-wrap.images');
                                    $imgContainer.show();

                                    if ($imgContainer.find('.row:last .new-post-item').length === 3) {
                                        $imgContainer.append('<div class="row"></div>');
                                    }

                                    $imgContainer.find('.row:last')
                                        .append(that.templates.videoVk).find('.new-post-item:last').css('background-image', 'none')
                                        .append(that.getVideoPreview(respond.adContent[i].url));

                                    switch ($imgContainer.find('.row:last .new-post-item').length) {
                                        case 1:
                                            $imgContainer.find('.row:last .new-post-item').addClass('col-xs-12');
                                            break;
                                        case 2:
                                            $imgContainer.find('.row:last .new-post-item').removeClass('col-xs-12').addClass('col-xs-6');
                                            break;
                                        case 3:
                                            $imgContainer.find('.row:last .new-post-item').removeClass('col-xs-6').addClass('col-xs-4');
                                            break;
                                    }
                                    break;

                                case 'document':
                                    $docsContainer = that.$modal.find('.new-post-img-wrap.docs');

                                    if ($docsContainer.find('.row:last .new-post-item').length === 3) {
                                        $docsContainer.append('<div class="row"></div>');
                                    }

                                    $docsContainer.show().find('.row:last')
                                        .append(that.templates.img).find('.new-post-item:last').addClass('col-xs-4').data('type', 'document').css('background-image', 'none')
                                        .append('<img src="' + (SJA.Config.postsImgUrl + respond.adContent[i].file) + '" alt="" data-url="' + respond.adContent[i].file + '" />').find('img').load();
                                    break;

                                case 'poll':
                                    $pollContainer = that.$modal.find('.new-post-item[data-type=poll]');
                                    $pollContainer.show();
                                    $pollContainer.find('.poll-question').val(respond.adContent[i].question);
                                    $pollContainer.find('.anonymous').prop('checked', respond.adContent[i].anonymous);
                                    $pollContainer.find('.poll-answers').empty();
                                    for (j = 0, ansMax = respond.adContent[i].answers.length; j < ansMax; j += 1) {
                                        $pollContainer.find('.poll-answers').append(that.templates.pollAnswer).find('li:last input').val(respond.adContent[i].answers[j]);
                                    }
                                    $pollContainer.find('.poll-answers').append(that.templates.pollAnswer);
                                    break;

                                case 'link':
                                    $newItem = $(that.templates.link);
                                    $newItem.show();
                                    $newItem.find('select').selectize(SJA.Config.selectizeOptions);
                                    $newItem.find('select.link-prefix')[0].selectize.setValue(respond.adContent[i].prefix);
                                    that.getProduct.call(that, $newItem, respond.adContent[i].linkGroupId, respond.adContent[i].url);
                                    break;
                            }

                            if ($newItem && (respond.adContent[i].type === 'text' || respond.adContent[i].type === 'link')) {
                                that.$modal.find('.modal-body').find('.new-post-item[data-type=link], .new-post-item[data-type=text]').last().after($newItem)
                                $newItem = null;
                            }
                        }
                    }
                    that.$modal.modal('show');
                }
            });
        },

        addVideoPreview: function () {
            var url = this.$addVideoForm.find('.url-video').val(),
                $videoPreview = $(this.templates.videoVk).append(SJA.Common.getVideoPreview(url));

            this.setPreviewSize($videoPreview);

            if (this.$modalBody.find('.new-post-img-wrap.images .row:last .new-post-item').length === 3) {
                this.$modalBody.find('.new-post-img-wrap.images').append('<div class="row"></div>');
            }

            this.$modalBody.find('.new-post-img-wrap.images').show().find('.row:last').append($videoPreview);
            this.$addVideoModal.modal('hide');
            this.$addVideoForm[0].reset();
        },

        setPreviewSize: function ($newItem) {
            var $container = this.$modalBody.find('.new-post-img-wrap.images');

            switch ($container.find('.row:last .new-post-item').length) {
                case 0:
                    $newItem.addClass('col-xs-12');
                    break;
                case 1:
                    $container.find('.row:last .new-post-item').removeClass('col-xs-12').addClass('col-xs-6');
                    $newItem.addClass('col-xs-6');
                    break;
                case 2:
                    $container.find('.row:last .new-post-item').removeClass('col-xs-6').addClass('col-xs-4');
                    $newItem.addClass('col-xs-4');
                    break;
            }
        },

        setScrollToModal: function () {
            $('body').addClass('modal-open');
        },

        init: function () {
            var that = this;
            this.appears = $('.appears');
            this.appears.hide();
            this.productId = window.productId || 0;
            this.viewMode = window.roleId;
            this.restrictedView = (this.viewMode === 2 || this.viewMode === 21);
            this.$modal = $('.new-post-modal');
            this.$modalBody = this.$modal.find('.modal-body');
            this.$modalFooter = this.$modal.find('.modal-footer');
            this.$uploadImgForm = this.$modal.find('.upload-img-form');
            this.showHideBtn = $('.show-hide-btn');
            this.checkboxTable = $('#tableSettings');
            this.checkboxInputs = $('#tableSettings .modal-body input');
            this.$postsFilterForm = $('.posts-filter-form');
            this.$tablePostsStat = $('.table-posts-stat');
            this.$viewModal = $('.view-post-modal');
            this.$addVideoModal = $('.add-video-modal');
            this.$addPhotoModal = $('.add-photo-modal');
            this.$addVideoForm = this.$addVideoModal.find('.add-video-form');
            this.$filtercat = $('.posts-filter-cat');

            this.$modal.on('hidden.bs.modal', this.clearModal)
                .on('change', '.new-post-soc-network', {that: this}, this.createNewPost)
                .on('click', '.new-item-btn-wrap .btn', {that: this}, this.addNewItem)
                .on('click', '.btn-one-more', {that: this}, this.addOneMoreItem)
                .on('click', '.item-delete', this.deleteItem)
                .on('keyup', '.poll-answers input:last', {that: this}, this.addPollAnswer)
                .on('click', '.save-duplicate', {that: this, duplicate: true}, this.saveAd)
                .on('submit', 'form', function (e) {
                    e.preventDefault();

                    that.saveAd.apply(that);
                });
            this.$filtercat.on('change', $.proxy (this.saveSelectedValue, this));

            this.$filtercat.selectize({
                plugins: ['remove_button'],
                delimiter: ',',
                persist: true,
                maxItems: 5,
                labelField: "text",
                valueField: "item",
                sortField: 'text',
                searchField: 'text',
                create: function (input) {
                    return {
                        value: input,
                        text: input
                    }
                }
            });

            this.$addPhotoModal
                .on('focus', '.js-selected-file', function () {
                    that.$uploadImgForm.find('input').click();
                })
                .on('click', '.js-select-file', function () {
                    that.$uploadImgForm.find('input').click();
                })
                .on('click', '.js-close-btn', {that: this}, function () {
                    that.$imgContainer.prev('.one-more').remove();
                    that.$imgContainer.remove();
                    that.$addPhotoModal.modal('hide');
                })
                .on('click', '.js-ok', function () {
                    var remoteImgUrl = that.$addPhotoModal.find('.js-photo-link').val();
                    if (that.$addPhotoModal.find('.js-selected-file').val()) {
                        that.uploadImg.apply(that.eventTargetSelectPhoto, [that.eventSelectPhoto]);
                    } else if (remoteImgUrl) {
                        that.uploadRemoteImg(remoteImgUrl);
                    }
                    that.$addPhotoModal.modal('hide');
                    that.$addPhotoModal.find('.js-photo-link').val('');
                    that.$addPhotoModal.find('.js-selected-file').val('');
                })
                .on('hidden.bs.modal', $.proxy(this, 'setScrollToModal'));

            this.$uploadImgForm.on('change', 'input', {that: this}, function (ev) {
                that.eventTargetSelectPhoto = this;
                that.eventSelectPhoto = ev;
                var $this = $(this);
                that.$addPhotoModal.find('.js-selected-file').val($this.val());
            });

            this.$postsFilterForm.on('submit', function (e) {
                e.preventDefault();

                that.getAdStat.apply(that);
            });


            this.$tablePostsStat.on('click', '.ad-enabled', this.setAdEnabled)
                .on('click', '.post-delete', {that: this}, this.deletePostDropdown)
                .on('click', '.post-duplicate', {that: this}, this.duplicatePostDropdown)
                .on('click', '.post-edit', {that: this, duplicate: false}, this.editPost)
                .on('click', '.post-view', {that: this}, SJA.Common.viewPost);

            this.$viewModal.on('hidden.bs.modal', this.clearModal)
                .on('click', '.post-duplicate', {that: this}, this.duplicatePostModal)
                .on('click', '.post-delete', {that: this}, this.deletePostModal);

            this.$addVideoForm.on('submit', function (e) {
                e.preventDefault();
                that.addVideoPreview.apply(that);
            });


            if (window.viewMode === 2) {
                this.$postsFilterForm.find('#posts-filter-enabled')[0].selectize.setValue(1);
            }

            SJA.Common.initTableSorter(this.$tablePostsStat);

            this.setProductTitle();
            this.getAuthorNames();
            this.getAdStat();
            this.activateCheckbox();
            this.fillCheckboxTable();


        }
    };

    if ($('#posts').length) SJA.Posts.init();


}(jQuery));

