<template>
  <layout-default>
    <div class="box" v-if="$store.state.isLoading">
      <article class="media" v-for="i in media" :key="i">
        <figure class="media-left">
          <p class="image is-64x64">
            <b-skeleton circle width="64px" height="64px"></b-skeleton>
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <b-skeleton active></b-skeleton>
              <b-skeleton height="80px"></b-skeleton>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small">
                  <b-skeleton></b-skeleton>
                </span>
              </a>
              <a class="level-item">
                <span class="icon is-small">
                  <b-skeleton></b-skeleton>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
    <div class="box" v-if="initiative && !$store.state.isLoading">
      <vue-headful
        :title="'Iniciativa ' + initiative.name + ' - Até o Futuro'"
        :description="'Detalhes da Iniciativa ' + initiative.name"
      />
      <h1 class="title is-3">Detalhes da Iniciativa "{{ initiative.name }}"</h1>

      <div class="columns">
        <div class="column">
          Opa! Você tem iniciativa aqui!!! <br /><br />

          Uma iniciativa aqui no <b>Até o Futuro</b> é uma empreitada curta, de
          preferência com data de início e de fim. <br /><br />

          As pessoas às vezes não têm recursos infinitos para se dedicar por
          tempo indefinido a algo. Esses recursos podem ser tempo, dinheiro,
          motivação, energia.

          <br /><br />

          Então a ideia de uma iniciativa é quebrar a barreira que a falta de
          algum recurso pode criar e poder validar ideias de forma rápida.
          <br />
          <br />
          <b-message
            v-if="initiative.message"
            title="Uma mensagem da mente criadora dessa iniciativa"
            type="is-success"
            has-icon
            :closable="false"
          >
            {{ initiative.message }}
          </b-message>

          <b-field label="Início esperado">
            <b-datepicker
              disabled
              placeholder="Duração"
              icon="calendar-today"
              locale="pt-BR"
              v-if="initiative.startDate"
              v-model="initiative.startDate"
            >
            </b-datepicker>
          </b-field>
          <b-field label="Término esperado">
            <b-datepicker
              disabled
              v-if="initiative.endDate"
              placeholder="Duração"
              icon="calendar-today"
              locale="pt-BR"
              v-model="initiative.endDate"
            >
            </b-datepicker>
          </b-field>
          <div class="buttons is-centered">
            <youtube
              :video-id="videoId"
              v-if="videoId != null && windowWidth != null"
              :player-width="windowWidth"
            ></youtube>

            <youtube
              :video-id="videoId"
              v-if="videoId != null && windowWidth == null"
            ></youtube>
          </div>

          <br />

          <div
            class="buttons is-centered notification is-dark is-inverted"
            v-if="!$store.state.isLogged"
          >
            <router-link
              style="text-decoration: none"
              :to="{
                name: 'SupportInitiative',
                params: { IdInitiative: IdInitiative },
              }"
            >
              <b-icon icon="heart" type="is-danger" />

              <span v-if="supporters > 0">
                {{ supporters }} Visionários apoiando a iniciativa. Clique para
                apoiar também.
              </span>
              <span v-if="supporters == 0">
                Ninguém apoiou a causa ainda. Seja o primeiro (a).</span
              >
            </router-link>
          </div>
          <div
            class="buttons is-centered notification is-dark is-inverted"
            v-if="$store.state.isLogged"
          >
            <div
              type="is-info"
              @click="support()"
              v-bind:class="{
                'animate__animated animate__rubberBand animate__faster': loadingSupport,
              }"
              style="cursor: hand"
            >
              <b-icon icon="heart" type="is-danger" />

              <span v-if="supporters > 0">
                {{ supporters }} Visionários apoiando a iniciativa. Clique para
                apoiar também :).
              </span>
              <span v-if="supporters == 0">
                Ninguém apoiou a causa ainda. Seja o primeiro (a).</span
              >
            </div>
          </div>

          <div class="buttons is-centered notification is-primary">
            <a
              class="button is-large is-success"
              :href="initiative.callToActionURL"
              target="blank"
              >Embarcar nessa!</a
            >
          </div>
          <h2 class="subtitle is-3">Comentários</h2>
          <b-field label="Seu comentário aqui">
            <b-input
              placeholder="Digite seu comentário (Necessário Login)"
              expanded
              type="textarea"
              v-model="newComment"
              size="is-large"
            >
            </b-input>
          </b-field>
          <b-button
            icon-left="send"
            type="is-info"
            expanded
            v-if="$store.state.isLogged"
            @click="postComment()"
          >
            Comentar
          </b-button>

          <b-button
            icon-left="send"
            disabled
            type="is-info"
            expandedF
            v-if="!$store.state.isLogged"
            title="Faça Login para comentar"
          >
            Comentar
          </b-button>

          <br />
          <article
            class="media"
            v-for="comment in comments"
            v-bind:key="comment.id"
          >
            <figure class="media-left">
              <p class="is-64x64 notification is-centered is-primary">
                <b-icon icon="account" size="is-large" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ comment.userName }}</strong>
                  <!-- <small>@johnsmith</small> -->
                  <!-- <small>31m</small> -->
                  <br />
                  {{ comment.text }}
                </p>
              </div>
              <!-- <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item">
                    <span class="icon is-small"
                      ><i class="fas fa-reply"></i
                    ></span>
                  </a>
                  <a class="level-item">
                    <span class="icon is-small"
                      ><i class="fas fa-retweet"></i
                    ></span>
                  </a>
                  <a class="level-item">
                    <span class="icon is-small"
                      ><i class="fas fa-heart"></i
                    ></span>
                  </a>
                </div>
              </nav> -->
            </div>
            <hr />
          </article>
          <hr />
          <div class="buttons is-centered">
            QR Code da iniciativa para outros ingressarem rapidamente nela:
          </div>
          <div class="buttons is-centered">
            <br />
            <img :src="qrCodeShareURL" style="display: inline-table" />
            <br />
          </div>
          <div class="buttons is-centered">
            Link da Iniciativa para compartilhamento:
            {{ finalAteOFuturoShareURL }}
            <br />
          </div>
        </div>
      </div>
    </div>
  </layout-default>
