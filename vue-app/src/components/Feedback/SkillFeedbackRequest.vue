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
    <h2 class="subtitle is-4 has-text-centered">
      {{ LABEL_TipoDeFeedback }} <b-icon :icon="ICON_TipoDeFeedback" />
    </h2>

    <div class="columns box" style="background-color: #efefdd">
      <div class="column is-2">
        <vue-svg-gauge
          v-bind:class="{
            'animate__animated animate__heartBeat animate__faster':
              feedBackRequest.QualidadePedido >= 100,
          }"
          :start-angle="-110"
          :end-angle="110"
          :value="feedBackRequest.QualidadePedido"
          :separator-step="0"
          :min="0"
          :max="100"
          gauge-color="#00D380"
          :scale-interval="1"
        />
      </div>
      <div class="column is-10">
        <h3 class="title is-4">💪 FORÇA DO PEDIDO</h3>
        A força do pedido indica o nível de detalhamento fornecido para que seu
        feedback seja:
        <b>descritivo, específico, dirigido, oportuno e esclarecedor.</b>
      </div>
    </div>

    <b-field :label="LABEL_TipoDeFeedbackEsperado">
      <section>
        <b-message type="is-success">
          {{ feedBackRequest.ResumoHabilidade }}
        </b-message>
      </section>
    </b-field>
    <b-field :label="LABEL_Detalhes">
      <section>
        <b-message type="is-success">
          <div v-html="ComputedDetalhes"></div>
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
    <b-field expanded> <a :href="feedBackRequest.ExternalReferenceURL" target="blank">{{
        feedBackRequest.ExternalReferenceURL
      }}</a
      ></b-field> 
      <div class="columns">
        <youtube expanded :video-id="videoId" v-if="videoId != null"></youtube>
      </div>
      <br />
    </b-field>

    <b-field label="Finalidade do aprimoramento:">
      <b-message>{{ FinalidadeHabilidade.text }}</b-message>
    </b-field>

    <h2 class="subtitle is-4 has-text-centered">👊🏻 Medidas já tomadas ⚡</h2>
    <b-field
      label="Olha o que já foi feito"
      v-if="feedBackRequest.AcoesTomadas != null"
    >
      <section>
        <b-message type="is-success">
          <div v-html="ComputedAcoesTomadas"></div>
        </b-message>
      </section>
    </b-field>
    <div v-else>
      {{ LABEL_NenhumaAcaoTomada }}
    </div>
    <div v-if="feedBackRequest.JaRefletiu">
      <h2 class="subtitle is-4 has-text-centered">🧠 Reflexões feitas 💭</h2>

      <b-message
        v-for="reflexao in feedBackRequest.Reflexoes"
        v-bind:key="reflexao.pergunta"
        :title="reflexao.pergunta"
        :closable="false"
      >
        <div v-html="reflexao.resposta.replaceAll('\n', '<br />')"></div>
      </b-message>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { getIdFromURL } from "vue-youtube-embed";
import VueYouTubeEmbed from "vue-youtube-embed";

import { VueSvgGauge } from "vue-svg-gauge";

