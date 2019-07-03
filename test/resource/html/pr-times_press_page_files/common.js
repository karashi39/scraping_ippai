(function(){var e;e=window.jQuery||window.Zepto||window.$,e.fn.fancySelect=function(n){var t,i;return null==n&&(n={}),i=e.extend({forceiOS:!1,includeBlank:!1,optionTemplate:function(e){return e.text()},triggerTemplate:function(e){return e.text()}},n),t=!!navigator.userAgent.match(/iP(hone|od|ad)/i),this.each(function(){var n,r,a,s,o,l,d;return s=e(this),s.hasClass("fancified")||"SELECT"!==s[0].tagName?void 0:(s.addClass("fancified"),s.css({width:1,height:1,display:"block",position:"absolute",top:0,left:0,opacity:0}),s.wrap('<div class="fancy-select">'),d=s.parent(),s.data("class")&&d.addClass(s.data("class")),d.append('<div class="trigger">'),t&&!i.forceiOS||d.append('<ul class="options">'),o=d.find(".trigger"),a=d.find(".options"),r=s.prop("disabled"),r&&d.addClass("disabled"),l=function(){var e;return e=i.triggerTemplate(s.find(":selected")),o.html(e)},s.on("blur.fs",function(){return o.hasClass("open")?setTimeout(function(){return o.trigger("close.fs")},120):void 0}),o.on("click.fs",function(){var n,l;if(!r)if(o.toggleClass("open"),t&&!i.forceiOS){if(o.hasClass("open"))return s.focus()}else if(o.hasClass("open")&&(l=o.parent(),n=l.offsetParent(),l.offset().top+l.outerHeight()+a.outerHeight()+20>e(window).height()+e(window).scrollTop()?a.addClass("overflowing"):a.removeClass("overflowing")),a.toggleClass("open"),!t)return s.focus()}),s.on("enable",function(){return s.prop("disabled",!1),d.removeClass("disabled"),r=!1,n()}),s.on("disable",function(){return s.prop("disabled",!0),d.addClass("disabled"),r=!0}),s.on("change.fs",function(e){return e.originalEvent&&e.originalEvent.isTrusted?e.stopPropagation():l()}),s.on("keydown",function(e){var n,t,i;if(i=e.which,n=a.find(".hover"),n.removeClass("hover"),a.hasClass("open")){if(38===i?(e.preventDefault(),n.length&&n.index()>0?n.prev().addClass("hover"):a.find("li:last-child").addClass("hover")):40===i?(e.preventDefault(),n.length&&n.index()<a.find("li").length-1?n.next().addClass("hover"):a.find("li:first-child").addClass("hover")):27===i?(e.preventDefault(),o.trigger("click.fs")):13===i||32===i?(e.preventDefault(),n.trigger("click.fs")):9===i&&o.hasClass("open")&&o.trigger("close.fs"),t=a.find(".hover"),t.length)return a.scrollTop(0),a.scrollTop(t.position().top-12)}else if(13===i||32===i||38===i||40===i)return e.preventDefault(),o.trigger("click.fs")}),a.on("click.fs","li",function(){var n;return n=e(this),s.val(n.data("raw-value")),t||s.trigger("blur.fs").trigger("focus.fs"),a.find(".selected").removeClass("selected"),n.addClass("selected"),s.val(n.data("raw-value")).trigger("change.fs").trigger("blur.fs").trigger("focus.fs")}),a.on("mouseenter.fs","li",function(){var n,t;return t=e(this),n=a.find(".hover"),n.removeClass("hover"),t.addClass("hover")}),a.on("mouseleave.fs","li",function(){return a.find(".hover").removeClass("hover")}),n=function(){var n;return l(),!t||i.forceiOS?(n=s.find("option"),s.find("option").each(function(n,t){var r;return t=e(t),t.prop("disabled")||!t.val()&&!i.includeBlank?void 0:(r=i.optionTemplate(t),t.prop("selected")?a.append('<li data-raw-value="'+t.val()+'" class="selected">'+r+"</li>"):a.append('<li data-raw-value="'+t.val()+'">'+r+"</li>"))})):void 0},s.on("update.fs",function(){return d.find(".options").empty(),n()}),n())})}}).call(this);

