<template>
  <div class="home-container">Tournament</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Tournaments extends Vue {
  mounted() {
    console.log("mounted Tour");
  }

  created() {
    let WindowId;
    //@ts-ignore
    overwolf.windows.getCurrentWindow(function (res) {
      console.log(res);
      WindowId = res.window.id;
    console.log("id: ", WindowId)
    //@ts-ignore

      overwolf.windows.setMinSize(WindowId, 1700, 800, (res) => {
        console.log("set min size", res);
      });
    });
  }
}
</script>