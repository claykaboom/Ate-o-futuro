<template>
    <div>
        <h1 class="title is-4">{{questionTitle}}</h1>
        <b-message v-if="questionDescription">{{questionDescription}}</b-message> 
    </div>
</template>


<script>
export default {
  props: {
    options: {
      type: Array,
      default: function () {
        return [ ];
      },
    },
    questionTitle: {
      type: String,
      default:
        "Sem título",
    },
    questionDescription: {
      type: String,
      default:
        null,
    }, 
    referenceURL: {
      type: String,
      default:null,
    }, 
  },
  data() {
    return { value: null };
  }, 
};
</script>