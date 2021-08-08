<template>
  <layout-default>
    <b-table
      style="background-color: #fff"
      :data="users"
      :bordered="false"
      :striped="false"
      :narrowed="true"
      :hoverable="true"
      :loading="$store.state.isLoading"
      :focusable="false"
      :mobile-cards="false"
    >
    
      <b-table-column field="Name" label="Name" v-slot="props">
        {{ props.row.Name }}
      </b-table-column>
      <b-table-column field="Email" label="Email" v-slot="props">
        {{ props.row.Email }}
      </b-table-column>
    </b-table>
  </layout-default>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return { users: [] };
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    clearUsers() {
      this.users.splice(0, this.users.length);
    },
    loadUsers() {
      var thisVM = this;
      var usersRef = firebase.database().ref(`Users`);
      thisVM.$store.commit("startLoading");
      usersRef.on("value", function (snapshot) {
        thisVM.clearUsers();

        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            thisVM.users.push({
              id: childSnapshot.key,
              Name: childData.displayName,
              Email: childData.email,
            });
          }
        });
        thisVM.$buefy.toast.open(`Usuários carregados`);

        thisVM.$store.commit("stopLoading");
      });
    },
  },
};
</script>