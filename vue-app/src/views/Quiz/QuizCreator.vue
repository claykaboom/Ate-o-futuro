<template>
  <layout-default>
    <vue-headful title="Até o Futuro - Criar Quiz" description="Criar Quiz" />

    <div class="box">
      <div class="level">
        <div class="level-item is-left">
          <b-button type="is-success" @click="saveQuiz()">Salvar Quiz</b-button>

          <b-button type="is-primary" @click="addQuestion()"
            >Adicionar Pergunta</b-button
          >
        </div>
        <div class="level-item is-right">
          <b-button type="is-danger" @click="clearQuiz()"
            >Limpar Perguntas</b-button
          >
        </div>
      </div>

      ID do Quiz : <b-input v-model="quiz.id" /> <br /><br />

      Nome do Quiz : <b-input v-model="quiz.name" /> <br /><br />
      Perguntas:

      <b-collapse
        class="card"
        animation="slide"
        v-for="(question, index) in quiz.questions"
        :key="index"
        :open="isOpen == index"
        @open="isOpen = index"
      >
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
        >
          <p class="card-header-title">Pergunta:{{ question.text }}</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <b-button type="is-danger" @click="deleteQuestion(question)"
              >Deletar Pergunta
            </b-button>

            <quiz-question-editor :question="question" />
          </div>
        </div>
      </b-collapse>

       <div class="level">
        <div class="level-item is-left">
          <b-button type="is-success" @click="saveQuiz()">Salvar Quiz</b-button>

          <b-button type="is-primary" @click="addQuestion()"
            >Adicionar Pergunta</b-button
          >
        </div>
        <div class="level-item is-right">
          <b-button type="is-danger" @click="clearQuiz()"
            >Limpar Perguntas</b-button
          >
        </div>
      </div>

    </div>
  </layout-default>
</template>

<script>
import firebase from "firebase";
import QuizQuestionEditor from "../../components/Quiz/QuizQuestionEditor";

var quiz = {
  name: "HTML-Web",
  id: null,
  CreatedByUserId: null,
  
  questions: [
    {
      id: "1",
      text: "What is the full form of HTTP?",
      responses: [
        { id: "1", text: "Hyper text transfer package" },
        { id: "2", text: "Hyper text transfer protocol", correct: true },
        { id: "3", text: "Hyphenation text test program" },
        { id: "4", text: "None of the above" },
      ],
    },
    {
      text: "HTML document start and end with which tag pairs?",
      responses: [
        { id: "1", text: "HTML", correct: true },
        { id: "2", text: "WEB" },
        { id: "3", text: "HEAD" },
        { id: "4", text: "BODY" },
      ],
    },
    {
      text: "Which tag is used to create body text in HTML?",
      responses: [
        { id: "1", text: "HEAD" },
        { id: "2", text: "BODY", correct: true },
        { id: "3", text: "TITLE" },
        { id: "4", text: "TEXT" },
      ],
    },
    {
      text: "Outlook Express is _________",
      responses: [
        { id: "1", text: "E-Mail Client", correct: true },
        { id: "2", text: "Browser" },
        {
          id: "3",
          text: "Search Engine",
        },
        { id: "4", text: "None of the above" },
      ],
    },
    {
      text: "What is a search engine?",
      responses: [
        { id: "1", text: "A hardware component " },
        { id: "2", text: "A machinery engine that search data" },
        { id: "3", text: "A web site that searches anything", correct: true },
        { id: "4", text: "A program that searches engines" },
      ],
    },
    {
      text: "What does the .com domain represents?",
      responses: [
        { id: "1", text: "Network" },
        { id: "2", text: "Education" },
        { id: "3", text: "Commercial", correct: true },
        { id: "4", text: "None of the above" },
      ],
    },
    {
      text: "In Satellite based communication, VSAT stands for? ",
      responses: [
        { id: "1", text: " Very Small Aperture Terminal", correct: true },
        { id: "2", text: "Varying Size Aperture Terminal " },
        { id: "3", text: "Very Small Analog Terminal" },
        { id: "4", text: "None of the above" },
      ],
    },
    {
      text: "What is the full form of TCP/IP? ",
      responses: [
        { id: "1", text: "Telephone call protocol / international protocol" },
        {
          id: "2",
          text: "Transmission control protocol / internet protocol",
          correct: true,
        },
        { id: "3", text: "Transport control protocol / internet protocol " },
        { id: "4", text: "None of the above" },
      ],
    },
    {
      text: "What is the full form of HTML?",
      responses: [
        {
          id: "1",
          text: "Hyper text marking language",
        },
        { id: "2", text: "Hyphenation text markup language " },
        { id: "3", text: "Hyper text markup language", correct: true },
        { id: "4", text: "Hyphenation test marking language" },
      ],
    },
    {
      text: '"Yahoo", "Infoseek" and "Lycos" are _________?',
      responses: [
        { id: "1", text: "Browsers " },
        { id: "2", text: "Search Engines", correct: true },
        { id: "3", text: "News Group" },
        { id: "4", text: "None of the above" },
      ],
    },
  ],
};

export default {
  components: { QuizQuestionEditor },
  data() {
    return {
      index: null,
      quiz: quiz,
    };
  },
  mounted() {
    this.loadQuiz();
  },
  methods: {
    loadQuiz() {
      var thisVM = this;

      if (this.$route.params.IdQuiz !== undefined) {
        this.quiz.id = this.$route.params.IdQuiz;
        var quizRef = firebase.database().ref(`Quizzes/${this.quiz.id}`);
        thisVM.$store.commit("startLoading");
        quizRef.on("value", function (snapshot) {
          thisVM.$buefy.toast.open(`Olha seu Quiz aí!`);

          thisVM.quiz = snapshot.val();
          thisVM.userResponses = Array(thisVM.quiz.questions.length).fill(null);
          thisVM.$store.commit("stopLoading");
          //thisVM.$root.stopLoading();
        });
      } else {
        this.quiz.id = firebase.database().ref().child(`/Quizzes`).push().key;
      }
    },
    addQuestion() {
      var newQuestionId = firebase
        .database()
        .ref()
        .child(`/Quizzes/${this.quiz.id}`)
        .push().key;
      this.quiz.questions.push({ id: newQuestionId, text: "", responses: [] });
    },
    deleteQuestion(question) {
      this.quiz.questions.splice(this.quiz.questions.indexOf(question), 1);
    },
    clearQuiz() {
      this.quiz.questions.splice(0, this.quiz.questions.length);
    },
    saveQuiz() {
      var thisVM = this;
      this.quiz.CreatedByUserId = this.$store.state.currentUser.uid;
      firebase
        .database()
        .ref(`/Quizzes/${this.quiz.id}`)
        .update(this.quiz)
        .then(function () {
          thisVM.$buefy.dialog.alert({
            message: `Salvou!`,
            onConfirm: () => {},
          });
        });
    },
  },
};
</script>