export default {
  name: "Skill-feedback-request",
  props: {
    IdfeedBackRequest: String,
    showSharableURL: { type: Boolean, default: false },
  },
  components: { VueYouTubeEmbed, VueSvgGauge },
  data() {
    return {
      feedBackRequest: {},
      videoId: null,
    };
  },
  created() {
    this.getData();
  },
  watch: {
    IdfeedBackRequest() {
      this.getData();
    },
  },
  computed: {
    TipoDeFeedback() {
      return this.feedBackRequest.TipoFeedback
        ? this.feedBackRequest.TipoFeedback
        : "Habilidade";
    },

    LABEL_NenhumaAcaoTomada() {
      if (this.feedBackRequest.TipoFeedback == null)
        return 'Na época em que esse pedido foi feito, o campo de "Ações Tomadas" não existia. 😢';

      switch (this.feedBackRequest.TipoFeedback) {
        case "Habilidade":
          return `${this.feedBackRequest.UserName} não indicou nenhuma ação tomada para aprimorar sua habilidade.`;

        case "Evento":
          return `${this.feedBackRequest.UserName} não indicou nenhuma ação tomada para aprimorar eventos similares.`;

        case "Ideia":
          return `${this.feedBackRequest.UserName} não indicou nenhuma ação tomada para aprimorar sua ideia.`;
      }
      return "";
    },
    LABEL_TipoDeFeedback() {
      if (this.feedBackRequest.TipoFeedback == null)
        return "Este é um pedido de feedback sobre uma habilidade";

      switch (this.feedBackRequest.TipoFeedback) {
        case "Habilidade":
          return "Este é um pedido de feedback sobre uma habilidade";

        case "Evento":
          return "Este é um pedido de feedback sobre um evento";

        case "Ideia":
          return "Este é um pedido de feedback sobre uma ideia";
      }
      return "";
    },
    ICON_TipoDeFeedback() {
      if (this.feedBackRequest.TipoFeedback == null) return "bike";

      switch (this.feedBackRequest.TipoFeedback) {
        case "Habilidade":
          return "bike";

        case "Evento":
          return "flash";

        case "Ideia":
          return "lightbulb";
      }
      return "";
    },

    LABEL_TipoDeFeedbackEsperado() {
      if (this.feedBackRequest.TipoFeedback == null)
        return "Habilidade Esperada";

      switch (this.feedBackRequest.TipoFeedback) {
        case "Habilidade":
          return "Habilidade Esperada";

        case "Evento":
          return "Tipo de Evento Esperado";

        case "Ideia":
          return "Ideia";
      }
      return "";
    },
    LABEL_Detalhes() {
      if (this.feedBackRequest.TipoFeedback == null)
        return "Detalhes sobre como a Habilidade é exercitada, dificuldades, etc.";

      switch (this.feedBackRequest.TipoFeedback) {
        case "Habilidade":
          return "Detalhes sobre como a Habilidade é exercitada, dificuldades, etc.";

        case "Evento":
          return "Objetivo do evento, importância de realizá-lo, dificuldades e desafios. ";

        case "Ideia":
          return "Objetivo da Ideia, dificuldades e desafios.";
      }
      return "";
    },
    ComputedDetalhes() {
      debugger;
      return this.feedBackRequest.DescricaoHabilidade? this.feedBackRequest.DescricaoHabilidade.replaceAll("\n", "<br />"):null;
    },
    ComputedAcoesTomadas() {
      return this.feedBackRequest.AcoesTomadas? this.feedBackRequest.AcoesTomadas.replaceAll("\n", "<br />"):null;
    },
    FinalidadeHabilidade() {
      var obj = this.OPTIONS_FinalidadeUsoFeedback.filter((obj) => {
        return obj.value == this.feedBackRequest.FinalidadeHabilidade;
      })[0];
      if (obj != null) return obj;
      else return { value: "", text: "Nenhuma finalidade foi informada" };
    },

    finalAteOFuturoShareURL() {
      return `https://AteOFuturo.com.br/DarFeedback/${this.IdfeedBackRequest}`;
    },

    OPTIONS_FinalidadeUsoFeedback() {
      if (this.feedBackRequest.TipoFeedback == null) {
        //manter  retrocompatibilidade
        return [
          { value: "pessoal", text: "Aprimoramento pessoal/curiosidade" },
          {
            value: "novo-cargo",
            text: "Estou entrando em novo cargo/emprego",
          },
          { value: "dia-a-dia", text: "Preciso dela no dia-a-dia" },
          {
            value: "diferencial",
            text: "Quero me diferenciar no mercado de trabalho",
          },
        ];
      }
      switch (this.feedBackRequest.TipoFeedback) {
        case "Habilidade":
          return [
            { value: "pessoal", text: "Aprimoramento pessoal/curiosidade" },
            {
              value: "novo-cargo",
              text: "Estou entrando em novo cargo/emprego",
            },
            { value: "dia-a-dia", text: "Preciso dela no dia-a-dia" },
            {
              value: "diferencial",
              text: "Quero me diferenciar no mercado de trabalho",
            },
          ];
        case "Ideia":
          return [
            { value: "novo-negocio", text: "Estou elaborando um novo negócio" },
            {
              value: "hackathon",
              text: "Estou participando de um hackathon ou competição",
            },
            {
              value: "dia-a-dia",
              text: "Quero melhorar meu trabalho/experiência no dia-a-dia",
            },
            {
              value: "ajudar-sociedade",
              text: "Quero ajudar a sociedade",
            },
          ];
        case "Evento":
          return [
            {
              value: "gerar-ideias",
              text: "Quero ter mais ideias sobre como resolver problemas",
            },
            {
              value: "tomar-decisoes",
              text: "Quero tomar decisões com um grupo",
            },
            {
              value: "informacoes",
              text: "Quero passar informações para pessoas",
            },
            {
              value: "trabalho-em-equipe",
              text: "Quero executar um trabalho com uma equipe",
            },
            {
              value: "criar-espirito-de-equipe",
              text: "Espírito de Equipe - Aproximar os membros do time",
            },
            {
              value: "networking",
              text:
                "Networking - Quero criar oportunidades para que pessoas conheçam umas às outras",
            },
            {
              value: "inspiracao",
              text:
                "Inspiração - Quero que as pessoas se inspirem umas com as outras",
            },
            {
              value: "reconhecimento",
              text:
                "Reconhecimento - Quero que eu ou meu trabalho seja reconhecido / Lembrado",
            },
            {
              value: "quebrar-rotina",
              text:
                "Quebrar a rotina - Quero que reenergizar as pessoas por fazê-las sair da rotina",
            },
            {
              value: "divulgar-negocio",
              text: "Divulgar Negócio ou Ideia",
            },
            {
              value: "revisitar-situacao",
              text:
                "Revisitar uma situação que poderia ter tido um resultado melhor",
            },
          ];
      }
      return [];
    },
  },
  methods: {
    getData() {
      var thisVM = this;
      this.videoId = null;
      // thisVM.$root.startLoading();

      thisVM.$store.commit("startLoading");
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
        if (thisVM.feedBackRequest != null) {
          // it seems sometimes it is returning null. i don't know why
          thisVM.$buefy.toast.open(
            `Detalhes do pedido sobre "${thisVM.feedBackRequest.ResumoHabilidade}" carregados!`
          );
        }

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
  },
};
</script>