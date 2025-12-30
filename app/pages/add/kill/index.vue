<template>
  <div class="p-6">
    <h1 v-if="toKillList?.length">
      共{{ toKillList?.length || 0 }}只小怪兽
      <!-- <UButton class="mx-4 my-4" color="neutral" variant="outline" to="/list" @click="goToList">查看列表</UButton> -->
    </h1>
    <h1 v-else>
      小怪兽们还在等着你去挑战呢！先击杀一次再来补刀吧~ <UButton class="mx-4 my-4" to="/">返回</UButton>
    </h1>
    <div class="w-full mt-6" v-if="toKillList?.length">
      <div>
        <UCarousel
          v-slot="{ item }"
          arrows
          :items="toKillList"
          :prev="{ onClick: onClickPrev }"
          :next="{ onClick: onClickNext }"
          class="w-full max-w-xs mx-auto"
        >
        <div>
          <div class="flex flex-row-reverse text-center justify-center py-2">
            <div v-for="v in item.needKillTimes" :key="item" class="w-4 h-4 rounded-lg mr-1" :class="v <= item.killTimes ? 'bg-gray-100': 'bg-red-600'"></div>
          </div>
          <div
            class="mx-auto w-[180px] h-[180px] rounded-full bg-error-400 text-4xl text-white flex justify-center items-center"
          >{{ item.content }}
          </div>
        </div>
        </UCarousel>
         <div class="flex flex-row justify-around">
          <UButton class="mx-4 my-4 text-white bg-error-300" color="error" @click="killHandler" variant="outline">来一刀</UButton>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from 'vue-router'
const toast = useToast()
const router = useRouter()
const route = useRoute()
console.log('kill page route', route.query)
const toKillList = route.query.id === 'review'? useState("to-review") : useState("to-learn");

const activeIndex = ref(0)

function onClickPrev(item) {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}

console.log("toKillList", toKillList.value);
const currentWord = computed(() => {
  return toKillList.value[activeIndex.value];
});

definePageMeta({
  // key: (route) => route.fullPath
  // // 或者更精细的控制
  title: (route) => `${route.query.id || ''}`
})

const killHandler = () => {
  toast.add({
    title: '恭喜你，小怪物被你砍中了~',
    icon: 'i-lucide-biceps-flexed',
    progress: false,
    duration: 1000
  })
  update()
}

const update = async () => {
  console.log('currentword', currentWord.value)
  try {
    await $fetch("/api/words", {
      immediate: false, // 设置为 false，不在组件加载时立即执行
      method: "PUT",
      body: {
        id: currentWord.value.id,
      },
    });
  } catch (err) {
    console.log("err", err);
  }
};

const goToList = () => {
  useState("to-kill-list", () => toKillList);
   router.replace({
    path: '/list',
    query: {
      id: 'learn'
    }
   })
}
</script>