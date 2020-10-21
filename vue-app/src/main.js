import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import vueHeadful from 'vue-headful';


Vue.use(Buefy)
Vue.component('vue-headful', vueHeadful);

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
    data: {
      $loadCounter: 0,
      $currentUser: null,
      $displayName: "",
      $isLogged: false
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
    created() {
      this.$loadCounter = 0;
      // Initialize Firebase
      //                    if (!firebase.apps.length) {
      //   firebase.initializeApp(firebaseConfig);

      // }
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


