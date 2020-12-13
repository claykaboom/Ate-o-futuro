<template>
  <b-message title="Descreva o Objetivo" :canClose="false">
    <b-field label="Descreva o Objetivo">
      <b-input
        v-model="goal"
        placeholder="Pense em algo que seja inspirador para a sua iniciativa (ex.: Entregar conhecimento gratuito para as pessoas)"
      ></b-input>
    </b-field>

    <b-field label="Resultado-Chave">
      <b-input type="number" v-model="newKeyResultTarget"></b-input>
      <b-input
        v-model="newKeyResult"
        expanded
        placeholder="Pense em algo que você pode quantificar o progresso (ex.: três reuniões com o time) "
      ></b-input>
    </b-field>

    <b-button type="is-primary" @click="addKeyResult"
      >Adicionar Resultado-Chave</b-button
    >
    <div>
        <br />
        <h2 class="subtitle is-4">Resultados-chave</h2>
    <b-checkbox disabled v-for="kr in keyResults" v-bind:key="kr.name">
      {{ kr.target }} - {{ kr.name }}
    </b-checkbox>
    </div>
  </b-message>
</template>

<script>
export default {
  name: "okr",
  data() {
    return {
      goal: "",
      newKeyResult: "",
      newKeyResultTarget: 0,
      keyResults: [],
    };
  },
  methods: {
    addKeyResult() {
      var thisVM = this;
      if (thisVM.newKeyResult != "" && thisVM.newKeyResultTarget != 0) {
        thisVM.keyResults.push({
          name: thisVM.newKeyResult,
          target: thisVM.newKeyResultTarget,
        });
      }
    },
  },
};
</script>