<template>
  <v-app class='fluid ma-0 pa-0'>
    <v-content class='fluid transparent ma-0 pa-0'>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script scoped>
  export default {
    name: 'App',
  };
</script>

<style>
  *,
  *:after, *:before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
/*
  *:active {

  }
*/
  html {
    overflow: hidden !important;
  }

  body {
    width: 100%;
    height: auto;
    cursor: default !important;
  }

  .bgColor--dark {
    background-color: rgba(10, 60, 100, 0.15);
    filter: grayscale(0.5);
  }

  .bgColor--light {
    background-color: rgba(10, 60, 100, 0.95);
  }

  .v-card:not(.v-sheet--tile):not(.v-card--shaped), .v-card {
    border-radius: 0.6vw !important;
  }

  .shadow {
    filter: drop-shadow(0px 0px 3px black);
  }

  .active {
    animation: activeAnimation ease .5s infinite;
  }

  @keyframes activeAnimation {
    75% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1.7);
    }
  }
</style>
