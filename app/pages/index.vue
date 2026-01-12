<template>
  <div class="px-8 py-4 mx-auto">
    <h1 class="text-lg font-bold text-center mb-8 mt-4">
      {{ now }} <span class="px-1 text-white text-sm bg-green-400 rounded-sm" @click="signIn">打卡</span>
    </h1>
    <h1 class="text-lg  text-center text-success my-8">
      欢迎回来升级打怪，童童^_^
    </h1>
    <div class="mx-auto">
      <span
        >截止目前为止，小怪兽王国成员数量已经增加到<span class="">{{ wordsList?.length }}</span>个。你已经kill了<span
          class="text-success font-bold text-2xl"
          >{{ hasKilledList?.length }}</span
        >个小怪兽，真棒！</span
      >
      <span>还有</span
      ><span class="text-danger font-bold text-2xl">{{ toKillList?.length }}</span
      >个小怪兽等待你去击败，加油呀！
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8 max-w-4xl">
      
      <div class="learn p-2 border-1 rounded-sm border-red-500 bg-red-400 text-white" @click="goToLearn">
        <div class="text-lg font-bold">待击杀</div>
        <div>{{ toLearnList?.length }}</div>
      </div>
      <div class="review p-2 border-1 rounded-sm border-orange-500 bg-orange-500 text-white" @click="goToReview">
        <div class="text-lg font-bold">待补刀</div>
        <div>{{ toReviewList?.length }}</div>
      </div>
      <div class="review p-2 border-1 rounded-sm border-green-500 bg-green-500 text-white" @click="goToList('killed')">
        <div class="text-lg font-bold">已消灭</div>
        <div>{{ hasKilledList?.length }}</div>
      </div>
      <div class="review p-2 border-1 rounded-sm border-gray-300 bg-gray-300" @click="goToList('')">
        <div class="text-lg font-bold">全部</div>
        <div>{{ wordsList?.length }}</div>
      </div>
    </div>
    <div class="max-w-lg my-8">
      <UButton class="my-4 w-full text-center" @click="goToList('')">查看小怪兽列表</UButton>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, h, resolveComponent } from "vue";
import { useWordsStore } from "@/stores/words";
import { storeToRefs } from 'pinia'

import dayjs from "dayjs";
import { useRouter } from 'vue-router'
import { queryWords } from "@/request/index.ts"

const router = useRouter()
const store = useWordsStore()
const { wordsList, toKillList, toLearnList, toReviewList, hasKilledList } = storeToRefs(store)

const now = dayjs().format("YYYY-MM-DD");

const getList = async () => {
  // 调用接口
  try {
    const { data } = await queryWords()
    // 更新store
    store.updateWordsList(data)
  } catch (err) {
    console.log("err", err);
  }
};

const goToReview = () => {
   router.push({
    path: '/kill',
    query: {
      type: 'review'
    }
   })
}

const goToLearn = () => {
  router.push({
    path: '/kill',
    query: {
      type: 'learn'
    }
   })
}

const goToList = (type) => {
  router.push({
    path: '/list',
    query: {
      type
    }
  })
}

const signIn = () => {
  router.push({
    path: '/sign',
  })
}

onMounted(() => {
  getList();
});
</script>
