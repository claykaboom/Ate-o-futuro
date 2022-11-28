<template>
  <empty-layout>
    <div class="box">
      <h1 class="title is-2">
        Hey, {{ $store.state.currentUser.displayName }}, what would you rather
        learn?
      </h1>

      <div
        class="columns box"
        style="background-color: #c6ecae"
        v-if="player1 && player2"
      >
        <div
          class="column is-5"
          v-bind:class="{
            'has-background-primary animate__animated animate__tada ':
              winnerPlayer == player1,
            'animate__animated animate__fadeOutTopLeft': changedPlayer1,
          }"
          @click="winnerPlayer = player1"
        >
          <h2
            class="subtitle is-size-1 has-text-centered"
            v-bind:class="{ 'white-text': winnerPlayer == player1 }"
          >
            {{ player1.name }}
          </h2>
          <b-image
            :src="`https://source.unsplash.com/featured/?&${player1.name}`"
            :alt="player1.name"
            ratio="601by235"
          ></b-image>

          <!-- {{ player1 }} -->
        </div>
        <div class="column is-2">
          <h2 class="subtitle is-size-1 has-text-centered">OR</h2>
        </div>
        <div
          class="column is-5"
          v-bind:class="{
            'has-background-primary animate__animated animate__tada ':
              winnerPlayer == player2,
            'white-text': winnerPlayer == player2,
            'animate__animated animate__fadeOutTopLeft': changedPlayer2,
          }"
          @click="winnerPlayer = player2"
        >
          <h2
            class="subtitle is-size-1 has-text-centered"
            v-bind:class="{ 'white-text': winnerPlayer == player2 }"
          >
            {{ player2.name }}
          </h2>
          <b-image
            :src="`https://source.unsplash.com/featured/?&${player2.name}`"
            :alt="player2.name"
            ratio="601by235"
          ></b-image>
          <!-- {{ player2 }} -->
        </div>
      </div>
      <div class="columns" v-if="player1 && player2">
        <div class="column is-12 has-text-centered">
          <b-button
            type="is-success"
            size="is-large"
            class="is-fullwidth"
            @click="play()"
            >⚡ Select!</b-button
          >
        </div>
      </div>

      <h1 class="title is-2">
        Don't find a good contender skill? Suggest one!
      </h1>
      <div class="columns">
        <div class="column is-12">
          <b-field label="Skill">
            <b-input v-model="newSkillSuggested"></b-input>
          </b-field>
          <b-button type="is-success" size="is-large" @click="insertSkill()"
            >⚡ Post!</b-button
          >
        </div>
      </div>
    </div>
  </empty-layout>
</template>
<style>
.white-text {
  color: #fff;
}
</style>
<script>
import glicko2 from "glicko2";
import firebase from "firebase";
var settings = {
  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
  //      be tested to decide which value results in greatest predictive accuracy."
  tau: 0.5,
  // rating : default rating
  rating: 1500,
  //rd : Default rating deviation
  //     small number = good confidence on the rating accuracy
  rd: 200,
  //vol : Default volatility (expected fluctation on the player rating)
  vol: 0.06,
};
var ranking = new glicko2.Glicko2(settings);

// Create players

