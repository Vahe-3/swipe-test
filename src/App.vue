<template>
  <div class="container">
    <adsgram-task
      class="adsGramQuest"
      data-block-id="task-13058"
      :data-debug="true"
      ref="taskRef"
    >
      <span slot="reward" class="questReward">+3,000 CRUMBS</span>
      <div slot="button" class="adsGramButton"><van-icon name="arrow" /></div>
      <div slot="claim" class="adsGramButton adsGramButton--claim">
        получить
      </div>
      <div slot="done" class="adsGramButton adsGramButton--done">готово</div>
    </adsgram-task>
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
    const isTelegram =
      typeof window !== "undefined" &&
      typeof window.Telegram !== "undefined" &&
      typeof window.Telegram.WebApp !== "undefined" &&
      !!window.Telegram.WebApp.initData;

    console.log({ isTelegram });

    if (this.taskRef) {
      this.taskRef.addEventListener("reward", this.onReward);
    }
  },
  beforeUnmount() {
    if (this.taskRef) {
      this.taskRef.removeEventListener("reward", this.onReward);
    }
  },
  methods: {
    onReward(event) {
      console.log(`Награда, detail = ${event.detail}`);
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
  padding: 12px 16px 12px 16px;
  border-radius: 16px;
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

.adsGramButton--claim {
  background-color: #ee941c;
}

.adsGramButton--done {
  background-color: #007539;
}
</style>
