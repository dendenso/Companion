<template>
    <div>
        <!-- Here we would display data we recieved from the launcher 
        such as username, level, rank, icon-->
        Stats for champion<br>
        TEST
        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Stats extends Vue {

    mounted() {
    console.log('mounted Stats')
    }

    created(){
        console.log("I'm Your Stats Page")
    }
}


</script>