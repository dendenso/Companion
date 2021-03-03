<template>
  <div>
    <h1 style="text-align: center; color: white; padding: 20px">Highlights</h1>
    <hr/>
    <div class="highlights-container">
      <div class="highlights-list">
        <!-- for loop to go through video folders -->
        <div v-for="folder in videoList" :key="folder.folderPath">
          <div class="folder-tab">
            <h2>{{ folder.date }}</h2>
            <h3>{{ folder.time }}</h3>
            <!-- for loop to go through videos in the folder -->
            <div v-for="video in folder.videoList" :key="video.videoAddress">
              <button
                class="video-button"
                @click="setVideo(video.videoAddress)"
              >
                {{ video.videoTime }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- video side -->
      <div class="video-side">
        <!-- used :src to dynamically set video -->
        <video
          height="480px"
          width="720px"
          :src="current_Video"
          controls
          autoplay
        ></video>

        <div class="below-button">
          <button>Previus</button>

          <button>Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//this class represents a video inside a folder
class Video {
  public videoAddress: string;
  public videoTime: string;
  //video type can be added here; assists/kills/whatever is in the vid
}

//this class represents a folder
class VideoFolder {
  //date maybe? can be parsed from the folder name and displayed
  public folderPath: string;
  //need to be changed probably
  public date: string;
  public time: string;
  public videoList: Array<Video> = [];

  constructor() {
    this.folderPath = "";
  }

  setDate(date: string) {
    this.date = date;
  }

  setTime(time: string) {
    this.time = time;
  }
  setFolder(name: string) {
    this.folderPath = name;
  }

  addVideoToFolder(videoURL: string, videoTime: string) {
    let tempVid = new Video();
    tempVid.videoAddress = videoURL;
    tempVid.videoTime = videoTime;
    this.videoList.push(tempVid);
  }
}

@Component
export default class Highlights extends Vue {
  videoList: Array<VideoFolder> = [];
  current_Video = "";

  setVideo(newVideo: string) {
    this.current_Video = newVideo;
  }

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
          let date = new Date(element.substring(78, 88)).toLocaleDateString();
          let time = element.substring(89, 97);

          // make fist video the most recent video
          if(index === res.videos.length - 1){
            self.current_Video = element;
            console.log("actual curr video: ", self.current_Video);
          }
          //check if array of folders is empty
          if (self.videoList.length === 0) {
            //if it is create first element
            let newFolder = new VideoFolder();

            //give it an address
            newFolder.setFolder(path);

            //address is too long so i added the date and time
            newFolder.setDate(date);
            newFolder.setTime(time);

            //add video to array
            newFolder.addVideoToFolder(element, element.substring(131, 136));

            
            //add folder to array of folders
            self.videoList.push(newFolder);
          } else {
            //if its not empty then see if it matches the folder path of the folder at the end
            if (self.videoList[self.videoList.length - 1].folderPath === path) {
              //if it does match then add it to the array of video urls for this folder
              self.videoList[self.videoList.length - 1].addVideoToFolder(
                element,
                element.substring(131, 136)
              );
            } else {
              //if it does not match the folder path then we have a new folder
              //so we create a new folder object, with this new path and add the url to the array

              let newFolder = new VideoFolder();

              //give it an address
              newFolder.setFolder(path);
              //address is too long so i added the date and time
              newFolder.setDate(date);
              newFolder.setTime(time);
              //add video to array
              newFolder.addVideoToFolder(element, element.substring(131, 136));

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