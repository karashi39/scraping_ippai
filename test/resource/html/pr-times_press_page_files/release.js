var release_list_config = {};
var imagelength;
release_list_config.page_num = $("input[name=page-num]").val();
release_list_config.item_selector = "div#itemThumbnailView article.item";
release_list_config.status = false;
var moreenabled = true;
var linkarr = [];
var re_page_num = 2;
var dReturn = false;
(function() {
    var store = {page:2};
    var page  = $("body").attr('class').split(" ")[0];
    release_list_config.page = page;

    //word差し替えブロックはすべて出力されないので手動で設置
    if(location.search.indexOf('owner=1') > -1 || location.pathname.indexOf('draft') > -1 ) setReplaceBlock();
    setPixtaImageCopyright();
    disabledPixtaContextmenu();

    var add_release_list = function(value) {
        linkarr = [];
        $(".container-thumbnail-list article").each(function(){
            linkarr.push($("h1 a", this).attr("href"))
        });
        // 動作中は複数起動しないようにする
        if (release_list_config.status) {
            return true;
        }
        release_list_config.status = true;
        var type_map = {
            index    : "newarrival",
            category : "main_category",
            search   : "search",
            company  : "provider",
            topics   : "topics",
        };
        var type = type_map[page];
        var params = {};
        var toggle_selectors = ["#more-load-btn", "input[name=sub_category]", ".company input[name=search_word]"];
        for (var idx = 0; idx < toggle_selectors.length; idx++) {
            $(toggle_selectors[idx]).attr("disabled", true);
        }

        params.type = type;
        params.page = store.page;
        if ("category" == page) {
            var buf = location.pathname.split('/');
            params.v = buf[1];
            if ("main" == params.v) {
                params.type = buf[3];
                params.v    = buf[5];
                if (8 <= buf.length) {
                    params.lv2 = buf[7];
                }
                if(params.type == 'searchcity'){
                    params.loccate = $('[name=location_categoly_id]').val();
                }
            } else {
                if (value) {
                    params.sub = value;
                } else if (0 < $("input[name=sub_category]:checked").length) {
                    params.sub = $("input[name=sub_category]:checked").val();
                }
            }
        } else if ("company" == page) {
            params.search = location.pathname.split('/')[3];
            params.v = location.pathname.split('/')[5];
            if (value) {
                params.kw = value;
            } else if (0 < $("input[name=search_word]").length && 0 < $("input[name=search_word]").val().length) {
                params.kw = $("input[name=search_word]").val();
            }
        } else if ("search" == page) {
            var buf  = document.URL.split('?')[1].split('&');
            var vars = {};
            for (var i = 0; i < buf.length; i++) {
                var row_buf = buf[i].split('=');
                if (2 == row_buf.length) {
                    vars[row_buf[0]] = decodeURIComponent(row_buf[1]);
                }
            }
            params.v = vars.search_word;
        } else if ("topics" == page) {
            params.v = decodeURIComponent(location.pathname.split('/')[3]);
        }

        params.limit = release_list_config.page_num;
        var random = new Date().getTime();
        params.random = random;

        $.ajax({
            url: "/api/search_release.php",
            type: "get",
            data: params,
            dataType: "jsonp",
            cache : true,
            jsonpCallback: "addReleaseList"
        }).done(function() {
            store.page++;
            ga('send', 'pageview', "/main/html/index/pagenum/"+store.page);
            for (var idx = 0; idx < toggle_selectors.length; idx++) {
                $(toggle_selectors[idx]).attr("disabled", false);
            }
            release_list_config.status = false;
            $("#more-load-btn-list,#more-load-btn-view").css({"opacity":"1"});
            if(store.page < re_page_num){
              if(document.location.href.indexOf('/main/html/index/pagenum/') > -1){
                add_release_list(null);
              }else if(document.location.href.indexOf('action.php?run=html&page=searchkey&search_word') > -1){
                add_release_list(value);
              }
            }else{
              moreenabled = true;
              if(localStorage.getItem('prev_page_url')){
                if(localStorage.getItem('prev_page_url').indexOf('/main/html/rd/') > -1 && Number(localStorage.getItem('cache_page_num')) > 2 && dReturn){
                  dReturn = false;
                  $(window).scrollTop(localStorage.getItem('scroll_top'));
                }
              }
            }
        });
    };
    $("#more-load-btn-list,#more-load-btn-view").on({
        "click":function(evt){
            var href = window.location.href;
            //if(href.indexOf('/main/html/index/pagenum/') == -1){
              evt.preventDefault();
              add_release_list(null);
              $(this).css({"opacity":"0.5"});
              $(this).animate({backgroundColor:"#ededed", "color":"#333"}, 100, "easeInSine");
              moreenabled = false;
            //}
        },
        "mouseenter":function(){
            if(moreenabled){
                $(this).animate({backgroundColor:"#f2f2f2", "color":"#333"}, 150, "easeOutSine");
            }
        },
        "mouseleave":function(){
            if(moreenabled){
                $(this).animate({backgroundColor:"#ededed", "color":"#333"}, 100, "easeInSine");
            }
        }
    });

    $("input[name=sub_category]").change(function(evt) {
        evt.preventDefault();
        $("input[name=sub_category]").attr('disabled', true);
        $("#search-not-found-message").remove();
        store.page = 1;
        var current = {open:"itemThumbnailView", hide:"itemListView"};
        if ($("div#itemListView").hasClass('opened')) {
        // if ($("div#itemListView").hasClass('opend')) {
            current.hide = "itemThumbnailView";
            current.open = "itemListView";
        }
        // $("#" + current.open).removeClass("opend").addClass("hide");
        // $("#" + current.hide).removeClass("opend").addClass("hide");
        $("#" + current.open).removeClass("opened").addClass("hide");
        $("#" + current.hide).removeClass("opened").addClass("hide");
        $("div#itemThumbnailView article.item").remove();
        $("div#itemListView article.item").remove();
        add_release_list($("input[name=sub_category]:checked").val());
        // $("#" + current.open).removeClass("hide").addClass("opend");
        $("#" + current.open).removeClass("hide").addClass("opened");
        $("a#more-load-btn").show();
    });

    var company_search = function() {
        $("#search-not-found-message").remove();
        // $("div#itemThumbnailView").removeClass("hide").addClass("opend");
        $("div#itemThumbnailView").removeClass("hide").addClass("opened");
        store.page = 1;
        $("div#itemThumbnailView article.item").remove();
        add_release_list($("input[name=search_word]").val());
        $("a#more-load-btn").show();
    };

    $("div.bt_search, #buttonCompanySearch").click(function(evt) {
        evt.preventDefault();
        company_search();
    });

    $("body.company input[name=search_word]").keydown(function(evt) {
        if (13 == evt.keyCode) {
            evt.preventDefault();
            company_search();
        }
    });

    $("form[name=topsearchfrom]").submit(function(evt) {
        if (0 == $(this).children('input[name=search_word]').val().length) {
            return false;
        } else {
            return true;
        }
    });

    // 初回件数が一ページに収まってしまう場合は「もっと見る」ボタンを表示しない
    var item_selector = release_list_config.item_selector;
    var total_num     = parseInt($("input[name=total-num]").val());
    var page_num      = parseInt(release_list_config.page_num);
    var length        = parseInt($(item_selector).length);
    if (page_num > length || page_num >= total_num) {
        removeMoreLoadButton();
    }

    // $(".entry h2 + div + ul li a, .entry h3 + div + ul li a, .side-share ul li a").on({
    //     "mouseenter":function(){
    //         $(this).animate({backgroundColor:"##efefef"}, 150, "easeOutSine");
    //     },
    //     "mouseleave":function(){
    //         $(this).animate({backgroundColor:"#fff"}, 100, "easeInSine");
    //     }
    // });

    var loadednum = 0;
    $("#main_img_parts div").each(function () {
        var obj = $(this);
        var imgobj = $("img", this);
        var img = $('<img>');
        img.load(function () {
            imgobj.css({"width": obj.width() + "px", "height": "auto"});
            if (imgobj.height() < obj.height()) {
                imgobj.css({"width": "auto", "height": obj.height() + "px"});
            }
            imgobj.css({"margin-left": (obj.width() - imgobj.width()) * 0.5 + "px", "margin-top": (obj.height() - imgobj.height()) * 0.5 + "px"});
            loadednum++;
            setHeaderImage();
        }).error(function(){
            loadednum++;
            setHeaderImage();
        }).attr('src', imgobj.attr('src'));
    });
    function setHeaderImage(){
        var num = imagelength;
        if(imagelength == 10){
            imagelength = 9;
        }
        if(loadednum == imagelength){
            $("#main_img_parts .parts1").delay(400).animate({"opacity":"1"}, 300, "easeInSine");
            $("#main_img_parts .parts2").delay(750).animate({"opacity":"1"}, 300, "easeInSine");
            $("#main_img_parts .parts3").delay(900).animate({"opacity":"1"}, 300, "easeInSine");
            $("#main_img_parts .parts4").delay(900).animate({"opacity":"1"}, 300, "easeInSine");
            $("#main_img_parts .parts5").delay(1050).animate({"opacity":"1"}, 300, "easeInSine");
            $("#main_img_parts .parts6").delay(1050).animate({"opacity":"1"}, 300, "easeInSine");
            $("#main_img_parts .parts7").delay(1200).animate({"opacity":"1"}, 300, "easeInSine");
            $("#main_img_parts .parts8").delay(800).animate({"opacity":"1"}, 300, "easeInSine");
            $("#main_img_parts .parts9").delay(950).animate({"opacity":"1"}, 300, "easeInSine");
        }
    }



    var slack_code = location.search.match(/code=(.*?)(&|$)/);
    var slack_api_uri = location.protocol + '//' + location.hostname + '/api/slack_release_share.php';
    if(slack_code) {
        $.ajax({
            url: slack_api_uri + '?' + slack_code + '&title=' + release_title,
            type: 'GET',
            timeout: 10000,
            success: function (data) {
            }
        });
    }
    $(".slack a").on({
        "click":function(evt){
            var slack_api_uri = '/api/slack_release_share.php';
            location.href = slack_api_uri;
        }
    });



    $(".others-button").on({
        "click":function(){
            $(this).fadeOut(50, "easeInOutSine");
            $(".container-share-others").delay(35).animate({"left":"0"}, 100, "easeInOutSine");
        }
    });

    $(".close-others").on({
        "click":function(){
            $(".others-button").delay(98).fadeIn(50, "easeInOutSine");
            $(".container-share-others").animate({"left":"-370px"}, 100, "easeInOutSine");
        }
    });

    $(window).load(function() {
      //console.log('load complete!!');
      //console.log(window.history);
      //console.log(document.location);
      //console.log(localStorage.getItem('prev_page_url'));
      //console.log(localStorage.getItem('cache_page_num'));
      if(document.location.href.indexOf('/main/html/index/pagenum/') > -1 || document.location.href.indexOf('action.php?run=html&page=searchkey&search_word') > -1){
        if(localStorage.getItem('prev_page_url').indexOf('/main/html/rd/') > -1 && Number(localStorage.getItem('cache_page_num')) > 2){
          re_page_num = Number(localStorage.getItem('cache_page_num'));
          dReturn = true;
          add_release_list(null);
        }else{
          re_page_num = 2;
          localStorage.removeItem('prev_page_url');
          localStorage.removeItem('cache_page_num');
          localStorage.removeItem('scroll_top');
        }
      }
    });

    $(window).unload(function() {
      localStorage.setItem('prev_page_url', document.location.href);
      if(document.location.href.indexOf('/main/html/index/pagenum/') > -1 || document.location.href.indexOf('action.php?run=html&page=searchkey&search_word') > -1){
        localStorage.setItem('cache_page_num', store.page);
        localStorage.setItem('scroll_top', $(window).scrollTop());
      }
    });

    if($("#location_categoly_id").size() > 0){
      $("#location_categoly_id").fancySelect().on('change.fs', function(){
        $("a.button-read-more").show();
        $("a.more-load-btn").show();
        store.page = 1;
        var current = {open:"itemThumbnailView", hide:"itemListView"};
        if ($("div#itemListView").hasClass('opened')) {
          current.hide = "itemThumbnailView";
          current.open = "itemListView";
        }
        $("#" + current.open).removeClass("opened").addClass("hide");
        $("#" + current.hide).removeClass("opened").addClass("hide");
        $("div#itemThumbnailView article.item").remove();
        $("div#itemListView article.item").remove();
        add_release_list(null);
        $("#" + current.open).removeClass("hide").addClass("opened");
      });
    }

}).call();

