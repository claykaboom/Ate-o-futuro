<template>
  <layout-default
    ><div class="box">
      <vue-headful
        title="Até o Futuro - Feedback sobre habilidade"
        description="Peça Feedback sobre uma habilidade"
      />
      <h1 class="title is-3">
        Habilidade - Pedir Feedback
        <span v-if="ResumoHabilidade">sobre {{ ResumoHabilidade }}</span>
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
                <option value="pessoal">
                  Aprimoramento pessoal/curiosidade
                </option>
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
                :loading="$store.state.isLoading"
                placeholder="Detalhe alguns momentos em que você precisa dessa habilidade, dificuldades. Dados que ajudem seu feedback a ser mais específico."
                @keyup="gravar()"
              >
              </b-input>
            </b-field>
          </b-step-item>

          <b-step-item
            step="2"
            label="Áreas"
            :clickable="
              DescricaoHabilidade != null && DescricaoHabilidade != ''
            "
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
                <b-radio
                  v-model="ExternalReferenceType"
                  name="name"
                  native-value="Link"
                >
                  Link para referência externa (GitHub, Youtube, OneDrive,
                  Google Drive, Vimeo, etc.)
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
              <video-recorder
                :IdFeedBackRequest="IdFeedBackRequest"
                @uploadComplete="videoUploaded($event)"
              />
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
              v-if="
                WantsExternalReference &&
                ExternalReferenceType != 'Link' &&
                VideoStorageURL != null
              "
              label="Seu vídeo "
            >
              <video class="preview" :src="VideoStorageURL" controls></video>
            </b-field>
            <b-field
              v-if="WantsExternalReference && ExternalReferenceType == 'Link'"
              label="Seu link de referência para seu dador de Feedback"
            >
              <a :href="ExternalReferenceURL" target="blank">{{
                ExternalReferenceURL
              }}</a>
            </b-field>
            <h2 class="subtitle is-4">Peça & Aguarde seu Feedback</h2>
            Compartilhe seu pedido de feedback com pessoas de confiança! Vamos
            arrumar pessoas referência nessa habilidade para te dar um feedback.
            Mas, você pode usar esse link para compartilhar e pedir feedback de
            pessoas que já interagiram com você.

            <br />
            <br />
            <b-message title="Sua URL compartilhável" :closable="false">
              <b>IMPORTANTE:</b> Use esse link com cautela. Qualquer pessoa que
              o obtiver poderá ver o seu pedido de feedback e fornecer um
              feedback para você.

              <br />
              <br />

              <b>COPIE A SUA URL DE FEEDBACK:</b>
              <span> {{ finalAteOFuturoShareURL }} </span>
              <br />
            </b-message>
            <br />
            <!-- <a
            :href="finalLinkedInShareURL"
            onclick="window.open(this.href, 'mywin',
'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;"
          >
            <b-button type="is-info" icon-left="linkedin">
              Compartilhar no LinkedIn para receber Feedbacks das suas conexões
            </b-button>
          </a> -->
          </b-step-item>
        </b-steps>
      </section>
    </div>
  </layout-default>
</template>

<script>
import VideoRecorder from "../../components/VideoRecorder";
import firebase from "firebase";
import Areas from "../../CommonData/Areas.js";

const allTags = [...Areas];

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
      FinalidadeHabilidade: null,

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

  metaInfo() {
    return {
      title: `Até o Futuro - Dê seu feedback`,
      meta: [
        { name: "description", content: `Que tal se tornar uma pessoa mais fantástica por compartilhar um feedback?` },
        {
          property: "og:title",
          content: `Até o Futuro - Dê seu feedback`,
        },
        { property: "og:site_name", content: "Até o Futuro" },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
  computed: {
    finalLinkedInShareURL() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${this.finalAteOFuturoShareURL}&title=Dê%20um%20feedback%20e%20receba%205%20vantagens%20imediatas&summary=Olá!%20Que%20tal%20praticar%20a%20generosidade%20e%20dar%20um%20feedback%20para%20eu%20aprimorar%20minhas%20habilidades?!%20Até%20o%20Futuro!&source=AtéOFuturo`;
    },
    finalAteOFuturoShareURL() {
      return `https://AteOFuturo.com.br/DarFeedback/${this.IdFeedBackRequest}`;
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
      this.VideoStorageURL = url;
      // console.log(this.VideoStorageURL);
      this.gravar();
      this.$buefy.toast.open(`Vídeo gravado!`);
    },
    gravarFinal() {
      this.gravar();

      var thisVM = this;
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
          UserName: thisVM.$store.state.currentUser.displayName,
          UserId: thisVM.$store.state.currentUser.uid,
          UserEmail: thisVM.$store.state.currentUser.email,
          ExternalReferenceType: thisVM.ExternalReferenceType,
          WantsExternalReference: thisVM.WantsExternalReference,
        });

      this.$buefy.dialog.alert({
        message:
          "Deu tudo certo! Em breve você receberá um feedback sobre sua habilidade!",
        onConfirm: () => {
          this.$buefy.toast.open(`Feito`);
          this.$router.replace({
            name: "FeedbackDashboard",
          });
        },
      });
    },
    gravar() {
      this.startFeedbackRequest();
      //thisVM.$root.startLoading();
    },
    getFilteredTags(text) {
      this.possibleTags = allTags.filter((option) => {
        return option.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    },
  },
};
</script>