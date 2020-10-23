<template>
  <div>
    <vue-headful title="Sobre o Até o Futuro!" description="Até o Futuro" />
    <div class="box cta">
      <p class="has-text-centered">
        <span class="tag is-primary">NOVO</span> Peça um Feedback de Pessoas que
        são referência de mercado em habilidades que você quer desenvolver!
      </p>
    </div>

    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Até o Futuro: Prove-se à prova do Tempo</h1>
          <h2 class="subtitle">
            <br />
            Peça feedback sobre suas habilidades e ideias de negócio de forma
            gratuita. Conecte-se com pessoas fantásticas que são referência de
            mercado.

            <a
              href="https://blog.claytonfreitas.com.br/compartilhe-ideias-para-ter-uma-boa-ideia/"
              target="blank"
            >
              Compartilhe suas ideias sobre o Até o Futuro.</a
            >
            <br />
          </h2>
        </div>
      </div>
    </section>
    <div class="about box">
      <br />Este é o Até o Futuro, uma Plataforma de
      <a href="https://github.com/claykaboom/Ate-o-futuro"> código aberto </a>
      com o propósito de alavancar habilidades de pessoas que querem transitar
      de carreira, ou ingressar numa coisa nova, desconhecida. O método é usado
      por mim mesmo para receber e fornecer feedbacks.
      <br />
      <br />

      Mande as suas mensagens para o futuro! Ajude outros a chegar no seu
      estágio profissional. Pratique a generosidade.
    </div>
    <br />
    <div class="hero is-warning is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Quer experimentar?</h1>
          <h2 class="subtitle is-5"></h2>
<br />
          <router-link 
            :to="{ name: 'SkillFeedback' }"
          >
            Clique aqui para pedir <br />um feedback .
          </router-link>

          <span class="is-centered">
            <br />
            <br />
          </span>
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data: function () {
    return {
      labels: {
        xLabels: [
          "Jun/2019",
          "Jul/2019",
          "Ago/2019",
          "Set/2019",
          "Out/2019",
          "Nov/2019",
          "Dez/2019",
        ],
        yLabels: 5,
      },
    };
  },
};
</script>