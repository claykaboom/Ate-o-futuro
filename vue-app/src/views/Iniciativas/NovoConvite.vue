<template>
  <layout-default
    ><div class="box">
      <vue-headful
        title="Até o Futuro - Convite para Iniciativa"
        description="Convite para Iniciativa"
      />
      <h1 class="title is-3">Convite para Iniciativa</h1>
      <div class="columns">
        <div class="column is-9">
          Vamos criar uma iniciativa bacana. <br /><br />

          Uma iniciativa aqui no <b>Até o Futuro</b> é uma empreitada curta, de
          preferência com data de início e de fim. <br /><br />

          As pessoas às vezes não têm recursos infinitos para se dedicar por tempo
          indefinido a algo. Esses recursos podem ser tempo, dinheiro,
          motivação, energia.

          <br /><br />

          Então a ideia de uma iniciativa é quebrar a barreira que a falta de
          algum recurso pode criar e poder validar ideias de forma rápida.

          <br /><br />
          Então você precisa de:
          <br /><br />
          <div class="notification is-primary">
            <b-icon
              :icon="name ? 'check' : 'square'"
              :size="name ? 'is-medium' : 'is-small'"
              :type="name ? 'is-success' : 'is-warning'"
            >
            </b-icon>
            <span v-bind:class="{ crossed: name }"> Um nome</span><br />
            <b-icon
              :icon="videoURL ? 'check' : 'square'"
              :size="videoURL ? 'is-medium' : 'is-small'"
              :type="videoURL ? 'is-success' : 'is-warning'"
            >
            </b-icon>
            <span v-bind:class="{ crossed: videoURL }">
              Um vídeo explicativo</span
            >

            <br />
            <b-icon
              :icon="callToActionURL ? 'check' : 'square'"
              :size="callToActionURL ? 'is-medium' : 'is-small'"
              :type="callToActionURL ? 'is-success' : 'is-warning'"
            >
            </b-icon>
            <span v-bind:class="{ crossed: callToActionURL }">
              Um link de chamada para ação</span
            >

            <br />
            <b-icon
              :icon="message ? 'check' : 'square'"
              :size="message ? 'is-medium' : 'is-small'"
              :type="message ? 'is-success' : 'is-warning'"
            >
            </b-icon>
            <span v-bind:class="{ crossed: message }">
              Uma mensagem engajante</span
            >

            <br />
            <b-icon
              :icon="startDate ? 'check' : 'square'"
              :size="startDate ? 'is-medium' : 'is-small'"
              :type="startDate ? 'is-success' : 'is-warning'"
            >
            </b-icon>
            <span v-bind:class="{ crossed: startDate }">
              Uma data de início</span
            >

            <br />
            <b-icon
              :icon="endDate ? 'check' : 'square'"
              :size="endDate ? 'is-medium' : 'is-small'"
              :type="endDate ? 'is-success' : 'is-warning'"
            >
            </b-icon>
            <span v-bind:class="{ crossed: endDate }"> Uma data de fim</span>
          </div>
          <b-field label="Nome da iniciativa">
            <b-input v-model="name"></b-input>
          </b-field>
          <b-field label="Vídeo explicando iniciativa (youtube)">
            <b-input
              placeholder="https://youtube.com/yYXXhhzz"
              type="url"
              v-model="videoURL"
            ></b-input> </b-field
          ><b-field
            label="Link para chamada para ação (e.g. Google Docs, grupo do WhatsApp, etc)"
          >
            <b-input
              placeholder="http://ateofuturo.com.br"
              type="url"
              v-model="callToActionURL"
            ></b-input>
          </b-field>
          <b-field
            label="Uma mensagem bacana de convite para seus potenciais parceiros de iniciativa"
          >
            <b-input
              v-model="message"
              type="textarea"
              minlength="10"
              maxlength="730"
              :loading="$store.state.isLoading"
              placeholder="Inspire a outra pessoa a embarcar nessa com você!"
            >
            </b-input>
          </b-field>

          <b-field label="Quando você espera que ela comece e termine ?">
            <b-datepicker
              placeholder="Duração"
              icon="calendar-today"
              locale="pt-BR"
              editable
              v-model="dates"
              range
            >
            </b-datepicker>
          </b-field>
          <b-field label="Início esperado">
            <b-datepicker
              placeholder="Início esperado"
              icon="calendar-today"
              locale="pt-BR"
              disabled
              v-model="startDate"
            >
            </b-datepicker>
          </b-field>
          <b-field label="Término esperado">
            <b-datepicker
              placeholder="Término esperado"
              icon="calendar-today"
              locale="pt-BR"
              disabled
              v-model="endDate"
            >
            </b-datepicker>
          </b-field>
          <b-progress
            format="percent"
            type="is-success"
            :precision="0"
            :value="progress"
            show-value
          ></b-progress>

          <div class="buttons is-centered" v-if="progress == 100">
            <b-button class="button is-success is-large" @click="gravar()">
              <b-icon size="is-small" icon="arrow-right"></b-icon
              ><b-icon size="is-small" icon=""></b-icon> Pronto! Criar o
              Convite!</b-button
            >
          </div>
        </div>
        <div
          class="column is-3"
          style="
            background: url('https://source.unsplash.com/featured/?colorful creative');
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          "
        ></div>
      </div>
    </div>
  </layout-default>
