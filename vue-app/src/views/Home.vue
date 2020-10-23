<template>
  <section>
    <h1 v-show="$root.$isLogged" class="title">
      Olá, {{ $root.$displayName }}!
    </h1>
    <section class="hero main_hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="slider-content animated zoomIn pb-6">
            <div>
              <p class="title is-1 main-text">Até o Futuro</p>
              <p class="subtitle is-4 main-text">Torne-se à prova do tempo</p>
            </div>
          </div>
          <span class="scroll-down animated zoomIn">
            <svg
              width="30px"
              height="100%"
              viewBox="0 0 247 390"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="
                fill-rule: evenodd;
                clip-rule: evenodd;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 1.5;
              "
            >
              <path
                id="wheel"
                d="M123.359,79.775l0,72.843"
                style="fill: none; stroke: #fff; stroke-width: 20px"
              />
              <path
                id="mouse"
                d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
                style="fill: none; stroke: #fff; stroke-width: 20px"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
    <!-- Rooms Section -->

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
              Se você está aqui é porque tem interesse em receber feedbacks.<br />
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
                    Conhecido por dizer "Até o Futuro", é solucionador de
                    problemas e curioso por tecnologia e como ela pode destravar
                    e potencializar as ações humanas.
                    <br />
                    <br />
                    <a
                      href="https://www.linkedin.com/in/claytonfreitas/"
                      target="blank"
                    >
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
<style scoped>
html {
  scroll-behavior: smooth;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f0f0f0;
}
.main_hero {
  background-image: url("https://cdn.pixabay.com/photo/2016/10/18/08/13/travel-1749508_960_720.jpg");
  background-size: cover;
}
img {
  max-width: 100%;
}
a.is-primary {
  background-color: #03b2e3 !important;
  border: 1px solid #03b2e3 !important;
}
a.is-primary:hover {
  background-color: transparent !important;
  color: #000 !important;
}
a.button {
  font-size: 14px;
}
.main_title {
  color: #fff;
}
.columns {
  flex-wrap: wrap;
}
.modal-content {
  background-color: #fff;
  padding: 2em;
  border-radius: 5px;
}
@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(60px);
  }
}
svg #wheel {
  animation: scroll ease 2s infinite;
}
.slider-content {
  animation-duration: 3s;
  animation-delay: 1s;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 1s;
}
.scroll-down {
  animation-duration: 3s;
  animation-delay: 2s;
  -webkit-animation-duration: 3s;
  -webkit-animation-delay: 2s;
}
.rooms {
  background-color: #fff;
  padding: 1em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.reception-image img {
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.reception-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
  padding: 1em 2em;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.reception-item i {
  width: 20px;
}
.reception-item a {
  color: #000;
}
.reception-item .button {
  border: 1px solid #03b2e3;
  width: 50px;
}
.reception-item .button i {
  width: auto;
  padding-right: 5px;
}
.reception-item .button:hover {
  background-color: #03b2e3;
  color: #fff;
}
.mobile-only {
  display: none;
}
@media only screen and (max-width: 769px) {
  .reception-item {
    width: 100%;
  }
  .mobile-only {
    display: block;
  }
  .reception-item {
    padding: 1em;
  }
}
@media only screen and (max-width: 350px) {
  .mobile-only {
    display: none;
  }
}
iframe {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
@media only screen and (min-width: 300px) and (max-width: 1024px) {
  .gallery a {
    width: 150px;
  }
}
footer {
  background-color: #344157;
  border-top: 3px solid #03b2e3;
  color: #fff !important;
}
.footer_title {
  color: #fff !important;
}
.newsletter-form {
  display: flex;
}
.newsletter-form input {
  width: 100%;
  height: 40px;
  border: 0;
  outline: none;
  padding: 0 15px;
  font-size: 14px;
  background-color: #5c677b;
  color: #fff;
}
.newsletter-form ::-webkit-input-placeholder {
  color: #fff;
}

.newsletter-form button {
  width: 50px;
  height: 40px;
  font-size: 16px;
  color: #fff;
  background-color: #d77b5d;
  outline: none;
  border: 0;
}
.main-text {
  color: white;
  text-shadow: 4px 4px 12px #29211b;
}
.navbar {
  box-shadow: none;
}
.navbar-item {
  color: #484848;
}
</style>
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