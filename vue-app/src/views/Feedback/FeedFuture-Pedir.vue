<template>

  <layout-default>
    <vue-headful title="Pedir Feedfuture" description="Até o Futuro - Pedir Feedfuture" />
    <div class="box">
      <div v-for="pergunta in perguntas" v-bind:key="pergunta.id">
        <generic-item
          :type="pergunta.type"
          :questionTitle="pergunta.questionTitle"
          :options="pergunta.options"
          :questionDescription="pergunta.questionDescription"
          :referenceURL="pergunta.referenceURL"
        /> 
      </div>

      <b-button size="is-large" type="is-success">Enviar</b-button>
    </div>
  </layout-default>
</template>

<script>
import GenericItem from "../../components/FeedFuture/GenericItem.vue";
export default {
  components: { GenericItem },
  data() {
    return {
      perguntas: [
            {
          id: -1,
          type: "Label",
          referenceURL:"https://lh4.googleusercontent.com/XXpL85yFYU_xS1ZfXoSjhqSNHP_7bRdd-ZoYzOxfknVD_1ZXOpD4I1ys_7Cqs2AVNxMrQ6EnKF5Nycpqty84sj0kNC3C8FhxAwocu7SrSLVkyd1M64XnuJDzVCtRA6ZuGg=w500",
          questionTitle: "🧩 Até o Futuro", 
          required: true,
          options: ["🤮", "2", "3", "4", "😐", "6", "7", "8", "9", "🚀"],
        },
            {
          id: 0,
          type: "Image",
          referenceURL:"https://lh4.googleusercontent.com/XXpL85yFYU_xS1ZfXoSjhqSNHP_7bRdd-ZoYzOxfknVD_1ZXOpD4I1ys_7Cqs2AVNxMrQ6EnKF5Nycpqty84sj0kNC3C8FhxAwocu7SrSLVkyd1M64XnuJDzVCtRA6ZuGg=w500",
          questionTitle: "Até o Futuro",
          questionDescription: "Até o Futuro",
          required: true,
          options: ["🤮", "2", "3", "4", "😐", "6", "7", "8", "9", "🚀"],
        },
        {
          id: 1,
          type: "NPS",
          questionTitle: "Qual a probabilidade de você recomendar o Até o Futuro para outras pessoas que estão buscando ter a melhor versão de si no Futuro?",
          questionDescription: "Conhece pessoas que estão querendo entrar no mercado de trabalho? Mudar de profissão? Você nos indicaria para elas?",
          required: true,
          options: ["🤮", "2", "3", "4", "😐", "6", "7", "8", "9", "🚀"],
        },
        {
          id: "johari",
          type: "Johari",
          questionTitle: "Qual a probabilidade de você recomendar o Até o Futuro para outras pessoas que estão buscando ter a melhor versão de si no Futuro?",
          questionDescription: "Conhece pessoas que estão querendo entrar no mercado de trabalho? Mudar de profissão? Você nos indicaria para elas?",
          required: true,
          options: ["🤮", "2", "3", "4", "😐", "6", "7", "8", "9", "🚀"],
        },
        {
          id: 2,
          type: "Stars",
             required: true,
          questionTitle: "Vai que vai",
          questionDescription: "Vem que tem",
        },
        {
          id: 3,
          questionTitle: 'Você participaria de outras sessões do "Até o Futuro"?',
       
          type: "Radio",
          options: ["👍 SIM ", "👎 NÃO", "🤷‍♀️ TALVEZ"],
        },
        {
          id: 4,
          type: "OpenText",
          questionTitle:
            'O que foi bem daora 🤯?',
          required: true,
          questionDescription:
            "Conta pra gente: o que você achou que foi bem bacaninha e que podemos fazer para os outros interessados no Até o Futuro?",
        },

        {
          id: 5,
          type: "OpenText",
          questionTitle:
            "O que foi meio nhé 😴? O que podemos fazer para ficar melhores?",
          required: false,
          questionDescription:
            "Fizemos você dormir quando você queria se manter de pé? Conta pra gente como podemos ser mais engajantes!",
        },

        {
          id: 6,
          type: "OpenText",
          questionTitle: "PARA COM ISSO AGORA! 🤮",
          required: false,
          questionDescription:
            "O que você acha que fizemos que você achou que não deveríamos ter feito?",
        },
        {
          id: 7,
          type: "OpenText",
          questionTitle: "Algum outro comentário antes de partirmos?",
          required: false,
          questionDescription:
            'Quais eram suas expectativas quando você se candidatou ao "Teste de Empregabilidade"? Elas foram atendidas? Frustradas? Obrigado por seu tempo! ❤❤❤',
        },
        {
          id: 8,
          type: "Email",
          questionTitle:
            "Se quiser deixar seu e-mail para contato sobre esse feedback, pode usar o campo abaixo!",
          required: false,
        },
      ],
    };
  },
};
</script>