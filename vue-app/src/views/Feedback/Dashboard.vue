<template>
  <layout-default>
    <div class="box">
      <vue-headful
        title="Meu painel de feedbacks"
        description="Veja os pedidos e envios de feedback"
      />
      <h1 class="title is-3">Meu painel de feedbacks</h1>
      <div class="buttons">
        <router-link
          class="button is-success is-large"
          :to="{ name: 'SkillFeedback' }"
        >
          <b-icon size="is-small" icon="arrow-right"></b-icon
          ><b-icon size="is-small" icon=""></b-icon> Peça seu
          feedback</router-link
        >
      </div>
      <b-tabs type="is-boxed">
        <b-tab-item label="Pedidos de Feedback" icon="silverware-spoon">
          <div class="box">
            <b-table
              :data="feedBackRequests"
              :bordered="true"
              :striped="true"
              :narrowed="true"
              :hoverable="true"
              :loading="$root.isLoading"
              :focusable="false"
              :mobile-cards="false"
              :selected.sync="selected"
            >
              <b-table-column
                field="ResumoHabilidade"
                label="Resumo"
                v-slot="props"
              >
                {{ props.row.ResumoHabilidade }}
              </b-table-column>
              <b-table-column
                field="QtdFeedbacks"
                label="Feedbacks recebidos"
                v-slot="props"
              >
                {{ props.row.QtdFeedbacks ? props.row.QtdFeedbacks : "0" }}
              </b-table-column>
              <b-table-column
                field="ClassificacaoMedia"
                label="Classificação"
                v-slot="props"
              >
                <b-rate
                  v-if="props.row.ClassificacaoMedia"
                  v-model="props.row.ClassificacaoMedia"
                  :show-score="true"
                  :disabled="true"
                />
                {{ props.row.ClassificacaoMedia == null ? "N/A" : "" }}
              </b-table-column>
            </b-table>
          </div>
          <div class="box" v-if="selected">
            <b-tabs type="is-toggle-rounded" expanded>
              <b-tab-item
                label="Resumo do seu pedido de feedback"
                icon="newspaper"
              >
                <skill-feedback-request
                  :IdfeedBackRequest="selected.id"
                  :showSharableURL="true"
                />
              </b-tab-item>
              <template v-for="(tab, value, index) in selected.Feedbacks">
                <b-tab-item
                  :key="tab.id"
                  :value="tab.id"
                  :label="'Feedback ' + (index + 1)"
                >
                  <skill-feedback-response-detail
                    :IdFeedbackResponse="value"
                    :IdFeedbackRequest="selected.id"
                  />
                </b-tab-item>
              </template>
            </b-tabs>
          </div>
        </b-tab-item>

        <b-tab-item label="Feedbacks fornecidos" icon="forum">
          Clique em uma linha da tabela, e depois no botão azul ao fim dela para ver os detalhes do feedback fornecido. <br /><br />

          <b-table
            :data="feedBackResponses"
            :bordered="true"
            :striped="true"
            :narrowed="true"
            :hoverable="true"
            :loading="$root.isLoading"
            :focusable="false"
            :mobile-cards="false"
            :selected.sync="selectedResponse"
          >
            <b-table-column field="Id" label="ID FEEDBACK" v-slot="props">
              {{ props.row.id }}
            </b-table-column>
            <b-table-column
              field="Usuário"
              label="Alvo do Feedback"
              
            >
              ######## ## ####
            </b-table-column>
            <b-table-column
              field="ClassificacaoFinal"
              label="Classificação"
              v-slot="props"
            >
              <b-rate
                v-if="props.row.ClassificacaoFinal"
                v-model="props.row.ClassificacaoFinal"
                :show-score="true"
                :disabled="true"
              />
              {{ props.row.ClassificacaoFinal == null ? "N/A" : "" }}
            </b-table-column>
          </b-table>
<br /><br />
          <skill-feedback-response-detail v-if="selectedResponse"
                    :IdFeedbackResponse="selectedResponse.id"
                    :IdFeedbackRequest="selectedResponse.IdFeedbackRequest"
                  />


        </b-tab-item>
      </b-tabs>
    </div>
  </layout-default>
</template>

<script>
import firebase from "firebase";
import SkillFeedbackRequest from "../../components/Feedback/SkillFeedbackRequest";
import SkillFeedbackResponseDetail from "../../components/Feedback/SkillFeedbackResponseDetail";

