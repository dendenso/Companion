<template>
  <div class="home-container">
    <h1 class="project-name">League Companion</h1>
    <hr />
    <div v-if="summonerDataAvailable">
      <!-- Info that is displayed from data pullled from launcher
       img src is being dynamically set-->
      <div class="summoner-label">
        <img
          alt="Profile Icon"
          class="league_profile"
          :srcset="profile_icon_id_url"
        />
        <h1>{{ summonerName }}</h1>
        <p>Level: {{ summonerLevel }}</p>
      </div>
      <img :srcset="splash_art_url" alt="Random Art" class="bottom-art" />
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
        src="https://img.icons8.com/bubbles/500/000000/league-of-legends.png"
      />
      <p>Launch your league client to create overlay</p>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import {
  RiotAPI,
  RiotAPITypes,
  PlatformId,
  DDragon,
} from "@fightmegg/riot-api";

@Component
export default class Home extends Vue {
  infoAvailable = false;
  //this is the data being pulled from the launcher
  summoner_info = null;
  summonerName = "";
  profile_icon_id_url = "";
  splash_art_url = "";
  summonerLevel = "";

  //This array is for the random picture on the bottom of the profile home page
  championArray = [
    "Teemo",
    "Thresh",
    "Lux",
    "Lucian",
    "Soraka",
    "Sona",
    "Aatrox",
    "Pantheon",
    "Samira",
    "Malphite",
    "Fiddlesticks",
  ];

  //getter is used by template to see if it needs to change what it displays
  get summonerDataAvailable() {
    return this.infoAvailable;
  }

  //mounted is used to gain user data from the launcher
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
          // @ts-ignore
          overwolf.games.launchers.events.getInfo(10902, function (info) {
            if (info.status === "success") {
              //filling in data from what the launcher recieves
              self.summoner_info = info.res.summoner_info;
              self.summonerName = self.summoner_info.display_name;
              self.profile_icon_id_url =
                "http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/" +
                self.summoner_info.profile_icon_id +
                ".png";
              self.summonerLevel = self.summoner_info.summoner_level;
              //randomly chosing splash art from array
              self.splash_art_url =
                "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
                self.championArray[
                  Math.floor(Math.random() * self.championArray.length)
                ] +
                "_0.jpg";
              self.infoAvailable = true;
            }
          });
        }
      );
    }

    //checks if correct launcher is running
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
    //runs after mounted()
    
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
  }
}
</script>