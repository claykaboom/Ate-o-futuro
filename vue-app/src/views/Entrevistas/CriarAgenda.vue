<template>
  <layout-default>
    <div class="box">
      <h1 class="title is-3">📅 Criar agenda de Entrevista</h1>
      <div class="columns">
        <div class="column is-6">
          <h2 class="subtitle is-3">Informe sua Disponibilidade</h2>
          Ajude os interessados a saber quando você estará disponível.
          <b-field label="Selecione a data e hora">
            <b-datetimepicker
              rounded
              placeholder="Selecione a data e hora"
              icon="calendar-today"
              :locale="locale"
              :datepicker="{ showWeekNumber }"
              :timepicker="{ enableSeconds, hourFormat }"
              horizontal-time-picker
              inline
              v-model="dataEvento"
            >
            </b-datetimepicker>
          </b-field>
          <b-button type="is-success" size="is-large" @click="save()"
            >Criar Disponibilidade</b-button
          >
        </div>
        <div class="column is-6">
          <h2 class="subtitle is-3">Sua Agenda</h2>

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
              <b-table-column
                field="id"
                label="Id"
                v-slot="props"
              >
                {{ props.row.id }}
              </b-table-column> <b-table-column
                field="data"
                label="Data"
                v-slot="props"
              >
                {{ props.row.Data   | moment("DD/MM/YYYY HH:mm")}}
              </b-table-column>
               
            </b-table>
        </div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      dataEvento: new Date(),
      showWeekNumber: false,
      enableSeconds: false,
      hourFormat: "24", // Browser locale
      locale: "pt-BR", // Browser locale
      availableAgenda: [],
    };
  },
  mounted() {
    var thisVM = this;
    thisVM.load();
  },

  methods: {
    clearAgenda() {
      this.availableAgenda.splice(0, this.availableAgenda.length);
    },
    load() {
      var thisVM = this;
      var interviewAgendaRef = firebase
        .database()
        .ref(`Users/${this.$store.state.currentUser.uid}/InterviewAgenda`);
      thisVM.$store.commit("startLoading");
      interviewAgendaRef.on("value", function (snapshot) {
        thisVM.clearAgenda();

        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            thisVM.availableAgenda.push({
              id: childSnapshot.key,
              Data: childData.Data,
            });
          }
        });
        thisVM.$buefy.toast.open(`Agenda carregada`);

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
    save() {
      var thisVM = this;
      var newInterviewAgendaID = firebase
        .database()
        .ref()
        .child(`/InterviewAgenda/${newInterviewAgendaID}`)
        .push().key;

      firebase
        .database()
        .ref(`/InterviewAgenda/${newInterviewAgendaID}`)
        .update({ 
          UserId: this.$store.state.currentUser.uid,
          UserName: this.$store.state.currentUser.displayName, 
          CreatedByUserEmail: this.$store.state.currentUser.email,
          Data: thisVM.dataEvento,
        })
        .then(function () {
          thisVM.$buefy.dialog.alert({
            message: `Salvou!`,
            onConfirm: () => {},
          });
        });
    },
  },
};
</script>