export default {
  data() {
    return {
      firstLoad: true,
      newSkillSuggested: null,
      contextId: null,
      player1: null,
      changedPlayer1: false,
      changedPlayer2: false,
      player2: null,
      winnerPlayer: null,
      players: [],
    };
  },
  mounted() {
    this.loadSkills();
  },
  watch: {},
  methods: {
    loadSkills() {
      var thisVM = this;

      if (this.$route.params.contextId !== undefined) {
        var contextId = this.$route.params.contextId;
        thisVM.contextId = contextId;
        var skillsRef = firebase
          .database()
          .ref(`skills-comparer/${contextId}/skills`);

        thisVM.players.splice(0, this.players.length);
        thisVM.$store.commit("startLoading");
        skillsRef.on("value", function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            //debugger;
            if (childSnapshot.key != "_count") {
              var player = {
                id: childSnapshot.key,

                name: childData.name,
                rating: childData.rating,
                rd: childData.rd,
                vol: childData.vol,
              };
              //refreshing data of currently selected players
              if (thisVM.player1 != null) {
                if (thisVM.player1.id == player.id) {
                  thisVM.player1 = player;
                }
              }
              //refreshing data of currently selected players
              if (thisVM.player2 != null) {
                if (thisVM.player2.id == player.id) {
                  thisVM.player2 = player;
                }
              }

              thisVM.players.push(player);
            }
          });

          if (thisVM.firstLoad) {
            thisVM.$buefy.toast.open(`skills: ready!`);
            thisVM.selectTwoPlayers();

            thisVM.firstLoad = false;
          }

          thisVM.$store.commit("stopLoading");
          //thisVM.$root.stopLoading();
        });
      }
    },
    getMultipleRandom(arr, num) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, num);
    },
    selectTwoPlayers() {
      // debugger;
      this.selectNewPlayerOne();
      this.selectNewPlayerTwo();
    },
    selectNewPlayerOne() {
      // debugger;
      var thisVM = this;
      this.player1 = this.players[
        Math.floor(Math.random() * this.players.length)
      ];
      if (
        this.player2 != null &&
        this.player1 != null &&
        this.player2.id == this.player1.id &&
        this.players.length > 2
      ) {
        while (this.player2.id == this.player1.id) {
          this.player1 = this.players[
            Math.floor(Math.random() * this.players.length)
          ];
        }
      }
      this.changedPlayer1 = true;
      setTimeout(() => {
        thisVM.changedPlayer1 = false;
      }, 1000);
    },
    selectNewPlayerTwo() {
      // debugger;
      var thisVM = this;
      this.player2 = this.players[
        Math.floor(Math.random() * this.players.length)
      ];
      if (
        this.player2 != null &&
        this.player1 != null &&
        this.player2.id == this.player1.id
      ) {
        debugger;
        while (this.player2.id == this.player1.id && this.players.length > 2) {
          this.player2 = this.players[
            Math.floor(Math.random() * this.players.length)
          ];
        }
      }
      this.changedPlayer2 = true;
      setTimeout(() => {
        thisVM.changedPlayer2 = false;
      }, 1000);
    },
    insertSkill() {
      var thisVM = this;
      var skillId = firebase
        .database()
        .ref()
        .child(`/skills-comparer/${thisVM.contextId}/skills`)
        .push().key;
      if (
        thisVM.newSkillSuggested != null //&&
        // (thisVM.newSkillSuggested.length >= 1)
      ) {
        var valueToRecord = JSON.parse(
          `{"${thisVM.$store.state.currentUser.uid}":true}`
        );

        skillId = thisVM.newSkillSuggested;
        firebase
          .database()
          .ref(`/skills-comparer/${thisVM.contextId}/skills/${skillId}`)
          .update({
            name: thisVM.newSkillSuggested,
            // rating: 1500,
            // rd: 200,
            // vol: 0.06,
          })
          .then(function () {
            thisVM.newTopicDescription = null;
            firebase
              .database()
              .ref(
                `/skills-comparer/${thisVM.contextId}/skills/${skillId}/suggestedBy`
              )
              .update(valueToRecord)
              .then(function () {});
            thisVM.$buefy.dialog.alert({
              message: `Thanks for your contribution!`,
              onConfirm: () => {
                thisVM.newSkillSuggested = null;
              },
            });
          });
      }
    },
    play() {
      //debugger;
      var thisVM = this;
      if (thisVM.winnerPlayer == null) {
        this.$buefy.dialog.alert({
          message: "Please, select the most interesting skill",
          onConfirm: () => {},
        });
      } else {
        var p1 = ranking.makePlayer(
          thisVM.player1.ranking,
          thisVM.player1.rd,
          thisVM.player1.vol
        );
        var p2 = ranking.makePlayer(
          thisVM.player2.ranking,
          thisVM.player2.rd,
          thisVM.player2.vol
        );
        var matches = [];
        //   debugger;
        var p1Id = thisVM.player1.id;
        var p2Id = thisVM.player2.id;
        // var p1Name = thisVM.player1.name;
        // var p2Name = thisVM.player2.name;
        var winnerName = thisVM.winnerPlayer.name;
        var winnerIsPlayer1 = thisVM.winnerPlayer == thisVM.player1;
        matches.push([p1, p2, winnerIsPlayer1 ? 1 : 0]); //Ryan won over Bob
        //     matches.push([thisVM.Ryan, thisVM.John, 0]); //Ryan lost against John
        //   matches.push([thisVM.Ryan, thisVM.Mary, 0.5]); //A draw between Ryan and Mary
        ranking.updateRatings(matches);
        var p1Rating = p1.getRating();
        var p1Rd = p1.getRd();
        var p1Vol = p1.getVol();

        var p2Rating = p2.getRating();
        var p2Rd = p2.getRd();
        var p2Vol = p2.getVol();
        firebase
          .database()
          .ref(`/skills-comparer/${thisVM.contextId}/skills/${p1Id}`)
          .update({
            rating: p1Rating,
            rd: p1Rd,
            vol: p1Vol,
          })
          .then(function () {
            // thisVM.$buefy.dialog.alert({
            //   message: `Obrigado! Você deve ter recebido um e-mail de confirmação de seu interesse e agora vamos deixar nossos robozinhos acharem uma data que caiba dentro das suas preferências 🤖! `,
            //   onConfirm: () => {
            //     thisVM.$router.replace({
            //       name: "Sobre",
            //     });
            //   },
            // });
          });
        firebase
          .database()
          .ref(`/skills-comparer/${thisVM.contextId}/skills/${p2Id}`)
          .update({
            rating: p2Rating,
            rd: p2Rd,
            vol: p2Vol,
          })
          .then(function () {
            // thisVM.$buefy.dialog.alert({
            //   message: `Obrigado! Você deve ter recebido um e-mail de confirmação de seu interesse e agora vamos deixar nossos robozinhos acharem uma data que caiba dentro das suas preferências 🤖! `,
            //   onConfirm: () => {
            //     thisVM.$router.replace({
            //       name: "Sobre",
            //     });
            //   },
            // });
          });
        thisVM.$buefy.toast.open(
          `Awesome! ${winnerName} seems like a nice think to learn.`
        );

        var audio = new Audio(require("../../assets/sounds/like.mp3")); // path to file
        audio.volume = 0.05;
        audio.play();

        thisVM.winnerPlayer = null;
        if (Math.random() > 0.75) {
          thisVM.selectTwoPlayers();
        } else {
          if (winnerIsPlayer1) {
            this.selectNewPlayerTwo();
          } else {
            this.selectNewPlayerOne();
          }
        }
        //  thisVM.players = ranking.getPlayers();
      }
    },
  },
};
</script>