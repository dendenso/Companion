(function(e){function t(t){for(var i,s,a=t[0],u=t[1],c=t[2],d=0,f=[];d<a.length;d++)s=a[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(i in u)Object.prototype.hasOwnProperty.call(u,i)&&(e[i]=u[i]);l&&l(t);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,a=1;a<n.length;a++){var u=n[a];0!==r[u]&&(i=!1)}i&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},r={app:0},o=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},a7d5:function(e,t,n){"use strict";n("a4d3"),n("e01a"),n("d28b"),n("b0c0"),n("d3b7"),n("3ca3"),n("ddb0");var i=this&&this.__awaiter||function(e,t,n,i){function r(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function s(e){try{u(i.next(e))}catch(t){o(t)}}function a(e){try{u(i["throw"](e))}catch(t){o(t)}}function u(e){e.done?n(e.value):r(e.value).then(s,a)}u((i=i.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,i,r,o,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(e){return function(t){return u([e,t])}}function u(o){if(n)throw new TypeError("Generator is already executing.");while(s)try{if(n=1,i&&(r=2&o[0]?i["return"]:o[0]?i["throw"]||((r=i["return"])&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,i=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(r=s.trys,!(r=r.length>0&&r[r.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){s.label=o[1];break}if(6===o[0]&&s.label<r[1]){s.label=r[1],r=o;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(o);break}r[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(a){o=[6,a],i=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}};Object.defineProperty(t,"__esModule",{value:!0}),t.OWWindow=void 0;var o=function(){function e(e){void 0===e&&(e=null),this._name=e,this._id=null}return e.prototype.restore=function(){return i(this,void 0,Promise,(function(){var e,t=this;return r(this,(function(n){return e=this,[2,new Promise((function(n){return i(t,void 0,void 0,(function(){var t;return r(this,(function(i){switch(i.label){case 0:return[4,e.assureObtained()];case 1:return i.sent(),t=e._id,overwolf.windows.restore(t,(function(e){e.success||console.error("[restore] - an error occurred, windowId="+t+", reason="+e.error),n()})),[2]}}))}))}))]}))}))},e.prototype.minimize=function(){return i(this,void 0,Promise,(function(){var e,t=this;return r(this,(function(n){return e=this,[2,new Promise((function(n){return i(t,void 0,void 0,(function(){var t;return r(this,(function(i){switch(i.label){case 0:return[4,e.assureObtained()];case 1:return i.sent(),t=e._id,overwolf.windows.minimize(t,(function(){})),[2,n()]}}))}))}))]}))}))},e.prototype.maximize=function(){return i(this,void 0,Promise,(function(){var e,t=this;return r(this,(function(n){return e=this,[2,new Promise((function(n){return i(t,void 0,void 0,(function(){var t;return r(this,(function(i){switch(i.label){case 0:return[4,e.assureObtained()];case 1:return i.sent(),t=e._id,overwolf.windows.maximize(t,(function(){})),[2,n()]}}))}))}))]}))}))},e.prototype.hide=function(){return i(this,void 0,Promise,(function(){var e,t=this;return r(this,(function(n){return e=this,[2,new Promise((function(n){return i(t,void 0,void 0,(function(){var t;return r(this,(function(i){switch(i.label){case 0:return[4,e.assureObtained()];case 1:return i.sent(),t=e._id,overwolf.windows.hide(t,(function(){})),[2,n()]}}))}))}))]}))}))},e.prototype.close=function(){return i(this,void 0,void 0,(function(){var e,t=this;return r(this,(function(n){return e=this,[2,new Promise((function(n){return i(t,void 0,void 0,(function(){var t;return r(this,(function(i){switch(i.label){case 0:return[4,e.assureObtained()];case 1:return i.sent(),e._id,[4,this.getWindowState()];case 2:return t=i.sent(),t.success&&"closed"!==t.window_state?[4,this.internalClose()]:[3,4];case 3:i.sent(),i.label=4;case 4:return[2,n()]}}))}))}))]}))}))},e.prototype.dragMove=function(e){var t=this;e.onmousedown=function(e){e.preventDefault(),overwolf.windows.dragMove(t._name)}},e.prototype.getWindowState=function(){return i(this,void 0,Promise,(function(){var e,t=this;return r(this,(function(n){return e=this,[2,new Promise((function(n){return i(t,void 0,void 0,(function(){var t;return r(this,(function(i){switch(i.label){case 0:return[4,e.assureObtained()];case 1:return i.sent(),t=e._id,overwolf.windows.getWindowState(t,n),[2]}}))}))}))]}))}))},e.getCurrentInfo=function(){return i(this,void 0,Promise,(function(){var e=this;return r(this,(function(t){return[2,new Promise((function(t){return i(e,void 0,void 0,(function(){return r(this,(function(e){return overwolf.windows.getCurrentWindow((function(e){t(e.window)})),[2]}))}))}))]}))}))},e.prototype.obtain=function(){var e=this;return new Promise((function(t,n){var i=function(i){i&&"success"===i.status&&i.window&&i.window.id?(e._id=i.window.id,e._name||(e._name=i.window.name),t(i.window)):(e._id=null,n())};e._name?overwolf.windows.obtainDeclaredWindow(e._name,i):overwolf.windows.getCurrentWindow(i)}))},e.prototype.assureObtained=function(){return i(this,void 0,Promise,(function(){var e,t=this;return r(this,(function(n){return e=this,[2,new Promise((function(n){return i(t,void 0,void 0,(function(){return r(this,(function(t){switch(t.label){case 0:return[4,e.obtain()];case 1:return t.sent(),[2,n()]}}))}))}))]}))}))},e.prototype.internalClose=function(){return i(this,void 0,Promise,(function(){var e,t=this;return r(this,(function(n){return e=this,[2,new Promise((function(n,o){return i(t,void 0,void 0,(function(){var t;return r(this,(function(i){switch(i.label){case 0:return[4,e.assureObtained()];case 1:return i.sent(),t=e._id,overwolf.windows.close(t,(function(e){e&&e.success?n():o(e)})),[2]}}))}))}))]}))}))},e}();t.OWWindow=o},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"logs"}},[n("div",{staticClass:"logColumn",attrs:{id:"events"}},[n("h1",[e._v("Game Events")]),n("div",{staticClass:"dataText",attrs:{id:"eventsLog"}},e._l(e.events,(function(t){return n("p",{key:t},[e._v(" "+e._s(t)+" ")])})),0),n("button",{staticClass:"logCopy",attrs:{id:"copyEvents"}},[e._v("COPY GAME EVENTS")])]),n("div",{staticClass:"logColumn",attrs:{id:"infoUpdates"}},[n("h1",[e._v("Info Updates")]),n("div",{staticClass:"dataText",attrs:{id:"infoLog"}},e._l(e.infos,(function(t){return n("p",{key:t},[e._v(" "+e._s(t)+" ")])})),0),n("button",{staticClass:"logCopy",attrs:{id:"copyInfo"}},[e._v("COPY INFO UPDATES")])])])},o=[],s=(n("ac1f"),n("5319"),n("96cf"),n("1da1")),a=n("d4ec"),u=n("bee2"),c=n("262e"),l=n("2caf"),d=n("9ab4"),f=n("60a3"),h=n("ebb9"),v=(n("d3b7"),function(){function e(){Object(a["a"])(this,e)}return Object(u["a"])(e,null,[{key:"getHotkeyText",value:function(e){return new Promise((function(t,n){overwolf.settings.getHotKey(e,(function(e){e&&e.success&&e.hotkey||t("UNASSIGNED"),t(e.hotkey)}))}))}},{key:"onHotkeyDown",value:function(e,t){overwolf.settings.registerHotKey(e,t)}}]),e}()),m=n("a7d5"),w=n("4dec"),g=overwolf.windows.WindowState,p=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(a["a"])(this,n),e=t.apply(this,arguments),e.events=[],e.infos=[],e}return Object(u["a"])(n,[{key:"_showExitMinimizeModal",value:function(){this._modal.style.display="block"}},{key:"_hideExitMinimizeModal",value:function(){this._modal.style.display="none"}},{key:"mounted",value:function(){var e=this,t=new w["a"]("highlightsDB"),n=!0;t.version(1).stores({matches:"match_id, match_start_time",videos:"media_url, match_id, thumbnail_url, highlight_start_time, duration, hightType"}),this._eventsLog=document.getElementById("eventsLog"),this._infoLog=document.getElementById("infoLog"),this.setToggleHotkeyBehavior(),this.setToggleHotkeyText(),this._closeButton.addEventListener("click",this._showExitMinimizeModal),this._minimizeHeaderButton.addEventListener("click",(function(){e.currWindow.minimize()})),this._exitButton.addEventListener("click",(function(){e._backgroundWindow.close()})),this._minimizeButton.addEventListener("click",(function(){e._backgroundWindow.minimize(),e._hideExitMinimizeModal()})),window.onclick=function(t){t.target==e._modal&&e._hideExitMinimizeModal()},this.currWindow.dragMove(this._header),overwolf.media.replays.onCaptureError.addListener((function(e){console.log("result from CaptureErrorEvent: ",e)})),overwolf.media.replays.onCaptureStopped.addListener((function(e){console.log("result from Capture Stopped: ",e)})),overwolf.media.replays.onCaptureWarning.addListener((function(e){console.log("result from Capture Warning: ",e)})),overwolf.media.replays.onReplayServicesStarted.addListener((function(e){console.log("result from onReplayServicesStarted: ",e)})),overwolf.media.replays.onHighlightsCaptured.addListener(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(i){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("result from onHighlightsCaptured: ",i),r=i.media_url.replace("replays","videos"),!n){e.next=10;break}return e.next=5,t.table("matches").put({match_id:i.match_id,match_start_time:i.match_start_time}).catch((function(e){return console.log(e)}));case 5:return e.next=7,t.table("videos").add({match_id:i.match_id,media_url:r,thumbnail_url:i.thumbnail_url,highlight_start_time:i.start_time,duration:i.duration,hightType:i.events[0]}).catch((function(e){return console.log(e)}));case 7:n=!1,e.next=12;break;case 10:return e.next=12,t.table("videos").add({media_url:r,match_id:i.match_id,thumbnail_url:i.thumbnail_url,highlight_start_time:i.start_time,duration:i.duration,hightType:i.events[0]}).catch((function(e){return console.log(e)}));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var i={video:{buffer_length:2e4,override_overwolf_setting:!1,fps:30,width:1920,height:1080},game:{volume:75,enable:!0},quota:{max_quota_gb:1,excluded_directories:["cool_session"]}};overwolf.media.replays.turnOn({settings:i,highlights:{enable:!0,requiredHighlights:["death","assist","kill","victory"]}},(function(e){console.log("Turning on Auto Highlights: ",e)}))}},{key:"created",value:function(){var e=this;this._backgroundWindow=new m["OWWindow"]("background"),this.currWindow=new m["OWWindow"]("in_game"),this._modal=document.getElementById("exitMinimizeModal"),this._closeButton=document.getElementById("closeButton"),this._minimizeHeaderButton=document.getElementById("minimizeButton"),this._exitButton=document.getElementById("exit"),this._minimizeButton=document.getElementById("minimize"),this._header=document.getElementsByClassName("app-header")[0],this._version=document.getElementById("version");var t=["summoner_info","gameMode","teams","matchState","kill","death","respawn","assist","minions","level","abilities","announcer","counters","match_info","damage","heal","live_client_data"];function n(){overwolf.games.events.onError.addListener((function(e){console.log("error listener"),console.log("Error: "+JSON.stringify(e))})),overwolf.games.events.onInfoUpdates2.addListener((function(t){e.infos.push(t)})),overwolf.games.events.onNewEvents.addListener((function(t){e.events.push(t)}))}function i(e){return!!e&&(!!e.gameInfo&&(!(!e.runningChanged&&!e.gameChanged)&&(!!e.gameInfo.isRunning&&(5426==Math.floor(e.gameInfo.id/10)&&(console.log("LoL Launched"),!0)))))}function r(e){return!!e&&(!!e.isRunning&&(5426==Math.floor(e.id/10)&&(console.log("LoL running"),!0)))}function o(){overwolf.games.events.setRequiredFeatures(t,(function(e){"error"!=e.status?(console.log("Set required features:"),console.log(JSON.stringify(e))):window.setTimeout(o,2e3)}))}overwolf.games.onGameInfoUpdated.addListener((function(e){i(e)&&(n(),setTimeout(o,1e3))})),overwolf.games.getRunningGameInfo((function(e){r(e)&&(n(),setTimeout(o,1e3))}))}},{key:"onInfoUpdates",value:function(e){this.infos.push(e)}},{key:"onNewEvents",value:function(e){this.events.push(e)}},{key:"setToggleHotkeyText",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:overwolf.settings.hotkeys.get((function(e){console.log("hotkey data",e.games["5426"]);var t=document.getElementById("hotkey");t.textContent=e.games["5426"]["0"]["binding"],overwolf.settings.hotkeys.OnPressedEvent.addListener((function(e){console.log("hotkey pressed",e)}))}));case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"setToggleHotkeyBehavior",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("pressed hotkey for ".concat(t.featureId)),e.next=3,n.getWindowState();case 3:i=e.sent,i.window_state===g.NORMAL||i.window_state===g.MAXIMIZED?n.currWindow.minimize():i.window_state!==g.MINIMIZED&&i.window_state!==g.CLOSED||n.currWindow.restore();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v.onHotkeyDown(h["hotkeys"].toggle,t);case 2:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getWindowState",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.currWindow.getWindowState();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),n}(f["b"]);p=Object(d["a"])([f["a"]],p);var _=p,y=_,b=n("2877"),k=Object(b["a"])(y,r,o,!1,null,null,null),O=k.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(O)}}).$mount("#app")},ebb9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.hotkeys=t.windowNames=t.interestingFeatures=t.leagueClassId=void 0;var i=5426;t.leagueClassId=i;var r=["counters","death","items","kill","killed","killer","location","match_info","match","me","phase","rank","revived","roster","team"];t.interestingFeatures=r;var o={inGame:"in_game",desktop:"desktop"};t.windowNames=o;var s={toggle:"showhide"};t.hotkeys=s}});
//# sourceMappingURL=app.05c503f2.js.map