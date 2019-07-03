var matm_uid = "";
var Matm = function() {
	this.asyncWriteIndex = 0;
	if (!(this.head = document.getElementsByTagName('head')[0])) {
		this.head = document.documentElement;
	}
	this.asyncWriteStack = new Array();
	this.lv = "2.7";
	this.scheme = location.protocol.replace(":", "");
};
Matm.prototype = {
	wrap_getCookie: function() {
		return document.cookie;
	},
	wrap_setCookie: function(cookies) {
		document.cookie = cookies;
	},
	wrap_getUserAgent: function() {
		return window.navigator.userAgent;
	},
	wrap_getAppVersion: function() {
		return window.navigator.appVersion;
	},
	wrap_getCookieEnabled: function() {
		return window.navigator.cookieEnabled;
	},
	wrap_getTitle: function() {
		return document.title;
	},
	wrap_getTopTitle: function() {
		return top.document.title;
	},
	wrap_getURL: function() {
		return location ? location.href : undefined;
	},
	wrap_getRef: function() {
		return document.referrer;
	},
	wrap_getTopRef: function() {
		return top.document.referrer;
	},
	wrap_getDocumentBody: function() {
		return document.body;
	},
	init: function(_matm_domain, _matm_arg, _matm_cookie, _matm_async){
		var docTitle=this.wrap_getTitle();
		try {
			docTitle=this.wrap_getTopTitle();
		} catch(e){}
		var _arg = "_js=1&" + "_matm=1&" + _matm_arg + "&_ttl=" + escape(encodeURIComponent(docTitle)) + "&_lv=" + this.lv,
		cre_url = function(t,_matm_domain, _matm_arg, _matm_cookie) {
			var _src = '', getGACookie = function() {
				if (!window.matm_gacookie)
					return'';
				var skv = function(keyNames, delimiter, str){
					var ina = function(a,k) {
						var i=0,l = a.length;
						for (; i<l; i++) {
							if (a[i]===k) return i;
						}
						return -1;
					},
					ret = [];
					var arrStr = str.split(delimiter),
					regex = "^\\s*([^=]+?)\\s*=\\s*(.*?)\\s*$",
					length = arrStr.length,
					i=0;
					for (; i<length; i++) {
						var n = arrStr[i].match(regex);
						if (n) {
							var ix = ina(keyNames, n[1]);
							if (ix >= 0) {
								ret[ix] = n[2];
							}
						}
					}
					return ret;
				},
				ta=function(a,i) {
					return (a&&a.length>=i&&a[i])?
						a[i]:
						'';
				},
				dy=function(a){
					var t = new Date(a*1000),
					d=[t.getFullYear(),t.getMonth(),t.getDate()];
					return (~~((new Date(d[0],d[1],d[2])).getTime()/1000));
				},
				cn=function(a){
					return a&&(!isNaN(a))?
						dy(a):
						'';
				},
				sd=function(a,b) {
					return a?
						a.split(b):
						'';
				},
				pa=function(a,b,c) {
					if(b!==''){
						a[a.length]='&'+c+'=';
						a[a.length]=encodeURIComponent(b);
					}
				},
				re=function(a,b){
					return (a&&b&&(!isNaN(a))&&(!isNaN(b)))?
						Math.round((a-b)/86400):
						'';
				},
				c = skv(['__utma','__utmb','__utmz'],"; ", t.wrap_getCookie()),
				utma = sd(c[0],"."),
				utmb = sd(c[1],"."),
				utmz = sd(c[2],"."),
				z4 = skv(['utmcsr','utmccn','utmcmd','utmcct','utmctr'],"|",ta(utmz,4)),
				a2=ta(utma,2),
				a3=ta(utma,3),
				a4=ta(utma,4),
				prm = [];
				pa(prm,cn(a2),'gctfv');
				pa(prm,cn(a3),'gctlv');
				pa(prm,cn(a4),'gctcv');
				pa(prm,ta(utma,5),'gcncv');
				pa(prm,re(a4,a2),'gcnrf');
				pa(prm,re(a4,a3),'gcnre');
				pa(prm,ta(utmb,1),'gcnpv');
				pa(prm,ta(z4,0),'gcsts');
				pa(prm,ta(z4,1),'gcstc');
				pa(prm,ta(z4,2),'gcstm');
				pa(prm,ta(z4,3),'gcstt');
				pa(prm,ta(z4,4),'gcstk');
				return prm.join("");
			},
			getCustomParam = function() {
				var en=function(a){
					return encodeURIComponent(a);
				},
				isa = function(a) {
					return a instanceof Array;
				},
				prm = [],
				n=0,
				c=function(a,b,c){
					if (a) {
						if (isa(a)) {
							var l=a.length;
							for (var i=0; i<l; i++) {
								if(n<2){
									n++;
									c(a[i],b,c);
									n--;
								}
							}
						} else if (typeof a == 'object') {
							for(var key in a) {
								b[b.length] = '&cp'+en(key)+'=';
								b[b.length]=en(a[key]);
							}
						}
					}
				};
				c(window.matm_param,prm,c);
				return prm.join("");
			},
			getUAParam = function() {
				var replaceAll = function(expr,org,dest){
					return expr.split(org).join(dest);
				},getOs = function (ua){
					var ret = "Unknown",it,ix;
					if (ua.indexOf("Windows Phone")>0) ret = "WindowsPhone";
					else if (ua.match(/Win(dows )?NT 6\.2/)) ret = "Windows8";
					else if (ua.match(/Win(dows )?NT 6\.1/)) ret = "Windows7";
					else if (ua.match(/Win(dows )?NT 6\.0/)) ret = "WindowsVista";
					else if (ua.match(/Win(dows )?(NT 5\.1|XP)/)) ret = "WindowsXP";
					else if (it=ua.match(/(iPhone|iPad|iPod).+?OS\s.+?/)){
						ret = "i" + it[0].substring(it[0].indexOf("OS")).replace(" ","");
						if (ret==="iOSX") {if (ua.indexOf("iPod")>=0) {ret="iOS2";} else {ret="iOS1";}}
						ret = it[1] + "(" + ret + ")";
					} else if ((it=ua.indexOf("Android"))>=0){
						ret = "";if ((ix = ua.indexOf(";",it))>=0){ret = ua.substring(it+7,ix)}ret="Android"+ret;
					} else if (ua.match(/Mac|PPC/)) ret = "Mac";
					else if ((it=ua.indexOf("Linux"))>=0) ret = "Linux";
					else if ((it=ua.indexOf("BlackBerry"))>=0) ret = "BlackBerry";
					else if ((it=ua.indexOf("Symbian"))>=0) ret = "Symbian";
					return replaceAll(ret," ", "");
				},getBrowser = function (ua){
					var ret = "Unknown",ix,ex,m;
					if ((ix = ua.indexOf("Opera"))>=0){
						ret = "";if ((ex = ua.indexOf("Version"))>=0){if(m=ua.substring(ex+8).match(/([0-9\.]+)/)){ret = m[1];}
						} else {if(m=ua.substring(ix+6).match(/([0-9\.]+)/)){ret = m[1];}}
						ret = "Opera"+ret;
					} else if ((ix = ua.indexOf("MSIE"))>=0){
						ret = "";if ((ex = ua.indexOf(";",ix))>=0){ret = "IE"+ua.substring(ix+5,ex);
						} else {if(m=ua.substring(ix+5).match(/([0-9\.]+)/)){ret = m[1];}ret = "IE"+ret;}
					} else if ((ix = ua.indexOf("Firefox"))>=0){ret = "Firefox"+ua.substring(ix+8);
					} else if ((ix = ua.indexOf("Safari"))>=0){
						if ((ix=ua.indexOf("Chrome"))>=0){ret = "";if ((ex = ua.indexOf(" ",ix))>=0){ret = ua.substring(ix+7,ex);}ret = "Chrome"+ret;
						} else {ret = "";if ((ix = ua.indexOf("Version"))>=0){if ((ex = ua.indexOf(" ",ix))>=0){ret = ua.substring(ix+8,ex);}}ret = "Safari"+ret;}
					}
					return replaceAll(ret," ", "");
				},ret="",os="",brw="",ua="",en=function(a){return encodeURIComponent(a);};
				if (t.wrap_getUserAgent()) {
					ua = t.wrap_getUserAgent();os = getOs(ua);brw= getBrowser(ua);
					ret += "&cpos="+en(os);ret += "&cpbrowser="+en(brw);
				}
				return ret;
			},
			getCookie = function(c_name){
				if(c_name){
					var c_data = '; ' + t.wrap_getCookie() + ';';
					var n_point = c_data.indexOf('; ' + c_name + '=') + 1;
					if(n_point > 0){
						var v_point = c_data.indexOf('=', n_point) + 1;
						var end_point = c_data.indexOf(';', n_point);
						return c_data.substring(v_point, end_point);
					}
				}
			};
			_src += "&" + _matm_arg;
			_src += t.insertUrl();
			if(t.wrap_getCookieEnabled()) {
				var _matm_uid = getCookie('tuuid');
				if(_matm_uid != null) {
					_src += "&_cuid=" + _matm_uid;
				} else {
					_matm_uid = getCookie('GUID');
					if(_matm_uid != null) _src += "&_cguid=" + _matm_uid;
				}
				if(_matm_cookie) {
					var _matm_pos = _matm_domain.indexOf("://") + 3;
					var _matm_key = _matm_domain.substring(_matm_pos, _matm_domain.indexOf("/", _matm_pos));
					_src += "&_ckey=" + _matm_key;
					var matm_cookie = getCookie(_matm_key);
					if(matm_cookie != null)
						_src += "&_cval=" + matm_cookie;
					var matm_session = getCookie(_matm_key + '.session');
					if(matm_session != null)
						_src += "&_sval=" + matm_session;
				}
				if(_matm_uid)
					matm_uid = _matm_uid; 
				_src += getGACookie();
			}
			var matm_ref = t.wrap_getRef();
			try {
				matm_ref = t.wrap_getTopRef();
			} catch(e){}
			if(matm_ref != null){
				var _matm_pos = matm_ref.indexOf('?');
				_src += "&_ref=" + escape(_matm_pos == -1 ?
					encodeURIComponent(matm_ref) :
					encodeURIComponent(matm_ref.substring(0, _matm_pos)) + matm_ref.substring(_matm_pos));
			}
			_src += getCustomParam();
			_src += getUAParam();
			if (t.wrap_getURL()) {
				_src += "&_url=" + encodeURIComponent(t.wrap_getURL());
			}
			_src += "&t="+(~~((new Date()).getTime()/(60*1000)));
			_src = "?" + _src.substring(1);
			return _matm_domain + _src;
		};
		if(_matm_async){
			_arg += "&_async=1";
			var script = document.createElement('script');
			script.src = cre_url(this,_matm_domain, _arg, _matm_cookie);
			script.type = 'text/javascript';
			var _head = this.head;
			_head.insertBefore(script,_head.firstChild);
		}else{
			var _src = "<scr" + "ipt language='javascript' src='";
			_src += cre_url(this,_matm_domain, _arg, _matm_cookie);
			_src += "'><" + "/script>";
			document.write(_src);
		}
	},
	loadSub: function(_matm_domain, _matm_arg, _matm_cookie, _matm_async, js_path){
		var aid;
		var m = _matm_arg ? _matm_arg.match(/_aid=([0-9]+)/) : undefined;
		if (m) {
			aid = m[1];
		}
		if (aid){
			var subjs = js_path + "sub_" + aid + ".js?t="+(~~((new Date()).getTime()/(30*60*1000)));
			if (_matm_async) {
				this.insertScriptElement(subjs,
					function(){
						window.matm_obj.init(_matm_domain, _matm_arg, _matm_cookie, _matm_async);
					},true
				);
			} else {
				return false;
			}
		} else return false;
		return true;
	},
	setCookie: function(c_name,value){
		if(c_name){
			var dayTime = value != null ?
				1000*1000*60*60*24 :
				-1;
			var expDay = new Date();
			expDay.setTime(expDay.getTime()+dayTime);
			this.wrap_setCookie(c_name + '=' + value + '; path=/; expires=' + expDay.toGMTString());
		}
	},
	setSession: function(c_name, value){
		if(c_name){
			this.wrap_setCookie(c_name + '=' + value + '; path=/');
		}
	},
	setTimeMeasurement: function(){
	},
	getTimeMeasurement: function(){
	},
	catchError: function(e){
	},
	insertUrl: function(){
		return '';
	},
	fireTags: function(script){
		var exec = function(t,scriptOrg){
			var getBrowserType = function(){
				var userAgent = t.wrap_getUserAgent().toLowerCase();
				if (userAgent.indexOf('opera') != -1) {
				  return 'opera';
				} else if (userAgent.indexOf('msie') != -1) {
				  return 'ie';
				} else if (userAgent.indexOf('chrome') != -1) {
				  return 'chrome';
				} else if (userAgent.indexOf('safari') != -1) {
				  return 'safari';
				} else if (userAgent.indexOf('gecko') != -1) {
				  return 'gecko';
				} else {
				  return false;
				}
			},
			browserType = getBrowserType();
			var matm = document.getElementById('matm');
			if(!matm){
				var elmDiv = document.createElement('div');
				elmDiv.id = 'matm';
				t.wrap_getDocumentBody().appendChild(elmDiv);
				matm = document.getElementById('matm');
			}
			if(browserType === 'ie'){
				matm.style.display = 'none';
				matm.innerHTML = "&#160;" + scriptOrg;
			}else{
				matm.innerHTML = scriptOrg;
			}
			var gidCheck = function(src) {
				var gid = 0;
				var grp=[
				{"http://i.yimg.jp/images/listing/tool/cv/conversion.js":1},
				{"https://s.yimg.jp/images/listing/tool/cv/conversion.js":1},
				{"http://www.googleadservices.com/pagead/conversion.js":1},
				{"https://www.googleadservices.com/pagead/conversion.js":1},
				{"//www.googleadservices.com/pagead/conversion.js":1},
				{"http://b92.yahoo.co.jp/js/s_retargeting.js":2},
				{"https://b92.yahoo.co.jp/js/s_retargeting.js":2},
				{"//b92.yahoo.co.jp/js/s_retargeting.js":2},
				{"http://b90.yahoo.co.jp/conv.js":3},
				{"https://b90.yahoo.co.jp/conv.js":3},
				{"//b90.yahoo.co.jp/conv.js":3}
				];
				for(var key_val in grp){
					if(grp[key_val][src]){
						gid = grp[key_val][src];
					}
				}
				return gid;
			};
			var gidVariableCheck = function(tmp_script) {
				var gid = 0;
				if(tmp_script.indexOf("google_conversion_id") != -1){
					gid = 1;
				}else if(tmp_script.indexOf("yahoo_retargeting_id") != -1){
					gid = 2;
				}
				return gid;
			
			};
			var execScripts = matm.getElementsByTagName('script');
			if(execScripts){
				var getInlineScripts = function(_execScripts){
					var tags = [],length = _execScripts.length;
					var oid=0,lid=0,pri=0,llid=-1,gid=0,ix;
					for (var i=0 ; i<length ; i++){
						var tmp = _execScripts[i];
						var tmp_script = tmp.text || tmp.textContent || tmp.innerHTML || "";
						ix = tags.length;
						if((!tmp.src)&&(tmp_script)){
							var n = tmp_script.match(/^\[([0-9]+),([0-9]+),([0-9]+)\]\;$/);
							if (n) {
								oid = parseInt(n[1]);
								lid = parseInt(n[2]);
								pri = parseInt(n[3]);
								gid = 0;
							} else {
								gid = gidVariableCheck(tmp_script);
								if (llid != lid) {
									tags[ix] = {script:[],sts:0,pri:pri,gid:gid};
									tags[ix].script[tags[ix].script.length] = {txt:tmp_script};
									llid = lid;
								} else {
									tags[ix-1].gid = gid;
									tags[ix-1].script[tags[ix-1].script.length] = {txt:tmp_script};
								}
							}
						} else if (tmp.src) {
							var src = tmp.src;
							gid = gidCheck(src);
							
							if (t.scheme === 'https' && src.substr(0,src.indexOf(':')) === 'http') {
								src = t.scheme + src.substr(4);
							}
							var wait=1;
							if(tmp.defer) {
								wait=0;
							}
							if (llid != lid) {
								tags[ix] = {script:[],sts:0,pri:pri,gid:gid};
								tags[ix].script[tags[ix].script.length] = {src:src,wait:wait};
								llid = lid;
							} else {
								tags[ix-1].gid = gid;
								tags[ix-1].script[tags[ix-1].script.length] = {src:src,wait:wait};
							}
						}
					}
					return tags;
				},
				execInlineScript = function(scripts){
					var length = scripts.length;
					var postOnload = [];
					var groupOnload = [];
					var _windowonload = window.onload;
					if (_windowonload){
						window.onload = null;
					}
					var insertScript = function(url,olfunc,prm) {
						var script = document.createElement('script'), t=window.matm_obj,err=0;
						script.src = url;
						script.type = 'text/javascript';
						script.onloadDone = false;
						script.evtCnt = 0;
						script.onload=function() {
							if (!script.onloadDone) {
								script.onloadDone=true;
								t.asyncPop(t);
								olfunc(prm,err);
							}
						};
						script.onerror=function() {
							err=1;
							if (!script.onloadDone) {
								script.onloadDone=true;
								t.asyncPop(t);
								olfunc(prm,err);
							}
						};			
						script.onreadystatechange = function() {
							script.evtCnt++;
							if (!script.onloadDone) {
								switch (script.readyState) {
								case "loaded":
									if (script.evtCnt < 2) {
										break;
									}
								case "complete":
									script.onloadDone=true;
									t.asyncPop(t);
									olfunc(prm,err);
									break;
								}
							}
						};
						var head = window.matm_obj.head;
						head.insertBefore(script,head.firstChild);
					};
					var endCheck = function(tags) {
						for (var i=0,l=tags.length; i<l ; i++){
							if (tags[i].sts != 2) {
								return false;
							}
						}
						return true;
					};
					var getPrio = function(tags) {
						for (var i=0,l=tags.length; i<l ; i++){
							if (tags[i].sts != 2) {
								return tags[i].pri;
							}
						}
						return 0;
					};
					var getGidFlg = function(tags,i,grp_id) {
						var gid_flg = 0;
						for(var key_val in grp_id){
							if(grp_id[key_val] == tags[i].gid){
								gid_flg = 1;
								break;
							}
						}
						return gid_flg;
					};
					var execTags = function(t,tags, fin) {
						var cpri = getPrio(tags);
						var grp_id = [];
						for (var i=0,l=tags.length; i<l ; i++){
							if ((tags[i].sts == 0) && (tags[i].pri <= cpri) && (getGidFlg(tags,i,grp_id) == 0)) {
								if(tags[i].gid != 0){
										grp_id[i] = tags[i].gid;
								}
								cpri = tags[i].pri;
								var wait = 0;
								while ((tags[i].script.length > 0)&&(wait==0)) {
									var tag = tags[i].script.shift();
									if (typeof tag.src != 'undefined') {
										if (tag.wait==1) {
											tags[i].sts = 1;
											if (tag.src.match(/^http(s?):\/\/[si]\.yimg\.jp\/images\/listing\/tool\/cv\/conversion\.js$/)) {
												tags[i].script.unshift({src:'http'+RegExp.$1+'://b91.yahoo.co.jp/pagead/conversion.js',wait:1});
												window.matm_obj.ycvtags++;
											}
											
											insertScript(tag.src, function(idx,err){
												if (window.onload) {
													postOnload.push({func:window.onload,idx:idx});
													window.onload = null;
												}
												if(err == 0){
													tags[idx].sts = 0;
												}else{
													tags[idx].sts = 2;
												}
												execTags(t,tags,fin);
											}, i);
											wait = 1;
										} else {
											insertScript(tag.src,function(){});
										}
									} else {
										try {
											t.execGlobalScope(tag.txt);
											t.asyncPop(t);
										} catch (e) {
											t.catchError(e);
										}
										if (window.onload) {
											postOnload.push({func:window.onload,idx:i});
											window.onload = null;
										}
									}
								}
								if (wait==0){
									tags[i].sts = 2;
									tags[i].gid = 0;
									if(grp_id[i]){
										grp_id[i] = undefined;
									}
									cpri = getPrio(tags);
								}
							} else if ((tags[i].sts == 1)&&(tags[i].gid != 0)) {
								grp_id[i] = tags[i].gid;
							}
						}
						if (endCheck(tags)) {
							fin.call();
						}
					};
					execTags(t, scripts, function(){
						for (var i = 0; i < postOnload.length; i++) {
							try {
								postOnload[i].func();
							} catch (e) {
								t.catchError(e);
							}
						}
						if (_windowonload){
							window.onload = _windowonload;
						}
						t.asyncDeploy(t);
						t.getTimeMeasurement();
					});
				};
				document._write = document._write || document.write;
				document._writeln = document._writeln || document.writeln;
				document.write = t.asyncWrite;
				document.writeln = t.asyncWrite;
				document._open = document._open || document.open; 
				document._close = document._close || document.close; 
				document.open =function(){};
				document.close =function(){};
				document._asyncWriteStr = '';
				execInlineScript(getInlineScripts(execScripts));
			}
		};
		this.setTimeMeasurement();
		if(script){
			try{
				exec(this,script);
			}catch(e){
				this.catchError(e);
			}
		}
		this.getTimeMeasurement();
	},
	insertScriptElement: function(url,olfunc,immediate) {
		if ( "undefined" === typeof(this.wrap_getDocumentBody()) || ! this.wrap_getDocumentBody() ) {
			var t=this;
			setTimeout(function(){t.insertScriptElement(url,olfunc,immediate)}
				,20);
			return;
		}
		var script = document.createElement('script'), t=this;
		script.src = url;
		script.type = 'text/javascript';
		script.onloadDone = false;
		script.cnt = 0;
		script.onload=function() {
			if (!script.onloadDone) {
				if ("timer_id" in script) {
					clearTimeout(script.timer_id);
				}
				script.onloadDone=true;
				t.asyncPop(t);
				if (olfunc) {
					try {
						olfunc();
					} catch(e) {
						t.catchError(e);
					}
				}
				if (!immediate) t.asyncDeploy(t);
			}
		};
		script.onerror=function() {
			if (!script.onloadDone) {
				if ("timer_id" in script) {
					clearTimeout(script.timer_id);
				}
				script.onloadDone=true;
				if (!immediate) t.asyncDeploy(t);
			}
		};
		script.onreadystatechange = function() {
			script.cnt++;
			if (script.cnt>=2 || script.readyState == 'complete') {
				if (!script.onloadDone) {
					switch (script.readyState) {
					case "loaded":
					case "complete":
						if ("timer_id" in script) {
							clearTimeout(script.timer_id);
						}
						script.onloadDone=true;
						t.asyncPop(t);
						if (olfunc) {
							try {
								olfunc();
							} catch (e) {
								t.catchError(e);
							}
						}
						if (!immediate) t.asyncDeploy(t);
						break;
					}
				}
			}else{
				var ie_ver = t.getMSIEAppVersion(t);
				if(ie_ver<=8) {
					var cb = function(sc){
						return function(){
							sc.onerror.call(sc);
						};
					};
					script.timer_id = setTimeout(cb(script), 10000);
				}
			}
		};
		if (immediate) {
			var _head = this.head;
			_head.insertBefore(script,_head.firstChild);
		} else {
			var wrapper = document.createElement("span");
			wrapper["id"] = "matm-" + t.asyncWriteIndex;
			this.wrap_getDocumentBody().appendChild(wrapper);
			t.asyncWriteStack.push({id: wrapper["id"], elm: script});
			t.asyncWriteIndex++;
		}
	},
	execGlobalScope: function(script) {
		if (window.execScript) {
			script = script.replace(/^\s*<!--([\s\S]*)-->\s*$/,"$1\r\n");
			window.execScript("try {"+script+"} catch(e) {if((typeof window.matm_obj != 'undefined')&&(typeof window.matm_obj.catchError != 'undefined'))window.matm_obj.catchError(e);}", "JavaScript");
		} else if (window.eval) {
			try {
				window.eval(script);
			} catch (e) {
				this.catchError(e);
			}
		} else throw Error("exec global scope error!");
	},
	delayOnLoad: function() {
		var WO = window.matm_ol,D=document;
		if (WO) {
			while(WO.length > 0) {
				var f = WO.shift();
				var evt;
				if (D.createEvent){
					evt = D.createEvent('HTMLEvents');
					if (evt && evt.initEvent) {
						evt.initEvent("load", false, true);
					} else {
						evt.type = 'load';
					}
				} else if (D.createEventObject) {
					evt=D.createEventObject();
					evt.type = 'load';
				}
				else {
				}
				try {
					if (evt)f(evt); else f();
				} catch (e) {
					this.catchError(e);
				}
			}
		}
	},
	asyncWrite: function() {
		var str = "",
		length = arguments.length,
		t = window.matm_obj,
		i=0;
		for (; i < length; i++) {
			str += arguments[i];
		}
		if (t) {
			if (str.match(/^<script[^>]+https?:\/\/b91\.yahoo\.co\.jp\/pagead\/conversion\.js[^>]+><\/script>$/) && window.matm_obj.ycvtags > 0) {
				window.matm_obj.ycvtags--;
			} else {
				document._asyncWriteStr += str;
			}
		}
	},
	asyncPop: function(t) {
		var str = "";
		while(typeof document._asyncWriteStr != "undefined" && document._asyncWriteStr != ""){
			str = document._asyncWriteStr;
			document._asyncWriteStr = "";
			t.asyncAppend(t, t.wrap_getDocumentBody(), str, 0);
		}
	},
	asyncAppend: function(t, elm, str, nest) {
		var name, attrs, value, matches;
		var attr;
		var wrapper;
		var loop = true;
		var subst = function(str,i,n){
			if (typeof str.substr === 'function') {
				return str.substr(i,n);
			} else {
				return str.substring(i,i+n);
			}
		};
		var getAttrName = function(attrName) {
			var attrNames = " allowTransparency borderColor contentDocument contentWindow dataFld dataSrc frameBorder frameSpacing longDesc marginHeight marginWidth noResize ";
			var ix = attrNames.toLowerCase().indexOf(" " + attrName.toLowerCase() + " ");
			if (ix < 0) {
				return attrName.toLowerCase();
			}
			return subst(attrNames, ix + 1, attrName.length);
		};
		while (loop) {
			name = "";
			attrs = "";
			value = "";
			matches = document._adm_getSingleTag(str);
			if (matches) {				
				name = matches[1].toLowerCase();
				attrs = matches[2];
				value = matches[3];
			} 
			if (name) {
				var node = document.createElement(name);
				attr = "";
				while (attr = attrs.match(/ *([0-9a-z_\-]+)(?:=(\\?"[^"]*\\?"|\\?'[^']*\\?'|[^\s]+))?/i)) {
					var attrName = getAttrName(attr[1]);
					if (attr[2]) {
						attr[2] = attr[2].replace(/^\\?["']?(.*?)\\?["']?$/i, '$1');
						attr[2] = attr[2].split("&amp;").join("&");
						attr[2] = attr[2].split("&lt;").join("<");
						attr[2] = attr[2].split("&gt;").join(">");
						attr[2] = attr[2].split("&quot;").join("\"");
						attr[2] = attr[2].split("&apos;").join("\'");
						switch (attrName) {
						case "class":
							node["className"] = attr[2];
							break;
						case "style":
							node["style"]["cssText"] = attr[2];
							break;
						default:
							node[attrName] = attr[2];
							break;
						}
					} else {
						node[attrName] = attrName;
					}
					attrs = attrs.replace(attr[0], '');
				}
				if (name == "script") {
					wrapper = document.createElement("span");
					wrapper["id"] = "matm-" + t.asyncWriteIndex;
					elm.appendChild(wrapper);
					if (!value) {
						node.onloadDone = false;
						node.cnt = 0;
						node.onload = function(event) {
							if (!this.onloadDone) {
								if ("timer_id" in this) {
									clearTimeout(this.timer_id);
								}
								t.asyncPop(t);
								this.onloadDone = true;
								t.asyncDeploy(t);
							}
						};
						node.onerror = function() {
							if (!this.onloadDone) {
								if ("timer_id" in this) {
									clearTimeout(this.timer_id);
								}
								this.onloadDone = true;
								t.asyncDeploy(t);
							}
						};
						node.onreadystatechange = function() {
							this.cnt++;
							if (this.cnt>=2 || this.readyState == 'complete') {
								switch (this.readyState) {
								case "loaded":
								case "complete":
									if (!this.onloadDone) {
										if ("timer_id" in this) {
											clearTimeout(this.timer_id);
										}
										t.asyncPop(t);
										this.onloadDone = true;
										t.asyncDeploy(t);
									}
									break;
								}
							}else{
								var ie_ver = t.getMSIEAppVersion(t);
								if(ie_ver<=8) {
									var cb = function(nd){
										return function(){
											nd.onerror.call(nd);
										};
									};
									this.timer_id = setTimeout(cb(this), 10000);
								}
							}
						};
						t.asyncWriteStack.push({id: wrapper["id"], elm: node});
					} else {
						wrapper.appendChild(node);
						if (typeof node.canHaveChildren != "undefined" && (!node.canHaveChildren)) {
							node.text = value;
						} else {
							node.appendChild(document.createTextNode(value));
						}
					}
					t.asyncWriteIndex++;
				} else {
					try {
						elm.appendChild(node);
						if (value) {
							t.asyncAppend(t, node, value);
						}
					} catch(e) {
						t.catchError(e);
						return;
					}
				}
			} else if (value) {
				var mp = document.createElement("span");
				mp.innerHTML=value;
				if (typeof(mp.innerText)!="undefined"){
					value=mp.innerText;
				} else if (typeof(mp.textContent)!="undefined"){
					value=mp.textContent;
				}
				elm.appendChild(document.createTextNode(value));
			}
			if (matches) {
				str = str.replace(matches[0], '');
			} else {
				loop = false;
			}
		}
	},
	asyncDeploy: function(t) {
		var asyncClose = function() {
			document.write = document._write;
			document.writeln = document._writeln;
			document.open =document._open; 
			document.close =document._close;
		};
		t.asyncPop(t);
		if (t.asyncWriteStack.length > 0) {
			var hash = t.asyncWriteStack.shift();
			document.getElementById(hash.id).appendChild(hash.elm);
		} else {
			t.delayOnLoad();
			asyncClose();
		}
	},
	getMSIEAppVersion: function(t) {
		var ie_ver=0;
		var msie = t.wrap_getAppVersion().toLowerCase();
		if (msie.indexOf('msie')>-1) {
			ie_ver=parseInt(msie.replace(/.*msie[ ]/,'').match(/^[0-9]+/));
		} else if (msie.indexOf('trident')>-1) {
			ie_ver=parseInt(msie.replace(/.*rv:/, '').match(/^[0-9]+/));
		}
		if (isNaN(ie_ver)) {
			ie_ver = 0;
		}
		return ie_ver;
	}
};
function admage_setCookie(c_name, value){
	if (!window.matm_obj) {
		window.matm_obj = new Matm();
	}
	window.matm_obj.setCookie(c_name, value);;
}
function admage_setSession(c_name, value){
	if (!window.matm_obj) {
		window.matm_obj = new Matm();
	}
	window.matm_obj.setSession(c_name, value);
}
function matm_init(_matm_domain, _matm_arg, _matm_cookie, _matm_async) {
	if (!window.matm_obj) {
		window.matm_obj = new Matm();
	}
	if ( _matm_domain ) {
		var subUrl = _matm_domain.replace(/\/ad\/p\/ot/, "/js/");
		if (!window.matm_obj.loadSub(_matm_domain, _matm_arg, _matm_cookie, _matm_async, subUrl)){
			window.matm_obj.init(_matm_domain, _matm_arg, _matm_cookie, _matm_async);
		}
	}
}
function fireTags(script){
	window.matm_obj.ycvtags = 0;
	window.matm_obj.fireTags(script);
}
function insertScriptElement(url,olfunc){
	window.matm_obj.insertScriptElement(url,olfunc);
}
function execGlobalScope(script) {
	window.matm_obj.execGlobalScope(script);
}
(function (t,f){
	var W=window,
	_l,l=function(t,f,b){
		var WO = W.matm_ol;
		if(WO&&t=='load'){
			WO.push(f)
		}else{
			_l(t,f,b)
		}
	},_e, e = function(t,f){
		var WO = W.matm_ol;
		if(WO&&t=='onload'){
			WO.push(f)
		}else{
			_e(t,f)
		}
	};
	var WL=W.addEventListener;
	var WE=W.attachEvent;
	if(WL){
		WL(t,f,!!0);
	} else if(WE){
		WE('on'+t,f);
	}
	if(WL){
		_l=WL;
		W.addEventListener=l;
	}
	if(WE){
		_e=WE;
		W.attachEvent=e;
	}
})
('load',function(){
	if (!window.matm_ol){ window.matm_ol = [];}
});
(function(){
	var mkMap = function(str){
		var obj = {}, items = str.split(",");
		for ( var i = 0; i < items.length; i++ )
			obj[ items[i] ] = true;
		return obj;
	};
	document._adm_special = mkMap("script,style");
	document._adm_block = mkMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");
	document._adm_single = mkMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");
	document._adm_inline = mkMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
	document._adm_closeSelf = mkMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
	document._adm_htmlParser = function(textHtml, fnc){
		var startTag = /^<([-A-Za-z0-9_]+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
			endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
			attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
		var ix, notTag, match, stack = [], prevHtml = textHtml, d=document, chkWord='', totalLength = 0;
		var contFlag = true;
		var parseEndTag = function( tag, tagName ) {
			if ( !tagName )
				var pos = 0;
			else
				for ( var pos = stack.length - 1; pos >= 0; pos-- )
					if ( stack[ pos ] == tagName )
						break;
			if ( pos >= 0 ) {
				for ( var i = stack.length - 1; i >= pos; i-- )
					if ( fnc.end )
						contFlag = fnc.end( stack[ i ], totalLength, arguments.length );
				stack.length = pos;
			}
		};
		var parseStartTag = function( tag, tagName, attrs, unary ) {
			tagName = tagName.toLowerCase();
			if ( d._adm_block[ tagName ] ) {
				while ( stack.last() && d._adm_inline[ stack.last() ] ) {
					parseEndTag( "", stack.last() );
				}
			}
			if ( d._adm_closeSelf[ tagName ] && stack.last() == tagName ) {
				parseEndTag( "", tagName );
			}
			unary = d._adm_single[ tagName ] || !!unary;
			if ( !unary )
				stack.push( tagName );
			if ( fnc.start )
				contFlag = fnc.start( tagName, attrs, unary, totalLength );
		};

		stack.last = function(){return this[ this.length - 1 ];};
		while(textHtml && contFlag) {
			notTag = true;
			if ( !stack.last() || !d._adm_special[ stack.last() ] ) {
				chkWord = textHtml.substring( 0, 5 );
				if ( chkWord.indexOf("<!--") == 0 ) {
					ix = textHtml.indexOf("-->");
					if ( ix >= 0 ) {
						totalLength += ix + 3;
						if ( fnc.comment ) {
							contFlag = fnc.comment( textHtml.substring( 4, ix ), totalLength );
						}
						textHtml = textHtml.substring( ix + 3 );
						notTag = false;
					}
				} else if ( chkWord.indexOf("</") == 0 ) {
					match = textHtml.match( endTag );
					if ( match ) {
						totalLength += match[0].length;
						textHtml = textHtml.substring( match[0].length );
						match[0].replace( endTag, parseEndTag );
						notTag = false;
					}
				} else if ( chkWord.indexOf("<") == 0 ) {
					match = textHtml.match( startTag );
					if ( match ) {
						totalLength += match[0].length;
						textHtml = textHtml.substring( match[0].length );
						match[0].replace( startTag, parseStartTag );
						notTag = false;
					}
				}
				if ( notTag ) {
					ix = textHtml.indexOf("<");
					
					var txt = ix < 0 ? textHtml : textHtml.substring( 0, ix );
					textHtml = ix < 0 ? "" : textHtml.substring( ix );
					
					totalLength += ix < 0 ? txt.length : ix;
					if ( fnc.text )
						contFlag = fnc.text( txt, totalLength );
				}
			} else {
				var re = new RegExp("(([\r\n]|.)*?)<\/" + stack.last() + "[^>]*>");
				textHtml = textHtml.toLowerCase();
				match = textHtml.match(re);
				var endLength = totalLength + match[0].length;
				totalLength += match[1].length;
				textHtml = textHtml.replace(re, function(hit, txt){
					if ( fnc.text )
						contFlag = fnc.text( txt, totalLength );
					return "";
				});
				totalLength = endLength;
				parseEndTag( "", stack.last() );
			}
			if ( textHtml == prevHtml )
				throw "Parse Error: " + textHtml;
			prevHtml = textHtml;
		}
		parseEndTag();
	};
	document._adm_getSingleTag = function(htmlText) {
		var nest_cnt = 0;
		var index = 0;
		var name = '';
		var attr = '';
		var innerIdxStart = 0, innerIdxEnd = 0;
		try {
			document._adm_htmlParser(htmlText, {
				start: function( tag, attrs, unary, len ) {
					if (nest_cnt == 0) {
						name = tag;
						attr = attrs;
						innerIdxStart = innerIdxEnd = len;
					}
					index = len;
					if (!unary) nest_cnt ++;
					if (nest_cnt == 0) return false;
					return true;
				},
				end: function( tag, len ) {
					index = len;
					nest_cnt --;
					if (nest_cnt == 0) return false;
					innerIdxEnd = len;
					return true;
				},
				text: function( text, len ) {
					index = innerIdxEnd = len;
					if (nest_cnt == 0) return false;
					return true;
				},
				comment: function( text, len ) {
					index = innerIdxEnd = len;
					if (nest_cnt == 0) return false;
					return true;
				}
			});
		} catch (e) { return null;}
		if (index > 0) {
			return [htmlText.substring(0, index),name,attr,htmlText.substring(innerIdxStart, innerIdxEnd)];
		} else {
			return null;
		}
	}
})();
