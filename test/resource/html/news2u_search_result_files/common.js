/* ================================================== */
/* Common */
/* ================================================== */
function imgC(obj)
{
    var fpath = obj.src;
    if( fpath.match(/_on/) ){
        obj.src = fpath.replace(/_on/,'');
    }else{
        if( fpath.match(/png/) ){
            obj.src = fpath.replace(/.png/,'_on.png');
        }
        if( fpath.match(/jpg/) ){
            obj.src = fpath.replace(/.jpg/,'_on.jpg');
        }
        if( fpath.match(/gif/) ){
            obj.src = fpath.replace(/.gif/,'_on.gif');
        }
    }
}

function setLimit(obj, url) {
    obj = $(obj);
    if (obj.val() != '') {
        if(location.search){
            url = location.href.replace(location.search, '');
            location.href = url + '?limit=' + obj.val();
        }else{
            location.href = location.href + '?limit=' + obj.val();
        }
    }
}

function locationMove(url){
    location.href = url;
}

function openWindow(obj,width, height){
    if(!width){
        width = 680;
    }
    if(!height){
        height = 550;
    }
    conditions = 'width=' + width + ', height=' + height + ', toolbar=no, location=yes, resizable=yes, scrollbars=yes';
    window.open(obj.href, null, conditions);
    return false;
}

function fontSizeController(size){
    var bodyElement    = $('body');
    //var bodyElement    = $('#pagebody');
    var fontSelectSize = "86%";

    switch(size){
        case 'S':
            fontSelectSize = "80";
            fontSizeControllerBackgroundReset();
            $('#fontSizeS').css('background', 'url(/common/images/font.gif) -37px -23px no-repeat');
            break;
        case 'M':
            fontSelectSize = "86";
            fontSizeControllerBackgroundReset();
            $('#fontSizeM').css('background', 'url(/common/images/font.gif) -57px -23px no-repeat');
            break;
        case 'L':
            fontSelectSize = "110";
            fontSizeControllerBackgroundReset();
            $('#fontSizeL').css('background', 'url(/common/images/font.gif) -77px -23px no-repeat');
            break;
        default :
            fontSelectSize = "86";
            fontSizeControllerBackgroundReset();
            $('#fontSizeM').css('background', 'url(/common/images/font.gif) -57px -23px no-repeat');
            break;
    };

    bodyElement.css('fontSize', fontSelectSize + '%');
}

function fontSizeControllerBackgroundReset(){
    $('#fontSizeS').css('background', 'url(/common/images/font.gif) -37px 0px no-repeat');
    $('#fontSizeM').css('background', 'url(/common/images/font.gif) -57px 0px no-repeat');
    $('#fontSizeL').css('background', 'url(/common/images/font.gif) -77px 0px no-repeat');
}

/* ================================================== */
// toppage 

function gotoToppage(){

    location.href = '/';
}

function showMenuBox(id, menuid)
{
    var subMenuObj = $('#' + id);
    var menuObj = $('#' + menuid);
    
    if(subMenuObj.css('display') != 'block'){
        var menuOffset = menuObj.position();
        subMenuObj.css({
            'top' : menuOffset.top + 'px',
            'left' : menuOffset.left + 175 + 'px'
        }).show();
    }
}

function hideMenuBox(id)
{
    $('#' + id).hide();
}

function hideMenuSubBox(id)
{
    $('#' + id).hide();
}

function mousePosition(event){
    if (!event) var event=window.event;
    if (!event.pageX) event.pageX = event.clientX + document.body.scrollLeft;
    if (!event.pageY) event.pageY = event.clientY + document.body.scrollTop;
    //alert("x:" + event.pageX + " y:" + event.pageY);
    
    positions = {
        x : event.pageX,
        y : event.pageY
    }
    return positions;
}

/* ================================================== */
function subWindow_show( obj,id ){
    var obj = $(obj);
    var id  = $('#' + id);
    //objectの位置を取得
    var objOffset = obj.position();
    id.css({
        'top' : objOffset.top + obj.height() + 'px',
        'left' : objOffset.left + 'px'
    }).show();
}

function subWindow_close( obj,id ){
    $('#' + id).hide();
}

function subWindow_show_cate(obj,listid){
    var listid = $('#' + listid);
    $(obj).show();
    listid.css('background-color', '#44bb99');
    $('a', listid).css('color', '#ffffff');
}

