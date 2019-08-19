"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};var ArrayProto=Array.prototype,FuncProto=Function.prototype,ObjProto=Object.prototype,slice=ArrayProto.slice,toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty;var nativeForEach=ArrayProto.forEach,nativeIndexOf=ArrayProto.indexOf,nativeIsArray=Array.isArray,breaker={};if(!Array.indexOf){Array.prototype.indexOf=function(el){for(var i=0,n=this.length;i<n;i++){if(this[i]===el){return i}}return-1}}var _={checkTime:function checkTime(timeString){var date=timeString+"";var reg=/^(\d{4})-(\d{2})-(\d{2})$/;if(date){if(!reg.test(date)){return false}else{return true}}else{return false}},each:function each(obj,iterator,context){if(obj===null||obj===undefined){return}if(nativeForEach&&obj.forEach===nativeForEach){obj.forEach(iterator,context)}else{if(obj.length===+obj.length){for(var i=0,l=obj.length;i<l;i++){if(i in obj&&iterator.call(context,obj[i],i,obj)===breaker){return}}}else{for(var key in obj){if(hasOwnProperty.call(obj,key)){if(iterator.call(context,obj[key],key,obj)===breaker){return}}}}}},extend:function extend(obj){_.each(slice.call(arguments,1),function(source){for(var prop in source){if(source[prop]!==void 0){obj[prop]=source[prop]}}});return obj},isArray:nativeIsArray||function(obj){return Object.prototype.toString.apply(obj)==="[object Array]"},isObject:function isObject(obj){return obj===Object(obj)&&!_.isArray(obj)},isUndefined:function isUndefined(obj){return obj===void 0},truncate:function truncate(obj,length){var ret;if(typeof obj==="string"){ret=obj.slice(0,length)}else{if(_.isArray(obj)){ret=[];_.each(obj,function(val){ret.push(_.truncate(val,length))})}else{if(_.isObject(obj)){ret={};_.each(obj,function(val,key){ret[key]=_.truncate(val,length)})}else{ret=obj}}}return ret},base64Encode:function base64Encode(data){var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var o1,o2,o3,h1,h2,h3,h4,bits,i=0,ac=0,enc="",tmp_arr=[];if(!data){return data}data=_.utf8Encode(data);do{o1=data.charCodeAt(i++);o2=data.charCodeAt(i++);o3=data.charCodeAt(i++);bits=o1<<16|o2<<8|o3;h1=bits>>18&63;h2=bits>>12&63;h3=bits>>6&63;h4=bits&63;tmp_arr[ac++]=b64.charAt(h1)+b64.charAt(h2)+b64.charAt(h3)+b64.charAt(h4)}while(i<data.length);enc=tmp_arr.join("");switch(data.length%3){case 1:enc=enc.slice(0,-2)+"==";break;case 2:enc=enc.slice(0,-1)+"=";break}return enc},utf8Encode:function utf8Encode(string){string=(string+"").replace(/\r\n/g,"\n").replace(/\r/g,"\n");var utftext="",start,end;var stringl=0,n;start=end=0;stringl=string.length;for(n=0;n<stringl;n++){var c1=string.charCodeAt(n);var enc=null;if(c1<128){end++}else{if(c1>127&&c1<2048){enc=String.fromCharCode(c1>>6|192,c1&63|128)}else{enc=String.fromCharCode(c1>>12|224,c1>>6&63|128,c1&63|128)}}if(enc!==null){if(end>start){utftext+=string.substring(start,end)}utftext+=enc;start=end=n+1}}if(end>start){utftext+=string.substring(start,string.length)}return utftext},sha1:function sha1(str){var hexcase=0;var b64pad="";var chrsz=8;function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length*chrsz))}function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length*chrsz))}function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length*chrsz))}function hex_hmac_sha1(key,data){return binb2hex(core_hmac_sha1(key,data))}function b64_hmac_sha1(key,data){return binb2b64(core_hmac_sha1(key,data))}function str_hmac_sha1(key,data){return binb2str(core_hmac_sha1(key,data))}function sha1_vm_test(){return hex_sha1("abc")=="a9993e364706816aba3e25717850c26c9cd0d89d"}function core_sha1(x,len){x[len>>5]|=128<<24-len%32;x[(len+64>>9<<4)+15]=len;var w=Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++){if(j<16){w[j]=x[i+j]}else{w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1)}var t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t}a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde)}return Array(a,b,c,d,e)}function sha1_ft(t,b,c,d){if(t<20){return b&c|~b&d}if(t<40){return b^c^d}if(t<60){return b&c|b&d|c&d}return b^c^d}function sha1_kt(t){return t<20?1518500249:t<40?1859775393:t<60?-1894007588:-899497514}function core_hmac_sha1(key,data){var bkey=str2binb(key);if(bkey.length>16){bkey=core_sha1(bkey,key.length*chrsz)}var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^909522486;opad[i]=bkey[i]^1549556828}var hash=core_sha1(ipad.concat(str2binb(data)),512+data.length*chrsz);return core_sha1(opad.concat(hash),512+160)}function safe_add(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535}function rol(num,cnt){return num<<cnt|num>>>32-cnt}function str2binb(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz){bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<24-i%32}return bin}function binb2str(bin){var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz){str+=String.fromCharCode(bin[i>>5]>>>24-i%32&mask)}return str}function binb2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt(binarray[i>>2]>>(3-i%4)*8+4&15)+hex_tab.charAt(binarray[i>>2]>>(3-i%4)*8&15)}return str}function binb2b64(binarray){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3){var triplet=(binarray[i>>2]>>8*(3-i%4)&255)<<16|(binarray[i+1>>2]>>8*(3-(i+1)%4)&255)<<8|binarray[i+2>>2]>>8*(3-(i+2)%4)&255;for(var j=0;j<4;j++){if(i*8+j*6>binarray.length*32){str+=b64pad}else{str+=tab.charAt(triplet>>6*(3-j)&63)}}}return str}return hex_sha1(str)},UUID:function(){var callback=function callback(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=="x"?r:r&3|8;return v.toString(16)})};return callback}(),HTTPBuildQuery:function HTTPBuildQuery(formdata,arg_separator){var use_val,use_key,tmp_arr=[];if(_.isUndefined(arg_separator)){arg_separator="&"}_.each(formdata,function(val,key){use_val=encodeURIComponent(val.toString());use_key=encodeURIComponent(key);tmp_arr[tmp_arr.length]=use_key+"="+use_val});return tmp_arr.join(arg_separator)},isJSONString:function isJSONString(str){try{JSON.parse(str)}catch(e){return false}return true},localStorage:{setStorage:function setStorage(){},getStorage:function getStorage(){return wx.getStorageSync("DATracker_wechat")||""},_state:{},toState:function toState(t){var e=null;_.isJSONString(t)?(e=JSON.parse(t),e.deviceUdid?this._state=e:this.set("deviceUdid",_.UUID())):this.set("deviceUdid",_.UUID())},set:function set(t,e){this._state=this._state||{};this._state[t]=e;this.save()},get:function get(t){return this._state[t]||""},save:function save(){try{wx.setStorageSync("DATracker_wechat",JSON.stringify(this._state))}catch(error){}},init:function init(){var t=this.getStorage();t?this.toState(t):this.set("deviceUdid",_.UUID())}},console:function(_console){function console(){return _console.apply(this,arguments)}console.toString=function(){return _console.toString()};return console}(function(){if("object"==(typeof console==="undefined"?"undefined":_typeof(console))&&console.log){try{return console.log.apply(console,arguments)}catch(t){console.log(arguments[0])}}}),info:{callback:function callback(){},properties:{},getSystem:function getSystem(){var self=this;var properties=self.properties;function getNetWork(){wx.getNetworkType({success:function success(res){properties.networkType=res.networkType},complete:other})}function other(){wx.getSystemInfo({success:function success(res){properties.deviceModel=res.model;properties.screenWidth=Number(res.windowWidth);properties.screenHeight=Number(res.windowHeight);properties.deviceOs=res.system.split(" ")[0];properties.deviceOsVersion=res.system.split(" ")[1],properties.devicePlatform=res.platform;properties.weixinVersion=res.version;properties.localeLanguage=res.language},complete:self.setStatusComplete.bind(self)})}getNetWork()},setStatusComplete:function setStatusComplete(){_.localStorage.set("deviceProperties",this.properties);this.callback(this.properties)}}};var lLIBVERSION="1.1.0";var SDKTYPE="MiniProgram";_.localStorage.init();function on(obj,event,callFn){if(obj[event]){var fn=obj[event];obj[event]=function(obj){callFn.call(this,obj,event);fn.call(this,obj)}}else{obj[event]=function(obj){callFn.call(this,obj,event)}}}var DATATYPE="e";var DEFAULTEVENTID={da_session_start:{dataType:"ie"},da_session_close:{dataType:"ie"},da_u_login:{dataType:"ie"},da_u_logout:{dataType:"ie"},da_u_signup:{dataType:"ie"},da_user_profile:{dataType:"ie"},da_screen:{dataType:"pv"},da_activate:{dataType:"ie"}};var DATracker={config:{apiHost:"https://da.qiyukf.com",appKey:"",appid:"",userId:"",show:"0",type:"0",sessionStartTime:"",persistedTime:"",lastEvent:{eventId:"",time:""},systemInfo:{},deviceUdid:"",debug:false,maxStringLength:255,trackLinksTimeout:300,costTime:{},appVersion:"",sendConfig:{start:false,fn:function fn(params){}}},getSystemInfoComplete:false,queue:[],disabledEvents:[],init:function init(appKey,config){var localConfig=_.localStorage.get("config");if(_.isJSONString(localConfig)){localConfig=JSON.parse(localConfig);_.extend(this["config"],localConfig||{})}_.extend(this["config"],config||{});this.getSystem();this.setConfig("appKey",appKey);this.daActivate()},set:function set(){_.localStorage.set("config",JSON.stringify(this["config"]))},getConfig:function getConfig(propName){return this["config"][propName]},setConfig:function setConfig(propName,propVal){this["config"][propName]=propVal},setConfigOnce:function setConfigOnce(propName,propVal){if(!this["config"][propName]){this.setConfig(propName,propVal);this.set()}},getDeviceUdid:function getDeviceUdid(){var localDeviceUdid=this.getConfig("deviceUdid");if(!localDeviceUdid){localDeviceUdid=_.localStorage.get("deviceUdid");this.setConfig("deviceUdid",localDeviceUdid);this.set()}return localDeviceUdid},getUserId:function getUserId(){return this.getConfig("userId")},getSystem:function getSystem(){var self=this;_.info.callback=function(systemInfo){self.getSystemInfoComplete=true;self.setConfig("systemInfo",systemInfo);self.set();if(self.queue.length>0){_.each(self.queue,function(t){self.send.apply(self,Array.prototype.slice.call(t))});self.queue=[]}};_.info.getSystem()},setRoute:function setRoute(route){this["config"]["route"]=route},getRoute:function getRoute(){return this["config"]["route"]},setUrl:function setUrl(route){var pageParameter=this.getPageParameter();route=route?route:this.getRoute();if(pageParameter){this["config"]["url"]=route+pageParameter}else{this["config"]["url"]=route}},getUrl:function getUrl(route){return this["config"]["url"]},setReferrer:function setReferrer(referrer){referrer=typeof referrer!=="undefined"?referrer:this.getUrl();this.setOldReferrer(this["config"]["referrer"]);this["config"]["referrer"]=referrer},setOldReferrer:function setOldReferrer(referrer){if(this["config"]["oldReferrer"]!==referrer){this["config"]["oldReferrer"]=referrer}},repeatSetReferrer:function repeatSetReferrer(){this["config"]["referrer"]=this["config"]["oldReferrer"]},getReferrer:function getReferrer(){return this["config"]["referrer"]},getPageParameter:function getPageParameter(){var currentPages=getCurrentPages();var route=this.getRoute();var obj={};var str="";for(var i=0;i<currentPages.length;i+=1){if(currentPages[i].route===route){obj=currentPages[i].options;break}}for(var key in obj){if(obj.hasOwnProperty(key)){if(str===""){str="?"+key+"="+obj[key]}else{str+="&"+key+"="+obj[key]}}}return str},sessionStart:function sessionStart(){if(this.getConfig["sessionUuid"]){this.track_da_session_close()}this.setConfig("sessionUuid",_.UUID());this.setConfig("sessionStartTime",(new Date).getTime());this.setConfig("show","0");this.track("da_session_start")},sessionClose:function sessionClose(){var sessionStartTime=this.getConfig("sessionStartTime");var lastEvent=this.getConfig("lastEvent")||{time:(new Date).getTime(),eventId:""};var sessionCloseTime=lastEvent.time;var sessionTotalLength=sessionCloseTime-sessionStartTime;this.setConfig("show","1");this.track("da_session_close",{sessionCloseTime:sessionCloseTime,sessionTotalLength:sessionTotalLength});this.setConfig("sessionUuid","")},daActivate:function daActivate(){var localDeviceUdid=this.getConfig("deviceUdid");if(!localDeviceUdid){localDeviceUdid=_.localStorage.get("deviceUdid");this.setConfig("deviceUdid",localDeviceUdid);this.track("da_activate");this.set()}},setEventTimer:function setEventTimer(eventName,timestamp){var timers=this.getConfig("costTime")||{};timers[eventName]=timestamp;this.setConfig("costTime",timers)},removeEventTimer:function removeEventTimer(eventName){var timers=this.getConfig("costTime")||{};var timestamp=timers[eventName];if(!_.isUndefined(timestamp)){delete timers[eventName];this.setConfig("costTime",timers)}return timestamp},time_event:function time_event(eventName){if(_.isUndefined(eventName)){_.console("必须传入事件名称");return}this.setEventTimer(eventName,(new Date).getTime())},track_pageview:function track_pageview(properties){this.track("da_screen",properties||{})},signup:function signup(userId){var oldUserId=this.getConfig("userId");var data={};oldUserId=oldUserId==undefined?"":oldUserId;if(oldUserId==userId){return}this.setConfig("userId",userId);this.set();data=this.track("da_u_signup",{oldUserId:oldUserId,newUserId:userId})},login:function login(userId){this.signup(userId);this.track("da_u_login")},logout:function logout(callback){this.setConfig("userId","");this.set();var hasCalled=false;function trackCallback(){if(!hasCalled){hasCalled=true;if(typeof callback==="function"){callback()}}}setTimeout(trackCallback,this.getConfig("trackLinksTimeout"));var data=this.track("da_u_logout",{},trackCallback);return data},send:function send(data,callback){if(!this.getSystemInfoComplete)return this.queue.push(arguments),!1;var count=0;var url=this.getConfig("urlType")==0?url=this.getConfig("apiHost")+"/minida/da.gif":url="https://dag."+this.getConfig("apiHost").substr(11)+"/minida/da.gif";url+="?"+_.HTTPBuildQuery(data.data);console.log(data);var sendData=function sendData(){wx.request({url:url,method:"GET",success:function success(res){if(typeof callback==="function"){callback(res,data)}},fail:function fail(res){if(2>count){count++;sendData()}}})};if(this.getConfig("sendConfig").start){if(typeof this.getConfig("sendConfig").fn==="function"){var successFn=function successFn(res){if(typeof callback==="function"){callback(res,truncatedData)}};var failFn=function failFn(e){};this.getConfig("sendConfig").fn({url:url,method:"GET",success:successFn,fail:failFn,data:_.HTTPBuildQuery(data)})}}else{sendData()}},track:function track(eventName,properties,callback){properties=properties||{};var dataType=DATATYPE;var otherProperties={};var userSetProperties=JSON.parse(JSON.stringify(properties));var startTimestamp=this.removeEventTimer(eventName);if(!_.isUndefined(startTimestamp)){otherProperties["costTime"]=(new Date).getTime()-startTimestamp}if(DEFAULTEVENTID[eventName]){dataType=DEFAULTEVENTID[eventName].dataType;this.setConfig("type",0)}else{this.setConfig("type",1)}var time=(new Date).getTime();if(eventName=="da_session_close"){time=properties.sessionCloseTime;delete userSetProperties["sessionCloseTime"];delete userSetProperties["sessionTotalLength"]}if(eventName=="da_session_start"){time=this.getConfig("sessionStartTime")}this.setConfigOnce("persistedTime",time);var systemInfo=this.getConfig("systemInfo");if(this.getConfig("type")==1){var title=eventName;var desc=JSON.stringify(properties)}else{var title=this.getConfig("title");var desc=""}var data={ak:this.getConfig("appKey").trim()||"",appid:this.getConfig("appid").trim()||"",dv:this.getConfig("userId")||"",si:"",su:this.getReferrer()||"",cup:this.getUrl()||"",tm:time,ct:title,lt:this.getConfig("show")||"",tp:this.getConfig("type"),desc:desc,u:this.getUrl()+time||""};if(!_.isUndefined(otherProperties["costTime"])){data["costTime"]=otherProperties["costTime"]}if(this.getConfig("userId")!=""){this.send({data:data},callback)}else{this.getopenidCallback=function(res){if(this.getConfig("userId")!=""){this.config.userId=res.data.result.openId;this.config.urlType=res.data.result.isGray;var data={ak:this.getConfig("appKey").trim()||"",appid:this.getConfig("appid").trim()||"",dv:this.getConfig("userId")||"",si:"",su:this.getReferrer()||"",cup:this.getUrl()||"",tm:time,ct:this.getConfig("title")||"",lt:this.getConfig("show")||"",desc:desc,u:this.getUrl()+time||""};this.send({data:data},callback)}}}if(["da_session_close","da_session_start"].indexOf(eventName)===-1){this.setConfig("lastEvent",{eventId:eventName,time:time})}}};function appLaunch(){this["DATracker"]=DATracker;DATracker.setUrl();DATracker.setOldReferrer("")}function appShow(){wx.login({success:function success(res){console.log("appshow + getOpenId");wx.request({url:"https://"+DATracker.config.apiHost.substr(11)+"/wxapi/miniprogram/getOpenId",data:{jscode:res.code,appid:DATracker.config.appid},method:"get",success:function success(res){DATracker.config.userId=res.data.result.openId;DATracker.config.urlType=res.data.result.isGray;if(DATracker.getopenidCallback){DATracker.getopenidCallback(res)}}})}});DATracker.repeatSetReferrer();DATracker.set()}function appHide(){DATracker.config.show="0";DATracker.sessionClose();DATracker.set()}function pageOnshow(){var self=this;DATracker.config.title=this.data.ysf.title;DATracker.config.show="0";var route="string"==typeof self.__route__?self.__route__:"";DATracker.setRoute(route);DATracker.setUrl();var onPageShow=function onPageShow(){if(DATracker.config.onPageShow){DATracker.config.onPageShow(DATracker,route,self)}else{DATracker.track_pageview()}};onPageShow()}function onHide(){DATracker.config.show="1";DATracker.track_pageview();DATracker.setReferrer();DATracker.set()}function onUnload(){DATracker.config.show="1";DATracker.track_pageview();DATracker.setReferrer();DATracker.set()}var p=App;var v=Page;App=function App(obj){on(obj,"onLaunch",appLaunch);on(obj,"onShow",appShow);on(obj,"onHide",appHide);p(obj)};Page=function Page(obj){on(obj,"onLoad",function(){});on(obj,"onUnload",onUnload);on(obj,"onShow",pageOnshow);on(obj,"onHide",onHide);v(obj)};exports.default=DATracker;