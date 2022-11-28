<template>
  <layout-default>
    <vue-headful
      v-if="tool"
      :title="`Até o Futuro - Ferramenta ${tool.name}`"
      description=" Ferramenta de Colaboração Criativa"
    />
    <vue-headful
      v-else
      title="Até o Futuro - Ferramenta não encontrada"
      description=" Ferramenta não encontrada"
    />

    <section
      class="box animate__animated animate__zoomInUp"
      v-if="$store.state.isLoading"
    >
      <div class="block">
        <h1 class="title is-3">
          Detalhe da Ferramenta
          <b-skeleton width="80%" :animated="true"></b-skeleton>
        </h1>
        <div class="columns">
          <div class="column is-5">
            <p class="image">
              <b-skeleton
                circle
                size="is-large is-fullwidth"
                height="256px"
              ></b-skeleton>
            </p>
          </div>
          <div class="column is-7">
            <h2 class="subtitle is-3">🛠 ...</h2>
            <h3 class="subtitle is-5" style="color: #69316b; font-weight: bold">
              <b-skeleton width="100%" :animated="true"></b-skeleton>
            </h3>
            <span v-for="i in 4" :key="i">
              <b-skeleton width="80%" :animated="true"></b-skeleton>
            </span>
          </div>

          <b-skeleton width="20%" :animated="true"></b-skeleton>

          <b-skeleton width="40%" :animated="true"></b-skeleton>

          <b-skeleton width="80%" :animated="true"></b-skeleton>

          <b-skeleton :animated="true"></b-skeleton>
        </div>
      </div>
    </section>
    <div
      class="box"
      :v-bind:class="{
        'animate__animated animate__zoomInUp animate__fadeIn': !$store.state
          .isLoading,
      }"
      v-if="!$store.state.isLoading && tool"
    >
      <h1 class="title is-3">Detalhe de Ferramenta: {{ tool.name }}</h1>

      <div class="row columns">
        <div class="column is-5">
          <b-image :src="tool.imageURL" ratio="2by3" />
        </div>
        <div class="column is-7">
          <h2 class="subtitle is-3">Ferramenta: {{ tool.name }}</h2>
          <h3 class="subtitle is-5" style="color: #69316b; font-weight: bold">
            Tipo da Ferramenta: {{ tool.category }}
          </h3>
          <a
            :href="finalLinkedInShareURL"
            onclick="window.open(this.href, 'mywin',
