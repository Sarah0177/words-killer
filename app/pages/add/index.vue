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
      <UButton class="mr-4 my-4" @click="add">确认</UButton>
      <UButton class="mx-4 my-4" color="error" @click="clear">清空</UButton>
    </div>
    <div>{{ addList.join(" / ") }}</div>
    <div v-if="addList.length > 0">共输入{{ addList.length }}个单词</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'
import { addWords } from "@/request/index.ts"

const router = useRouter()
const addVal = ref("");

const addList = computed(() => {
  const list = addVal.value ? addVal.value.split(",").filter(Boolean) : []
  return list.map(item => item.trim())
});

const add = async () => {
  // 调用接口
  try {
    await addWords({
      list: addList.value
    })
    router.push('/')
  } catch(err) {
    console.log('err', err)
  }
};

const clear = () => {
  addVal.value = "";
};


</script>
