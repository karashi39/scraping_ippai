var addthis_config = {
        data_track_clickback:true,
        ui_language:"ja",
        ui_cobrand: "News2u.net",
        ui_header_color: "#ffffff",
        ui_header_background: "#a3b0c8",
        ui_delay: 200,
        services_exclude:'favorites,twitter,facebook_like,live,tweetmeme,print',
        services_compact:'linkedin,print,delicious,hatena,evernote,clip.livedoor.com,bookmarks.yahoo.co.jp,newsclip.corich.jp,newsing.jp,buzzurl.jp,email,more',
        services_custom:
        [
            {
                name: 'livedoor',
                url: 'http://clip.livedoor.com/redirect?link={{URL}}&title={{TITLE}}&ie=UTF-8',
                icon: 'http://parts.blog.livedoor.jp/img/cmn/clip_16_16_w.gif'
            },
            {
                name: 'Yahoo! Japan',
                url: 'http://bookmarks.yahoo.co.jp/action/bookmark?t={{TITLE}}&u={{URL}}',
                icon: 'http://i.yimg.jp/images/sicons/ybm16.gif'
            },
            {
                name: 'CoRich',
                url: 'http://newsclip.corich.jp/clip/public_html/marklet.php?url={{URL}}',
                icon: 'http://www.news2u.net/common/images/corich_icon.gif'
            },
            {
                name: 'newsing it!',
                url: 'http://newsing.jp/nbutton?title={{TITLE}}&url={{URL}}',
                icon: 'http://www.news2u.net/common/images/newsingit_s.gif'
            },
            {
                name: 'Buzzurl',
                url: 'http://buzzurl.jp/entry/{{URL}}',
                icon: 'http://buzzurl.jp/static/image/api/icon/add_icon_mini_08.gif'
            }
        ],
        services_expanded: 'delicious,hatena,evernote,pookmark.jp,print,clip.livedoor.com,bookmarks.yahoo.co.jp,newsclip.corich.jp,newsing.jp,buzzurl.jp,linkedin,facebook,google_plus,google_buzz,twitter,tweetmeme,digg,favorites,friendfeed,blogger,livejournal,posterous,tumblr,live,myspace,netvibes,newsvine,email,more'
    };
