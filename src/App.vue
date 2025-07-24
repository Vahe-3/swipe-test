<template>
  <div class="container">
    <van-cell-group inset>
      <van-cell size="large" center>
        <adsgram-task
          class="task"
          data-block-id="task-13058"
          :data-debug="true"
          ref="taskRef"
        >
          <span slot="reward" class="task__reward">1000 монет</span>
          <div slot="button" class="task__button">Go</div>
          <div slot="claim" class="task__button task__button--claim">
            получить
          </div>
          <div slot="done" class="task__button task__button--done">готово</div>
        </adsgram-task> </van-cell
      >
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      taskRef: null,
    };
  },
  mounted() {
    if (this.taskRef) {
      this.taskRef.addEventListener("reward", this.onReward);
    }
  },
  unmounted() {
    if (this.taskRef) {
      this.taskRef.removeEventListener("reward", this.onReward);
    }
  },

  methods: {
    onReward(event) {
      alert(`Награда, detail = ${event.detail}`);
    },
  },

  computed: {
    isTelegramEnvironment() {
      return (
        typeof window !== "undefined" &&
        typeof window.Telegram !== "undefined" &&
        typeof window.Telegram.WebApp !== "undefined" &&
        !!window.Telegram.WebApp.initData
      );
    },
  },
};
</script>

<style scoped>
.task {
  --adsgram-task-font-size: 16px;
  --adsgram-task-icon-size: 55px;
  --adsgram-task-icon-title-gap: 15px;
  --adsgram-task-button-width: 60px;
  --adsgram-task-icon-border-radius: 100px;

  display: block;
  width: 100%;
  border-radius: 16px;
  color: white;
}

.task__reward {
  margin: 5px 0 0 0;
  font-size: 16px;
  color: var(--van-cell-label-color);
  display: flex;
}

.task__button {
  width: fit-content;
  background-color: #50a8eb;
  border-radius: 5px;
  padding: 6px 12px;
}

.task__button--claim {
  background-color: #ee941c;
}

.task__button--done {
  background-color: #007539;
}
</style>