'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;"
          >
            <b-button type="is-info" icon-left="linkedin">
              Compartilhar no LinkedIn
            </b-button> </a
          >&nbsp;<a
            :href="finalWhatsAppShareURL"
            target="blank"
          >
            <b-button type="is-success" icon-left="phone">
              Compartilhar no WhatsApp
            </b-button> </a
          ><br /><br />
          <div v-html="tool.detalhes"></div>

          <div v-if="tool.offerSupport">
            <br />
            <h3 class="subtitle is-4">
              Precisa de suporte para implementar isso no seu trabalho?
            </h3>
            Exemplos do que você pode fazer:
            <ul>
              <li>💡 Aprenda a usar esta ferramenta</li>
              <li>💡 Aprofunde sua compreensão sobre as teorias</li>
              <li>💡 Acelere este modo de trabalho em sua organização</li>
              <li>💡 Conduza workshops com um(a) Expert do Futuro</li>
              <li>💡 Evolua e cresça com coaching/mentoria individual</li>
            </ul>
            <br />
            <b-button
              tag="router-link"
              to="/Contato"
              type="is-link"
              size="is-medium"
              class="is-fullwidth is-success"
            >
              Sim, quero uma ajudinha!
            </b-button>
          </div>
          <br />
          <div>
            <router-link
              v-if="!$store.state.isLogged"
              class="buttons is-centered notification is-dark is-inverted"
              style="cursor: pointer; text-decoration: none"
              :to="{
                name: 'SupportTool',
                params: { toolId: toolId },
              }"
            >
              <b-icon icon="heart" type="is-danger" />

              <span v-if="supporters > 0">
                {{ supporters }} pessoas gostaram desta ferramenta.
              </span>
              <span v-if="supporters == 0">
                Ninguém apoiou esta ferramenta. Seja o(a) primeiro (a).</span
              >
            </router-link>
          </div>
          <div
            class="buttons is-centered notification is-dark is-inverted"
            v-if="$store.state.isLogged"
            style="cursor: pointer"
            @click="support()"
          >
            <div
              type="is-info"
              v-bind:class="{
                'animate__animated animate__rubberBand animate__faster': loadingSupport,
              }"
            >
              <b-icon icon="heart" type="is-danger" />

              <span v-if="supporters > 0">
                {{ supporters }} pessoas gostaram desta ferramenta.
              </span>
              <span v-if="supporters == 0">
                Ninguém apoiou esta ferramenta. Seja o(a) primeiro (a).</span
              >
            </div>
          </div>
          <br />
        </div>
      </div>
      <div
        class="row columns has-text-centered"
        style="background-color: #eff0f0"
      >
        <div class="column is-2">
          <b-icon icon="clock" size="is-medium" /> <b>TEMPO:</b><br />{{
            tool.minTime
          }}
          - {{ tool.maxTime }} MIN
        </div>
        <div class="column is-2">
          <b-icon icon="account" size="is-medium" /> <b>TAM. GRUPO:</b> <br />{{
            tool.minTeamSize
          }}
          -
          {{ tool.maxTeamSize }}
        </div>
        <div class="column is-3">
          <b-icon icon="puzzle" size="is-medium" /> <b>NÍVEL FACILITAÇÃO:</b>
          <br />{{ tool.facilitationLevel }}
        </div>
        <div class="column is-2">
          <b-icon icon="ladybug" size="is-medium" /> <b>CONFORTO:</b> <br />{{
            tool.comfortZone
          }}
        </div>
        <div class="column is-3">
          <b-icon icon="attachment" size="is-medium" /> <b>MATERIAIS:</b> <br />
          <ul>
            <li v-for="material in tool.materials" :key="material">
              ◾ {{ material }}
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div class="video-container" v-if="tool.videoURL != null">
        <youtube
          :video-id="tool.videoURL"
          player-width=""
          player-height=""
        ></youtube>
      </div>
      <div>
        <div v-for="(step, index) in tool.implementationSteps" :key="index">
          <hr />
          <h2 class="subtitle is-3">Passo {{ index + 1 }}</h2>
          <div class="row columns">
            <div v-html="step.content" class="column is-10"></div>

            <br />
            <div class="column is-2" v-if="step.imageURL">
              <b-image :src="step.imageURL" ratio="1by1" />
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
    <div class="box" v-if="!$store.state.isLoading && !tool">
      <section>
        <h1 class="title is-3">😮 Ferramenta não encontrada!</h1>
      </section>
      <br />
      Verifique se o endereço está correto, por favor!
      <br />
      <br />
      Enquanto isso, você também pode tentar ver as outras ferramentas
      disponíveis:
      <br />
      <br />
      <router-link
        class="button is-success is-large is-fullwidth"
        :to="{ name: 'Toolbox' }"
      >
        🛠 Ver ferramentas</router-link
      >
    </div>
  </layout-default>
</template>
<style  >
.video-container div {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.video-container div iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
<script>
import { getIdFromURL } from "vue-youtube-embed";
import VueYouTubeEmbed from "vue-youtube-embed";
import firebase from "firebase";

export default {
  components: { VueYouTubeEmbed },
  data() {
    return {
      toolId: null,
      tool: null,
      loadingSupport: false,
      supporters: 0,
    };
  },
  computed: {
    finalWhatsAppShareURL() {
      var text = `Olha só esta ferramenta de colaboração criativa, "${this.tool.name}", do Até o Futuro. ${this.finalAteOFuturoShareURL}`;
      return `https://api.whatsapp.com/send?text=${text}`;
    },
    finalLinkedInShareURL() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${this.finalAteOFuturoShareURL}&title=Caixa%20de%20ferramentas%20do%20futuro&summary=Veja%20esta%20ferramenta%20de%20colaboração%20criativa&source=AtéOFuturo`;
    },
    finalAteOFuturoShareURL() {
      return `https://AteOFuturo.com.br/Toolbox/${this.toolId}`;
    },
  },
  methods: {
    getTool() {
      var thisVM = this;
      thisVM.toolId = thisVM.$route.params.toolId;

      thisVM.$store.commit("startLoading");
      if (thisVM.toolId != null) {
        var toolRef = firebase.database().ref(`Tools/${thisVM.toolId}`);

        thisVM.$store.commit("startLoading");
        toolRef.on("value", function (snapshot) {
          thisVM.tool = snapshot.val();

          if (thisVM.tool.supporters != null) {
            thisVM.supporters = Object.keys(thisVM.tool.supporters).length;
          }
          if (thisVM.tool.videoURL) {
            thisVM.tool.videoURL = getIdFromURL(thisVM.tool.videoURL);
          }
          thisVM.$store.commit("stopLoading");
        });
      }
      //apenas para poder ver a animacao de abertura
      setInterval(() => {
        thisVM.$store.commit("stopLoading");
      }, 900);
    },
    support() {
      var thisVM = this;
      if (thisVM.$store.state.isLogged) {
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
          .ref(`/Tools/${thisVM.toolId}/supporters`)
          .update(valueToRecord)
          .then(function () {
            thisVM.loadingSupport = false;
          });
      }
    },
  },
  mounted() {
    this.getTool();
  },
};
</script>