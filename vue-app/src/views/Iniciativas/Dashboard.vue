<template>
  <layout-default
    ><div class="box">
      <vue-headful
        title="Até o Futuro - Painel de Iniciativas"
        description="Painel de Iniciativas"
      />
      <h1 class="title is-3"><b-icon icon="eye-outline" size="is-medium"/> Painel de Iniciativas</h1>
      <div class="buttons">
        <router-link
          class="button is-success is-large"
          :to="{ name: 'NovaIniciativa' }"
        >
          <b-icon size="is-small" icon="arrow-right"></b-icon
          ><b-icon size="is-small" icon=""></b-icon> Criar
          Iniciativa</router-link
        >
      </div>
      <span  v-if="initiatives.length == 0">
        😅 Parece que não tem iniciativa aqui. Crie a sua primeira!
      </span>
      <b-table v-if="initiatives.length >0"
        :data="initiatives"
        :bordered="true"
        :striped="true"
        :narrowed="true"
        :hoverable="true"
        :loading="$store.state.isLoading"
        :focusable="false"
        :mobile-cards="false"
        :selected.sync="selected"
      >
        <b-table-column field="name" label="Nome da Iniciativa" v-slot="props">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="videoURL" label="Vídeo" v-slot="props">
          <a :href="props.row.videoURL" target="blank">Link para o vídeo</a>
        </b-table-column>
        <b-table-column
          field="callToActionURL"
          label="Link de ação"
          v-slot="props"
        >
          <a :href="props.row.callToActionURL" target="blank">Link para ação</a>
        </b-table-column>  <b-table-column
          field="id"
          label="Ver"
          v-slot="props"
        >  

         <router-link class="button is-info" :to="{name:'InitiativeDetail'  , params: { IdInitiative: props.row.id}}">Detalhes</router-link>
         
        </b-table-column>
      </b-table>
    </div>
  </layout-default>
</template>


<script>
import firebase from "firebase";
import SkillFeedbackRequest from "../../components/Feedback/SkillFeedbackRequest";
import SkillFeedbackResponseDetail from "../../components/Feedback/SkillFeedbackResponseDetail";

export default {
  name: "provide-skill-feedback",
  components: { SkillFeedbackRequest, SkillFeedbackResponseDetail },
  //props: ["IdfeedBackRequest"],
  data() {
    return {
      selected: null,
      initiatives: [],
    };
  },
  mounted() {
    var thisVM = this;
    thisVM.getData();
  },
  methods: {
    clearInitiativesData: function () {
      this.initiatives.splice(0, this.initiatives.length);
    },
    getData() {
      var thisVM = this;
      // thisVM.$root.startLoading();

      thisVM.$store.commit("startLoading");
      var initiativesRef = firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/Initiatives`);

      initiativesRef.on("value", function (snapshot) {
        thisVM.clearInitiativesData();
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            thisVM.initiatives.push({
              id: childSnapshot.key,
              name: childData.name,
              videoURL: childData.videoURL,
              callToActionURL: childData.callToActionURL,
            });
          }
        });

        thisVM.$buefy.toast.open(`Tudo certo!`);

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
  },
};
</script>