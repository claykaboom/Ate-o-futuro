
<template>
  <layout-default>
    <div class="box">
      <h1 class="title is-3">💬 Demandas de Entrevista💬</h1>
      <div class="columns">
        <div class="column is-12">
          <h2 class="subtitle is-3">Backlog</h2>

          <b-table
            style="background-color: #fff"
            :data="demandedAgenda"
            :bordered="false"
            :striped="false"
            :narrowed="true"
            :hoverable="true"
            :loading="$store.state.isLoading"
            :focusable="false"
            :mobile-cards="false"
          >
            <!-- <b-table-column field="id" label="Id" v-slot="props">
              {{ props.row.id }}
            </b-table-column> -->

            <b-table-column label="Informações para convite" v-slot="props">
              <b-collapse
                aria-id="contentIdForA11y2"
                class="panel"
                animation="slide"
                v-model="props.row.isOpen"
              >
                <template #trigger>
                  <div
                    class="panel-heading"
                    role="button"
                    aria-controls="contentIdForA11y2"
                  >
                    <strong>Ver convite de e-mail</strong>
                  </div>
                </template>
                <!-- <p class="panel-tabs">
                  <a class="is-active">All</a>
                  <a>Public</a>
                  <a>Private</a>
                </p> -->
                <div >
                  <b>Emails:</b> {{ props.row.Email }}, EXPERT_1 , EXPERT_2,
                  contato.ateofuturo@gmail.com
                  <hr />
                  <b>Assunto:</b> ⭐🚀 Oi, {{ props.row.Name }}, quando podemos
                  testar sua empregabilidade?
                  <hr />
                  Oi, {{ props.row.Name }}, <br /><br />

                  Obrigado por participar do Experimento Até o Futuro. Ficamos
                  animados em receber sua solicitação! ⚡😍<br /><br />

                  Com base nas informações que você forneceu, esse é seu momento
                  atual:<br /><br />

                  <ul>
                    <li>
                      <b>LinkedIn</b>:
                      <a :href="props.row.linkedInURL">{{
                        props.row.linkedInURL
                      }}</a>
                    </li>

                    <li>
                      <b> Vaga de Interesse</b>:
                      <a :href="props.row.URLVaga">{{ props.row.URLVaga }}</a>
                    </li>
                    <li>
                      <b>Situação profissional</b>:
                      {{ props.row.situacaoProfissional }}
                    </li>
                    <li>
                      <b>Informações adicionais</b>:
                      {{ props.row.infoAdicional }}
                    </li>
                  </ul>

                  <br /><br />
                  Para ajudar no seu teste de empregabilidade, escalamos duas
                  pessoas (em cópia neste e-mail):<br />
                  <br />
                  <ul>
                    <li>EXPERT 1</li>
                    <li>EXPERT 2</li>
                  </ul>
                  <br />
                  Para nos conhecer mais, entre em nossa página:
                  https://ateOfuturo.com.br/Nossos-Experts<br /><br />
                  Para essa primeira etapa gostaríamos que você nos respondesse
                  (pode responder a todos deste e-mail) em qual dos seguintes
                  horários podemos nos falar:<br /><br />
                  <ul style="list-style: decimal">
                    <li>YYYYY-feira (XX/XX/XX) às ZZ:ZZ</li>
                    <li>YYYYY-feira (XX/XX/XX) às ZZ:ZZ</li>
                  </ul>
                  <br />
                  O nosso papo deve levar no máximo 30 minutos e vai servir como
                  base para personalização da sua experiência
                  <b>(CORRE PORQUE A DISPONIBILIDADE PODE MUDAR! 🏃‍♂️🏃🏽‍♀️)</b>.
                  <br /><br />
                  Até o Futuro,<br /><br />
                  Clayton
                </div>
              </b-collapse>
            </b-table-column>

            <b-table-column
              field="PropostaFeita"
              label="Proposta de Horários Feita"
              v-slot="props"
            >
              <b-icon
                icon="check"
                type="is-success"
                size="is-large"
                v-if="props.row.PropostaFeita"
              />
              <b-icon
                icon="alert-decagram"
                type="is-danger"
                size="is-large"
                v-if="!props.row.PropostaFeita"
              />
            </b-table-column>
            <b-table-column
              field="HorarioReservado"
              label="Reserva Feita"
              v-slot="props"
            >
              <b-icon
                icon="check"
                type="is-success"
                size="is-large"
                v-if="props.row.HorarioReservado"
              />
              <b-icon
                icon="alert-decagram"
                type="is-danger"
                size="is-large"
                v-if="!props.row.HorarioReservado"
              />
            </b-table-column>
            <b-table-column
              field="AtendimentoFeito"
              label="Sessão Realizada"
              v-slot="props"
            >
              <b-icon
                icon="check"
                type="is-success"
                size="is-large"
                v-if="props.row.AtendimentoFeito"
              />
              <b-icon
                icon="alert-decagram"
                type="is-danger"
                size="is-large"
                v-if="!props.row.AtendimentoFeito"
              />
            </b-table-column>
            <b-table-column
              field="CreatedDate"
              label="Outras Info"
              v-slot="props"
            >
              <b-tag type="is-success">
                Data do Pedido:
                {{ props.row.CreatedDate | moment("DD/MM/YYYY HH:mm") }}</b-tag
              >
              <b-tag type="is-primary">
                Invite Code: {{ props.row.InviterCode }}</b-tag
              ><br /><br />
              Dias da Semana:<br />

              <b-taglist>
                <b-tag
                  type="is-dark"
                  v-for="dSemana in props.row.MelhoresDiasSemana"
                  v-bind:key="dSemana"
                  >{{ dSemana }}</b-tag
                >
              </b-taglist>
            </b-table-column>
          </b-table>
        </div>
      </div>
    </div>
  </layout-default>
</template>

<style scoped>
ul {
  list-style: square;
}
</style>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      demandedAgenda: [],
    };
  },
  mounted() {
    var thisVM = this;
    thisVM.load();
  },
  methods: {
    cleardDemands() {
      this.demandedAgenda.splice(0, this.demandedAgenda.length);
    },
    load() {
      var thisVM = this;
      var demandedAgendaRef = firebase.database().ref(`InterviewRequests`);
      thisVM.$store.commit("startLoading");
      demandedAgendaRef.on("value", function (snapshot) {
        thisVM.cleardDemands();

        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            thisVM.demandedAgenda.push({
              id: childSnapshot.key,
              CreatedDate: childData.CreatedDate,
              InviterCode: childData.InviterCode,
              Email: childData.Email,
              MelhoresDiasSemana: childData.MelhoresDiasSemana,
              Name: childData.Name,
              linkedInURL: childData.linkedInURL,
              infoAdicional: childData.infoAdicional,
              situacaoProfissional: childData.situacaoProfissional,
              HorarioReservado: childData.HorarioReservado,
              AtendimentoFeito: childData.AtendimentoFeito,
              PropostaFeita: childData.PropostaFeita,
              Expert1: childData.Expert1,
              Expert2: childData.Expert2,
              Expert1Email: childData.Expert1Email,
              Expert2Email: childData.Expert2Email,
              DiasEHorasPropostos: childData.DiasEHorasPropostos,
              URLVaga: thisVM.URLVaga,
              isOpen :false,
            });
          }
        });
        thisVM.$buefy.toast.open(`Agenda carregada`);

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
  },
};
</script>
