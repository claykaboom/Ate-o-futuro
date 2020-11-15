<template>
  <layout-default>
    <vue-headful title="Até o Futuro - Nossos Experts" />
    <div class="box">
      <h1 class="title is-3">Até o Futuro - Conheça nossos Experts</h1>
      <contributors />
    </div>
  </layout-default>
</template>

<script>
import Contributors from "../components/Contributors";

export default {
  name: "Experts",
  components: { Contributors },
};
</script>  