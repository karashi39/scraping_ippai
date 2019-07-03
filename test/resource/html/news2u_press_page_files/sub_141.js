(function(lastVersion){
  if (window.matm_obj.lv!=lastVersion){
    var W=window,D=document,_matm_domain, _matm_arg, _matm_cookie, _matm_async, elm = D.createElement('script');
    elm.src=((location.protocol=='https:')?'https:':'http:')+'//track.mk.impact-ad.jp/ad/js/matm.js?r='+lastVersion;
    elm.onloadDone = false;
    elm.onload=function(){
      if (!elm.onloadDone) {
        elm.onloadDone = true;
        W.matm_obj = new Matm();
        W.matm_obj.init(_matm_domain, _matm_arg, _matm_cookie, _matm_async);
      }
    };
    elm.onreadystatechange = function() {
      if (!elm.onloadDone) {
        switch (elm.readyState) {
        case "loaded":
        case "complete":
          elm.onloadDone = true;
          W.matm_obj = new Matm();
          W.matm_obj.init(_matm_domain, _matm_arg, _matm_cookie, _matm_async);
          break;
        }
      }
    };
    elm.async=true;
    var stag=D.getElementsByTagName('script')[0];
    stag.parentNode.insertBefore(elm, stag);
    W.matm_obj.init = function(p1,p2,p3,p4){
      _matm_domain = p1;
      _matm_arg=p2;
      _matm_cookie=p3;
      _matm_async=p4;
    }
  }
})("2.7");
if ((typeof cjs_obj != 'undefined') && (typeof cjs_obj.doTag == 'function')) {cjs_obj.doTag();}
