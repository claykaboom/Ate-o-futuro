<template>
  <div>
    <b-field :label="questionTitle" :title="questionDescription">
      <div class="box">
    {{questionDescription}}
          <b-rate v-model="value" size="is-large"></b-rate><br />
      
      </div>
    </b-field>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: function () {
        return ["🤮", "2", "3", "4", "😐", "6", "7", "8", "9", "🚀"];
      },
    },
    questionTitle: {
      type: String,
      default:
        "Qual a probabilidade de você recomendar o Até o Futuro para outras pessoas que estão buscando ter a melhor versão de si no Futuro?",
    },
    questionDescription: {
      type: String,
      default:
        " Conhece pessoas que estão querendo entrar no mercado de trabalho? Mudar de profissão? Você nos indicaria para elas?",
    },
    lowRateText: {
      type: String,
      default: "Muito improvável! 🤮",
    },
    highRateText: {
      type: String,
      default: "Muito provável! 🚀",
    },
  },
  data() {
    return { value: null };
  }, 
};
</script>