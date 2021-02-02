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

@Component
export default class Stats extends Vue {
  infoAvailable = true;
  summoner_info = null;
  summonerName = "Doublelift";
  profile_icon_id_url =
    "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/12.png";
  summonerLevel = "";

  // these are needed for API calls for stats
  encypted_summoner_id = "";
  encypted_account_id = "";

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
    kda: -1.1,
    // multikills
    largestMultiKill: "",
    champLevel: 15,
    //minion kills & cs
    totalMinionsKilled: 31,
    //optionally we can add Kill participation. calculated by kills plus assists and dividing that by their team's total kills.
    //we can also add all the plalyers in the game
    //this is what i modeled the data off of https://na.op.gg/summoner/userName=doublelift
  };

  get summonerDataAvailable() {
    return this.infoAvailable;
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
              console.log(info);
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
              //randomly chosing splash art from array

              self.infoAvailable = true;
              console.log("Seting info available:", self.infoAvailable);
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

  created() {
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
    axios
      .get(summonerInfoURL)
      .then((summonerInfo) => {
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
        axios
          .get(matchInfoURL)
          .then((matchList) => {
            console.log("MatchList API CALL RESPONCE: ", matchList);

            //tsignore removes the error for finding matches in matchlist
            // @ts-ignore
            console.log(
              "Matchlist Game ID: ",
              matchList.data.matches[0].gameId
            );
            axios
              .get(
                "https://na1.api.riotgames.com/lol/match/v4/matches/" +
                  matchList.data.matches[0].gameId +
                  "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9"
              )
              .then((mostRecentMatch) => {
                //assigning most recent match data to display by parsing the json
                console.log("GameCreation", mostRecentMatch.data.gameCreation);
                //setting basic game data
                self.lastMatch.gameMode = mostRecentMatch.data.gameMode;
                let date = new Date(mostRecentMatch.data.gameCreation);

                self.lastMatch.gameCreation =
                  date.getMonth() +
                  " / " +
                  date.getDay() +
                  " / " +
                  date.getFullYear();
                console.log("dfgsdrg", self.lastMatch.gameCreation);
                self.lastMatch.gameDuration =
                  new Date(mostRecentMatch.data.gameDuration * 1000)
                    .getMinutes()
                    .toLocaleString() + " min";

                /*Serach through participant identities to find the correct data*/
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
                      self.lastMatch.win = "Victory";
                    } else {
                      self.lastMatch.win = "Defeat";
                    }
                    self.lastMatch.championId =
                      mostRecentMatch.data.participants[i].championId;

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

                    //KDA

                    self.lastMatch.kills =
                      mostRecentMatch.data.participants[i].stats.kills;
                    self.lastMatch.deaths =
                      mostRecentMatch.data.participants[i].stats.deaths;

                    self.lastMatch.assists =
                      mostRecentMatch.data.participants[i].stats.assists;
                    //calculate Kill/death ratio

             
                    self.lastMatch.kda =
                      (self.lastMatch.kills + self.lastMatch.assists) /
                      self.lastMatch.deaths;
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

                    //find the champion from the champion Id
                    axios
                      .get(
                        "http://ddragon.leagueoflegends.com/cdn/11.2.1/data/en_US/champion.json"
                      )
                      .then((championInfo) => {
                        //statically using number of current champions 1/31/21 might change in the future
                        console.log(championInfo);

                        let obj = championInfo.data.data;

                        //this for loop took forever to figure out,
                        // the json is formatted in a weird way
                        for (var key in obj) {
                          let champ = championInfo.data.data[key];

                          if (champ.key === String(self.lastMatch.championId)) {
                            console.log("Champion Found");
                            self.lastMatch.championName = champ.name;
                            self.lastMatch.champArtURL =
                              "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/champion/" +
                              champ.name.split(" ").join("") +
                              ".png";
                            console.log(self.lastMatch.champArtURL);
                          }
                        }

                        // Find the spells by spell id - using the lol spells package for this.
                        // spell info
                        // http://ddragon.leagueoflegends.com/cdn/11.2.1/img/spell/{{spellname}}.png
                        //   self.lastMatch.spell1Id =
                        //     "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/spell/" +
                        //     mostRecentMatch.data.participants[i].spell1Id +
                        //     ".png";
                        //   console.log("Spell1 : ", self.lastMatch.spell1Id);
                        //   self.lastMatch.spell2Id =
                        //     "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/spell/" +
                        //     mostRecentMatch.data.participants[i].spell2Id +
                        //     ".png";
                        self.lastMatch.spell1Id =
                          mostRecentMatch.data.participants[i].spell1Id;
                        self.lastMatch.spell2Id =
                          mostRecentMatch.data.participants[i].spell2Id;
                        console.log(
                          "self.lastMatch.spell1Id",
                          self.lastMatch.spell1Id
                        );
                        console.log(
                          "self.lastMatch.spell2Id",
                          self.lastMatch.spell2Id
                        );
                        for (let i = 0; i < spells.length; i++) {
                          //check for spell 1
                          if (spells[i].key === String(self.lastMatch.spell1Id)) {
                            self.lastMatch.spell1Icon = spells[i].icon;

                            console.log("spells[i].key 1", spells[i].key);
                            console.log(
                              "self.lastMatch.spell1Id",
                              self.lastMatch.spell1Id
                            );
                            console.log(
                              "self.lastMatch.spell2Icon",
                              self.lastMatch.spell1Icon
                            );
                          } //check for spell 2
                          else if (spells[i].key === String(self.lastMatch.spell2Id)) {
                            self.lastMatch.spell2Icon = spells[i].icon;

                            console.log("spells[i].key 2", spells[i].key);
                            console.log(
                              "self.lastMatch.spell2Id",
                              self.lastMatch.spell2Id
                            );
                            console.log(
                              "self.lastMatch.spell2Icon",
                              self.lastMatch.spell2Icon
                            );
                          }
                        }
                      })
                      .catch((e) => console.log("Error: ", e));

                    console.log("Found Summoner @ index: ", i);
                    break;
                  }
                }
              })

              //Below i'm just logging any errors from this axios calls
              .catch((e) => console.log("Error: ", e));
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