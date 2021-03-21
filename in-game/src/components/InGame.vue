<template>
  <div>
    <div class="in-game-wrapper" v-if="true">
      <div class="summoner-grid">
        <div v-for="player in playerList" :key="player.summonerName">
          <div class="summoner-profile">
            <div class="horizontal">
              <img
                class="champ-circle"
                :srcset="getSplashUrl(player)"
                alt="champion splash art"
              />
              <div class="vertical">
                <div>{{ player.summonerName }}</div>
                <div>lvl: {{ player.level }}</div>
              </div>
            </div>

            <div class="horizontal">
              <img
                class="champion-splash"
                :srcset="player.keystoneRune"
                alt="keystone"
                height="40"
                width="40"
              />
              <div v-for="runes in player.primaryRuneList" :key="runes">
                <img
                  class="champion-splash"
                  :srcset="runes"
                  alt="champion splash art"
                  height="40"
                  width="40"
                />
              </div>
            </div>
            <div class="horizontal">
              <div v-for="runes in player.seconadaryRuneList" :key="runes">
                <img
                  class="champion-splash"
                  :srcset="runes"
                  alt="champion splash art"
                  height="40"
                  width="40"
                />
              </div>
              <div v-for="shards in player.shardList" :key="shards">
                <img
                  class="champion-splash"
                  :srcset="shards"
                  alt="champion splash art"
                  height="40"
                  width="40"
                />
              </div>
            </div>
            <div class="stats-grid">
              <div>Kill Part.</div>
              <div>Winrate</div>
              <div>KDA</div>
              <div>{{ player.killParticipation }}</div>
              <div>{{ player.winRate }}</div>
              <div>{{ player.kda }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Champion column to the right -->
      <div class="champion-column">
        <div class="center-horizontal">
          <!-- champ image and name -->
          <img alt="Champion Icon" :srcset="imgURL" class="champ-circle" />
          <!--<h1>{{ imgURL }}</h1>-->
        </div>

        <!-- Champion tags -->
        <div class="tag-box">
          <div v-for="tag in tagsList" :key="tag" class="tag-box">
            <div class="champ-tag">
              {{ tag }}
            </div>
          </div>
        </div>
        <!-- {{ summonerInfo.accountID }} -->
        <!-- Lvl: {{ summonerInfo.level }} tier: {{ summonerInfo.tier }} queue:{{
          summonerInfo.queue
        }} -->
        <div style="text-align: left; margin: 10px auto">
          {{ championInfo.blurb }}
        </div>

        <h2 style="text-align: center">
          {{ championInfo.champion }} Build Guide
        </h2>
        <h3>Item Build Order</h3>
        <div v-for="item in buildOrder" :key="item.name">
          <div class="col-recent-champ">
            <img
              class="recent-champs"
              :srcset="getItemUrl(item)"
              alt="champion square"
              height="50"
              width="50"
            />
            {{ item.name }}
          </div>
        </div>
        <h3>Skill Order</h3>
        <div class="skill-grid">
          <!-- Layout numbers for grid -->
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <!-- Go through skills dynamically making the grid -->
          <div v-for="skill in skillOrder" :key="skill">
            <div class="grid-item">{{ skill }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading Team Data...</div>
    <br />
    <!--<h1> {{ imgURL}} </h1>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
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

class Player {
  public team: string;
  public level: string;
  public champion: string;
  public summonerName: string;
  public champImgURL: string;
  public killParticipation: string;
  public winRate: string;
  public kda: string;

  public primaryRuneList: Array<string> = [];
  public seconadaryRuneList: Array<string> = [];
  public shardList: Array<string> = [];

  public keystoneRune: string;
}

@Component
export default class Home extends Vue {
  imgURL;
  registeredTeam = false;
  teams = "";
  summonerInfo = {
    accountID: "",
    level: "",
    tier: "",
    queue: "",
  };

  championInfo = {
    champion: "",
    url: "",
    blurb: "",
  };

  //arrays to hold firebase data
  skillOrder: string[] = new Array();
  buildOrder: Item[] = new Array();
  tagsList: string[] = new Array();
  //matchId: "3784251268" res.game_info.matchid
  playerList: Player[] = new Array();

  get registeredYet() {
    return true;
  }

  //this is for the v-for for champ images
  getItemUrl(item: Item) {
    return item.img;
  }

  getSplashUrl(player: Player) {
    return player.champImgURL;
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
      "kill",
      "death",
      "respawn",
      "assist",
      "minions",
      "level",
      "abilities", // get info when our user uses abilities
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
        //TODO in the case the delay doesn't work out
        if (info.feature === "matchState") {
          console.log("Info UPDATE: ", info);
        }
      });

      // an event triggerd
      //@ts-ignore
      overwolf.games.events.onNewEvents.addListener(function (info) {
        console.log("EVENT FIRED: ", info);
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
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function setFeatures() {
      //@ts-ignore
      overwolf.games.events.setRequiredFeatures(
        g_interestedInFeatures,
        async function (info) {
          if (info.status == "error") {
            //console.log("Could not set required features: " + info.reason);
            //console.log("Trying in 2 seconds");
            window.setTimeout(setFeatures, 2000);
            return;
          }
          console.log("Set required features:");
          console.log(JSON.stringify(info));
          console.log("reached outside await axios");
          let tempName;
          await axios
            .get("https://127.0.0.1:2999/liveclientdata/allgamedata")
            .then((result) => {
              //inside then so it should produce the relevant r values
              console.log("Live client Data: ", result.data);

              //fill placeholder champions
              for (let index = 0; index < 10; index++) {
                let tempPlayer = new Player();

                tempPlayer.team = "Order";
                tempPlayer.champion = "Ezreal";
                tempPlayer.summonerName = "Summoner Name";
                tempPlayer.champImgURL =
                  "https://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/Ezreal.png";

                tempPlayer.level = "118";
                tempPlayer.winRate = "41%";
                tempPlayer.kda = "5.00";
                tempPlayer.killParticipation = "51%";

                //one keystone rune
                tempPlayer.keystoneRune =
                  "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png";

                //3 primary runes
                tempPlayer.primaryRuneList.push(
                  "https://static.wikia.nocookie.net/leagueoflegends/images/7/75/Hextech_Flashtraption_rune.png/revision/latest/scale-to-width-down/52?cb=20171004081048"
                );
                tempPlayer.primaryRuneList.push(
                  "https://static.wikia.nocookie.net/leagueoflegends/images/7/75/Hextech_Flashtraption_rune.png/revision/latest/scale-to-width-down/52?cb=20171004081048"
                );
                tempPlayer.primaryRuneList.push(
                  "https://static.wikia.nocookie.net/leagueoflegends/images/7/75/Hextech_Flashtraption_rune.png/revision/latest/scale-to-width-down/52?cb=20171004081048"
                );
                //2 secondary runes
                tempPlayer.seconadaryRuneList.push(
                  "https://static.wikia.nocookie.net/leagueoflegends/images/7/75/Hextech_Flashtraption_rune.png/revision/latest/scale-to-width-down/52?cb=20171004081048"
                );
                tempPlayer.seconadaryRuneList.push(
                  "https://static.wikia.nocookie.net/leagueoflegends/images/7/75/Bone_Plating_rune.png/revision/latest/scale-to-width-down/52?cb=20180209233224"
                );
                //3 shards
                tempPlayer.shardList.push(
                  "https://static.wikia.nocookie.net/leagueoflegends/images/a/a3/Rune_shard_Adaptive_Force.png/revision/latest/scale-to-width-down/30?cb=20181122101607"
                );
                tempPlayer.shardList.push(
                  "https://static.wikia.nocookie.net/leagueoflegends/images/a/a3/Rune_shard_Adaptive_Force.png/revision/latest/scale-to-width-down/30?cb=20181122101607"
                );
                tempPlayer.shardList.push(
                  "https://static.wikia.nocookie.net/leagueoflegends/images/a/a3/Rune_shard_Adaptive_Force.png/revision/latest/scale-to-width-down/30?cb=20181122101607"
                );

                self.playerList.push(tempPlayer);
              }

              //TODO Figure out how to get champion name for curent user
              // use that where i used `info.res.summoner_info.champion` below and the code will fill the rest for you. Just uncomment 
              // self.championInfo.url =
              //   "http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/" +
              //   info.res.summoner_info.champion +
              //   ".png";
              //query database and print result
              // console.log("connecting to firebase");
              // var checkdatabase = firebase
              //   .database()
              //   .ref(info.res.summoner_info.champion);
              // checkdatabase.on("value", (snapshot) => {
              //   console.log("returned from firebase", snapshot.val());
              //   //pull some champ info
              //   if (snapshot.val() != null) {
              //     self.championInfo.blurb = snapshot.val().blurb;
              //     //get skill order
              //     //notice the difference in notation to access skill vs build list
              //     //it's cause skill list had a space in it when it was being entered
              //     for (
              //       let i = 0;
              //       i < snapshot.val()["skill list"].length;
              //       i++
              //     ) {
              //       self.skillOrder.push(snapshot.val()["skill list"][i]);
              //     }

              //     //get build order
              //     for (let j = 0; j < snapshot.val().build_list.length; j++) {
              //       //initialize temp
              //       console.log(
              //         "Logging build name: ",
              //         snapshot.val().build_list[j].name
              //       );
              //       console.log(
              //         "Logging build img: ",
              //         snapshot.val().build_list[j].img
              //       );
              //       let temp = new Item(
              //         snapshot.val().build_list[j].name,
              //         snapshot.val().build_list[j].img
              //       );
              //       //add it to array
              //       self.buildOrder.push(temp);
              //     }

              //     //get Tags
              //     for (let k = 0; k < snapshot.val().tags.length; k++) {
              //       self.tagsList.push(snapshot.val().tags[k]);
              //     }
              //   }
              // });
            })

            //get build info from firebase

            .catch((e) => console.log(e)); //for catching errors
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

      //   console.log("onGameInfoUpdated: " + JSON.stringify(res));
    });

    //@ts-ignore

    overwolf.games.getRunningGameInfo(function (res) {
      if (gameRunning(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
      }
      //   console.log("getRunningGameInfo: " + JSON.stringify(res));
    });
  }
}
</script>