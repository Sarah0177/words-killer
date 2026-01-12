<template>
  <div class="p-6">
    <div v-if="canSort">
      <UButton class="mb-4 text-white bg-orange-400" color="warning" @click="sortHandler">根据血量值排序</UButton>
    </div>
    <div class="flex justify-between" v-if="list?.length">
      <span>共{{ list?.length || 0 }}只小怪兽</span>
      <span>编号：{{ activeIndex + 1 }}</span>
    </div>
    <h1 v-else>
      小怪兽们还在等着你去挑战呢！先去击杀一次吧~ <UButton class="mx-4 my-4" to="/">返回</UButton>
    </h1>
    <div class="w-full mt-6" v-if="list?.length">
      <div>
        <UCarousel
          v-slot="{ item }"
          arrows
          :items="list"
          :prev="{ onClick: onClickPrev }"
          :next="{ onClick: onClickNext }"
          class="w-full max-w-xs mx-auto"
        >
        <div>
          <div class="flex flex-row-reverse text-center justify-center py-2">
            <div v-for="v in item.needKillTimes" :key="v" class="w-4 h-4 rounded-lg mr-1 blood-drop" :class="v <= item.killTimes ? 'bg-gray-100': 'bg-red-600'"></div>
          </div>
          <div
            class="mx-auto w-[180px] h-[180px] rounded-full bg-orange-400 text-4xl text-white flex justify-center items-center"
          >{{ item.content }}
          </div>
        </div>
        </UCarousel>
         <div class="flex flex-row justify-around">
          <UButton class="mx-4 my-4 text-white bg-error-500" @click="killHandler">来一刀</UButton>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from 'vue-router'
import { updateWord } from "@/request/index.ts"
import { useWordsStore } from "@/stores/words"
import { storeToRefs } from "pinia";

const toast = useToast()
const route = useRoute()
const store = useWordsStore()

const { toLearnList, toReviewList } = storeToRefs(store)
let templist = route.query.type === 'review'? toReviewList : toLearnList;
let list = ref(templist.value)
const canSort = ref(route.query.type === 'review')
const sortType = ref('asc')

const activeIndex = ref(0)

function onClickPrev() {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}

const currentWord = computed(() => {
  return list.value[activeIndex.value];
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
    await updateWord({
      id: currentWord.value.id,
    })
  } catch (err) {
    console.log("err", err);
  }
};

const compareHandler = (a, b, type) => {
  console.log('compare', a.killTimes - b.killTimes)
  if (type === 'asc') {
    return a.killTimes - b.killTimes
  } else {
    return b.killTimes - a.killTimes
  }
}
const sortHandler = () => {
  const originalList = [...list.value]
  originalList.sort((a, b) => {
    return compareHandler(a, b, sortType.value)
  })
  list.value = originalList
  sortType.value = sortType.value === 'asc' ? 'des' : 'asc'
}

</script>

<style scoped>
.blood-drop {
  width: 15px;
  height: 20px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
}

</style>