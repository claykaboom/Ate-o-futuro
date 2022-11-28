<template>
  <empty-layout>
    <vue-headful
      :title="`Até o Futuro - Quiz - ${
        quiz ? quiz.name : 'Teste seus conhecimentos'
      }`"
      description="Até o Futuro - Quiz"
    />
    <nav-bar :fixedTop="true" v-if="wantsNavBar" />
    <div class=" ">
      <!--container-->
      <div class="container" v-if="quiz">
        <!-- <b-button @click="saveQuiz()">vai</b-button> -->
        <!--questionBox-->
        <div class="questionBox">
          <!-- transition -->

          <b-steps
            size="is-medium"
            v-model="activeStep"
            :animated="true"
            :rounded="true"
            :has-navigation="false"
            label-position="left"
            mobile-mode="minimalist"
          >
            <b-step-item
              step="1"
              icon="account"
              label="Preparação"
              :clickable="false"
            >
              <div class="row columns">
                <div class="column is-12">
                  <b-image
                    :src="
                      quiz.image
                        ? quiz.image
                        : 'https://cdn.pixabay.com/photo/2016/12/01/13/10/lightbulb-1875247_960_720.jpg'
                    "
                    ratio="16by9"
                  />
                </div>
                <div class="column is-12 is-overlay is-hidden-mobile">
                  <span class="title" style="color: #fff; padding-left: 20px">{{
                    quiz.name
                  }}</span
                  ><br />
                </div>
                <div class="column is-2 is-overlay has-text-right">
                  <b-image
                    :src="require('@/assets/Logo.png')"
                    alt="Até o Futuro"
                    ratio="16by9"
                  />
                </div>
              </div>
              <div class="row columns">
                <div class="column is-12">
                  <h1 class="title is-3">Quiz: {{ quiz.name }}</h1>
                  <h3
                    class="subtitle is-5"
                    style="color: #69316b; font-weight: bold"
                  >
                    Criado por:
                    {{ quiz.author ? quiz.author : "Até o Futuro" }} <br />
                    <a
                      v-if="quiz.authorLinkedInURL"
                      :href="quiz.authorLinkedInURL"
                      target="blank"
                    >
                      <b-button
                        type="is-info"
                        class="is-small"
                        icon-left="linkedin"
                      >
                        Ver perfil
                      </b-button>
                    </a>
                  </h3>
                  <b-message type="is-link">
                    <div v-html="quiz.introText"></div>
                  </b-message>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <section class="hero is-info is-small">
                    <div class="hero-body">
                      <p class="title">Sua performance neste Quiz</p>
                      <p class="subtitle">
                        Quer saber mais o que significa esse resultado para você?
                      </p>
                    </div>
                  </section>
                  <br />
                  Você quer receber um diagnóstico mais detalhado sobre sua
                  performance no e-mail?<br />
                  <b-switch v-model="wantDiagnosis">
                    {{ wantDiagnosis ? "👍 SIM" : "👎 NÃO" }}
                  </b-switch>
                  <br /><br />

                  <div v-if="wantDiagnosis">
                    <b-field label="Seu e-mail">
                      <b-input
                        type="email"
                        v-model="userEmail"
                        :disabled="$store.state.isLogged"
                        placeholder="seuemail@provedor.com"
                      />
                    </b-field>
                    <b-field label="Seu nome">
                      <b-input
                        v-model="userName"
                        placeholder="Seu Nome aqui"
                        :disabled="$store.state.isLogged"
                      />
                    </b-field>
                  </div>
                  <br />
                  <b-button
                    type="is-success is-fullwidth"
                    @click="moveStep()"
                    size="is-large"
                    >Iniciar</b-button
                  >
                </div>
              </div>
            </b-step-item>

            <b-step-item
              step="2"
              :label="`Teste seus conhecimentos`"
              icon="help"
              :clickable="false"
            >
              <h1 class="title has-text-centered">Quiz - {{ quiz.name }}</h1>

              <div
                class="questionContainer has-text-centered"
                v-if="questionIndex < quiz.questions.length"
              >
                <header>
                  <h1 class="title is-6"></h1>
                  <!--progress-->

                  <b-progress
                    :value="progress"
                    :max="100"
                    show-value
                    type="is-success is-large"
                  >
                    {{ (questionIndex / quiz.questions.length) * 100 }}%
                  </b-progress>

                  <!--/progress-->
                </header>
                <!--qusetionContainer-->
                <div v-bind:key="questionIndex">
                  <!-- quizOptions -->
                  <div
                    class="optionContainer"
                    v-if="questionIndex < quiz.questions.length"
                    v-bind:key="questionIndex"
                  >
                    <!-- questionTitle -->
                    <b-image
                      v-if="quiz.questions[questionIndex].imageURL"
                      ratio="15by4"
                      :src="quiz.questions[questionIndex].imageURL"
                    />
                    <h2 class="titleContainer title">
                      {{ quiz.questions[questionIndex].text }}
                    </h2>
                    <b-message
                      v-if="quiz.questions[questionIndex].details"
                      type="is-info"
                    >
                      <div
                        v-html="quiz.questions[questionIndex].details"
                        style="text-align: left"
                      ></div>
                    </b-message>
                    <!-- {{ userResponses[questionIndex] * 1 }} -->
                    <!-- <b-radio-button
              v-for="(response, index) in quiz.questions[questionIndex]
                .responses"
              v-model="userResponses[questionIndex]"
              :key="response.text"
              :native-value="index"
              type="is-danger"
            >
              <b-icon icon="circle-outline"></b-icon>
              <span>{{ index | charIndex }}. {{ response.text }}</span>
            </b-radio-button> -->

                    <div
                      class="option"
                      v-for="(response, index) in quiz.questions[questionIndex]
                        .responses"
                      @click="selectOption(index)"
                      :class="{
                        'is-selected': userResponses[questionIndex] == index,
                      }"
                      :key="response.id"
                    >
                      {{ index | charIndex }}. {{ response.text }}
                    </div>
                  </div>

                  <!--quizFooter: navigation and progress-->
                  <footer class="questionFooter">
                    <!--pagination-->
                    <nav
                      class="pagination"
                      role="navigation"
                      aria-label="pagination"
                    >
                      <!-- back button -->
                      <a
                        class="button"
                        v-on:click="prev()"
                        :disabled="questionIndex < 1"
                      >
                        Anterior
                      </a>

                      <!-- next button -->
                      <b-button
                        :class="
                          userResponses[questionIndex] == null
                            ? ''
                            : 'is-active'
                        "
                        v-on:click="next()"
                        :disabled="
                          userResponses[questionIndex] == null ||
                          userResponses[questionIndex] == undefined ||
                          questionIndex >= quiz.questions.length
                        "
                      >
                        {{
                          userResponses[questionIndex] == null
                            ? "Responda para avançar"
                            : questionIndex == quiz.questions.length - 1
                            ? "Finalizar"
                            : "Próxima"
                        }}
                      </b-button>
                    </nav>
                    <!--/pagination-->
                  </footer>
                  <!--/quizFooter-->
                </div>
                <!--/questionContainer-->
              </div>

              <!--quizCompletedResult-->
              <div
                v-if="questionIndex >= quiz.questions.length"
                v-bind:key="questionIndex"
                class="quizCompleted has-text-centered"
              >
                <!-- quizCompletedIcon: Achievement Icon -->Seu resultado: <br /> 
                <h2 class="title">
                <b-icon
                  size="is-large"
                  :icon="finalDiagnosisInfo.icon"
                  :type="finalDiagnosisInfo.type"
                />

                <!--resultTitleBlock-->
                  {{ finalDiagnosisInfo.message }}
                </h2>
                <!-- <p class="subtitle">
                  Pontuação: {{ Math.max(0, score) }}/{{ maxPoints }} pontos!
                </p> -->

                <div
                  class="columns box"
                  style="background-color: #88f2b6"
                  v-if="!wantDiagnosis"
                >
                  <div class="column">
                    <section class="hero is-link">
                      <div class="hero-body">
                        <p class="title">Última Chance</p>
                        <p class="subtitle">
                          Quer saber mais o que significa esse resultado para
                          você?
                        </p>
                      </div>
                    </section>
                    <br /><br />

                    <div>
                      <b-field label="Seu e-mail para receber o diagnóstico">
                        <b-input
                          type="email"
                          v-model="userEmail"
                          :disabled="$store.state.isLogged"
                          placeholder="seuemail@provedor.com"
                        />
                      </b-field>
                      <b-field label="Seu nome">
                        <b-input
                          v-model="userName"
                          placeholder="Seu Nome aqui"
                          :disabled="$store.state.isLogged"
                        />
                      </b-field>
                    </div>
                    <br />
                    <b-button
                      type="is-success is-fullwidth"
                      @click="receiveDiagnosis()"
                      size="is-large"
                      >Registrar resposta e receber diagnóstico</b-button
                    >
                  </div>
                </div>

                <br />
                <b-button
                  class="is-large is-info is-fullwidth"
                  @click="restart()"
                >
                  <b-icon icon="restart" />
                  Começar de novo </b-button
                ><br />
                <b-button
                  class="is-large is-link is-fullwidth"
                  tag="router-link"
                  :to="{ name: 'Home' }"
                >
                  🚀 Explorar o Até o Futuro
                </b-button>
                <br />
                <b-button
                  class="is-large is-warning is-fullwidth"
                  tag="router-link"
                  :to="{ name: 'Contato' }"
                >
                  🧠 Seja curador(a) do Até o Futuro </b-button
                ><br />

                <!--/resultTitleBlock-->
              </div>
            </b-step-item>
          </b-steps>
          <!--/quizCompetedResult-->
        </div>
        <!--/questionBox-->
      </div>
    </div>
    <!--/container-->
  </empty-layout>
</template> 

<script>
import Vue from "vue";
import firebase from "firebase";
import NavBar from "../../components/NavBar";

export default {
  components: { NavBar },
  data() {
    return {
      quiz: null,
      quizId: null,
      questionIndex: 0,
      userResponses: null,
      isActive: false,
      selectedOption: null,
      userEmail: null,
      userName: null,
      activeStep: 0,
      wantDiagnosis: true,
      offerDiagnosis: true,
      wantsNavBar: true,
    };
  },

  filters: {
    charIndex: function (i) {
      return String.fromCharCode(97 + i);
    },
  },
  computed: {
    score() {
      var score = 0;
      //ebugger;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
          this.quiz.questions[i].pointsInAlternative == null ||
          this.quiz.questions[i].pointsInAlternative == false
        ) {
          if (
            typeof this.quiz.questions[i].responses[this.userResponses[i]] !==
              "undefined" &&
            this.quiz.questions[i].responses[this.userResponses[i]].correct
          ) {
            score += this.quiz.questions[i].correctPoints
              ? this.quiz.questions[i].correctPoints
              : 1;
          } else {
            //se errar e nao tiver especificacao de pontos por erro, subtrai-se zero
            score -= this.quiz.questions[i].wrongPoints
              ? this.quiz.questions[i].wrongPoints
              : 0;
          }
        } else {
          if (
            typeof this.quiz.questions[i].responses[this.userResponses[i]] !==
            "undefined"
          ) {
            score += this.quiz.questions[i].responses[this.userResponses[i]]
              .points;
          }
        }
      }
      return score;
    },
    progress() {
      if (!this.quiz || !this.quiz.questions) return 0;

      return (this.questionIndex / this.quiz.questions.length) * 100;
    },
    maxPoints() {
      var maxPoints = 0;
      this.quiz.questions.forEach((element) => {
        maxPoints += element.correctPoints;
      });
      return maxPoints;
    },
    minPoints() {
      var minPoints = 0;
      this.quiz.questions.forEach((element) => {
        minPoints -= element.wrongPoints;
      });
      return minPoints;
    },
    mediumPoints() {
      return (this.maxPoints + this.minPoints) / 2;
    },

    sortedDiagnoses() {
      var diag = this.quiz.diagnoses;
      return diag
        ? diag.sort((a, b) => (a.scoreAmount > b.scoreAmount ? 1 : -1))
        : [
            {
              scoreAmount: 0,
              shortDiagnosis: "Tente novamente!",
              diagnosisText: "Tente novamente!",
              icon: "power-plug",
              type: "is-danger",
            },
            {
              scoreAmount: this.maxPoints * 0.55,
              shortDiagnosis: "Bom trabalho!",
              diagnosisText: "Bom trabalho!",
              icon: "medal",
              type: "is-info",
            },
            {
              scoreAmount: this.maxPoints * 0.7,
              shortDiagnosis: "Fantástico!",
              diagnosisText: "Fantástico!",
              icon: "trophy-award",
              type: "is-success",
            },
          ];
    },

    finalDiagnosisInfo() {
      var currentDiagnosis = null;
      for (let index = 0; index < this.sortedDiagnoses.length; index++) {
        const diag = this.sortedDiagnoses[index];
        if (this.score >= diag.scoreAmount) {
          currentDiagnosis = {
            message: diag.shortDiagnosis
              ? diag.shortDiagnosis
              : diag.diagnosisText,
            icon: diag.icon ? diag.icon : "medal",
            type: diag.type ? diag.type : "is-success",
          };
        }
      }

      return currentDiagnosis;
    },
  },
  watch: {
    progress() {
      if (this.quiz && this.progress >= 100 && this.offerDiagnosis) {
        this.registerQuiz();
        this.offerDiagnosis = false;
        var audio = new Audio(require("../../assets/sounds/Complete.mp3")); // path to file
        audio.volume = 0.5;
        audio.play();
      }
    },
  },
  mounted() {
    this.loadQuiz();
    this.wantsNavBar = this.$route.query.fullScreen ? false : true;
    if (this.$store.state.isLogged) {
      this.userEmail = this.$store.state.currentUser.email;
      this.userName = this.$store.state.displayName;
    }
  },
  methods: {
    receiveDiagnosis() {
      this.wantDiagnosis = true;
      this.checkDiagnosisData(this.registerQuiz);
    },
    registerQuiz() {
      var thisVM = this;
      var idResponse = firebase.database().ref().child("/QuizResponses").push()
        .key;

      var finalResponses = [];

      for (let index = 0; index < thisVM.userResponses.length; index++) {
        const answer = {
          questionText: thisVM.quiz.questions[index].text,
          questionResponses: thisVM.quiz.questions[index].responses,
          userResponse:
            thisVM.quiz.questions[index].responses[thisVM.userResponses[index]],
        };
        finalResponses.push(answer);
      }

      firebase
        .database()
        .ref("/QuizResponses/" + idResponse)
        .set({
          quizId: thisVM.quizId,
          quiz: thisVM.quiz,
          userResponses: finalResponses,
          score: thisVM.score,
          userEmail: thisVM.userEmail,
          userName: thisVM.userName,
          wantDiagnosis: thisVM.wantDiagnosis,
          userId: thisVM.$store.state.currentUser
            ? thisVM.$store.state.currentUser.uid
            : null,
        })
        .then(() => {
          this.$buefy.dialog.alert({
            message: "Deu tudo certo! Parabéns por completar o quiz!",
            onConfirm: () => {
              this.$buefy.toast.open(`Resposta registrada`);
            },
          });
        })
        .catch(() => {
          this.$buefy.dialog.alert({
            message:
              "😢 Ops! Algo errado aconteceu. Tente novamente agora, ou  <a href='https://blog.claytonfreitas.com.br/contact/'>clique neste link como um plano B </a> ",
            onConfirm: () => {
              this.$buefy.toast.open(`Ops! Deu ruim.`);
            },
          });
        });
    },
    checkDiagnosisData(allRightCallBack) {
      var thisVM = this;
      if (thisVM.wantDiagnosis && thisVM.userEmail && thisVM.userName) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValidEmail = re.test(String(thisVM.userEmail).toLowerCase());
        if (!isValidEmail) {
          thisVM.$buefy.dialog.alert({
            message: "😢 Ops! Parece que esse e-mail não está legal.",
            onConfirm: () => {
              this.$buefy.toast.open(`Ops! E-mail inválido`);
            },
          });
        } else {
          if (allRightCallBack) {
            allRightCallBack();
          }
        }
      } else {
        thisVM.$buefy.dialog.alert({
          message:
            "😢 Ops! Preencha seu nome e e-mail para podermos mandar o diagnóstico para você!",
          onConfirm: () => {
            thisVM.$buefy.toast.open(`Ops! Preencha seus dados corretamente!`);
          },
        });
      }
    },
    moveStep() {
      var thisVM = this;
      if (!thisVM.wantDiagnosis) {
        thisVM.activeStep++;
        return;
      }

      thisVM.checkDiagnosisData(function () {
        thisVM.activeStep++;
      });
    },
    loadQuiz() {
      var thisVM = this;
      thisVM.quizId = thisVM.$route.params.IdQuiz;
      var quizRef = firebase.database().ref(`Quizzes/${thisVM.quizId}`);

      thisVM.$store.commit("startLoading");
      quizRef.on("value", function (snapshot) {
        thisVM.$buefy.toast.open(`Olha seu Quiz aí!`);

        thisVM.quiz = snapshot.val();
        if (thisVM.quiz != null) {
          thisVM.userResponses = Array(thisVM.quiz.questions.length).fill(null);
          thisVM.$buefy.toast.open(`Bora responder?!`);
        }
        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
    restart: function () {
      this.questionIndex = 0;
      //this.activeStep = 0;

      this.offerDiagnosis = true;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
    },
    selectOption: function (index) {
      //   alert(index);
      //     this.userResponses
      Vue.set(this.userResponses, this.questionIndex, index);
      //   //console.log(this.userResponses);
    },
    next: function () {
      if (this.questionIndex < this.quiz.questions.length) this.questionIndex++;
    },

    prev: function () {
      if (this.quiz.questions.length > 0) this.questionIndex--;
    },
  },
};
</script>


<style scoped lang="scss">
$trans_duration: 0.3s;
$primary_color: #3d5afe;

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");

body {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;

  background: #cfd8dc;

  /* mocking native UI */
  cursor: default !important; /* remove text selection cursor */
  user-select: none; /* remove text selection */
  user-drag: none; /* disbale element dragging */

  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  transition: $trans_duration;
}
.title,
.subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: normal;
}
.animated {
  transition-duration: $trans_duration/2;
}

.container {
}

.questionBox {
  max-width: 100%;
  width: 100%;
  min-height: 30rem;

  background: #fafafa;
  position: relative;

  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  header {
    background: rgba(0, 0, 0, 0.025);
    padding: 1.5rem;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    h1 {
      font-weight: bold;
      margin-bottom: 1rem !important;
    }
  }
  .titleContainer {
    text-align: center;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .quizForm {
    display: block;
    white-space: normal;

    height: 100%;
    width: 100%;

    .quizFormContainer {
      height: 100%;
      margin: 15px 18px;

      .field-label {
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }
  .quizCompleted {
    width: 100%;
    padding: 1rem;
    text-align: center;

    > .icon {
      color: #ff5252;
      font-size: 5rem;

      .is-active {
        color: #00e676;
      }
    }
  }
  .questionContainer {
    white-space: normal;

    height: 100%;
    width: 100%;

    .optionContainer {
      margin-top: 12px;
      flex-grow: 1;
      .option {
        border-radius: 290486px;
        padding: 9px 18px;
        margin: 0 18px;
        margin-bottom: 12px;
        transition: $trans_duration;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.85);
        border: transparent 1px solid;

        &.is-selected {
          border-color: rgba(black, 0.25);
          background-color: rgb(170, 200, 255);
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:active {
          transform: scaleX(0.9);
        }
      }
    }

    .questionFooter {
      background: rgba(0, 0, 0, 0.025);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      align-self: flex-end;

      .pagination {
        //padding: 10px 15px;
        margin: 15px 25px;
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: space-between;
}
.button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 5rem;
  margin: 0 0.25rem;

  transition: 0.3s;

  &:hover {
    background: #eceff1;
    border-color: rgba(0, 0, 0, 0.25);
  }
  &.is-active {
    background: $primary_color;
    color: rgb(255, 255, 255);
    border-color: transparent;

    &:hover {
      background: darken($primary_color, 10%);
    }
  }
}

@media screen and (min-width: 769px) {
  .questionBox {
    justify-content: center;

    .questionContainer {
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    height: auto !important;
    border-radius: 6px 6px 0px 0px;
  }
}
</style>