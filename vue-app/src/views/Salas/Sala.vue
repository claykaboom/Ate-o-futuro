<template>
  <layout-default>
    <vue-headful
      :title="`Até o Futuro - Sala de cocriação ${RoomInfo.Name}`"
      description="Até o Futuro"
    />
    <!-- <b-sidebar
      mobile="hidden"
      type="is-light"
      open
      :reduce="true"
      :expand-on-hover="true"
    >
      <div class="p-1">
        <div class="block">
          <img
            src="~@/assets/Logo.gif"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </div>
        <b-menu class="is-custom-mobile">
          <b-menu-list label="Menu">
            <b-menu-item icon="information-outline" label="Info"></b-menu-item>
            <b-menu-item active expanded icon="settings" label="Administrator">
              <b-menu-item icon="account" label="Users"></b-menu-item>
              <b-menu-item icon="cellphone-link" label="Devices"></b-menu-item>
              <b-menu-item
                icon="cash-multiple"
                label="Payments"
                disabled
              ></b-menu-item>
            </b-menu-item>
            <b-menu-item icon="account" label="My Account">
              <b-menu-item
                icon="account-box"
                label="Account data"
              ></b-menu-item>
              <b-menu-item icon="home-account" label="Addresses"></b-menu-item>
            </b-menu-item>
          </b-menu-list>
          <b-menu-list>
            <b-menu-item label="Expo" icon="link"></b-menu-item>
          </b-menu-list>
          <b-menu-list label="Actions">
            <b-menu-item icon="logout" label="Logout"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar> -->
    <div class="box">
      <div class="container">
        <div class="notification is-primary">
          <h1 class="title">🧪 Sala "{{ RoomInfo.Name }}"</h1>
          {{ RoomInfo.Description }}
        </div>
      </div>
      <br />
      <article class="panel is-default">
        <p class="panel-heading">Na sala agora</p>
        <div class="panel-block">
          <div
            style="border: 1px solid #ccc"
            v-for="member in membersInTheRoom"
            v-bind:key="member.userId"
          >
            <b-icon icon="account" size="is-small" type="is-primary"> </b-icon>
            {{ member.userName }}
            <div
              style="color: #00ee15; font-weight: bold"
              v-if="member.status != null && member.status == 'online'"
            >
              <b-icon icon="circle" size="is-small" type="is-success"> </b-icon>
              ONLINE
            </div>
            <div style="color: #bbcc00; font-weight: bold" v-else>
              <b-icon icon="circle" size="is-small" type="is-warning"> </b-icon>
              OBSERVANDO
            </div>
          </div>
        </div>
      </article>
      <div class="columns">
        <!-- <div class="column is-1"></div> -->
        <div class="column is-12">
          <!-- <drawable-canvas
                v-on:drawing-finished="sendImage"
                :desenho="desenho"
              />  -->
          <div class="columns" v-if="!IsOwner">
            <div class="column is-12">
              <co-creation-item
                v-for="item in cocreationItems"
                v-bind:key="item.id"
                v-on:input="addCoCreationItem(item)"
                :active="item.active"
                :editMode="IsOwner"
                :type="item.type"
                v-model="cocreationItems[cocreationItems.indexOf(item)]"
              />
            </div>
          </div>
          <div class="columns" v-if="IsOwner">
            <div class="column is-12">
              <drop-list
                :items="cocreationItems"
                @reorder="$event.apply(cocreationItems)"
              >
                <template v-slot:item="{ item }">
                  <drag class="item" :key="item.id">
                    <div
                      class="content box is-fullwidth"
                      v-bind:class="{
                        notification: item.active,
                        'is-success': item.active,
                      }"
                    >
                      <b-button
                        class="is-success"
                        v-if="IsOwner"
                        @click="setActive(item)"
                        :disabled="item.active || !item.saved"
                        >Ativar
                        {{ !item.saved ? "(necessário salvar)" : "" }}</b-button
                      >
                      <b-button
                        v-if="IsOwner"
                        type="is-danger"
                        @click="remove(item)"
                        ><b-icon icon="close"
                      /></b-button>
                      <co-creation-item
                        v-on:input="addCoCreationItem(item)"
                        :active="item.active"
                        :editMode="IsOwner"
                        :type="item.type"
                        v-model="cocreationItems[cocreationItems.indexOf(item)]"
                      />
                    </div>
                  </drag>
                </template>
              </drop-list>
              <b-button v-if="IsOwner" @click="addNew()" size="is-large"
                ><b-icon icon="plus"
              /></b-button>
            </div>
          </div>

          <div class="columns">
            <div class="column is-3">
              <b-input v-model="showMessage" type="textarea" />
              <b-button
                class="is-success"
                @click="sendMessage"
                :disabled="showMessage == null || showMessage == ''"
                >Enviar</b-button
              >
            </div>
            <div class="column is-9">
              <article class="panel is-info">
                <p class="panel-heading">Mensagens</p>
                <div class="panel-block">
                  <ScrollPanel style="height: 200px">
                    <p v-for="message in messages" :key="message.id">
                      <span>
                        <b>
                          <b-icon icon="account"></b-icon>
                          <span
                            >{{ message.username }} |
                            {{
                              message.DateTime | moment("DD/MM/YYYY HH:mm")
                            }}</span
                          ><br
                        /></b>
                      </span>
                      <span>{{ message.text }}</span>
                    </p>
                  </ScrollPanel>
                </div>
              </article>
            </div>

            <!-- <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      src="https://bulma.io/images/placeholders/1280x960.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src="https://bulma.io/images/placeholders/96x96.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">John Smith</p>
                      <p class="subtitle is-6">@johnsmith</p>
                    </div>
                  </div>

                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br />
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                  </div>
                </div>
              </div> -->
          </div>
        </div>
      </div>
    </div>
  </layout-default>
