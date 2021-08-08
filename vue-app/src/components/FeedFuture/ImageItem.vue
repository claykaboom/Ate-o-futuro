<template>
    <div class="has-text-centered"> 
        <img :src="referenceURL" :alt="questionTitle" :title="questionDescription"/>
        
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
    referenceURL: {
      type: String,
      default:null,
    }, 
  },
  data() {
    return { value: null };
  }, 
};
</script>