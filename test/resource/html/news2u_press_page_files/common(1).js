queries = [
    {
        context: 'smartphone',
        callback: function() {
            adjPosition = null;
            callExternal = null;
            delayExternal= null;
            $('#footer .facebook .fb-like-box').attr('data-width', '250');
            $('#footer .facebook .fb-like-box').attr('data-height', '215');
            $('#header_toggle_menu .menu_button a').removeClass('on');
            $('#header_nav_wrapper .global_nav').hide();
            $('#header_nav_wrapper .global_nav ul').show();
            $('#header_nav_wrapper').removeClass('nav_ptn_01');
            $('#header_nav_wrapper').addClass('nav_ptn_02');
            $('body').addClass('smt');
        }
    },
    {
        context: 'tablet',
        callback: function() {
            adjPosition = null;
            callExternal = null;
            delayExternal= null;
            $('#footer .facebook .fb-like-box').attr('data-width', '250');
            $('#footer .facebook .fb-like-box').attr('data-height', '215');
            $('#header_toggle_menu .menu_button a').removeClass('on');
            $('#header_nav_wrapper .global_nav').hide();
            $('#header_nav_wrapper .global_nav ul').show();
            $('#header_nav_wrapper').removeClass('nav_ptn_01');
            $('#header_nav_wrapper').addClass('nav_ptn_02');
            $('body').addClass('tablet');
       }
    },
    {
        context: 'smalldesktop',
        callback: function() {
            adjPosition = null;
            callExternal = null;
            delayExternal= null;
            $('#footer .facebook .fb-like-box').attr('data-width', '250');
            $('#footer .facebook .fb-like-box').attr('data-height', '215');
            $('#sub_column .facebook .fb-like-box').attr('data-width', '174');
            $('#sub_column .facebook .fb-like-box').attr('data-height', '215');
            $('#header_toggle_menu .menu_button a').removeClass('on');
            $('#header_nav_wrapper .global_nav').hide();
            $('#header_nav_wrapper').removeClass('nav_ptn_02');
            $('#header_nav_wrapper').addClass('nav_ptn_01');
      }
    },
    {
        context: 'desktop',
        callback: function() {
            adjPosition = -83;
            callExternal = "pSc";
            delayExternal= 200;
            $('#footer .facebook .fb-like-box').attr('data-width', '316');
            $('#header_toggle_menu .menu_button a').removeClass('on');
            $('#header_nav_wrapper .information').show();
            $('#header_nav_wrapper .global_nav').hide();
            $('#header_nav_wrapper').removeClass('nav_ptn_02');
            $('#header_nav_wrapper').addClass('nav_ptn_01');
            $('.newsroom-entry-gallery, .flickr .newsroom-entry').addClass('expansion');
        }
    }
];

