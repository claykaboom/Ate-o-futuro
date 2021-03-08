<template>
  <layout-default><vue-headful
        title="Até o Futuro - Contato"
        description="Fala aí!"
      />
    <div class="box">
      <h1 class="title is-3">
        <b-icon size="is-small" icon="email"></b-icon
        ><b-icon size="is-small" icon=" "></b-icon>Fala aí!
      </h1>
      <hr class="content-divider" />
      <h2 class="subtitle">
        Dúvidas? Ideias? Críticas? O Até o Futuro é aberto para feedbacks!
      </h2>
      <b-field label="Nome">
        <b-input
          v-model="Nome"
          type="text"
          placeholder="Seu nome aqui"
          expanded
        />
      </b-field>
      <b-field label="Email">
        <b-input
          v-model="Email"
          type="email"
          placeholder="seu@email.com"
          expanded
        />
      </b-field>
      <b-field label="Mensagem">
        <b-input
          type="textarea"
          v-model="Mensagem"
          maxlength="800"
          placeholder="Sua mensagem "
        >
        </b-input>
      </b-field>

      <b-field>
        <b-button expanded type="is-info" @click="enviarEmail" icon="send">
          Enviar
        </b-button>
      </b-field>
    </div>
  </layout-default>
</template>
<script>
import firebase from "firebase";
export default {
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
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValidEmail = re.test(String(this.Email).toLowerCase());

        if (!isValidEmail) {
          this.$buefy.dialog.alert({
            message: "😢 Ops! Parece que esse e-mail não está legal.",
            onConfirm: () => {
              this.$buefy.toast.open(`Ops! E-mail inválido`);
            },
          });
        } else {
          var idContato = firebase.database().ref().child("/Contatos").push()
            .key;

          firebase
            .database()
            .ref("/Contatos/" + idContato)
            .set({
              Nome: this.Nome,
              Email: this.Email,
              Mensagem: this.Mensagem,
            })
            .then(() => {
              this.$buefy.dialog.alert({
                message: "Deu tudo certo! Vamos ler sua mensagem com carinho!",
                onConfirm: () => {
                  this.$buefy.toast.open(`Feito`);

                  this.Nome = null;
                  this.Email = null;
                  this.Mensagem = null;
                },
              });
            })
            .catch(() => {
              this.$buefy.dialog.alert({
                message:
                  "😢 Ops! Algo errado aconteceu. Tente novamente agora, ou  <a href='https://blog.claytonfreitas.com.br/contact/'>clique neste link como um plano B </a> ",
                onConfirm: () => {
                  this.$buefy.toast.open(`Ops! Deu ruim.`);
                },
              });
            });
        }
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
  },
};
</script>