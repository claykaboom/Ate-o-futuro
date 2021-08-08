<template>
  <layout-default>
    <div class="box">
      <vue-headful
        title="Até o Futuro - Modelos de pedido de feedback"
        description="Peça Feedback sobre uma habilidade"
      />
      <h1 class="title is-3">🧩 Modelos de pedido de feedback</h1>

      <section class="hero is-info">
        <div class="hero-body">
          <div class="container">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <div class="control has-icons-left has-icons-right">
                    <input class="input is-large" type="search" />
                    <span class="icon is-medium is-left">
                      <i class="fa fa-search"></i>
                    </span>
                    <span class="icon is-right">
                      <b-icon icon="file" size="is-medium" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />

      <b-tabs>
        <!-- <b-tab-item label="Todos" icon="google-photos"
          ><feedfuture-Galeria-Modelos :models="feedFuturePublicModels"
        /></b-tab-item> --><b-tab-item label="Meus modelos" icon="video"
          ><feedfuture-Galeria-Modelos :models="feedFutureMyModels"
        /></b-tab-item>
        <b-tab-item label="Públicos" icon="library-music"
          ><feedfuture-Galeria-Modelos :models="feedFuturePublicModels"
        /></b-tab-item>
        <b-tab-item label="Oficiais Até o Futuro" icon="video"
          ><feedfuture-Galeria-Modelos :models="feedFutureMyModels"
        /></b-tab-item>
        
      </b-tabs>
    </div>
  </layout-default>
</template>
<script>
import firebase from "firebase";
import FeedfutureGaleriaModelos from "../../components/FeedFuture/Modelos/FeedfutureGaleriaModelos";
export default {
  components: { FeedfutureGaleriaModelos },
  data() {
    return { feedFuturePublicModels: [],feedFutureMyModels: [] };
  },
  mounted() {
    this.loadPublicModels();
    this.loadMyModels();
  },

  methods: {
    clearPublicModels(){
      var thisVM = this;
       thisVM.feedFuturePublicModels.splice(0, thisVM.feedFuturePublicModels.length);
       
      },
    clearMyModels(){
      var thisVM = this;
       thisVM.feedFutureMyModels.splice(0, thisVM.feedFutureMyModels.length);
       
      },
    loadPublicModels() {
      var thisVM = this;
      thisVM.$store.commit("startLoading");
      var FeedFutureModelsRef = firebase
        .database()
        .ref(`PublicFeedFutureTemplates`); //.orderByChild("isPublicTemplate").equalTo(true);
      FeedFutureModelsRef.on("value", function (snapshot) {
        thisVM.clearPublicModels();
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            thisVM.feedFuturePublicModels.push({
              id: childSnapshot.key,
              title: childData.title,
              description: childData.description,
              tags: childData.tags,
            });
          }
        });

        thisVM.$buefy.toast.open(`Tudo certo!`);

        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },loadMyModels() {
      var thisVM = this;
      thisVM.$store.commit("startLoading");
      var FeedFutureModelsRef = firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/FeedFutureTemplates`);
      FeedFutureModelsRef.on("value", function (snapshot) {
        thisVM.clearMyModels();
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            thisVM.feedFutureMyModels.push({
              id: childSnapshot.key,
              title: childData.title,
              description: childData.description,
              tags: childData.tags,
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