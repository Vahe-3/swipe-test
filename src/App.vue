<script setup >
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { onMounted, ref } from 'vue';

onMounted(() => {
  this._viewportResizeTimeout = setTimeout(() => {
          if (this._isIphone()) {
            const height = window.Telegram.WebApp.viewportStableHeight;
            const margin = this._initialViewportStableHeight - height;
            const popups = Array.from(document.getElementsByClassName('van-popup--bottom'));
            popups.forEach(p => {
              p.style.paddingTop = margin + 'px';
              p.style.bottom = margin + 'px';
            });
          }
          window.scrollTo(document.documentElement);
        }, 800);
})

</script>

<template>
  <div class="container">
  <div style="height: 8000px;">hello</div>
    <div class="chatInput" :style="{
      bottom:  '80px',
      borderBottom: '1px solid #fff'
    }">
      <div class="inputs">
        <van-field ref="" v-model="chatFieldText"
          :disabled="isShowChat && _getIsChatInLoading(activeChat.id) || isChatOpenLoading" />
        <van-button class="sendButton" size="small" type="warning"
          :loading="isShowChat && _getIsChatInLoading(activeChat.id) || isChatOpenLoading">
          <van-icon name="arrow" size="20px" />
        </van-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .chatInput {
    border-bottom: 1px solid #fff;
    background-color: red;
    position: sticky;
    z-index: 2017;
    width: 100%;
    left: 0;
    border-radius: 15px 15px 0 0;
    transition: bottom 0.3s ease;

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
          color: #000
        }
      }
    }
  }
</style>
