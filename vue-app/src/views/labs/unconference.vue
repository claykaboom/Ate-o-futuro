<template>
  <empty-layout>
    <vue-headful :title="`Até o Futuro - sennder`" description="Até o Futuro" />
    <div class="box" v-if="unconference">
      <img src="~@/assets/sennder/banner.png" />

      <h1 class="title is-4" style="color: #ff8300">{{ unconference.name }}</h1>
      <div class="columns is-centered" v-if="!isPostingTopic">
        <div class="column is-4">
          <br /><b-button type="is-success" size="is-large" @click="postTopic()"
            >⚡ Post or request a topic</b-button
          >
        </div>
      </div>

      <div class="columns" v-if="isPostingTopic">
        <div class="column is-12">
          <b-field label="Description">
            <vue-editor v-model="newTopicDescription"></vue-editor>
          </b-field>
          <b-field
            label="How do you want your name/team's name to be displayed"
          >
            <b-input v-model="newTopicPresenterName"></b-input>
          </b-field>
          <b-field>
            <b-switch v-model="newTopicIsPresenter">
              I would like to present this topic
            </b-switch>
          </b-field>
          <b-field>
            <b-switch v-model="newTopicLooksForPartner" type="is-info">
              I am searching someone to present it with me
            </b-switch>
          </b-field>
          <b-field>
            <b-switch v-model="newTopicIsAudience" disabled type="is-warning">
              I would like to attend to this topic
            </b-switch>
          </b-field>
        </div>
        <b-button type="is-success" size="is-large" @click="insertTopic()"
          >⚡ Post!</b-button
        >
      </div>

      <div
        v-for="(topic, idx) in orderedTopics"
        :key="idx"
        class="box"
        style="background-color: #c8c8c8"
      >
        <div class="columns">
          <div class="column is-12">
            <div
              class="card"
              v-if="
                topic.lookForPartner ||
                topic.prospectiveAudience ||
                !topic.pinned
              "
            >
              <footer class="card-footer">
                <a
                  class="card-footer-item"
                  v-if="!topic.pinned"
                  style="cursor: pointer"
                  v-bind:class="{
                    'animate__animated animate__rubberBand animate__faster':
                      loadingSupport == topic.id,
                    'is-info': notLiked(topic.id),
                  }"
                  @click="support(topic.id)"
                  ><b-icon
                    icon="thumb-up"
                    :type="notLiked(topic.id) ? 'is-success' : 'is-info'"
                  />

                  <span
                    v-if="
                      topic.supporters != null &&
                      Object.keys(topic.supporters).length > 0
                    "
                    >&nbsp;&nbsp; &nbsp;
                    {{ Object.keys(topic.supporters).length }}
                    {{
                      Object.keys(topic.supporters).length > 1
                        ? "senndies "
                        : "senndie"
                    }}
                    attending
                  </span>
                  <span
                    v-if="
                      topic.supporters == null ||
                      Object.keys(topic.supporters).length == 0
                    "
                  >
                    Support!
                  </span></a
                >
                <a class="card-footer-item" v-if="topic.lookForPartner">
                  🦸‍♂️ Partner Up 🦸‍♀️</a
                >
                <a class="card-footer-item" v-if="topic.prospectiveAudience">
                  📢 Volunteer To Speak</a
                >
              </footer>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <img
              :src="`https://avatars.dicebear.com/api/initials/${topic.userName}.svg`"
              style="width: 30px"
            />
            <b style="color: #000; font-size: 24px">
              {{ topic.presenterName? topic.presenterName : topic.userName}}
            </b>
          </div>
          <div class="column is-12">
            <div v-html="topic.description"></div>
          </div>
        </div>
      </div>
    </div>
  </empty-layout>
</template>

