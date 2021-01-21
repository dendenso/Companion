<template>
    <div class="home-container">
        <h1 class="project-name">League Companion</h1>
        <hr />
      <img
        alt="League Companion"
        class="logo"
        height="300"
        width="300"
        src="https://img.icons8.com/bubbles/500/000000/league-of-legends.png"
      />
      <p>Launch your league client to create overlay</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {

    mounted() {
    console.log('mounted Home')
    }

    created(){
        console.log("I'm Your Home Page")
    }
}


</script>