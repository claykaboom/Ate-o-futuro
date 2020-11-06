<template>

  <layout-default>
  <transition name="slide">
    <div class="box">
      <h2 class="title is-4">Faça Logoff</h2>
      Faça Log Off para entrar com outra conta ou se for deixar de usar o
      sistema!
      <br />
      <br />
      <button @click="logoff" class="button is-warning">
        <span class="icon">
          <i class="fa fa-sign-out-alt"></i>
        </span>
        <span>Fazer Logoff</span>
      </button>
    </div>
  </transition>
  
  </layout-default>
</template>

<script>
import firebase from "firebase";

export default {
  name: "logoff",
  data() {
    return {
      uid: "",
      nome: "",
    };
  },
  methods: {
    logoff: function () {
      var theRouter = this.$router;
      firebase.auth()
        .signOut()
        .then(function () {
          // Sign-out successful.
          theRouter.replace("login");
        })
        .catch(function () {
          //function(error) {
          // An error happened.
          // console.log(error)
        });
    },
  },
};
</script>