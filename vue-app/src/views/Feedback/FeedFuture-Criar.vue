<template>
  <layout-default>
    <vue-headful
      title="Até o Futuro - Pedir Feedback / Feedfuture"
      description="Até o Futuro - Pedir Feedback / Feedfuture"
    />

    <div class="box">
      <h1 class="title is-3">⚡ Feedfuture - Criação de Pedido de Feedback</h1>
Vamos criar um formulário para que outras pessoas deem feedbacks para você!<br /><br />
      <b-field label="Título de seu pedido de feedback">
        <b-input
          placeholder="ex.: Feedback sobre minha reunião"
          rounded
          v-model="feedFuture.title"
        ></b-input>
      </b-field>

      <b-field
        label="Explique em que contextos esse pedido de feedback deve ser usado, ou como o(a) dador(a) do feedback deve pensar para fornecer o feedback."
      >
        <b-input
          v-model="feedFuture.description"
          type="textarea"
          minlength="10"
          maxlength="2048"
          :loading="$store.state.isLoading"
          placeholder="Dê exemplos que ajudem as pessoas que vão usar este modelo de feedback para melhorarem suas versões de futuro."
        >
        </b-input>
      </b-field>
 <b-icon
        icon="arrow-right"
        class="animate__animated animate__headShake animate__infinite"
        size="is-medium"
      /><b-checkbox
        v-model="feedFuture.isPublicTemplate"
        title="Selecione esta opção se você quiser que outras pessoas no Até o Futuro usem seu pedido de feedback como referência para os pedidos delas"
      >
        Quero deixar esse pedido de feedback como modelo para que outras pessoas também possam se aprimorar
      </b-checkbox>
      <b-checkbox
        v-model="feedFuture.oneFeedbackPerUser"
        title="Selecione esta opção se você quiser somente um feedback por pessoa"
      >
       👩‍💼 Quero somente um feedback por pessoa (por ciclo) - exige que a pessoa que vai dar o feedback faça login
      </b-checkbox>
      <!-- <b-icon
        icon="arrow-right"
        class="animate__animated animate__headShake animate__infinite"
        size="is-medium"
      /><b-checkbox
        v-model="publicForExperts"
        title="Selecione esta opção se você quiser que nossos Experts do Futuro forneçam um feedback para você"
      >
        Sim, quero um(a) expert para me dar feedback!
      </b-checkbox> -->
      <br />
      <br />
      <h2 class="subtitle is-4">🧩Escolha os aspectos de seu feedback</h2>
      <br />

      A seguir vamos estruturar seu pedido de feedback para que você receba
      respostas específicas e claras para sua situação. <br />
      <br />
      <drop-list :items="feedFuture.feedbackitems" @reorder="$event.apply(feedFuture.feedbackitems)">
        <template v-slot:item="{ item }">
          <drag class="item" :key="item.id">
            <b-collapse
              class="card"
              animation="slide"
              :open="isOpen == feedFuture.feedbackitems.indexOf(item)"
              @open="isOpen = feedFuture.feedbackitems.indexOf(item)"
            >
              <template #trigger="props">
                <div class="card-header" role="button">
                  <p class="card-header-title">
                    {{ item.questionTitle }}
                  </p>
                  <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                    <b-button type="is-danger" @click="remove(item)"
                      ><b-icon icon="close" /></b-button
                    >&nbsp;&nbsp;
                  </a>
                </div>
              </template>
              <div class="card-content">
                <div class="content">
                  <item-editor
                    v-if="isOpen == feedFuture.feedbackitems.indexOf(item)"
                    v-model="feedFuture.feedbackitems[feedFuture.feedbackitems.indexOf(item)]"
                  />
                </div>
              </div>
            </b-collapse>
          </drag>
        </template>
      </drop-list>

      <b-button @click="addNew()" size="is-large"
        ><b-icon icon="plus"
      /></b-button>
      <br /><br />
      <b-button type="is-info"  @click="save()">Salvar como Modelo</b-button>
      <!-- <b-button type="is-default"  @click="saveCopy()">Salvar como Cópia</b-button> -->
      <b-button type="is-warning">Iniciar Pedido de Feedback</b-button>
    </div>
  </layout-default>
</template>

<script>
import firebase from "firebase";
import { Drag, Drop, DropMask, DropList } from "vue-easy-dnd";
import ItemEditor from "../../components/FeedFuture/ItemEditor.vue";
export default {
  data() {
    return {
      isOpen: null,
      feedFuture: {
      title: null,
      description: null,
      isPublicTemplate: false,
      oneFeedbackPerUser: false,
      //publicForExperts: false,
      feedbackitems: [],},
      // selected: null,
    };
  },
  components: { ItemEditor, Drag, Drop, DropMask, DropList },
  
  mounted() {
    this.loadFeedFuture();
  },

  methods: {
    // select(item) {
    //   this.selected = item;
    // },
     
    loadFeedFuture() {
      var thisVM = this;

      if (this.$route.params.IdFeedFuture !== undefined) {
        this.feedFuture.id = this.$route.params.IdFeedFuture;
        var feedFutureRef = firebase.database().ref(`FeedFutureTemplates/${this.feedFuture.id}`);
        thisVM.$store.commit("startLoading");
        feedFutureRef.on("value", function (snapshot) {
          thisVM.$buefy.toast.open(`Olha seu Pedido de Feedback aí!`);

          thisVM.feedFuture = snapshot.val();
        
          thisVM.$store.commit("stopLoading");
          //thisVM.$root.stopLoading();
        });
      } else {
        this.feedFuture.id = firebase.database().ref().child(`/FeedFutureTemplates`).push().key;
      }
    },
    save()
    {
       var thisVM = this;
      this.feedFuture.CreatedByUserId = this.$store.state.currentUser.uid;
      firebase
        .database()
        .ref(`/FeedFutureTemplates/${this.feedFuture.id}`)
        .update(this.feedFuture)
        .then(function () {
          thisVM.$buefy.dialog.alert({
            message: `Seu modelo de pedido de Feedback foi salvo com sucesso`,
            onConfirm: () => {},
          });
        });


//FeedFutureTemplates
    },
    addNew() {
      var id = this.feedFuture.feedbackitems.length + 1;
      this.feedFuture.feedbackitems.push({
        id: id,
        questionDescription: "",
        questionTitle: `Item ${id}`,
        options: [],
        isMandatory: false,
      });
    },
    remove(fbi) {
      this.feedFuture.feedbackitems.splice(this.feedFuture.feedbackitems.indexOf(fbi), 1);
    },
  },
};
</script>