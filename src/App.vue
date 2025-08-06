<template>
  <div class="container">
    <adsgram-task
      class="adsGramQuest"
      data-block-id="task-13058"
      data-debug="true"
      ref="taskRef"
    >
      <span slot="reward" class="questReward">+3,000 CRUMBS</span>
      <div slot="button" class="adsGramButton"><van-icon name="arrow" /></div>
      <div slot="claim" class="adsGramButton adsGramButton--claim">
        получить
      </div>
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
    };
  },
  mounted() {
    this.taskRef = this.$refs.taskRef;
    if (this.taskRef) {
      this.taskRef.addEventListener("reward", this.onReward);
      this.taskRef.addEventListener("onError", this.onError);
      this.taskRef.addEventListener("onBannerNotFound", this.onBannerNotFound);
      this.taskRef.addEventListener("onTooLongSession", this.onTooLongSession);
    }
  },
  unmounted() {
    if (this.taskRef) {
      this.taskRef.removeEventListener("reward", this.onReward);
      this.taskRef.removeEventListener("onError", this.onError);
      this.taskRef.removeEventListener("onBannerNotFound", this.onBannerNotFound);
      this.taskRef.removeEventListener("onTooLongSession", this.onTooLongSession);
    }
  },
  methods: {
    onReward(event) {
      console.log(`🏆 Reward received: ${event.detail}`);
      console.log(`Event: ${event}`);
    },
    onError(event) {
      console.error("❌ Error in AdsGramTask:", event.detail || event);
    },
    onBannerNotFound(event) {
      console.warn("⚠️ Banner not found:", event.detail || event);
    },
    onTooLongSession(event) {
      console.warn("⏳ Too long session:", event.detail || event);
      alert("Сессия слишком длинная. Пожалуйста, перезапустите приложение.");
    },
  },
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
  padding: 12px 16px 12px 16px;
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
