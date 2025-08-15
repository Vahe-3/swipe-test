<template>
  <div class="container">
    <adsgram-task
      v-show="isReady"
      class="adsGramQuest"
      data-block-id="task-13058"
      data-debug="true"
      ref="taskRef"
    >
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
      isReady: false,
      _observer: null,
    };
  },
  mounted() {
    this.taskRef = this.$refs.taskRef;
    if (!this.taskRef) return;

    this.taskRef.addEventListener("reward", this.onReward);

    // Watch for title without skeleton
    this._observer = new MutationObserver(() => {
      if (this.isTitleReady()) {
        this.isReady = true;
        this._observer.disconnect();
      }
    });
    const root = this.taskRef.shadowRoot || this.taskRef;
    this._observer.observe(root, { childList: true, subtree: true, attributes: true });
  },
  unmounted() {
    if (this.taskRef) {
      this.taskRef.removeEventListener("reward", this.onReward);
    }
    if (this._observer) {
      this._observer.disconnect();
    }
  },
  methods: {
    onReward(e) {
      console.log(`🏆 Reward received: ${e.detail}`);
    },
    isTitleReady() {
      const root = this.taskRef.shadowRoot || this.taskRef;
      // Match any class that starts with "title"
      const title = Array.from(root.querySelectorAll("[class]")).find(
        el => Array.from(el.classList).some(cls => cls.startsWith("title"))
      );
      if (!title) return false;
      const hasSkeleton = title.classList.contains("skeleton") || title.querySelector(".skeleton");
      const hasContent = (title.textContent || "").trim().length > 0;
      return hasContent && !hasSkeleton;
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
.adsGramButton--claim { background-color: #ee941c; }
.adsGramButton--done { background-color: #007539; }
</style>
