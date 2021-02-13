<template>
  <div>
    <ul class="nav">
      <button @click="changeTab('Home')">Home</button>
      <button @click="changeTab('Stats')">Stats</button>
      <button @click="changeTab('Tournaments')">Tournament</button>
    </ul>
    <!--<p>Logo Here</p>
    <h1>(League Companion)</h1>
    <h2>Launch League of Legends to Begin!</h2>
    TODO:We #7 Need an App logo to display here and in the nav bar -->
    <component v-bind:is="tabName" />
  </div>
</template>

<script lang="ts">
import { OWWindow } from "../../shared/libs/ow-window";
import { Component, Vue } from "vue-property-decorator";
//the vue version cannot see local paths
// @ts-ignore
import Stats from "@/components/Stats";
// @ts-ignore
import Home from "@/components/Home";
// @ts-ignore
import Tournaments from "@/components/Tournaments";
import firebase from "firebase/app";
import "firebase/database";

@Component({
  components: {
    Stats,
    Home,
    Tournaments,
  },
})
export default class App extends Vue {
  tabsName = "Home";

  get tabName() {
    return this.tabsName;
  }

  changeTab(name) {
    console.log("Setting Value: ", name);
    this.tabsName = name;
  }

  _backgroundWindow: OWWindow;
  currWindow: OWWindow;
  _modal: HTMLElement;
  _closeButton: HTMLElement;
  _minimizeHeaderButton: HTMLElement;
  _exitButton: HTMLElement;
  _minimizeButton: HTMLElement;
  _header: HTMLElement;
  _version: HTMLElement;

  created() {
    // Background window:
    this._backgroundWindow = new OWWindow("background");
    this.currWindow = new OWWindow("desktop");
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

    // const firebaseConfig = {
    //   apiKey: "AIzaSyBrMp64ttfGC2WiD28JiJXtfUXevFeShCk",
    //   authDomain: "test-59db3.firebaseapp.com",
    //   databaseURL: "https://test-59db3-default-rtdb.firebaseio.com",
    //   projectId: "test-59db3",
    //   storageBucket: "test-59db3.appspot.com",
    //   messagingSenderId: "890513354906",
    //   appId: "1:890513354906:web:ff2483ac34b4f91fb4af23",
    //   measurementId: "G-FQST7TCZCR",
    // };

    //Firebase Demo
    // //imagine we have champ id in game window
    // var champid= 1;
    // //initialize the app
    // firebase.initializeApp(firebaseConfig);
    // //initialize database
    // var database = firebase.database();
    
    // //query database and print result
    // console.log("connecting to firebase");
    // var checkdatabase = database.ref(String(champid));
    // checkdatabase.on("value", (snapshot) => {
    //   console.log("returned", snapshot.val());
    // });
  }

  mounted() {
    // Listen to X button click
    this._closeButton.addEventListener("click", this._showExitMinimizeModal);
    // Listen to minimize click
    this._minimizeHeaderButton.addEventListener("click", () => {
      this.currWindow.minimize();
    });
    // Close app on exit click
    this._exitButton.addEventListener("click", () => {
      //@ts-ignore
    
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

   
  }

  _showExitMinimizeModal() {
    this._modal.style.display = "block";
  }
  _hideExitMinimizeModal() {
    this._modal.style.display = "none";
  }
}
</script>