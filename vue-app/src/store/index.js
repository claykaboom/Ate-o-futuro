import Vue from 'vue'
import Vuex from 'vuex'

import { db } from "../firebase";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    displayName: "",
    currentUserStats: null,
    isLogged: false,
    loadCounter: 0,
    isLoading: false,
    notificationCounter: 0,
    currentLoginStreak: 0,
    currentUserIsExpert: false,
    currentUserIsPremium: false,
    currentUserLinkedInURL: null,
    currentUserProfilePicURL: "https://source.unsplash.com/featured/?paint"
  },
  mutations: {
    setNotificationCounter(state, newValue) {
      if (state.notificationCounter < newValue) {
        var audio = new Audio(require("../assets/sounds/notification.mp3")); // path to file
        audio.volume = 0.3;
        audio.play();

      }
      state.notificationCounter = newValue;
    },
    landOnTheSite(state) {
      state.justLanded = false;
    },
    startLoading: function (state) {
      if (state.loadCounter < 0) {
        //no caso de terem usado mais stopLoading do que startLoading
        state.loadCounter = 0;
      }
      state.loadCounter++;
      state.isLoading = true;
    },
    stopLoading(state) {
      state.loadCounter--;
      if (state.loadCounter <= 0) {
        //no caso de terem usado mais stopLoading do que startLoading
        state.loadCounter = 0;
        state.isLoading = false;
      }
    },
    resetLoader(state) {
      state.loadCounter = 0;
      state.isLoading = false;
    },
    setCurrentUser(state, newValue) {
      if (this.debug) console.log('setCurrentUser triggered with', newValue)
      state.currentUser = newValue;
      if (newValue != null) {
        state.displayName = this.state.currentUser.displayName;
        state.isLogged = true;

        db.ref(`Users/${newValue.uid}/PersonalData`)
          .update({ stub: 1 });
        db.ref(`Users/${newValue.uid}/stats`)
          .update({ stub: 1 });
        db.ref(`Users/${newValue.uid}/clientLogins`)
          .update({ LastClientDate: Date.now() });

        var userDataRef = db
          .ref(`Users/${state.currentUser.uid}/PersonalData`);


        userDataRef.on("value", function (snapshot) {
          var data = snapshot.val();
          // thisVM.miniBio = data.miniBio ? data.miniBio : null;
          state.currentUserIsExpert = data.isExpert ? data.isExpert : false;
          state.currentUserIsPremium = data.isExpert ? data.isExpert : false;
          state.currentUserLinkedInURL = data.linkedInURL ? data.linkedInURL : null;
          state.currentUserProfilePicURL = data.photoURL
            ? data.photoURL
            : "https://source.unsplash.com/featured/?paint"

          //thisVM.whatsAppNumber = data.whatsAppNumber ? data.whatsAppNumber : null;

          //thisVM.areas = data.areas ? data.areas : [];

          // thisVM.photoURL = data.photoURL
          //   ? data.photoURL
          //   : "https://source.unsplash.com/featured/?paint";

          //  thisVM.$buefy.toast.open(`Dados de usuário carregados!`);



        });

        var userStreakRef = db
          .ref(`Users/${state.currentUser.uid}/stats/_count_LoginStreak`);


        userStreakRef.on("value", function (snapshot) {
          var data = snapshot.val();
          if (data != null) {
            state.currentLoginStreak = data;
          }
          else {
            state.currentLoginStreak = 0;
          }
        });




      }
      else {

        state.displayName = "";
        state.isLogged = false;
      }
    },
    clearCurrentUser(state) {
      if (this.debug) console.log('clearCurrentUser triggered')
      state.currentUser = null;

      state.displayName = '';
      state.isLogged = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
