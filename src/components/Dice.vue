<template>
  <v-icon
    :dark='!props.isDark'
    :class='[props.isBusy ? `v-chip--disabled` : props.isDark ? `secondary--text text--lighten-5` : `white--text`]'
    :key='`dice-icon-${props.value}`'
    large
  >
    mdi-dice-{{ props.value }}
  </v-icon>
</template>

<script scoped>
  'use strict';
  export default {
    props: ['props'],
  };
</script>
