<template>
  <layout-default>
    <vue-headful
      title="Até o Futuro  - Teste sua Empregabilidade ⚔⚡ - Mentoria Gratuita"
      description="Mentoria Gratuita"
    />
    <div class="box">
      <h1 class="title is-3">📅 Agende seu Processo Seletivo + Mentoria</h1>
      <h2 class="subtitle is-3">
        Faça um simulado e teste sua empregabilidade  
      </h2> 
      <div class="columns">
        <div class="column is-6">
          <h3 class="subtitle is-3">
            <b-icon icon="account" size="large" /> Seus dados
          </h3>

          <b-field label="Nome" label-position="on-border">
            <b-input
              v-model="name"
              placeholder="Seu nome Aqui"
              :message="nameErrorMessage"
              :type="nameErrorMessage ? 'is-danger' : ''"
            ></b-input>
          </b-field>
          <b-field
            label="Email"
            label-position="on-border"
            :type="emailErrorMessage ? 'is-danger' : ''"
          >
            <b-input
              type="email"
              placeholder="seuEmail@provedor.com"
              v-model="email"
              icon="email"
              maxlength="150"
              :message="emailErrorMessage"
            >
            </b-input>
          </b-field>
          <b-field
            expanded
            label="Situação profissional"
            label-position="on-border"
            v-model="situacaoProfissional"
          >
            <b-select
              placeholder="Indique seu momento profissional"
              v-model="situacaoProfissional"
            >
              <option
                value="Desempregado(a) - Procurando emprego em área de experiência"
              >
                Desempregado(a) - Procurando emprego em área de experiência
              </option>
              <option
                value="Desempregado(a) - Procurando mudar de carreira ou o primeiro
                emprego"
              >
                Desempregado(a) - Procurando mudar de carreira ou o primeiro
                emprego
              </option>
              <option
                value="Empregado(a) - Procurando mais visibilidade no mercado"
              >
                Empregado(a) - Procurando mais visibilidade no mercado
              </option>
              <option value="Empregado(a) - Procurando promoção">
                Empregado(a) - Procurando promoção
              </option>
              <option
                value="Empregado(a) - Procurando mudar de carreira (outra área)"
              >
                Empregado(a) - Procurando mudar de carreira (outra área)
              </option>
              <option
                value="Empregado(a) - Procurando mudar de emprego na mesma área"
              >
                Empregado(a) - Procurando mudar de emprego na mesma área
              </option>
              <option value="Empregado(a) - Validação da minha empregabilidade">
                Empregado(a) - Validação da minha empregabilidade
              </option>
              <option value="Outra">Outra</option>
            </b-select>
          </b-field>

          <b-field label="Informações adicionais" label-position="on-border">
            <b-input
              maxlength="200"
              type="textarea"
              v-model="infoAdicional"
            ></b-input>
          </b-field>

          <b-field
            label="WhatsApp para Notificações (opcional)"
            label-position="on-border"
          >
            <b-input
              placeholder="+5511XXXXX-XXXX"
              type="phone"
              icon="phone"
              v-cleave="masks.phone"
              v-model="whatsAppNumber"
            ></b-input>
          </b-field>
          <b-field
            label="URL de alguma vaga de interesse (opcional)"
            type="url"
            label-position="on-border"
          >
            <b-input
              v-model="URLVaga"
              expanded
              icon="link"
              placeholder="Vaga de interesse"
            ></b-input>
          </b-field>

          <b-field
            label="URL do seu Curriculum ou Linkedin (opcional)"
            label-position="on-border"
          >
            <b-input
              v-model="linkedInURL"
              expanded
              icon="linkedin"
              placeholder="Como podemos te conhecer melhor"
            ></b-input>
          </b-field>
          <br />
          <b
            >📍 Se você compartilhar uma vaga na qual você tem interesse e seu
            histórico profissinal, poderemos customizar a sua experiência.</b
          >
          <br />
          <br />
          <b-field label="Melhores dias da semana para sua entrevista">
            <div class="block">
              <b-checkbox v-model="diasSemana" native-value="Segunda-Feira">
                Segunda-Feira
              </b-checkbox>
              <b-checkbox v-model="diasSemana" native-value="Terça-Feira">
                Terça-Feira
              </b-checkbox>
              <b-checkbox v-model="diasSemana" native-value="Quarta-Feira">
                Quarta-Feira
              </b-checkbox>
              <b-checkbox v-model="diasSemana" native-value="Quinta-Feira">
                Quinta-Feira
              </b-checkbox>
              <b-checkbox v-model="diasSemana" native-value="Sexta-Feira">
                Sexta-Feira
              </b-checkbox>
              <b-checkbox v-model="diasSemana" native-value="Sábado">
                Sábado
              </b-checkbox>
              <b-checkbox v-model="diasSemana" native-value="Domingo">
                Domingo
              </b-checkbox>
            </div>
          </b-field>
          <br />

          ❗ Vamos mandar algumas propostas de datas MAIS PRÓXIMAS da sua
          preferência o possível. Entenda que temos uma fila de interessados e
          vamos gerenciando a fila caso haja desistências.
          <br />
          <br />

          <b-checkbox
            size="is-small"
            type="is-success"
            v-model="consentimentoPrivacidade"
            native-value="Concordo com os termos de privacidade"
          >
            Eu concordo com os usos de meus dados pessoais somente para
            finalidade da entrevista + mentoria, podendo pedir a eliminação dos
            meus dados a qualquer momento. Concordo com a
            <router-link  :to="{ name: 'Privacidade' }" 
              >Política de Privacidade do Até o Futuro</router-link
            >
          </b-checkbox>
          <br />
          <br />

          <b-button
            size="is-large"
            :disabled="!consentimentoPrivacidade"
            type="is-success"
            @click="save()"
            >Agendar ⚡</b-button
          >
        </div>
        <!-- <div class="column is-5">
              <h2 class="subtitle is-3">
            <b-icon icon="calendar" size="large" /> Escolha a data e hora
          </h2>
          <b-table
            :data="availableAgenda"
            :bordered="true"
            :striped="true"
            :narrowed="true"
            :hoverable="true"
            :loading="$store.state.isLoading"
            :focusable="false"
            :mobile-cards="false"
          >
            <b-table-column field="id" label="Id" v-slot="props">
              {{ props.row.id }}
            </b-table-column>
            <b-table-column field="data" label="Data" v-slot="props">
              {{ props.row.Data | moment("DD/MM/YYYY HH:mm") }}
            </b-table-column>
          </b-table>
        </div> -->
        <div
          class="column is-6"
          style="
            background: url('https://source.unsplash.com/featured/?colorful creative');
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          "
        >
          <div class="box">
            <h2 class="subtitle is-3">🚀 Como funciona?</h2>

            <section class="hero is-primary">
              <div class="hero-body">
                <p class="title">VAGAS LIMITADAS! 🏃‍♂️🏃🏽‍♀️</p>
                <p class="subtitle">
                  GRÁTIS. DE VERDADE. Aproveite agora sua chance de validar sua
                  empregabilidade com pessoas de confiança e ajude-nos com esse
                  experimento!
                </p>
              </div>
            </section>

            <br />
            <b>1️⃣</b> Assim que você registrar seu interesse, vamos mandar
            sugestões de datas para você escolher e agendar a sua simulação de
            processo seletivo!
            <br />
            <br />

            <b> 2️⃣</b> Nessa entrevista vamos exercitar suas fortalezas,
            identificar suas vulnerabilidades, e fazer uma reflexão
            especializada sobre sua performance!

            <br />
            <br />

            <b>3️⃣</b> Se você desejar podemos compartilhar o resultado de sua
            entrevista com nossos parceiros, como um suporte para sua jornada de
            aperfeiçoamento.

            <br />
            <br />

            <b>
              4️⃣ O nosso objetivo é ajudar você a fazer a travessia desse rio
              que separa seu EU PRESENTE do seu EU FUTURO.</b
            >
            <br />
            <br />

            <b>
              5️⃣ 🤔 Se estiver em dúvidas sobre quem somos, conheça-nos mais em
              <router-link :to="{ name: 'Experts' }">
                nossa página de Experts</router-link
              ></b
            >
            <br />
            <br />

            <b> 6️⃣</b> Sempre atente-se
            <router-link :to="{ name: 'Privacidade' }">
              às políticas de privacidade.
            </router-link>
            Aqui armazenamos seus dados para propósitos de qualidade e de acordo
            com a Lei Geral de Proteção de Dados.

            <br />
            <br />

            <!-- 5️⃣6️⃣7️⃣8️⃣9️⃣🔟 -->

            <video autoplay muted loop id="myVideo">
              <source src="@/assets/Empregabilidade.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  </layout-default>
