<template>
    <div>
        Home
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