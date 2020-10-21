<template>
  <section>
    <b-carousel 
      animated="slide"
      :has-drag="true"
      :autoplay="true"
      :pause-hover="true"
      :pause-info="false" 
      :interval="5000"
      :repeat="true" 
    >
      <b-carousel-item>
        <section class="hero is-medium is-dark is-bold">
          <div class="hero-body has-text-centered">
            <h1 class="title">Um alô do nosso experimento</h1>
            <p>
              Se você está aqui é porque tem interesse em receber feedbacks.<br />
              Depois que você pedir um feedback, vamos ver contigo como foi sua
              experiência.
            </p>
<br />

            <h1 class="title">De graça</h1>
            <p>
              Faça Login para experimentar essa funcionalidade. Ela é gratuita, mas estará no ar por tempo limitado enquanto estudamos o impacto que ela pode causar nesse estágio de maturidade.
            </p>
          </div>
        </section>
      </b-carousel-item>
      <b-carousel-item>
        <section class="hero is-medium is-info is-bold">
          <div class="hero-body has-text-centered">
            <h1 class="title">Contribuintes</h1>

            <b-message type="is-info"
              ><div class="columns">
                <div class="column is-one-fifth">
                  <b-image
                    src="https://media-exp1.licdn.com/dms/image/C4D03AQG-cze3-YHXfA/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=r2Fn9VlqIGtGXRJ_JeZeMQs6BOjJpdc6B3ZrORMA2jE"
                    alt="Clayton Freitas" 
                    :rounded="false"
                  ></b-image>
                </div>
                <div class="column">
                  <h2 class="subtitle">
                    <a
                      style="color: black"
                      href="https://www.linkedin.com/in/claytonfreitas/"
                      target="blank"
                      >Clayton N. Freitas</a
                    >
                  </h2>
                  <p>
                    Conhecido por dizer "Até o Futuro", é solucionador de problemas
                    e curioso por tecnologia e como ela pode destravar e
                    potencializar as ações humanas.
                  </p>
                </div>
              </div>
            </b-message>
            <ul>
              <li></li>
            </ul>

            <p>
              Se quiser participar em sessões de ideação do Até o Futuro, entre
              em contato! 😁
            </p>
          </div>
        </section>
      </b-carousel-item> </b-carousel
    ><br />
    <About />
  </section>
</template>

<script>
export default {
  data() {
    return {
      carousel: 0,
      animated: "fade",
      drag: false,
      autoPlay: false,
      pauseHover: false,
      pauseInfo: false,
      repeat: false,
      pauseType: "is-primary",
      interval: 3000,
      carousels: [
        { title: "Slide 1", color: "dark" },
        { title: "Slide 2", color: "primary" },
        { title: "Slide 3", color: "info" },
        { title: "Slide 4", color: "success" },
        { title: "Slide 5", color: "warning" },
        { title: "Slide 6", color: "danger" },
      ],
    };
  },
  methods: {
    info(value) {
      this.carousel = value;
      this.$buefy.toast.open({
        message: `This Slide ${value} !`,
        type: "is-info",
      });
    },
  },
};
</script>


<script>
import About from "./About";

export default {
  data() {
    return {
      carousels: [
        { text: "Slide 1", color: "primary" },
        { text: "Slide 2", color: "info" },
        { text: "Slide 3", color: "success" },
        { text: "Slide 4", color: "warning" },
        { text: "Slide 5", color: "danger" },
      ],
    };
  },
  components: { About },
};
</script>