<script>
import { VueEditor } from "vue2-editor";
import firebase from "firebase";
import EmptyLayout from "../../layouts/EmptyLayout.vue";
export default {
  components: { EmptyLayout, VueEditor },
  data() {
    return {
      unconference: null,
      unconferenceId: null,
      loadingSupport: null,
      topics: [],
      isPostingTopic: false,
      newTopicDescription: "",
      newTopicPresenterName: "",
      newTopicIsPresenter: true,
      newTopicLooksForPartner: false,
    };
  },
  mounted() {
    this.loadUnconference();
    var thisVM = this;
    if (thisVM.$store.state.isLogged) {
      thisVM.newTopicPresenterName =
        thisVM.$store.state.currentUser.displayName;
    }

    if (thisVM.$route.query != null && thisVM.$route.query.postTopic != null) {
      thisVM.isPostingTopic = true;
    }
  },
  computed: {
    newTopicIsAudience() {
      return !this.newTopicIsPresenter;
    },

    orderedTopics() {
      var thisVM = this;

      var original = [];
      thisVM.topics.forEach((element) => {
        original.push(element);
      });
      return original.sort((a, b) => {
        var aSupporters = a.supporters ? Object.keys(a.supporters).length : 0;
        var bSupporters = b.supporters ? Object.keys(b.supporters).length : 0;

        if (a.pinned && !b.pinned) {
          return -1;
        } else if (!a.pinned && b.pinned) {
          return 1;
        } else {
          if (aSupporters > bSupporters) {
            return -1;
          } else {
            return 1;
          }
        }
      });
    },
  },
  methods: {
    insertTopic() {
      var topicId = firebase.database().ref().child(`/unconferences/${thisVM.unconferenceId}/topics/`).push()
        .key;
      var thisVM = this;
      if (thisVM.newTopicDescription != null && thisVM.newTopicDescription.length >10) {
        firebase
          .database()
          .ref(`/unconferences/${thisVM.unconferenceId}/topics/${topicId}`)
          .update({
            description: thisVM.newTopicDescription,
            lookForPartner: thisVM.newTopicLooksForPartner,
            proposedSpeaker: thisVM.newTopicIsPresenter,
            prospectiveAudience: thisVM.newTopicIsAudience,
            userId: thisVM.$store.state.currentUser.uid,
            userName: thisVM.$store.state.currentUser.displayName,
            presenterName: thisVM.newTopicPresenterName,
          })
          .then(function () {
            thisVM.newTopicDescription = null;
            thisVM.$buefy.dialog.alert({
              message: `Thanks for your contribution!`,
              onConfirm: () => {
                window.scrollTo(
                  0,
                  document.body.scrollHeight ||
                    document.documentElement.scrollHeight
                );
              },
            });
          });
      } else {
        this.$buefy.dialog.alert({
          message: "Please describe the topic for the unconference with more words",
          onConfirm: () => {
            
          },
        });
      }
    },
    notLiked(topicId) {
      var thisVM = this;
      if (thisVM.$store.state.isLogged) {
        var topic = thisVM.topics.find((tp) => {
          return tp.id == topicId;
        });
        if (
          topic != null &&
          topic != undefined &&
          topic.supporters != undefined &&
          topic.supporters != null
        ) {
          var foundElement = Object.keys(topic.supporters).find((sup) => {
            return thisVM.$store.state.currentUser.uid == sup;
          });
          return foundElement == null || foundElement == undefined;
        }
      }
      return true;
    },
    loadUnconference() {
      var thisVM = this;

      if (this.$route.params.unconferenceId !== undefined) {
        var unconferenceId = this.$route.params.unconferenceId;
        thisVM.unconferenceId = unconferenceId;
        var confRef = firebase
          .database()
          .ref(`unconferences/${unconferenceId}`)
          .orderByChild("pinned");
        thisVM.$store.commit("startLoading");
        confRef.on("value", function (snapshot) {
          thisVM.$buefy.toast.open(`unconference loaded`);

          thisVM.unconference = snapshot.val();
          thisVM.topics.splice(0, thisVM.topics.length);
          var keys = Object.keys(thisVM.unconference.topics);

          keys.forEach((element) => {
            var topic = thisVM.unconference.topics[element];
            topic.id = element;
            thisVM.topics.push(topic);
          });

          thisVM.$store.commit("stopLoading");
          //thisVM.$root.stopLoading();
        });
      }
    },
    postTopic() {
      var thisVM = this;
      if (thisVM.$store.state.isLogged) {
        thisVM.isPostingTopic = true;
      } else {
        this.$buefy.dialog.alert({
          message: "Please, login to support this topic",
          onConfirm: () => {
            thisVM.$router.push({
              name: "unconference",
              params: { unconferenceId: thisVM.unconferenceId },
              query: { postTopic: true },
            });
          },
        });
      }
    },
    support(topicId) {
      var thisVM = this;
      if (thisVM.$store.state.isLogged) {
        var valueToRecord = JSON.parse(
          `{"${thisVM.$store.state.currentUser.uid}":true}`
        );
        thisVM.loadingSupport = topicId;
        this.animated = true;
        var audio = new Audio(require("../../assets/sounds/like.mp3")); // path to file
        audio.volume = 0.05;
        audio.play();

        firebase
          .database()
          .ref(
            `/unconferences/${thisVM.unconferenceId}/topics/${topicId}/supporters`
          )
          .update(valueToRecord)
          .then(function () {
            thisVM.loadingSupport = null;
          });
      } else {
        this.$buefy.dialog.alert({
          message: "Please, login to support this topic",
          onConfirm: () => {
            thisVM.$router.push({
              name: "unconference",
              params: { unconferenceId: thisVM.unconferenceId },
            });
          },
        });
      }
    },
  },
};
</script>