import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

// import plugins from './plugins';
import modules from './modules';

Vue.use(Vuex);

// Create a new store
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  mutations,
  state,
  // plugins,
  modules,
});

export default store;