function removeMoreLoadButton()
{
    $("a.button-read-more").hide();
    $("a.more-load-btn").hide();
    $('a.button-nosearch-new').show();
}

function displayNotFoundMessage()
{
    $("#wrapContainerItem").after('<div id="search-not-found-message" class="box box-noresult"><p>該当するプレスリリースは見つかりませんでした。');
}

function addReleaseList(data) {
    if ("200" != data.status.code) {
        return;
    }

    var total;
    if (data.search !== "searchrlp") {
        addReleaseListView(data);
    }
    addReleaseThumbnailView(data);

    total = $("#itemThumbnailView article.item").length;
    //console.log(release_list_config.page_num);
    //console.log(data.articles.length);
    //console.log(total);
    //console.log(data.searched.count);
    if (/*release_list_config.page_num > data.articles.length || */total >= data.searched.count) {
        removeMoreLoadButton();
    }
}

function addReleaseThumbnailView(data)
{
    if (0 == data.articles.length) {
        displayNotFoundMessage();
        $("#itemThumbnailView").addClass("hide");
        return;
    }
    //var template = $('.item-thumbnail-template').clone();
    for (var i = 0; i < data.articles.length; i++) {
        var row = data.articles[i];

        var dbl = false;
        for(var j = 0; j < linkarr.length; j++){
            if(row.url == linkarr[j]){
                dbl = true;
            }
        }
        if(!dbl){
            var template = '';
            template += '<article class="item item-ordinary">';
            template += '<a class="link-thumbnail link-thumbnail-ordinary"></a>';
            template += '<h3 class="title-item title-item-ordinary"><a class="link-title-item link-title-item-ordinary"></a></h3>';
            template += '<a class="link-name-company name-company name-company-ordinary"></a>';
            template += '<time class="time-release time-release-ordinary icon-time-release-svg"></time>';
            if(row.aprilfool_flg == 1) {
                template += '<div class="aprilfool_wrap"><span class="aprilfool-text">エイプリルフール関連</span></div>';
            }
            template += '</article>';

            var item = $(template);
            item.find('.item-ordinary').addClass('add-item');
            item.find('.link-thumbnail-ordinary').attr({href:row.url, title:row.title}).css('background-image', 'url(' + row.images.new_thumbs.s.file + ')');
            if(row.new_flg){
                item.find('.link-thumbnail-ordinary').append("<span>New</span>");
            }
            item.find('.link-title-item-ordinary').attr('href', row.url).text(row.title);
            item.find('.link-name-company').text(row.provider.name);
            item.find('.time-release-ordinary').attr({datetime:row.updated_at.time_iso_8601}).text(row.updated_at.time_ago);
            item.find('.link-name-company').attr({href:"/main/html/searchrlp/company_id/" + row.provider.id});

            if (0 < $("#itemThumbnailView article.item:last").length) {
                $("#itemThumbnailView article.item:last").after(item);
            } else {
                $("div.container-thumbnail-list").prepend(item);
            }

            if (!$("#itemThumbnailView").hasClass("hide")) {
                $("#itemThumbnailView article.add-item").fadeIn("easeInSine");
            }
        }
    }
}

