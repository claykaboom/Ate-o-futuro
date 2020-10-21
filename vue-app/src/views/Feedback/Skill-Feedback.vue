<template>
  <div class="box">
    <vue-headful
      title="Feedback sobre habilidade"
      description="Peça Feedback sobre uma habilidade"
    />
    <h1 class="title is-3">
      Habilidade - Pedir Feedback {{ IdFeedBackRequest }}
    </h1>
    <section>
      <b-steps
        v-model="activeStep"
        :animated="isAnimated"
        :rounded="isRounded"
        :has-navigation="hasNavigation"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        :label-position="labelPosition"
        :mobile-mode="mobileMode"
      >
        <template
          v-if="customNavigation"
          slot="navigation"
          slot-scope="{ previous, next }"
        >
          <section class="columns is-centered">
            <b-button
              outlined
              type="is-danger"
              icon-pack="fas"
              icon-left="backward"
              :disabled="previous.disabled"
              @click.prevent="previous.action"
            >
              Anterior
            </b-button>
            <b-button
              outlined
              type="is-success"
              icon-pack="fas"
              icon-right="forward"
              :disabled="isNextDisabled"
              @click.prevent="next.action"
              @click="gravar()"
              v-if="activeStep != 3"
            >
              Próximo </b-button
            ><button
              v-if="activeStep == 3"
              @click="gravarFinal"
              class="button is-success"
            >
              Finalizar
            </button>
          </section>
        </template>
        <b-step-item step="1" label="Habilidade" :clickable="true">
          <h1 class="title has-text-centered">Detalhes da habilidade</h1>
          <b-field
            label="Descreva a Habilidade sobre a qual você gostaria de um feedback"
          >
            <b-input
              v-model="DescricaoHabilidade"
              type="textarea"
              minlength="10"
              maxlength="365"
              :loading="$root.isLoading"
              placeholder="Descreva a habilidade sobre a qual você quer feedback aqui de maneira breve."
              @keyup="gravar()"
            >
            </b-input>
          </b-field>
        </b-step-item>

        <b-step-item
          step="2"
          label="Áreas"
          :clickable="DescricaoHabilidade != null && DescricaoHabilidade != ''"
          :type="{
            'is-success':
              DescricaoHabilidade != null && DescricaoHabilidade != '',
          }"
        >
          <h1 class="title has-text-centered">Áreas de Conhecimento</h1>
          <b-field label="A quais competências ou áreas ela está ligada?">
            <b-taginput
              v-model="tags"
              ellipsis
              icon="label"
              placeholder="Adicione uma TAG (e.g. Javascript)"
              @typing="getFilteredTags"
              :data="possibleTags"
              autocomplete
              :allow-new="allowNew"
              :open-on-focus="openOnFocus"
            >
            </b-taginput>
          </b-field>
        </b-step-item>

        <b-step-item
          :step="3"
          label="Referências"
          :clickable="
            DescricaoHabilidade != null &&
            DescricaoHabilidade != '' &&
            tags.length > 0
          "
          disabled
        >
          <h1 class="title has-text-centered">Referências de Apoio</h1>
          <b-field
            label="Quer demonstrar a habilidade em um vídeo ou referência externa (github, onedrive, google drive, etc) ? "
          >
            <div class="field">
              <b-switch v-model="wantsVideo"> </b-switch>
              <br />
              <b-field
                v-if="wantsVideo"
                label="Prefere fazer Upload de vídeo ou usar um link? "
              >
                <b-switch
                  v-model="videoType"
                  :rounded="false"
                  true-value="Link"
                  false-value="Upload"
                  type="is-primary"
                  passive-type="is-warning"
                  >{{ videoType }}
                </b-switch>
              </b-field>
            </div>
          </b-field>
          <b-field
            v-if="wantsVideo && videoType == 'Link'"
            label="Qual a URL da referência externa?"
          >
            <b-input
              placeholder="URL que demonstra a habilidade (e.g. oratória, captura de tela de desenvolvimento de sistema, resposta a entrevista, resolução de conflito)"
              type="url"
              v-model="VideoFeedbackURL"
            ></b-input>
          </b-field>
          <b-field
            v-if="wantsVideo && videoType != 'Link'"
            label="Faça o seu Upload "
          >
            <video-recorder :IdFeedBackRequest="IdFeedBackRequest" />
          </b-field> </b-step-item
        ><b-step-item
          :step="4"
          label="Final"
          :clickable="
            DescricaoHabilidade != null &&
            DescricaoHabilidade != '' &&
            tags.length > 0
          "
          disabled
        >
          <h1 class="title has-text-centered">Revise e Finalize</h1>
          <b-field label="Sua habilidade em palavras">
            <section>
              <b-message>
                {{ DescricaoHabilidade }}
              </b-message>
            </section>
          </b-field>
          <b-field label="Áreas de Conhecimento">
            <section>
              <b-taglist>
                <b-tag type="is-info" v-for="tag in tags" :key="tag">{{
                  tag
                }}</b-tag>
              </b-taglist>
            </section>
          </b-field>
          <b-field
            v-if="wantsVideo && videoType == 'Youtube'"
            label="Qual a URL do Vídeo?"
          >
            <b-input
              placeholder="URL para o vídeo onde você descreve ou demonstra a habilidade (e.g. oratória, captura de tela de desenvolvimento de sistema, resposta a entrevista, resolução de conflito)"
              type="url"
            ></b-input>
          </b-field>
          <b-field v-if="wantsVideo && videoType != 'Link'" label="Seu vídeo">
            <video class="preview" :src="VideoURLdeo" controls></video>
          </b-field>
          <b-field v-if="wantsVideo && videoType == 'Link'" label="Seu link">
            <a :href="VideoFeedbackURL" target="blank">{{
              VideoFeedbackURL
            }}</a>
          </b-field>
        </b-step-item>
      </b-steps>
    </section>
  </div>
