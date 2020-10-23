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
            label="Qual habilidade você gostaria de aprimorar e receber feedback?"
          >
            <b-input
              placeholder="Descreva a habilidade sobre a qual você quer feedback aqui de maneira breve."
              rounded
              v-model="ResumoHabilidade"
              @keyup="gravar()"
            ></b-input>
          </b-field>

          <b-field label="Qual sua relação com essa habilidade atualmente?">
            <b-select
              placeholder="Para quê você quer essa habilidade?"
              v-model="FinalidadeHabilidade"
              expanded
            >
              <option value="pessoal">Aprimoramento pessoal/curiosidade</option>
              <option value="novo-cargo">
                Estou entrando em novo cargo/emprego
              </option>
              <option value="dia-a-dia">Preciso dela no dia-a-dia</option>
              <option value="diferencial">
                Quero me diferenciar no mercado de trabalho
              </option>
            </b-select>
          </b-field>
          <b-field :label="labelComoDemonstra">
            <b-input
              v-model="DescricaoHabilidade"
              type="textarea"
              minlength="10"
              maxlength="365"
              :loading="$root.isLoading"
              placeholder="Detalhe alguns momentos em que você precisa dessa habilidade, dificuldades. Dados que ajudem seu feedback a ser mais específico."
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
          <b-field
            label="A quais competências ou áreas ela está ligada? Escolher as áreas vai ajudar a gente a escolher a(s) pessoa(s) mais capacitada(s) para te dar um retorno de qualidade."
          >
            <b-taginput
              v-model="Areas"
              ellipsis
              icon="label"
              placeholder="Adicione uma ou mais TAGS (e.g. Javascript)"
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
            Areas.length > 0
          "
          disabled
        >
          <h1 class="title has-text-centered">Referências de Apoio</h1>
          <b-field
            label="Como você quer demonstrar essa habilidade?"
            type="is-danger"
          >
            <div class="block">
              <b-radio
                v-model="ExternalReferenceType"
                name="name"
                native-value="Upload"
              >
                Upload de Vídeo
              </b-radio>
              <b-radio v-model="ExternalReferenceType" name="name" native-value="Link">
                Link para referência externa (GitHub, Youtube, OneDrive, Google
                Drive, Vimeo, etc.)
              </b-radio>
            </div>
          </b-field>

          <b-field
            v-if="WantsExternalReference && ExternalReferenceType == 'Link'"
            label="Qual a URL da referência externa?"
          >
            <b-input
              placeholder="URL que demonstra a habilidade (e.g. oratória, captura de tela de desenvolvimento de sistema, resposta a entrevista, resolução de conflito)"
              type="url"
              v-model="ExternalReferenceURL"
            ></b-input>
          </b-field>
          <b-field
            v-if="WantsExternalReference && ExternalReferenceType != 'Link'"
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
            Areas.length > 0
          "
          disabled
        >
          <h1 class="title has-text-centered">Revise e Finalize</h1>
          <b-field label="Habilidade Esperada">
            <section>
              <b-message type="is-success">
                {{ ResumoHabilidade }}
              </b-message>
            </section>
          </b-field>
          <b-field label="Sua habilidade em mais detalhes">
            <section>
              <b-message>
                {{ DescricaoHabilidade }}
              </b-message>
            </section>
          </b-field>
          <b-field label="Áreas de Conhecimento">
            <section>
              <b-taglist>
                <b-tag type="is-warning" v-for="tag in Areas" :key="tag">{{
                  tag
                }}</b-tag>
              </b-taglist>
            </section>
          </b-field>
          <b-field
            v-if="WantsExternalReference && ExternalReferenceType == 'Youtube'"
            label="Qual a URL do Vídeo?"
          >
            <b-input
              placeholder="URL para o vídeo onde você descreve ou demonstra a habilidade (e.g. oratória, captura de tela de desenvolvimento de sistema, resposta a entrevista, resolução de conflito)"
              type="url"
            ></b-input>
          </b-field>
          <b-field
            v-if="
              WantsExternalReference &&
              ExternalReferenceType != 'Link' &&
              VideoStorageURL != null
            "
            label="Seu vídeo"
          >
            <video class="preview" :src="VideoStorageURL" controls></video>
          </b-field>
          <b-field
            v-if="WantsExternalReference && ExternalReferenceType == 'Link'"
            label="Seu link"
          >
            <a :href="ExternalReferenceURL" target="blank">{{
              ExternalReferenceURL
            }}</a>
          </b-field>

          <a
            :href="finalShareURL"
            onclick="window.open(this.href, 'mywin',
'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;"
          >
            <b-button type="is-info" icon-left="linkedin">
              Compartilhar no LinkedIn para receber Feedbacks das suas conexões
            </b-button>
          </a>
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
      WantsExternalReference: true,
      ExternalReferenceType: "Upload",
      allowNew: false,
      openOnFocus: true,
      Areas: [],
      possibleTags: allTags,
      IdFeedBackRequest: null,
      ExternalReferenceURL: null,
      VideoStorageURL: null,
      ResumoHabilidade: null,
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
    finalShareURL() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=https://AteOFuturo.com.br/DarFeedback/${this.IdFeedBackRequest}&title=Dê%20um%20feedback%20e%20receba%205%20vantagens%20imediatas&summary=Olá!%20Que%20tal%20praticar%20a%20generosidade%20e%20dar%20um%20feedback%20para%20eu%20aprimorar%20minhas%20habilidades?!%20Até%20o%20Futuro!&source=AtéOFuturo`;
    },
    labelComoDemonstra() {
      const finalLabel =
        "Lembre-se de detalhar isso para ajudar a pessoa que vai te dar Feedback a entender o seu momento.";
      if (this.ResumoHabilidade != null) {
        return (
          'Quais são suas dificuldades em demonstrar a habilidade de  "' +
          this.ResumoHabilidade +
          '" hoje em dia e sob quais circunstâncias você precisa dela? ' +
          finalLabel
        );
      }
      return (
        "Quais são suas dificuldades em demonstrar a habilidade acima hoje em dia e sob quais circunstâncias você precisa dela? " +
        finalLabel
      );
    },
    isNextDisabled() {
      if (
        this.activeStep == 0 &&
        (this.DescricaoHabilidade == null || this.DescricaoHabilidade == "")
      ) {
        return true;
      }
      if (this.activeStep == 1 && this.Areas.length == 0) {
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
      this.startFeedbackRequest();
      this.ExternalReferenceURL = url;
      this.gravar();
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
          FinalidadeHabilidade: thisVM.FinalidadeHabilidade,
          ResumoHabilidade: thisVM.ResumoHabilidade,
          DescricaoHabilidade: thisVM.DescricaoHabilidade,
          Areas: thisVM.Areas,
          VideoStorageURL: thisVM.VideoStorageURL,
          ExternalReferenceURL: thisVM.ExternalReferenceURL,
          UserName: thisVM.$root.$currentUser.displayName,
          UserId: thisVM.$root.$currentUser.uid,
          UserEmail: thisVM.$root.$currentUser.email,
          ExternalReferenceType: thisVM.ExternalReferenceType,
          WantsExternalReference: thisVM.WantsExternalReference,
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