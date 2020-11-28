<template>
  <layout-default>
    <div class="box">
      <h1 class="title is-4">Meu Perfil</h1>
      <b-modal
        v-model="isPreferencesOpen"
        has-modal-card
        trap-focus
        :can-cancel="true"
        full-screen
        @close="closePreferences()"
        :destroy-on-hide="true"
        aria-role="dialog"
        aria-modal
      >
        <edit-perfil
          :miniBio="miniBio"
          :photoURL="photoURL"
          :areas="areas"
          :allow-new="isExpert"
          @save="saveData($event)"
          @close="closePreferences()"
        ></edit-perfil>
      </b-modal>

      <div class="columns">
        <div class="section profile-heading">
          <div class="columns is-mobile is-multiline">
            <div class="column is-2">
              <span class="header-icon user-profile-image">
                <img alt="" :src="photoURL" />
              </span>
            </div>
            <div class="column is-10-tablet is-10-mobile name">
              <p>
                <span class="title is-bold">
                  {{ $store.state.currentUser.displayName }}
                  <b-tag type="is-success" v-if="isExpert"
                    >Você é um(a) Expert Até o Futuro</b-tag
                  ></span
                >
                <br />
                <b-button
                  type="  is-primary is-outlined"
                  @click="openPreferences()"
                >
                  Ver preferências
                </b-button>
                <br />
                {{ miniBio }}
              </p>
              <p class="tagline"></p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3 has-text-centered">
            <p class="stat-val">{{ qtdRequests }}</p>
            <p class="stat-key">pedidos de feedback</p>
          </div>
          <div class="column is-3 has-text-centered">
            <p class="stat-val">{{ qtdFeedbacks }}</p>
            <p class="stat-key">feedbacks dados</p>
          </div>
          <div class="column is-3 has-text-centered">
            <p class="stat-val">{{ qtdAreasExpertise }}</p>
            <p class="stat-key">áreas de expertise</p>
          </div>
          <div class="column is-3 has-text-centered">
            <p class="stat-val">{{ qtdIniciativas }}</p>
            <p class="stat-key">iniciativas</p>
          </div>
        </div>
        <!-- <div class="profile-options is-fullwidth">
            <div class="tabs is-fullwidth is-medium">
              <ul>
                <li class="link">
                  <a>
                    <span class="icon">
                      <i class="fa fa-list"></i>
                    </span>
                    <span>My Lists</span>
                  </a>
                </li>
                <li class="link is-active">
                  <a>
                    <span class="icon">
                      <i class="fa fa-thumbs-up"></i>
                    </span>
                    <span>My Likes</span>
                  </a>
                </li>
                <li class="link">
                  <a>
                    <span class="icon">
                      <i class="fa fa-search"></i>
                    </span>
                    <span>My Searches</span>
                  </a>
                </li>
                <li class="link">
                  <a>
                    <span class="icon">
                      <i class="fa fa-balance-scale"></i>
                    </span>
                    <span>Compare</span>
                  </a>
                </li>
              </ul>
            </div>
          </div> -->
        <!-- <div class="box" style="border-radius: 0px">
       
            <div class="columns">
              <div
                class="column is-2-tablet user-property-count has-text-centered"
              >
                <p class="subtitle is-5">
                  <strong></strong>
                  123
                  <br />
                  properties
                </p>
              </div>
              <div class="column is-8">
                <p class="control has-addons">
                  <input
                    class="input"
                    placeholder="Search your liked properties"
                    style="width: 100% !important"
                    type="text"
                  />
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div> -->
        <div class="columns is-mobile">
          <div class="column is-6-tablet is-6-mobile">
            <div class="card">
              <div class="card-image">
                <figure class="image is-3by1">
                  <img
                    class=" "
                    alt=""
                    src="https://via.placeholder.com/600x200/?text=Sua Expertise"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  <span v-if="isExpert"
                    ><b
                      >EXPERTS Até o Futuro, como você, são imediatamente
                      notificados quando uma solicitação de Feedback chega
                      nessas áreas de conhecimento.</b
                    ></span
                  >
                  Suas áreas de expertise são as seguintes: <br />
                   
                    <b-taglist>
                      <b-tag type="is-warning" v-for="area in areas" :key="area">{{ area }}</b-tag>
                    </b-taglist>
                
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item" @click="openPreferences()"
                  >Alterar</a
                >
                <!-- <a class="card-footer-item">Share</a>
                  <a class="card-footer-item">Delete</a> -->
              </footer>
            </div>
            <br />
          </div>
          <!-- <div class="column is-3-tablet is-6-mobile">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img alt="" src="http://placehold.it/300x225" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="content">
                    <span class="tag is-dark subtitle">#2</span>
                    <p>
                      Personal Notes on the Property (can be edited and saved
                      automatically by clicking in and clicking out of text
                      area) - these are unique to the user - they will show up
                      as part of a saved listings' info here - but adding notes
                      to a property does not automatically create a saved
                      listing. Likewise, removing this proeprty from saved
                      listings does not auto remove the notes.
                    </p>
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item">Compare</a>
                  <a class="card-footer-item">Share</a>
                  <a class="card-footer-item">Delete</a>
                </footer>
              </div>
              <br />
            </div>
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img alt="" src="http://placehold.it/300x225" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="content">
                    <span class="tag is-dark subtitle">#3</span>
                    <p>
                      Personal Notes on the Property (can be edited and saved
                      automatically by clicking in and clicking out of text
                      area) - these are unique to the user - they will show up
                      as part of a saved listings' info here - but adding notes
                      to a property does not automatically create a saved
                      listing. Likewise, removing this proeprty from saved
                      listings does not auto remove the notes.
                    </p>
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item">Compare</a>
                  <a class="card-footer-item">Share</a>
                  <a class="card-footer-item">Delete</a>
                </footer>
              </div>
              <br />
            </div>
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img alt="" src="http://placehold.it/300x225" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="content">
                    <span class="tag is-dark subtitle">#4</span>
                    <p>
                      Personal Notes on the Property (can be edited and saved
                      automatically by clicking in and clicking out of text
                      area) - these are unique to the user - they will show up
                      as part of a saved listings' info here - but adding notes
                      to a property does not automatically create a saved
                      listing. Likewise, removing this proeprty from saved
                      listings does not auto remove the notes.
                    </p>
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item">Compare</a>
                  <a class="card-footer-item">Share</a>
                  <a class="card-footer-item">Delete</a>
                </footer>
              </div>
              <br />
            </div> -->
        </div>
      </div>
    </div></layout-default
  >
