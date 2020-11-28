<template>
  <layout-default>
    <vue-headful title="Sobre o Até o Futuro!" description="Até o Futuro" />
    <div class="box cta">
      <p class="has-text-centered">
        <span class="tag is-primary">NOVO</span>
        <router-link :to="{ name: 'SkillFeedback' }"
          >Peça um Feedback de Pessoas que são referência de mercado em
          habilidades que você quer desenvolver!
        </router-link>
      </p>
    </div>

    <section
      class="hero is-info is-bold img-bg"
      :style="'background-image:url(\'https://source.unsplash.com/featured/?disruptive\')'"
    >
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
    <br />
    <section class="box">
      <b-carousel
        animated="slide"
        :has-drag="true"
        :autoplay="true"
        :pause-hover="true"
        :pause-info="false"
        :interval="10000"
        :repeat="true"
      >
        <b-carousel-item>
          <section class="hero is-medium is-dark is-bold">
            <div
              class="hero-body has-text-centered img-bg"
              :style="'background-image:url(\'https://source.unsplash.com/featured/?future\')'"
            >
              <h1 class="title">ATÉ O FUTURO!</h1>
              <p>
                Se você está aqui é porque tem interesse em receber
                feedbacks.<br />
                Depois que você pedir um feedback, vamos querer bater um papo
                contigo para saber como foi sua experiência.
              </p>
              <br />

              <h1 class="title">FEEDBACK GRÁTIS</h1>
              <p>
                Faça Login para experimentar esse presente. O feedback é grátis,
                mas vai funcionar por tempo limitado até 16/12/2020.<br /><br />
              </p>

              <div class="notification is-warning">
                <div class="buttons is-centered">
                  <router-link :to="{ name: 'SkillFeedback' }">
                    <b-button type="is-dark is-large" icon-left="account-heart"
                      >Me dá Feedback!</b-button
                    >
                  </router-link>
                </div>
              </div>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-info is-bold">
            <div
              class="hero-body has-text-centered img-bg"
              :style="' background-image: url(\'https://source.unsplash.com/featured/?people%20thinking\')  '"
            >
              <h1 class="title">Contribuintes</h1>

              <router-link
                :to="{ name: 'Experts' }"
                class="button is-white is-large is-inverted"
              >
                Clique para nos conhecer</router-link
              >
              <br />
              <br />
              <p>
                Se quiser participar em sessões de ideação do Até o Futuro,
                entre em contato! 😁
              </p>

              <br />
              <br />
              <br />
            </div>
          </section>
        </b-carousel-item>
      </b-carousel>
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
            class="button is-large is-success"
          >
            <b-icon icon="account-heart" /> <b-icon icon=" " /> Peça um feedback
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
  </layout-default>
</template>
<style scoped >
.img-bg  {
  background: no-repeat center    ;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
<script>
import Contributors from "../components/Contributors";

export default {
  name: "About",
  components: { Contributors },
};
</script>  
                    