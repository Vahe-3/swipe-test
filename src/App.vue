<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const chatFieldText = ref('');
const isShowChat = ref(false); // Assuming this is already defined or passed as a prop
const isChatOpenLoading = ref(false); // Assuming this is already defined or passed as a prop
const activeChat = ref({ id: null }); // Assuming active chat ID
const bottomOffset = ref('80px');

const adjustForKeyboard = () => {
  if (window.innerHeight < 600) { // Adjust threshold for your specific use case
    bottomOffset.value = '300px'; // Set the bottom offset when keyboard opens
  } else {
    bottomOffset.value = '80px'; // Default bottom offset
  }
};

onMounted(() => {
  window.addEventListener('resize', adjustForKeyboard);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustForKeyboard);
});
</script>

<template>
  <div class="chatInput" :style="{ bottom: bottomOffset, borderBottom: '1px solid #fff' }">
    <div class="inputs">
      <van-field v-model="chatFieldText"
        :disabled="isShowChat && _getIsChatInLoading(activeChat.id) || isChatOpenLoading" />
      <van-button class="sendButton" size="small" type="warning"
        :loading="isShowChat && _getIsChatInLoading(activeChat.id) || isChatOpenLoading">
        <van-icon name="arrow" size="20px" />
      </van-button>
    </div>
    <input />
  </div>

  
</template>

<style scoped lang="less">
.chatInput {
  border-bottom: 1px solid #fff;
  background-color: red;
  position: fixed;
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
        color: #000;
      }
    }
  }
}
</style>
