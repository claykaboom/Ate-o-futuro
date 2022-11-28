<template>
  <div>
    <!-- <b-loading
      :is-full-page="true"
      v-model="$store.state.isLoading"
    ></b-loading> -->
    <div v-if="!isProduction" style="background-color: red; color: #fff">
      <b>[DEBUGGER]</b> - LOADER COUNTER {{ $store.state.loadCounter }} / IS
      LOADING: {{ $store.state.isLoading }} / 👤 = {{ $store.state.isLogged }}
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  name: "empty-layout",
  data() {
    return {
      isProduction: process.env.NODE_ENV === "production",
      fullPage: true,
    };
  },
};
</script>