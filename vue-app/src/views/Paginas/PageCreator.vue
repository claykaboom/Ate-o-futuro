<template>
  <layout-default> <vue-headful
          title="Até o Futuro - Criador de Páginas"
          description="Criador de Páginas"
        />
    <div class="box">
      IdPage:<b-input v-model="IdPage" /> Title:<b-input v-model="Title" />
      Permalink:<b-input v-model="Permalink" />
      <vue-editor v-model="Content"></vue-editor>
      <b-button @click="gravar"> Gravar</b-button>
    </div>
  </layout-default>
</template>
<script>
import { VueEditor } from "vue2-editor";

import firebase from "firebase";

export default {
  components: { VueEditor },
  data() {
    return {
      Title: "",
      Permalink: "",
      Content: "",
      IdPage: null,
    };
  },
  mounted() {
    this.IdPage = this.$route.params.IdPage;
    if (this.IdPage) {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      var thisVM = this;
      var PageRef = firebase.database().ref(`Pages/${this.IdPage}`);

      thisVM.$store.commit("startLoading");
      PageRef.on("value", function (snapshot) {
        var page = snapshot.val();
        thisVM.Title = page.Title;
        thisVM.Permalink = page.Permalink;
        thisVM.Content = page.Content;

        thisVM.$store.commit("stopLoading");
      });
    },
    gravar() {
      var thisVM = this;
      if (this.IdPage == null) {
        this.IdPage = firebase.database().ref().child("/Pages").push().key;
      }

      firebase
        .database()
        .ref("/Pages/" + this.IdPage)
        .update({
          Title: thisVM.Title,
          Content: thisVM.Content,
          Permalink: thisVM.Permalink,
        });

      this.$buefy.dialog.alert({
        message: `Deu tudo certo! Página criada/editada`,
        onConfirm: () => {
          this.$buefy.toast.open(`Feito`);
        },
      });
    },
  },
};
</script>