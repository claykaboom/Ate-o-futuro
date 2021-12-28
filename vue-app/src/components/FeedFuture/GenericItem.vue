<template>
  <div> 
    <nav class="panel">
      <div>
        <p class="panel-heading" v-if="showPanelHeader">
          {{ questionTitle }}
        </p>
        <div class="  ">
          <!-- {{ type }} -->

          <nps-item
            v-if="type == 'NPS'"
            questionTitle=""
            questionDescription=""
            :referenceURL="referenceURL"
            :options="options"
          ></nps-item>
          <johari-item
            v-else-if="type == 'Johari'"
            questionTitle=""
            questionDescription=""
            :referenceURL="referenceURL"
            :options="options"
          ></johari-item>
          <rating-item
            v-else-if="type == 'Stars'"
            questionTitle=""
            :questionDescription="questionDescription"
            :referenceURL="referenceURL"
            :options="options"
          ></rating-item>
          <radio-item
            v-else-if="type == 'Radio'"
            questionTitle=""
            :questionDescription="questionDescription"
            :referenceURL="referenceURL"
            :options="options"
          ></radio-item>
          <text-box-item
            v-else-if="type == 'OpenText'"
            questionTitle=""
            :questionDescription="questionDescription"
            :referenceURL="referenceURL"
            :options="options"
          ></text-box-item>
          <email-item
            v-else-if="type == 'Email'"
            questionTitle=""
            :referenceURL="referenceURL"
            :questionDescription="questionDescription"
          ></email-item>
          <image-item
            v-else-if="type == 'Image'"
            :questionTitle="questionTitle"
            :referenceURL="referenceURL"
            :questionDescription="questionDescription"
          ></image-item>
          <label-item
            v-else-if="type == 'Label'"
            :questionTitle="questionTitle"
            :referenceURL="referenceURL"
            :questionDescription="questionDescription"
          ></label-item>
          <div v-else>{{ questionTitle }}</div>
        </div>
      </div>
    </nav>
    <br />
  </div>
</template>

<script>
import EmailItem from "./EmailItem.vue";
import NpsItem from "./nps-item.vue";
import RadioItem from "./RadioItem.vue";
import RatingItem from "./RatingItem.vue";
import TextBoxItem from "./TextBoxItem.vue";
import ImageItem from "./ImageItem.vue";
import LabelItem from "./LabelItem.vue";
import JohariItem from "./JohariItem.vue";

export default {
  props: {
    type: String,
    options: {
      type: Array,
    },
    questionTitle: {
      type: String,
      default:
        "Qual a probabilidade de você recomendar o Até o Futuro para outras pessoas que estão buscando ter a melhor versão de si no Futuro?",
    },
    questionDescription: {
      type: String,
      default: null,
    },
    referenceURL: {
      type: String,
      default: null,
    },
  },
  components: {
    NpsItem,
    RatingItem,
    RadioItem,
    TextBoxItem,
    EmailItem,
    ImageItem,
    LabelItem,JohariItem
  },
  computed: {
    showPanelHeader() {
      return this.type == "Label" ? false : true;
    },
  },
};
</script>