(function(e){function t(t){for(var r,s,u=t[0],a=t[1],c=t[2],l=0,f=[];l<u.length;l++)s=u[l],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);d&&d(t);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,u=1;u<n.length;u++){var a=n[u];0!==i[a]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},o=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],a=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var d=a;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"65e8":function(e,t,n){"use strict";n("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.OWHotkeys=void 0;var r=function(){function e(){}return e.getHotkeyText=function(e){return new Promise((function(t,n){overwolf.settings.getHotKey(e,(function(e){e&&e.success&&e.hotkey||t("UNASSIGNED"),t(e.hotkey)}))}))},e.onHotkeyDown=function(e,t){overwolf.settings.registerHotKey(e,t)},e}();t.OWHotkeys=r},a7d5:function(e,t,n){"use strict";n("a4d3"),n("e01a"),n("d28b"),n("b0c0"),n("d3b7"),n("3ca3"),n("ddb0");var r=this&&this.__awaiter||function(e,t,n,r){function i(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function s(e){try{a(r.next(e))}catch(t){o(t)}}function u(e){try{a(r["throw"](e))}catch(t){o(t)}}function a(e){e.done?n(e.value):i(e.value).then(s,u)}a((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(e){return function(t){return a([e,t])}}function a(o){if(n)throw new TypeError("Generator is already executing.");while(s)try{if(n=1,r&&(i=2&o[0]?r["return"]:o[0]?r["throw"]||((i=r["return"])&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(i=s.trys,!(i=i.length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(u){o=[6,u],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}};Object.defineProperty(t,"__esModule",{value:!0}),t.OWWindow=void 0;var o=function(){function e(e){void 0===e&&(e=null),this._name=e,this._id=null}return e.prototype.restore=function(){return r(this,void 0,Promise,(function(){var e,t=this;return i(this,(function(n){return e=this,[2,new Promise((function(n){return r(t,void 0,void 0,(function(){var t;return i(this,(function(r){switch(r.label){case 0:return[4,e.assureObtained()];case 1:return r.sent(),t=e._id,overwolf.windows.restore(t,(function(e){e.success||console.error("[restore] - an error occurred, windowId="+t+", reason="+e.error),n()})),[2]}}))}))}))]}))}))},e.prototype.minimize=function(){return r(this,void 0,Promise,(function(){var e,t=this;return i(this,(function(n){return e=this,[2,new Promise((function(n){return r(t,void 0,void 0,(function(){var t;return i(this,(function(r){switch(r.label){case 0:return[4,e.assureObtained()];case 1:return r.sent(),t=e._id,overwolf.windows.minimize(t,(function(){})),[2,n()]}}))}))}))]}))}))},e.prototype.maximize=function(){return r(this,void 0,Promise,(function(){var e,t=this;return i(this,(function(n){return e=this,[2,new Promise((function(n){return r(t,void 0,void 0,(function(){var t;return i(this,(function(r){switch(r.label){case 0:return[4,e.assureObtained()];case 1:return r.sent(),t=e._id,overwolf.windows.maximize(t,(function(){})),[2,n()]}}))}))}))]}))}))},e.prototype.hide=function(){return r(this,void 0,Promise,(function(){var e,t=this;return i(this,(function(n){return e=this,[2,new Promise((function(n){return r(t,void 0,void 0,(function(){var t;return i(this,(function(r){switch(r.label){case 0:return[4,e.assureObtained()];case 1:return r.sent(),t=e._id,overwolf.windows.hide(t,(function(){})),[2,n()]}}))}))}))]}))}))},e.prototype.close=function(){return r(this,void 0,void 0,(function(){var e,t=this;return i(this,(function(n){return e=this,[2,new Promise((function(n){return r(t,void 0,void 0,(function(){var t;return i(this,(function(r){switch(r.label){case 0:return[4,e.assureObtained()];case 1:return r.sent(),e._id,[4,this.getWindowState()];case 2:return t=r.sent(),t.success&&"closed"!==t.window_state?[4,this.internalClose()]:[3,4];case 3:r.sent(),r.label=4;case 4:return[2,n()]}}))}))}))]}))}))},e.prototype.dragMove=function(e){var t=this;e.onmousedown=function(e){e.preventDefault(),overwolf.windows.dragMove(t._name)}},e.prototype.getWindowState=function(){return r(this,void 0,Promise,(function(){var e,t=this;return i(this,(function(n){return e=this,[2,new Promise((function(n){return r(t,void 0,void 0,(function(){var t;return i(this,(function(r){switch(r.label){case 0:return[4,e.assureObtained()];case 1:return r.sent(),t=e._id,overwolf.windows.getWindowState(t,n),[2]}}))}))}))]}))}))},e.getCurrentInfo=function(){return r(this,void 0,Promise,(function(){var e=this;return i(this,(function(t){return[2,new Promise((function(t){return r(e,void 0,void 0,(function(){return i(this,(function(e){return overwolf.windows.getCurrentWindow((function(e){t(e.window)})),[2]}))}))}))]}))}))},e.prototype.obtain=function(){var e=this;return new Promise((function(t,n){var r=function(r){r&&"success"===r.status&&r.window&&r.window.id?(e._id=r.window.id,e._name||(e._name=r.window.name),t(r.window)):(e._id=null,n())};e._name?overwolf.windows.obtainDeclaredWindow(e._name,r):overwolf.windows.getCurrentWindow(r)}))},e.prototype.assureObtained=function(){return r(this,void 0,Promise,(function(){var e,t=this;return i(this,(function(n){return e=this,[2,new Promise((function(n){return r(t,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,e.obtain()];case 1:return t.sent(),[2,n()]}}))}))}))]}))}))},e.prototype.internalClose=function(){return r(this,void 0,Promise,(function(){var e,t=this;return i(this,(function(n){return e=this,[2,new Promise((function(n,o){return r(t,void 0,void 0,(function(){var t;return i(this,(function(r){switch(r.label){case 0:return[4,e.assureObtained()];case 1:return r.sent(),t=e._id,overwolf.windows.close(t,(function(e){e&&e.success?n():o(e)})),[2]}}))}))}))]}))}))},e}();t.OWWindow=o},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"logs"}},[n("div",{staticClass:"logColumn",attrs:{id:"events"}},[n("h1",[e._v("Game Events")]),n("div",{staticClass:"dataText",attrs:{id:"eventsLog"}},e._l(e.events,(function(t){return n("p",{key:t},[e._v(" "+e._s(t)+" ")])})),0),n("button",{staticClass:"logCopy",attrs:{id:"copyEvents"}},[e._v(" COPY GAME EVENTS ")])]),n("div",{staticClass:"logColumn",attrs:{id:"infoUpdates"}},[n("h1",[e._v("Info Updates")]),n("div",{staticClass:"dataText",attrs:{id:"infoLog"}},e._l(e.infos,(function(t){return n("p",{key:t},[e._v(" "+e._s(t)+" ")])})),0),n("button",{staticClass:"logCopy",attrs:{id:"copyInfo"}},[e._v(" COPY INFO UPDATES ")])])])},o=[],s=(n("96cf"),n("1da1")),u=n("d4ec"),a=n("bee2"),c=n("262e"),d=n("2caf"),l=n("9ab4"),f=n("60a3"),h=(n("d3b7"),function(){function e(t,n){var r=this;Object(u["a"])(this,e),this._timerId=null,this.handleTimerEvent=function(){r._timerId=null,r._delegate.onTimer(r._id)},this._delegate=t,this._id=n}return Object(a["a"])(e,[{key:"start",value:function(e){this.stop(),this._timerId=setTimeout(this.handleTimerEvent,e)}},{key:"stop",value:function(){null!=this._timerId&&(clearTimeout(this._timerId),this._timerId=null)}}],[{key:"wait",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){setTimeout(e,t)})));case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}()),v=function(){function e(t,n){var r=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;Object(u["a"])(this,e),this.onInfoUpdates=function(e){r._delegate.onInfoUpdates(e.info)},this.onNewEvents=function(e){r._delegate.onNewEvents(e)},this._delegate=t,this._requiredFeatures=n,this._featureRetries=i}return Object(a["a"])(e,[{key:"getInfo",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){overwolf.games.events.getInfo(e)})));case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"setRequiredFeatures",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n,r=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=1;case 1:if(!(t<=this._featureRetries)){e.next=13;break}return e.next=4,new Promise((function(e){overwolf.games.events.setRequiredFeatures(r._requiredFeatures,e)}));case 4:if(n=e.sent,"success"!==n.status){e.next=8;break}return console.log("setRequiredFeatures(): success: "+JSON.stringify(n,null,2)),e.abrupt("return",n.supportedFeatures.length>0);case 8:return e.next=10,h.wait(3e3);case 10:t++,e.next=1;break;case 13:return console.warn("setRequiredFeatures(): failure after "+t+" tries"+JSON.stringify(n,null,2)),e.abrupt("return",!1);case 15:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"registerEvents",value:function(){this.unRegisterEvents(),overwolf.games.events.onInfoUpdates2.addListener(this.onInfoUpdates),overwolf.games.events.onNewEvents.addListener(this.onNewEvents)}},{key:"unRegisterEvents",value:function(){overwolf.games.events.onInfoUpdates2.removeListener(this.onInfoUpdates),overwolf.games.events.onNewEvents.removeListener(this.onNewEvents)}},{key:"start",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("[ow-game-events] START"),this.registerEvents(),e.next=4,this.setRequiredFeatures();case 4:return e.next=6,this.getInfo();case 6:t=e.sent,n=t.res,r=t.status,n&&"success"===r&&this.onInfoUpdates({info:n});case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"stop",value:function(){console.log("[ow-game-events] STOP"),this.unRegisterEvents()}}]),e}(),w=["counters","death","items","kill","killed","killer","location","match_info","match","me","phase","rank","revived","roster","team"],p={toggle:"showhide"},m=n("65e8"),g=n("a7d5"),y=overwolf.windows.WindowState,b=function(e){Object(c["a"])(n,e);var t=Object(d["a"])(n);function n(){var e;return Object(u["a"])(this,n),e=t.apply(this,arguments),e.events=[],e.infos=[],e}return Object(a["a"])(n,[{key:"_showExitMinimizeModal",value:function(){this._modal.style.display="block"}},{key:"_hideExitMinimizeModal",value:function(){this._modal.style.display="none"}},{key:"mounted",value:function(){var e=this;this._eventsLog=document.getElementById("eventsLog"),this._infoLog=document.getElementById("infoLog"),this.setToggleHotkeyBehavior(),this.setToggleHotkeyText(),this._closeButton.addEventListener("click",this._showExitMinimizeModal),this._minimizeHeaderButton.addEventListener("click",(function(){e._backgroundWindow.minimize()})),this._exitButton.addEventListener("click",(function(){e._backgroundWindow.close()})),this._minimizeButton.addEventListener("click",(function(){e._backgroundWindow.minimize(),e._hideExitMinimizeModal()})),window.onclick=function(t){t.target==e._modal&&e._hideExitMinimizeModal()},this.currWindow.dragMove(this._header)}},{key:"created",value:function(){this._backgroundWindow=new g["OWWindow"]("background"),this.currWindow=new g["OWWindow"]("in_game"),this._modal=document.getElementById("exitMinimizeModal"),this._closeButton=document.getElementById("closeButton"),this._minimizeHeaderButton=document.getElementById("minimizeButton"),this._exitButton=document.getElementById("exit"),this._minimizeButton=document.getElementById("minimize"),this._header=document.getElementsByClassName("app-header")[0],this._version=document.getElementById("version"),this._gameEventsListener=new v({onInfoUpdates:this.onInfoUpdates.bind(this),onNewEvents:this.onNewEvents.bind(this)},w),this._gameEventsListener.start()}},{key:"onInfoUpdates",value:function(e){this.infos.push(e)}},{key:"onNewEvents",value:function(e){this.events.push(e)}},{key:"setToggleHotkeyText",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m["OWHotkeys"].getHotkeyText(p.toggle);case 2:t=e.sent,n=document.getElementById("hotkey"),n.textContent=t;case 5:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"setToggleHotkeyBehavior",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("pressed hotkey for ".concat(t.featureId)),e.next=3,n.getWindowState();case 3:r=e.sent,r.window_state===y.NORMAL||r.window_state===y.MAXIMIZED?n.currWindow.minimize():r.window_state!==y.MINIMIZED&&r.window_state!==y.CLOSED||n.currWindow.restore();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m["OWHotkeys"].onHotkeyDown(p.toggle,t);case 2:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getWindowState",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.currWindow.getWindowState();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),n}(f["b"]);b=Object(l["a"])([f["a"]],b);var _=b,k=_,O=n("2877"),E=Object(O["a"])(k,i,o,!1,null,null,null),x=E.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(x)}}).$mount("#app")}});
//# sourceMappingURL=app.ab39e378.js.map