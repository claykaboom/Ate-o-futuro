<template>
  <layout-default>
 <vue-headful title="Até o Futuro - Validar Certificado" description="Até o Futuro" />
    <div class="box">
      <h1 class="title is-3">🏆 Validar Certificado</h1>
      <br /> <b>
        Validação de autenticidade do certificado. Não aceite um PRINT desta tela. Acesse o Link ou QR Code no certificado
        para validar a autenticidade.</b>
      <div v-if="certificate">
      Se você é o(a) dono(a) do certificado, adicione o certificado ao seu LinkedIn!<br />
        <a :href="linkedInCertificateURL" target="blank"
          ><img
            src="https://download.linkedin.com/desktop/add2profile/buttons/pt_BR.png "
            alt="Adicionar este certificado ao seu perfil"
        /></a>
      </div>
     
      
      <br />
      <br />
      <article class="media" v-if="$store.state.isLoading">
        <figure class="media-left">
          <p class="image is-64x64">
            <b-skeleton circle width="64px" height="64px"></b-skeleton>
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <b-skeleton active></b-skeleton>
              <b-skeleton height="80px"></b-skeleton>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small">
                  <b-skeleton></b-skeleton>
                </span>
              </a>
              <a class="level-item">
                <span class="icon is-small">
                  <b-skeleton></b-skeleton>
                </span>
              </a>
            </div>
          </nav>
          <br />
        </div>
      </article>

      <b-message
        title="Certificado Até o Futuro Reconhecido"
        type="is-success"
        has-icon
        :closable="false"
        v-if="certificate"
      >
        Opa! Este certificado é valido e reconhecido por nós do
        <b>Até o Futuro</b>! <br /><br />

        <b>Portador(a):</b>
        {{ certificate.CertifiedName }}
        <br />
        <b>Nome do Evento:</b>
        {{ certificate.EventName }}
        <br />
        <b>Id de Validação:</b> {{ CertificateId }} <br />
        <b>Data de emissão:</b>
        {{ certificate.CertificateDate | moment("DD/MM/YYYY HH:mm:ss") }} <br />

        <b>Horas Investidas:</b> {{ certificate.HoursInvested }} hora(s) <br />

        <br />

        Quer emitir certificados gratuitos em seus cursos/palestras/eventos?
        Fale com a gente
        <router-link :to="{ name: 'Contato' }"> por este link! 💌</router-link>
      </b-message>
      <section class="hero is-primary">
        <div class="hero-body" v-if="certificate">
          <p class="title">
            <b>Portador(a):</b>
            {{ certificate.CertifiedName }}
            <br /><br />
          </p>
          <p class="subtitle">
            <b>Nome do evento:</b>
            {{ certificate.EventName }}
          </p>
          <p class="subtitle">
            <b>Descrição do evento:</b>
            {{ certificate.EventDescription }}
          </p>
          <div style="text-align: center">
            <img
              :src="certificate.CertificateImageURL"
              v-if="certificate.CertificateImageURL"
              :title="`Imagem do certificado de ${certificate.CertifiedName}`"
            />
          </div>
        </div>
      </section>
      <b-message
        title="Certificado inválido"
        type="is-danger"
        has-icon
        :closable="false"
        v-if="!certificate"
      >
        Este certificado não é reconhecido pelo Até o Futuro! Verifique se o
        link fornecido está correto. Caso ache que isso é um problema, entre em
        contato com a gente
        <router-link :to="{ name: 'Contato' }"> por este link! 💌</router-link>
      </b-message>
    </div>
  </layout-default>
</template>


<script>
import firebase from "firebase";
import { DateTime } from "luxon";
export default {
  data() {
    return { CertificateId: null, certificate: null };
  },
  mounted() {
    this.loadCertificate();
  },
  computed: {
    linkedInCertificateURL() {
      var date = DateTime.fromISO(this.certificate.CertificateDate);
      var year = date.year;
      var month = date.month;
      var certURL = `https://ateOFuturo.com.br/Certificados/Validar/${this.CertificateId}`;
      return `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${this.certificate.EventName}&organizationId=70545799&issueYear=${year}
&issueMonth=${month}&certUrl=${certURL}&certId=${this.CertificateId}`;
    },
  },
  methods: {
    // select(item) {
    //   this.selected = item;
    // },

    loadCertificate() {
      var thisVM = this;

      if (this.$route.params.CertificateId !== undefined) {
        this.CertificateId = this.$route.params.CertificateId;
        var certificateRef = firebase
          .database()
          .ref(`Certificates/${this.CertificateId}`);
        thisVM.$store.commit("startLoading");
        certificateRef.on("value", function (snapshot) {
          thisVM.$buefy.toast.open(`Certificado carregado`);

          thisVM.certificate = snapshot.val();

          thisVM.$store.commit("stopLoading");
        });
      } else {
        this.CertificateId = null;
        thisVM.$buefy.toast.open(`Este não é um certificado válido :(`);
      }
    },
  },
};
</script>