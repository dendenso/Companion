<template>
  <div id="logs">
    <div id="events" class="logColumn">
      <h1>Game Events</h1>
      <div id="eventsLog" class="dataText">
        <p v-for="event in events" :key="event">
          {{ event }}
        </p>
      </div>
      <button id="copyEvents" class="logCopy">COPY GAME EVENTS</button>
    </div>
    <div id="infoUpdates" class="logColumn">
      <h1>Info Updates</h1>
      <div id="infoLog" class="dataText">
        <p v-for="info in infos" :key="info">
          {{ info }}
        </p>
      </div>
      <button id="copyInfo" class="logCopy">COPY INFO UPDATES</button>
    </div>
  </div>
  <!--        <div id="other">-->
  <!--            <h1>Real time Game Data</h1>-->
  <!--            <p id="infoParagraph">-->
  <!--                The background controller of this app is listening to all the game-->
  <!--                events and info updates, and sends them to this window, that prints-->
  <!--                them to the screen. Some specific events (startMatch, Kill and Death)-->
  <!--                are painted in <span style="color: #00DEFA">teal</span> and logged to-->
  <!--                the developers console.-->
  <!--            </p>-->
  <!--            <div id="ad"></div>-->
  <!--            <p id="sampleAdText">-->
  <!--                This is a sample ad (400x300px) of the best size-->
  <!--            </p>-->
  <!--        </div>-->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { OWGamesEvents } from "../../shared/libs/ow-games-events";
import {
  hotkeys,
  interestingFeatures,
  windowNames,
} from "../../shared/constants/consts";
import { OWHotkeys } from "../../shared/libs/ow-hotkeys";
import { OWWindow } from "../../shared/libs/ow-window";
// @ts-ignore
let WindowState = overwolf.windows.WindowState;

@Component
export default class App extends Vue {
  private _gameEventsListener: OWGamesEvents;
  private _eventsLog: HTMLElement;
  private _infoLog: HTMLElement;
  public events: Array<any> = [];
  public infos: Array<any> = [];
  _backgroundWindow: OWWindow;
  currWindow: OWWindow;
  _modal: HTMLElement;
  _closeButton: HTMLElement;
  _minimizeHeaderButton: HTMLElement;
  _exitButton: HTMLElement;
  _minimizeButton: HTMLElement;
  _header: HTMLElement;
  _version: HTMLElement;

  _showExitMinimizeModal() {
    this._modal.style.display = "block";
  }
  _hideExitMinimizeModal() {
    this._modal.style.display = "none";
  }

  //deals with functions of top bar buttons
  mounted() {
    this._eventsLog = document.getElementById("eventsLog");
    this._infoLog = document.getElementById("infoLog");

    this.setToggleHotkeyBehavior();
    this.setToggleHotkeyText();
    // Listen to X button click
    this._closeButton.addEventListener("click", this._showExitMinimizeModal);
    // Listen to minimize click
    this._minimizeHeaderButton.addEventListener("click", () => {
      this.currWindow.minimize();
    });
    // Close app on exit click
    this._exitButton.addEventListener("click", () => {
      this._backgroundWindow.close();
    });
    // Minimize app on minimize click
    this._minimizeButton.addEventListener("click", () => {
      this._backgroundWindow.minimize();
      this._hideExitMinimizeModal();
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target == this._modal) {
        this._hideExitMinimizeModal();
      }
    };
    this.currWindow.dragMove(this._header);

    // Auto-highlights
    // @ts-ignore
    overwolf.media.replays.onCaptureError.addListener(function (res) {
      console.log("result from CaptureErrorEvent", res);
    });

    // @ts-ignore
    overwolf.media.replays.onCaptureStopped.addListener(function (res) {
      console.log("result from Capture Stopped", res);
    });
    // @ts-ignore
    overwolf.media.replays.onCaptureWarning.addListener(function (res) {
      console.log("result from Capture Warning", res);
    });
    // @ts-ignore

    overwolf.media.replays.onReplayServicesStarted.addListener(function (res) {
      console.log("result from onReplayServicesStarted ", res);
    });
    // @ts-ignore

    overwolf.media.replays.onHighlightsCaptured.addListener(function (res) {
      console.log("result from onHighlightsCaptured", res);
    });

    let videoSetting = {
      video: {
        buffer_length: 20000,
        override_overwolf_setting: false,
        fps: 30,
        width: 1920,
        height: 1080,
      },
      game: {
        volume: 75,
        enable: true,
      },
      quota: {
        max_quota_gb: 2,
        excluded_directories: ["cool_session"], //set directories that are not part of the quota
      },
    };
    let callback = {
      success: true,
      description: "",
      metadata: "",
      mediaFolder: "",
      osVersion: "",
      osBuild: "",
    };
    // @ts-ignore
    overwolf.media.replays.turnOn(
      {
        settings: videoSetting,
        highlights: {
          enable: true, //set false if you want to record the highlights manually
          requiredHighlights: ["death", "assist", "kill", "victory"], // events to capture
        },
      },
      (result) => {
        console.log("Turning on Auto Highlights: ", result);
      }
    );





  }

