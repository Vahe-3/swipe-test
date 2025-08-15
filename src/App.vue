<template>
  <div class="container">
    <!-- Hide the task until real title content appears (no skeleton) -->
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

    <!-- (optional) your own placeholder while AdsGram is skeletoning -->
    <div v-show="!isReady" class="adsGramSkeleton">
      Загрузка задания…
    </div>
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
      _pollId: null,
    };
  },
  mounted() {
    this.taskRef = this.$refs.taskRef;

    // Wire AdsGram events (unchanged)
    if (this.taskRef) {
      this.taskRef.addEventListener("reward", this.onReward);
      this.taskRef.addEventListener("onError", this.onError);
      this.taskRef.addEventListener("onBannerNotFound", this.onBannerNotFound);
      this.taskRef.addEventListener("onTooLongSession", this.onTooLongSession);
    }

    // Start watching the internal DOM for when the title becomes real (no skeleton)
    this.startTitleReadyWatch();
  },
  unmounted() {
    if (this.taskRef) {
      this.taskRef.removeEventListener("reward", this.onReward);
      this.taskRef.removeEventListener("onError", this.onError);
      this.taskRef.removeEventListener("onBannerNotFound", this.onBannerNotFound);
      this.taskRef.removeEventListener("onTooLongSession", this.onTooLongSession);
    }
    this.stopTitleReadyWatch();
  },
  methods: {
    // ===== AdsGram event handlers =====
    onReward(event) {
      console.log(`🏆 Reward received: ${event.detail}`);
      console.log({ event });
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

    // ===== Title readiness logic =====
    getRoot() {
      // Prefer shadow DOM if available (custom element internals usually live there)
      return this.taskRef?.shadowRoot || this.taskRef || null;
    },
    findTitleEl() {
      const root = this.getRoot();
      if (!root) return null;
      // Adjust selector if AdsGram uses a different class for the title.
      return root.querySelector(".title");
    },
    titleLooksSkeleton(el) {
      if (!el) return true;
      // Common skeleton markers; add/remove as needed depending on AdsGram markup
      if (el.classList.contains("skeleton")) return true;
      if (el.classList.contains("van-skeleton")) return true;
      if (el.closest(".van-skeleton")) return true;
      if (el.querySelector(".van-skeleton")) return true;
      return false;
    },
    titleHasContent(el) {
      if (!el) return false;
      const text = (el.textContent || "").trim();
      // Treat any non-empty text OR child nodes as real content
      return text.length > 0 || el.children.length > 0;
    },
    isTitleReadyNow() {
      const el = this.findTitleEl();
      return !!el && this.titleHasContent(el) && !this.titleLooksSkeleton(el);
    },
    markReady() {
      if (!this.isReady) {
        this.isReady = true;
        this.stopTitleReadyWatch();
      }
    },
    startTitleReadyWatch() {
      if (!this.taskRef) return;

      // 1) Immediate check in case it’s already ready
      if (this.isTitleReadyNow()) {
        this.markReady();
        return;
      }

      const root = this.getRoot();
      if (!root) return;

      // 2) Observe mutations inside adsgram-task for title becoming real
      try {
        this._observer = new MutationObserver(() => {
          if (this.isTitleReadyNow()) this.markReady();
        });
        this._observer.observe(root, {
          subtree: true,
          childList: true,
          characterData: true,
          attributes: true,
          attributeFilter: ["class"],
        });
      } catch (e) {
        // Some shadow roots could be closed; fall back to polling below
        console.warn("MutationObserver failed, will poll:", e);
      }

      // 3) Fallback: light polling (covers closed shadow roots / late renders)
      if (!this._pollId) {
        this._pollId = window.setInterval(() => {
          if (this.isTitleReadyNow()) this.markReady();
        }, 150);
      }
    },
    stopTitleReadyWatch() {
      if (this._observer) {
        try { this._observer.disconnect(); } catch {}
        this._observer = null;
      }
      if (this._pollId) {
        clearInterval(this._pollId);
        this._pollId = null;
      }
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
.adsGramButton--done  { background-color: #007539; }

/* Optional placeholder while hidden */
.adsGramSkeleton {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  background: var(--van-cell-background);
  color: var(--van-cell-label-color);
  opacity: 0.7;
}
</style>
