import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import firebase from 'firebase'
import { auth } from './firebase'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import vueHeadful from 'vue-headful';
import EmptyLayout from './layouts/EmptyLayout.vue';
import LayoutDefault from './layouts/LayoutDefault.vue';
import VueMeta from 'vue-meta'


import store from './store/index'

import Vuex from 'vuex'

import VueYouTubeEmbed from 'vue-youtube-embed'

import VueChartsCSS from "vue.charts.css";
import PrimeVue from 'primevue/config';

import Chat from 'vue-beautiful-chat'
 

Vue.use(Chat);
Vue.use(VueChartsCSS);

Vue.use(VueYouTubeEmbed)

Vue.use(Buefy)


Vue.use(Vuex)
Vue.use(VueMeta)
Vue.use(require('vue-moment'));

Vue.use(PrimeVue);

Vue.component('vue-headful', vueHeadful);
Vue.component('layout-default', LayoutDefault);
Vue.component('empty-layout', EmptyLayout);

Vue.config.productionTip = false


let app



if (!app) {


  app = new Vue({
    components: {
      LayoutDefault, EmptyLayout
    },
    data: {

    },
    computed: {
      isLoading() {
        return this.$store.state.loadCounter > 0;
      }
    },
    methods: {
    },
    mounted() {
      //this.$loadCounter = 0;

      this.$store.commit('resetLoader');
      //       //Initialize Firebase
      //       let firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_JSON_CONFIG)
      // try {
      //   if (!firebase.apps.length) {
      //         firebase.initializeApp(firebaseConfig);

      //       }
      // } catch (exception){console.log(exception)} 
      var thisVM = this;
      auth.onAuthStateChanged(() => {

        thisVM.$store.commit('setCurrentUser', auth.currentUser);

      });
    },
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}


