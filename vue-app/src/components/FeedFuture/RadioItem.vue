<template>
    <div class="is-centered">
        <b-field>
            <b-radio-button v-model="value" v-for="option in options" v-bind:key="option"
                :native-value="option" size="is-medium"
                type="is-info is-light is-outlined">
             
                <span>{{option}}</span>
            </b-radio-button> 

            
        </b-field>
    </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: function () {
        return [ ];
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
  },
  data() {
    return { value: null };
  }, 
};
</script>