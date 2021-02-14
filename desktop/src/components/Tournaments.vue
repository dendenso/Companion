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
    // window resize
    let WindowId;
    //@ts-ignore
    overwolf.windows.getCurrentWindow(function (res) {
      console.log(res);
      WindowId = res.window.id;
      console.log("id: ", WindowId)
      let sizeSettings = {
        "window_id": WindowId,
        "width":1700,
        "height":800,
        "auto_dpi_resize":true //relevant only for native windows
      };
      //@ts-ignore
      overwolf.windows.changeSize(sizeSettings ,console.log);
    });
  }
}
</script>