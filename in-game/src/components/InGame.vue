<template>
  <div>
    <div class="in-game-wrapper" v-if="true">
      <div class="summoner-grid">
        <div v-for="player in playerList" :key="player.summonerName">
          <div :class="player.team  == '100' ? 'summoner-profile' : 'red-summoner-profile' ">
            <div class="horizontal">
              <img
                class="champ-circle"
                :srcset="getSplashUrl(player)"
                alt="champion splash art"
              />
              <div class="vertical">
                <div>{{ player.summonerName }}</div>
                <div>Team {{ player.team }}</div>
                <div>{{ player.championName }}</div>
                <div>lvl: {{ player.level }}</div>
              </div>
            </div>

            <div class="horizontal">
              <img
                class="champion-splash"
                :srcset="player.keystoneRune.img"
                alt="keystone"
                height="40"
                width="40"
                v-tooltip="
                  player.keystoneRune.name +
                  ' <br/> ' +
                  player.keystoneRune.desc
                "
              />
              <div v-for="runes in player.primaryRuneList" :key="runes">
                <img
                  class="champion-splash"
                  :srcset="runes.img"
                  alt="champion splash art"
                  height="40"
                  width="40"
                  v-tooltip="runes.name + ' <br/> ' + runes.desc"
                />
              </div>
            </div>
            <div class="horizontal">
              <div v-for="runes in player.seconadaryRuneList" :key="runes">
                <img
                  class="champion-splash"
                  :srcset="runes.img"
                  alt="champion splash art"
                  height="40"
                  width="40"
                                    v-tooltip="runes.name + ' <br/> ' + runes.desc"

                />
              </div>
              <div v-for="shards in player.shardList" :key="shards">
                <img
                  class="champion-splash"
                  :srcset="shards.img"
                  alt="champion splash art"
                  height="40"
                  width="40"
                                    v-tooltip="shards.name + ' <br/> ' + shards.desc"

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
          <img
            alt="Champion Icon"
            :srcset="championInfo.url"
            class="champ-circle"
          />
          <h1>{{ championInfo.champion }}</h1>
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
        <div  class="build-item-wrapper">
          <div class="build-item" v-for="item in buildOrder" :key="item.name">
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
// @ts-ignore
import champions from "lol-champions";
import firebase from "firebase/app";
import "firebase/database";
import rateLimit from 'axios-rate-limit';

//we are rate limited at 20 requests per second, and 100 requests every 2 minutes
const http = rateLimit(axios.create(), { maxRequests: 100, perMilliseconds: 120000, maxRPS: 20 })



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

