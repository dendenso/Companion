<template>
  <div>
    <h1 style="text-align: center; color: white; padding: 20px">Highlights</h1>
    <hr />
    <div class="highlights-container">
      <div class="highlights-list">
        <!-- for loop to go through video folders -->
        <div v-for="folder in videoList" :key="folder.date">
          <div class="folder-tab">
            <h2>{{ folder.gameMode }}</h2>
            <h3>{{ folder.date }}</h3>
            <h3>{{ folder.time }}</h3>
            <h3>{{ folder.gameResult }}</h3>
            <img
              :src="setChampion(folder)"
              alt="champion"
              height="100px"
              width="100px"
            />
            <!-- for loop to go through videos in the folder -->
            <div v-for="video in folder.videoList" :key="video.videoAddress">
              <div class="video-button" @click="setVideo(video.videoAddress)">
                <div style="width: 100%;">
                  <div class="video-thumbnail">
                    <img
                      class="recent-champs"
                      :src="video.thumbnail_url"
                      alt="thumbnail"
                      height="75"
                      width="75"
                    /> 
                  </div>
                  <div class="highlight-details">
                    {{ video.highlightType }}<br>
                    {{ video.videoStartTime }}<br>
                    {{ video.duration }}<br>
                    {{ video.highlight }}<br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>Play more to see highlights</div>
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
          <div v-if="checkPreviousVideo(current_Video)"><button v-on:click="getPreviousVideo(current_Video)">Previous</button></div>

          <div v-if="checkNextVideo(current_Video)"><button v-on:click="getNextVideo(current_Video)">Next</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Dexie from "dexie";
import axios from "axios";
// @ts-ignore
import champions from "lol-champions";

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
  public gameMode: string; //regular/aram/practice
  public championURL: string;
  public gameResult: string; //regular/aram/practice

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

  checkNextVideo(video: string)
  {
    var flag = false;
    // check index of video passed
    for (var i = 0; i < this.videoList.length; i++) {
      for (var j = 0; j < this.videoList[i].videoList.length; j++) {
        if (this.videoList[i].videoList[j].videoAddress == video)
        {
          // Make sure this isn't the last video
          if (j != (this.videoList[i].videoList.length - 1))
          {
            // there is a next video
            flag = true;
          }
        }
      }
    }
    return flag;
  }

  checkPreviousVideo(video: string)
  {
    var flag = false;
    // search for the current video to get
    for (var i = 0; i < this.videoList.length; i++) {
      for (var j = (this.videoList[i].videoList.length - 1); j > 0; j--) {
        if (this.videoList[i].videoList[j].videoAddress == video)
        {
          // Make sure this isn't the first video
          if (j != 0)
          {
            // there is a previous video
            flag = true;
          }
        }
      }
    }
    return flag;
  }

  getNextVideo(video: string) {
    // check index of video passed
    for (var i = 0; i < this.videoList.length; i++) {
      for (var j = 0; j < this.videoList[i].videoList.length; j++) {
        if (this.videoList[i].videoList[j].videoAddress == video)
        {
          // Make sure this isn't the last video
          if (j != (this.videoList[i].videoList.length - 1))
          {
            // call setVideo with this next video
            this.setVideo(this.videoList[i].videoList[j+1].videoAddress);
          }
        }
      }
    }
  }

  getPreviousVideo(video: string) {
    // search for the current video to get
    for (var i = 0; i < this.videoList.length; i++) {
      for (var j = (this.videoList[i].videoList.length - 1); j > 0; j--) {
        if (this.videoList[i].videoList[j].videoAddress == video)
        {
          // Make sure this isn't the first video
          if (j != 0)
          {
            // call setVideo with this previous video
            this.setVideo(this.videoList[i].videoList[j-1].videoAddress);
            return true;
          }
        }
      }
    }
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
      console.log(
        "Calling: ",
        "https://na1.api.riotgames.com/lol/match/v4/matches/" +
          recentGames[index].match_id +
          "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9"
      );
      await axios
        .get(
          "https://na1.api.riotgames.com/lol/match/v4/matches/" +
            recentGames[index].match_id +
            "?api_key=RGAPI-c267e3e8-87cd-44fe-89ab-afa8f8fd1dc9"
        )
        .then((result) => {
          console.log("result of riot call: ", result);
          //get game mode
          tempFolder.gameMode = result.data.gameMode;
          console.log("gamemode: ", tempFolder.gameMode);
          //find identity of out user from array;

          if (result.data.participantIdentities.length === 10) {
            for (let k = 0; k < result.data.participantIdentities.length; k++) {
              //if participant identity matches namev in local storage
              //if participant identities dont exist then it was a practice game

              if (
                result.data.participantIdentities[k].player.summonerName ===
                window.localStorage.getItem("localUsername")
              ) {
                //get game outcome
                if (result.data.participants[k].stats.win === true) {
                  tempFolder.gameResult = "Victory";
                } else {
                  tempFolder.gameResult = "Defeat";
                }

                //get champion used
                for (let l = 0; l < champions.length; l++) {
                  if (
                    champions[l].key ===
                    String(result.data.participants[k].championId)
                  ) {
                    tempFolder.championURL = champions[l].icon;
                    break;
                  }
                }

                break;
              }
            }
          } else {
            tempFolder.gameResult = "Win";
            //get champion used
            for (let l = 0; l < champions.length; l++) {
              if (
                champions[l].key ===
                String(result.data.participants[0].championId)
              ) {
                tempFolder.championURL = champions[l].icon;
                break;
              }
            }
          }
        });
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
        if (!setFirstVideo) {
          self.current_Video = videosInMatch[urls].media_url;
          setFirstVideo = true;
        }
        tempVideo.videoAddress = videosInMatch[urls].media_url;
        tempVideo.videoStartTime = new Date(
          videosInMatch[urls].highlight_start_time
        ).toLocaleTimeString();
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
        .equals(recentGames[index].match_id)
        .delete()
        .then((deleteCount) => {
          console.log("Deleted older highlights videos: ", deleteCount);
        })
        .catch((e) => console.log(e));
    }

    //get all other games
    await localDB
      .table("matches")
      .orderBy("match_start_time")
      .reverse()
      .offset(5)
      .delete()
      .then((deleteCount) => {
        console.log("Deleted old match data", deleteCount);
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