jQuery(function() {
    $('#header_logo .newsroom img,#global_footer .service_info img').fadeTo(0, 0);
    $('#header_logo .newsroom img,#global_footer .service_info img').hover(
        function () {
            $(this).fadeTo(100, 1);
        },
        function () {
            $(this).fadeTo(100, 0);
        }
    );
    
    // Header Menu
    var isMouseHover = false;
    $('#header_toggle_menu .menu_button a').click(function() {
        if($('#header_nav_wrapper').hasClass('nav_ptn_01')) {
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $('#header_nav_wrapper.nav_ptn_01 .global_nav').fadeTo(200, 0, function(){
                    $('#header_nav_wrapper.nav_ptn_01 .global_nav ul').hide();
                });
            } else {
                $(this).addClass('on');
                $('#header_nav_wrapper.nav_ptn_01 .global_nav').fadeTo(200, 1);
                $('#header_nav_wrapper.nav_ptn_01 .global_nav ul').show();
            }
            
            $('#header_nav_wrapper.nav_ptn_01 .global_nav,#header_toggle_menu .menu_button a').hover(function(){
                isMouseHover = true;
            }, function(){
                isMouseHover = false;
            });
            
            $('body').click(function(){
                if(!isMouseHover) {
                    $('#header_nav_wrapper.nav_ptn_01 .global_nav').fadeTo(200, 0);
                    $('#header_nav_wrapper.nav_ptn_01 .global_nav ul').hide();
                    $('#header_toggle_menu .menu_button a').removeClass('on');
                }
            });
            
            return false;
        }
        if($('#header_nav_wrapper').hasClass('nav_ptn_02')) {
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $('#header_nav_wrapper .global_nav').hide();
                $('#header_nav_wrapper .global_nav').css('opacity', 0);
            } else {
                $(this).addClass('on');
                $('#header_nav_wrapper .global_nav').show();
                $('#header_nav_wrapper .global_nav').css('opacity', 1);
            }
        return false;
        }
    });
    
    $('#header #search a.open').on({
        click: function () {
            var logo = $('#header_logo');
            var target = $('#header #search');
            if (target.hasClass('on')) {
                if ($('#search input').val()) {
                    $('#search').submit();
                } else {
                    $('#search input').focus();
                }
            } else {
                target.addClass('on');
                logo.hide();
            }
            
            return false;
        },
    });
    
    $('#header #search a.close').on({
        click: function () {
            var logo = $('#header_logo');
            var target = $('#header #search');
            if (target.hasClass('on')) {
                target.removeClass('on');
                logo.show();
            }
            
            return false;
        },
    });
    
    $('#header .global_nav .category ul li a, #header .global_nav .corporate ul li a').hover(function() {
        $(this).stop().css({paddingLeft: 16}).animate({paddingLeft: 22}, 200);
    },function() {
        $(this).stop().animate({paddingLeft: 16}, 200);
    });
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('.pagetop').fadeIn();
        } else {
            $('.pagetop').fadeOut();
        }
    });
        
    $('#search a.submit').click(function() {
        if ($('#search input').val()) {
            $('#search').submit();
        } else {
            $('#search input').focus();
        }
        return false;
    });
    
    $('#corp_search a').click(function() {
        if ($('#corp_search input[type="text"]').val()) {
            $('#corp_search').submit();
        } else {
            $('#corp_search input[type="text"]').focus();
        }
        return false;
    });
    
    $('#notification .close').click(function() {
        $('#notification').hide();
        return false;
    });
    
    // select link
    $('select.navigation').change(function() {
        $('option:selected', this).each(function () {
            location.href = $(this).val();
        });
    });
    
    
    $('nav.global_nav ul li').each(function() {
        if (location.pathname == $('a', this).attr('href')) {
            $(this).addClass('current');
        }
    });
    
    $('nav.corporate_nav ul li').each(function() {
        if (location.pathname == $('a', this).attr('href')) {
            $('a', this).addClass('current');
        }
    });
    
    $('nav.side_nav > ul > li').each(function() {
        var parent_reg = new RegExp('^' + $('h3 a', this).attr('href').replace(eval("/\\//g"), "\\/") + '.*$');
        if (location.pathname.replace('category/', '').replace('industry/', '').replace('region/', '').match(parent_reg)) {
            $(this).addClass('current');
        }
        $('> ul > li', this).each(function() {
            var child_reg = new RegExp('^' + $('a', this).attr('href').replace(eval("/\\//g"), "\\/") + '.*$');
            if (location.pathname.replace('category/', '').replace('industry/', '').replace('region/', '').match(child_reg)) {
                $(this).addClass('current');
            }
        });
    });
    
    $('.toggle_link').each(function() {
        var target = $('+ .toggle_block', this);
        $('> a', this).click(function() {
            if ($(this).html().match('開く')) {
                $(this).html($(this).html().replace('開く', '閉じる'));
            } else {
                $(this).html($(this).html().replace('閉じる', '開く'));
            }
            if ($(this).html().match('＋')) {
                $(this).html($(this).html().replace('＋', '－'));
            } else {
                $(this).html($(this).html().replace('－', '＋'));
            }
            target.toggle();
            return false;
        });
        $('.close a', target).click(function() {
            target.toggle();
            return false;
        });
    });
    
    $('#searchBoxMore input[name="is_public"]').change(function() {
        var market = $('#market');
        if ($(this).val() == 1) {
            market.removeAttr('disabled');
        } else {
            market.attr('disabled', 'disabled');
        }
        console.log($(this).val());
    });
    
    $('#recommend .icon_close').click(function(){
        $('#recommend').hide();
        $.cookie('refString',"",{path:"/",expires:-1});
    });
    
    // 重要なお知らせ
    $.getJSON('/news/alert', function(data) {
        if (data) {
            $('#notification').after('<div id="alert"><div class="container"><p>重要なお知らせ：<a href="/news/' + data.id + '">' + data.title + '</a></p></div></div>');
        }
    });
    
    
    MQ.init(queries);
});
/*
$(window).load(function(){
    if (document.referrer) {
        var refUrl = $.url(document.referrer).param();
        if (refUrl.q) $.cookie('refString', refUrl.q, {expires: 1, path: '/',});
    }
    
    $.ajax('/json/suggestion',
        {
            dataType: 'json',
            cache: false,
            success: function(data){
                if (data) {
                    $('#recommend strong').html(data);
                    $('#recommend a:eq(0)').attr('href','/search?q='+data);
                    $('#recommend').show();
                }
            }
        }
    );
});
*/

