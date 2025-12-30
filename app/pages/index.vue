<template>
  <div class="px-8 py-4 mx-auto">
    <h1 class="text-lg font-bold text-center mb-8 mt-4">{{ now }}</h1>
    <h1 class="text-lg  text-center text-success my-8">
      欢迎回来升级打怪，童童！<span></span>
    </h1>
    <div class="mx-auto">
      <span
        >截止目前为止，小怪兽王国成员数量已经增加到<span class="">{{ list?.length }}</span>个。你已经kill了<span
          class="text-success font-bold text-2xl"
          >{{ hasKilled?.length }}</span
        >个小怪兽，真棒！</span
      >
      <span>还有</span
      ><span class="text-danger font-bold text-2xl">{{ toKill?.length }}</span
      >个小怪兽等待你去击败，加油呀！
    </div>

    <!-- <h1 class="mt-4">
      小怪兽成员表<span class="ml-4">{{ list?.length }}</span
      >个<UButton class="mx-4 my-4" to="/add">去添加</UButton>
    </h1> -->
    
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-4xl">
      
      <div class="learn p-2 border-1 rounded-sm border-green-500" @click="goToLearn">
        <div class="text-lg font-bold">待击杀</div>
        <div>{{ toLearn?.length }}</div>
      </div>
      <div class="review p-2 border-1 rounded-sm border-green-500" @click="goToReview">
        <div class="text-lg font-bold">待补刀</div>
        <div>{{ toReview?.length }}</div>
      </div>
    </div>
    <div class="max-w-lg my-8">
      <UButton class="my-4 w-full" @click="goToList">查看小怪兽列表</UButton>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, h, resolveComponent } from "vue";

import dayjs from "dayjs";
import { useRouter } from 'vue-router'

const router = useRouter()
const now = dayjs().format("YYYY-MM-DD");
const list = ref([]);

const isKilled = (needKillTimes, killTimes) => {
  console.log(needKillTimes, killTimes)
  return Number(needKillTimes) <= Number(killTimes)
}

const hasKilled = computed(() => {
  return list.value?.filter((item) => isKilled(item.needKillTimes, item.killTimes));
});
const toKill = computed(() => {
  return list.value?.filter((item) => !isKilled(item.needKillTimes, item.killTimes));
});

const toLearn = computed(() => {
  return list.value?.filter((item) => item.killTimes == 0);
});

const toReview = computed(() => {
  return list.value?.filter((item) => item.killTimes != 0 && !isKilled(item.needKillTimes, item.killTimes));
});



const getList = async () => {
  // 调用接口
  try {
    const { data, pending, error } = await $fetch("/api/words", {
      immediate: false, // 设置为 false，不在组件加载时立即执行
      method: "GET",
    });
    console.log("getlist", data);
    list.value = data;
  } catch (err) {
    console.log("err", err);
  }
};



const goToReview = () => {
   useState("to-review", () => toReview);
   console.log('toReview', toReview)
   router.push({
    path: '/kill',
    query: {
      id: 'review'
    }
   })
}

const goToLearn = () => {
  useState("to-learn", () => toLearn);
  console.log('toLearn', toLearn)
  router.push({
    path: '/kill',
    query: {
      id: 'learn'
    }
   })
}

const goToList = () => {
  useState("to-list", () => list);
  router.push({
    path: '/list',
   })
}

onMounted(() => {
  getList();
});
</script>
