<template>
  <layout-default>
    <vue-headful title="Sobre o Até o Futuro!" description="Até o Futuro" />
    <div class="box cta">
      <p class="has-text-centered">
        <span class="tag is-primary">NOVO</span>
        <router-link :to="{ name: 'AgendarEntrevista' }"
          > Teste sua empregabilidade e receba dicas práticas sobre sua performance no mercado de trabalho
        </router-link>
      </p>
    </div>

    <section
      class="hero is-dark is-bold img-bg"
         >
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Até o Futuro: Prove-se à prova do Tempo</h1>
          <h2 class="subtitle">
            <br />
            Peça feedback sobre suas habilidades e ideias de negócio de forma
            gratuita. Conecte-se com pessoas fantásticas que são referência de
            mercado. Faça um teste de empregabilidade junto com mentoria prática para entender sua empregabilidade.

            <br />
            <br />
         <b>   <b-icon icon="linkedin" type="is-info"> </b-icon> <a href="https://www.linkedin.com/shareArticle?mini=true&url=http://AteOFuturo.com.br&title=Dê%20um%20feedback%20e%20receba%205%20vantagens%20imediatas&summary=Olá!%20Que%20tal%20praticar%20a%20generosidade%20e%20dar%20um%20feedback%20para%20eu%20aprimorar%20minhas%20habilidades?!%20Até%20o%20Futuro!&source=AtéOFuturo">AJUDE-NOS A CONTINUAR AJUDANDO OUTROS POR COMPARTILHAR SOBRE NÓS NO LINKEDIN</a>
         </b>
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
          <section class="hero is-medium is-primary is-bold">
            <div
              class="hero-body has-text-centered img-bg"
                        >
             <h1 class="title">TESTE SUA EMPREGABILIDADE</h1>
             
              <p>
                Se você está aqui é porque tem interesse em receber
                feedbacks.<br />
                Agende uma sessão bem legal de mentoria com a gente para fazer um teste de empregabilidade e receber feedbacks bem bacanas que podem te ajudar a atravessar o rio que te separa da sua versão futura.
              </p>
              <br />
 
              <div class="notification is-warning">
                <div class="buttons is-centered">
                  <router-link :to="{ name: 'AgendarEntrevista' }">
                    <b-button type="is-dark is-large"  
                      > ⚡⚡ Quero testar minha empregabilidade!</b-button
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
              :style="' background-image: url(\'https://source.unsplash.com/featured/?people\')  '"
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

      
  </layout-default>
</template>
<style scoped >
.img-bg {
  background: no-repeat center;
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
                    