/* ================================================== */
// Click Count
var start_time = new Date().getTime();
function clickCount(data) {
    if (data.clear_event == true) {
        data.obj.unbind('click');
    }
    data.obj.click(function() {
        if (data.label == null) {
            data.label = document.location.pathname;
        }
        data.value = Math.round(((new Date()).getTime() - start_time) / 1000);
        /* console.log(data.category);
        console.log(data.action);
        console.log(data.label);
        console.log(data.value); */
        _gaq.push(['b._trackEvent', data.category, data.action, data.label, data.value]);
        _gaq.push(['c._trackEvent', data.category, data.action, data.label, data.value]);
        if (data.sub_event) {
            // for marketing data
            /* console.log(data.sub_event.category);
            console.log(data.sub_event.action);
            console.log(data.sub_event.label); */
            _gaq.push(['b._trackEvent', data.sub_event.category, data.sub_event.action, data.sub_event.label, data.value]);
            _gaq.push(['b._trackEvent', data.sub_event.category, data.sub_event.action, data.sub_event.label, data.value]);
        }
    }); 
}

// クリックカウント
jQuery(function() {
    // ヘッダー
    $('#header nav ul li a').each(function() {
        var subobj;
        if ($(this).attr('id')) {
            subobj = {
                obj         : $(this),
                category    : 'Lead Link',
                action      : $(this).attr('id'),
                label       : document.location.pathname,
                clear_event : false
            };
        }
        clickCount({
            obj         : $(this),
            category    : 'Inside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : true,
            sub_event   : subobj
        });
    });
    
    // News2u.netにニュースリリースを掲載する
    $('#notification p.text a').each(function() {
        clickCount({
            obj         : $(this),
            category    : 'Inside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : true
        });
    });
    
    // フッター
    $('#footer a').each(function() {
        var subobj;
        if ($(this).attr('id')) {
            subobj = {
                obj         : $(this),
                category    : 'Lead Link',
                action      : $(this).attr('id'),
                label       : document.location.pathname,
                clear_event : false
            };
        }
        clickCount({
            obj         : $(this),
            category    : 'Inside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : true,
            sub_event   : subobj
        });
    });
    $('#footer a[target="_blank"]').each(function() {
        var subobj;
        if ($(this).attr('id')) {
            subobj = {
                obj         : $(this),
                category    : 'Lead Link',
                action      : $(this).attr('id'),
                label       : document.location.pathname,
                clear_event : false
            };
        }
        clickCount({
            obj         : $(this),
            category    : 'Outside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : true,
            sub_event   : subobj
        });
    });
    
    
    // リリース詳細
    // 本文
    var release_detail_link_count = 1;
    $('.release_sub_title a, .release_contents a, #release_summary a, #release_url a').each(function() {
        var label = document.location.pathname + '?' + release_detail_link_count;
        if ($(this).hasClass('keywordAnchor')) {
            label += '&WordLink';
        }
        clickCount({
            obj         : $(this),
            category    : 'Outside Link',
            action      : $(this).attr('href'),
            label       : label,
            clear_event : false
        });
        release_detail_link_count++;
    });
    // 付帯情報
    $('.release_attachment a, .release_class a, .release_detail_first_image a').each(function() {
        clickCount({
            obj         : $(this),
            category    : 'Inside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : false
        });
    });
    // 付帯情報（外部リンク）
    $('.release_attachment a[target="_blank"], .release_class a[target="_blank"], .release_detail_first_image a[target="_blank"]').each(function() {
        clickCount({
            obj         : $(this),
            category    : 'Outside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : true
        });
    });
    
    // 企業ナビ
    $('#sub_column .corporate a, #sub_column .corporate_nav a, #sub_column .corporate_releases a, #sub_column .corporate_socialmedias a').each(function() {
        clickCount({
            obj         : $(this),
            category    : 'Inside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : false
        });
    });
    
    // 付帯情報（外部リンク）
    $('#sub_column .corporate a[target="_blank"], #sub_column .corporate_nav a[target="_blank"], #sub_column .corporate_releases a[target="_blank"], #sub_column .corporate_socialmedias a[target="_blank"]').each(function() {
        clickCount({
            obj         : $(this),
            category    : 'Outside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : true
        });
    });
    
    // 企業ページ
    $('.corporate_table a, .socialmedia_table a').each(function() {
        clickCount({
            obj         : $(this),
            category    : 'Outside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : false
        });
    });
    $('.corporate_table .relations a').each(function() {
        clickCount({
            obj         : $(this),
            category    : 'Inside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname,
            clear_event : true
        });
    });
    
    // LP
    $('#main_column.lp a').each(function() {
        var identifier = ''
        if ($(this).attr('class')) {
            identifier = '?' + $(this).attr('class');
        }
        clickCount({
            obj         : $(this),
            category    : 'Inside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname + identifier,
            clear_event : false
        });
    });
    
    // LP（外部リンク）
    $('#main_column.lp a[target="_blank"]').each(function() {
        var identifier = ''
        if ($(this).attr('class') != '') {
            identifier = '?' + $(this).attr('class');
        }
        clickCount({
            obj         : $(this),
            category    : 'Outside Link',
            action      : $(this).attr('href'),
            label       : document.location.pathname + identifier,
            clear_event : true
        });
    });
    
});
