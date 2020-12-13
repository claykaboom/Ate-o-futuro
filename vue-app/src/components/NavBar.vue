<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'Sobre' }">
        <img src="@/assets/Logo.png" alt="Até o Futuro" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        tag="router-link"
        class="navbar-item"
        :to="{ name: 'Home' }"
        > <b-icon icon="home-outline" /> <span>&nbsp;</span>HOME</b-navbar-item
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

      <b-navbar-item tag="router-link" :to="{ name: 'FeedbackDashboard' }">
      <b-icon icon="atom" /> <span>&nbsp;</span>  Feedbacks</b-navbar-item
      >
      <b-navbar-item tag="router-link" :to="{ name: 'InitiativeDashboard' }">
       <b-icon icon="eye-outline" /> <span>&nbsp;</span>  Iniciativas</b-navbar-item
      >
      <b-navbar-item tag="router-link" :to="{ name: 'Experts' }"
        >Nossa Equipe
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Sobre' }"
        >Sobre
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Privacidade' }"
        >Privacidade
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
        <template v-if="notifications.length > 0">
          <b-dropdown aria-role="list">
            <button
              class="button"
              v-bind:class="{ 'is-primary': notifications.length > 0 }"
              type="button"
              slot="trigger"
              :title="notifications.length + ' notificações'"
            >
              <b-icon icon="bell"></b-icon> <b-icon icon="menu-down"></b-icon>
              <b-tag type="is-danger">{{ notifications.length }}</b-tag>
            </button>

            <b-dropdown-item
              :value="false"
              aria-role="listitem"
              v-for="notification in notifications"
              v-bind:key="notification.id"
              @click="readAndNavigate(notification)"
            >
              <div class="media">
                <b-icon class="media-left" :icon="notification.icon"></b-icon>
                <div class="media-content">
                  <h3>{{ notification.title }}</h3>
                </div>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-else>
          <div>
            <b-icon icon="bell-outline" title="Nenhuma notificação"></b-icon>
          </div>
        </template>
        <b-navbar-dropdown label="Meu Perfil" v-show="$store.state.isLogged">
          <b-navbar-item
            tag="router-link"
            class="navbar-item"
            :to="{ name: 'MeuPerfil' }"
            >Perfil de {{ $store.state.displayName }}</b-navbar-item
          >
          <!-- <hr class="navbar-divider" />  -->
        </b-navbar-dropdown>
        <div class="buttons">
          <!-- <a class="button is-primary">
            <strong>Sign up</strong>
          </a>-->

          <router-link
            v-show="!$store.state.isLogged"
            to="/Login"
            class="button is-light"
            >Log in</router-link
          >

          <router-link
            v-show="$store.state.isLogged"
            to="/Logoff"
            class="button is-warning"
            >Sair</router-link
          >
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import firebase from "firebase";

export default {
  name: "NavBar",
  data() {
    return {
      notifications: [
        // {
        //   id: "321",
        //   description: "Novo(a) visionário(a) na sua iniciativa",
        //   title: "Suporte na iniciativa",
        //   link: "InitiativeDetail",
        //   params: { IdInitiative: "-MMmc2dRBIeRekUE_aHA" },
        //   icon: "earth",
        // },
        // {
        //   id: "32131",
        //   description: "Novo(a) visionário(a) na sua iniciativa",
        //   title: "Suporte na iniciativa",
        //   link: "https://google.com",
        //   params: [],
        //   icon: "comment",
        // },
      ],
    };
  },
  created() {
    this.setupData();
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
    readAndNavigate(notification) {
      var thisVM = this; 
      firebase
        .database()
        .ref(
          `Users/${thisVM.$store.state.currentUser.uid}/Notifications/${notification.id}`
        )
        .update({ read: true });
      if (notification.link.toLowerCase().includes("http")) {
        window.location.href = notification.link;
      } else {
        thisVM.$router.push({
          name: notification.link,
          params: notification.params,
        });
      }
    },
    clearNotifications() {
      this.notifications.splice(0, this.notifications.length);
    },

    setupData() {
      var thisVM = this;
      if (thisVM.$store.state.isLogged) {
        var notificationsRef = firebase
          .database()
          .ref(`Users/${thisVM.$store.state.currentUser.uid}/Notifications`)
          .orderByChild("read")
          .equalTo(false);

        notificationsRef.on("value", function (snapshot) {
          thisVM.clearNotifications();
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();

            if (childSnapshot.key != "_count") {
              thisVM.notifications.push({
                id: childSnapshot.key,

                description: childData.description,
                title: childData.title,
                link: childData.link,
                params: childData.params,
                icon: childData.icon,
              });
            }
          });

          //thisVM.$root.stopLoading();
        });
      }
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.isLogged;
    },
  },
  watch: {
    loggedIn() {
      this.setupData();
    },
    notifications() {
      var thisVM = this;

      thisVM.$store.commit(
        "setNotificationCounter",
        thisVM.notifications.length
      );
    },
  },
};
</script>