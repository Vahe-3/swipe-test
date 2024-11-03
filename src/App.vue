<template>
  <div class="container" @touchstart="closeKeyboard">
    <div style="height: 8000px;">Bye</div>
    <div class="chatInput" :style="{ bottom: isShowChat ? '0' : '80px', marginBottom: marginBottom + 'px' }">
      <div class="inputs">
        <van-field
          v-model="chatFieldText"
          :disabled="isShowChat && _getIsChatInLoading(activeChat.id) || isChatOpenLoading"
          @focus="adjustMarginForKeyboard"
          @blur="marginBottom = 0"
          ref="chatField"
        />
        <van-button
          class="sendButton"
          size="small"
          type="warning"
          :loading="isShowChat && _getIsChatInLoading(activeChat.id) || isChatOpenLoading"
        >
          <van-icon name="arrow" size="20px" />
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const chatFieldText = ref('');
const isShowChat = ref(false);
const marginBottom = ref(0);
const initialViewportHeight = ref(window.Telegram.WebApp.viewportStableHeight);
const lastViewportHeight = ref(initialViewportHeight.value);
let viewportResizeTimeout = null;
const chatField = ref(null); // Reference for the chat input field

// Function to adjust margin based on keyboard visibility
function adjustMarginForKeyboard() {
  const currentHeight = window.Telegram.WebApp.viewportStableHeight;
  const margin = initialViewportHeight.value - currentHeight;
  marginBottom.value = margin > 0 ? margin : 0;
}

function isIphone() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Function to close the keyboard
function closeKeyboard(event) {
  if (event.target !== chatField.value?.$el) {
    chatField.value?.blur(); // Blurs the input, closing the keyboard
  }
}

// Listen for viewport changes to handle keyboard display adjustments
onMounted(() => {
  window.Telegram.WebApp.onEvent('viewportChanged', ({ isStateStable }) => {
    if (!isStateStable || lastViewportHeight.value === window.Telegram.WebApp.viewportStableHeight) {
      return;
    }

    lastViewportHeight.value = window.Telegram.WebApp.viewportStableHeight;

    if (viewportResizeTimeout) {
      clearTimeout(viewportResizeTimeout);
    }

    viewportResizeTimeout = setTimeout(() => {
      if (isIphone()) {
        adjustMarginForKeyboard();
      }
    }, 800);
  });
});
</script>


<style scoped lang="less">
  .chatInput {
    border-bottom: 1px solid #fff;
    background-color: red;
    position: sticky;
    z-index: 2017;
    width: 100%;
    left: 0;
    border-radius: 15px 15px 0 0;
    transition: bottom 0.3s ease, margin-bottom 0.3s ease;

    .inputs {
      margin: 10px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      background-color: #fff;
      padding: 5px;

      .sendButton {
        margin-right: 10px;
      }

      :deep(.van-field) {
        background-color: #fff;
        margin-bottom: 0;

        .van-field__control {
          color: #000;
        }
      }
    }
  }
</style>