function addReleaseListView(data)
{
    if (0 == data.articles.length) {
        displayNotFoundMessage();
        $("#itemListView").addClass("hide");
        return;
    }
    //var template = $('.item-title-template').clone();
    for (var i = 0; i < data.articles.length; i++) {
        var row = data.articles[i];
        var template = '<article class="item item-ordinary item-toplistview">';
        template += '<div class="container-item-detail">';
        template += '<h3 class="title-item title-item-ordinary"><a class="link-title-item link-title-item-ordinary"></a></h3>';
        template += '<a class="link-name-company name-company name-company-ordinary"></a><time class="time-release time-release-ordinary icon-time-release-svg"></time>';
        if (row.aprilfool_flg) {
            template +=  '<div class="aprilfool_wrap"><span class="aprilfool-text">エイプリルフール関連</span></div>';
        }
        template += '</div>';
        template += '</article>';
        var item = $(template);
        item.find('.item-ordinary').addClass('add-item').addClass(row.main_category.id);
        item.find('.link-title-item-ordinary').attr({href:row.url}).text(row.title);
        item.find('.time-release-ordinary').attr({datetime:row.updated_at.time_iso_8601}).text(row.updated_at.time_ago);
        item.find('.link-name-company').attr({href:"/main/html/searchrlp/company_id/" + row.provider.id}).text(row.provider.name);

        if (0 < $("#itemListView article.item:last").length) {
            $("#itemListView article.item:last").after(item);
        } else {
            $("div.container-item-list").prepend(item);
        }

        if (!$("#itemListView").hasClass("hide")) {
            $("#itemListView article.add-item").fadeIn("easeInSine");
        }
    }
}

