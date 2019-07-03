/**
 * ヒートマップ データ集計 送信 (PC,SP共通)
 *
 * ページの全体の長さを100%として1秒ごとにブラウザ上で見えている範囲の割合をインクリメント
 * ページ離脱時にデータを送信
 */
(function () {
    $(window).load(function () {
        if(document.URL.match('owner=1')) return false;
        var setTimer;
        var height   = {};
        var hasSent  = false;
        var $elm     = {
            pc : {
                area : $('main .inner')
            },
            sp : {
                area : $('main article')
            }
        };
        var methods  = {
            makeInitObj : function(){
                for (var i=1 ; i<=100 ; i++){
                    param.contents[i] = 0;
                }
            },
            getDeviceType : function(){
                var ua = window.navigator.userAgent.toLowerCase();
                var res = '';
                if((ua.indexOf('android') > 0 && ua.indexOf('mobile') == -1) || ua.indexOf('ipad') > 0 || ua.indexOf('kindle') > 0 || ua.indexOf('silk') > 0){
                    res = 'pc';
                } else if ((ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) || ua.indexOf('iphone') > 0 || ua.indexOf('blackberry') > 0 || ua.indexOf('iphone') > 0){
                    res = 'sp';
                } else {
                    res = 'pc';
                }
                return res;
            },
            convertPercentage : function(ref,num){
                return Math.floor(num / ref * 100);
            },
            getHeight : function(device){
                var res  = {
                    document : $elm[device].area.height(),
                    browser  : $(window).outerHeight(true)
                };
                return res;
            },
            //現在表示されている領域(%)の表示秒数をインクリメント
            setData : function (device) {
                setTimer = setInterval( function () {
                    height = methods.getHeight(device);
                    //var elmOffset = $elm[device].start.offset(); ヘッダーを含まない場合  ＊$(document).scrollTop() - elmOffset.top

                    var range = {
                        start : methods.convertPercentage(height.document,$(document).scrollTop() ),
                        end   : methods.convertPercentage(height.document,$(document).scrollTop() + height.browser)
                    };

                    $.each(param.contents, function(i, val) {
                        if(range.start <= i && i <= range.end) param.contents[i]++;
                    });
                    //console.log(height);console.log(range);console.log(param.contents);
                } , 1000);
            },
            getStayContents : function(obj){
                var res             = {};
                var isContinuedZero = true;
                for (var i=100;i>=1;i--){
                    if(obj[i] == 0 && isContinuedZero) {
                        res[i] = 0
                    }else{
                        isContinuedZero = false;
                        res[i] = 1
                    }
                }
                return res;
            },

            sendData : function(async){
                clearInterval(setTimer);
                param.stay_contents = JSON.stringify(methods.getStayContents(param.contents));
                param.contents      = JSON.stringify(param.contents);

                $.ajax({
                    timeout : 10000,
                    type    : 'Put',
                    async   : async,
                    url     : '/prn/hm-put',
                    data    : param,
                    //success : function(data){console.log(data)}
                });

            }
        };

        var device = methods.getDeviceType();
        var param = {
            company_id    : s_company_id,
            release_id    : s_release_id,
            device_info   : device,
            contents      : {},
            stay_contents : {}
        };

        methods.makeInitObj();
        methods.setData(device);

        $(window).resize(function () {
            height = methods.getHeight(device);
        });

        //フォーカスが外れたらデータ送信
        $(window).on('blur',function(){
            if(!hasSent) methods.sendData(true);
            hasSent = true;
        });

        //ブラウザから離れたらデータ送信
        $(window).unload(function() {
            if(!hasSent) methods.sendData(false);
        });


    });
}());
