// JavaScript Document

/*// SideNav Options
$('.button-collapse').sideNav({
  closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
});

// Custom scrollbar init
var el = document.querySelector('.custom-scrollbar');
Ps.initialize(el);

var container = document.getElementById('slide-out');
        Ps.initialize(container, {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 20
        });*/

// SideNav init
    $(".button-collapse").sideNav();
    var el = document.querySelector('.custom-scrollbar');
    if (el !== null) {
        Ps.initialize(el);
    }

    $('body').scrollspy({
        target: '#scrollspy'
    })

// MDB Lightbox Init
$(function () {
    $("#mdb-lightbox-ui").load("/assets/mdboot/mdb-addons/mdb-lightbox-ui.html");
});

/*categoryarea*/

$(document).ready(function () {

 var h = $(window).height();
 var x = 800;

 $(window).resize(function(){

   h = $(window).height();

   $(".categoryarea-inner").each(function () {
     var num = $(this).find('.dropdown-menu a').length;
     if(num >= 10){
       /*処理の対象はリストが10より多いものだけ*/
       if (h <= x) {
         $(this).find(".dropdown-menu").css("height", 300);
       } else {
         $(this).find(".dropdown-menu").css("height", 400);
       }
     }
   });
 });

//.categoryarea-innerの要素毎に処理する
 $(".categoryarea-inner").each(function () {
   //".categoryarea-innerの要素内の.dropdown-menu aの数をカウント
   var num = $(this).find('.dropdown-menu a').length;
   //".dropdown-menu内のaが10件以下だったら
   if(num < 10){
     $(this).find('.dropdown-menu').css("height", 300);
   }else{
     //10件より多いとき
     if (h <= x) {
       $(this).find(".dropdown-menu").css("height", 300);
     } else {
       $(this).find(".dropdown-menu").css("height", 400);
     }
   }
 });

});
