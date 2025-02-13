<template>
  <div class="container" >
    <h1> {{ data }}</h1>

  </div>

</template>

<script setup>
import { onMounted, onUnmounted, ref, onBeforeMount } from 'vue';

const data = ref('none')
onMounted(() => {

  getTelegramParams()
})


function getTelegramParams() {
  if (window.Telegram && window.Telegram.WebApp) {
    const initData = window.Telegram.WebApp.initDataUnsafe;

    if (initData && initData.start_param) {
      console.log("Start Param:", initData.start_param);

      // Manually extract sharedUserId and sharedUserName
      const params = initData.start_param.split("_");
      const sharedUserId = params[1];
      const sharedUserName = params[3];

      if (sharedUserId && sharedUserName) {
        alert(`User ID: ${sharedUserId}, Name: ${sharedUserName}`);
      } else {
        alert("No valid sharedUserId or sharedUserName found in start_param.");
      }
    } else {
      alert("No start_param found in Telegram WebApp data.");
    }
  } else {
    alert("Telegram WebApp not detected.");
  }
}

// Call the funct




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
