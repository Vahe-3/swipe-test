<template>
  <adsgram-task
    class="task"
    :data-block-id="blockId"
    :data-debug="debug"
    ref="taskRef"
  >
    <span slot="reward" class="task__reward">1000 монет</span>
    <div slot="button" class="task__button">вперед</div>
    <div slot="claim" class="task__button task__button--claim">получить</div>
    <div slot="done" class="task__button task__button--done">готово</div>
  </adsgram-task>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
  debug: { type: Boolean, default: false },
  blockId: { type: String, required: true }
});

const taskRef = ref(null);

const handler = (event) => {
  alert(`Награда, detail = ${event.detail}`);
};

onMounted(() => {
  if (taskRef.value) {
    taskRef.value.addEventListener('reward', handler);
  }
});

onBeforeUnmount(() => {
  if (taskRef.value) {
    taskRef.value.removeEventListener('reward', handler);
  }
});
</script>

<style scoped>
.task {
  --adsgram-task-font-size: 16px; /* минимум 14px */
  --adsgram-task-icon-size: 50px; /* минимум 30px */
  --adsgram-task-icon-title-gap: 15px; /* минимум 5px максимум 40px */
  --adsgram-task-button-width: 60px; /* минимум 40px */
  --adsgram-task-icon-border-radius: 8px;

  display: block;
  width: 328px;
  padding: 8px 16px 8px 8px;
  border-radius: 16px;
  background-color: #1d2733;
  font-family: Roboto;
  color: white;
}

.task__reward {
  margin: 5px 0 0 0;
  font-size: 14px;
}

.task__button {
  margin-left: 10px;
  background-color: #50a8eb;
  border-radius: 5px;
  padding: 6px 12px;
}

.task__button_claim {
  margin-left: 0;
  background-color: #ee941c;
}

.task__button_done {
  margin-left: 0;
  background-color: #007539;
}
</style>
