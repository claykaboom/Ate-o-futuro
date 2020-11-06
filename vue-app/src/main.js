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

import VueAnalytics from 'vue-analytics'

import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)
Vue.use(VueAnalytics, {
  id: 'G-GFYJ74SRBH',router
})

Vue.use(Buefy)
Vue.component('vue-headful', vueHeadful);
Vue.component('layout-default', LayoutDefault);
Vue.component('empty-layout', EmptyLayout);

Vue.config.productionTip = false


let app
// auth.onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       router,
//       store,
//       render: h => h(App)
//       ,
//       methods: {
//         startLoading: function () {  
//           if (this.$loadCounter < 0) {
//             //no caso de terem usado mais stopLoading do que startLoading
//             this.$loadCounter = 0;
//           }
//           this.$loadCounter++;
//         },
//         stopLoading() {
//           this.$loadCounter--; 
//           if (this.$loadCounter < 0) {
//             //no caso de terem usado mais stopLoading do que startLoading
//             this.$loadCounter = 0;
//           }
//         },
//         resetLoader() {
//           this.$loadCounter = 0;
//         }
//       }}).$mount('#app')
//   }
// })


if (!app) {


  app = new Vue({
    components: {
      LayoutDefault,EmptyLayout
    },
    data: {
      $loadCounter: 0,
      $currentUser: null,
      $displayName: "",
      $isLogged: false

    },
    computed: {
      isLoading() {
        return this.$loadCounter > 0;
      }
    },
    methods: {
      startLoading: function () {
        if (this.$loadCounter < 0) {
          //no caso de terem usado mais stopLoading do que startLoading
          this.$loadCounter = 0;
        }
        this.$loadCounter++;
      },
      stopLoading() {
        this.$loadCounter--;
        if (this.$loadCounter < 0) {
          //no caso de terem usado mais stopLoading do que startLoading
          this.$loadCounter = 0;
        }
      },
      resetLoader() {
        this.$loadCounter = 0;
      }
    },
    mounted() {
      this.$loadCounter = 0;
      //       //Initialize Firebase
      //       let firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_JSON_CONFIG)
      // try {
      //   if (!firebase.apps.length) {
      //         firebase.initializeApp(firebaseConfig);

      //       }
      // } catch (exception){console.log(exception)} 

      auth.onAuthStateChanged(() => {

        this.$isLogged = auth.currentUser != null;
        this.$currentUser = null;
        this.$displayName = "";
        if (this.$isLogged) {
          this.$currentUser = auth.currentUser;
          this.$displayName = this.$currentUser.displayName;
        }
      });
    },
    router,
    render: h => h(App)
  }).$mount('#app')
}