class Rune {
  name: string;
  desc: string;
  img: string;
}

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

  public primaryRuneList: Array<Rune> = [];
  public seconadaryRuneList: Array<Rune> = [];
  public shardList: Array<Rune> = [];
  public activePlayerRunes: Array<Rune> = [];

  public keystoneRune: Rune;
  champIdForFirebase: any;
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
    let tempPlayer = new Player();
    function setFeatures() {
      //@ts-ignore
      overwolf.games.events.setRequiredFeatures(
        g_interestedInFeatures,
        async function (info) {
          if (info.status == "error") {
            //console.log("Could not set required features: " + info.reason);
            //console.log("Trying in 2 seconds");
            await sleep(3000);
            window.setTimeout(setFeatures, 2000);
            return;
          }
          console.log("Set required features:");
          console.log(JSON.stringify(info));
          self.getRunes();
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
  async getRunes() {
    let self = this;
    //build url to call for summoner data
    let summonerURL =
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      window.localStorage.getItem("localUsername") +
      "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9"; // this gets id,accountid,and puuid
    //use id to call spectator api
    await http.get(summonerURL).then(async (sumInfo) => {
      await http
        .get(
          "https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" +
            sumInfo.data.id +
            "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9"
        )
        .then(async (accInfo) => {
          console.log("accInfo", accInfo);
          //for loop to go through the participants
          for (let num = 0; num < accInfo.data.participants.length; num++) {
            //each participant is a player in our player array
            let participant = new Player();

            //as we fill this participants info we will also be filling data displayed in the vue
            participant.team = accInfo.data.participants[num].teamId;
            participant.summonerName =
              accInfo.data.participants[num].summonerName;

            //loop through the participants runes
            for (
              let i = 0;
              i < accInfo.data.participants[num].perks.perkIds.length;
              i++
            ) {
              //call firebase for rune info
              var checkdatabase = firebase
                .database()
                .ref(accInfo.data.participants[num].perks.perkIds[i]);
              checkdatabase.on("value", (snapshot) => {
                console.log("returned from firebase for Rune", snapshot.val());
                if (snapshot.val() != null) {
                  let rune = new Rune();

                  rune.name = snapshot.val().name;
                  rune.desc = snapshot.val().desc;
                  rune.img = snapshot.val().img;
                  
                  console.log('rune.name :>> ', rune.name);
                  console.log('rune.desc :>> ', rune.desc);
                  console.log('rune.img :>> ', rune.img);
                  //check if keystone rune
                  if (i == 0) {
                    //add to keystone since it's not an array
                    participant.keystoneRune = rune;
                  } else if (i < 4) {
                    participant.primaryRuneList.push(rune);
                  } else if (i < 6) {
                    participant.seconadaryRuneList.push(rune);
                  } else {
                    participant.shardList.push(rune);
                  }
                }
              });
            }

            //make api call for this participants stats
            //call riot api on summoner name
            let summonerInfoURL =
              "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
              accInfo.data.participants[num].summonerName +
              "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9";
            await http.get(summonerInfoURL).then(async (summoner) => {
              //fill in participant.level
              participant.level = summoner.data.summonerLevel;

              console.log("summoner lvl :>> ", summoner.data);
              //call matchlist api for list of matches
              //call each match and build stats for player
              await http
                .get(
                  "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" +
                    summoner.data.accountId +
                    "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9"
                )
                .then(async (matchList) => {
                  console.log("matchList :>> ", matchList);
                  var matchNums = 1;
                  if (matchList.data.totalGames < matchNums) {
                    matchNums = matchList.data.totalGames;
                  }
                  var killCount = 0;
                  var deathCount = 0;
                  var assistCount = 0;
                  var winCount = 0;
                  var totalKills = 0;
                  var teamID = 0;
                  let participantIndex = -1;
                  for (let index = 0; index < matchNums; index++) {
                    await http
                      .get(
                        "https://na1.api.riotgames.com/lol/match/v4/matches/" +
                          matchList.data.matches[index].gameId +
                          "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9"
                      )
                      .then((mostRecentMatch) => {
                        console.log(
                          "mostRecentMatch.data >> ",
                          mostRecentMatch.data
                        );
                        // first for loop to get teamId
                        //and participantId
                        for (let i = 0; i < 10; i++) {
                          if (
                            participant.summonerName ===
                            mostRecentMatch.data.participantIdentities[i].player
                              .summonerName
                          ) {
                            teamID =
                              mostRecentMatch.data.participants[i].teamId;
                            participantIndex = i;
                            break;
                          }
                        }

                        if (
                          mostRecentMatch.data.participants[participantIndex]
                            .stats.win === true
                        ) {
                          winCount++;
                        }

                        killCount +=
                          mostRecentMatch.data.participants[participantIndex]
                            .stats.kills;
                        deathCount +=
                          mostRecentMatch.data.participants[participantIndex]
                            .stats.deaths;
                        assistCount +=
                          mostRecentMatch.data.participants[participantIndex]
                            .stats.assists;

                        // second loop for rest of data
                        for (let i = 0; i < 10; i++) {
                          if (
                            mostRecentMatch.data.participants[i].teamId ==
                            teamID
                          ) {
                            totalKills +=
                              mostRecentMatch.data.participants[i].stats.kills;
                          }
                        }
                      });
                  }
                  console.log("killCount :>> ", killCount);
                  console.log("assistCount :>> ", assistCount);
                  console.log("deathCount :>> ", deathCount);
                  console.log("winCount :>> ", winCount);
                  // Kill Participation

                  participant.killParticipation =
                    (killCount + assistCount / totalKills).toFixed(0) + "%";
                  // Win Rate
                  console.log(
                    "participant.killParticipation :>> ",
                    participant.killParticipation
                  );

                  participant.winRate = (winCount / matchNums) * 100 + "%";
                  console.log("participant.winRate :>> ", participant.winRate);

                  // KDA
                  participant.kda =
                    String(
                      ((killCount + assistCount) / deathCount).toFixed(0)
                    ) + " / 1";
                  console.log("participant.kda :>> ", participant.kda);
                });
            });

            //get champion image using lol-champions
            for (let i = 0; i < champions.length; i++) {
              if (
                champions[i].key ===
                String(accInfo.data.participants[num].championId)
              ) {
                participant.champion = champions.name;
                participant.champImgURL = champions[i].icon;
                participant.champIdForFirebase = champions[i].id;
                break;
              }
            }

            //if participant is current user
            //then add the champ
            if (
              participant.summonerName ===
              window.localStorage.getItem("localUsername")
            ) {
              // query database and print result
              console.log(
                "querying firebase with champion:  ",
                participant.champIdForFirebase
              );
              var checkdatabase = firebase
                .database()
                .ref(
                  participant.champIdForFirebase.charAt(0).toUpperCase() +
                    participant.champIdForFirebase.slice(1)
                );
              checkdatabase.on("value", (snapshot) => {
                console.log(
                  "returned from firebase when calling for champion info",
                  snapshot.val()
                );
                //pull some champ info
                if (snapshot.val() != null) {
                  self.championInfo.blurb = snapshot.val().blurb;
                  self.championInfo.url = snapshot.val().url;
                  self.championInfo.champion = snapshot.val().name;
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

            //add participant to player list
            self.playerList.push(participant);
          }
        });
    });
  }

 getStyleClass(player :Player){
   if(player.team == "100"){
     return true;
   } else {
     return false;
   }
 }

}
</script>

