<template>
  <layout-default>
     <vue-headful
      title="Até o Futuro - Emitir Certificado"
      description="Até o Futuro - Emitir Certificado"
    />
    <div class="box">
      <h1 class="title is-3">✍ Emitir Certificado</h1>
      <b-field label="ID">
        {{ CertificateId }}
        <br />
        https://ateofuturo.com.br/Certificados/Validar/{{ CertificateId }}
      </b-field>
      <div>
        <b-image :src="qrCodeURL" style="display: inline-table" />
      </div>
      <b-field label="Nome">
        <b-input v-model="CertifiedName" placeholder=""></b-input>
      </b-field>

      <b-field label="Nome do Evento">
        <b-input v-model="EventName" placeholder=""></b-input>
      </b-field>
      <b-field label="Descrição do Evento">
        <b-input v-model="EventDescription" placeholder=""></b-input>
      </b-field>

      <b-field label="Email">
        <b-input v-model="CertifiedEmail" placeholder=""></b-input>
      </b-field>

      <b-field label="URL da imagem do Certificado">
        <b-input v-model="CertificateImageURL" placeholder=""></b-input>
      </b-field>

      <b-field label="Data e Hora">
        <b-datetimepicker
          rounded
          placeholder="Selecione a data e hora"
          icon="calendar-today"
          :locale="locale"
          :datepicker="{ showWeekNumber }"
          :timepicker="{ enableSeconds, hourFormat }"
          horizontal-time-picker
          inline
          v-model="CertificateDate"
        >
        </b-datetimepicker>
      </b-field>

      <b-field label="Horas">
        <b-numberinput v-model="HoursInvested" min="1"></b-numberinput>
      </b-field>

      <b-button type="success" @click="Emitir()">Emitir</b-button>
    </div>
  </layout-default>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      CertificateId: null,
      CertificateDate: null,
      CertificateImageURL: null,
      CertifiedName: null,
      CertifiedEmail: null,
      EventName: null,
      EventDescription: null,
      HoursInvested: null,
      showWeekNumber: false,
      enableSeconds: false,
      CreatedByUserId: null,
      hourFormat: "24", // Browser locale
      locale: "pt-BR", // Browser locale
    };
  },
  mounted() {
    this.Load();
  },
  computed: {
    qrCodeURL() {
      var certURL = `https://ateOFuturo.com.br/Certificados/Validar/${this.CertificateId}`;
      return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${certURL}`;
    },
  },
  methods: {
    Load() {
      this.CertificateId = firebase
        .database()
        .ref()
        .child(`/Certificates/`)
        .push().key;
    },
    Emitir() {
      var thisVM = this;
      this.CreatedByUserId = this.$store.state.currentUser.uid;
      // thisVM.CertificateId = firebase
      //   .database()
      //   .ref()
      //   .child(`/Certificates/`)
      //   .push().key;

      firebase
        .database()
        .ref(`/Certificates/${thisVM.CertificateId}`)
        .update({
          CertificateDate: thisVM.CertificateDate,
          CertificateImageURL: thisVM.CertificateImageURL,
          CertifiedName: thisVM.CertifiedName,
          CertifiedEmail: thisVM.CertifiedEmail,
          EventDescription: thisVM.EventDescription,
          EventName: thisVM.EventName,
          HoursInvested: thisVM.HoursInvested,
        })
        .then(function () {
          thisVM.$buefy.dialog.alert({
            message: `Certificado Emitido.`,
            onConfirm: () => {
              thisVM.$router.push({
                name: "ValidaCertificado",
                params: { CertificateId: thisVM.CertificateId },
              });
            },
          });
        });
    },
  },
};
</script>