</template>


<script>
import firebase from "firebase";
require("cleave.js/dist/addons/cleave-phone.br");
import Cleave from "cleave.js";

const cleave = {
  name: "cleave",
  bind(el, binding) {
    const input = el.querySelector("input");
    input._vCleave = new Cleave(input, binding.value);
  },
  unbind(el) {
    const input = el.querySelector("input");
    input._vCleave.destroy();
  },
};

export default {
  directives: { cleave },
  data() {
    return {
      dataEvento: new Date(),
      showWeekNumber: false,
      enableSeconds: false,
      hourFormat: "24", // Browser locale
      locale: "pt-BR", // Browser locale
      availableAgenda: [],
      whatsAppNumber: null,
      linkedInURL: null,
      name: null,
      email: null,
      URLVaga: null,
      diasSemana: [],
      situacaoProfissional: null,
      infoAdicional: null,
      InviterCode: null,
      consentimentoPrivacidade: false,
      masks: {
        phone: {
          phone: true,
          phoneRegionCode: "BR",
        },
      },
    };
  },
  mounted() {
    var thisVM = this;
    thisVM.InviterCode = thisVM.$route.params.InviterCode;
    if (thisVM.$store.state.currentUser != null) {
      thisVM.name = thisVM.$store.state.currentUser.displayName;
      thisVM.email = thisVM.$store.state.currentUser.email;
    }
  },
  computed: {
    emailErrorMessage() {
      if (this.email == null || this.email == "") {
        return "E-mail inválido";
      }

      return null;
    },
    whatsAppErrorMessage() {
      if (this.whatsAppNumber == null || this.whatsAppNumber == "") {
        return "Telefone inválido";
      }

      return null;
    },
    nameErrorMessage() {
      if (this.name == null || this.name == "")
        return "Informe seu nome, por favor";
      return null;
    },
  },
  methods: {
    save() {
      var thisVM = this;
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValidEmail =
        thisVM.email != null && re.test(String(this.email).toLowerCase());
      var isValidWhatsApp =
        thisVM.whatsAppNumber != null &&
        thisVM.whatsAppNumber.replaceAll(" ", "").length >= 8;
      if (
        thisVM.nameErrorMessage != null ||
        (thisVM.emailErrorMessage != null &&
          thisVM.whatsAppErrorMessage != null)
      ) {
        this.$buefy.dialog.alert({
          message:
            "😢 Ops! Precisamos pelo menos de seu nome e de uma informação de contato (e-mail ou whatsapp)",
          onConfirm: () => {
            this.$buefy.toast.open(
              `Preencha todos os campos para entrar em contato`
            );
          },
        });
      } else {
        if (thisVM.email != null && thisVM.email != "" && !isValidEmail) {
          this.$buefy.dialog.alert({
            message: "😢 Ops! Parece que esse e-mail não está legal.",
            onConfirm: () => {
              this.$buefy.toast.open(`Ops! E-mail inválido`);
            },
          });
        } else if (thisVM.whatsAppNumber != null && !isValidWhatsApp) {
          this.$buefy.dialog.alert({
            message:
              "😢 Ops! Parece que seu número do WhatsApp não está completo.",
            onConfirm: () => {
              this.$buefy.toast.open(`Ops! Whats App não parece certo!`);
            },
          });
        } else if (thisVM.situacaoProfissional == null) {
          this.$buefy.dialog.alert({
            message:
              "🔨 Você pode indicar a sua situação profissional, por favor? Isso vai ajudar a gente a personalizar a sua experiência conosco.",
            onConfirm: () => {
              this.$buefy.toast.open(`Indique a situação profissional.`);
            },
          });
        } else {
          var newInterviewRequestID = firebase
            .database()
            .ref()
            .child(`/InterviewRequests/${newInterviewRequestID}`)
            .push().key;

          var LoggedUserId = null;
          var LoggedUserName = null;
          var LoggedCreatedByUserEmail = null;

          if (thisVM.$store.state.currentUser) {
            LoggedUserId = thisVM.$store.state.currentUser.uid;
            LoggedUserName = thisVM.$store.state.currentUser.displayName;
            LoggedCreatedByUserEmail = thisVM.$store.state.currentUser.email;
          }

          firebase
            .database()
            .ref(`/InterviewRequests/${newInterviewRequestID}`)
            .update({
              LoggedUserId: LoggedUserId,
              LoggedUserName: LoggedUserName,
              LoggedCreatedByUserEmail: LoggedCreatedByUserEmail,
              Name: thisVM.name,
              Email: thisVM.email,
              WhatsApp: thisVM.whatsAppNumber,
              MelhoresDiasSemana: thisVM.diasSemana,
              URLVaga: thisVM.URLVaga,
              linkedInURL: thisVM.linkedInURL,
              situacaoProfissional: thisVM.situacaoProfissional,
              infoAdicional: thisVM.infoAdicional,
              consentimentoPrivacidade: thisVM.consentimentoPrivacidade,
              InviterCode: thisVM.InviterCode,
            })
            .then(function () {
              thisVM.$buefy.dialog.alert({
                message: `Obrigado! Você deve ter recebido um e-mail de confirmação de seu interesse e agora vamos deixar nossos robozinhos acharem uma data que caiba dentro das suas preferências 🤖! `,
                onConfirm: () => {
                  thisVM.$router.replace({
                    name: "Sobre",
                  });
                },
              });
            });
        }
      }
    },
    clearAgenda() {
      this.availableAgenda.splice(0, this.availableAgenda.length);
    },
    // load() {
    //   var thisVM = this;
    //   var interviewAgendaRef = firebase.database().ref(`/InterviewAgenda`);
    //   thisVM.$store.commit("startLoading");
    //   interviewAgendaRef.on("value", function (snapshot) {
    //     thisVM.clearAgenda();

    //     snapshot.forEach(function (childSnapshot) {
    //       var childData = childSnapshot.val();

    //       if (childSnapshot.key != "_count") {
    //         thisVM.availableAgenda.push({
    //           id: childSnapshot.key,
    //           Data: childData.Data,
    //         });
    //       }
    //     });
    //     thisVM.$buefy.toast.open(`Agenda carregada`);

    //     thisVM.$store.commit("stopLoading");
    //     //thisVM.$root.stopLoading();
    //   });
    // },
  },
};
</script>