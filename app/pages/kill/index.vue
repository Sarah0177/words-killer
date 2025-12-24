<template>
  <div class="p-6">
    <h1>
      共{{ toKillList.length }}只小怪兽<UButton class="mx-4 my-4" to="/"
        >返回</UButton
      >
    </h1>
    <div class="w-full mt-6">
      <div>
        <UCarousel
          v-slot="{ item }"
          arrows
          :items="toKillList"
          class="w-full max-w-xs mx-auto"
        >
        <div
          class="mx-auto w-[180px] h-[180px] rounded-full bg-primary text-4xl text-white flex justify-center items-center"
        >{{ item.content }}</div>
        </UCarousel>
      </div>
      <div class="flex flex-row justify-around">
        <UButton class="mx-4 my-4" @click="update">砍中啦！</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
const toKillList = useState("to-kill");

const currentIndex = ref(0);

const currentWord = computed(() => {
  return toKillList.value[currentIndex.value];
});

const update = async () => {
  try {
    await $fetch("/api/words", {
      immediate: false, // 设置为 false，不在组件加载时立即执行
      method: "PUT",
      body: {
        id: currentWord.value?.id,
      },
    });
  } catch (err) {
    console.log("err", err);
  }
};
</script>