<template>
  <layout-default>
    <div class="box">
      <vue-headful
        title="Até o Futuro - Meu painel de feedbacks"
        description="Veja os pedidos e envios de feedback"
      />
      <h1 class="title is-3">
        <b-icon icon="atom" size="is-medium" /> Meu painel de feedbacks
      </h1>
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
              :loading="$store.state.isLoading"
              :focusable="false"
              :mobile-cards="false"
              :selected.sync="selected"
            >
              <b-table-column
                field="ResumoHabilidade"
                label="Resumo"
                v-slot="props"
              >
                <span :title="`Feedback sobre ${props.row.TipoFeedback}`"
                  ><b-icon
                    class="media-left"
                    :icon="props.row.TipoFeedbackIcon"
                  ></b-icon></span
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
          Clique em uma linha da tabela, e depois no botão azul ao fim dela para
          ver os detalhes do feedback fornecido. <br /><br />

          <b-table
            :data="feedBackResponses"
            :bordered="true"
            :striped="true"
            :narrowed="true"
            :hoverable="true"
            :loading="$store.state.isLoading"
            :focusable="false"
            :mobile-cards="false"
            :selected.sync="selectedResponse"
          >
            <b-table-column field="Id" label="Tipo de Feedback" v-slot="props">
              <span
                :title="
                  props.row.FeedBackRequestTipoFeedback +
                  ': ' +
                  props.row.FeedBackRequestResumo
                "
              >
                <b-icon
                  class="media-left"
                  :icon="props.row.FeedBackRequestTipoFeedbackIcon"
                ></b-icon>

                {{ props.row.FeedBackRequestResumo }}</span
              >
            </b-table-column>
            <b-table-column field="Data" label="Data" v-slot="props">
              {{ props.row.Data | moment("DD/MM/YYYY HH:mm") }}
            </b-table-column>
            <b-table-column
              field="Usuário"
              label="Alvo do Feedback"
              v-slot="props"
            >
              {{ props.row.RequesterUserName }}
            </b-table-column>
            <b-table-column
              field="ClassificacaoFinal"
              label="Classificação dada"
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
          <skill-feedback-response-detail
            v-if="selectedResponse"
            :IdFeedbackResponse="selectedResponse.id"
            :IdFeedbackRequest="selectedResponse.IdFeedbackRequest"
          />
        </b-tab-item>
      </b-tabs>
    </div>
  </layout-default>
</template>

<script>
import LineChart from "../../components/Charts/LineChart";
import firebase from "firebase";
import SkillFeedbackRequest from "../../components/Feedback/SkillFeedbackRequest";
import SkillFeedbackResponseDetail from "../../components/Feedback/SkillFeedbackResponseDetail";

export default {
  name: "provide-skill-feedback",
  components: { SkillFeedbackRequest, SkillFeedbackResponseDetail, LineChart },
  //props: ["IdfeedBackRequest"],
  data() {
    return {
      datacollection: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20],
          },
        ],
      },
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
    clearRequestsData: function () {
      this.feedBackRequests.splice(0, this.feedBackRequests.length);
    },
    clearResponsesData: function () {
      this.feedBackResponses.splice(0, this.feedBackResponses.length);
    },
    getData() {
      var thisVM = this;
      // thisVM.$root.startLoading();

      thisVM.$store.commit("startLoading");
      var feedBackRequests = firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/FeedbackRequests`);
      var feedBackResponses = firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/FeedbackResponses`);

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
            var icon = "bike";
            switch (childData.TipoFeedback) {
              case "Habilidade":
                icon = "bike";
                break;
              case "Ideia":
                icon = "lightbulb";
                break;
              case "Evento":
                icon = "flash";
                break;
              default:
                icon = "comment-question";
                break;
            } 
            thisVM.feedBackRequests.push({
              id: childSnapshot.key,
              ResumoHabilidade: childData.ResumoHabilidade,
              TipoFeedback:
                childData.TipoFeedback,
              TipoFeedbackIcon: icon,
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

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });

      feedBackResponses.on("value", function (snapshot) {
        thisVM.clearResponsesData();
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            var icon = "bike";
            switch (childData.FeedBackRequestTipoFeedback) {
              case "Habilidade":
                icon = "bike";
                break;
              case "Ideia":
                icon = "lightbulb";
                break;
              case "Evento":
                icon = "flash";
                break;
              default:
                icon = "comment-question";
                break;
            }
            thisVM.feedBackResponses.push({
              id: childSnapshot.key,
              ClassificacaoFinal: childData.ClassificacaoFinal,
              IdFeedbackRequest: childData.IdFeedbackRequest,
              RequesterUserName: childData.RequesterUserName,
              FeedBackRequestTipoFeedback:
                childData.FeedBackRequestTipoFeedback,
              FeedBackRequestTipoFeedbackIcon: icon,
              FeedBackRequestResumo: childData.FeedBackRequestResumo
                ? childData.FeedBackRequestResumo
                : "Feedback",

              Data: childData.Data ? childData.Data : new Date(),
            });
          }
        });

        thisVM.$buefy.toast.open(`Tudo certo!`);

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
  },
};
</script>