export default {
  name: "provide-skill-feedback",
  components: { SkillFeedbackRequest, SkillFeedbackResponseDetail },
  //props: ["IdfeedBackRequest"],
  data() {
    return {
      IdfeedBackRequest: null,
      selected: null,
      selectedResponse: null,
      feedBackRequests: [],
      feedBackResponses: [],
      feedbackText: null,
      RatedAreas: [],
      ContinuarFazendo: null,
      EvitarFazer: null,
      PassarAFazer: null,
      LinkedInURL: null,
      ReferenceBooks: null,
      ReferenceWorkLink: null,
      ItensfeedBackRequest: [],
    };
  },
  mounted() {
    var thisVM = this;
    thisVM.IdfeedBackRequest = thisVM.$route.params.IdfeedBackRequest;
    this.getData();
  },
  methods: {
    gravarFinal: function () {
      var thisVM = this;
      var feedbackResponseId = firebase
        .database()
        .ref()
        .child(`/FeedbackRequests/${thisVM.IdfeedBackRequest}/Feedbacks`)
        .push().key;

      firebase
        .database()
        .ref(
          "/FeedbackRequests/" +
            thisVM.IdfeedBackRequest +
            "/Feedbacks/" +
            feedbackResponseId
        )
        .set({
          RatedAreas: thisVM.RatedAreas,
          ContinuarFazendo: thisVM.ContinuarFazendo,
          EvitarFazer: thisVM.EvitarFazer,
          PassarAFazer: thisVM.PassarAFazer,
          feedbackText: thisVM.feedbackText,

          LinkedInURL: thisVM.LinkedInURL,
          ReferenceBooks: thisVM.ReferenceBooks,
          ReferenceWorkLink: thisVM.ReferenceWorkLink,
          UserName: thisVM.$root.$currentUser.displayName,
          UserId: thisVM.$root.$currentUser.uid,
          UserEmail: thisVM.$root.$currentUser.email,
        });

      this.$buefy.dialog.alert({
        message:
          "Deu tudo certo! Obrigado pela generosidade de seu tempo. Depois faremos um Debriefing do processo com você!",
        onConfirm: () => {
          this.$buefy.toast.open(`Feito`);
          this.$router.replace({
            name: "Home",
          });
        },
      });
    },
    clearRequestsData: function () {
      this.feedBackRequests.splice(0, this.feedBackRequests.length);
    },
    clearResponsesData: function () {
      this.feedBackResponses.splice(0, this.feedBackResponses.length);
    },
    getData() {
      var thisVM = this;
      thisVM.$root.startLoading();
      var feedBackRequests = firebase
        .database()
        .ref(`Users/${thisVM.$root.$currentUser.uid}/FeedbackRequests`);
      var feedBackResponses = firebase
        .database()
        .ref(`Users/${thisVM.$root.$currentUser.uid}/FeedbackResponses`);

      feedBackRequests.on("value", function (snapshot) {
        thisVM.clearRequestsData();
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            var ClassificacaoMedia = null;
            var ClassificacaoTotal = 0;
            var CountClassificacao = 0;
            if (
              childData.Feedbacks != null &&
              Object.keys(childData.Feedbacks).length > 0
            ) {
              Object.keys(childData.Feedbacks).forEach((feedbackResponseId) => {
                if (
                  childData.Feedbacks[feedbackResponseId].ClassificacaoFinal !=
                    null &&
                  !isNaN(
                    childData.Feedbacks[feedbackResponseId].ClassificacaoFinal
                  )
                ) {
                  CountClassificacao++;
                  ClassificacaoTotal +=
                    childData.Feedbacks[feedbackResponseId].ClassificacaoFinal;
                }
              });
            }
            ClassificacaoMedia =
              CountClassificacao > 0
                ? ClassificacaoTotal / CountClassificacao
                : null;

            thisVM.feedBackRequests.push({
              id: childSnapshot.key,
              ResumoHabilidade: childData.ResumoHabilidade,
              ClassificacaoMedia: ClassificacaoMedia,
              QtdFeedbacks:
                childData.Feedbacks != null && Object.keys(childData.Feedbacks)
                  ? Object.keys(childData.Feedbacks).length
                  : 0,
              Feedbacks: childData.Feedbacks,
            });
          }
        });

        thisVM.$buefy.toast.open(`Tudo certo!`);
        thisVM.$root.stopLoading();
      });

      feedBackResponses.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            thisVM.feedBackResponses.push({
              id: childSnapshot.key,
              ClassificacaoFinal: childData.ClassificacaoFinal,
              IdFeedbackRequest: childData.IdFeedbackRequest
            });
          }
        });

        thisVM.$buefy.toast.open(`Tudo certo!`);
        thisVM.$root.stopLoading();
      });
    },
  },
};
</script>