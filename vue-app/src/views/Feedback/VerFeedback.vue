<template>
  <layout-default>
    <vue-headful
      title="Até o Futuro - Ver Feedback"
      description="Ver Feedback"
    />
    <div class="box">
      <h1 class="title is-3">
        <b-icon size="is-small" icon="atom"></b-icon
        ><b-icon size="is-small" icon=" "></b-icon>Ver Feedback
      </h1>
      <b-button @click="togglePedido()" type="is-primary" expanded><b-icon size="is-small" icon="newspaper"></b-icon
        ><b-icon size="is-small" icon=" "></b-icon>{{
        LABEL_TogglePedido
      }}</b-button>

      <skill-feedback-request
        :IdfeedBackRequest="$route.params.IdFeedbackRequest"
        :showSharableURL="true"
        v-show="displayRequest"
      />
      <skill-feedback-response-detail
        :IdFeedbackResponse="$route.params.IdFeedbackResponse"
        :IdFeedbackRequest="$route.params.IdFeedbackRequest"
      />
      <a :href="URL_MetaFeedback" target="blank">
        <b-button :href="URL_MetaFeedback" type="is-success" expanded size="is-large"
          > <b-icon size="is-small" icon="star"></b-icon
        ><b-icon size="is-small" icon=" "></b-icon>O que achou do feedback?</b-button
        ></a
      >
    </div>
  </layout-default>
</template>
<script>
import SkillFeedbackResponseDetail from "../../components/Feedback/SkillFeedbackResponseDetail";
import SkillFeedbackRequest from "../../components/Feedback/SkillFeedbackRequest";
export default {
  components: { SkillFeedbackRequest, SkillFeedbackResponseDetail },
  data() {
    return { displayRequest: false };
  },
  methods: {
    togglePedido() {
      this.displayRequest = !this.displayRequest;
    },
  },
  computed: {
    LABEL_TogglePedido() {
      return !this.displayRequest
        ? "Clique para ver o pedido de feedback"
        : "Esconder pedido de feedback";
    },
    URL_MetaFeedback() {
      return `https://docs.google.com/forms/d/e/1FAIpQLScMR5y7OkpDB-xjFECNrDoFvXCzTuzI8xGLujzK9yZ12OjMkA/viewform?usp=pp_url&entry.428987410=${this.$route.params.IdFeedbackRequest}&entry.1194876284=${this.$route.params.IdFeedbackResponse}
   `;
    },
  },
};
</script>