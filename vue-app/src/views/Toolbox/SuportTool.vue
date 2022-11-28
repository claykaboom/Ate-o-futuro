<template>
  <layout-default>
    <div class="box is-dark" v-if="$store.state.isLoading">
      Estamos registrando seu suporte!
    </div>
  </layout-default>
</template>

<script>
import firebase from "firebase";
export default {
  name: "SupportTool",
  mounted() {
    this.support();
  },
  methods: {
    support() {
      var thisVM = this;
      if (thisVM.$store.state.isLogged) {
        var valueToRecord = JSON.parse(
          `{"${thisVM.$store.state.currentUser.uid}":true}`
        );

        var audio = new Audio(require("../../assets/sounds/like.mp3")); // path to file
        audio.volume = 0.05;
        audio.play();

        thisVM.$store.commit("startLoading");
        firebase
          .database()
          .ref(
            `/Tools/${thisVM.$route.params.toolId}/supporters`
          )
          .update(valueToRecord)
          .then(function () {
            thisVM.$store.commit("stopLoading");
            thisVM.$router.push({
              name: "ToolDetail",
              params: { toolId: thisVM.$route.params.toolId },
            });
          });
      }
    },
  },
};
</script>