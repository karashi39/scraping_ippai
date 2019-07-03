// JavaScript Document
$(function() {
    $(".accordion dd").css("display","none");
    $(".accordion dt").click(function(){
        $(this).toggleClass("open").next().slideToggle("fast");
    });
});