<template>
  <empty-layout>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">Até o Futuro<span v-if="$store.state.currentUser">, {{$store.state.displayName}}</span></h1>
          <h2 class="subtitle">
            Um simples mecanismo de aprimoramento coletivo <br />
            baseado em feedbacks objetivos.<br />
            Peça feedbacks sobre habilidades que você está desenvolvendo e
            receba retornos de experts sobre possibilidades de aprimoramento.
          </h2>

          <router-link
            class="button is-dark is-inverted is-large pulse-button"
            :to="{ name: 'SkillFeedback' }"
          >
            <b-icon size="is-small" icon="arrow-right"></b-icon
            ><b-icon size="is-small" icon=""></b-icon> Peça seu
            feedback</router-link
          >

          <br />
          <br />
          <router-link
            :to="{ name: 'Sobre' }"
            class="button is-white is-large is-inverted"
          >
            Conheça mais &nbsp;&nbsp;&nbsp;&nbsp;&ensp;<b-icon
              size="is-small"
              icon=" "
            ></b-icon
            ><b-icon size="is-small" icon="information"></b-icon
          ></router-link>
        </div>
      </div>
    </section>
    <section id="parallax-1" class="hero is-large">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-6">
              <h1 class="title is-1">
                <b-icon size="is-small" icon="account-heart"></b-icon>
                &nbsp;&nbsp; Peça seu Feedback, é grátis
              </h1>
              <hr class="content-divider" />
              <h2 class="subtitle">
                <b-icon size="is-small" icon="check"></b-icon> Receba feedbacks
                objetivos de referências em dezenas de habilidades diferentes
                para você ganhar confiança na sua transição de carreira, ou na
                execução de seu trabalho. <b> É grátis! </b> Aproveite que não é
                sempre que você tem feedbacks de qualidade de pessoas-referência
                de suas respectivas indústrias.
              </h2>
              <router-link
                class="button is-white is-inverted is-large pulse-button"
                :to="{ name: 'SkillFeedback' }"
              >
                <b-icon size="is-small" icon="arrow-right"></b-icon
                ><b-icon size="is-small" icon=""></b-icon> Vamos lá</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-2" class="hero is-large">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6">
              <h1 class="title is-1">Conheça nossos experts</h1>
              <hr class="content-divider" />
              <h2 class="subtitle">
                Estamos fundamentando nossos feedbacks em pessoas-referência
                para que o feedback seja claro e acionável para você! Nosso
                objetivo é impulsionar a confiança das pessoas que nem sempre
                têm acesso a coaches e mentores de carreira a ir para o próximo
                nível.
              </h2>
              <router-link
                class="button is-white is-inverted is-large"
                :to="{ name: 'Sobre' }"
              >
                Saiba mais
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="parallax-3" class="hero is-large">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-6">
              <h1 class="title is-1">Que tal um cafezinho virtual?</h1>
              <hr class="content-divider" />
              <h2 class="subtitle">
                Teve alguma ideia? Quer participar de uma sessão de ideação?
                Bater um papo? Tomar um café? Marque um horário!<br /><br />
                Queremos conversar com pessoas com boas ideias para fazer o
                futuro mais palatável para todos; Se você é uma pessoa criativa,
                bora conversar!
              </h2>
              <a
                href="https://calendly.com/claytonfreitas/batepapo"
                target="blank"
                class="button is-white is-inverted"
                >Marque um horário aqui&ensp;<i class="fad fa-chevron-right"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="cta va">
      <div class="container">
        <div class="columns">
          <div class="column is-6">
            <h1 class="title is-1">
              <b-icon size="is-small" icon="email"></b-icon
              ><b-icon size="is-small" icon=" "></b-icon>
            </h1>
            <hr class="content-divider" />
            <h2 class="subtitle">
              Dúvidas? Ideias? Críticas? O Até o Futuro é uma plataforma de
              código aberto e está aberta para feedbacks!
            </h2>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  v-model="Nome"
                  class="input is-medium"
                  type="text"
                  placeholder="Seu nome aqui"
                />
              </div>
            </div>
            <br />
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="Email"
                  class="input is-medium"
                  type="email"
                  placeholder="seu@email.com"
                />
              </div>
              <br />
            </div>
            <b-field>
              <textarea
                type="textarea"
                class="textarea"
                v-model="Mensagem"
                maxlength="360"
                style="background-color: #000"
                placeholder="Sua mensagem "
              >
              </textarea>
            </b-field>
            <br />
            <div class="field is-grouped">
              <div class="control">
                <button
                  class="button is-white is-rounded is-outlined"
                  @click="enviarEmail"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Até o Futuro</strong> by
          <a href="https://claytonfreitas.com.br">Clayton Freitas</a>. O código
          fonte está disponível no
          <a href="https://github.com/claykaboom/Ate-o-futuro">GitHub</a>.
        </p>
      </div>
    </footer>
  </empty-layout>
