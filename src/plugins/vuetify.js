import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader version '^2.1.1' ,

const vuetify = new Vuetify({
  theme: {
    dark: true, // From 2.0 You have to select the theme dark or light here
    light: false,
  }
});

Vue.use(Vuetify);

export default vuetify;