</template>

<script>
import VideoRecorder from "../../components/VideoRecorder";
import firebase from "firebase";

// const possibleTags = [
//   {
//     type: "Geral",
//     items: [
//       "Idiomas",
//       "Comunicação",
//       "Liderança",
//       "Criatividade",
//       "Colaboração",
//       "Adaptabilidade",
//       "Flexibilidade",
//       "Raciocínio Analítico",
//       "Gerenciamento de Pessoas",
//       "Vendas",
//       "Processamento de Linguagem Natural",
//       "Estratégias Corporativas",
//     ],
//   },
//   {
//     type: "Empreendedorismos & Administração",
//     items: [
//       "Idiomas",
//       "Comunicação",
//       "Liderança",
//       "Criatividade",
//       "Colaboração",
//       "Gerenciamento de Pessoas",
//       "Vendas",
//       "Estratégias Corporativas",
//     ],
//   },
//   { type: "Idiomas", items: ["Tradução", "Inglês", "Espanhol", "Sueco"] },
//   {
//     type: "Áudio e Vídeo",
//     items: ["Produção de Vídeos", "Produção de Áudio"],
//   },
//   {
//     type: "Tecnologia",
//     items: [
//       "Desenvolvimento de Software",
//       "Computação em Nuvem",
//       "Inteligência Artificial",
//       "Aplicações Móveis",
//       "Persuasão",
//       "Discurso",
//       "Prática para Entrevista",
//       "Comunicação Corporativa",
//       "Marketing Digital",
//       "Marketing em Mídias Sociais",
//       "Mídias Sociais",
//       "Marketing",
//       "Jornalismo",
//     ],
//   },
//   {
//     type: "Comunicação",
//     items: [
//       "Persuasão",
//       "Discurso",
//       "Prática para Entrevista",
//       "Comunicação Corporativa",
//       "Marketing Digital",
//       "Marketing em Mídias Sociais",
//       "Mídias Sociais",
//       "Marketing",
//       "Jornalismo",
//     ],
//   },
//   {
//     type: "Desenvolvimento de Software",
//     items: [
//       "Desenvolvimento de Jogos",
//       "Teste de Software",
//       "Javascript",
//       "Python",
//       "Node.js",
//       "Polymer",
//       "React",
//       "RxJS",
//       "Vue.js",
//       "No Code / Low Code",
//     ],
//   },
// ];
const allTags = [
  "Idiomas",
  "Comunicação",
  "Criatividade",
  "Colaboração",
  "Adaptabilidade",
  "Flexibilidade",
  "Raciocínio Analítico",
  "Vendas",
  "Processamento de Linguagem Natural",
  "Estratégias Corporativas",

  "Liderança",

  "Gerenciamento de Pessoas",

  "Tradução",
  "Inglês",
  "Espanhol",
  "Sueco",
  "Produção de Vídeos",
  "Produção de Áudio",
  "Desenvolvimento de Software",
  "Computação em Nuvem",
  "Inteligência Artificial",
  "Aplicações Móveis",
  "Persuasão",
  "Discurso",
  "Prática para Entrevista",
  "Comunicação Corporativa",
  "Marketing Digital",
  "Marketing em Mídias Sociais",
  "Mídias Sociais",
  "Jornalismo",

  "Marketing",
  "Desenvolvimento de Jogos",
  "Teste de Software",
  "Javascript",
  "Python",
  "Node.js",
  "Polymer",
  "React",
  "RxJS",
  "Vue.js",
  "No Code / Low Code",
];