</template>
<style scoped lang="scss">
.va {
  display: flex;
  align-items: center;
}

.hero,
.cta {
  background: url(data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%220%200%20512%20512%22%20width%3D%22512%22%20height%3D%22512%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.875%22%20result%3D%22noise%22%20%2F%3E%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.4296875%200%22%20%2F%3E%3C%2Ffilter%3E%3Crect%20filter%3D%22url%28%23noise%29%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22512%22%20height%3D%22512%22%20fill%3D%22transparent%22%20opacity%3D%221%22%20%2F%3E%3C%2Fsvg%3E),
    linear-gradient(52deg, #42475c 0%, #20222e 71%);
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
  font-family: "Nunito Sans", sans-serif;
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
  background: url(https://source.unsplash.com/featured/?experimental);
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
  background: url(https://source.unsplash.com/featured/?creative);
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
  background: url(https://source.unsplash.com/featured/?meeting);
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

input,
textarea {
  background: transparent !important;
  border: 1px solid turquoise !important;
  color: white !important;
}

input::placeholder,
textarea::placeholder {
  color: white !important;
}

.pulse-button {
  font-size: 1.3em;
  font-weight: light;
  font-family: "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: -1px;
  color: white;
  border: none;
  background: #5a99d4;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(#5a99d4, 0.5);
  -webkit-animation: pulse 1.5s infinite;
}
.pulse-button:hover {
  -webkit-animation: none;
}

@-webkit-keyframes pulse {
  0% {
    transform: (scale(0.9));
  }
  70% {
    transfor: (scale(1));
    box-shadow: 0 0 0 50px rgba(#5a99d4, 0);
  }
  100% {
    transform: (scale(0.9));
    box-shadow: 0 0 0 0 rgba(#5a99d4, 0);
  }
}
</style>
<script>
import firebase from "firebase";
export default {
  name: "Home",
  data() {
    return {
      Nome: "",
      Email: null,
      Mensagem: null,
    };
  },
  methods: {
    enviarEmail() {
      if (this.Nome != null && this.Email != null && this.Mensagem != null) {
        var idContato = firebase.database().ref().child("/Contatos").push().key;

        firebase
          .database()
          .ref("/Contatos/" + idContato)
          .set({
            Nome: this.Nome,
            Email: this.Email,
            Mensagem: this.Mensagem,
          });

        this.$buefy.dialog.alert({
          message: "Deu tudo certo! Vamos ler sua mensagem com carinho!",
          onConfirm: () => {
            this.$buefy.toast.open(`Feito`);

            this.Nome = null;
            this.Email = null;
            this.Mensagem = null;
          },
        });
      } else {
        this.$buefy.dialog.alert({
          message:
            "😢 Ops! Parece que você precisa preencher tudo para a gente poder retornar com uma resposta.",
          onConfirm: () => {
            this.$buefy.toast.open(
              `Preencha todos os campos para entrar em contato`
            );
          },
        });
      }
    },
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