totalLike = 0;
totalFollower = 0;
$(function() {
  "use strict";
  var addFigure, catSelect, content, contentPos, fancyFlag, form, input, nav, nextSlide, overlay, prevSlide, prevTop, searchToggle, section, slider, snsD, snsM, snsY, tab, totalFollower, totalLike, trigger;
  $("[data-target='service']").on("click", function() {
    var link;
    link = $(this).find("a").attr("href");
    return location.href = link;
  });
  if ($("body").hasClass("entry")) {
    if ($(".file").find("li").size() === 0) {
      $(".file").remove();
    }
  }
  nav = $("header nav");
  if ($("body").hasClass("entry")) {
    content = $(".content");
    contentPos = content.offset().top;
  }
  $(window).on("scroll", function() {
    var body, docHeight, footHeight, prevTop, scrollPos;
    body = $("body");
    docHeight = $(document).height();
    scrollPos = $(window).height() + $(window).scrollTop();
    footHeight = $("footer").innerHeight();
    prevTop = $("[data-target='prev-top']");
    if ($(window).scrollTop() > 73) {
      prevTop.addClass("scrolled");
    } else {
      prevTop.removeClass("scrolled");
    }
    if (nav.size() > 1 && !body.hasClass("entry")) {
      if ($(window).scrollTop() > 73) {
        body.addClass("scrolled");
      } else {
        body.removeClass("scrolled");
      }
    }
    if (body.hasClass("entry")) {
      if ($(window).scrollTop() > contentPos) {
        return body.addClass("scrolled-entry");
      } else {
        body.removeClass("scrolled-entry");
        $(searchToggle).add(overlay).removeClass("opened");
        form.slideUp();
        return input.blur();
      }
    }
  });
  if($(".slide").size() > 0){
    slider = $(".slide");
    prevSlide = $("[data-target='prev']");
    nextSlide = $("[data-target='next']");
    if (slider.children().size() === 0) {
      slider.parent().hide().prev().hide();
    } else if (slider.children().size() <= 4) {
      slider.next().hide();
    }
    slider.owlCarousel({
      items: 4,
      slideSpeed: 800,
      scrollPerPage: true
    });
    prevSlide.on("click", function() {
      slider.trigger("owl.prev");
      return false;
    });
    nextSlide.on("click", function() {
      slider.trigger("owl.next");
      return false;
    });
  }
  $("select").fancySelect();
  if($("#form").size() > 0){
    $("#form").exValidation({
      rules: {
        company_name: "chkrequired",
        company_name_kana: "chkrequired chkkatakana chkgroup",
        president_name: "chkrequired",
        president_title: "chkrequired",
        zip: "chkrequired chkmin7 chkmax7 chknumonly",
        address: "chkrequired",
        c_phone: "chktel chkgroup",
        ipo_kbn: "chkselect",
        stock_cd: "chknumonly",
        capital: "chknumonly chkgroup",
        company_num: "chknumonly chkgroup",
        url: "chkurl chkgroup",
        industry_kbn: "chkselect",
        mail: "chkrequired chkemail chkhankaku",
        password: "chkrequired chkmin6 chkmax12 chkgroup",
        passsame: "chkrequired chkretype-password chkgroup",
        name: "chkrequired chkgroup",
        kana_name: "chkrequired chkkatakana chkgroup",
        phone: "chkrequired chktel chkgroup",
        fax: "chktel chkgroup",
        demand_company_name: "chkrequired",
        demand_zip: "chkrequired chkzip",
        demand_address: "chkrequired",
        c_name: "chkrequired chkgroup",
        c_kana_name: "chkrequired chkkatakana chkgroup",
        demand_email: "chkrequired chkemail chkhankaku",
        policy: "chkcheckbox chkgroup",
        company_name_media: "chkrequired chkgroup",
        radio: "chkradio",
        other_media_name: "chkrequired chkgroup",
        zip_media: "chkmin7 chkmax7 chknumonly",
        phone_media: "chktel chkgroup",
        textfield3: "chkrequired chkemail chkhankaku"
      },
      stepValidation: true,
      errInsertPos: "after",
      errPosition: "fixed",
      errMsgPrefix: "",
      scrollToErr: false,
      customAddError: function() {
        var errPos;
        errPos = $(".err").offset().top - 200;
        return $("html, body").animate({
          scrollTop: errPos
        }, "slow", "easeOutExpo");
      }
    });
  }
  $("input.after, .trigger, div.after input:not([type='checkbox']):not([type='radio'])").after("<span class='error'></span>");
  $("[data-api='zip']").on("keyup", function() {
    var zip;
    zip = $(this).val();
    if (zip.match(/^(?:[0-9]+)*$/)) {
      return AjaxZip3.zip2addr(this, "", "address", "address");
    }
  });
  $("[data-api='zip2']").on("keyup", function() {
    var zip;
    zip = $(this).val();
    if (zip.match(/^(?:[0-9]+)*$/)) {
      return AjaxZip3.zip2addr(this, "", "demand_address", "demand_address");
    }
  });
  $("#passsame").on("copy cut paste", function(e) {
    return e.preventDefault();
  });
  $("[data-copy='input']").on("click", function() {
    var address, address2, company, dept, firstKanaName, firstName, lastKanaName, lastName, mail, zip;
    company = $("#company_name").val();
    zip = $("#zip").val();
    address = $("#address").val();
    address2 = $("[name='address_2']").val();
    dept = $("[name='dept']").val();
    firstName = $("[name='first_name']").val();
    lastName = $("[name='last_name']").val();
    firstKanaName = $("[name='first_kana_name']").val();
    lastKanaName = $("[name='last_kana_name']").val();
    mail = $("#mail").val();
    $("#demand_company_name").val(company);
    $("#demand_zip").val(zip);
    $("#demand_address").val(address);
    $("[name='demand_address_2']").val(address2);
    $("[name='demand_dept']").val(dept);
    $("[name='c_first_name']").val(firstName);
    $("[name='c_last_name']").val(lastName);
    $("[name='c_first_kana_name']").val(firstKanaName);
    $("[name='c_last_kana_name']").val(lastKanaName);
    $("[name='demand_email']").val(mail);
    return false;
  });
  catSelect = $("[data-select='category']");
  catSelect.on("change", function() {
    var url;
    url = $(this).find(":selected").val();
    return location.href = url;
  });
  if (catSelect.size() > 0) {
    setTimeout(function() {
      return $("[data-raw-value]").on("click", function() {
        var url;
        url = $(this).attr("data-raw-value");
        return location.href = url;
      });
    }, 500);
  }
  fancyFlag = false;
  trigger = $(".trigger");
  trigger.on("mouseover", function() {
    return fancyFlag = true;
  }).on("mouseout", function() {
    return fancyFlag = false;
  }).on("click", function() {
    return trigger.not(this).removeClass("open").add().nextAll("ul").removeClass("open");
  });
  $("body").on("click", function() {
    if (!fancyFlag) {
      return trigger.removeClass("open").add().nextAll("ul").removeClass("open");
    }
  });
  tab = $("[data-target='tab']").find("a");
  tab.on("click", function() {
    if (!$(this).hasClass("active")) {
      tab.removeClass("active");
      $(this).addClass("active");
      $(".panel").children().hide();
      $($(this).attr("href")).show();
    }
    return false;
  });
  prevTop = $("[data-target='prev-top']").find("a");
  prevTop.on("click", function() {
    var doc;
    doc = $("html, body");
    doc.animate({
      scrollTop: 0
    }, "slow", "easeOutExpo");
    return false;
  });
  $("div.owl-wrapper").each(function () {
    var num = $(this).find('li a.gallery-img').length;
    if(num >= 2) {
    $(this).find('li a.gallery-img').attr('rel', 'group');
    } else if (num == 1) {
      $("#fancybox-outer").find('#fancybox-left,#fancybox-right').css('display', 'none');
    }
  });
  if($(".gallery-img").size() > 0){
    $(".gallery-img").fancybox({
      "padding": 20,
      "cyclic": true,
      "overlayOpacity": .6,
      "overlayColor": "#06121c",
      onComplete: function() {
        if (-1 < $(this).attr('href').indexOf('pixta')) {
          var pixta_copyright = $(document.createElement('div')).attr('id', 'pixta-image-copyright').addClass('pixta-image-copyright').html('写真提供：PIXTA');
          $('#fancybox-content').append(pixta_copyright);
        } else {
          $('#pixta-image-copyright').remove();
        }
      }
    });
  }
  searchToggle = $("[data-toggle='search']");
  form = $(".entry-header").next();
  input = form.find("[type='text']");
  overlay = $(".overlay");
  searchToggle.on("click", function() {
    if (!$(this).hasClass("opened")) {
      $(this).add(overlay).addClass("opened");
      form.slideDown("fast");
      setTimeout(function() {
        return input.focus();
      }, 400);
    } else {
      $(this).add(overlay).removeClass("opened");
      form.slideUp("fast");
      input.blur();
    }
    return false;
  });
  overlay.on("click", function() {
    $(this).add(searchToggle).removeClass("opened");
    form.slideUp("fast");
    return input.blur();
  });
  if ($("body").hasClass("service")) {
    section = $("[data-offset='section']");
    snsD = new Date();
    snsY = snsD.getFullYear();
    snsM = ("0" + (snsD.getMonth() + 1)).slice(-2);
    $("[data-date='year']").text(snsY);
    $("[data-date='month']").text(snsM);
    addFigure = function(str) {
      var num;
      num = new String(str).replace(/,/g, "");
      while (num !== (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2"))) {
        return num;
      }
    };
    setTimeout(function() {
      $('.js-round-down').each(function(){
        var $this = $(this);
        $this.text(addFigure($this.text()));
      });
      return $("table tbody tr,table tfoot tr").each(function() {
        var followerFigure, followerFloor, followerNum, likeFigure, likeFloor, likeNum;
        likeNum = $(this).children("td:first").text();
        likeFloor = Math.floor(likeNum / 100) * 100;
        $(this).children("td:first").text(likeFloor);
        followerNum = $(this).children("td:last").text();
        followerFloor = Math.floor(followerNum / 100) * 100;
        $(this).children("td:last").text(followerFloor);
        totalLike += parseInt(likeFloor);
        totalFollower += parseInt(followerFloor);
        $("[data-like='total']").text(addFigure(totalLike));
        $("[data-follower='total']").text(addFigure(totalFollower));
        likeFigure = $(this).children("td:first").text();
        $(this).children("td:first").text(addFigure(likeFigure));
        followerFigure = $(this).children("td:last").text();
        return $(this).children("td:last").text(addFigure(followerFigure));
      });
    }, 1000);
  }
  if ($("body").hasClass("service")) {
    $(".visual").addClass("animated");
  }
});

// Tweet Button
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

// Google+1 Button
window.___gcfg = {lang: 'ja'};

(function() {
  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
  po.src = 'https://apis.google.com/js/platform.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

// Like Button
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.9&appId=1495958567142613";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// mail
$("[data-api='mail']").attr("href", "mailto:?subject=" + document.title + "&body=" + location.href);

// LINE
var pageurl = encodeURIComponent(location.href),
  pageTitle = encodeURIComponent(document.title);
$("[data-api='line']").attr("href", "http://line.naver.jp/R/msg/text/?" + pageTitle + pageurl);


var calClick = false;

var _trigger = {
  tooltip: {
    changeView: ".trigger-tooltip",
    categoryMenu: ".trigger-tooltip-html"
  },
  changeView: {
    thumbnail: "#buttonChangeViewThumbnail",
    list: "#buttonChangeViewList"
  }
};

var _target = {
  header: "#headerPage",
  dropdown: ".list-category",
  view: {
    thumbnail: "#itemThumbnailView",
    list: "#itemListView"
  }
};

var cssDropdown = {
  position: "absolute",
  overflow: "scroll",
  width: "100%",
  "z-index": 1000,
  left: "0"
};

var cssCategoryMenu = {
  "z-index": 1000
};


/*
  関数
*/
// キャンセル用のフィールドの追加
var toggleDropDown = function(set){
  if (set && ($("#backdrop").length === 0)) {
    $("body").append($("<div>", {
      "class": "backdrop",
      id: "backdrop",
      css: {
        position: "fixed",
        "z-index": 999,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }));
  } else {
    $("#backdrop").remove();
  }
};

var openHiddenMenu = function($trigger, $target, css) {
  $trigger.addClass("activated-menu");
  $target.css(css).slideDown("normal", function() {
    return $target.removeClass("hide").addClass("opened-menu");
  });
  toggleDropDown(true);
};

var closeOpenedMenu = function() {
  $(".activated-menu").removeClass("activated-menu").removeAttr("style");
  return $(".opened-menu").slideUp("fast", function() {
    $(this).removeClass("opened-menu").addClass("hide");
    toggleDropDown(false);
  });
};

var openBaloon = function($target){
  var $content = $target.find(".content-balloon");
  var speedBase = 100;
  $content.stop().delay(speedBase).fadeIn(speedBase, "easeInSine");
  $target.stop().delay(speedBase).transition({scale:1}, speedBase*3, "easeOutBack", function(){
    $(this).addClass("displayed").transition({scale:1}, 0);
    $content.css({"opacity":"1", "display":"block"});
  });
};

var closeBaloon = function($target){
  var $content = $target.find(".content-balloon");
  var speedBase = 100;
  $content.stop().delay(speedBase*1.5).fadeOut(speedBase, "easeInSine");
  $target.stop().transition({scale:0.8}, speedBase*2.5, "easeInBack", function(){
    $(this).removeClass("displayed").transition({scale:0.5}, 0);
    $content.css({"display":"none"});
  });
};

var scrolled = false;

var thresholdScroll = 0;

//var changeHeaderClass = function(value) {
//  if (value >= thresholdScroll) {
//    $(_target.header).addClass("scrolled");
//  } else {
//    $(_target.header).removeClass("scrolled");
//  }
//  scrolled = false;
//};

var changeItemView = function(type, mode) {
  if (type === "display") {
    if (mode === "thumbnail") {
      if($('.heading-main-pressrelease-new').size() > 0) {
        $(".heading-main-pressrelease-rank").removeClass("hide banish").addClass("opened");
        $(".heading-main-pressrelease-new").removeClass("opened");
      }
      $("#wrapContainerItemRank").removeClass("hide banish").addClass("opened");
      $(_target.view.list).addClass("banish hide").removeClass("opened");
      $(_target.view.thumbnail).removeClass("hide banish").addClass("opened");
      $(_trigger.changeView.thumbnail).addClass("activated");
      return $(_trigger.changeView.list).removeClass("activated");
    } else {
      if($('.heading-main-pressrelease-new').size() > 0) {
        $(".heading-main-pressrelease-rank").addClass("banish hide").removeClass("opened");
        $(".heading-main-pressrelease-new").addClass("opened");
      }
      $("#wrapContainerItemRank").addClass("banish hide").removeClass("opened");
      $(_target.view.thumbnail).addClass("banish hide").removeClass("opened");
      $(_target.view.list).removeClass("hide banish").addClass("opened");
      $(_trigger.changeView.list).addClass("activated");
      return $(_trigger.changeView.thumbnail).removeClass("activated");
    }
  } else if (type === "time") {
    if (mode === "yearly") {
      $(_target.view.monthly).addClass("banish hide").removeClass("opened");
      $(_target.view.daily).addClass("banish hide").removeClass("opened");
      $(_target.view.yearly).removeClass("hide banish").addClass("opened");
      $(_trigger.changeView.yearly).addClass("activated");
      $(_trigger.changeView.monthly).removeClass("activated")
      return $(_trigger.changeView.daily).removeClass("activated");
    } else if (mode === "monthly") {
      $(_target.view.yearly).addClass("banish hide").removeClass("opened");
      $(_target.view.daily).addClass("banish hide").removeClass("opened");
      $(_target.view.monthly).removeClass("hide banish").addClass("opened");
      $(_trigger.changeView.monthly).addClass("activated");
      $(_trigger.changeView.yearly).removeClass("activated")
      return $(_trigger.changeView.daily).removeClass("activated");
    } else {
      $(_target.view.yearly).addClass("banish hide").removeClass("opened");
      $(_target.view.monthly).addClass("banish hide").removeClass("opened");
      $(_target.view.daily).removeClass("hide banish").addClass("opened");
      $(_trigger.changeView.daily).addClass("activated");
      $(_trigger.changeView.yearly).removeClass("activated")
      return $(_trigger.changeView.monthly).removeClass("activated");
    }
  }
};

$(function() {

  $(".trigger-dropdown").on("click", function(e) {
    var $target, $trigger;
    $trigger = $(e.currentTarget);
    $target = $trigger.next(".list-category");
     cssDropdown['height'] = (typeof $(this).data('height') != 'undefined') ?  $(this).data('height') : 200;
    if (!$trigger.hasClass("activated-menu")) {
      openHiddenMenu($trigger, $target, cssDropdown);
    }
    return false;
  });

    //ヘッダー検索
  $('.js-header_search').on('click', function(e) {
      //if($('.js-header_search_block').css('display') == 'block' && $('.header-page .input-keyword').val() != '') headerSearch();

      //open
      $('.headerLogin,.irai,.jushin').hide();
      $('.js-header_search').animate({'width':'308px'},240,'easeOutQuad');
      $('.header-page .form-search').animate({'width':'269px'},240,'easeOutQuad',function(){
          $('.header-page .input-keyword').focus();
      });
      $('.js-header_search_block').show();
      return false;
  });

  $('.js-btn-header-close').on('click', function(e) {

      //close
      $('.header-page .form-search').animate({'width':'0'},230,'easeOutQuad');
      $('.js-header_search').animate({'width':'28px'},230,'easeOutQuad',function(){
          $('.headerLogin,.irai,.jushin').show();
          $('.js-header_search_block').hide();
      });



      return false;
  });

    //エンターでsubmit
    /*$('.header-page .form-search .input-keyword').keypress(function(e){
        if ( e.which == 13 ){
          headerSearch();
        }
    });*/




  // バルーン

  // 切り替えボタン
  $("#buttonChangeViewThumbnail").on("mouseenter", function(e){
    openBaloon($("#balloonChangeThumbnail"));
    e.preventDefault();
  });

  $("#buttonChangeViewThumbnail").on("mouseleave", function(e){
    closeBaloon($("#balloonChangeThumbnail"));
    e.preventDefault();
  });

  $("#buttonChangeViewList").on("mouseenter", function(e){
    openBaloon($("#balloonChangeList"));
    e.preventDefault();
  });

  $("#buttonChangeViewList").on("mouseleave", function(e){
    closeBaloon($("#balloonChangeList"));
    e.preventDefault();
  });



  // SNSカテゴリー
  $("#buttonCagtegoryFacebook").on("click", function(e){
    $target = $("#cagtegoryFacebook");
    if($("#cagtegoryTwitter").hasClass("displayed")){
      closeBaloon($("#cagtegoryTwitter"));
    }
    if(!$target.hasClass("displayed")){
      openBaloon($target);
      $(document).on("click", "#backdrop", function(){
        closeBaloon($target);
        toggleDropDown(false);
      });
      toggleDropDown(true);
    } else {
      closeBaloon($target);
      $(document).off("click", "#backdrop");
      toggleDropDown(false);
    }
    e.preventDefault();
  });

  $("#buttonCagtegoryTwitter").on("click", function(e){
    $target = $("#cagtegoryTwitter");
    if($("#cagtegoryFacebook").hasClass("displayed")){
      closeBaloon($("#cagtegoryFacebook"));
    }
    if(!$target.hasClass("displayed")){
      openBaloon($target);
      $(document).on("click", "#backdrop", function(){
        closeBaloon($target);
        toggleDropDown(false);
      });
      toggleDropDown(true);
    } else {
      closeBaloon($target);
      $(document).off("click", "#backdrop");
      toggleDropDown(false);
    }
    e.preventDefault();
  });

  // フォローヘルプ
  $("#questionFollowing").on("click", function(e){
    $target = $("#answerFollowing");
    if(!$target.hasClass("displayed")){
      openBaloon($target);
      $(document).on("click", "#backdrop", function(){
        closeBaloon($target);
        toggleDropDown(false);
      });
      toggleDropDown(true);
    } else {
      closeBaloon($target);
      $(document).off("click", "#backdrop");
      toggleDropDown(false);
    }
    e.preventDefault();
  });


  $(document).on("click", ".backdrop", function(e) {
    return closeOpenedMenu();
  });
  $(document).on("click", ".activated", function(e) {
    return closeOpenedMenu();
  });


  $(_trigger.changeView.thumbnail).on("click", function(e) {
    if (!$(e.currentTarget).hasClass("activated")) {
      changeItemView("display", "thumbnail");
      return false;
    } else {
      return false;
    }
  });
  return $(_trigger.changeView.list).on("click", function(e) {
    if (!$(e.currentTarget).hasClass("activated")) {
      changeItemView("display", "list");
      return false;
    } else {
      return false;
    }
  });

});

$(".table-regist-form input, .table-regist-form .textArea_style").focusin(function(){
    $(this).stop().animate({boxShadow: '0 0 8px 3px rgba(41,76,122,0.4)'}, 250, 'easeInOutSine');
}).focusout(function(){
    $(this).stop().animate({boxShadow: '0 0 0 0 rgba(41,76,122,0.4)'}, 150, 'easeInOutSine');
});

(function() {
  window.onresize = setResize;
  function setResize(){
    if($("#carousel").size() > 0){
      setTimeout(function(){
        $(".owl-wrapper").css({"width":"173px"});
        $(".owl-item").css({"width":"173px"});
      }, 380);
    }
  }
  $(window).ready(function() {
    var ua = window.navigator.userAgent.toLowerCase();
    var isIE = (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0);
    if(isIE){
      $(".item-thumbnail-view .item-new").css({"width":"168px", "display":"block"});
    }else{
      $(".item-thumbnail-view .item-new").css({"display":"block"});
    }
    if($("#carousel").size() > 0){
      $("#carousel").flexslider({
        selector: ".container-slide > li",
        animation: "slide",
        direction: "horizontal",
        slideshow: false,
        prevText: "",
        nextText: "",
        itemWidth: 130,
        itemMargin: 12
      });
    }
    if($("#vr-carousel").size() > 0){
      $("#vr-carousel").flexslider({
        selector: ".container-slide > li",
        animation: "slide",
        direction: "horizontal",
        slideshow: false,
        prevText: "",
        nextText: "",
        itemWidth: 130,
        itemMargin: 12
      });
    }

    setResize();
  });

}).call(this);

/**
 * 日付をフォーマットする
 * @param  {Date}   date     日付
 * @param  {String} [format] フォーマット
 * @return {String}          フォーマット済み日付
 */
var formatDate = function (date, format) {
    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
};

/**
 * TV枠用の日付文字
 * @param str
 * @return {String}
 */
var tvCreatedAtStr = function (str) {
    var now = new Date();
    var sys_time = (now.getTime() / 1000);
    var date = new Date(str);
    var ts = (date.getTime() / 1000);
    if (ts > (sys_time - (60 * 60))) {
        return Math.floor((sys_time - ts) / 60) + '分前';
    } else if(ts > (sys_time - (24 * 60 * 60))) {
        return Math.floor((sys_time - ts) / 60 / 60) + '時間前';
    } else if(ts > (sys_time - (7 * 24 * 60 * 60))) {
        return Math.floor((sys_time - ts) / 24 / 60 / 60) + '日前';
    } else {
        return formatDate(date, 'YYYY年MM月DD日 hh時mm分');
    }
};

$(document).on({
  "click":function(evt){
    evt.preventDefault();
    var company_id = parseInt($(this).data('company'));
    var release_id = parseInt($(this).data('release'));
    var regist = parseInt($(this).data('clip'));
    if(regist == 1){
      $(".detailClipBtn").html('<a href="javascript:void(0);" data-clip="0" data-company="'+company_id+'" data-release="'+release_id+'"><img src="/common/v4.1/images/media/icon_heart_s_off.png" width="auto" height="20"></a>');
    }else{
      $(".detailClipBtn").html('<a href="javascript:void(0);" data-clip="1" data-company="'+company_id+'" data-release="'+release_id+'"><img src="/common/v4.1/images/media/icon_heart_s_on.png" width="auto" height="20"></a>');
    }
    $.ajax({
      url: '/api/recommend_release_clip.php',
      type:'POST',
      dataType: 'json',
      data : {
        'company_id':company_id,
        'release_id':release_id,
        'regist':regist
      },
      timeout:1000,
      success: function() {
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
      }
    });
  }
}, '.detailClipBtn a');

if($('.input-keyword').size() > 0){
  var autoCompleteBox;
  $('.input-keyword').autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "https://www.google.com/complete/search",
        data: {hl:'ja', client:'firefox', q: request.term},
        dataType: "jsonp",
        type: "GET",
        success :function(data) {
          var key_array = [];
          var e_num = 0;
          var s_max = data[1].length;

          var send_text = '';

          $.each(data[1], function(index, elm) {
            var params = {};
            if(!autoCompleteBox.hasClass('input-keyword-company')){
              params.type = 'search';
              params.page = 1;
              params.v = elm;
              params.limit = 10;
            }else{
              params.type = 'provider';
              params.search = 'searchrlp';
              params.page = 1;
              params.v = Number($('input#follow_company_id').val());
              params.limit = 10;
              params.kw = elm;
            }
            var random = new Date().getTime();
            params.random = random;
            $.ajax({
              url: 'https://prtimes.jp/api/search_release.php',
              type: 'get',
              data: params,
              dataType: 'jsonp',
              cache: true,
              success: function (data) {
                e_num++;
                if (data.articles.length > 0) {
                  send_text += '<div>' + elm + '</div>';
                }
                if(e_num == s_max){
                  if(send_text != ''){
                    $.ajax({
                      url: '/api/google_get_natural_language_pn_json.php',
                      type: 'POST',
                      data: {
                        "an_text": send_text
                      },
                      dataType: 'json',
                      timeout: 10000,
                      success: function (entity_data) {
                        $.each(entity_data.sentences, function(index_entity, elm_entity) {
                          if(Number(elm_entity.sentiment.score) >= 0){
                            key_array.push(elm_entity.text.content);
                          }
                        });
                        response(key_array);
                        $('.ui-autocomplete').css({'z-index':'1000'});
                      }
                    });
                  }
                }
              }
            });
          });
        }
      });
    },
    autoFocus: false,
    delay: 400,
    minLength: 3
  });

  $('.ui-autocomplete').on({
    'click':function(evt){
      if($('#headerPage .input-keyword').val() == ''){
        headerSearch(0);
      }else{
        headerSearch(1);
      }
    }
  });
  $('.input-keyword').on({
    'keydown':function(evt){
      autoCompleteBox = $(this);
      if(!autoCompleteBox.hasClass('input-keyword-company')){
        if(evt.keyCode == 13){
          if($(this).parents('.header-page').size() > 0){
            headerSearch(1);
          }else{
            headerSearch(0);
          }
        }
      }
    }
  });
  $('.form-search-right button').on({
    'click':function(evt){
      headerSearch(0);
    }
  });
}


function headerSearch(num){
  var base = '/main/action.php?run=html&page=searchkey&search_word=';
  var url;
  if(num == 1){
    url = base + encodeURIComponent($('#headerPage .input-keyword').val()) + '&search_pattern=' + $('.header-search_pattern').val();
  }else{
    url = base + encodeURIComponent($('#sidebar .input-keyword').val()) + '&search_pattern=' + $('.header-search_pattern').val();
  }
  //return false;
  window.location.href = url;
}