function setReplaceBlock(){
    $('.entry .rich-text .replace_image').each(function(i){
        $(this).wrap('<div>')
               .addClass( $(this).data('style') )
               .css({'width' : $(this).data('width') ,'height' : $(this).data('height') , 'padding-top' : $(this).data('height') / 2 - 8})
               .show();
    });
}

//pixta画像のコピーライトを配置
function setPixtaImageCopyright(){
    $('.entry .rich-text img').each(function(i){
        var src = $(this).attr('src');
        var target     = 'pixta_';
        if (src.indexOf(target) > -1) {
            var arr        = src.split('-');
            var tmp_id     = arr[arr.length-2];
            var id         = tmp_id.substr(target.length);
            var width = $(this).width() - 4;
            $(this).after('<div class="image-caption pixta-copyright" style="width: '+ width +'px;"><a target=”_blank” href="https://pixta.jp/photo/'+id+'">photo by pixta.jp</a></div>');
        }
    });
}

//pixta画像右クリック禁止
function disabledPixtaContextmenu(){
    var target = 'pixta_';
    $(document).on('contextmenu', 'img', function() {
        var src    = $(this).attr('src');
        if (src.indexOf(target) > -1) return false;
    })

    .on('dragstart', 'img', function() {
        var src    = $(this).attr('src');
        if (src.indexOf(target) > -1) return false;
    });

}
