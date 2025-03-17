<template>
  <van-popup v-model:show="isVisible" class="fullScreenStylesPopup" style="width: 100%; height: 100%;" position="right"
    :style="swipeStyles" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <ScrollToTopButton :show-button="scrollValue > 100" @click="scrollToTop" :bottom="btnPosBottom"
      :right="btnPosRight" />

    <div ref="scrollable" @scroll="handleScroll">
      <slot />
    </div>

  </van-popup>

</template>

<script>
import ScrollToTopButton from "@/components/ScrollToTopButton.vue";

export default {
  name: "SwipeablePopup",
  components: { ScrollToTopButton },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    btnPosBottom: {
      type: Number,
      default: 50
    },
    btnPosRight: {
      type: Number,
      default: 50
    }
  },

  data() {
    return {
      scrollValue: 0,
      startX: 0,
      startY: 0,
      endX: null,
      endY: null,
      translateX: 0,
      isSwiping: false,
      isClosing: false
    };
  },

  computed: {
    swipeStyles() {
      if (this.isSwiping || this.isClosing) {
        const style = {
          transform: `translateX(${this.translateX}px)`
        };
        style.transition = this.isSwiping ? "none" : "transform 300ms ease-out";
        return style;
      }
      return {};
    },

    isVisible: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      }
    }
  },

  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.translateX = 0;
        this.isSwiping = false;
        this.isClosing = false;
      }
    }
  },

  methods: {
    handleScroll(e) {
      this.scrollValue = e.target.scrollTop;
      this.$emit("scroll-changed", this.scrollValue);
    },

    scrollToTop() {
      if (this.$refs.scrollable) {
        this.$refs.scrollable.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    onTouchStart(event) {
      if (this.isClosing) return;
      const touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
      this.endX = null;
      this.endY = null;
      this.isSwiping = true;
    },

    onTouchMove(event) {
      if (this.isClosing) return;

      const touch = event.touches[0];
      this.endX = touch.clientX;
      this.endY = touch.clientY;

      const diffX = this.endX - this.startX;
      const diffY = Math.abs(this.endY - this.startY);

      if (diffY > diffX) {
        this.isSwiping = false;
        return;
      }

      this.translateX = Math.max(diffX, 0);
    },

    onTouchEnd() {
      if (this.isClosing) return;

      if (this.endX === null || this.endY === null) {
        this.resetSwipeState();
        return;
      }

      const diffX = this.endX - this.startX;
      const diffY = Math.abs(this.endY - this.startY);

      if (diffX > 100 && diffY < 50) {
        this.isClosing = true;
        this.isVisible = false;
        this.translateX = window.innerWidth;

        setTimeout(() => {
          this.isVisible = false; this.resetSwipeState();
        }, 300);

      } else {
        this.translateX = 0;
        setTimeout(() => {
          this.isSwiping = false;
        }, 300);
      }
    },

    resetSwipeState() {
      this.startX = 0;
      this.startY = 0;
      this.endX = null;
      this.endY = null;
      this.translateX = 0;
      this.isSwiping = false;
      this.isClosing = false;
    }
  }
};
</script>
