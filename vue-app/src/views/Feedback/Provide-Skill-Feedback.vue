<template>
  <layout-default>
    <div class="box" v-if="feedBackRequest">
      <vue-headful
        :title="'Até o Futuro - Feedback para ' + feedBackRequest.UserName"
        description="Forneça Feedback para uma habilidade"
      />
      <section>
        <h1 class="title is-3">
          <b-icon pack="fas" icon="user" type="is-success"> </b-icon> De
          {{ $store.state.displayName }} para {{ feedBackRequest.UserName }}
        </h1>
      </section>
      <br />

      Agradecemos a generosidade de seu tempo, {{ $store.state.displayName }}.
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
              label="Avalie os parâmetros abaixo da maneira mais imparcial possível"
            >
              <b-message>
                <div v-for="area in RatedAreas" :key="area.Name">
                  <b-tag type="is-warning">{{ area.Name }}</b-tag>   <b-rate v-model="area.Rating"></b-rate><br />
 <div style=" border: 1px solid black" v-if="area.Description != null && area.Description != ''">Instruções de como medir <b>{{area.Name}}</b>:<br />
                  <span ><b-input type="textarea" disabled :value= "area.Description" /></span>
                         </div>       <br />  
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
                maxlength="2048"
                :loading="$store.state.isLoading"
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
                maxlength="2048"
                :loading="$store.state.isLoading"
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
                maxlength="2048"
                :loading="$store.state.isLoading"
                v-model="PassarAFazer"
              ></b-input>
            </b-field>

            <b-field
              label="Quer incluir Link para seu LinkedIn? (Se Você fizer isso, poderá criar conexões com a pessoa, mas seu feedback não será anônimo)"
            >
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
    <div class="box" v-else>
      <vue-headful
        title="Até o Futuro - Pedido de Feedback não encontrado"
        description="Pedido de Feedback não encontrado"
      />
      <section>
        <h1 class="title is-3">😮 Pedido de Feedback não encontrado!</h1>
      </section>
      <br />
      Verifique se o endereço está correto, por favor!
      <br />
      <br />
      Enquanto isso, você também pode tentar:
      <br />
      <br />
      <router-link
        class="button is-success is-large"
        :to="{ name: 'SkillFeedback' }"
      >
        <b-icon size="is-small" icon="arrow-right"></b-icon
        ><b-icon size="is-small" icon=""></b-icon> Pedir um
        feedback</router-link
      >
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
      if (this.feedBackRequest.version <= 2) {
        //nesta versão feedbacks são dados às áreas
        this.RatedAreas.forEach((area) => {
          if (area.Rating != null) {
            count++;
            soma += area.Rating;
          }
        });
      } else if (this.feedBackRequest.version >= 3) {
        this.RatedAreas.forEach((area) => {
          if (area.Rating != null) {
            count++;
            soma += area.Rating;
          } else {
            return null;
          }
        });
      }

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
      if (
        thisVM.ClassificacaoFinal == null ||
        isNaN(thisVM.ClassificacaoFinal) ||
        (thisVM.ContinuarFazendo == null &&
          thisVM.EvitarFazer == null &&
          thisVM.PassarAFazer == null)
      ) {
        this.$buefy.dialog.alert({
          title: "Tente preencher algo!",
          message: `Para que seu feedback tenha relevância e seja descritivo, específico, dirigido, oportuno e esclarecedor, preenchar os parâmetros ⭐ e forneça alguma informação nos campos de texto.`,
          type: "is-info",
          hasIcon: true,
          icon: "info",
          iconPack: "fa",
          ariaRole: "alertdialog",
          ariaModal: true,
        });
      } else {
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
            version: thisVM.feedBackRequest.version,

//////////////AFTER VERSION 3
 
///////////////////




            RatedAreas: thisVM.RatedAreas,

            ContinuarFazendo: thisVM.ContinuarFazendo,
            EvitarFazer: thisVM.EvitarFazer,
            PassarAFazer: thisVM.PassarAFazer,
            feedbackText: thisVM.feedbackText,
            LinkedInURL: thisVM.LinkedInURL,
            ReferenceBooks: thisVM.ReferenceBooks,
            ReferenceWorkLink: thisVM.ReferenceWorkLink,
            UserName: thisVM.$store.state.currentUser.displayName,
            UserId: thisVM.$store.state.currentUser.uid,
            UserEmail: thisVM.$store.state.currentUser.email,
            ClassificacaoFinal: thisVM.ClassificacaoFinal,
            RequesterUserId: thisVM.feedBackRequest.UserId,
            IdFeedbackRequest: thisVM.IdfeedBackRequest,
            RequesterUserName: thisVM.feedBackRequest.UserName,
            FeedBackRequestTipoFeedback: thisVM.feedBackRequest.TipoFeedback,
            FeedBackRequestResumo: thisVM.feedBackRequest.Resumo,
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
      }
    },
    clearData: function () {
      var thisVM = this;
      thisVM.ItensfeedBackRequest.splice(0, thisVM.ItensfeedBackRequest.length);
      thisVM.RatedAreas.splice(0, thisVM.RatedAreas.length);
    },
    getData() {
      var thisVM = this;
      //  thisVM.$root.startLoading();

      thisVM.$store.commit("startLoading");
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
            if (
              feedbackResponse.UserId == thisVM.$store.state.currentUser.uid
            ) {
              thisVM.feedbackProvided = true;
              break;
            }
          }
        }
        if (thisVM.feedBackRequest != null) {
          if (thisVM.feedBackRequest.version <= 2) {
            thisVM.feedBackRequest.Areas.forEach((area) => {
              thisVM.RatedAreas.push({
                Name: area,
                Description: "",
                Rating: null,
              });
            });
          } else if (thisVM.feedBackRequest.version >= 3) {
            ///VERSAO 3 , baseada em parametros de feedback

            thisVM.feedBackRequest.QuestoesFeedback.forEach((qfb) => {
              thisVM.RatedAreas.push({
                Name: qfb.texto,
                Description: qfb.descricao,
                Rating: null,
              });
            });
          }
        }

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
  },
};
</script>