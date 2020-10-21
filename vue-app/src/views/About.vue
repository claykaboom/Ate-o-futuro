<template>
  <div>
    <vue-headful title="Sobre o Até o Futuro!" description="Até o Futuro" />
    <section class="hero is-warning is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Até o Futuro: Plataforma de Feedbacks e Auto-aprimoramento
            colaborativo
          </h1>
          <h2 class="subtitle">
            <br />
            Peça feedback sobre suas habilidades e ideias de negócio
            <a
              href="https://blog.claytonfreitas.com.br/cinco-vantagens-em-dar-feedback/"
              target="blank"
            >
              e tenha vantagens intrínsecas e colaterais no processo
            </a>

            <router-link v-show="!$root.$isLogged" to="/Login"
              >(necessário login)
            </router-link>

            <br />
            <br />
            Tenha o pensamento
            <a href="https://github.com/claykaboom/Ate-o-futuro" target="blank">
              Open-Source em mente.
            </a>
            <br />
            <br />

            <a
              href="https://blog.claytonfreitas.com.br/compartilhe-ideias-para-ter-uma-boa-ideia/"
              target="blank"
            >
              Compartilhe suas ideias.</a
            >
            <br />
          </h2>
        </div>
      </div>
    </section>
    <div class="about box">
      <br />Este é o Até o Futuro.
      <br />
      <br />
      Uma plataforma que criei para aumentar minhas próprias habilidades e para
      praticar o ato de dar feedbacks a outros.
      <br />
      <br />
      O código fonte está disponível no
      <a href="https://github.com/claykaboom/Ate-o-futuro">
        github para colaboração.
      </a>

      <br />
      <br />

      Mande as suas mensagens para o futuro! Ajude outros a chegar no seu
      estágio profissional. Pratique a generosidade.
    </div>
    <br />
    <div class="box">
      <h2 class="subtitle is-5">Como funciona?</h2>

      <router-link :to="{ name: 'SkillFeedback' }">
        Comece pedindo um feedback sobre uma de suas habilidades. É necessário
        login!
      </router-link>

      <span class="is-centered">
        <br />
        <br />
      </span>
      <br />
      <br />
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