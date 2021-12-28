<template>
  <empty-layout>
    <vue-headful title="Até o Futuro - Login" description="Faça seu Login." />
        <div class="hero-head">
        <div class="first_nav">
          <div class="container">
            <!-- Menu -->
            <nav-bar :fixedTop="true" />
          </div>
        </div>
      </div>     
    <section class="hero main_hero is-fullheight AteOFuturoBG" :style="`background-image: url('${require('@/assets/Background-Login.jpg')}');  background-size: cover;`">
  
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="slider-content animated zoomIn pb-6">
            <div>
              <p class="title is-1 main-text">
               Faça Login para ir Até o Futuro. 
                
              </p>
            <div class="box is-rounded">
                  <p class="subtitle is-4">Escolha o seu método de login abaixo:</p>
                  <br />
                  <span v-if="$route.query.redirectToPath">
                    Para acessar esta tela ou fazer esta operação é necessário
                    fazer login 😄 <br /><br />
                  </span>

                  <!-- <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        class="input is-medium"
                        type="email"
                        placeholder="Email"
                      />
                      <span class="icon is-medium is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-medium is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        class="input is-medium"
                        type="password"
                        placeholder="Password"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <label class="checkbox">
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </div>
                  <button class="button is-block is-info is-large is-fullwidth">
                    Login</button
                  ><br /> -->
                  <button @click="loginGoogle" class="button is-primary is-large">
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
                  <!-- <p class="subtitle is-5">Login com </p>
                  <div class="buttons is-centered" style="margin-bottom: 0">
                    <a class="button is-medium is-facebook">
                      <span class="icon">
                        <i class="fab fa-facebook-f fa-lg"></i>
                      </span>
                    </a>
                    <a class="button is-medium is-twitter">
                      <span class="icon">
                        <i class="fab fa-twitter fa-lg"></i>
                      </span>
                    </a>
                    <a class="button is-medium is-github">
                      <span class="icon">
                        <i class="fab fa-github fa-lg"></i>
                      </span>
                    </a>
                  </div> -->
                </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    
  </empty-layout>
</template>
<style scoped>
 
</style>
<script>
import { auth, db, googleProvider } from "../firebase";

import NavBar from "../components/NavBar";

export default {
  name: "login",
  components: { NavBar },
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

      // thisVM.$root.startLoading();

      thisVM.$store.commit("startLoading");
      auth
        .signInWithPopup(provider)
        .then(function (result) {
          var user = result.user;

          db.ref("Users/" + user.uid)
            .update({
              displayName: user.displayName,
              email: user.email,
            })
            .then(function () {
              thisVM.$store.commit("stopLoading");
              //thisVM.$root.stopLoading();

              if (thisVM.$route.query.redirectToPath != null) {
                window.location.hash = thisVM.$route.query.redirectToPath;
                // if (theRoute.params.time) {
                //   theRouter.push({
                //     name: thisVM.$route.query.redirectTo,
                //     params: { time: theRoute.params.time }
                //   });
                // } else if (thisVM.$route.query.time) {
                theRouter.push(thisVM.$route.query.redirectToPath);
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
          thisVM.$store.commit("stopLoading");

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