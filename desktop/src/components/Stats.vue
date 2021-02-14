<template>
  <div class="home-container">
    <div v-if="summonerDataAvailable">
      <!-- Info that is displayed from data pullled from launcher
       img src is being dynamically set-->
      <div class="mini-summoner-label">
        <img
          alt="Profile Icon"
          class="mini_league_profile"
          :srcset="profile_icon_id_url"
        />
        <h1>{{ summonerName }}</h1>
      </div>

      <div class="last-game-stats">
        <div class="last-game-col1">
          <q>{{ lastMatch.gameMode }}</q>
          {{ lastMatch.gameCreation }} <br />
          {{ lastMatch.win }} <br />
          {{ lastMatch.gameDuration }} <br />
        </div>
        <div class="last-game-col1">
          <div class="row">
            <img
              alt="Profile Icon"
              class="minier_league_profile"
              :srcset="lastMatch.champArtURL"
            />
            <div class="col">
              <img
                alt="Profile Icon"
                class="miniest_league_profile"
                :srcset="lastMatch.spell1Icon"
              />
              <img
                alt="Profile Icon"
                class="miniest_league_profile"
                :srcset="lastMatch.spell2Icon"
              />
            </div>
          </div>
          {{ lastMatch.championName }} <br />
        </div>

        <!-- KDA Column -->
        <div class="last-game-col1">
          {{ lastMatch.kills }} / {{ lastMatch.deaths }} /
          {{ lastMatch.assists }} <br />
          {{ lastMatch.kda }} : 1 KDA <br />
          {{ lastMatch.largestMultiKill }}
        </div>

        <!-- Item images -->
        <div class="wrap-col">
          <div v-if="item0exists">
            <img
              alt="Profile Icon"
              class="miniest_league_profile"
              :srcset="lastMatch.item0"
            />
          </div>
          <div v-if="item1exists">
            <img
              alt="Profile Icon"
              class="miniest_league_profile"
              :srcset="lastMatch.item1"
            />
          </div>
          <div v-if="item2exists">
            <img
              alt="Profile Icon"
              class="miniest_league_profile"
              :srcset="lastMatch.item2"
            />
          </div>
          <div v-if="item3exists">
            <img
              alt="Profile Icon"
              class="miniest_league_profile"
              :srcset="lastMatch.item3"
            />
          </div>
          <div v-if="item4exists">
            <img
              alt="Profile Icon"
              class="miniest_league_profile"
              :srcset="lastMatch.item4"
            />
          </div>
          <div v-if="item5exists">
            <img
              alt="Profile Icon"
              class="miniest_league_profile"
              :srcset="lastMatch.item5"
            />
          </div>
          <div v-if="item6exists">
            <img
              alt="Profile Icon"
              class="miniest_league_profile"
              :srcset="lastMatch.item6"
            />
          </div>
        </div>

        <div class="last-game-col1">
          Lvl: {{ lastMatch.champLevel }} <br />
          {{ lastMatch.totalMinionsKilled }} cs<br />
        </div>
      </div>
      <div class="stats-overall">
        <u class="little-bigger">Last 15 games Statistics</u>
        <br />
        <div class="grid-container">
          <div class="grid-item">{{ stats.wins }} Wins</div>
          <div class="grid-item">{{ stats.losses }} Losses</div>
          <div class="grid-item">{{ stats.win_Rate }}Win Rate</div>
          <div class="grid-item">{{ stats.avg_Kills }} AVG Kills</div>
          <div class="grid-item">{{ stats.avg_Death }} Avg Death</div>
          <div class="grid-item">{{ stats.avg_assists }} Avg assists</div>
          <div class="grid-item">{{ stats.diff_Champions }} Diff Champions</div>
          <div class="grid-item">{{ stats.diff_Roles }} Diff Roles</div>
          <div class="grid-item">{{ stats.diff_Queues }} Diff Queues</div>
        </div>
      </div>

      <div class="stats-overall">
        <u class ="little-bigger">Recent Champions</u><br />
        <div class="wrap">
          <div v-for="champion in recentChampions" :key="champion.id">
          <div class="col-recent-champ">
            <img class="recent-champs" :srcset="getChampURL(champion)" alt="champion" height="50" width="50">
            {{champion.name}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <!-- If the launcher is not running it cant display info, so this is the placeholder-->
      <!-- TODO #8 We need to save the information pulled from the launcher so that the program
       knows their summoner data. Whether locally or on a database, then we can have home page
        check to see if we've already saved summoner data -->
      <img
        alt="League Companion"
        class="logo"
        height="300"
        width="300"
        src="https://img.icons8.com/bubbles/500/000000/question-mark.png"
      />
      <p>Launch your League Client to fetch your stats</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
// @ts-ignore
import spells from "lol-spells";
// @ts-ignore
import champions from "lol-champions";

class Champion {
  id: number;
  name: string;
  url: string;

  constructor(id, name, url) {
    this.id = id;
    this.name = name;
    this.url = url;
  }
}

@Component
export default class Stats extends Vue {
  infoAvailable = false;
  summoner_info = null;
  summonerName = "Doublelift";
  profile_icon_id_url =
    "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/12.png";
  summonerLevel = "";

  // these are needed for API calls for stats
  encypted_summoner_id = "";
  encypted_account_id = "";

  recentChampions: Champion[] = new Array();

  lastMatch = {
    //ARAM & Normals
    gameMode: "ARAM",
    //game started & duration
    gameCreation: new Date(1611790864204).toLocaleDateString(),
    gameDuration: new Date(820543543).toTimeString(),
    //win or lose
    win: "Win",
    //Champion Used
    championId: 0,
    championName: "",
    champArtURL: "",
    //Starter spells like Flash or Heal
    //these are img urls, but i can look for the names if we need them
    spell1Id: "",
    spell1Icon: "",
    spell2Id: "",
    spell2Icon: "",

    //Items used in match
    item0: "",
    item1: "",
    item2: "",
    item3: "",
    item4: "",
    item5: "",
    item6: "",
    //KDA
    kills: 0,
    deaths: 0,
    assists: 0,
    kda: "-1.1",
    // multikills
    largestMultiKill: "",
    champLevel: 15,
    //minion kills & cs
    totalMinionsKilled: 31,
    //optionally we can add Kill participation. calculated by kills plus assists and dividing that by their team's total kills.
    //we can also add all the plalyers in the game
    //this is what i modeled the data off of https://na.op.gg/summoner/userName=doublelift
  };

  //this object will be used for stats to display
  stats = {
    wins: 0,
    avg_Kills: "",
    diff_Champions: 0,
    losses: 0,
    avg_assists: "",
    diff_Roles: 0,
    win_Rate: "",
    avg_Death: "",
    diff_Queues: 0,
  };

  get summonerDataAvailable() {
    return this.infoAvailable;
  }

  //this is for the v-for for champ images
  getChampURL( champ:Champion){
    console.log("champ", champ)
    return champ.url;
  }

  //This page will use the same launcher info as before
  //TODO: #9 Send User info between desktop components from home menu rather than use overwolf launcher API. will speed things up
  //connect to overwolf API to gain user data
  mounted() {
    let self = this;

    //register event listeners
    function registerEvents() {
      // general events errors
      // @ts-ignore
      overwolf.games.events.onError.addListener(function (info) {
        console.log("Error: " + JSON.stringify(info));
      });

      // "static" data changed
      // This will also be triggered the first time we register
      // for events and will contain all the current information
      // @ts-ignore
      overwolf.games.launchers.events.onInfoUpdates.addListener(function (
        info
      ) {
        console.log("Info UPDATE: " + JSON.stringify(info));
      });

      // an event triggered
      // @ts-ignore
      overwolf.games.launchers.events.onNewEvents.addListener(function (info) {
        console.log("EVENT FIRED: " + JSON.stringify(info));
      });
    }

    function setFeatures() {
      // @ts-ignore
      overwolf.games.launchers.events.setRequiredFeatures(
        10902,
        [
          "game_flow",
          "summoner_info",
          "champ_select",
          "lcu_info",
          "lobby_info",
          "end_game",
          "game_info",
        ],
        function (info) {
          if (info.status == "error") {
            console.log("Could not set required features: " + info.reason);
            console.log("Trying in 2 seconds");
            window.setTimeout(setFeatures, 2000);
            return;
          }

          console.log(JSON.stringify(info));

          // @ts-ignore
          overwolf.games.launchers.events.getInfo(10902, function (info) {
            if (info.status === "success") {
              console.log("Summoner Info", info.res.summoner_info.display_name);

              //filling in data from what the launcher recieves
              self.summoner_info = info.res.summoner_info;

              //FOR TESTING PURPOSES
              //self.summonerName = self.summoner_info.display_name;
              //   self.profile_icon_id_url =
              //     "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/" +
              //     self.summoner_info.profile_icon_id +
              //     ".png";
              self.summonerLevel = self.summoner_info.summoner_level;

              self.infoAvailable = true;
            }
          });
        }
      );
    }

    function launcherRunning(launcherInfo) {
      if (!launcherInfo) {
        return false;
      }

      if (!launcherInfo.launchers[0]) {
        return false;
      }

      // NOTE: we divide by 10 to get the launcher class id without it's sequence number
      if (Math.floor(launcherInfo.launchers[0].id / 10) != 10902) {
        return false;
      }

      console.log("League of Legends launcher running");
      return true;
    }

    //create starting listeners
    // @ts-ignore
    overwolf.games.launchers.onLaunched.addListener(function () {
      registerEvents();
      setTimeout(setFeatures, 1000);
      console.log("onLaunched fired");
    });
    // @ts-ignore
    overwolf.games.launchers.getRunningLaunchersInfo(function (res) {
      if (launcherRunning(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
      }
      console.log("getRunningLaunchersInfo: " + JSON.stringify(res));
    });

    // @ts-ignore
    overwolf.games.launchers.onTerminated.addListener(function (res) {
      setTimeout(window.close, 1000);
    });
  }

  async created() {
    // window resize
    let WindowId;
    //@ts-ignore
    overwolf.windows.getCurrentWindow(function (res) {
      console.log(res);
      WindowId = res.window.id;
    console.log("id: ", WindowId)
    let sizeSettings = {
        "window_id": WindowId,
        "width":500,
        "height":600,
        "auto_dpi_resize":true //relevant only for native windows
      };
      //@ts-ignore
      overwolf.windows.changeSize(sizeSettings ,console.log);
    });

    //create variable for this
    let self = this;
    //create url to call for summoner data
    let summonerInfoURL =
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      self.summonerName +
      "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9";
    //ACCOUNTID >> MATCHLIST >> LAST MATCH DATA
    console.log("SummonerName being queried: ", self.summonerName);

    //Use axios to call API and get summoner info
    //ACCOUNT ID
    await axios
      .get(summonerInfoURL)
      .then(async (summonerInfo) => {
        //Save encrypted summoner data
        console.log("Summoner API CALL RESPONCE: ", summonerInfo);

        self.encypted_summoner_id = summonerInfo.data.id;
        self.encypted_account_id = summonerInfo.data.accountId;
        //MATCHLIST
        //use axios to get a matchlist from RIOT API
        console.log(
          "Matchlist queried using encrypted summoner Id: ",
          self.encypted_account_id
        );
        let matchInfoURL =
          "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" +
          self.encypted_account_id +
          "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9";

        //Nested Axios Call to recieve data from most recent match and enter it in last match
        await axios
          .get(matchInfoURL)
          .then(async (matchList) => {

            var matchNums = 15;
            if (matchList.data.totalGames < 15) {
              matchNums = matchList.data.totalGames;
            }
            var killcount = 0;
            var deathcount = 0;
            var assistCount = 0;

            //arrays to count roles, queues, and champions
            var roleCount: string[] = new Array();
            var queueCount: number[] = new Array();
            var champIDs: number[] = new Array();

            //go through 15 matches to build stats profile.
            for (let imatch = 0; imatch < matchNums; imatch++) {
              //collect individual match data
              //add first match data if no other matches added yet
              //adding roles
              if (roleCount.length === 0) {
                roleCount.push(matchList.data.matches[imatch].role);
                console.log(
                  "adding first role: ",
                  matchList.data.matches[imatch].role
                );
              } else {
                if (!roleCount.includes(matchList.data.matches[imatch].role)) {
                  roleCount.push(matchList.data.matches[imatch].role);
                  console.log(
                    "adding new  role",
                    matchList.data.matches[imatch].role
                  );
                }
              }

              //adding queues
              if (queueCount.length === 0) {
                console.log(
                  "adding first queue: ",
                  matchList.data.matches[imatch].queue
                );
                queueCount.push(matchList.data.matches[imatch].queue);
              } else {
                if (
                  !queueCount.includes(matchList.data.matches[imatch].queue)
                ) {
                  queueCount.push(matchList.data.matches[imatch].queue);
                  console.log(
                    "adding new  queue",
                    matchList.data.matches[imatch].queue
                  );
                }
              }

              //adding champ data
              if (champIDs.length === 0) {
                champIDs.push(matchList.data.matches[imatch].champion);
              } else {
                if (
                  !champIDs.includes(matchList.data.matches[imatch].champion)
                ) {
                  champIDs.push(matchList.data.matches[imatch].champion);
                  console.log(
                    "adding new  champion",
                    matchList.data.matches[imatch].champion
                  );
                }
              }

              console.log("Axios for match: ", imatch);
              //call API for each match
              await axios
                .get(
                  "https://na1.api.riotgames.com/lol/match/v4/matches/" +
                    matchList.data.matches[imatch].gameId +
                    "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9"
                )
                .then(async (mostRecentMatch) => {
                  //assigning most recent match data to display by parsing the json

                  console.log(mostRecentMatch.data);
                  //setting basic game data for recent match
                  //if i === 0, then this is the most recent match data
                  if (imatch === 0) {
                    self.lastMatch.gameMode = mostRecentMatch.data.gameMode;
                    let date = new Date(mostRecentMatch.data.gameCreation);

                    self.lastMatch.gameCreation =
                      date.getMonth() +
                      " / " +
                      date.getDay() +
                      " / " +
                      date.getFullYear();
                    self.lastMatch.gameDuration =
                      new Date(mostRecentMatch.data.gameDuration * 1000)
                        .getMinutes()
                        .toLocaleString() + " min";
                  }

                  /*Search through participant identities to find the correct data*/
                  for (let i = 0; i < 10; i++) {
                    //if correct summoner is found fill data
                    if (
                      self.summonerName ===
                      mostRecentMatch.data.participantIdentities[i].player
                        .summonerName
                    ) {
                      if (
                        mostRecentMatch.data.participants[i].stats.win === true
                      ) {
                        self.stats.wins = self.stats.wins + 1;
                        console.log("Self.stats.wins++", self.stats.wins);
                        if (imatch === 0) {
                          self.lastMatch.win = "Victory";
                        }
                      } else {
                        self.stats.losses = self.stats.losses + 1;
                        console.log("Self.stats.losses++", self.stats.losses);

                        if (imatch === 0) {
                          self.lastMatch.win = "Defeat";
                        }
                      }
                      //if last match then save it as image to be displayed at the top
                      if (imatch === 0) {
                        self.lastMatch.championId =
                          mostRecentMatch.data.participants[i].championId;
                        //need to add it/ instatiate array
                      } else {
                        //add champions to champion array to display
                      }

                      //if match index === 0 store item info from most recent match
                      if (imatch === 0) {
                        //item info
                        //base item url http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/{{ItemNumber}}.png
                        self.lastMatch.item0 =
                          "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/" +
                          mostRecentMatch.data.participants[i].stats.item0 +
                          ".png";

                        self.lastMatch.item1 =
                          "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/" +
                          mostRecentMatch.data.participants[i].stats.item1 +
                          ".png";
                        self.lastMatch.item2 =
                          "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/" +
                          mostRecentMatch.data.participants[i].stats.item2 +
                          ".png";
                        self.lastMatch.item3 =
                          "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/" +
                          mostRecentMatch.data.participants[i].stats.item3 +
                          ".png";
                        self.lastMatch.item4 =
                          "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/" +
                          mostRecentMatch.data.participants[i].stats.item4 +
                          ".png";
                        self.lastMatch.item5 =
                          "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/" +
                          mostRecentMatch.data.participants[i].stats.item5 +
                          ".png";
                        self.lastMatch.item6 =
                          "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/" +
                          mostRecentMatch.data.participants[i].stats.item6 +
                          ".png";
                      }

                      //KDA
                      killcount +=
                        mostRecentMatch.data.participants[i].stats.kills;
                      if (imatch === 0) {
                        self.lastMatch.kills =
                          mostRecentMatch.data.participants[i].stats.kills;
                      }

                      deathcount +=
                        mostRecentMatch.data.participants[i].stats.deaths;

                      if (imatch === 0) {
                        self.lastMatch.deaths =
                          mostRecentMatch.data.participants[i].stats.deaths;
                      }

                      assistCount +=
                        mostRecentMatch.data.participants[i].stats.assists;

                      if (imatch === 0) {
                        self.lastMatch.assists =
                          mostRecentMatch.data.participants[i].stats.assists;
                      }

                      //calculate Kill/death ratio
                      //these are only relevant to most recent match
                      if (imatch === 0) {
                        self.lastMatch.kda = (
                          (self.lastMatch.kills + self.lastMatch.assists) /
                          self.lastMatch.deaths
                        ).toFixed(2);
                        //need an if to get the right string here
                        if (
                          mostRecentMatch.data.participants[i].stats
                            .largestMultiKill === 2
                        ) {
                          self.lastMatch.largestMultiKill = "Double Kill";
                        } else if (
                          mostRecentMatch.data.participants[i].stats
                            .largestMultiKill === 3
                        ) {
                          self.lastMatch.largestMultiKill = "Triple Kill";
                        } else if (
                          mostRecentMatch.data.participants[i].stats
                            .largestMultiKill === 4
                        ) {
                          self.lastMatch.largestMultiKill = "QuadraKil";
                        } else if (
                          mostRecentMatch.data.participants[i].stats
                            .largestMultiKill === 5
                        ) {
                          self.lastMatch.largestMultiKill = "Penta Kill";
                        } else if (
                          mostRecentMatch.data.participants[i].stats
                            .largestMultiKill === 6
                        ) {
                          self.lastMatch.largestMultiKill = "Hexa Kill";
                        } else {
                          self.lastMatch.largestMultiKill = "";
                        }

                        self.lastMatch.champLevel =
                          mostRecentMatch.data.participants[i].stats.champLevel;

                        self.lastMatch.totalMinionsKilled =
                          mostRecentMatch.data.participants[
                            i
                          ].stats.totalMinionsKilled;

                        // Find the spells by spell id - using the lol spells package for this.
                        // spell info
                        // http://ddragon.leagueoflegends.com/cdn/11.2.1/img/spell/{{spellname}}.png
                        self.lastMatch.spell1Id =
                          mostRecentMatch.data.participants[i].spell1Id;
                        self.lastMatch.spell2Id =
                          mostRecentMatch.data.participants[i].spell2Id;

                        for (let i = 0; i < spells.length; i++) {
                          //check for spell 1
                          if (
                            spells[i].key === String(self.lastMatch.spell1Id)
                          ) {
                            self.lastMatch.spell1Icon = spells[i].icon;
                          } //check for spell 2
                          else if (
                            spells[i].key === String(self.lastMatch.spell2Id)
                          ) {
                            self.lastMatch.spell2Icon = spells[i].icon;
                          }
                        }
                      }
                    
                      break;
                    }
                  }
                })

                //Below i'm just logging any errors from this axios calls
                .catch((e) => console.log("Error: ", e));
            }

            console.log(
              "Async thread complete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
            );

            //using champion id's to enter data for array of images
            //get most recent match data
            for (let i = 0; i < champions.length; i++) {
              if (champions[i].key === String(champIDs[0])) {
                (self.lastMatch.championId = champions[i].key),
                  (self.lastMatch.championName = champions[i].id);
                self.lastMatch.champArtURL = champions[i].icon;

                break;
              }
            }

            
            champIDs.forEach((id) => {
              console.log(id);
              for (let i = 0; i < champions.length; i++) {
                //if id and key matches then initialize data and end loop

                if (champions[i].key === String(id)) {
                  self.recentChampions.push(
                    new Champion(
                      champions[i].key,
                      champions[i].id,
                      champions[i].icon
                    )
                  );
                  break;
                }
              }
            });

            //after the for loop through match list
            //calculate averages
            self.stats.avg_Kills = (killcount / matchNums).toFixed(2);
            self.stats.avg_Death = (deathcount / matchNums).toFixed(2);
            self.stats.avg_assists = (assistCount / matchNums).toFixed(2);
            self.stats.diff_Roles = roleCount.length;
            self.stats.diff_Queues = queueCount.length;
            self.stats.diff_Champions = champIDs.length;
            self.stats.win_Rate =
              ((self.stats.wins / matchNums) * 100).toFixed(0) + "%";
          })

          .catch((e) => console.log("Error: ", e));
      })
      .catch((e) => console.log("Error: ", e));
  }

  // Check if the items exist before rendering them
  get item0exists() {
    return (
      this.lastMatch.item0 !=
      "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"
    );
  }
  get item1exists() {
    return (
      this.lastMatch.item1 !=
      "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"
    );
  }
  get item2exists() {
    return (
      this.lastMatch.item2 !=
      "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"
    );
  }
  get item3exists() {
    return (
      this.lastMatch.item3 !=
      "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"
    );
  }
  get item4exists() {
    return (
      this.lastMatch.item4 !=
      "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"
    );
  }
  get item5exists() {
    return (
      this.lastMatch.item5 !=
      "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"
    );
  }
  get item6exists() {
    return (
      this.lastMatch.item6 !=
      "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/0.png"
    );
  }
}
</script>