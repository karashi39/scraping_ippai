objectFitImages();

$(function() {
    var nav = $('#fixed-nav');
    var nav_top = nav.offset().top;
    var main_top = $('.main-area').offset().top;
    var pixel = 'px';

    // 固定ヘッダーの設定
    $(window).scroll(function () {
        if($(window).scrollTop() >= nav_top) {
            var main_mergin_top = $('.main-area').css('margin-top');
            $('.main-area').css('padding-top', 'calc(' + main_top + pixel + ' - ' + nav_top + pixel + ' - ' + main_mergin_top + ')');
            nav.addClass('fixed-top');
        } else {
            $('.main-area').css('padding-top', '0');
            nav.removeClass('fixed-top');
        }
    });

    // 二重サブミット防止
    var submit_enable = "true";
    $('form').submit(function() {
    	$('form').children().find('button').addClass('disabled');

    	if (submit_enable === "false") {
            return false;
        }
        submit_enable = "false";
        setTimeout(function() {
            submit_enable = "true";
            $('form').children().find('button').removeClass('disabled');
        }, 600000);
    });

    // ページネーションの二重クリック防止
    $('ul.pagination a').click(function() {
        if ($(this).hasClass('disabled')) {
                return false;
        }

        $('ul.pagination a').addClass('disabled');

        setTimeout(function() {
        	$('ul.pagination a').removeClass('disabled');
        }, 600000); // ms

    });
});

/**
 * 住所を自動入力する（引数4つは対象のinput:textのname）
 * @param {string} postcode 郵便番号
 * @param {string} prefectures 都道府県
 * @param {string} address1 住所
 * @param {string} address2 ビル名（実行時に前回の入力をクリアするため）
 * @return {boolean} true=成功, false=失敗
 */
function searchPostcode(postcode, prefectures, address1, address2) {
    var postcode_val = $('input:text[name=' + postcode + ']').val();

    $('input:text[name=' + prefectures + ']').val('');
    $('input:text[name=' + address1 + ']').val('');
    $('input:text[name=' + address2 + ']').val('');
    $('input:text[name=' + postcode + ']').focus();

    var regex = /^\d{3}-\d{4}$/;
    if(!regex.test(postcode_val)) {
        return false;
    }

    $.ajax({
        url: 'https://map.yahooapis.jp/search/zip/V1/zipCodeSearch',
        data: {
            query: postcode_val,
            appid: 'dj00aiZpPXBRa21KZFBIUHNrbSZzPWNvbnN1bWVyc2VjcmV0Jng9YTY-',
            results: '1',
            detail: 'full',
            output: 'json',
        },
        dataType: "jsonp",
        error: function() {
            return false;
        },
        success: function(result) {
            if(Number(result.ResultInfo.Count) != 1) {
                return false;
            }

            var address_element = result.Feature[0].Property.AddressElement;
            var shozaichi_todofuken = address_element[0].Name;
            var shozaichi = "";
            for(var i=1; i<address_element.length; i++) {
                shozaichi = shozaichi + address_element[i].Name;
            }

            var p = $('input:text[name=' + prefectures + ']');
            var a = $('input:text[name=' + address1 + ']');
            // 取得した値を代入
            p.val(shozaichi_todofuken);
            a.val(shozaichi);
            // ラベルのクラスをactiveにするため
            p.focus();
            a.focus();
        },
    });
}


/* CHARACTER COUNTER */
// 送信データと同様に改行コードを2文字としてカウントするよう修正
(function ($) {
    $.fn.characterCounter = function () {
        return this.each(function () {
            var itHasLengthAttribute = $(this).attr('length') !== undefined;
            if (itHasLengthAttribute) {
                $(this).on('input', updateCounter);
                $(this).on('focus', updateCounter);
                $(this).on('blur', removeCounterElement);
                addCounterElement($(this));
            }
        });
    };

    function updateCounter() {
        var maxLength = Number($(this).attr('length'));
        var api_value = $(this).val(); // LF
        var submission_length = api_value.replace(/\r?\n/g, '\r\n').length; // LF -> CRLF
        var actualLength = Number(submission_length);
        var isValidLength = actualLength <= maxLength;
        $(this).parent().find('span[class="character-counter"]').html(actualLength + '/' + maxLength);
        addInputStyle(isValidLength, $(this));
    }

    function addCounterElement($input) {
        var $counterElement = $('<span/>').addClass('character-counter').css('float', 'right').css('font-size', '12px').css('height', 1);
        $input.parent().append($counterElement);
    }

    function removeCounterElement() {
        $(this).parent().find('span[class="character-counter"]').html('');
    }

    function addInputStyle(isValidLength, $input) {
        var inputHasInvalidClass = $input.hasClass('invalid');
        if (isValidLength && inputHasInvalidClass) {
            $input.removeClass('invalid');
        } else if (!isValidLength && !inputHasInvalidClass) {
            $input.removeClass('valid');
            $input.addClass('invalid');
        }
    }
})(jQuery);