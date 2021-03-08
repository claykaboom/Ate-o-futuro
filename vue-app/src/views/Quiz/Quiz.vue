<template>
  <layout-default>
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
              <h1 class="title has-text-centered">Preparação</h1>
              <div class="columns">
                <div class="column">
                  Você gostaria de receber um diagnóstico sobre sua performance
                  no e-mail?
                  <b-field label="Seu e-mail">
                    <b-input
                      type="email"
                      v-model="userEmail"
                      placeholder="seuemail@provedor.com"
                    />
                  </b-field>
                  <b-field label="Seu nome">
                    <b-input v-model="userName" placeholder="Seu Nome aqui" />
                  </b-field>
                  <b-button
                    type="is-success"
                    @click="activeStep++"
                    size="is-large"
                    >VAI</b-button
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
                    type="is-success"
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
                    <h2 class="titleContainer title">
                      {{ quiz.questions[questionIndex].text }}
                    </h2>
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
                      <a
                        class="button"
                        :class="
                          userResponses[questionIndex] == null
                            ? ''
                            : 'is-active'
                        "
                        v-on:click="next()"
                        :disabled="questionIndex >= quiz.questions.length"
                      >
                        {{
                          userResponses[questionIndex] == null
                            ? "Pular"
                            : "Próxima"
                        }}
                      </a>
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
                <!-- quizCompletedIcon: Achievement Icon -->
                <span class="icon">
                  <i
                    class="fa"
                    :class="
                      score / quiz.questions.length > 0.3
                        ? 'fa-check-circle-o is-active'
                        : 'fa-times-circle'
                    "
                  ></i>
                </span>

                <!--resultTitleBlock-->
                <h2 class="title">
                  {{ typeJob }}
                </h2>
                <p class="subtitle">
                  Pontuação: {{ score }} / {{ quiz.questions.length }}
                </p>
                <br />
                <a class="button" @click="restart()"
                  >Começar de novo <i class="fa fa-refresh"></i
                ></a>
                <!--/resultTitleBlock-->
              </div>
              Lorem ipsum dolor sit amet.
            </b-step-item>
          </b-steps>
          <!--/quizCompetedResult-->
        </div>
        <!--/questionBox-->
      </div>
    </div>
    <!--/container-->
  </layout-default>
</template> 

<script>
import Vue from "vue";
import firebase from "firebase";

export default {
  data() {
    return {
      quiz: null,
      questionIndex: 0,
      userResponses: null,
      isActive: false,
      selectedOption: null,
      userEmail: null,
      userName: null,
      activeStep: 0,
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
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
          typeof this.quiz.questions[i].responses[this.userResponses[i]] !==
            "undefined" &&
          this.quiz.questions[i].responses[this.userResponses[i]].correct
        ) {
          score = score + 1;
        }
      }
      return score;
    },
    progress() {
      return (this.questionIndex / this.quiz.questions.length) * 100;
    },
    typeJob() {
      return this.score / this.quiz.questions.length > 0.7
        ? "Fantástico!"
        : this.score / this.quiz.questions.length < 0.4
        ? "Tente novamente!"
        : "Bom trabalho!";
    },
  },
  mounted() {
    this.loadQuiz();
  },
  methods: {
    loadQuiz() {
      var thisVM = this;
      var quizRef = firebase
        .database()
        .ref(`Quizzes/${thisVM.$route.params.IdQuiz}`);

      thisVM.$store.commit("startLoading");
      quizRef.on("value", function (snapshot) {
        thisVM.$buefy.toast.open(`Olha seu Quiz aí!`);

        thisVM.quiz = snapshot.val();
        if (thisVM.quiz != null) {
          thisVM.userResponses = Array(thisVM.quiz.questions.length).fill(null);
          thisVM.$buefy.toast.open(`Olha seu Quiz aí!`);
        }
        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
    restart: function () {
      this.questionIndex = 0;
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
  margin: 0 0.5rem;
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
    cursor: pointer;
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