</template>
<style scoped>
.crossed {
  text-decoration: line-through;
}
</style>
<script>
import firebase from "firebase";
export default {
  name: "CreateInitiative",
  data() {
    return {
      name: null,
      videoURL: null,
      message: null,
      callToActionURL: null,
      IdInitiative: null,
      dates: [],
    };
  },
  computed: {
    finalAteOFuturoShareURL() {
      return `https://AteOFuturo.com.br/Iniciativas/Ver/${this.IdInitiative}`;
    },
    qrCodeShareURL() {
      return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${this.finalAteOFuturoShareURL}`;
    },
    startDate() {
      return this.dates && this.dates.length > 0 ? this.dates[0] : null;
    },
    endDate() {
      return this.dates && this.dates.length > 1 ? this.dates[1] : null;
    },
    progress() {
      var maxCount = 6;
      return (
        (((this.name ? 1 : 0) +
          (this.videoURL ? 1 : 0) +
          (this.callToActionURL ? 1 : 0) +
          (this.message ? 1 : 0) +
          (this.startDate ? 1 : 0) +
          (this.endDate ? 1 : 0)) /
          maxCount) *
        100
      );
    },
  },
  methods: {
    gravar() {
      var thisVM = this;

      this.IdInitiative = firebase
        .database()
        .ref()
        .child("/Initiatives")
        .push().key;
 

      firebase
        .database()
        .ref("/Initiatives/" + this.IdInitiative)
        .set({
          name: thisVM.name,
          message: thisVM.message,
          videoURL: thisVM.videoURL,
          callToActionURL: thisVM.callToActionURL,
          UserName: thisVM.$store.state.currentUser.displayName,
          UserId: thisVM.$store.state.currentUser.uid,
          UserEmail: thisVM.$store.state.currentUser.email,
          startDate: firebase.firestore.Timestamp.fromDate(thisVM.startDate),
          endDate: firebase.firestore.Timestamp.fromDate(thisVM.endDate),
        });

      this.$buefy.dialog.alert({
        message: `Deu tudo certo! Agora compartilhe o seu link de iniciativa com os seus parceiros ! <br /><br /> Use o link ${this.finalAteOFuturoShareURL} <br /><br /> <img src="${this.qrCodeShareURL}" />`,
        onConfirm: () => {
          this.$buefy.toast.open(`Feito`);
          this.$router.replace({
            name: "InitiativeDashboard",
          });
        },
      });
    },
  },
};
</script>