function subWindow_show_regi(obj,listid){
    var listid = $('#' + listid);
    $(obj).show();
    listid.css('background-color', '#faaa33');
    $('a', listid).css('color', '#ffffff');
}

function subWindow_show_indu(obj,listid){
    var listid = $('#' + listid);
    $(obj).show();
    listid.css('background-color', '#cc7788');
    $('a', listid).css('color', '#ffffff');
}

function subWindow_close_this( obj, id, listid, setBgColor ){
    var listid = $('#' + listid);
    $('#' + id).hide();
    listid.css('background-color', '#ffffff');
    $('a', listid).css('color', '');
}

/* ================================================== */
// 
function imageReleaseItemChange(id)
{
    var itemClassName = 'imageReleaseItem';
    var itemName = $('#' + itemClassName + '_' + id);

    var elements = $('.' + itemClassName, '#imageRelease');

    elements.hide();
    //elements.each(function(){
    //    $(this).hide();
    //});
    itemName.show();
}

/* ================================================== */
// その他のリリース表示（toppage ONLY）
function otherReleaseElementShow(objId,id)
{
    $('#' + objId).css({
        'background-color': '#889cdd',
        'color': '#ffffff'
    });
    $('#' + id).show();
}

function otherReleaseElementHide(objId,id)
{
    $('#' + objId).css({
        'background-color': '',
        'color': ''
    });
    $('#' + id).hide();
}

function otherReleaseView(obj, elementId){
    var obj = $(obj);
    var element = $('#' + elementId);
    //objctの位置を取得
    var objOffset = obj.position();

    $(obj).css({
        'background-color': '#889cdd',
        'color': '#ffffff'
    });

    element.css({
        'top': objOffset.top - 3 + obj.height() + 'px',
        'left': objOffset.left + 'px'
    }).show();
}

/* ================================================== */
function showcirItemsLists(obj, id){
    $(obj).hide();
    $('#' + id).show();
}

function closecirItemsLists(btn, lay){
    $('#' + btn).show();
    $('#' + lay).hide();
}

function selectSupportFunction(obj){
    if ($(obj).val() != '') {
        location.href = $(obj).val();
    }
}
/* ================================================== */
// ClickLog
function releaseClickLoging(obj, corporateId, releaseId, api_host ){
    if ( !api_host ) {
        return false;
    }
    var params = {
        release_id : parseInt(releaseId),
        uri        : obj.title ? obj.title : obj.href,
        timestamp  : new Date().getTime()
    };
    var url = api_host + 'log/c?' + $.param(params);

    var countimg = new Image();
    countimg.src = url;
}

function releaseClickLoginSetup(corporateId, releaseId, api_host){
    /*var elements = $('#releaseText a');
    elements.each(function(){
        $(this).bind('click', function(){
            releaseClickLoging(this, corporateId, releaseId, api_host);
        });
    });*/
    $('.release_contents a').click(function(){
        releaseClickLoging(this, corporateId, releaseId, api_host);
    });
}
/* ================================================== */
// DownLoadLog
function itemDownLoging(obj, corporateId, releaseId, sequenceId, api_host ){
    if ( !api_host ) {
        return;
    }

    var params = {
        release_id  : parseInt(releaseId),
        sequence_id : sequenceId,
        uri         : obj.href,
        timestamp   : new Date().getTime()
    };
    var url = api_host + 'log/d?' + $.param(params);
    var countimg = new Image();
    countimg.src = url;
}

/* ================================================== */
// リリース一覧のプレビュー機能
function previewDocument(id, imgElement, releaseId, URL_API){
    var imgObj = $(imgElement);
    var obj    = $('#' + id);
    var mover  = new Mover(id);
    mover.second = 0.2;

    if(!URL_API){
        URL_API = 'http://api.news2u.net/';
    }

    if(imgObj.attr('src').match('icon_zoomin.gif')){
            mover.start(function(){
                obj.height(300).hide();
            });
            previewDocumentAjax(releaseId, id);

            try {
                var news2uPageTracker = new tracker();
                news2uPageTracker._releaseId(releaseId);
                news2uPageTracker._initData();
                news2uPageTracker._pageview(URL_API);
            }catch(error){
                alert(error);
            }

            imgObj.attr('src', '/common/images/icon_zoomout.gif');
    }else{
            imgObj.attr('src', '/common/images/icon_zoomin.gif');
            mover.back(function(){
                obj.height(0);
            });
    }
}