</template>
<style scoped>
body {
  background: #f5f7fa;
}

.stat-val {
  font-size: 3em;
  padding-top: 20px;
  font-weight: bold;
}

.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}

.section.profile-heading
  .column.is-2-tablet.has-text-centered
  + .has-text-centered {
  border-left: 1px dotted rgba(0, 0, 0, 0.2);
}

.container.profile {
  margin-top: 1%;
}

.control.is-pulled-left span.select {
  margin-right: 5px;
  border-radius: 2px;
}

.modal-card .content h1 {
  padding: 40px 10px 10px;
  border-bottom: 1px solid #dadada;
}

.container.profile .profile-options .tabs ul li.link a {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f1f1f1;
}
</style>
<script>
import firebase from "firebase";
import EditPerfil from "../../components/Perfil/EditPerfil";
export default {
  name: "MeuPerfil",
  components: { EditPerfil },
  data() {
    return {
      uid: "",
      nome: "",
      qtdRequests: 0,
      qtdFeedbacks: 0,
      qtdAreasExpertise: 0,
      qtdIniciativas: 0,
      miniBio: "",
      photoURL: "",
      areas: [],
      isExpert: false,
      isPreferencesOpen: false,
      formProps: { miniBio: null },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    openPreferences() {
      this.isPreferencesOpen = true;
    },
    closePreferences() {
      this.isPreferencesOpen = false;
    },
    saveData(data) {
      var thisVM = this;

      // //TODO: Delete all previous entries of this user on the area
      // areas.forEach((area) => {
      //   firebase
      //     .database()
      //     .ref(`Areas/${area}/${thisVM.$store.state.currentUser.uid}`)
      //     .removeValue();
      // });

      firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/PersonalData`)
        .update({
          miniBio: data.miniBio,
          photoURL: data.photoURL,
          areas: data.areas,
        })
        .then(function () {
          thisVM.areas = data.areas;
        });
      this.closePreferences();
    },
    clearStatsData() {},
    clearUserData() {},
    getData() {
      var thisVM = this;
      // thisVM.$root.startLoading();

      thisVM.$store.commit("startLoading");
      var userDataStatsRef = firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/stats`);

      thisVM.$store.commit("startLoading");
      var userDataRef = firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/PersonalData`);

      userDataStatsRef.on("value", function (snapshot) {
        thisVM.clearStatsData();
        var stats = snapshot.val();
        thisVM.qtdRequests = stats._count_FeedbackRequests
          ? stats._count_FeedbackRequests
          : 0;
        thisVM.qtdFeedbacks = stats._count_FeedbackResponses
          ? stats._count_FeedbackResponses
          : 0;

        thisVM.qtdAreasExpertise = stats._count_AreasExpertise
          ? stats._count_AreasExpertise
          : 0;

        thisVM.qtdIniciativas = stats._count_Initiatives
          ? stats._count_Initiatives
          : 0;

        thisVM.$buefy.toast.open(`Estatísticas atualizadas!`);

        thisVM.$store.commit("stopLoading");
      });
      userDataRef.on("value", function (snapshot) {
        thisVM.clearUserData();
        var data = snapshot.val();
        thisVM.miniBio = data.miniBio ? data.miniBio : null;
        thisVM.isExpert = data.isExpert ? data.isExpert : false;

        thisVM.areas = data.areas ? data.areas : [];

        thisVM.photoURL = data.photoURL
          ? data.photoURL
          : "https://source.unsplash.com/featured/?paint";

        thisVM.$buefy.toast.open(`Dados carregados!`);

        thisVM.$store.commit("stopLoading");
      });
    },
  },
};
</script>