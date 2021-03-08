<template>
  <layout-default>
    <div v-if="Page">
      <vue-headful
        :title="'Até o Futuro - ' + Page.Title"
        :description="Page.Title"
      />
      <div class="box" v-if="Page">
        <h1 class="title is-3">{{ Page.Title }}</h1>
        <div v-html="Page.Content"></div>
      </div>
    </div>
  </layout-default>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return { Page: null };
  },
  mounted() {
    var thisVM = this;
    //  thisVM.$root.startLoading();

    var pageRef = firebase
      .database()
      .ref(`Pages/${thisVM.$route.params.IdPage}`);

    thisVM.$store.commit("startLoading");
    pageRef.on("value", function (snapshot) {
      //  thisVM.$buefy.toast.open(`Iniciativa terminou de carregar!`);

      thisVM.Page = snapshot.val();

      thisVM.$store.commit("stopLoading");
      //thisVM.$root.stopLoading();
    });
  },
};
</script>