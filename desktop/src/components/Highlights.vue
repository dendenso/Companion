<template>
  <div>
    <h1 style="text-align: center; color: white; padding: 20px">Highlights</h1>
    <div class="highlights-container">
      <div class="highlights-list">
        <!-- for loop to go through video folders -->
        <div v-for="folder in videoList" :key="folder.folderPath">
          <h2>Folder : {{ folder.folderPath }}</h2>
          <!-- for loop to go through videos in the folder -->
          <div v-for="video in folder.videoList" :key="video">
            <p>{{ video }}</p>
          </div>
        </div>
      </div>
      <!-- video side -->
      <div class="video-side">
        <!-- used :src to dynamically set video -->
        <video height="480px" width="720px" :src="current_Video" controls>
          =
        </video>

        <div class="vid-button">
          <button>Previus</button>

          <button>Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//array of video addresses
class VideoFolder {
  //date maybe? can be parsed from the folder name and displayed
  public folderPath: string;
  public videoList: Array<string> = [];

  constructor() {
    this.folderPath = "";
  }

  setFolder(name: string) {
    this.folderPath = name;
  }

  addVideoToFolder(videoURL: string) {
    this.videoList.push(videoURL);
  }
}

@Component
export default class Highlights extends Vue {
  videoList: Array<VideoFolder> = [];
  current_Video =
    "overwolf://media/videos/LoL+Companion+App/League+of+Legends/League+of+Legends_02-09-2021_23-19-43-959/League+of+Legends+02-09-2021+23-21-53-793.mp4";

  mounted() {
    let self = this;
    // //@ts-ignore
    // //delete videos if more than a gigabyte
    // NEED TO RUN THIS IN A WAY IT HAPPENS BEFORE GETVIDEOS
    // overwolf.media.videos.deleteOldVideos(1, e => {
    //   console.log("deleted videos", e)
    // })
    //fetch recent videos

    console.log("current video: ", self.current_Video);
    //@ts-ignore'

    overwolf.media.videos.getVideos(function (res) {
      console.log("result from Get Vidoes", res);

      //parse possible videos
      //if successfully recieved
      if (res.status === "success") {
        //start gathering video urls by looping through them
        for (let index = 0; index < res.videos.length; index++) {
          const element = res.videos[index];

          //get folder path
          let path = element.substring(0, 102);

          //check if array of folders is empty
          if (self.videoList.length === 0) {
            //if it is create first element
            let newFolder = new VideoFolder();

            //give it an address
            newFolder.setFolder(path);

            //add video to array
            newFolder.addVideoToFolder(element);

            // make fist video the most recent video
            self.current_Video = element;
            console.log("actual curr video: ", self.current_Video);
            //add folder to array of folders
            self.videoList.push(newFolder);
          } else {
            //if its not empty then see if it matches the folder path of the folder at the end
            if (self.videoList[self.videoList.length - 1].folderPath === path) {
              //if it does match then add it to the array of video urls for this folder
              self.videoList[self.videoList.length - 1].addVideoToFolder(
                element
              );
            } else {
              //if it does not match the folder path then we have a new folder
              //so we create a new folder object, with this new path and add the url to the array

              let newFolder = new VideoFolder();

              //give it an address
              newFolder.setFolder(path);

              //add video to array
              newFolder.addVideoToFolder(element);

              //add folder to array of folders
              self.videoList.push(newFolder);
            }
          }
        }
      } else {
        console.log("Error getting videos");
      }

      console.log("Parsed Vidoes:", self.videoList);
    });
  }

  created() {
    // window resize
    let WindowId;
    //@ts-ignore
    overwolf.windows.getCurrentWindow(function (res) {
      WindowId = res.window.id;
      console.log("Window id: ", WindowId);
      let sizeSettings = {
        window_id: WindowId,
        width: 1600,
        height: 800,
        auto_dpi_resize: true, //relevant only for native windows
      };
      //@ts-ignore
      overwolf.windows.changeSize(sizeSettings, (e) => {
        console.log("change size callback: ", e);
      });
    });
  }
}
</script>