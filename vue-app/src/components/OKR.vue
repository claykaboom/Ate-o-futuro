<template>
  <b-message title="Descreva o Objetivo" :closable="false">
    <b-field label="Descreva o Objetivo">
      <b-input
        v-model="goal"
        placeholder="Pense em algo que seja inspirador para a sua iniciativa (ex.: Entregar conhecimento gratuito para as pessoas)"
      ></b-input>
    </b-field>

    <b-field label="Resultado-Chave">
      <b-numberinput v-model="newKeyResultTarget" min="1"></b-numberinput>
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
      <div v-for="kr in keyResults" v-bind:key="kr.name">
        <b-checkbox disabled> ({{ kr.target }}x) {{ kr.name }} </b-checkbox>
        <b-progress :max="kr.target" :value="kr.fulfilled" />
      </div>
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
      newKeyResultTarget: 1,
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
          fulfilled : 0
        });
      }
    },
  },
};
</script>