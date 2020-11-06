<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'Sobre' }">
        <img src="@/assets/Logo.png" alt="Recicladores Do Brasil" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        tag="router-link"
        class="navbar-item"
        :to="{ name: 'Home' }"
        >Home</b-navbar-item
      >
      <!-- <b-navbar-dropdown label="Home">
   
        <b-navbar-item
          tag="router-link"
          class="navbar-item"
          :to="{ name: 'Home' }"
          >Home</b-navbar-item
        >
        <hr class="navbar-divider" />
        <div class="navbar-item">Versão 0.0.1 BETA</div>
      </b-navbar-dropdown> -->

      <b-navbar-item
        tag="router-link" 
        :to="{ name: 'FeedbackDashboard' }"
        >Feedbacks</b-navbar-item
      >
      <b-navbar-item tag="router-link" :to="{ name: 'Sobre' }"
        >Sobre
      </b-navbar-item>
      <b-navbar-item
        href="https://blog.claytonfreitas.com.br/contact/"
        target="blank"
        >Contato</b-navbar-item
      >
    </template>

    <template slot="end">
      <!-- <b-navbar-item tag="router-link" :to="{ name: 'MeuPerfil' }">Meu Perfil</b-navbar-item> -->
      <b-navbar-item tag="div">
        <div class="buttons">
          <!-- <a class="button is-primary">
            <strong>Sign up</strong>
          </a>-->

          <router-link v-show="!$root.isLogged" to="/Login" class="button is-light"
            >Log in</router-link
          >
          <router-link v-show="$root.isLogged" to="/Logoff" class="button is-warning"
            >Sair</router-link
          >
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return { logged: false };
  },
  created() {
   
  },
  mounted: function () {
    // var burger = document.querySelector('.burger');
    // var menu = document.querySelector('#' + burger.dataset.target);
    // const links = menu.querySelectorAll(".navbar-item");
    // links.forEach(link => {
    //   link.addEventListener("click", function() {
    //     burger.classList.remove("is-active");
    //     menu.classList.remove("is-active");
    //   });
    // });
  },
  methods: {
    setupData() {
      this.logged = this.$root.$isLogged;
    },
  },
  watch: {
    $route() {
      this.setupData();
    },
  },
};
</script>