function previewDocumentCloseLink(id, imgId){
    $('#' + imgId).attr('src', '/common/images/icon_zoomin.gif');
    $('#' + id).hide();
}

function previewDocumentAjax(releaseId, targetId){
    var url = '/releases/preview/' + releaseId;
    var target = $('#' + targetId);
    var loadingImg = '<p style="text-align:center;margin:5em;"><img src="/common/images/ajax-loader.gif" border="0" alt="読み込み中" /></p>';
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        beforeSend: function(){
            target.html(loadingImg);
        },
        success: function(data, status, xhr) { 
            target.html(data);
        }
    });
}

/* ================================================== */
// リリース毎のお問い合せ
function releaseInquiry(releaseId, corporateId){
    var obj = $('#releaseInquiryBlockBox');
    if( obj.html() == '' ){
        var url = '/release_inquiries/input';
        var params = {
            corporate_id : corporateId,
            release_id   : releaseId
        };
        releaseInquiryAjax(url, params);
    }else{
        obj.html('');
    }
}

function releaseInquiryConfirm(){
    var url     = '/release_inquiries/confirm';
    var formObj = $('#releaseInquiryBoxForm');
    var inputObj = $(':input[name]', formObj);
    var params  = {};
    inputObj.each(function(){
        params[$(this).attr('name')] = $(this).val();
    });
    releaseInquiryAjax(url, params);
}

function releaseInquiryBack(){
    var url = '/release_inquiries/complete';
    var formObj = $('#releaseInquiryBoxForm');
    var inputObj = $(':input[name]', formObj);
    var params  = {};
    params['back'] = '戻る';
    inputObj.each(function(){
        params[$(this).attr('name')] = $(this).val();
    });
    releaseInquiryAjax(url, params);
}

function releaseInquiryComplete(){
    var url = '/release_inquiries/complete';
    var formObj = $('#releaseInquiryBoxForm');
    var inputObj = $(':input[name]', formObj);
    var params  = {};
    inputObj.each(function(){
        params[$(this).attr('name')] = $(this).val();
    });
    releaseInquiryAjax(url, params);
}

function releaseInquiryAjax(url, params){
    var loadingImg = '<img src="/common/img/loading.gif" width="16" height="16" alt="読み込み中" class="loading">';
    var target = $('#releaseInquiryBlockBox');
    var loading_target = $('p.release_inquiry');
    $.ajax({
        url: url,
        type: 'POST',
        data: params,
        beforeSend: function(){
            loading_target.append(loadingImg);
        },
        success: function(data, status, xhr) {
            $('img.loading', loading_target).remove();
            target.html(data);
        }
    });
}

function closeReleaseInquiryForm() {
    $('#releaseInquiryBlockBox').hide();
}


/* ================================================== */
// 問題点報告
function openViolation(obj, release_id) {
    var vioWinObj = $('#violationWindow');
    if (vioWinObj.html() == '') {
        var url = '/violations/';
        var params = {
            'release_id': release_id,
            'time'      : new Date/1000|0
        };
        violationAjax(url, params);
    } else {
        closeViolationForm();
    }
}

function violationAjax(url, params) {
    var vioWinObj = $('#violationWindow');
    var loadingImg = '<img src="/common/img/loading.gif" width="16" height="16" alt="読み込み中" class="loading">';
    var temp_params = params;
    var loading_target = $('div.release_report p');
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: params,
        beforeSend: function() {
            loading_target.append(loadingImg);
        },
        success: function(data, status, xhr) { 
            $('img.loading', loading_target).remove();
            vioWinObj.html(data);
        }
    });
}

function violationConfirm() {
    var url     = '/violations/confirm';
    var formObj = $('#ViolationConfirmForm :input[name]');
    var params  = {};
    formObj.each(function() {
        if ($(this).attr('name') == 'data[Violation][reporter_email_check]') {
            if ($(this).is(':checked')) {
                params[$(this).attr('name')] = $(this).val();
            }
        } else if ($(this).attr('name') != 'data[Violation][type]') {
            params[$(this).attr('name')] = $(this).val();
        } else if ($(this).is(':checked')) {
            params[$(this).attr('name')] = $(this).val();
        }
        if (!params['data[Violation][type]']) {
            params['data[Violation][type]'] = '';
        }
    });
    violationAjax(url, params);
}

