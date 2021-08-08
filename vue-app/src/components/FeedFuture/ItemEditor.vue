<template>
  <div>
    <b-message title="Descreva o Item de Feedback" :closable="false">
      <b-tabs>
        <b-tab-item label="Edição" icon="pencil">
          <b-field label="Título do Item de Feedback">
            <b-input
              v-model="feedbackItem.questionTitle"
              placeholder=""
            ></b-input>
          </b-field>
          <b-field label="Descrição do Item de Feedback">
            <b-input
              v-model="feedbackItem.questionDescription"
              placeholder=""
            ></b-input> </b-field
          ><b-field label="Tipo de Item de Feedback">
            <b-select
              placeholder="Selecione o Tipo de Item"
              expanded
              v-model="selectedType"
              ><option :value="null"></option>
              <option
                v-for="type in types"
                v-bind:key="type.type"
                :value="type"
              >
                {{ type.label }}
              </option>
            </b-select>
          </b-field>
          <b-field label="Item Obrigatório?">
            <b-checkbox v-model="feedbackItem.isMandatory">
              Sim, este item é de respota obrigatória
            </b-checkbox>
          </b-field>

          <div v-if="selectedType != null && selectedType.allowsOptions">
            <b-field label="Opções para escolha">
              <b-input
                v-model="newOptionText"
                expanded
                placeholder="Pense em algo que você pode quantificar o progresso (ex.: três reuniões com o time) "
              ></b-input>
            </b-field>

            <b-button type="is-primary" @click="addOption"
              >Adicionar Opção</b-button
            >
            <div>
              <br />
              <h2 class="subtitle is-4">Opções</h2>
              Arraste para reordenar.
              <br />
              <drop-list
                :items="feedbackItem.options"
                @reorder="$event.apply(feedbackItem.options)"
              >
                <template v-slot:item="{ item }">
                  <drag class="item" :key="item">
                    <b-tag
                      style="min-width: 100px"
                      type="is-success"
                      size="is-medium"
                      closable
                      closeType="is-danger"
                      attached
                      aria-close-label="Close tag"
                      @close="deleteOption(option)"
                    >
                      {{ item }}
                    </b-tag>
                  </drag>
                </template>
                <template v-slot:feedback="{ data }">
                  <div
                    style="font-size: 72px; background-color: #ff0000"
                    :key="data"
                  >
                    <b-button
                      size="is-small"
                      type="is-danger"
                      @click="deleteOption(option)"
                      title="Remover Opção"
                    >
                      <b-icon icon="close" size="is-small" />
                    </b-button>
                    {{ data }}
                  </div>
                </template>
              </drop-list>

              <b-button type="is-primary" @click="resetToDefaultOptions"
                >Redefinir opções para o padrão</b-button
              >
            </div>
          </div> </b-tab-item
        ><b-tab-item label="Visualização" icon="eye">
          <b-field label="Visualização">
            <generic-item
              v-if="feedbackItem && feedbackItem.type"
              :options="feedbackItem.options"
              :type="feedbackItem.type"
              :questionTitle="feedbackItem.questionTitle"
              :questionDescription="feedbackItem.questionDescription"
            />
            <div v-if="!selectedType">
              NENHUM TIPO DE ITEM DE FEEDBACK SELECIONADO
            </div>
          </b-field>
        </b-tab-item>
      </b-tabs>
    </b-message>
  </div>
</template>

<style lang="scss">
html,
body,
#app,
.v-application--wrap,
.v-content,
.v-content__wrap {
  height: 100%;
}

.drop-in {
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.3);
}
</style>

<style scoped lang="scss">
.wrapper {
  .list {
    border: 1px solid black;
    margin: 100px auto;
    width: 200px;

    .item {
      padding: 20px;
      margin: 10px;
      background-color: rgb(220, 220, 255);
      display: flex;
      align-items: center;
      justify-content: center;

      &.feedback {
        background-color: rgb(255, 220, 220);
        border: 2px dashed black;
      }

      &.drag-image {
        background-color: rgb(220, 255, 220);
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>

<script>
import GenericItem from "./GenericItem.vue";
import { Drag, Drop, DropMask, DropList } from "vue-easy-dnd";

export default {
  components: { GenericItem, Drag, Drop, DropMask, DropList },
  props: {
    value: null,
    hasFocus: { type: Boolean, default: false },
  },
  data() {
    return {
      feedbackItem: this.value,
      selectedType: null,
      newOptionText: null,
      areDefaultOptionsSelected: true,

      types: [
        {
          type: "NPS",
          label: "Net Promoter Score",
          allowsOptions: true,
          defaultOptions: ["🤮", "2", "3", "4", "😐", "6", "7", "8", "9", "🚀"],
        },
        { type: "Johari", label: "Janela de Johari", allowsOptions: false },
        { type: "Stars", label: "Classificação", allowsOptions: false },
        { type: "Label", label: "Texto informativo", allowsOptions: false },
        { type: "Image", label: "Imagem", allowsOptions: false },
        {
          type: "Radio",
          label: "Alternativas",
          allowsOptions: true,
          defaultOptions: ["👍 Sim", "👎 Não", "🤷‍♀😐 Talvez"],
        },
        { type: "OpenText", label: "Texto Livre", allowsOptions: false },
        { type: "Email", label: "e-Mail", allowsOptions: false },
      ],
    };
  },
  watch: {
    questionTitle() {
      this.feedbackItem.questionTitle = this.questionTitle;
    },
    questionDescription() {
      this.feedbackItem.questionDescription = this.questionDescription;
    },
    options() {
      this.feedbackItem.options = this.selectedType.options;
      this.$emit("input", this.feedbackItem);
    },
    selectedType() {
      if (
        this.areDefaultOptionsSelected &
        (this.selectedType.defaultOptions != null)
      ) {
        this.resetToDefaultOptions();
      }
      this.feedbackItem.type = this.selectedType.type;

      this.$emit("input", this.feedbackItem);
    },

    feedbackItem() {
      this.$emit("input", this.feedbackItem);
    },
  },
  methods: {
    // triggerValueChanged() {
    //   this.$emit("input", this.feedbackItem);
    // },
    resetToDefaultOptions() {
      this.feedbackItem.options.splice(0, this.feedbackItem.options.length);
      this.selectedType.defaultOptions.forEach((element) => {
        this.feedbackItem.options.push(element);
      });
      this.areDefaultOptionsSelected = true;
    },
    deleteOption(option) {
      this.feedbackItem.options.splice(this.options.indexOf(option), 1);
      this.areDefaultOptionsSelected = false;
    },
    addOption() {
      var thisVM = this;
      if (thisVM.newOptionText != "") {
        this.feedbackItem.options.push(thisVM.newOptionText);
        this.areDefaultOptionsSelected = false;
      }
    },
  },
};
</script>