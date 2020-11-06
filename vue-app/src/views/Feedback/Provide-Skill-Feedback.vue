<template>
  <layout-default>
    <div class="box">
      <vue-headful
        :title="'Feedback para ' + feedBackRequest.UserName"
        description="Forneça Feedback para uma habilidade"
      />
      <section>
        <h1 class="title is-3">
          <b-icon pack="fas" icon="user" type="is-success"> </b-icon> De
          {{ $root.$displayName }} para {{ feedBackRequest.UserName }}
        </h1>
      </section>
      <br />

      Agradecemos a generosidade de seu tempo, {{ $root.$displayName }}.
      <b-icon pack="fas" icon="heart" type="is-danger"> </b-icon> <br /><br />

      <div v-if="!feedbackProvided">
        <a
          href="https://blog.claytonfreitas.com.br/cinco-vantagens-em-dar-feedback/"
          target="blank"
        >
          Esse Feedback vai te trazer cinco vantagens imediatas.
        </a>
        Além de um ato de generosidade para o próximo, que pode se tornar tão
        fantástico quanto você, dar um Feedback ativa o modo analítico em seu
        cérebro, e vai aumentar sua sensibilidade em observar o que os outros
        têm de melhor.
        <br />
        <br />
      </div>
      <div v-if="feedbackProvided">
        Você já deu um feedback para esse pedido. Muito obrigado! Depois vamos
        bater um papo sobre o processo contigo para melhorar o modo como as
        pessoas podem se tornar tão fantásticas quanto você!
        <br />

        <a
          href="https://blog.claytonfreitas.com.br/cinco-vantagens-em-dar-feedback/"
          target="blank"
        >
          Enquanto isso leia sobre algumas vantagens imediatas que você recebe
          ao dar um feedback.
        </a>

        <br />
        <br />Até o Futuro :).
        <br />
        <br />
      </div>
      <div class="card" style="background-color: #33ee0099">
        <div class="card-content">
          <p class="title is-4">O Pedido de Feedback</p>
          <p class="subtitle is-5" v-if="!feedbackProvided">
            Avalie o pedido de feedback nesta seção antes de fornecer o seu
            retorno
          </p>
          <skill-feedback-request :IdfeedBackRequest="IdfeedBackRequest" />
        </div>
      </div>
      <div v-if="!feedbackProvided">
        <div class="card" style="background-color: #33ee9999">
          <div class="card-content">
            <p class="title is-4">Agora é com você</p>
            <p class="subtitle is-5">
              Dê seu feedback perito e cuidadoso para
              {{ feedBackRequest.UserName }}.<br />
              <b
                >Faça isso com respeito, como gostariam que fizessem com você.
                ♥❤😊❤♥</b
              >
            </p>
            <b-field
              label="Avalie como a habilidade se manifesta nas áreas de conhecimento envolvidas"
            >
              <b-message>
                <div v-for="area in RatedAreas" :key="area.Name">
                  <b-tag type="is-warning">{{ area.Name }}</b-tag>
                  <b-rate v-model="area.Rating"></b-rate><br />
                </div>
              </b-message>
            </b-field>
            <b-field
              label="O que você acha que a pessoa deve continuar fazendo?"
              type="is-success"
            >
              <b-input
                placeholder="Foque nas qualidades positivas demonstradas pela pessoa. Pense em momentos em que demonstrar determinados aspectos dessa habilidade, você vê que a pessoa inspira, ou move outros à ação e apreciação."
                type="textarea"
                minlength="10"
                maxlength="365"
                :loading="$root.isLoading"
                v-model="ContinuarFazendo"
              ></b-input>
            </b-field>
            <b-field
              label="O que você acha que a pessoa deve evitar fazer?"
              type="is-danger"
            >
              <b-input
                placeholder="Pense em momentos em que você demonstrou determinados traços dessa habilidade e que o resultado não foi o esperado, ou foi excessivamente negativo."
                type="textarea"
                minlength="10"
                maxlength="365"
                :loading="$root.isLoading"
                v-model="EvitarFazer"
              ></b-input>
            </b-field>
            <b-field
              label="O que você acha que a pessoa deve passar a fazer?"
              type="is-info"
            >
              <b-input
                placeholder="O que você acha que vai potencializar ou maximizar a apreciação de outros na habilidade sendo aprimorada?"
                type="textarea"
                minlength="10"
                maxlength="365"
                :loading="$root.isLoading"
                v-model="PassarAFazer"
              ></b-input>
            </b-field>

            <b-field label="Quer incluir Link para seu LinkedIn?">
              <b-input
                placeholder="Link para seu perfil no LinkedIn"
                type="url"
                icon="linkedin"
                v-model="LinkedInURL"
              ></b-input>
            </b-field>
            <b-field label="Alguma Leitura sugerida?">
              <b-input
                placeholder="Alguma sugestão de livros, artigos, ou tópicos"
                icon="book"
                v-model="ReferenceBooks"
              ></b-input>
            </b-field>
            <b-field
              label="Quer incluir Link para algum trabalho que pode ajudar a pessoa (pode ser seu ou de terceiros)"
            >
              <b-input
                placeholder="Link para algum trabalho relevante"
                type="url"
                icon="link"
                v-model="ReferenceWorkLink"
              ></b-input>
            </b-field>
          </div>
        </div>
        <b-field>
          <button @click="gravarFinal" class="button is-success">
            Finalizar Feedback
          </button>
        </b-field>
      </div>
    </div>
  </layout-default>
