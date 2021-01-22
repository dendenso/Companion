<template>
  <div class="home-container">
    <h1 class="project-name">League Companion</h1>
    <hr />
    <div v-if="summonerDataAvailable">
      <p>{{summoner_info}}</p>
    </div>
    <div v-else>
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
// @ts-ignore

@Component
export default class Home extends Vue {
  infoAvailable = true;
  summoner_info = "testing Summoner";


  get summonerDataAvailable(){
    return this.infoAvailable;
  }

  mounted() {
    console.log("mounted Home");
  }

  created() {
    //register event listeners
    function registerEvents() {
      // general events errors
      console.log("Registering Event Listeners");
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
      console.log("Attempting to set required feaures");
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

          console.log("Required Features Have Been Set:");
          console.log(JSON.stringify(info));

          // @ts-ignore
          overwolf.games.launchers.events.getInfo(10902, function (info) {
           console.log("setting data from: ", info )

          });
        }
      );
    }

    function launcherRunning(launcherInfo) {
      console.log("Checking If launcher is running");
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
      console.log("Registering onLaunched Listener");
      registerEvents();
      setTimeout(setFeatures, 1000);
      console.log("onLaunched fired");
    });
    // @ts-ignore
    overwolf.games.launchers.getRunningLaunchersInfo(function (res) {
      console.log("Registering getRunningLaunchersInfo Listener");
      if (launcherRunning(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
      }
      console.log("getRunningLaunchersInfo: " + JSON.stringify(res));
    });

    // @ts-ignore
    overwolf.games.launchers.onTerminated.addListener(function (res) {
      console.log("onTerminated fired");
      setTimeout(window.close, 1000);
    });
  }
}
</script>