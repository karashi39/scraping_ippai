/**
 * 共通部品用JavaScript
*/
(function() {
    var topicalPrefix = "listTopical";
    var rankingPrefix = "listRanking";

    $("#tabSelectTerm li.container-ranking-tab a.tab").click(function() {
        var obj = $(this);
        $(".tab-select-term-ranking li").each(function(){
            if($("a", this) != obj){
                $("a", this).animate({backgroundColor:"transparent", "color":"#3b3b3b"}, 100, "easeInSine");
            }
        });
        $(this).stop().animate({backgroundColor:"#155088", "color":"#fff"}, 100, "easeInSine");

        var rankingId = rankingPrefix  + $(this).attr('id').replace('tab', '');
        $("ul.list-popular-item.list-ranking").hide();
        $("#tabSelectTerm li.container-ranking-tab a.tab").removeClass("active");
        $("#" + rankingId).show();
//        $("#listFacebook").show();
//        $("#listTwitter").show();
        $(this).addClass("active");
    });

    $("#tabSelectTerm li.container-tab a.tab").click(function() {
        var topicalId = topicalPrefix  + $(this).attr('id').replace('tab', '');
        $("ul.list-popular-item.list-topical").hide();
        $("#tabSelectTerm li.container-tab a.tab").removeClass("active");
        $("#" + topicalId).show();
//        $("#listFacebook").show();
//        $("#listTwitter").show();
        $(this).addClass("active");

        var obj = $(this);
        $(".tab-select-term-topical li").each(function(){
            if($("a", this).attr("class").indexOf("active") < 0){
                $("a", this).css({"background-color":"transparent", "color":"#3b3b3b"});
            }
        });
        $(this).stop().animate({backgroundColor:"#fff", "color":"#104F8A"}, 100, "easeInSine");

    });
    
    $(".tab-select-term li a").on({
        "mouseenter":function(){
            var arr = $(this).attr("class").split(" ");
            var active = false;
            for(var i = 0; i < arr.length; i++){
                if(arr[i] == "active"){
                    active = true;
                }
            }
            if(!active){
                $(this).animate({backgroundColor:"#fff","border-bottom-color":"transparent"}, 170, "easeOutSine");
            }
        },
        "mouseleave":function(){
            var arr = $(this).attr("class").split(" ");
            var active = false;
            for(var i = 0; i < arr.length; i++){
                if(arr[i] == "active"){
                    active = true;
                }
            }
            if(!active){
                $(this).animate({backgroundColor:"transparent", "color":"#3b3b3b","border-bottom-color":"#dfdfdf"}, 100, "easeInSine");
            }
        }
    });

    if($(".arrow_box")){
        $(".arrow_box").css({"margin-top":(-$(".arrow_box").height() - 32) + "px"});
        $(".arrow_box_wrapper").css({"top":-200 + ($(".arrow_box").height() + 32) + "px"});
    }

}).call();


