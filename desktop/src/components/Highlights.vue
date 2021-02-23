<template>
  <div class="home-container">
    <h1>Highlights</h1>
    <video height="500px" width="600px" controls>
      <source 
      type="video/mp4" 
      src="C:\Users\Molin\Videos\Overwolf\LoL Companion App\League of Legends\League of Legends_02-09-2021_23-19-43-959\League of Legends 02-09-2021 23-21-53-793.mp4" />
    </video>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Highlights extends Vue {
  mounted() {
    console.log("mounted Tour");
    //@ts-ignore
    // overwolf.windows.mediaPlayer.create(200,100,600,800, (e) => { console.log("tag", e);});
  }

  created() {
    // window resize
    let WindowId;
    //@ts-ignore
    overwolf.windows.getCurrentWindow(function (res) {
      console.log(res);
      WindowId = res.window.id;
      console.log("id: ", WindowId);
      let sizeSettings = {
        window_id: WindowId,
        width: 1700,
        height: 800,
        auto_dpi_resize: true, //relevant only for native windows
      };
      //@ts-ignore
      overwolf.windows.changeSize(sizeSettings, console.log);
    });
  }
}
</script>