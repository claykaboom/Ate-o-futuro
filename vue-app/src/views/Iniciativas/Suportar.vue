<template>
  <layout-default>
    <div class="box is-dark">Estamos registrando seu suporte!</div>
  </layout-default>
</template>

<script>
import firebase from "firebase";
export default {
  name: "SupportInitiative",
  mounted() {
    this.support();
  },
  methods: {
    support() { 
      var thisVM = this;
      var valueToRecord = JSON.parse(
        `{"${thisVM.$store.state.currentUser.uid}":true}`
      );
      thisVM.$store.commit("startLoading");
      firebase
        .database()
        .ref(
          `/Initiatives/${thisVM.$route.params.IdInitiative}/supporters/${thisVM.$store.state.currentUser.uid}`
        )
        .update(valueToRecord)
        .then(function () {
          thisVM.$store.commit("stopLoading");
          thisVM.$router.push({
            name: "InitiativeDetail",
            params: { IdInitiative: thisVM.$route.params.IdInitiative },
          });
        });
    },
  },
};
</script>