function violationBack() {
    var url = '/violations/complete';
    var formObj = $('#ViolationCompleteForm :input[name]');
    var params  = {};
    params['back'] = '戻る';
    formObj.each(function() {
        params[$(this).attr('name')] = $(this).val();
    });
    violationAjax(url, params);
}

function violationComplete(){
    var url = '/violations/complete';
    var formObj = $('#ViolationCompleteForm :input[name]');
    var params  = {};
    formObj.each(function() {
        params[$(this).attr('name')] = $(this).val();
    });
    violationAjax(url, params);
}

function closeViolationForm() {
    $('#violationWindow').html('');;
    return false;
}


/* ================================================== */
//週間ランキング取得
function getWeeklyRanking() {
    var obj = $('#weekly_ranking_target_date');
    if (obj.val() != '') {
        var targetDate = obj.val().split(',');
        
        for(var i=0; i<targetDate[3]; i++){
            var noneLayName = '#rakingList_weekly_' + i;
            $(noneLayName).hide();
        }
        var layName = '#rakingList_weekly_' + targetDate[0];
        $(layName).show();
        $('#weekly').html(targetDate[1] + '～' + targetDate[2] + 'の週間アクセスランキング TOP10');
    }
}

// 月間ランキング取得
function getMonthlyRanking(){
    var obj = $('#monthly_ranking_target_date');
    if (obj.val() != '') {
        var targetDate = obj.val().split(',');
        
        for(var i=0; i<targetDate[2]; i++){
            var noneLayName = '#rakingList_monthly_' + i;
            $(noneLayName).hide();
        }
        var layName = '#rakingList_monthly_' + targetDate[0];
        $(layName).show();
        $('#monthly').html(targetDate[1] + 'の月間アクセスランキング TOP20');
    }
}

// 年間ランキング取得
function getYearlyRanking(){
    var obj = $('#yearly_ranking_target_date');
    if (obj.val() != '') {
        var targetDate = obj.val().split(',');
        
        for(var i=0; i<targetDate[2]; i++){
            var noneLayName = '#rakingList_yearly_' + i;
            $(noneLayName).hide();
        }
        var layName = '#rakingList_yearly_' + targetDate[0];
        $(layName).show();
        $('#yearly').html(targetDate[1] + 'の年間アクセスランキング TOP30');
    }
}

//
function getKeywordRanking(){
    var obj = $('#keyword_ranking_target_date');
    if (obj.val() != '') {
        var targetDate = obj.val().split(',');
        
        for(var i=0; i<targetDate[3]; i++){
            var noneLayName = '#rakingList_keyword_' + i;
            $(noneLayName).hide();
        }
        var layName = '#rakingList_keyword_' + targetDate[0];
        $(layName).show();
        $('#keyword').html(targetDate[1] + '～' + targetDate[2] + 'の話題のキーワードランキング TOP20');
    }
}

/* ================================================== */
// search

function s_tgtChage() {
    $('#s_tgt').value = "c";
}

function searchMore(){
    location.href = "/search?q=" + $('#q').val() + '&t=r&searchMore=1';
}

function searchSubmitHeader(searchType){
    if(!searchType){
        searchType = 'r';
    }
    var query = '';
    query += '&t=' + searchType;
    location.href = "/search?q=" + encodeURIComponent($('#q').val()) + query;
}

function searchMoreSubmit(searchType){
    if(!searchType){
        searchType = 'r';
    }
    var query  = $("#FormsearchBoxMore").serialize();
        query += '&t=' + searchType;
    location.href = "/search?" + query + '&searchMore=1';
}

function searchMoreReset(){
    var formObj = $('#FormsearchBoxMore');
    $('input:text', formObj).val('');
    $('input:checkbox:checked', formObj).removeAttr('checked');
    $('.falseLink', formObj).attr('checked_flag', 'false');
    $('select[name*=_date]', formObj).val('');
    $('select:not([name*=_date])', formObj).val('0');
    $('input:radio', formObj).attr('checked', false);
    $('select[name=market]', formObj).attr('disabled', true);
}

function selectAllCheckbox(obj, targetId) {
    var obj = $(obj);
    var target = $('#' + targetId + ' input:checkbox');
    var checked_flag = obj.attr('checked_flag');
    if(checked_flag == 'true'){
        target.removeAttr('checked');
        obj.attr('checked_flag', 'false');
    }else{
        target.attr('checked', 'checked');
        obj.attr('checked_flag', 'true');
    }
}

