(function() {
  var $body, $containerCount, $containerShareSide, adjustShare, threshold, timerResize, timerShare, uriTarget;

  $containerCount = {

    /*Twitterカウント数表示コンテナ */
    twitter: $(".container-share .twitter .num"),

    /*Google+カウント数表示コンテナ */
    googleplus: $(".container-share .google .num"),

    /*はてなブックマークカウント数表示コンテナ */
    hatena: $(".container-share .hatena .num")
  };


  /*対象URL */

  uriTarget = location.href;


  /*エレベーターメニューコンテナ */

  $containerShareSide = $("aside.side-share");


  /*エレベーターメニュー表示閾 */

  threshold = {

    /* ウインドウ幅 */
    windowWidth: 1280,

    /* 消失タイマー */
    vanish: 3000
  };

  $body = $("body");

  timerShare = timerResize = false;

  $(function() {

    /*
      カウント数の表示
     */
    /*$.si.twitter.getEntryCount(uriTarget, function(r) {
      $containerCount.twitter.text(r);
    });*/
    /*$.si.googleplus.getEntryCount(uriTarget, function(r) {
      $containerCount.googleplus.text(r);
    });*/
    /*var hatena_count = 0;
    $.si.hatebu.getEntryCount(uriTarget, function(r) {
      if(r != null) hatena_count += r.count;
      $.si.hatebu_http.getEntryCount(uriTarget, function(s) {
        if(s != null) hatena_count += s.count;
        if(hatena_count > 0){
          $containerCount.hatena.text(hatena_count);
        }
      });
    });*/

    /*
      エレベーターメニュー
     */

    /* 初期設定 */
    adjustShare();

    /* リサイズした時に再度画面サイズを取得 */
    $(window).on("resize", function() {
      if (timerResize) {
        clearTimeout(timerResize);
      }
      return timerResize = setTimeout(function() {
        adjustShare();
      }, 200);
    });

    /* スクロールで発火 */
    $(window).on("scroll", function() {
      if ((($body.hasClass("scrolled-entry")) && ($body.hasClass("wide"))) || $body.hasClass("season-special")) {

        /* 消えている場合は再度表示してタイマーをリセット */
        if ($containerShareSide.is(":hidden")) {
          $containerShareSide.fadeIn("normal");
        }
        if (timerShare) {
          clearTimeout(timerShare);
        }

        /* タイマーがオフになってなければカウント開始 */
        if (!$containerShareSide.hasClass("timer-off")) {
          return timerShare = setTimeout(function() {
            $containerShareSide.fadeOut("fast");
          }, threshold.vanish);
        }
      } else {
        $containerShareSide.fadeOut("fast");
      }
    });

    /* MOUSE ENTER でタイマーリセットかつオフ */
    $containerShareSide.on("mouseenter", function() {
      $containerShareSide.addClass("timer-off");
      if (timerShare) {
        clearTimeout(timerShare);
        $containerShareSide.fadeIn("fast");
      }
    });

    /* MOUSE LEAVE でタイマースタート */
    $containerShareSide.on("mouseleave", function() {
      $containerShareSide.removeClass("timer-off");
      timerShare = setTimeout(function() {
        $containerShareSide.fadeOut("slow");
      }, threshold.vanish);
    });
  });


  /*
    関数
   */

  adjustShare = function() {
    if ($(window).outerWidth() > threshold.windowWidth) {
      $body.addClass("wide").removeClass("narrow");
      if ($body.hasClass("scrolled-entry")) {
        return $containerShareSide.fadeIn("fast");
      } else {
        return $containerShareSide.removeAttr("style");
      }
    } else {
      $body.removeClass("wide").addClass("narrow");
      if ($body.hasClass("scrolled-entry")) {
        return $containerShareSide.fadeOut("fast");
      }
    }
  };


  $.social = $.social || {};

  $.si = $.social.info = {
    jsonp: function(p) {
      return $.ajax({
        url: p.url,
        dataType: "jsonp",
        data: p.data,
        success: function(r) {
          p.callback(r);
        }
      });
    },
    reArg: function(url, callback) {
      if (typeof url === "object") {
        return url;
      }
      if (typeof url === "function") {
        callback = url;
        url = "";
      }
      url = url || location.href;
      return {
        url: url,
        callback: callback
      };
    },
    cache: {
      twitter: {
        entryCount: {}
      }
    },
    version: "0.2",
    id: "social-info",
    name: "Social Info"
  };

  $.si.facebook = {
    getEntryCount: function(url, callback) {
      var arg;
      arg = $.si.reArg(url, callback);
      return $.si.jsonp({
        url: "https://graph.facebook.com/",
        data: {
          id: arg.url
        },
        callback: function(r) {
          arg.callback(r.shares || 0);
        }
      });
    }
  };

}).call(this);
