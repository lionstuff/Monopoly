<template>
  <v-row class='pa-1 mx-auto fill-height' align='center' justify='center' :wrap='false'>

    <!-- #BEGIN Roll List Section -->
    <v-row class='mx-auto d-flex fill-height mt-auto mb-0' align='end' justify='space-between' :wrap='false'>
      <v-list
        :dark='isDark'
        class='pa-0 transparent'
        dense
        heigth='100%'
        subheader
        v-if='list.items.length'
        width='100%'
      >
        <v-list-item
          :dark='isDark'
          :key='`list-item-${users[current].name}-${i}`'
          class='mx-auto pa-0 transparent'
          dense
          v-for='(item, i) in list.items'
          v-if='i !== list.items.length - 1'
        >
          <v-list-item-content :class='[`mx-auto pa-0`, getActive(list.items[i]) ? `transparent` : i !== list.items.length - 2 ? `v-chip v-chip--disabled` : ``]' :key='`list-item-content-${i}-${users[current].name}`'>
            <v-row align='center' justify='center' class='fill-height mx-auto ma-0' :key='`list-item-row-${i}-${users[current].name}`' :wrap='false'>
              <v-col cols='auto' align='start' justify='center' class='ma-0 mx-auto pa-0' :key='`list-item-col-${i}-${users[current].name}`'>
                <dice
                  :key='`list-item-dice-${i}-${d}-${value}-${users[current].name}`'
                  :props='{ value, isDark }'
                  class='shadow'
                  v-for='(value, d) in item'
                />
              </v-col>
              <v-spacer/>
              <v-col cols='auto' align='end' class='pa-1'>
                <v-btn
                  :class='[`ma-0 pa-0 body-1 font-weight-thin shadow`, isDark ? `secondary--text text--lighten-5` : `white--text`]'
                  :dark='isDark'
                  :key='`list-item-btn-${i}-${users[current].name}`'
                  fab
                  outlined
                  x-small
                >
                  {{ list.users[i].name[0] }}
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-row>
    <!-- #END Roll List Section -->

    <!-- #BEGIN Divider -->
    <v-col
      cols='auto'
      class='px-auto fill-height'
      align='center'
      justify='center'
      v-if='list.items.length > 1'
    >
      <v-divider :dark='!isDark' vertical/>
    </v-col>
    <!-- #END Divider -->

    <!-- #BEGIN Settings Section -->
    <v-col cols='auto' align='center' justify='center' :class='[`pa-0 title shadow font-weight-light`, isDark ? `secondary--text text--lighten-4` : `white--text`]'>
      <v-select
        :class='[isDark ? `primary--text text--darken-1` : `white--text`]'
        :dark='!isDark'
        :items='dices'
        @change='selectDices'
        dense
        label='Кубиков:'
        outlined
        prepend-icon='mdi-dice-multiple'
        v-model='count'
      />
      Ход №: {{ step }}
    </v-col>
    <!-- #END Settings Section -->

    <!-- #BEGIN Divider -->
    <v-col
      cols='auto'
      class='px-auto fill-height'
      align='center'
      justify='center'
    >
      <v-divider :dark='!isDark' vertical/>
    </v-col>
    <!-- #END Divider -->

    <!-- #BEGIN Dice Section -->
    <v-col cols='auto' align='center' justify='center' class='pa-0'>
      <v-row
        :wrap='false'
        align='center'
        class='ma-0'
        justify='center'
        v-if='list.items.length'
      >
        <dice
          :class='[`ma-${7-count}`, !isBusy ? getActive(dice.numbers) ? `active` : `` : ``]'
          :key='`dice-${value}-${d}-${users[current].name}`'
          :props='{ value, isBusy, isDark }'
          :style='{ "filter": "drop-shadow(0px 0px " + `${7 - count}` + "px black)", "transform": "scale(1." + `${10 - count}` + ")" }'
          v-for='(value, d) in dice.numbers'
        />
      </v-row>

      <v-divider :dark='!isDark' class='mt-4' v-if='list.items.length'/>

      <v-row
        :class='[`my-4 display-1 shadow`, isBusy ? isDark ? `v-chip v-chip--disabled secondary--text text--lighten-5` : `v-chip v-chip--disabled secondary--text text--lighten-5` : `white--text`]'
        :key='`total-${users[current].name}-${users.length}${isBusy ? "-busy" : ""}`'
        align='center'
        justify='center'
        v-if='list.items.length'
      >
        {{ getTotal() }}
      </v-row>

      <v-btn
        :class='[`rollBtn`, !isBusy ? isDark ? `primary darken-1 primary--text text--lighten-4` : `primary` : ``]'
        :dark='isDark'
        :key='`rollBtn-${users[current].name}-${users.length}`'
        :loading='isBusy'
        :disabled='isBusy'
        :outlined='isBusy'
        @click='random()'
        block
        large
        ref='rollBtn'
      >
        <v-row class='shadow ma-0 pa-0 mx-auto font-weight-light' align='center' justify='center'>
          бросок
        </v-row>
      </v-btn>
    </v-col>
    <!-- #END Dice Section -->

    <!-- #BEGIN Divider -->
    <v-col
      cols='auto'
      class='px-auto fill-height'
      align='center'
      justify='center'
    >
      <v-divider :dark='!isDark' vertical/>
    </v-col>
    <!-- #END Divider -->

    <!-- #BEGIN Users List Section -->
    <v-col
      cols='auto'
      align='center'
      justify='center'
      class='pa-0 overline d-flex align-center justify-center'
    >
      <v-row align='center' justify='center' class='pa-0'>
        <users-list :props='{ users, current, disabled: !list.items.length, isDark }'/>
      </v-row>
      <v-row :class='[`d-flex ma-0 pa-0 fill-height align-end justify-start mt-auto mb-0 shadow font-weight-light`, isDark ? `secondary--text text--lighten-4` : `white--text`]'>
        {{ users.length }}
      </v-row>
    </v-col>
    <!-- #END Users List Section -->

    <!-- #BEGIN Divider -->
    <v-col
      cols='auto'
      class='px-auto fill-height'
      align='center'
      justify='center'
    >
      <v-divider :dark='!isDark' vertical/>
    </v-col>
    <!-- #END Divider -->

    <!-- #BEGIN Game Controls Section -->
    <v-col cols='auto' class='mx-auto pa-0' align='center' justify='center'>
      <v-col
        cols='auto'
        class='pa-0'
        align='center'
        justify='center'
        v-for='(btn, b) in [
          { icon: isDark ? "mdi-lightbulb" : "mdi-lightbulb-on-outline", click: () => dark() },
          { icon: `mdi-restart`, click: () => init() }
        ]'
        :key='`btn-${b}-${btn.icon}`'
      >
        <v-btn
          :class='[isDark ? `secondary--text text--lighten-5` : `white--text`]'
          :dark='isDark'
          @click.stop='btn.click()'
          icon
        >
          <v-icon>{{ btn.icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-col>
    <!-- #END Game Controls Section -->
  </v-row>
</template>

<script scoped>
  'use strict';
  export default {
    props: ['props'],
    data: () => ({
      userName: 'lionstuff',
      dices: [1, 2, 3, 4, 5],
      rollBtn: null,

      count: 2,
      step: 0,
      dice: {
        numbers: [],
        double: 0,
      },
      list: {
        items: [],
        users: [],
      },
      // #begin user
      users: [],
      current: 0,
      // #end user

      // busy: false,
      delay: 0,
      interval: 0,
      ms: 0,
      stop: 0,
      timer: 0,
    }),

    methods: {
      defaultState: () => ({
        count: 2,
        step: 0,
        dice: {
          numbers: [],
          double: 0,
        },
        list: {
          users: [],
          items: [],
        },
        // #begin user
        users: [],
        current: 0,
        // #end user

        // busy: false,
        delay: 0,
        interval: 0,
        ms: 0,
        stop: 0,
        timer: 0,
      }),

      setDice() { // [OK]
        if (this.list.items.length > 10) {
          this.list.items.shift();
          this.list.users.shift();
        }

        this.list.items.push(Object.values(this.dice.numbers));
        this.list.users.push(this.users[this.current]);

        // begin simulation
        if (Math.random() > 0.38 && Math.random() < 0.62) {
          const money = Math.round(Math.random() * `1e${Math.round(Math.random() * 3)+0}`);
          let victim = Math.abs(Math.round(Math.random() * (this.users.length - 1)));

          while (victim === this.current) {
            victim = Math.abs(Math.round(Math.random() * (this.users.length - 1)));
          }

          if (Math.random() > 0.62) {
            this.users[this.current].balance += money;
            this.users[victim].balance -= money;
          } else {
            this.users[this.current].balance -= money;
            this.users[victim].balance += money;
          }

          if (this.users[this.current].balance <= 0) {
            this.users.splice(this.current, 1);
          }

          if (this.users[victim].balance <= 0) {
            this.users.splice(victim, 1);
          }
        }
        // end simulation

        const isDouble = this.getActive(this.dice.numbers);
        if (!isDouble) {
          this.users[this.current].blocked = 0;
          this.setCurrent();
          this.dice.double = 0;
        } else {
          if (this.dice.double < 2) {
            this.dice.double++;
          } else {
            // set user to prison
            this.users[this.current].blocked = 2;
            console.log('[PRISON]:', this.users[this.current].name, 'is blocked.', this.users[this.current].balance, this.users[this.current].balance * 0.1, this.users[this.current].balance -= parseInt(this.users[this.current].balance * 0.1));
            this.dice.double = 0;
            this.setCurrent();
          }
        }

        this.step++;

        this.delay = 0;

        clearTimeout(this.timer);
        this.timer = null;

        if (!this.isBusy) {
          this.$nextTick(() => {
            const btn = document.querySelector('.rollBtn');
            btn.focus();
          });
        }
      },

      startAnimation() { // [OK]
        clearTimeout(this.timer);
        this.timer = null;
        // if (!this.isBusy) {
          this.timer = setTimeout(() => { // [OK]
            this.delay = Math.round(Math.random() * 50);
            for (let i = 0; i < this.count; i++) {
              this.dice.numbers[i] = Math.round(Math.random() * 5) + 1;
            }

            this.list.items.pop();
            this.list.items.push(Object.values(this.dice.numbers));

            this.ms += Math.round(Math.random() * 1e2);

            if (this.ms >= this.interval || (Date.now() >= this.stop)) {
              this.ms = 0;
              // this.isBusy = false;
              this.setDice();
              clearTimeout(this.timer);
              this.timer = null;
              setTimeout(() => {
                if (this.users.length === 1) {
                  clearTimeout(this.timer);
                  this.timer = null;
                  // this.isBusy = false;
                  alert(`${this.users[0].name} (${this.users[0].balance}) win!`);
                  return;
                }
                if (this.timer == null && this.isBusy) {
                  setTimeout(() => this.random(), 1e3);
                }
              }, 1e3);
            } else {
              clearTimeout(this.timer);
              this.timer = null;
              this.startAnimation();
            }
          }, this.delay);
        // }
      },

      setCurrent() { // [OK]
        if (this.current >= this.users.length - 1) {
          this.current = 0;
        } else {
          this.current++;
        }
        if (this.users[this.current].blocked) {
          this.users[this.current].blocked--;
          console.log(this.current, this.users[this.current].blocked);
          this.setCurrent();
        }
      },

      random() { // [OK]
        // this.isBusy = true;
        this.interval = Math.round(Math.random() * 1e3) + 500;
        this.stop = Date.now() + this.interval;
        console.log(this.users[this.current].name, this.users[this.current].balance);
        this.startAnimation();
      },

      selectDices(n) { // [OK]
        this.count = n;
        this.dice.numbers = [];
      },

      getActive(numbers) { // [OK]
        const values = Object.values(numbers);
        if (values.length > 1) {
          return values.every(item => item === values[0] && values[0] !== 'undefined');
        }
      },
      getTotal() {
        if (this.dice.numbers.length) {
          return this.dice.numbers.reduce((total = 0, amount = 0) => total += amount);
        }
      },
      init() {
        // this.isBusy = false;
        clearTimeout(this.timer);
        this.timer = null;

        Object.assign(this.$data, this.defaultState());

        const user = { name: this.userName, balance: 2000, blocked: 0 };
        this.users.push(user);

        for (let i = 1; i <= 5; i++) {
          const user = { name: `User ${i}`, balance: 2000, blocked: 0 };
          this.users.push(user);
        }

        // this.random();
      },
      dark() {
        this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      },
    },
    computed: {
      isDark() {
        return this.$vuetify.theme.isDark;
      },
      isBusy() {
        const user = this.users[this.current];
        return user.name !== this.userName || user.blocked > 0;
      }
      // getColor() {
      //   return `#${Math.round(Math.random() * 1e7).toString(16)}`;
      // },
    },

    mounted() {
      this.dark();
      const date = new Date();
      if (date.getHours() >= 20) {
        this.dark();
      }
      this.init();
    },
    beforeDestroy() {
      clearTimeout(this.timer);
      this.timer = null;
    },
  };
</script>
