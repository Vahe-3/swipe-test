<template>
  <div class="container" >
    <h1> {{ data }}</h1>

  </div>

</template>

<script setup>
import { onMounted, onUnmounted, ref, onBeforeMount } from 'vue';

const data = ref('none')
onMounted(() => {
  _toggleFullScreen(true);
  _setVH();
  setSharedData()
})


function setSharedData() {
  if ( window.Telegram.WebApp) {
    const initData = window.Telegram.WebApp.initDataUnsafe;
    data.value = JSON.stringify(initData)

  } 
}

</script>

<style scoped lang="less">
.hello {}

.container {
  padding-left: 20px;
  padding-right: 20px;
  background-color: red;
  height: 80vh;

  .chatInput {
    border-bottom: 1px solid #fff;
    background-color: red;
    position: fixed;
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

}
</style>
