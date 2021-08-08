<template>
  <div> 
    <b-field
      :label="questionTitle"
      expanded
      :title="questionDescription + ' Classifique numa escala de 1 a 10.'"
    >
      <div class="box is-expanded">
        <div class="columns">
          <div class="column is-1">
            <b>{{ lowRateText }}</b>
          </div>
          <div class="column is-10">
            <br />

            <b-slider
              :min="1"
              :max="10"
              aria-label="Classifique numa escala de 1 a 10"
              :tooltip="true"
              v-model="value"
              :custom-formatter="(val) => currentText"
              :indicator="true"
              ticks
              size="is-large"
              bigger-slider-focus
              tooltip-always
            >
              <b-slider-tick :value="1"> {{ options[0] }}</b-slider-tick>
              <b-slider-tick :value="5"> {{ options[4] }}</b-slider-tick>
              <b-slider-tick :value="10"> {{ options[9] }}</b-slider-tick>
            </b-slider>
          </div>
          <div class="column is-1">
            <b>{{ highRateText }}</b>
          </div>
        </div>
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
  computed: {
    currentText() {
      return this.options[this.value - 1];
    },
  },
};
</script>