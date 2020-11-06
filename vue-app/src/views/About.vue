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
            <div class="hero-body has-text-centered">
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
                mas vai funcionar por tempo limitado até 15/11/2020.<br /><br />
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
            <div class="hero-body has-text-centered">
              <h1 class="title">Contribuintes</h1>

              <b-message
                type="is-info"
                v-for="contributor in contributors"
                :key="contributor.name"
                ><div class="columns">
                  <div class="column is-one-fifth">
                    <b-image
                      :src="contributor.photoUrl"
                      :alt="contributor.name"
                      :rounded="false"
                    ></b-image>
                  </div>
                  <div class="column">
                    <h2 class="subtitle">
                      <a
                        style="color: black"
                        :href="contributor.linkedIn"
                        target="blank"
                        >{{ contributor.name }}</a
                      >
                    </h2>
                    <p>
                      {{ contributor.miniBio }}
                      <b-taglist>
                        <b-tag
                          type="is-warning"
                          v-for="tag in contributor.Areas"
                          :key="tag"
                          >{{ tag }}</b-tag
                        >
                      </b-taglist>
                      <br />
                      <br />
                      <a :href="contributor.linkedIn" target="blank">
                        <b-button type="is-info is-large" icon-left="linkedin"
                          >Conecte-se</b-button
                        ></a
                      >
                    </p>
                  </div>
                </div>
              </b-message>
              <ul>
                <li></li>
              </ul>

              <p>
                Se quiser participar em sessões de ideação do Até o Futuro,
                entre em contato! 😁
              </p>
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
          <router-link :to="{ name: 'SkillFeedback' }">
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
  </layout-default>
</template>

<script>
export default {
  name: "About",
  data: function () {
    return {
      contributors: [
        {
          name: "Clayton N. Freitas",
          linkedIn: "https://www.linkedin.com/in/claytonfreitas/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQG-cze3-YHXfA/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=r2Fn9VlqIGtGXRJ_JeZeMQs6BOjJpdc6B3ZrORMA2jE",
          miniBio:
            'Conhecido por dizer "Até o Futuro", é solucionador de  problemas e curioso por tecnologia e como ela pode destravar e potencializar as ações humanas.',
          Areas: [
            "Idiomas",
            "Comunicação",
            "Criatividade",
            "Colaboração",
            "Desenvolvimento de Software",
            "Comunicação Corporativa",
            "Gamification",
            "Pitch de Negócios",
            "Discurso",
            "Prática para Entrevista",
            "Arquitetura de TI",
            "Arquitetura de Corporativa",
            "Educação",
            "OKRs",
            "Experimentação",
            "Lean Startup",
            "Agilidade",
          ],
        },
        {
          name: "Guilherme H. Miranda",
          linkedIn: "https://www.linkedin.com/in/guilherme-h-miranda/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQGXJXYsv4RI-w/profile-displayphoto-shrink_800_800/0?e=1609977600&v=beta&t=7MpWVnPOhL0zuRLFy5h8I_y56c3mJKlUzKFjeNEi9g0",
          miniBio:
            "Apaixonado por ciências exatas, por desenvolvimento de pessoas, construção de times e trabalho em equipe. Pai de três filhos (por enquanto), marido de uma esposa e sempre interessado em aprender coisas novas.",

          Areas: [
            "Agilidade",
            "Kanban",
            "Scrum",
            "Liderança",
            "Parenting",
            "Matemática",
            "Comunicação",
            "Gerenciamento de Pessoas",
            "Treinamento",
          ],
        },
      ],
    };
  },
};
</script>  
                    