</template>
<script>
import firebase from "firebase";
import { getIdFromURL } from "vue-youtube-embed";
import VueYouTubeEmbed from "vue-youtube-embed";

export default {
  name: "InitiativeDetails",
  data() {
    return {
      initiative: { name: "" },
      IdInitiative: null,
      media: 4,
      supporters: 0,
      comments: [],
      newComment: "",
      animated: false,
      loadingSupport: false,
    };
  },

  metaInfo() {
    return {
      title: `Iniciativa ${this.initiative.name} - Até o Futuro`,
      meta: [
        { name: "description", content: `${this.initiative.message}` },
        {
          property: "og:title",
          content: `Iniciativa ${this.initiative.name} - Até o Futuro`,
        },
        { property: "og:site_name", content: "Até o Futuro" },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
  components: { VueYouTubeEmbed },
  computed: {
    windowWidth() {
      return window.outerWidth <= 400
        ? window.outerWidth <= 200
          ? 160
          : 320
        : null;
    },
    videoId() {
      var thisVM = this;
      if (
        thisVM.initiative != null &&
        thisVM.initiative.videoURL != null &&
        thisVM.initiative.videoURL.toLowerCase().includes("youtu")
      ) {
        return getIdFromURL(thisVM.initiative.videoURL);
      }
      return null;
    },

    finalAteOFuturoShareURL() {
      return `https://AteOFuturo.com.br/Iniciativas/Ver/${this.IdInitiative}`;
    },
    qrCodeShareURL() {
      return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${this.finalAteOFuturoShareURL}`;
    },
    // supporters() {
    //   return this.initiative.supporters
    //     ? this.initiative.supporters.length - 1
    //     : 0; //todo: not right way to fecth data
    // },
  },
  mounted() {
    var thisVM = this;
    thisVM.IdInitiative = thisVM.$route.params.IdInitiative;
    this.getData();
  },
  methods: {
    postComment() {
      var thisVM = this;
      if (thisVM.newComment != null && thisVM.newComment != "") {
        thisVM.$store.commit("startLoading");

        var IdComment = firebase
          .database()
          .ref()
          .child(`/Initiatives/${thisVM.$route.params.IdInitiative}/comments/`)
          .push().key;

        firebase
          .database()
          .ref(
            `/Initiatives/${thisVM.$route.params.IdInitiative}/comments/${IdComment}`
          )
          .update({
            text: thisVM.newComment,
            userName: thisVM.$store.state.displayName,
            userID: thisVM.$store.state.currentUser.uid,
            dateTime: firebase.firestore.Timestamp.fromMillis(Date.now()),
          })
          .then(function () {
            thisVM.newComment = null;
            thisVM.$store.commit("stopLoading");
          });
      }
    },
    clearData: function () {
      var thisVM = this;
      thisVM.initiative = null;
    },
    clearComments: function () {
      var thisVM = this;
      thisVM.comments.splice(0, this.comments.length);
    },
    support() {
      var thisVM = this;
      var valueToRecord = JSON.parse(
        `{"${thisVM.$store.state.currentUser.uid}":true}`
      );
      thisVM.loadingSupport = true;
      this.animated = true;
      var audio = new Audio(require("../../assets/sounds/like.mp3")); // path to file
        audio.volume = 0.05;
      audio.play();

      firebase
        .database()
        .ref(
          `/Initiatives/${thisVM.$route.params.IdInitiative}/supporters/${thisVM.$store.state.currentUser.uid}`
        )
        .update(valueToRecord)
        .then(function () {
          thisVM.loadingSupport = false;
        });
    },
    getData() {
      var thisVM = this;
      //  thisVM.$root.startLoading();

      thisVM.clearData();
      var initiativeRef = firebase
        .database()
        .ref(`Initiatives/${thisVM.$route.params.IdInitiative}`);
      var initiativeSupportersRef = firebase
        .database()
        .ref(`Initiatives/${thisVM.$route.params.IdInitiative}/supporters`);
      var CommentsRef = firebase
        .database()
        .ref(`Initiatives/${thisVM.$route.params.IdInitiative}/comments`);

      thisVM.$store.commit("startLoading");
      initiativeRef.on("value", function (snapshot) {
        thisVM.$buefy.toast.open(`Iniciativa terminou de carregar!`);

        thisVM.initiative = snapshot.val();

        if (thisVM.initiative.startDate != null) {
          thisVM.initiative.startDate = firebase.firestore.Timestamp.fromMillis(
            thisVM.initiative.startDate.seconds * 1000
          ).toDate();
        }
        if (thisVM.initiative.endDate != null) {
          thisVM.initiative.endDate = firebase.firestore.Timestamp.fromMillis(
            thisVM.initiative.endDate.seconds * 1000
          ).toDate();
        }
        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });

      thisVM.$store.commit("startLoading");
      initiativeSupportersRef.on("value", function (snapshot) {
        thisVM.$buefy.toast.open(`Seja visionário(a) e clique em "suportar"!`);
        thisVM.supporters =
          snapshot.val() && snapshot.val()._count ? snapshot.val()._count : 0;

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });

      thisVM.$store.commit("startLoading");
      CommentsRef.on("value", function (snapshot) {
        thisVM.clearComments();
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (childSnapshot.key != "_count") {
            thisVM.comments.push({
              id: childSnapshot.key,
              userName: childData.userName,
              text: childData.text,
            });
          }
        });
        thisVM.$buefy.toast.open(`Não esqueça de comentar!`);

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
  },
};
</script>