<template>
  <div class="box">
    <div v-if="type == 'problema'">
      <h2 class="subtitle is-3">PROBLEMA:</h2>
      João quer comer pizza para matar a fome
    </div>
    <div v-else-if="type == 'mensagem'">
      <h2 class="subtitle is-3">msg:</h2>
      João quer comer pizza para matar a fome
    </div>
    <div v-else-if="type == 'question'">
      <h2 class="subtitle is-3">quest:</h2>
      João quer comer pizza para matar a fome
    </div>
    <div v-else-if="type == 'feedback'">
      <item-editor
        v-if="value.details != null && editMode"
        v-model="value.details"
        v-on:input="salvar()"
      />
      <generic-item
        v-if="value.details && value.details.type && !editMode"
        :options="value.details.options"
        :type="value.details.type"
        :questionTitle="value.details.questionTitle"
        :questionDescription="value.details.questionDescription"
      />

      <b-modal v-if="!editMode" v-model="_active" :width="640" scroll="keep">
        <generic-item
          v-if="value.details && value.details.type && !editMode"
          :options="value.details.options"
          :type="value.details.type"
          :questionTitle="value.details.questionTitle"
          :questionDescription="value.details.questionDescription"
        />

        
      </b-modal>
    </div>
    {{ saved }}
    <b-button v-if="editMode" :disabled="saved" @click="salvar"
      >Salvar</b-button
    >
    <span style="display: none">{{ _active }}</span>
  </div>
</template>
<script>
import ItemEditor from "../../components/FeedFuture/ItemEditor.vue";
import GenericItem from "../../components/FeedFuture/GenericItem.vue";

export default {
  components: { ItemEditor, GenericItem },
  props: {
    value: null,
    type: { type: String, default: "mensagem" },
    active: { type: Boolean, default: false },
    editMode: { type: Boolean, default: false },
  },
  data() {
    return { saved: false };
  },
  methods: {
    salvar() { 
      this.$emit("input", this.value);
    },
  },
  computed: {
    _active() {
      //esse metodo computado serve para disparar o modal no caso de a prop active mudar

    //   if (this.active != null && this.active) {
    //     this.$buefy.dialog.confirm({
    //       message: "Continue on this task?",
    //       onConfirm: () => this.$buefy.toast.open("User confirmed"),
    //     });
    //   }
      return this.active;
    },
  },
};
</script>