export default {
  components: { VideoRecorder },
  data() {
    return {
      wantsVideo: false,
      videoType: "Upload",
      allowNew: false,
      openOnFocus: true,
      tags: [],
      possibleTags: allTags,
      IdFeedBackRequest: null,
      VideoFeedbackURL: null,
      VideoURL: null,
      DescricaoHabilidade: null,

      activeStep: 0,

      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: true,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",
    };
  },
  computed: {
    isNextDisabled() {
      if (
        this.activeStep == 0 &&
        (this.DescricaoHabilidade == null || this.DescricaoHabilidade == "")
      ) {
        return true;
      }
      if (this.activeStep == 1 && this.tags.length == 0) {
        return true;
      }
      if (this.activeStep == 3) {
        return true;
      }
      return false;
    },
  },
  methods: {
    startFeedbackRequest() {
      if (this.IdFeedBackRequest == null) {
        this.IdFeedBackRequest = firebase
          .database()
          .ref()
          .child("/FeedbackRequests")
          .push().key;
      }
    },
    videoUploaded(url) {
      var thisVM = this;

      this.startFeedbackRequest();
      this.VideoFeedbackURL = url;
      firebase
        .database()
        .ref("/FeedbackRequests/" + this.IdFeedBackRequest)
        .set({
          DescricaoHabilidade: thisVM.DescricaoHabilidade,
          Areas: thisVM.tags,
          VideoURL: thisVM.nomeFornecedor,
          VideoFeedbackURL: thisVM.VideoFeedbackURL,
        });
    },
    gravarFinal() {
      this.gravar();
      this.$buefy.dialog.alert({
        message:
          "Deu tudo certo! Em breve você receberá um feedback sobre sua habilidade!",
        onConfirm: () => {
          this.$buefy.toast.open(`Feito`);
          this.$router.replace({
            name: "Home",
          });
        },
      });
    },
    gravar() {
      var thisVM = this;

      this.startFeedbackRequest();
      //thisVM.$root.startLoading();

      firebase
        .database()
        .ref("/FeedbackRequests/" + this.IdFeedBackRequest)
        .set({
          DescricaoHabilidade: thisVM.DescricaoHabilidade,
          Areas: thisVM.tags,
          VideoURL: thisVM.VideoURL,
          VideoFeedbackURL: thisVM.VideoFeedbackURL,
        });
    },
    getFilteredTags(text) {
      this.possibleTags = allTags.filter((option) => {
        return option.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    },
  },
};
</script>