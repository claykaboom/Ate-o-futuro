<template>
  <div>
    <b-button @click="getData()" type="is-info"   expanded
      ><b-icon size="is-small" icon="eye-outline"></b-icon
        ><b-icon size="is-small" icon=" "></b-icon>Clique para ver detalhes do Feedback</b-button
    >
    <div v-if="feedbackResponse">
      <br />
      <b-message :closable="false" title="Isenção de Responsabilidade">
        Todo o conteúdo deste feedback foi escrito por uma pessoa que
        voluntariamente cedeu seu tempo para dar o seu parecer. Por essa razão,
        não temos controle sobre se há algo ofensivo na mensagem. <br />
        Caso haja algo que não esteja dentro dos padrões éticos e de respeito ao
        próximo, entre em contato para tomarmos as devidas providências.
      </b-message>

      <br />
      <b-message :closable="false" class="is-centered has-text-centered ">
        <h3 class="subtitle is-4">
          Sua classificação média:
        </h3>
        <b-rate
          size="is-large"
          class="is-centered"
          v-model="feedbackResponse.ClassificacaoFinal"
          disabled  
          :showScore="true"
        ></b-rate>
        Entenda melhor essa classificação olhando os detalhes a
        seguir.</b-message
      >

      <b-message
        :closable="false"
        type="is-success"
        title="O que você pode continuar fazendo"
      >
        <div v-html="htmlContinuarFazendo"></div>
      </b-message>
      <br />
      <b-message
        :closable="false"
        type="is-danger"
        title="O que você pode poderia evitar fazer"
      >
        <div v-html="htmlEvitarFazer"></div>
      </b-message>
      <br />
      <b-message
        :closable="false"
        type="is-warning"
        title="O que você pode passar a fazer"
      >
        <div v-html="htmlPassarAFazer"></div>
      </b-message>

      <b-message>
        <div v-for="area in feedbackResponse.RatedAreas" :key="area.Name">
          <b-tag type="is-warning">{{ area.Name }}</b-tag>
          <b-rate v-model="area.Rating" disabled></b-rate><br />
        </div>
      </b-message>

      <a
        :href="feedbackResponse.LinkedInURL"
        v-if="feedbackResponse.LinkedInURL"
        target="blank"
        class="button is-info"
        ><b-icon icon="linkedin" /><b-icon icon="" /> &nbsp; &nbsp;Visitar
        LinkedIn do dador desse feedback</a
      ><br />
      <br />
      <b-message
        :closable="false"
        title="Leituras de Referência"
        v-if="feedbackResponse.ReferenceBooks"
      >
        {{ feedbackResponse.ReferenceBooks }}
      </b-message>
      <br />
      <b-message
        :closable="false"
        title="Outro link de referência"
        v-if="feedbackResponse.ReferenceWorkLink"
      >
        <a
          :href="feedbackResponse.ReferenceWorkLink"
          target="blank"
          class="button is-default"
          ><b-icon icon="chain" /><b-icon icon="" />
          {{ feedbackResponse.ReferenceWorkLink }}
        </a>
      </b-message>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "skill-feedback-response-detail",
  props: {
    IdFeedbackResponse: String,
    IdFeedbackRequest: String,
  },
  data() {
    return {
      feedbackResponse: null,
    };
  },
  created() {
    //this.getData();
  },
  watch: {
    IdFeedbackResponse() {
      this.getData();
    },
    IdFeedbackRequest() {
      this.getData();
    },
  },
  computed: {
    htmlPassarAFazer() {
      return this.feedbackResponse && this.feedbackResponse.PassarAFazer
        ? this.feedbackResponse.PassarAFazer.replaceAll("\n", "<br />")
        : "";
    },
    htmlEvitarFazer() {
      return this.feedbackResponse && this.feedbackResponse.EvitarFazer
        ? this.feedbackResponse.EvitarFazer.replaceAll("\n", "<br />")
        : "";
    },
    htmlContinuarFazendo() {
      return this.feedbackResponse && this.feedbackResponse.ContinuarFazendo
        ? this.feedbackResponse.ContinuarFazendo.replaceAll("\n", "<br />")
        : "";
    },
  },
  methods: {
    getData() {
      var thisVM = this;
      //   thisVM.$root.startLoading();

      thisVM.$store.commit("startLoading");
      var feedbackResponse = firebase
        .database()
        .ref(
          `FeedbackRequests/${thisVM.IdFeedbackRequest}/Feedbacks/${thisVM.IdFeedbackResponse}`
        );
      feedbackResponse.on("value", function (snapshot) {
        thisVM.feedbackResponse = snapshot.val();
        //thisVM.$buefy.toast.open(`Feedback ${thisVM.IdFeedbackResponse} carregado!`);

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
  },
};
</script>