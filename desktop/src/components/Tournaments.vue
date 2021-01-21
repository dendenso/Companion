<template>
    <div class="home-container">
        Tournament
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Tournaments extends Vue {

    mounted() {
    console.log('mounted Tour')
    }

    created(){
        console.log("I'm Your Tournament Page")
    }
}
</script>