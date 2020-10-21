<template>
  <transition name="slide">
    <div class="box">
      <h2 class="title is-4">Faça Login</h2>
      Faça Login para usar o Até o Futuro (BETA)
      <br />
      <b>
        <span v-if="$route.query.redirectToPath">
          <br />Para acessar esta tela ou fazer esta operação é necessário fazer
          login 😄
          <br />
        </span>
      </b>
      <br />
      <button @click="loginGoogle" class="button is-primary">
        <span class="icon">
          <i class="fab fa-google"></i>
        </span>
        <span>Login com Google!</span>
      </button>
      <!-- <button @click="loginFB" class="button is-info">
        <span class="icon">
          <i class="fab fa-facebook"></i>
        </span>
        <span>Login com Facebook!</span>
      </button> -->
    </div>
  </transition>
</template>

<script>
import {auth,db,googleProvider} from "../firebase";

export default {
  name: "login",
  data() {
    return {
      uid: "",
      nome: "",
    };
  },
  methods: {
    lastMile(provider) {
      var theRouter = this.$router;
      //   var theRoute = this.$route;
      auth.languageCode = "pt";
      var thisVM = this;

      thisVM.$root.startLoading();
      auth
        .signInWithPopup(provider)
        .then(function (result) {
          var user = result.user;

          db
            .ref("Users/" + user.uid)
            .update({
              displayName: user.displayName,
              email: user.email,
            })
            .then(function () {
              thisVM.$root.stopLoading();

              if (thisVM.$route.query.redirectToPath != null) {
                window.location.hash = thisVM.$route.query.redirectToPath;
                // if (theRoute.params.time) {
                //   theRouter.push({
                //     name: thisVM.$route.query.redirectTo,
                //     params: { time: theRoute.params.time }
                //   });
                // } else if (thisVM.$route.query.time) {
                //   theRouter.push({
                //     name: thisVM.$route.query.redirectTo,
                //     params: { time: thisVM.$route.query.time }
                //   });
                // } else {

                //   theRouter.push({
                //     name: thisVM.$route.query.redirectTo,
                //   });
                // }
              } else {
                theRouter.push({
                  name: "Home",
                });
              }
            });

          //function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //  var token = result.credential.accessToken;
          // The signed-in user info.
          // var user = result.user;
          //  console.log(result);
          // alert("Olá, " + user.displayName);

          //TODO: cadastrar na tabela de usuarios
          //TODO: Buscar por convite e cadastrar nos times corretos

          // ...
        })
        .catch(function (error) {
          //function(error) {
          // debugger;
          alert(error);
          // Handle Errors here.
          /* var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;*/
          // ...
        });
    },
    loginGoogle: function () {
   //   var provider = new firebase.auth.GoogleAuthProvider();
      this.lastMile(googleProvider);
    },
    loginFB: function () {
    //  var provider = new firebase.auth.FacebookAuthProvider();
    //  this.lastMile(provider);
    },
  },
};
</script>