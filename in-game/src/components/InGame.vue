<template>
  <div>
    <div>
      SummonerName:
      <img alt="Champion Icon" :srcset="summonerinfo.url" /><br />
      Champion: {{ summonerinfo.champion }}

      {{ summonerinfo.accountID }}
      Lvl: {{ summonerinfo.level }} tier: {{ summonerinfo.tier }} queue:{{
        summonerinfo.queue
      }}
      {{ summonerinfo.blurb }}
      <div v-for="skill in skillOrder" :key="skill">skill: {{ skill }}</div>
      <div v-for="tag in tagsList" :key="tag">Tag: {{ tag }}</div>

      <div v-for="item in buildOrder" :key="item.name">
        <div class="col-recent-champ">
          <img
            class="recent-champs"
            :srcset="getItemUrl(item)"
            alt="champion"
            height="50"
            width="50"
          />
          {{ item.name }}
        </div>
      </div>
    </div>

    <div v-if="registeredYet">Registered Team Info:</div>
    <div v-else>Loading Team Data...</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import axios from "axios";
import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBrMp64ttfGC2WiD28JiJXtfUXevFeShCk",
  authDomain: "test-59db3.firebaseapp.com",
  databaseURL: "https://test-59db3-default-rtdb.firebaseio.com",
  projectId: "test-59db3",
  storageBucket: "test-59db3.appspot.com",
  messagingSenderId: "890513354906",
  appId: "1:890513354906:web:ff2483ac34b4f91fb4af23",
  measurementId: "G-FQST7TCZCR",
};

firebase.initializeApp(firebaseConfig);

//class to hold build items
class Item {
  name: string;
  img: string;

  constructor(name, img) {
    this.name = name;
    this.img = img;
  }
}

@Component
export default class Home extends Vue {
  registeredTeam = false;
  teams = "";
  summonerinfo = {
    accountID: "",
    champion: "",
    url: "",
    level: "",
    tier: "",
    queue: "",
    blurb: "",
  };

  //arrays to hold firebase data
  skillOrder: string[] = new Array();
  buildOrder: Item[] = new Array();
  tagsList: string[] = new Array();
  //matchId: "3784251268" res.game_info.matchid

  get registeredYet() {
    return this.registeredTeam;
  }

  //this is for the v-for for champ images
  getItemUrl(item: Item) {
    console.log("item: ", item);
    return item.img;
  }

  mounted() {
    //@ts-ignore
  }

  created() {
    let self = this;
    var g_interestedInFeatures = [
      "summoner_info",
       "gameMode",
       "teams",
       "matchState",
      //"kill",
      // "death",
      // "respawn",
      // "assist",
      //  "minions",
      //  "level",
      //"abilities",// get info when our user updates
      // "announcer", //get info from anouncer, kills, victory, everything announcer says
      //"counters",//internal timer
      // "match_info",//tells you if tft game or league
      //"damage",
      //"heal",
      //"live_client_data",
    ];

    function registerEvents() {
      // general events errors
      //@ts-ignore
      overwolf.games.events.onError.addListener(function (info) {
        console.log("Error: ", info);
      });

      // "static" data changed (total kills, username, steam-id)
      // This will also be triggered the first time we register
      // for events and will contain all the current information
      //@ts-ignore
      overwolf.games.events.onInfoUpdates2.addListener(function (info) {
        console.log("Info UPDATE: " , info);
        
      });

      // an event triggerd
      //@ts-ignore

      overwolf.games.events.onNewEvents.addListener(function (info) {
        console.log("EVENT FIRED: ",info);
      });
    }

    function gameLaunched(gameInfoResult) {
      if (!gameInfoResult) {
        return false;
      }

      if (!gameInfoResult.gameInfo) {
        return false;
      }

      if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
        return false;
      }

      if (!gameInfoResult.gameInfo.isRunning) {
        return false;
      }

      // NOTE: we divide by 10 to get the game class id without it's sequence number
      if (Math.floor(gameInfoResult.gameInfo.id / 10) != 5426) {
        return false;
      }

      console.log("LoL Launched");
      return true;
    }

    function gameRunning(gameInfo) {
      if (!gameInfo) {
        return false;
      }

      if (!gameInfo.isRunning) {
        return false;
      }

      // NOTE: we divide by 10 to get the game class id without it's sequence number
      if (Math.floor(gameInfo.id / 10) != 5426) {
        return false;
      }

      console.log("LoL running");
      return true;
    }

    function setFeatures() {
      //@ts-ignore

      overwolf.games.events.setRequiredFeatures(
        g_interestedInFeatures,
        function (info) {
          if (info.status == "error") {
            //console.log("Could not set required features: " + info.reason);
            //console.log("Trying in 2 seconds");
            window.setTimeout(setFeatures, 2000);
            return;
          }

          console.log("Set required features:");
          console.log(JSON.stringify(info));
          // //@ts-ignore
          // overwolf.games.events.getInfo( result =>{
          //   console.log("result",result);
          //   self.events.push(result);
          // })

          //@ts-ignore
          overwolf.games.events.getInfo(function (info) {
            console.log("Get Info: ", info);

            if (info.status === "success") {
              self.summonerinfo.accountID = info.res.summoner_info.id;
              self.summonerinfo.champion = info.res.summoner_info.champion;
              self.summonerinfo.level = info.res.summoner_info.level;
              self.summonerinfo.tier = info.res.summoner_info.tier;
              self.summonerinfo.queue = info.res.summoner_info.queue;


              //query database and print result
              console.log("connecting to firebase");
              var checkdatabase = firebase
                .database()
                .ref(info.res.summoner_info.champion);
              checkdatabase.on("value", (snapshot) => {
                console.log("returned from firebase", snapshot.val());
                //pull some champ info
                if (snapshot.val() != null) {
                  self.summonerinfo.champion = snapshot.val().name;
                  self.summonerinfo.url = snapshot.val().url;
                    self.summonerinfo.blurb = snapshot.val().blurb;
                  //get skill order
                  //notice the difference in notation to access skill vs build list
                  //it's cause skill list had a space in it when it was being entered
                  for (
                    let i = 0;
                    i < snapshot.val()["skill list"].length;
                    i++
                  ) {
                    self.skillOrder.push(snapshot.val()["skill list"][i]);
                  }

                  //get build order
                  for (let j = 0; j < snapshot.val().build_list.length; j++) {
                    //initialize temp
                    console.log(
                      "Logging build name: ",
                      snapshot.val().build_list[j].name
                    );
                    console.log(
                      "Logging build img: ",
                      snapshot.val().build_list[j].img
                    );
                    let temp = new Item(
                      snapshot.val().build_list[j].name,
                      snapshot.val().build_list[j].img
                    );
                    //add it to array
                    self.buildOrder.push(temp);
                  }

                  //get Tags
                  for (let k = 0; k < snapshot.val().tags.length; k++) {
                    self.tagsList.push(snapshot.val().tags[k]);
                  }
                }
              });

            }
          });
        }
      );
    }

    // Start here
    //@ts-ignore

    overwolf.games.onGameInfoUpdated.addListener(function (res) {
      if (gameLaunched(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
      }

       console.log("onGameInfoUpdated: " + JSON.stringify(res));
    });

    //@ts-ignore

    overwolf.games.getRunningGameInfo(function (res) {
      if (gameRunning(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
      }
       console.log("getRunningGameInfo: " + JSON.stringify(res));
    });
  }
}
</script>