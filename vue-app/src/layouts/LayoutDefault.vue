<template>
  <div >
    <b-loading
      :is-full-page="true"
      v-model="$store.state.isLoading"
    ></b-loading>
    <!-- <div class="vld-parent">
      <b-loading :is-full-page="true" :active.sync="$root.$loadCounter >0"></b-loading>
      <loading :active.sync="$root.$loadCounter >0"></loading>
    </div> -->
    <!-- START NAV -->
    <nav-bar />
    <br />
    <br />
    <br />
    <!-- END NAV -->
    <div class="container" >
      <div class="columns">
        <div class="column is-12">
          <breadcrumbs />

          <div v-if="!isProduction" style="background-color: red;color:#FFF">
            <b>[DEBUGGER]</b> - LOADER COUNTER {{ $store.state.loadCounter }} / IS LOADING:
            {{ $store.state.isLoading }} / 👤 = {{$store.state.isLogged}}
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
html {
  scroll-behavior: smooth;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f0f0f0;
}
.main_hero {
  background-image: url("https://cdn.pixabay.com/photo/2016/10/18/08/13/travel-1749508_960_720.jpg");
  background-size: cover;
}
img {
  max-width: 100%;
}
a.is-primary {
  background-color: #03b2e3 !important;
  border: 1px solid #03b2e3 !important;
}
a.is-primary:hover {
  background-color: transparent !important;
  color: #000 !important;
}
a.button {
  font-size: 14px;
}
.main_title {
  color: #fff;
}
.columns {
  flex-wrap: wrap;
}
.modal-content {
  background-color: #fff;
  padding: 2em;
  border-radius: 5px;
}
@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(60px);
  }
}
svg #wheel {
  animation: scroll ease 2s infinite;
}
.slider-content {
  animation-duration: 3s;
  animation-delay: 1s;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1s;
}
.scroll-down {
  animation-duration: 3s;
  animation-delay: 2s;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 2s;
}
.rooms {
  background-color: #fff;
  padding: 1em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.reception-image img {
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.reception-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
  padding: 1em 2em;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.reception-item i {
  width: 20px;
}
.reception-item a {
  color: #000;
}
.reception-item .button {
  border: 1px solid #03b2e3;
  width: 50px;
}
.reception-item .button i {
  width: auto;
  padding-right: 5px;
}
.reception-item .button:hover {
  background-color: #03b2e3;
  color: #fff;
}
.mobile-only {
  display: none;
}
@media only screen and (max-width: 769px) {
  .reception-item {
    width: 100%;
  }
  .mobile-only {
    display: block;
  }
  .reception-item {
    padding: 1em;
  }
}
@media only screen and (max-width: 350px) {
  .mobile-only {
    display: none;
  }
}
iframe {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
@media only screen and (min-width: 300px) and (max-width: 1024px) {
  .gallery a {
    width: 150px;
  }
}
footer {
  background-color: #344157;
  border-top: 3px solid #03b2e3;
  color: #fff !important;
}
.footer_title {
  color: #fff !important;
}
.newsletter-form {
  display: flex;
}
.newsletter-form input {
  width: 100%;
  height: 40px;
  border: 0;
  outline: none;
  padding: 0 15px;
  font-size: 14px;
  background-color: #5c677b;
  color: #fff;
}
.newsletter-form ::-webkit-input-placeholder {
  color: #fff;
}

.newsletter-form button {
  width: 50px;
  height: 40px;
  font-size: 16px;
  color: #fff;
  background-color: #d77b5d;
  outline: none;
  border: 0;
}
.main-text {
  color: white;
  text-shadow: 4px 4px 12px #29211b;
}
.navbar {
  box-shadow: none;
}
.navbar-item {
  color: #484848;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  height: 100%;
  background: #ecf0f3;
}
nav.navbar {
  border-top: 4px solid #276cda;
  margin-bottom: 1rem;
}
.navbar-item.brand-text {
  font-weight: 300;
}
.navbar-item,
.navbar-link {
  font-size: 14px;
  font-weight: 700;
}
.columns {
  width: 100%;
  height: 100%;
  margin-left: 0;
}
.menu-label {
  color: #8f99a3;
  letter-spacing: 1.3;
  font-weight: 700;
}
.menu-list a {
  color: #0f1d38;
  font-size: 14px;
  font-weight: 700;
}
.menu-list a:hover {
  background-color: transparent;
  color: #276cda;
}
.menu-list a.is-active {
  background-color: transparent;
  color: #276cda;
  font-weight: 700;
}
.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}
.card-header-title {
  color: #8f99a3;
  font-weight: 400;
}
.info-tiles {
  margin: 1rem 0;
}
.info-tiles .subtitle {
  font-weight: 300;
  color: #8f99a3;
}
.hero.welcome.is-info {
  background: #36d1dc;
  background: -webkit-linear-gradient(to right, #5b86e5, #36d1dc);
  background: linear-gradient(to right, #637425, #bbb94f);
}
.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
.card .content {
  font-size: 14px;
}
.card-footer-item {
  font-size: 14px;
  font-weight: 700;
  color: #8f99a3;
}
.card-footer-item:hover {
}
.card-table .table {
  margin-bottom: 0;
}
.events-card .card-table {
  max-height: 250px;
  overflow-y: scroll;
}
@-webkit-keyframes spinAround {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@keyframes spinAround {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
.button {
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.25em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  position: relative;
  vertical-align: top;
}
.button {
  background-color: white;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.375em - 1px);
  padding-left: 0.75em;
  padding-right: 0.75em;
  padding-top: calc(0.375em - 1px);
  text-align: center;
  white-space: nowrap;
}

.button.is-loading::after {
  -webkit-animation: spinAround 500ms infinite linear;
  animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
}

.button.is-loading {
  color: transparent !important;
  pointer-events: none;
}

.button.is-loading::after {
  position: absolute;
  left: calc(50% - (1em / 2));
  top: calc(50% - (1em / 2));
  position: absolute !important;
}
</style>
<script>
import Breadcrumbs from "../components/Breadcrumbs";

import firebase from "firebase";
import NavBar from "../components/NavBar";

export default {
  data() {
    return {
      isProduction: process.env.NODE_ENV === "production",
      fullPage: true,
    };
  },
  components: { Breadcrumbs, NavBar },
  computed: {
    isLoading() {
      return this.$store.state.loadCounter > 0;
    },
  },
  mounted() {
    // alert('auth'+ firebase.auth());
    //debugger;
    var thisVM = this;
    firebase.auth().onAuthStateChanged(() => {
      thisVM.$store.commit("setCurrentUser", firebase.auth().currentUser);
    });
  },
};
</script>
