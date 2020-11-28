<template>
  <layout-default>
    <!-- <section>
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
       -->

      <!-- <b-carousel
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
                      problemas e curioso por tecnologia e como ela pode
                      destravar e potencializar as ações humanas.
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
                Se quiser participar em sessões de ideação do Até o Futuro,
                entre em contato! 😁
              </p>
            </div>
          </section>
        </b-carousel-item> </b-carousel
      ><br />
      <About />  
    </section> -->

        <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1 ">Hello Parallax</h1>
          <h2 class="subtitle">A simple boilerplate for setting up parallax <br> using the Bulma Hero container.</h2>
          <a href="#" class="button is-white is-medium is-inverted">Learn More&ensp;<i class="fad fa-chevron-right"></i></a>
        </div>
      </div>
    </section>
    <section id="parallax-1" class="hero is-large ">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-6">
              <h1 class="title is-1 ">Lorem Ipsum</h1>
              <hr class="content-divider">
              <h2 class="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit explicabo amet magni illum eum voluptate! Eveniet voluptatem nam magnam necessitatibus.</h2>
              <a href="#" class="button is-white is-inverted">Next&ensp;<i class="fad fa-chevron-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-2" class="hero is-large ">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6">
              <h1 class="title is-1 ">Dolor Sit</h1>
              <hr class="content-divider">
              <h2 class="subtitle">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque veritatis sequi natus minima distinctio ullam deleniti quasi quisquam autem deserunt.</h2>
              <a href="#" class="button is-white is-inverted">Next&ensp;<i class="fad fa-chevron-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-3" class="hero is-large ">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-6">
              <h1 class="title is-1 ">Amet Consectetur</h1>
              <hr class="content-divider">
              <h2 class="subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure minus nam necessitatibus neque in perferendis eveniet dolorum assumenda dolores accusamus.</h2>
              <a href="#" class="button is-white is-inverted">Next&ensp;<i class="fad fa-chevron-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="cta va">
      <div class="container">
        <div class="columns">
          <div class="column is-6">
            <h1 class="title is-1 ">Adipisicing Elit</h1>
            <hr class="content-divider">
            <h2 class="subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ut nulla maiores, beatae voluptas sunt excepturi deserunt vero. Beatae est ratione quia neque molestias, cum asperiores quibusdam rem illum, debitis dolorem natus, eos fuga eveniet numquam ab officia reiciendis inventore. Tempore repudiandae exercitationem quisquam? Fugiat!</h2>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input is-medium" type="text" placeholder="Jon Snow">
              </div>
            </div>
            <br>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input is-medium" type="email" placeholder="jon@winterfell.com">
              </div>
            </div>
            <br>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-white is-rounded is-outlined">Submit</button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>
  </layout-default>
</template>
<style scoped>

.va {
  display: flex;
  align-items: center;
}

.hero,
.cta {
  background: url(data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%220%200%20512%20512%22%20width%3D%22512%22%20height%3D%22512%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.875%22%20result%3D%22noise%22%20%2F%3E%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.4296875%200%22%20%2F%3E%3C%2Ffilter%3E%3Crect%20filter%3D%22url%28%23noise%29%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22512%22%20height%3D%22512%22%20fill%3D%22transparent%22%20opacity%3D%221%22%20%2F%3E%3C%2Fsvg%3E), linear-gradient(52deg, #42475C 0%, #20222E 71%);
}

.cta {
  height: 500px;
  border-top: 10px solid turquoise;
}

footer {
  color: white;
  background: rgb(14, 14, 14) !important;
}

footer strong {
  color: turquoise;
}

footer a {
  color: turquoise;
}

.title {
  color: white;
  font-weight: 800;
  font-size: 4rem;
  font-family: 'Nunito Sans', sans-serif;
  text-shadow: 1px 1px 1px #000, 3px 3px 5px rgb(0, 0, 3);
}

.subtitle {
  color: white;
  font-size: 1.2rem;
  text-shadow: 1px 1px 1px #000, 3px 3px 5px rgb(0, 0, 3);
}

hr.content-divider {
  max-width: 75px;
  height: 5px;
}

#parallax-1 {
  background: url(https://source.unsplash.com/featured/?nature);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top: 10px solid coral;
}

#parallax-1 hr {
  background: coral;
}

#parallax-2 {
  background: url(https://source.unsplash.com/featured/?computers);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top: 10px solid yellow;
}

#parallax-2 hr {
  background: yellow;
}

#parallax-3 {
  background: url(https://source.unsplash.com/featured/?city);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top: 10px solid hotpink;
}

#parallax-3 hr {
  background: hotpink;
}

.label {
  color: white;
}

input {
  background: transparent !important;
  border: 1px solid turquoise !important;
  color: white !important;
}

input::placeholder {
  color: white !important;
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