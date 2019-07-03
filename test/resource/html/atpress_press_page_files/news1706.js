$(function() {
    //flex img
//    $('.flex-images').flexImages({rowHeight: 140});
    $('.mglist_box_content .flex-images').flexImages({rowHeight: 200});
    $('.side_comp_mg_box_content .flex-images').flexImages({rowHeight: 100});
});

//release img modal slide
$(function() {
    var c;
    $('.photo').slick({
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 991,
            settings: {
                vertical: false,
                slidesToShow: 3
            }
        }, {
            breakpoint: 600,
            settings: {
                vertical: false,
                slidesToShow: 2
            }
        }]
    });
    $('.photo').find('li img').click(function() {
        var photo_clone = $('.photo_clone')
        $('body').addClass('modal-open');
        photo_clone.css({ "z-index": "1000000" }).animate({
                'opacity': 1
            },
            400);
        c = $(this).closest('li').attr('data-slick-index');
        photo_clone.slick({
            initialSlide: Number(c)
        });
        photo_clone.prepend('<b class="b_close"></b>');
        photo_clone.find('.b_close').on('click', function() {
            photo_clone.animate({
                    'opacity': 0
                },
                400).delay(400).animate({ "z-index": "-1" }, 1);
            photo_clone.slick('unslick');
            photo_clone.find('b_close').remove();
            $('body').removeClass('modal-open').css({ 'paddind-left': 'auto' });
        });
    });
});

//img list modal
$(function() {
    $('.mg-items .item').click(function(event) {
        $('.mg_modal').animate({'opacity': 1,'z-index': 10000},100);
        $('body').addClass('modal-open')
        c = $('.mg-items .item').index(this);
        $('.w_mg_modal_inner').slick({
             initialSlide: Number(c)
         });
    });

    $('.mg_modal .b_close').click(function(event) {
        $('.mg_modal').animate({'opacity': 0,'z-index': -1},100);
        $('body').removeClass('modal-open')
        $('.w_mg_modal_inner').slick('unslick');
    });

});

//list view change
$(function() {
    $('.view_change i').click(function(event) {
         $('.view_change i').toggleClass('active');
         $('.view_style').toggleClass('tx_view');
    });
});

//mb sns btn add
$(function() {
    if (window.matchMedia('(max-width: 767px)').matches) {
            // $('.atcl_content').append($('.w_dtl_atcl_badges').clone())
            $('.secondary').prepend($('.w_dtl_atcl_badges').clone())
    }
});

//company hover
$(function() {
    if (window.matchMedia('(min-width: 992px)').matches) {
        $('.pubs .publisher a').hover(function() {
            $('.publisher_box a').addClass('hover')
        }, function() {
             $('.publisher_box a').removeClass('hover')
        });
        $('.publisher_box a').hover(function() {
            $('.pubs .publisher a').addClass('hover')
        }, function() {
             $('.pubs .publisher a').removeClass('hover')
        });
    }
});

//for flex center overflow
$(window).on('load resize', function(){
    w_mg_modal_inner_height_resize();
});
function w_mg_modal_inner_height_resize(){
    eh = $('.mg_modal_inner').height();
    wh = $(window).height();
    if(eh > wh){
        $('.w_mg_modal_inner').css({"height":"auto"})
    } else {
         $('.w_mg_modal_inner').css({"height":"100%"})
    }
}
