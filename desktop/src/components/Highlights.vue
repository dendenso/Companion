<template>
  <div class="home-container">
    <h1>Highlights</h1>
    




    <video height="500px" width="600px" controls>
      <source 
      type="video/mp4" 
      src="overwolf://media/videos/LoL+Companion+App/League+of+Legends/League+of+Legends_02-09-2021_23-19-43-959/League+of+Legends+02-09-2021+23-21-53-793.mp4" />
    </video>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//array of video addresses
class VideoFolder{
  //date maybe? can be parsed from the folder name and displayed
  public folderPath:string;
  public videoList : Array<string> = [];

  constructor(){
    this.folderPath = "";
  }

  setFolder(name:string){
    this.folderPath = name;
  }

  addVideoToFolder(videoURL:string){
    this.videoList.push(videoURL);
  }
}

@Component
export default class Highlights extends Vue {

  videoList : Array<VideoFolder> = [];


  mounted() {
    let self = this;
    // //@ts-ignore
    // //delete videos if more than a gigabyte 
    // NEED TO RUN THIS IN A WAY IT HAPPENS BEFORE GETVIDEOS
    // overwolf.media.videos.deleteOldVideos(1, e => {
    //   console.log("deleted videos", e)
    // })
    //fetch recent videos
    //@ts-ignore
    overwolf.media.videos.getVideos(function (res) {
      console.log("result from Get Vidoes", res);
      
      //parse possible videos
      //if successfully recieved
      if(res.status === "success"){
        //start gathering video urls by looping through them
        for (let index = 0; index < res.videos.length; index++) {
          const element = res.videos[index];
          
          //get folder path
          let path = element.substring(0,102);

          //check if array of folders is empty
          if( self.videoList.length === 0){
            //if it is create first element
            let newFolder = new VideoFolder();

            //give it an address
            newFolder.setFolder(path);

            //add video to array
            newFolder.addVideoToFolder(element);
            
            //add folder to array of folders
            self.videoList.push(newFolder);
          } else {
            //if its not empty then see if it matches the folder path of the folder at the end
            if(self.videoList[self.videoList.length - 1].folderPath === path){
              //if it does match then add it to the array of video urls for this folder
              self.videoList[self.videoList.length -1].addVideoToFolder(element);

            }else{
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

        console.log("Parsed Vidoes:", self.videoList)

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
        width: 1700,
        height: 800,
        auto_dpi_resize: true, //relevant only for native windows
      };
      //@ts-ignore
      overwolf.windows.changeSize(sizeSettings, e =>{
        console.log("change size callback: ",  e)
      });
    });
  }
}
</script>