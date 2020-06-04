<template>
  <v-container fluid :class='[`fill-height bgColor--${isDark ? "dark" : "light"}`]'>
    <v-row align='center' justify='center' class='ma-0 pa-0 mx-auto transparent'>
      <v-col cols='auto' class='pa-0 v-card' align='center' justify='center' style='background-color: rgba(0, 0, 0, .1); overflow: hidden;'>
        <!-- <v-sheet height='59vh' width='77vw' class='ma-0 pa-0 mx-auto v-card' style='background-color: rgba(0, 0, 0, .1); overflow: hidden;'> -->
          <dice-place/>
        <!-- </v-sheet> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script scoped>
  'use strict';
  export default {
    data: () => ({
    }),
    computed: {
      isDark() {
        return this.$vuetify.theme.isDark;
      },
    },
  };
</script>
