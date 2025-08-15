<template>
  <div class="container">
    <!-- skeleton while loading / if hidden -->
    <div v-if="!showTask && !hadError" class="task-skeleton">…</div>

    <!-- show only after we think it's good -->
    <adsgram-task
      v-show="showTask"
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
      showTask: false,     // controls visibility of <adsgram-task>
      hadError: false,
      _graceTimer: null,   // small grace window before showing
    };
  },
  async mounted() {
    this.taskRef = this.$refs.taskRef;

    // Wait until custom element is upgraded (defined) so it can render.
    if (window.customElements && customElements.whenDefined) {
      try { await customElements.whenDefined('adsgram-task'); } catch {}
    }

    if (!this.taskRef) return;

    // Subscribe to official AdsGram events
    this.taskRef.addEventListener('reward', this.onReward);
    this.taskRef.addEventListener('onError', this.onError);
    this.taskRef.addEventListener('onBannerNotFound', this.onBannerNotFound);
    this.taskRef.addEventListener('onTooLongSession', this.onTooLongSession);

    // Heuristic: give the component a short moment to render.
    // If no "not found"/"error" arrives during the grace period, show it.
    this._graceTimer = window.setTimeout(() => {
      if (!this.hadError) this.showTask = true;
    }, 500); // tweak 300–800ms if you want
  },
  unmounted() {
    if (this._graceTimer) clearTimeout(this._graceTimer);
    if (!this.taskRef) return;
    this.taskRef.removeEventListener('reward', this.onReward);
    this.taskRef.removeEventListener('onError', this.onError);
    this.taskRef.removeEventListener('onBannerNotFound', this.onBannerNotFound);
    this.taskRef.removeEventListener('onTooLongSession', this.onTooLongSession);
  },
  methods: {
    onReward(e) {
      console.log(`🏆 Reward received: ${e.detail}`, e);
    },
    onError(e) {
      this.hadError = true;
      this.showTask = false;
      console.error('❌ Error in AdsGramTask:', e.detail || e);
    },
    onBannerNotFound(e) {
      // No task available right now — keep it hidden and maybe show a fallback UI
      this.hadError = true;
      this.showTask = false;
      console.warn('⚠️ Banner not found:', e.detail || e);
    },
    onTooLongSession(e) {
      console.warn('⏳ Too long session:', e.detail || e);
      alert('Сессия слишком длинная. Пожалуйста, перезапустите приложение.');
    },
  },
};
</script>

<style scoped>
.task-skeleton {
  height: 72px;
  border-radius: 10px;
  background: linear-gradient(90deg, #2a2a2a 25%, #333 37%, #2a2a2a 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;
  margin-bottom: 8px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* your existing styles… */
.adsGramQuest { /* … */ }
</style>
