<template>
      hello
  <div class="container">
    <adsgram-task v-if="isVisible" class="adsGramQuest" data-block-id="task-13058" ref="taskRef">
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
      isVisible: true,
    };
  },
  mounted() {
    const task = this.$refs.taskRef;
    if (!task) return;

    // Все требуемые события
    task.addEventListener("reward", this.onReward);
    task.addEventListener("onError", this.onError);
    task.addEventListener("onBannerNotFound", this.onBannerNotFound);
    task.addEventListener("onTooLongSession", this.onTooLongSession);
  },
  unmounted() {
    const task = this.$refs.taskRef;
    if (!task) return;
    task.removeEventListener("reward", this.onReward);
    task.removeEventListener("onError", this.onError);
    task.removeEventListener("onBannerNotFound", this.onBannerNotFound);
    task.removeEventListener("onTooLongSession", this.onTooLongSession);
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
