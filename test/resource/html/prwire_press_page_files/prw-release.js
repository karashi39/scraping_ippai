$(function() {
/* 20180302 seiju add start */
    $('div.view').eq(0).addClass("selected").children("div.mask").addClass("rgba-white-strong").children("p.text-dark").html( "選択中" );
    $('div.view').on('click', setSelectedClass);
/* 20180302 seiju add end */
});

/* 20180302 seiju add start */
function setSelectedClass() {
    var id = $(this).attr('id');
    $('div.view').removeClass("selected");
    $("div.view > div.mask").removeClass("rgba-white-strong");
    $("div.view > div.mask > .text-dark").html( '<i class="fa fa-youtube-play fa-2x" aria-hidden="true"></i>' );

    $(this).addClass("selected").children("div.mask").addClass("rgba-white-strong").children("p.text-dark").html( "選択中" );

}
/* 20180302 seiju add end */
