<template>
  <v-sheet
    width='140'
    class='transparent ma-0 pa-0'
  >
  <!-- [TODO] Automate it -->
<!--  -->
    <v-row class='mt-2' align='center' justify='center'>
      <v-btn :disabled='props.disabled' small icon class='pa-0 font-weight-light transparent' :dark='isDark'>
        <v-icon :color='`${isDark ? "secondary lighten-5" : "white"}`'>mdi-chevron-up-circle</v-icon>
      </v-btn>
    </v-row>
<!--  -->
    <v-row class='ma-0 my-3' align='center' justify='center'>
      <v-chip :class='[`mx-auto px-0 font-weight-thin transparent`, isDark ? `secondary--text text--lighten-4` : `primary--text text--lighten-3`]' :dark='!isDark' disabled x-small>
        <v-icon x-small v-if='getUserBlocked(-2)'>mdi-lock</v-icon>
        {{ getUserName(-2) }}
      </v-chip>
    </v-row>
    <v-row class='ma-0 my-3' align='center' justify='center'>
      <v-chip :class='[`mx-auto px-2 font-weight-light`, isDark ? `secondary lighten-5 secondary--text text--lighten-5` : `primary lighten-1 primary--text text--lighten-4`]' :dark='isDark' disabled outlined>
        <v-icon small v-if='getUserBlocked(-1)'>mdi-lock</v-icon>
        {{ getUserName(-1) }}
      </v-chip>
    </v-row>
    <v-row class='ma-0 mx-auto' align='center' justify='center'>
      <v-chip :class='[`ma-0 font-weight-light`, isDark ? `primary darken-2 primary--text text--lighten-4` : `primary`]' large :dark='isDark'>
        <v-icon v-if='getUserBlocked(0)'>mdi-lock</v-icon>
        <v-col class='pa-0 pt-1 shadow' align='center' justify='center'>
          {{ getUserName(0) }}
        </v-col>
      </v-chip>
    </v-row>
    <v-row class='ma-0 my-3' align='center' justify='center'>
      <!-- <v-chip disabled :class='[`pt-1 mx-auto px-2 font-weight-light`, isDark ? `secondary secondary--text text--lighten-4` : `white white--text`]' :dark='isDark' disabled outlined> -->
      <v-chip :class='[`pt-1 mx-auto px-2 font-weight-light`, isDark ? `secondary lighten-3 secondary--text text--lighten-3` : `primary lighten-1 primary--text text--lighten-4`]' :dark='isDark' disabled outlined>
        <v-icon small v-if='getUserBlocked(+1)'>mdi-lock</v-icon>
        {{ getUserName(+1) }}
      </v-chip>
    </v-row>
    <v-row class='ma-0 my-3' align='center' justify='center'>
      <!-- <v-chip disabled :class='[`pt-1 mx-auto px-0 font-weight-thin transparent`, isDark ? `secondary--text text--lighten-3` : `white white--text`]' :dark='isDark' disabled x-small> -->
      <v-chip :class='[`pt-1 mx-auto px-0 font-weight-thin transparent`, isDark ? `secondary--text text--lighten-2` : `primary--text text--lighten-2`]' :dark='!isDark' disabled x-small>
        <v-icon x-small v-if='getUserBlocked(+2)'>mdi-lock</v-icon>
        {{ getUserName(+2) }}
      </v-chip>
    </v-row>
<!--  -->
    <v-row class='mb-2' align='center' justify='center'>
      <v-btn disabled small icon class='pa-0 font-weight-light transparent' color='primary' :dark='isDark'>
        <v-icon :color='`${isDark ? "secondary lighten-5" : "white"}`'>mdi-chevron-down-circle</v-icon>
      </v-btn>
    </v-row>
<!--  -->
  </v-sheet>
</template>

<script scoped>
  'use strict';
  export default {
    props: ['props'],
    computed: {
      current() {
        return this.props.current;
      },
      isDark() {
        return this.props.isDark;
      },
      users() {
        return this.props.users;
      },
      length() {
        return this.users.length;
      },
    },
    methods: {
      getUser(index) {
        const i = this.current + index;
        return index < 0
          ? this.users[i >= 0 ? i : ((i) + (this.length))]
          : this.users[i <= this.length - 1 ? i : ((i) - (this.length))];
      },
      getUserName(index) {
        return this.getUser(index).name;
      },
      getUserBlocked(index) {
        const user = this.getUser(index);
        // console.log(user.blocked ? index > 1 : user.blocked);

        // v1 [OK]
        return index < 0 ? user.blocked : user.blocked > 1;

        // // v2 [OK]
        // return index < 0 ? user.blocked : index > 1 ? user.blocked : false;
      },
    },
  };
</script>
