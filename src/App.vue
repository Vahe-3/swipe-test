<template>
  <div class="container" v-if="isVisible">
    <adsgram-task class="adsGramQuest" data-block-id="task-13058" ref="taskRef">
      <span slot="reward" class="questReward">+3,000 CRUMBS</span>
      <div slot="button" class="adsGramButton"><van-icon name="arrow" /></div>
      <div slot="claim" class="adsGramButton adsGramButton--claim">получить</div>
      <div slot="done" class="adsGramButton adsGramButton--done">готово</div>
    </adsgram-task>
  </div>
</template>

<script>
export default {
  name: "AdsGramTask",
  data() {
    return {
      taskRef: null,
      isVisible: true,
    };
  },
  mounted() {
    this.taskRef = this.$refs.taskRef;
    if (!this.taskRef) return;

    // Все требуемые события
    this.taskRef.addEventListener("reward", this.onReward);
    this.taskRef.addEventListener("onError", this.onError);
    this.taskRef.addEventListener("onBannerNotFound", this.onBannerNotFound);
    this.taskRef.addEventListener("onTooLongSession", this.onTooLongSession);
  },
  unmounted() {
    if (!this.taskRef) return;
    this.taskRef.removeEventListener("reward", this.onReward);
    this.taskRef.removeEventListener("onError", this.onError);
    this.taskRef.removeEventListener("onBannerNotFound", this.onBannerNotFound);
    this.taskRef.removeEventListener("onTooLongSession", this.onTooLongSession);
  },
  methods: {
    // user completed the task
    onReward(e) {
      console.log("[AdsGramTask] reward event", e?.detail);
      // don’t hide, keep visible
    },

    // loading/render error -> hide
    onError(e) {
      console.error("[AdsGramTask] error event", e?.detail);
      this.isVisible = false;
    },

    // no task to display -> hide
    onBannerNotFound(e) {
      console.warn("[AdsGramTask] banner not found", e?.detail);
      this.isVisible = false;
    },

    // session too long -> hide
    onTooLongSession(e) {
      console.warn("[AdsGramTask] too long session", e?.detail);
      this.isVisible = false;
    },
  }

};
</script>

<style scoped>
.adsGramQuest {
  --adsgram-task-font-size: var(--van-cell-large-title-font-size);
  --adsgram-task-icon-size: 55px;
  --adsgram-task-icon-title-gap: 15px;
  --adsgram-task-icon-border-radius: 100px;
  display: block;
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: var(--van-cell-background);
  color: white;
}

.questReward {
  margin-top: 4px;
  font-size: var(--van-cell-large-label-font-size);
  color: var(--van-cell-label-color);
}

.adsGramButton {
  display: flex;
  justify-content: end;
}

.adsGramButton--claim {
  background-color: #ee941c;
}

.adsGramButton--done {
  background-color: #007539;
}
</style>
