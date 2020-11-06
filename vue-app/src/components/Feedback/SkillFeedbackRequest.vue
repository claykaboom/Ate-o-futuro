<template>
  <div v-if="feedBackRequest">
    <b-message
      title="Sua URL compartilhável"
      :closable="false"
      v-if="showSharableURL"
    >
      <b>IMPORTANTE:</b> Use esse link com cautela. Qualquer pessoa que o
      obtiver poderá ver o seu pedido de feedback e fornecer um feedback para
      você.

      <br />
      <br />

      <b>COPIE A SUA URL DE FEEDBACK:</b>
      <span> {{ finalAteOFuturoShareURL }} </span>
      <br />
    </b-message>
    <div></div>
    <b-field label="Habilidade Esperada">
      <section>
        <b-message type="is-success">
          {{ feedBackRequest.ResumoHabilidade }}
        </b-message>
      </section>
    </b-field>
    <b-field
      label="Detalhes sobre como a Habilidade é exercitada, dificuldades, etc."
    >
      <section>
        <b-message type="is-success">
          {{ feedBackRequest.DescricaoHabilidade }}
        </b-message>
      </section>
    </b-field>
    <b-field label="Áreas de Conhecimento" v-if="feedBackRequest.Areas">
      <section>
        <b-taglist>
          <b-tag
            type="is-warning"
            v-for="tag in feedBackRequest.Areas"
            :key="tag"
            >{{ tag }}</b-tag
          >
        </b-taglist>
      </section>
    </b-field>
    <b-field
      v-if="
        feedBackRequest.WantsExternalReference &&
        feedBackRequest.ExternalReferenceType != 'Link' &&
        feedBackRequest.VideoStorageURL != null
      "
      label="Vídeo de demonstração da habilidade"
    >
      <video
        class="preview"
        :src="feedBackRequest.VideoStorageURL"
        controls
      ></video>
    </b-field>
    <b-field
      v-if="
        feedBackRequest.WantsExternalReference &&
        feedBackRequest.ExternalReferenceType == 'Link'
      "
      label="Link de Referência"
    >
      <youtube :video-id="videoId" v-if="videoId != null"></youtube>
      <br />
      <a :href="feedBackRequest.ExternalReferenceURL" target="blank">{{
        feedBackRequest.ExternalReferenceURL
      }}</a>
    </b-field>

    <b-field
      label="Habilidade precisa ser aprimorada para a seguinte finalidade"
    >
      <b-select
        v-model="feedBackRequest.FinalidadeHabilidade"
        expanded
        disabled
      >
        <option value="pessoal">Aprimoramento pessoal/curiosidade</option>
        <option value="novo-cargo">Prospecção de cargo/emprego</option>
        <option value="dia-a-dia">Dia-a-dia</option>
        <option value="diferencial">Buscando diferencial</option>
      </b-select>
    </b-field>
  </div>
</template>
<script>
import firebase from "firebase";
import { getIdFromURL } from "vue-youtube-embed";
import VueYouTubeEmbed from "vue-youtube-embed";

export default {
  name: "Skill-feedback-request",
  props: {
    IdfeedBackRequest: String,
    showSharableURL: { type: Boolean, default: false },
  },
  components: { VueYouTubeEmbed },
  data() {
    return {
      feedBackRequest: {},
      videoId: null,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    finalAteOFuturoShareURL() {
      return `https://AteOFuturo.com.br/DarFeedback/${this.IdfeedBackRequest}`;
    },
  },
  watch: {
    IdfeedBackRequest() {
      this.getData();
    },
  },
  methods: {
    getData() {
      var thisVM = this;
      this.videoId = null;
      thisVM.$root.startLoading();
      var feedBackRequest = firebase
        .database()
        .ref(`FeedbackRequests/${thisVM.IdfeedBackRequest}`);

      feedBackRequest.on("value", function (snapshot) {
        thisVM.feedBackRequest = snapshot.val();
        if (
          thisVM.feedBackRequest != null &&
          thisVM.feedBackRequest.ExternalReferenceURL != null &&
          thisVM.feedBackRequest.ExternalReferenceURL.toLowerCase().includes(
            "youtu"
          )
        ) {
          thisVM.videoId = getIdFromURL(
            thisVM.feedBackRequest.ExternalReferenceURL
          );
        }
        if (thisVM.feedBackRequest != null) { // it seems sometimes it is returning null. i don't know why
          thisVM.$buefy.toast.open(
            `Detalhes do pedido sobre "${thisVM.feedBackRequest.ResumoHabilidade}" carregados!`
          );
        }
        thisVM.$root.stopLoading();
      });
    },
  },
};
</script>