</template>
<script>
import firebase from "firebase";
import SkillFeedbackRequest from "../../components/Feedback/SkillFeedbackRequest";

export default {
  name: "provide-skill-feedback",
  components: { SkillFeedbackRequest },
  //props: ["IdfeedBackRequest"],
  data() {
    return {
      IdfeedBackRequest: null,
      feedBackRequest: {},
      feedbackText: null,
      RatedAreas: [],
      ContinuarFazendo: null,
      EvitarFazer: null,
      PassarAFazer: null,
      LinkedInURL: null,
      ReferenceBooks: null,
      ReferenceWorkLink: null,
      ItensfeedBackRequest: [],
      feedbackProvided: false,
    };
  },
  computed: {
    ClassificacaoFinal() {
      var count = 0;
      var soma = 0;
      this.RatedAreas.forEach((area) => {
        if (area.Rating != null) {
          count++;
          soma += area.Rating;
        }
      });
      return soma / count;
    },
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
          ClassificacaoFinal: thisVM.ClassificacaoFinal,
          RequesterUserId: thisVM.feedBackRequest.UserId,
          IdFeedbackRequest: thisVM.IdfeedBackRequest,
        });

      this.$buefy.dialog.alert({
        message:
          "Deu tudo certo! Obrigado pela generosidade de seu tempo. Depois faremos um Debriefing do processo com você!",
        onConfirm: () => {
          this.$buefy.toast.open(`Feito`);
          this.$router.replace({
            name: "FeedbackDashboard",
          });
        },
      });
    },
    clearData: function () {
      var thisVM = this;
      thisVM.ItensfeedBackRequest.splice(0, this.ItensfeedBackRequest.length);
    },
    getData() {
      var thisVM = this;
      thisVM.$root.startLoading();
      thisVM.clearData();
      var feedBackRequest = firebase
        .database()
        .ref(`FeedbackRequests/${thisVM.$route.params.IdfeedBackRequest}`);

      feedBackRequest.on("value", function (snapshot) {
        thisVM.$buefy.toast.open(`Prontos para o feedback! Aperte o cinto!`);
        thisVM.feedBackRequest = snapshot.val();
        if (
          thisVM.feedBackRequest != null &&
          thisVM.feedBackRequest.Feedbacks != null &&
          Object.keys(thisVM.feedBackRequest.Feedbacks).length > 0
        ) {
          for (
            let index = 0;
            index < Object.keys(thisVM.feedBackRequest.Feedbacks).length;
            index++
          ) {
            //Let's check if the person has already provided a feedback to this request.
            const element = Object.keys(thisVM.feedBackRequest.Feedbacks)[
              index
            ];
            const feedbackResponse = thisVM.feedBackRequest.Feedbacks[element];
            if (feedbackResponse.UserId == thisVM.$root.$currentUser.uid) {
              thisVM.feedbackProvided = true;
              break;
            }
          }
        }

        thisVM.feedBackRequest.Areas.forEach((area) => {
          thisVM.RatedAreas.push({ Name: area, Rating: null });
        });

        thisVM.$root.stopLoading();
      });
    },
  },
};
</script>