<template>
  <nav class="breadcrumb box" aria-label="breadcrumbs">   
    <ul><li>
       <router-link :to="{ name: 'Home'}"> 
      <b-icon
                icon="crosshairs-gps" >
            </b-icon></router-link></li>
      <li v-for="(breadcrumb, idx) in breadcrumbList" :key="idx">
        <router-link :to="{ name: breadcrumb.link}">{{ breadcrumb.name }}</router-link>
      </li>
      <li>
        <a aria-current="page">{{this.$route.meta.friendlyName ? this.$route.meta.friendlyName : this.$route.name  }}</a>
      </li>
    </ul>
  </nav>
</template> 

<script>
export default {
  name: "Breadcrumbs",
  data() {
    return {
      breadcrumbList: []
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    }
  },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link)
        this.$router.push(this.breadcrumbList[pRouteTo].link);
    },
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    }
  }
};
</script>

<style scoped>
</style>