  public created() {
    let self = this;
    // Background window:
    this._backgroundWindow = new OWWindow("background");
    this.currWindow = new OWWindow("in_game");
    // Page elements:
    this._modal = document.getElementById("exitMinimizeModal");
    this._closeButton = document.getElementById("closeButton");
    this._minimizeHeaderButton = document.getElementById("minimizeButton");
    this._exitButton = document.getElementById("exit");
    this._minimizeButton = document.getElementById("minimize");
    this._header = document.getElementsByClassName(
      "app-header"
    )[0] as HTMLElement;
    this._version = document.getElementById("version");
    // this._gameEventsListener = new OWGamesEvents(
    //   {
    //     onInfoUpdates: this.onInfoUpdates.bind(this),
    //     onNewEvents: this.onNewEvents.bind(this),
    //   },
    //   interestingFeatures
    // );
    // this._gameEventsListener.start();

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
      "abilities",
      "announcer",
      "counters",
      "match_info",
      "damage",
      "heal",
      "live_client_data",
      // 'gold'
    ];

    function registerEvents() {
      // general events errors
      //@ts-ignore
      overwolf.games.events.onError.addListener(function (info) {
        console.log("error listener");
        console.log("Error: " + JSON.stringify(info));
      });

      // "static" data changed (total kills, username, steam-id)
      // This will also be triggered the first time we register
      // for events and will contain all the current information
      //@ts-ignore

      overwolf.games.events.onInfoUpdates2.addListener(function (info) {
      //  console.log("Info UPDATE: " + JSON.stringify(info));
        self.infos.push(info);
      });

      // an event triggerd
      //@ts-ignore

      overwolf.games.events.onNewEvents.addListener(function (info) {
        self.events.push(info);
      //  console.log("EVENT FIRED: " + JSON.stringify(info));
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

     // console.log("onGameInfoUpdated: " + JSON.stringify(res));
    });

    //@ts-ignore

    overwolf.games.getRunningGameInfo(function (res) {
      if (gameRunning(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
      }
    //  console.log("getRunningGameInfo: " + JSON.stringify(res));
    });
  }

  private onInfoUpdates(info) {
    this.infos.push(info);
  }

  // Special events will be highlighted in the event log
  private onNewEvents(e) {
    this.events.push(e);
  }

  // Displays the toggle minimize/restore hotkey in the window header
  private async setToggleHotkeyText() {
    // const hotkeyText = await OWHotkeys.getHotkeyText(hotkeys.toggle);

    //@ts-ignore
    overwolf.settings.hotkeys.get((e) => {
      console.log("hotkey data", e.games["5426"]);
      const hotkeyElem = document.getElementById("hotkey");
      //@ts-ignore
      hotkeyElem.textContent = e.games["5426"]["0"]["binding"];

      //@ts-ignore
      overwolf.settings.hotkeys.OnPressedEvent.addListener(function (res) {
        console.log("hotkey pressed", res);
      });
    });
  }

  // Sets toggleInGameWindow as the behavior for the Ctrl+F hotkey
  private async setToggleHotkeyBehavior() {
    const toggleInGameWindow = async (hotkeyResult) => {
      console.log(`pressed hotkey for ${hotkeyResult.featureId}`);
      const inGameState = await this.getWindowState();

      if (
        inGameState.window_state === WindowState.NORMAL ||
        inGameState.window_state === WindowState.MAXIMIZED
      ) {
        this.currWindow.minimize();
      } else if (
        inGameState.window_state === WindowState.MINIMIZED ||
        inGameState.window_state === WindowState.CLOSED
      ) {
        this.currWindow.restore();
      }
    };

    OWHotkeys.onHotkeyDown(hotkeys.toggle, toggleInGameWindow);
  }
  public async getWindowState() {
    return await this.currWindow.getWindowState();
  }
}
</script>
<style>
</style>
