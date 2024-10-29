<script setup>
import { ref, onMounted } from 'vue';
import { Field, Button, Icon } from 'vant';

const chatFieldRef = ref(null);
const chatFieldText = ref('');
const isShowChat = ref(false);
const isChatOpenLoading = ref(false);
const activeChat = ref({ id: 1 });

const _getIsChatInLoading = (id) => {
  // Your logic for determining loading state by id
  return false;
};

onMounted(() => {
  const inputElement = chatFieldRef.value?.$el?.querySelector('.van-field__control');
  if (inputElement) {
    inputElement.addEventListener('focus', () => {
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
</script>

<template>
  <div class="chatInput" :style="{ bottom: '80px', borderBottom: '1px solid #fff' }">
    <div class="inputs">
      <van-field
        v-model="chatFieldText"
        ref="chatFieldRef"
        :disabled="isShowChat && _getIsChatInLoading(activeChat.id) || isChatOpenLoading"
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
