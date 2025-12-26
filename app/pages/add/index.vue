<template>
  <div class="px-8 py-4 mx-auto lg:w-4xl md:w-2xl">
    <UTextarea
      class="w-full"
      autoresize
      v-model="addVal"
      placeholder="请输入要添加的单词，逗号隔开"
      :rows="4"
    />
    <div>
      <UButton class="mr-4 my-4" to="/" @click="add">确认</UButton>
      <UButton class="mx-4 my-4" color="error" @click="clear">清空</UButton>
    </div>
    <div>{{ addList.join(" / ") }}</div>
    <div v-if="addList.length > 0">共输入{{ addList.length }}个单词</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";

const addVal = ref("");

const addList = computed(() => {
  return addVal.value ? addVal.value.split(",").filter(Boolean) : [];
});

const add = async () => {
  // 调用接口
  try {
    const { data, pending, error } = await $fetch("/word-killer/api/words", {
      immediate: false, // 设置为 false，不在组件加载时立即执行
      method: "POST",
      body: {
        list: addList.value
      },
    })
    useState("add-state", () => addList);
  } catch(err) {
    console.log('err', err)
  }
};

const clear = () => {
  addVal.value = "";
};


</script>
