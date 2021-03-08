<template>
  <layout-default>
    <div class="box">
      <nav class="panel">
        <p class="panel-heading">Notificações</p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <b-input
              type="search"
              icon="magnify"
              placeholder="Buscar"
              v-model="searchText"
            />
          </p>
        </div>

        <b-tabs type="is-boxed">
          <b-tab-item label="Todas">
            <b-menu-list>
              <b-menu-item
                expanded
                :icon="notification.icon"
                @click="readAndNavigate(notification)"
                :active="!notification.read"
                :label="notification.title"
                v-for="notification in notificationsFilteredByText"
                v-bind:key="notification.id"
              >
                {{ notification.description }} -
                {{ notification.datetime | moment("DD/MM/YYYY") }}</b-menu-item
              >
            </b-menu-list>
          
          </b-tab-item>
          <b-tab-item label="Não Lidas">
                <b-menu-list>
              <b-menu-item
                expanded
                :icon="notification.icon"
                @click="readAndNavigate(notification)"
                :active="!notification.read"
                :label="notification.title"
                v-for="notification in notificationsUnread"
                v-bind:key="notification.id"
              >
                {{ notification.description }} -
                {{ notification.datetime | moment("DD/MM/YYYY") }}</b-menu-item
              >
            </b-menu-list>

 </b-tab-item
          >
          <b-tab-item label="Lidas">   <b-menu-list>
              <b-menu-item
                expanded
                :icon="notification.icon"
                @click="readAndNavigate(notification)"
                :active="!notification.read"
                :label="notification.title"
                v-for="notification in notificationsRead"
                v-bind:key="notification.id"
              >
                {{ notification.description }} -
                {{ notification.datetime | moment("DD/MM/YYYY") }}</b-menu-item
              >
            </b-menu-list>
            
          </b-tab-item>
        </b-tabs>
      </nav>
    </div>
  </layout-default>
</template>
<script>
import firebase from "firebase";
import LayoutDefault from "../layouts/LayoutDefault.vue";
export default {
  components: { LayoutDefault },

  data() {
    return {
      notifications: [],
      searchText: "",
    };
  },
  mounted() {
    this.setupData();
  },
  computed: {
    notificationsFilteredByText() {
      return this.notifications.filter((notification) => {
        return (
          notification.title
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          notification.description
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        );
      });
    },
    notificationsUnread() {
      return this.notificationsFilteredByText.filter((notification) => {
        return !notification.read;
      });
    },
    notificationsRead() {
      return this.notificationsFilteredByText.filter((notification) => {
        return notification.read;
      });
    },
  },
  methods: {
    readAndNavigate(notification) {
      var thisVM = this;
      firebase
        .database()
        .ref(
          `Users/${thisVM.$store.state.currentUser.uid}/Notifications/${notification.id}`
        )
        .update({ read: true });
      if (notification.link.toLowerCase().includes("http")) {
        window.location.href = notification.link;
      } else {
        thisVM.$router.push({
          name: notification.link,
          params: notification.params,
        });
      }
    },
    clearNotifications() {
      this.notifications.splice(0, this.notifications.length);
    },

    setupData() {
      var thisVM = this;
      var notificationsRef = firebase
        .database()
        .ref(`Users/${thisVM.$store.state.currentUser.uid}/Notifications`)
        .orderByChild("Data")
        .limitToLast(50);

      notificationsRef.on("value", function (snapshot) {
        thisVM.clearNotifications();
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            thisVM.notifications.splice(0, 0, {
              id: childSnapshot.key,
              read: childData.read,
              datetime: childData.Data ? new Date(childData.Data) : null,
              description: childData.description,
              title: childData.title,
              link: childData.link,
              params: childData.params,
              icon: childData.icon,
            });
          }
        });

        //thisVM.$root.stopLoading();
      });
    },
  },
};
</script>