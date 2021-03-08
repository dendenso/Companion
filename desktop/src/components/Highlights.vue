<template>
  <div>
    <h1 style="text-align: center; color: white; padding: 20px">Highlights</h1>
    <hr />
    <div class="highlights-container">
      <div class="highlights-list">
        <!-- for loop to go through video folders -->
        <div v-for="folder in videoList.slice().reverse()" :key="folder.date">
          <div class="folder-tab">
            <h2>{{ folder.date }}</h2>
            <h3>{{ folder.time }}</h3>
            <!-- for loop to go through videos in the folder -->
            <div v-for="video in folder.videoList" :key="video.videoAddress">
              <div class="video-button" @click="setVideo(video.videoAddress)">
                {{ video.highlightType }}<br>
                {{ video.videoStartTime }}<br>
                {{ video.duration }}<br>
                {{ video.highlight }}<br>
                <img
                  class="recent-champs"
                  :src="video.thumbnail_url"
                  alt="thumbnail"
                  height="75"
                  width="75"
                />
              </div>
            </div>
          </div>
        </div>
        <div>test</div>
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
import Dexie from "dexie";

//this class represents a video inside a folder
class Video {
  public videoAddress: string;
  public videoStartTime: string;
  public duration: string;
  public highlightType: string;
  public thumbnail_url: string;
}

//this class represents a folder
class VideoFolder {
  //if we query match id with riot we can probabyly get matchtype and champion used
  public gameType: string; //regular/aram/practice
  public champion: string; //url of champion img

  //below is received from database
  public date: string;
  public time: string;
  public videoList: Array<Video> = [];

  setDate(date: string) {
    this.date = date;
  }

  setTime(time: string) {
    this.time = time;
  }

  addVideoToFolder(video: Video) {
    this.videoList.push(video);
  }
}

@Component
export default class Highlights extends Vue {
  videoList: Array<VideoFolder> = [];
  current_Video = "";

  setVideo(newVideo: string) {
    this.current_Video = newVideo;
  }

  async mounted() {
    let self = this;
    let setFirstVideo = false;
    //fetch recent videos

    //open local database
    var localDB = new Dexie("highlightsDB");
    localDB.version(1).stores({
      matches: "match_id, match_start_time",
      videos:
        "media_url, match_id, thumbnail_url, highlight_start_time, duration, hightType",
    });

    //get last 5 most recent games
    const recentGames = await localDB
      .table("matches")
      .orderBy("match_start_time")
      .reverse()
      .limit(5)
      .toArray()
      .catch((e) => console.log(e));

    //get all other games
    const olderGames = await localDB
      .table("matches")
      .orderBy("match_start_time")
      .reverse()
      .offset(5)
      .toArray()
      .catch((e) => console.log(e));

    //display results
    console.log("array of recent games: ", recentGames);
    console.log("array of older games: ", olderGames);

    //loop through last 5 games and use game id's to pull data
    //@ts-ignore
    for (let index = 0; index < recentGames.length; index++) {
      let match_date = new Date(recentGames[index].match_start_time);

      //create new match
      let tempFolder = new VideoFolder();

      //set date and time from the database
      tempFolder.setDate(match_date.toDateString());
      tempFolder.setTime(match_date.toLocaleTimeString());

      //get all the videos with matching ids
      let videosInMatch = await localDB
        .table("videos")
        .where("match_id")
        .equals(recentGames[index].match_id)
        .toArray()
        .catch((e) => console.log(e));
      console.log("Videos Found: ", videosInMatch);

      //@ts-ignore
      for (let urls = 0; urls < videosInMatch.length; urls++) {
        let tempVideo = new Video();

        // console.log("duration: ", new Date  (videosInMatch[urls].duration).getSeconds()+"s");
        // console.log("highlight_start_time: ", new Date  (videosInMatch[urls].highlight_start_time).toLocaleTimeString());
        // console.log("hightType: ", videosInMatch[urls].hightType.charAt(0).toUpperCase() + videosInMatch[urls].hightType.slice(1)); //make first letter uppercase
        // console.log("media_url: ", videosInMatch[urls].media_url);
        // console.log("thumbnail_url: ",videosInMatch[urls].thumbnail_url); 
        if(!setFirstVideo){
          self.current_Video = videosInMatch[urls].media_url;
          setFirstVideo = true;
        }
        tempVideo.videoAddress = videosInMatch[urls].media_url;
        tempVideo.videoStartTime = new Date  (videosInMatch[urls].highlight_start_time).toLocaleTimeString();
        tempVideo.duration =
          new Date(videosInMatch[urls].duration).getSeconds() + "s";
        tempVideo.highlightType =
          videosInMatch[urls].hightType.charAt(0).toUpperCase() +
          videosInMatch[urls].hightType.slice(1); //make first letter uppercase
        tempVideo.thumbnail_url = videosInMatch[urls].thumbnail_url;

        tempFolder.addVideoToFolder(tempVideo);
      }

      self.videoList.push(tempFolder);
    }


    //after this all the data is being displayed
    //but now we need to delete the older games, so they dont pollute the database
    //loop through older games and use game id's to delete data
    //@ts-ignore
    for (let index = 0; index < olderGames.length; index++) {

      //get all the videos with matching ids
       let olderVideos = await localDB
        .table("videos")
        .where("match_id")
        .equals(olderGames[index].match_id)
        .toArray()
        .catch((e) => console.log(e));
      console.log("Older Videos Found: ", olderVideos);

      //loop through video adresses in matches
      //@ts-ignore
      for (let urls = 0; urls < olderVideos.length; urls++) {
        //delete actual videos from local disk using overwolf
        //@ts-ignore
        overwolf.media.videos.deleteVideo(olderVideos[urls].media_url);
      }

      //then remove them from the videos database
      localDB
        .table("videos")
        .where("match_id")
        .equals(recentGames[index].match_id).delete().then( (deleteCount) => {
        console.log("Deleted older highlights videos: ", deleteCount);
      }).catch( e=> console.log(e));
    }

    //get all other games
    await localDB
      .table("matches")
      .orderBy("match_start_time")
      .reverse()
      .offset(5).delete()
      .then( (deleteCount) => {
        console.log("Deleted old match data", deleteCount)
      })
      .catch((e) => console.log(e));


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