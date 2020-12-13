<template>
  <layout-default>
    <div class="box">
      <h1 class="title is-4">Meu Mapa do Futuro (Beta)</h1>
      <div class="columns">
        <div class="column is-3">
          Este mapa é melhor visto no computador. É um recurso visual para você
          traçar sua estratégia pessoal para chegar em seu melhor futuro.
          <br />
          <br />
          <b-button @click="save()" type="is-success">Salvar</b-button>
        </div>

        <div class="column is-9 notification">
          <DiagramEditor v-model="graph"></DiagramEditor>
        </div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import { DiagramEditor } from "diagram-vue";
import "diagram-vue/dist/diagram.css";
import firebase from "firebase";

export default {
  components: { DiagramEditor },
  data() {
    return {
      graph: {
        width: 800,
        height: 600,
        background: "#eee",
        nodes: [
          {
            id: "1",
            content: { text: "Eu (Presente)", color: "white" },
            width: 150,
            height: 60,
            stroke: "black",
            strokeWeight: "2",
            shape: "rectangle",
            point: { x: 269, y: 31.056557875214764 },
          },

          {
            id: "2",
            content: { text: "Eu (Futuro)", color: "white" },
            width: 150,
            height: 60,
            point: { x: 39, y: 152.85606145781674 },
            shape: "rectangle",
            stroke: "black",
            strokeWeight: "2",
          },
        ],
        links: [
          {
            id: "17214bd270854071",
            source: "1",
            destination: "2",
            point: { x: 561, y: 53.556557875214764 },
            color: "orange",
            shape: "bezier",
            pattern: "solid",
            arrow: "dest",
          },
        ],
        showGrid: true,
      },
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      var thisVM = this;

      thisVM.$store.commit("startLoading");
      var userPersonalGraph = firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/PersonalGraph`);

      userPersonalGraph.on("value", function (snapshot) {
        var loadedGraph = snapshot.val();
        if (loadedGraph) {
          thisVM.graph = loadedGraph;
        }
        thisVM.$store.commit("stopLoading");
      });
    },
    save() {
      var thisVM = this;
      firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/PersonalGraph`)
        .set(thisVM.graph)
        .then(function () {
          thisVM.$buefy.dialog.alert({
            message: "Mapa do Futuro salvo!",
            onConfirm: () => {},
          });
        }).catch(function( )
        {
            
          thisVM.$buefy.dialog.alert({
            message: "😢 Algum erro aconteceu: "  ,
            onConfirm: () => {},
          });
        });
    },
  },
};
</script>