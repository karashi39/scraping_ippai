$(function() {
    // ダミーリンク押下時の動作を設定
    $('a.link-dummy').on('click touchend', function() {
        return false;
    });

    // 添付画像の標準画像サイズ取得
    $('.prwire-lightbox a').each(function() {
        var target = $(this)
        var imageObj = new Image();
        imageObj.onload = function() {
            target.attr('data-size', imageObj.width + 'x' + imageObj.height);
        };
        imageObj.src = $(this).attr('href');
    });

    // 添付動画再生エリアの初期コンテンツを設定
    var init_id = $('div.view').eq(0).attr('id');
    $('iframe.playback').attr('src', 'https://www.youtube.com/embed/' + init_id + '?rel=0');
    // 添付動画再生エリアのコンテンツを更新
    $('div.view').on('click', setPlaybackMovie);

    // 添付画像PhotoSwipeダウンロードボタンタッチ時の設定
    $(document).on('touchend', '.pswp__button.download', function(e) {
        bootstrap.Dropdown._jQueryInterface.call($(this), 'toggle');
        e.stopPropagation();
    });

    // 添付画像一覧のリンクではPhotoSwipe表示イベントへの伝播を止める
    $('#image-url a').on('click', function(e) {
        e.stopPropagation();
    });
});

// 動画再生エリアに表示するコンテンツを更新する
function setPlaybackMovie() {
    var id = $(this).attr('id');
    $('div#movie iframe.playback').attr('src', 'https://www.youtube.com/embed/' + id + '?rel=0&autoplay=1');
}

// 添付画像の各ダウンロードリンクを設定する
function setDownloadLink(index) {
    // 添付画像ダウンロードのパスを設定
    var node_path = '/';
    if (location.pathname.indexOf('/press') === 0) {
        var node_path = '/press/';
    }

    var selector = 'div.image-data:eq(' + index + ')';

    $('a#small').attr({href: $(selector + ' p.small').html(), target: '_blank'});
    $('a#normal').attr({href: $(selector + ' p.normal').html(), target: '_blank'});
    var large_link = $(selector + ' p.large').html();
    if (large_link === '') {
    	$('a#large').css('display', 'none');
    } else {
    	$('a#large').attr({href: large_link, target: '_blank'});
    }
    $('a#original').attr({href: $(selector + ' p.original').html(), target: '_blank'});
}

// PRwireカスタマイズ版PhotoSwipeの呼び出し
var initPhotoSwipeFromDOM_custom = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };

            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe_custom(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM_custom('.prwire-lightbox');

// プレビュー時のトースター設定
toastr.options = {
    'closeButton': true,
    'timeOut': 0,
    'positionClass': 'toast-bottom-center',
    'extendedTimeOut': 0,
};
