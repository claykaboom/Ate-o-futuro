import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    displayName: "",
    isLogged: false,
    loadCounter: 0
  },
  mutations: {
    startLoading: function (state) {
      if (state.loadCounter < 0) {
        //no caso de terem usado mais stopLoading do que startLoading
        state.loadCounter = 0;
      }
      state.loadCounter++;
    },
    stopLoading(state) {
      state.loadCounter--;
      if (state.loadCounter < 0) {
        //no caso de terem usado mais stopLoading do que startLoading
        state.loadCounter = 0;
      }
    },
    resetLoader(state) {
      state.loadCounter = 0;
    },
    setCurrentUser(state,newValue) {
      if (this.debug) console.log('setCurrentUser triggered with', newValue)
      state.currentUser = newValue;
      if (newValue != null) {
        state.displayName = this.state.currentUser.displayName;
        state.isLogged = true;
      }
      else
      {
        
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
