
<template>
  <div
    class="column card has-text-centered"
    v-bind:class="customClass"
    v-bind:style="stage.style"
    v-if="stage != null"
  >
    <div v-if="$store.state.isLoading" class="is-centered">
      <div class="content">
        <p>
          <b-skeleton active></b-skeleton>
        </p>
        <b-icon icon="circle-outline" size="is-large" />
      </div>

      <div class="media-content">
        <div class="content">
          <p>
            <b-skeleton active></b-skeleton>
            <b-skeleton height="40px"></b-skeleton>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <b> {{ stage.Name }} </b>
      <br />

      <b-tag :type="stage.ShortDescriptionType" v-if="stage.ShortDescription">
        {{ stage.ShortDescription }}
      </b-tag>
      <b-tag v-if="isLocked" type="is-danger">
        {{ stage.LockedShortDescription }}
      </b-tag>
      <br />
      <b-icon :icon="stage.icon" size="is-large" />
      <b-progress :value="Progress" :max="stage.MaxValue" :type="ProgressType" size="is-large" show-value>
        <span style="color: #00125f">{{ ProgressText }} </span>
      </b-progress>
  <!-- <b-button
        v-if="stage.route"
        tag="router-link"
        :to="stage.route"
         type="is-primary"
        size="is-small"
        :disabled="isLocked"
        v-show="isPracticeVisible"
        >Dicas</b-button
      > <br /> -->
      <b-button
        v-if="stage.route"
        tag="router-link"
        :to="stage.route"
        :type="ButtonActType"
        size="is-large"
        :disabled="isLocked"
        v-show="isPracticeVisible"
        >PRATICAR</b-button
      >
      <b-button
        v-else
        tag="router-link"
        disabled
        type="is-success"
        size="is-large"
        >PRATICAR</b-button
      >
      <b-button type="is-info" size="is-large" v-show="isPayToUnlockVisible"
        >Desbloquear por R$ {{ stage.UnlockPrice }}</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "KT-stage",
  data() {
    return {};
  },
  computed: {
    isLocked() {
      if (
        this.stage.KTStatLockKey &&
        this.stage.unlockMinValueCondition != null &&
        this.KTStats != null &&
        this.KTStats[this.stage.KTStatLockKey] != null &&
        this.KTStats[this.stage.KTStatLockKey] < this.stage.unlockMinValueCondition
      ) {
        return true;
      }
      return false;
    },
    isPayToUnlockVisible() {
      return this.isLocked && this.stage.canPayToUnlock;
    },
    isPracticeVisible() {
      return !(this.isLocked && this.stage.canPayToUnlock);
    },
    customClass() {
      return {
        "is-half": this.stage.isSpecial,
        "is-one-quarter": !this.stage.isSpecial,
      };
    },
    Progress() {
      return this.KTStats != null && this.KTStats[this.stage.KTStatKey]
        ? this.KTStats[this.stage.KTStatKey]
        : 0;
    },
    ProgressText() {
      if (this.Progress >= this.stage.MaxValue) {
        return "PERFEITO!";
      } else {
        return "PRATICAR";
      }
    },
    ProgressType() {
      if (this.Progress >= this.stage.MaxValue) {
        return "is-warning";
      } else {
        return "is-info";
      }
    },
    ButtonActType() {
      if (this.Progress >= this.stage.MaxValue) {
        return "is-default";
      } else {
        return "is-success";
      }
    },
  },

  props: ["stage", "KTStatKey", "KTStats"],
  watch: {
    KTStats() {
      this.loadData();
    },
    KTStatKey() {
      this.loadData();
    },
  },
  methods: {
    loadData() {},
  },
};
</script>