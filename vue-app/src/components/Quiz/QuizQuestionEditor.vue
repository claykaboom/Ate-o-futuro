<template>
  <div v-if="mutableQuestion">
    Texto:<b-input v-model="mutableQuestion.text" /> <br />
    
    Detalhes:<b-input v-model="mutableQuestion.details" />

    Image:<b-input v-model="mutableQuestion.imageURL" />

    <b-button @click="addResponse()">Adicionar Resposta</b-button>
    <div class="notification is-info">
      Respostas

      <div
        v-for="response in this.mutableQuestion.responses"
        :key="response.id"
      >
        <b-input v-model="response.text" />
        <b-checkbox v-model="response.correct">Correta</b-checkbox>
    
        <p class="card-header-title">Pontos:</p>
          <b-numberinput v-model="response.points"></b-numberinput>

        <b-button @click="removeResponse(response)" type="is-danger"
          >Remover Resposta</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "quiz-question-editor",
  props: ["question"],
  data() {
    return {
      mutableQuestion: null,
    };
  },
  mounted() {
    if (this.question != null) {
      this.mutableQuestion = this.question;
    }
  },
  methods: {
    removeResponse(response) { 
      this.mutableQuestion.responses.splice(this.mutableQuestion.responses.indexOf(response),1);
    },
    addResponse() {
      this.mutableQuestion.responses.push({
        id: firebase
          .database()
          .ref()
          .child(`/Quizzes/${this.mutableQuestion.id}/responses`)
          .push().key,
        text: "",
        correct: false,
        points:1,
      });
    },
  },
  watch: {
    question() { 
      this.mutableQuestion = this.question;
    },
  },
};
</script>