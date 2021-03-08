<template>
  <layout-default>
    <div class="columns">
      <div class="box column is-12">
        <vue-headful
          title="Até o Futuro - Árvore da Realidade Futura"
          description="Árvore da Realidade Futura"
        />
        <h1 class="title is-3">🌳 Sua Árvore da Realidade Futura</h1>
        <div class="card" style="background-color: #efefdd">
          <div class="columns">
            <div class="column is-2">
              <vue-svg-gauge
                :start-angle="-110"
                :end-angle="110"
                :value="TreeStrength"
                :separator-step="0"
                :min="0"
                :max="100"
                gauge-color="#00D380"
                :scale-interval="1"
              />
            </div>
            <div class="column is-10">
              <h3 class="title is-4">
                💪 FORÇA DA SUA ÁRVORE 🌳
              </h3>
              A força da sua <b>Árvore da Realidade Futura</b> mostra o quanto
              você se dedicou para
              <b
                >ter o seu EU aprimorado, para que você seja À PROVA DO
                FUTURO.</b
              >
              Pratique cada um dos ramos da árvore para aumentar a sua força.
            </div>
          </div>
        </div>

        <br />
        <div class=" ">
          <div
            class="columns is-centered is-vcentered"
            v-for="section in KT.Sections"
            v-bind:key="section.Name"
          >
            <KT-stage
              :KTStats="KTStats"
              :KTStatKey="stage.KTStatKey"
              v-for="stage in section.Stages"
              v-bind:key="stage.Code"
              :stage="stage"
            />
          </div>
        </div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import { VueSvgGauge } from "vue-svg-gauge";
import firebase from "firebase";
import KnowledgeTree from "../../CommonData/KnowledgeTree";

import KTStage from "../../components/KnowledgeTree/KTStage";
export default {
  components: { VueSvgGauge, KTStage },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      var thisVM = this;
      var userDataKTStatsRef = firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/KTStats`);

      thisVM.$store.commit("startLoading");
      userDataKTStatsRef.on("value", function (snapshot) {
        thisVM.KTStats = snapshot.val();

        thisVM.$buefy.toast.open(`Árvore do Conhecimento atualizada!`);

        thisVM.$store.commit("stopLoading");
      });
    },
  },
  computed: {
    TreeStrength() {
      var thisVM = this;
      if (thisVM.KTStats == null) {
        return 0;
      }
      var TotalPotential = 0;
      var CurrentStrength = 0;
      thisVM.KT.Sections.forEach((section) => {
        section.Stages.forEach((stage) => {
          if (
            stage.MaxValue != null &&
            stage.KTStatKey != null &&
            thisVM.KTStats != null
          ) {
            CurrentStrength += Math.min(
              (thisVM.KTStats[stage.KTStatKey] * 1) / stage.MaxValue,
              1
            );
            TotalPotential += 1;
          }
        });
      });
      return (CurrentStrength / TotalPotential) * 100;
    },
  },
  data() {
    return {
      KTStats: null,
      KT: KnowledgeTree,
    };
  },
};
</script>