</template> 
<script>
import { DateTime } from "luxon";
import firebase from "firebase";
import ScrollPanel from "primevue/scrollpanel";
import DrawableCanvas from "../../components/Drawable/DrawableCanvas";
import CoCreationItem from "../../components/CoCreation/CoCreationItem";
import { Drag, Drop, DropMask, DropList } from "vue-easy-dnd";

export default {
  components: {
    ScrollPanel,
    DrawableCanvas,
    CoCreationItem,
    Drag,
    Drop,
    DropMask,
    DropList,
  },

  data() {
    return {
      isOpen: null,
      expandOnHover: false,
      expandWithDelay: false,
      desenho: null,
      mobile: "reduce",
      reduce: false,
      Members: [],
      Owners: [],
      RoomId: null,
      messages: [],
      cocreationItems: [],
      showMessage: "",
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      RoomInfo: { Name: "" },
    };
  },
  mounted() {
    this.carregarSala();
    this.registrarNaSala("online");
    this.loadMessages();
    this.loadCoCreationItems();
    this.loadOwners();
    this.idleLogout();
  },
  computed: {
    membersInTheRoom() {
      var thisVM = this;
      return thisVM.Members.filter((item) => {
        let overallActivityMinutes =
          DateTime.now().diff(DateTime.fromISO(item.lastOnline)).milliseconds /
          1000 /
          60;

        //   .duration(
        //     moment(new Date(), "YYYY-MM-DD HH:mm:ss.SS Z").diff(
        //       moment(item.lastOnline, "YYYY-MM-DD HH:mm:ss.SS Z")
        //     )
        //   )
        //   .asMinutes();
        return overallActivityMinutes > 5 ? false : true;
      });

      //DateTime.fromISO( // import luxon
    },
    IsOwner() {
      var thisVM = this;
      return (
        thisVM.Owners.filter((el) => {
          return el.userId == thisVM.$store.state.currentUser.uid;
        }).length > 0
      );
    },
  },
  methods: {
    addNew() {
      var thisVM = this;
      var order = this.cocreationItems.length + 1;
      var id = firebase
        .database()
        .ref()
        .child(`/PublicRooms/${thisVM.RoomId}/CoCreationItems`)
        .push().key;

      this.cocreationItems.push({
        id: id,
        order: order,
        username: thisVM.$store.state.currentUser.displayName,
        DateTime: firebase.firestore.Timestamp.fromMillis(Date.now()),
        questionDescription: "",
        options: [],
        isMandatory: false,
        saved: false,
        active: false,
        details: {
          id: order,
          questionDescription: "",
          questionTitle: `Item ${order}`,
          options: [],
          isMandatory: false,
        },
        type: "feedback",
      });
    },
    remove(fbi) {
      var thisVM = this;
      firebase
        .database()
        .ref(`/PublicRooms/${thisVM.RoomId}/CoCreationItems/${fbi.id}`)
        .remove();

      //  this.cocreationItems.splice(this.cocreationItems.indexOf(fbi), 1);
    },
    setActive(item) {
      var thisVM = this;

      thisVM.cocreationItems.forEach((element) => {
        var valueToRecord = {
          active: element.id == item.id,
        };
        firebase
          .database()
          .ref(`/PublicRooms/${thisVM.RoomId}/CoCreationItems/${element.id}`)
          .update(valueToRecord)
          .then(function () {
            //   thisVM.$store.commit("stopLoading");
          });
      });
    },
    sendImage: async function (base64EncodedImage) {
      var thisVM = this;

      var valueToRecord = {
        userName: thisVM.$store.state.currentUser.displayName,
        drawing: base64EncodedImage,
      };

      // thisVM.$store.commit("startLoading");
      firebase
        .database()
        .ref(`/PublicRooms/${thisVM.RoomId}/Board`)
        .update(valueToRecord)
        .then(function () {
          //   thisVM.$store.commit("stopLoading");
        });

      // await this.client.sendImage(base64EncodedImage);
    },
    clearMembers() {
      var thisVM = this;
      thisVM.Members.splice(0, this.Members.length);
    },
    carregarSala() {
      var thisVM = this;
      thisVM.RoomId = thisVM.$route.params.RoomId;

      var MembersRef = firebase
        .database()
        .ref(`PublicRooms/${thisVM.RoomId}/Members`);

      var RoomInfoRef = firebase
        .database()
        .ref(`PublicRooms/${thisVM.RoomId}/RoomInfo`);

      var BoardRef = firebase
        .database()
        .ref(`PublicRooms/${thisVM.RoomId}/Board`);

      //  thisVM.$store.commit("startLoading");
      //   initiativeRef.on("value", function (snapshot) {
      //     thisVM.$buefy.toast.open(`Iniciativa terminou de carregar!`);

      //     thisVM.initiative = snapshot.val();

      //     if (thisVM.initiative.startDate != null) {
      //       thisVM.initiative.startDate = firebase.firestore.Timestamp.fromMillis(
      //         thisVM.initiative.startDate.seconds * 1000
      //       ).toDate();
      //     }
      //     if (thisVM.initiative.endDate != null) {
      //       thisVM.initiative.endDate = firebase.firestore.Timestamp.fromMillis(
      //         thisVM.initiative.endDate.seconds * 1000
      //       ).toDate();
      //     }
      //     thisVM.$store.commit("stopLoading");
      //     //thisVM.$root.stopLoading();
      //   });

      //   thisVM.$store.commit("startLoading");
      //   initiativeSupportersRef.on("value", function (snapshot) {
      //     thisVM.$buefy.toast.open(`Seja visionário(a) e clique em "suportar"!`);
      //     thisVM.supporters =
      //       snapshot.val() && snapshot.val()._count ? snapshot.val()._count : 0;

      //     thisVM.$store.commit("stopLoading");
      //     //thisVM.$root.stopLoading();
      //   });

      thisVM.$store.commit("startLoading");
      MembersRef.on("value", function (snapshot) {
        thisVM.clearMembers();
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (childSnapshot.key != "_count") {
            thisVM.Members.push({
              userId: childSnapshot.key,
              userName: childData.userName,
              status: childData.status,
              lastOnline: childData.lastOnline,
              // text: childData.text,
            });
          }
        });
        //thisVM.$buefy.toast.open(`Bienvenue!`);

        thisVM.$store.commit("stopLoading");

        //thisVM.$root.stopLoading();
      });

      thisVM.$store.commit("startLoading");
      RoomInfoRef.on("value", function (snapshot) {
        thisVM.RoomInfo = snapshot.val();
        thisVM.$buefy.toast.open(`Bienvenue!`);

        thisVM.$store.commit("stopLoading");

        //thisVM.$root.stopLoading();
      });
      thisVM.$store.commit("startLoading");
      BoardRef.on("value", function (snapshot) {
        thisVM.desenho = snapshot.val().drawing;

        thisVM.$store.commit("stopLoading");

        //thisVM.$root.stopLoading();
      });
    },
    loadOwners() {
      var thisVM = this;

      var OwnersRef = firebase
        .database()
        .ref(`PublicRooms/${thisVM.RoomId}/Owners`);

      thisVM.$store.commit("startLoading");
      OwnersRef.on("value", function (snapshot) {
        thisVM.Owners.splice(0, thisVM.Owners.length);
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (childSnapshot.key != "_count") {
            thisVM.Owners.push({
              userId: childSnapshot.key,
              Role: childData.Role,
              UserName: childData.UserName,
              MadeOwnerBy: childData.MadeOwnerBy,
              // text: childData.text,
            });
          }
        });
        //thisVM.$buefy.toast.open(`Bienvenue!`);

        thisVM.$store.commit("stopLoading");

        //thisVM.$root.stopLoading();
      });
    },

    registrarNaSala(status) {
      var thisVM = this;

      var valueToRecord = {
        userName: thisVM.$store.state.currentUser.displayName,
        status: status,
      };
      if (status == "online") {
        valueToRecord.lastOnline = new Date();
      }
      // thisVM.$store.commit("startLoading");
      firebase
        .database()
        .ref(
          `/PublicRooms/${thisVM.RoomId}/Members/${thisVM.$store.state.currentUser.uid}`
        )
        .update(valueToRecord)
        .then(function () {
          //   thisVM.$store.commit("stopLoading");
        });
    },
    loadMessages() {
      let thisVM = this;
      const itemsRef = firebase
        .database()
        .ref(`/PublicRooms/${thisVM.RoomId}/messages`);
      itemsRef.on("value", (snapshot) => {
        let data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            text: data[key].text,
            DateTime: firebase.firestore.Timestamp.fromMillis(
              data[key].DateTime.seconds * 1000
            ).toDate(),
          });
        });
        thisVM.messages = messages.reverse();
        var audio = new Audio(require("../../assets/sounds/notification.mp3")); // path to file
        audio.play();
      });
    },
    sendMessage() {
      var thisVM = this;
      const message = {
        text: this.showMessage,
        username: thisVM.$store.state.currentUser.displayName,
        DateTime: firebase.firestore.Timestamp.fromMillis(Date.now()),
      };
      console.log(message);
      firebase
        .database()
        .ref(`/PublicRooms/${thisVM.RoomId}/messages`)
        .push(message);
      this.showMessage = "";
    },

    loadCoCreationItems() {
      let thisVM = this;
      const itemsRef = firebase
        .database()
        .ref(`/PublicRooms/${thisVM.RoomId}/CoCreationItems`);
      itemsRef.on("value", (snapshot) => {
        let data = snapshot.val();
        thisVM.cocreationItems.splice(0, thisVM.cocreationItems.length);
        if (data != null) {
          Object.keys(data).forEach((key) => {
            thisVM.cocreationItems.push({
              id: key,
              username: data[key].username,
              type: data[key].type,
              active: data[key].active,
              saved: data[key].saved,
              details: data[key].details,
              text: data[key].text,
              DateTime: firebase.firestore.Timestamp.fromMillis(
                data[key].DateTime.seconds * 1000
              ).toDate(),
            });
          });
          // thisVM.cocreationItems = items; //.reverse();
          // var audio = new Audio(require("../../assets/sounds/notification.mp3")); // path to file
          // audio.play();
        }
      });
    },
    addCoCreationItem(item) {
      
      var thisVM = this;
      item.saved = true;
      if (item.id == null) {
        // console.log(message);
        firebase
          .database()
          .ref(`/PublicRooms/${thisVM.RoomId}/CoCreationItems`)
          .push(item);
      } else {
        firebase
          .database()
          .ref(`/PublicRooms/${thisVM.RoomId}/CoCreationItems/${item.id}`)
          .update(item)
          .then(function () {
            //   thisVM.$store.commit("stopLoading");
          });
      }
    },

    idleLogout() {
      var t;
      var thisVM = this;
      window.onload = resetTimer;
      window.onmousemove = resetTimer;
      window.onmousedown = resetTimer; // catches touchscreen presses as well
      window.ontouchstart = resetTimer; // catches touchscreen swipes as well
      window.onclick = resetTimer; // catches touchpad clicks as well
      window.onkeydown = resetTimer;
      window.addEventListener("scroll", resetTimer, true); // improved; see comments

      function setAway() {
        thisVM.registrarNaSala("away");
      }

      function resetTimer() {
        thisVM.registrarNaSala("online");
        clearTimeout(t);
        t = setTimeout(setAway, 60000); // time is in milliseconds
      }
    },

    // sendMessage(text) {
    //   if (text.length > 0) {
    //     this.newMessagesCount = this.isChatOpen
    //       ? this.newMessagesCount
    //       : this.newMessagesCount + 1;
    //     this.onMessageWasSent({
    //       author: "support",
    //       type: "text",
    //       data: { text },
    //     });
    //   }
    // },
    // onMessageWasSent(message) {
    //   // called when the user sends a message
    //   this.messageList = [...this.messageList, message];
    // },
    // openChat() {
    //   // called when the user clicks on the fab button to open the chat
    //   this.isChatOpen = true;
    //   this.newMessagesCount = 0;
    // },
    // closeChat() {
    //   // called when the user clicks on the botton to close the chat
    //   this.isChatOpen = false;
    // },
    // handleScrollToTop() {
    //   // called when the user scrolls message list to top
    //   // leverage pagination for loading another page of messages
    // },
    // handleOnType() {
    //   console.log("Emit typing event");
    // },
    // editMessage(message) {
    //   const m = this.messageList.find((m) => m.id === message.id);
    //   m.isEdited = true;
    //   m.data.text = message.data.text;
    // },
  },
};
</script>