(function(e){function t(t){for(var a,r,o=t[0],c=t[1],l=t[2],m=0,d=[];m<o.length;m++)r=o[m],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&d.push(i[r][0]),i[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(d.length)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(a=!1)}a&&(s.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},i={app:0},s=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",{staticClass:"nav"},[n("button",{on:{click:function(t){return e.changeTab("Home")}}},[e._v("Home")]),n("button",{on:{click:function(t){return e.changeTab("Stats")}}},[e._v("Stats")]),n("button",{on:{click:function(t){return e.changeTab("Highlights")}}},[e._v("Highlights")])]),n(e.tabName,{tag:"component"})],1)},s=[],r=n("d4ec"),o=n("bee2"),c=n("262e"),l=n("2caf"),u=n("9ab4"),m=(n("99af"),n("b0c0"),n("d3b7"),n("96cf"),n("1da1")),d=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;Object(r["a"])(this,e),this._name=t,this._id=null}return Object(o["a"])(e,[{key:"restore",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.abrupt("return",new Promise(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(n){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.assureObtained();case 2:a=t._id,overwolf.windows.restore(a,(function(e){e.success||console.error("[restore] - an error occurred, windowId=".concat(a,", reason=").concat(e.error)),n()}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"minimize",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.abrupt("return",new Promise(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(n){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.assureObtained();case 2:return a=t._id,overwolf.windows.minimize(a,(function(){})),e.abrupt("return",n());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"maximize",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.abrupt("return",new Promise(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(n){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.assureObtained();case 2:return a=t._id,overwolf.windows.maximize(a,(function(){})),e.abrupt("return",n());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"hide",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.abrupt("return",new Promise(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(n){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.assureObtained();case 2:return a=t._id,overwolf.windows.hide(a,(function(){})),e.abrupt("return",n());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"close",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t,n=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.abrupt("return",new Promise(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(a){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.assureObtained();case 2:return t._id,e.next=5,n.getWindowState();case 5:if(i=e.sent,!i.success||"closed"===i.window_state){e.next=9;break}return e.next=9,n.internalClose();case 9:return e.abrupt("return",a());case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"dragMove",value:function(e){var t=this;e.onmousedown=function(e){e.preventDefault(),overwolf.windows.dragMove(t._name)}}},{key:"getWindowState",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.abrupt("return",new Promise(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(n){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.assureObtained();case 2:a=t._id,overwolf.windows.getWindowState(a,n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"obtain",value:function(){var e=this;return new Promise((function(t,n){var a=function(a){a&&"success"===a.status&&a.window&&a.window.id?(e._id=a.window.id,e._name||(e._name=a.window.name),t(a.window)):(e._id=null,n())};e._name?overwolf.windows.obtainDeclaredWindow(e._name,a):overwolf.windows.getCurrentWindow(a)}))}},{key:"assureObtained",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.abrupt("return",new Promise(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.obtain();case 2:return e.abrupt("return",n());case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"internalClose",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.abrupt("return",new Promise(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(n,a){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.assureObtained();case 2:i=t._id,overwolf.windows.close(i,(function(e){e&&e.success?n():a(e)}));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}],[{key:"getCurrentInfo",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:overwolf.windows.getCurrentWindow((function(e){t(e.window)}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}]),e}(),g=n("60a3"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-container"},[e.summonerDataAvailable?n("div",[n("div",{staticClass:"mini-summoner-label"},[n("img",{staticClass:"mini_league_profile",attrs:{alt:"Profile Icon",srcset:e.profile_icon_id_url}}),n("h1",[e._v(e._s(e.summonerName))])]),n("div",{staticClass:"last-game-stats"},[n("div",{staticClass:"last-game-col1"},[n("q",[e._v(e._s(e.lastMatch.gameMode))]),e._v(" "+e._s(e.lastMatch.gameCreation)+" "),n("br"),e._v(" "+e._s(e.lastMatch.win)+" "),n("br"),e._v(" "+e._s(e.lastMatch.gameDuration)+" "),n("br")]),n("div",{staticClass:"last-game-col1"},[n("div",{staticClass:"row"},[n("img",{staticClass:"minier_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.champArtURL}}),n("div",{staticClass:"col"},[n("img",{staticClass:"miniest_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.spell1Icon}}),n("img",{staticClass:"miniest_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.spell2Icon}})])]),e._v(" "+e._s(e.lastMatch.championName)+" "),n("br")]),n("div",{staticClass:"last-game-col1"},[e._v(" "+e._s(e.lastMatch.kills)+" / "+e._s(e.lastMatch.deaths)+" / "+e._s(e.lastMatch.assists)+" "),n("br"),e._v(" "+e._s(e.lastMatch.kda)+" : 1 KDA "),n("br"),e._v(" "+e._s(e.lastMatch.largestMultiKill)+" ")]),n("div",{staticClass:"wrap-col"},[e.item0exists?n("div",[n("img",{staticClass:"miniest_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.item0}})]):e._e(),e.item1exists?n("div",[n("img",{staticClass:"miniest_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.item1}})]):e._e(),e.item2exists?n("div",[n("img",{staticClass:"miniest_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.item2}})]):e._e(),e.item3exists?n("div",[n("img",{staticClass:"miniest_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.item3}})]):e._e(),e.item4exists?n("div",[n("img",{staticClass:"miniest_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.item4}})]):e._e(),e.item5exists?n("div",[n("img",{staticClass:"miniest_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.item5}})]):e._e(),e.item6exists?n("div",[n("img",{staticClass:"miniest_league_profile",attrs:{alt:"Profile Icon",srcset:e.lastMatch.item6}})]):e._e()]),n("div",{staticClass:"last-game-col1"},[e._v(" Lvl: "+e._s(e.lastMatch.champLevel)+" "),n("br"),e._v(" "+e._s(e.lastMatch.totalMinionsKilled)+" cs"),n("br")])]),n("div",{staticClass:"stats-overall"},[n("u",{staticClass:"little-bigger"},[e._v("Last 15 games Statistics")]),n("br"),n("div",{staticClass:"grid-container"},[n("div",{staticClass:"grid-item"},[e._v(e._s(e.stats.wins)+" Wins")]),n("div",{staticClass:"grid-item"},[e._v(e._s(e.stats.losses)+" Losses")]),n("div",{staticClass:"grid-item"},[e._v(e._s(e.stats.win_Rate)+"Win Rate")]),n("div",{staticClass:"grid-item"},[e._v(e._s(e.stats.avg_Kills)+" AVG Kills")]),n("div",{staticClass:"grid-item"},[e._v(e._s(e.stats.avg_Death)+" Avg Death")]),n("div",{staticClass:"grid-item"},[e._v(e._s(e.stats.avg_assists)+" Avg assists")]),n("div",{staticClass:"grid-item"},[e._v(e._s(e.stats.diff_Champions)+" Diff Champions")]),n("div",{staticClass:"grid-item"},[e._v(e._s(e.stats.diff_Roles)+" Diff Roles")]),n("div",{staticClass:"grid-item"},[e._v(e._s(e.stats.diff_Queues)+" Diff Queues")])])]),n("div",{staticClass:"stats-overall"},[n("u",{staticClass:"little-bigger"},[e._v("Recent Champions")]),n("br"),n("div",{staticClass:"wrap"},e._l(e.recentChampions,(function(t){return n("div",{key:t.id},[n("div",{staticClass:"col-recent-champ"},[n("img",{staticClass:"recent-champs",attrs:{srcset:e.getChampURL(t),alt:"champion",height:"50",width:"50"}}),e._v(" "+e._s(t.name)+" ")])])})),0)])]):n("div",[n("img",{staticClass:"logo",attrs:{alt:"League Companion",height:"300",width:"300",src:"https://img.icons8.com/bubbles/500/000000/question-mark.png"}}),n("p",[e._v("Launch your League Client to fetch your stats")])])])},f=[],p=(n("4160"),n("caad"),n("0d03"),n("b680"),n("2532"),n("3ca3"),n("159b"),n("ddb0"),n("4795"),n("bc3a")),v=n.n(p),w=n("8b94"),_=n("5f3b"),b=function e(t,n,a){Object(r["a"])(this,e),this.id=t,this.name=n,this.url=a},y=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(r["a"])(this,n),e=t.apply(this,arguments),e.infoAvailable=!1,e.summoner_info=null,e.summonerName="Doublelift",e.profile_icon_id_url="http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/12.png",e.summonerLevel="",e.encypted_summoner_id="",e.encypted_account_id="",e.recentChampions=new Array,e.lastMatch={gameMode:"ARAM",gameCreation:new Date(1611790864204).toLocaleDateString(),gameDuration:new Date(820543543).toTimeString(),win:"Win",championId:0,championName:"",champArtURL:"",spell1Id:"",spell1Icon:"",spell2Id:"",spell2Icon:"",item0:"",item1:"",item2:"",item3:"",item4:"",item5:"",item6:"",kills:0,deaths:0,assists:0,kda:"-1.1",largestMultiKill:"",champLevel:15,totalMinionsKilled:31},e.stats={wins:0,avg_Kills:"",diff_Champions:0,losses:0,avg_assists:"",diff_Roles:0,win_Rate:"",avg_Death:"",diff_Queues:0},e}return Object(o["a"])(n,[{key:"getChampURL",value:function(e){return console.log("champ",e),e.url}},{key:"mounted",value:function(){var e=this;function t(){overwolf.games.events.onError.addListener((function(e){console.log("Error: "+JSON.stringify(e))})),overwolf.games.launchers.events.onInfoUpdates.addListener((function(e){console.log("Info UPDATE: "+JSON.stringify(e))})),overwolf.games.launchers.events.onNewEvents.addListener((function(e){console.log("EVENT FIRED: "+JSON.stringify(e))}))}function n(){overwolf.games.launchers.events.setRequiredFeatures(10902,["game_flow","summoner_info","champ_select","lcu_info","lobby_info","end_game","game_info"],(function(t){if("error"==t.status)return console.log("Could not set required features: "+t.reason),console.log("Trying in 2 seconds"),void window.setTimeout(n,2e3);console.log(JSON.stringify(t)),overwolf.games.launchers.events.getInfo(10902,(function(t){"success"===t.status&&(console.log("Summoner Info",t.res.summoner_info.display_name),e.summoner_info=t.res.summoner_info,e.summonerLevel=e.summoner_info.summoner_level,e.infoAvailable=!0)}))}))}function a(e){return!!e&&(!!e.launchers[0]&&(10902==Math.floor(e.launchers[0].id/10)&&(console.log("League of Legends launcher running"),!0)))}overwolf.games.launchers.onLaunched.addListener((function(){t(),setTimeout(n,1e3),console.log("onLaunched fired")})),overwolf.games.launchers.getRunningLaunchersInfo((function(e){a(e)&&(t(),setTimeout(n,1e3)),console.log("getRunningLaunchersInfo: "+JSON.stringify(e))})),overwolf.games.launchers.onTerminated.addListener((function(e){setTimeout(window.close,1e3)}))}},{key:"created",value:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var t,n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return overwolf.windows.getCurrentWindow((function(e){console.log(e),t=e.window.id,console.log("id: ",t);var n={window_id:t,width:500,height:600,auto_dpi_resize:!0};overwolf.windows.changeSize(n,console.log)})),n=this,a="https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+n.summonerName+"?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9",console.log("SummonerName being queried: ",n.summonerName),e.next=6,v.a.get(a).then(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("Summoner API CALL RESPONCE: ",t),n.encypted_summoner_id=t.data.id,n.encypted_account_id=t.data.accountId,console.log("Matchlist queried using encrypted summoner Id: ",n.encypted_account_id),a="https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/"+n.encypted_account_id+"?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9",e.next=7,v.a.get(a).then(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(t){var a,i,s,r,o,c,l,u,d,g;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=15,t.data.totalGames<15&&(a=t.data.totalGames),i=0,s=0,r=0,o=new Array,c=new Array,l=new Array,u=regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return 0===o.length?(o.push(t.data.matches[a].role),console.log("adding first role: ",t.data.matches[a].role)):o.includes(t.data.matches[a].role)||(o.push(t.data.matches[a].role),console.log("adding new  role",t.data.matches[a].role)),0===c.length?(console.log("adding first queue: ",t.data.matches[a].queue),c.push(t.data.matches[a].queue)):c.includes(t.data.matches[a].queue)||(c.push(t.data.matches[a].queue),console.log("adding new  queue",t.data.matches[a].queue)),0===l.length?l.push(t.data.matches[a].champion):l.includes(t.data.matches[a].champion)||(l.push(t.data.matches[a].champion),console.log("adding new  champion",t.data.matches[a].champion)),console.log("Axios for match: ",a),e.next=6,v.a.get("https://na1.api.riotgames.com/lol/match/v4/matches/"+t.data.matches[a].gameId+"?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9").then(function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(t){var o,c,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(t.data),0===a&&(n.lastMatch.gameMode=t.data.gameMode,o=new Date(t.data.gameCreation),n.lastMatch.gameCreation=o.getMonth()+" / "+o.getDay()+" / "+o.getFullYear(),n.lastMatch.gameDuration=new Date(1e3*t.data.gameDuration).getMinutes().toLocaleString()+" min"),c=0;case 3:if(!(c<10)){e.next=19;break}if(n.summonerName!==t.data.participantIdentities[c].player.summonerName){e.next=16;break}if(!0===t.data.participants[c].stats.win?(n.stats.wins=n.stats.wins+1,console.log("Self.stats.wins++",n.stats.wins),0===a&&(n.lastMatch.win="Victory")):(n.stats.losses=n.stats.losses+1,console.log("Self.stats.losses++",n.stats.losses),0===a&&(n.lastMatch.win="Defeat")),0===a&&(n.lastMatch.championId=t.data.participants[c].championId),0===a&&(n.lastMatch.item0="http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/"+t.data.participants[c].stats.item0+".png",n.lastMatch.item1="http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/"+t.data.participants[c].stats.item1+".png",n.lastMatch.item2="http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/"+t.data.participants[c].stats.item2+".png",n.lastMatch.item3="http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/"+t.data.participants[c].stats.item3+".png",n.lastMatch.item4="http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/"+t.data.participants[c].stats.item4+".png",n.lastMatch.item5="http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/"+t.data.participants[c].stats.item5+".png",n.lastMatch.item6="http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/"+t.data.participants[c].stats.item6+".png"),i+=t.data.participants[c].stats.kills,0===a&&(n.lastMatch.kills=t.data.participants[c].stats.kills),s+=t.data.participants[c].stats.deaths,0===a&&(n.lastMatch.deaths=t.data.participants[c].stats.deaths),r+=t.data.participants[c].stats.assists,0===a&&(n.lastMatch.assists=t.data.participants[c].stats.assists),0===a)for(n.lastMatch.kda=((n.lastMatch.kills+n.lastMatch.assists)/n.lastMatch.deaths).toFixed(2),2===t.data.participants[c].stats.largestMultiKill?n.lastMatch.largestMultiKill="Double Kill":3===t.data.participants[c].stats.largestMultiKill?n.lastMatch.largestMultiKill="Triple Kill":4===t.data.participants[c].stats.largestMultiKill?n.lastMatch.largestMultiKill="QuadraKil":5===t.data.participants[c].stats.largestMultiKill?n.lastMatch.largestMultiKill="Penta Kill":6===t.data.participants[c].stats.largestMultiKill?n.lastMatch.largestMultiKill="Hexa Kill":n.lastMatch.largestMultiKill="",n.lastMatch.champLevel=t.data.participants[c].stats.champLevel,n.lastMatch.totalMinionsKilled=t.data.participants[c].stats.totalMinionsKilled,n.lastMatch.spell1Id=t.data.participants[c].spell1Id,n.lastMatch.spell2Id=t.data.participants[c].spell2Id,l=0;l<w.length;l++)w[l].key===String(n.lastMatch.spell1Id)?n.lastMatch.spell1Icon=w[l].icon:w[l].key===String(n.lastMatch.spell2Id)&&(n.lastMatch.spell2Icon=w[l].icon);return e.abrupt("break",19);case 16:c++,e.next=3;break;case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())["catch"]((function(e){return console.log("Error: ",e)}));case 6:case"end":return e.stop()}}),e)})),d=0;case 10:if(!(d<a)){e.next=15;break}return e.delegateYield(u(d),"t0",12);case 12:d++,e.next=10;break;case 15:console.log("Async thread complete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"),g=0;case 17:if(!(g<_.length)){e.next=25;break}if(_[g].key!==String(l[0])){e.next=22;break}return n.lastMatch.championId=_[g].key,n.lastMatch.championName=_[g].id,n.lastMatch.champArtURL=_[g].icon,e.abrupt("break",25);case 22:g++,e.next=17;break;case 25:l.forEach((function(e){console.log(e);for(var t=0;t<_.length;t++)if(_[t].key===String(e)){n.recentChampions.push(new b(_[t].key,_[t].id,_[t].icon));break}})),n.stats.avg_Kills=(i/a).toFixed(2),n.stats.avg_Death=(s/a).toFixed(2),n.stats.avg_assists=(r/a).toFixed(2),n.stats.diff_Roles=o.length,n.stats.diff_Queues=c.length,n.stats.diff_Champions=l.length,n.stats.win_Rate=(n.stats.wins/a*100).toFixed(0)+"%";case 33:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())["catch"]((function(e){return console.log("Error: ",e)}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())["catch"]((function(e){return console.log("Error: ",e)}));case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"summonerDataAvailable",get:function(){return this.infoAvailable}},{key:"item0exists",get:function(){return"http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"!=this.lastMatch.item0}},{key:"item1exists",get:function(){return"http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"!=this.lastMatch.item1}},{key:"item2exists",get:function(){return"http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"!=this.lastMatch.item2}},{key:"item3exists",get:function(){return"http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"!=this.lastMatch.item3}},{key:"item4exists",get:function(){return"http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"!=this.lastMatch.item4}},{key:"item5exists",get:function(){return"http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"!=this.lastMatch.item5}},{key:"item6exists",get:function(){return"http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"!=this.lastMatch.item6}}]),n}(g["b"]);y=Object(u["a"])([g["a"]],y);var M=y,k=M,x=n("2877"),C=Object(x["a"])(k,h,f,!1,null,null,null),O=C.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-container"},[n("h1",{staticClass:"project-name"},[e._v("League Companion")]),n("hr"),e.summonerDataAvailable?n("div",[n("div",{staticClass:"summoner-label"},[n("img",{staticClass:"league_profile",attrs:{alt:"Profile Icon",srcset:e.profile_icon_id_url}}),n("h1",[e._v(e._s(e.summonerName))]),n("p",[e._v("Level: "+e._s(e.summonerLevel))])]),n("img",{staticClass:"bottom-art",attrs:{srcset:e.splash_art_url,alt:"Random Art"}})]):n("div",[n("img",{staticClass:"logo",attrs:{alt:"League Companion",height:"300",width:"300",src:"https://img.icons8.com/bubbles/500/000000/league-of-legends.png"}}),n("p",[e._v("Launch your league client to create overlay")])])])},L=[],j=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(r["a"])(this,n),e=t.apply(this,arguments),e.infoAvailable=!1,e.summoner_info=null,e.summonerName="",e.profile_icon_id_url="",e.splash_art_url="",e.summonerLevel="",e.championArray=["Teemo","Thresh","Lux","Lucian","Soraka","Sona","Aatrox","Pantheon","Samira","Malphite","Fiddlesticks"],e}return Object(o["a"])(n,[{key:"mounted",value:function(){var e=this;function t(){overwolf.games.events.onError.addListener((function(e){console.log("Error: "+JSON.stringify(e))})),overwolf.games.launchers.events.onInfoUpdates.addListener((function(e){console.log("Info UPDATE: "+JSON.stringify(e))})),overwolf.games.launchers.events.onNewEvents.addListener((function(e){console.log("EVENT FIRED: "+JSON.stringify(e))}))}function n(){overwolf.games.launchers.events.setRequiredFeatures(10902,["game_flow","summoner_info","champ_select","lcu_info","lobby_info","end_game","game_info"],(function(t){if("error"==t.status)return console.log("Could not set required features: "+t.reason),console.log("Trying in 2 seconds"),void window.setTimeout(n,2e3);overwolf.games.launchers.events.getInfo(10902,(function(t){"success"===t.status&&(e.summoner_info=t.res.summoner_info,e.summonerName=e.summoner_info.display_name,e.profile_icon_id_url="http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/"+e.summoner_info.profile_icon_id+".png",e.summonerLevel=e.summoner_info.summoner_level,e.splash_art_url="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+e.championArray[Math.floor(Math.random()*e.championArray.length)]+"_0.jpg",e.infoAvailable=!0)}))}))}function a(e){return!!e&&(!!e.launchers[0]&&(10902==Math.floor(e.launchers[0].id/10)&&(console.log("League of Legends launcher running"),!0)))}overwolf.games.launchers.onLaunched.addListener((function(){t(),setTimeout(n,1e3),console.log("onLaunched fired")})),overwolf.games.launchers.getRunningLaunchersInfo((function(e){a(e)&&(t(),setTimeout(n,1e3)),console.log("getRunningLaunchersInfo: "+JSON.stringify(e))})),overwolf.games.launchers.onTerminated.addListener((function(e){setTimeout(window.close,1e3)}))}},{key:"created",value:function(){var e;overwolf.windows.getCurrentWindow((function(t){console.log(t),e=t.window.id,console.log("id: ",e);var n={window_id:e,width:500,height:600,auto_dpi_resize:!0};overwolf.windows.changeSize(n,console.log)}))}},{key:"summonerDataAvailable",get:function(){return this.infoAvailable}}]),n}(g["b"]);j=Object(u["a"])([g["a"]],j);var I=j,E=I,S=Object(x["a"])(E,R,L,!1,null,null,null),A=S.exports,P=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},N=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-container"},[n("h1",[e._v("Highlights")]),n("video",{attrs:{height:"500px",width:"600px",controls:""}},[n("source",{attrs:{type:"video/mp4",src:"C:\\Users\\Molin\\Videos\\Overwolf\\LoL Companion App\\League of Legends\\League of Legends_02-09-2021_23-19-43-959\\League of Legends 02-09-2021 23-21-53-793.mp4"}})])])}],D=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){return Object(r["a"])(this,n),t.apply(this,arguments)}return Object(o["a"])(n,[{key:"mounted",value:function(){console.log("mounted Tour")}},{key:"created",value:function(){var e;overwolf.windows.getCurrentWindow((function(t){console.log(t),e=t.window.id,console.log("id: ",e);var n={window_id:e,width:1700,height:800,auto_dpi_resize:!0};overwolf.windows.changeSize(n,console.log)}))}}]),n}(g["b"]);D=Object(u["a"])([g["a"]],D);var T=D,K=T,z=Object(x["a"])(K,P,N,!1,null,null,null),W=z.exports,B=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(r["a"])(this,n),e=t.apply(this,arguments),e.tabsName="Home",e}return Object(o["a"])(n,[{key:"changeTab",value:function(e){console.log("Setting Value: ",e),this.tabsName=e}},{key:"created",value:function(){this._backgroundWindow=new d("background"),this.currWindow=new d("desktop"),this._modal=document.getElementById("exitMinimizeModal"),this._closeButton=document.getElementById("closeButton"),this._minimizeHeaderButton=document.getElementById("minimizeButton"),this._exitButton=document.getElementById("exit"),this._minimizeButton=document.getElementById("minimize"),this._header=document.getElementsByClassName("app-header")[0],this._version=document.getElementById("version")}},{key:"mounted",value:function(){var e=this;this._closeButton.addEventListener("click",this._showExitMinimizeModal),this._minimizeHeaderButton.addEventListener("click",(function(){e.currWindow.minimize()})),this._exitButton.addEventListener("click",(function(){e._backgroundWindow.close()})),this._minimizeButton.addEventListener("click",(function(){e._backgroundWindow.minimize(),e._hideExitMinimizeModal()})),window.onclick=function(t){t.target==e._modal&&e._hideExitMinimizeModal()},this.currWindow.dragMove(this._header),overwolf.media.videos.getVideos((function(e){console.log("result from Get Vidoes",e)}))}},{key:"_showExitMinimizeModal",value:function(){this._modal.style.display="block"}},{key:"_hideExitMinimizeModal",value:function(){this._modal.style.display="none"}},{key:"tabName",get:function(){return this.tabsName}}]),n}(g["b"]);B=Object(u["a"])([Object(g["a"])({components:{Stats:O,Home:A,Highlights:W}})],B);var q=B,F=q,H=Object(x["a"])(F,i,s,!1,null,null,null),J=H.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(J)}}).$mount("#app")}});
//# sourceMappingURL=app.3a8dd1c6.js.map