function searchMoreSetUp(){
    $('#searchMoreOpen').show();
    $('#searchMoreClose').hide();
    var query = location.search.replace(/^\?/, '');
    if(query.match('searchMore=1')){
        searchMoreOpen();
    }
}

function searchMoreOpen(){
    effect = new Mover('searchBoxMore');
    effect.second = 0.5;
    effect.start(function(){
        $('#searchBoxMore').css('height', 'auto').hide();
        $('#searchMoreOpen').hide();
        $('#searchMoreClose').show();
        // is_public radio control
        $(function() {
            $("[name='is_public']").click(function(){
                    if ($("[name='is_public']:checked").val() == '1') {
                    $("[name='market']").attr("disabled",false);
                } else {
                    $("[name='market']").attr("disabled",true);
                }
            });
        });
        if ($("[name='is_public']:checked").val() == '1') {
            $("[name='market']").attr("disabled",false);
        }
    });
}

function searchMoreClose(){
    effect.back(function(){
        $('#searchBoxMore').css('height', '0');
        $('#searchMoreOpen').show();
        $('#searchMoreClose').hide();
    });
}

    


/* ================================================== */
// Headlines

    function toggleYearMenu(year, req_year, cur_year) {
        var obj = $('#menu' + year + ' :first-child');
        if (obj.hasClass('icon1')) {
            for (y = 2003; y <= cur_year; y++) {
                $('#calendar_' + y).hide();
                $('#menu' + y + ' :first-child').attr('class', 'icon1');
            }
            obj.attr('class', 'icon2');
            $('#calendar_' + year).show();
            if (year != req_year) {
                toggleMonthMenu(year, 1, req_year, 1);
            }
        } else {
            obj.attr('class', 'icon1');
            $('#calendar_' + year).hide();
        }
    }
    
    function toggleMonthMenu(year, month, req_year, req_month) {
        var obj = $('#ym_' + year + month);
        if (obj.attr('class').match(/_on$/)) {
            // Do nothing.
        } else {
            for (i = 1; i <= 12; i++) {
                if (i == month) {
                    obj.attr('class', obj.attr('class') + '_on');
                } else {
                    $('#ym_' + year + i).attr('class', $('#ym_' + year + i).attr('class').replace(/_on$/, ''));
                }
            }
            // show loading animation
            $('#calendarMenuTable_' + year).html('<div style="text-align:center;height:125px;"><img src="/common/images/ajax-loader.gif" style="margin:12px auto;" /></div>');

            $.getJSON(
                '/mailservice/jsonCalendar/' + year + '/' + month,
                null,
                function(req, status) { 
                    displayCalendar(req, year, month, req_year, req_month);
                }
            );
        }
    }
    
    function displayCalendar(req, year, month, day, req_year, req_month) {
        var data = req;
        var html = '<table><tr><th class="sun">日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th class="sat">土</th></tr>';
        var cols = 0;
        for (var i in data.calendar) {
            for (cols; cols < data.calendar[i]["w"]; cols++) {
                html += '<td></td>';
            }
            if (data.calendar[i]["w"] == 0) {
                html += '<tr>';
                cols = 0;
            }
            if (data.calendar[i]["w"] == 0) {
                html += '<td class="sun">';
            } else if (data.calendar[i]["w"] == 6) {
                html += '<td class="sat">';
            } else if (data.calendar[i]["h"] == true) {
                html += '<td class="holiday">';
            } else if (year == req_year && month == req_month && i == day) {
                html += '<td class="presentLocation">';
            } else {
                html += '<td>';
            }
            if (data.calendar[i]["r"] == true) {
                html += '<a href="/mailservice/archives/' + year + '/' + month + '/' + data.calendar[i]["d"] + '">' + data.calendar[i]["d"] + '</a>';
            } else {
                html += data.calendar[i]["d"];
            }
            cols++;
            html += '</td>';
            if (data.calendar[i]["w"] == 6) {
                html += '</tr>';
            }
        }
        if (cols < 6) {
            for (cols; cols <= 6; cols++) {
                html += '<td></td>';
            }
            html += '</tr>';
        }
        html += '</table>';
        $('#calendarMenuTable_' + year).html(html);
    }
