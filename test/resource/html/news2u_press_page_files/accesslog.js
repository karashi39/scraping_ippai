/* ================================================== */
var tracker = function(){
    this.initialize();
}
tracker.prototype = {
    _url     : 'log/p',
    _itemurl : 'log/i',
    _data : {
        release_id  : '',
        sequence_id : '',
        referer     : '',
        usesr_id    : '',
        timestamp   : ''
    },

    initialize: function(){
    },
    
    _releaseId:function(releseId){
        if(releseId){
            this._data.release_id = releseId;
        }
    },
    
    _item_sequenceId:function(sequenceId){
        if(sequenceId){
            this._data.sequence_id = sequenceId;
            this._url = this._itemurl;
        }
    },
    
    _initData: function() {
        this._data.referer    = document.referrer;
        this._data.timestamp  = new Date().getTime();
    },
    
    _pageview: function( api_host ) {
        if ( !api_host ) {
            return;
        }
        var url = api_host + this._url + '?' + $.param(this._data);

        var countimg = new Image();
        countimg.src = url;
        //var tag = '<img src="' + url + '" border="0" width="1" height="1" id="accessLog" alt="" />';
        //document.write(tag);
    }
}
