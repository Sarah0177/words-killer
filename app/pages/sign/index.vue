<template>
  <div class="w-full">
    <UCalendar
      v-model="date"
      class="max-w-lg p-2 mx-auto"
      :max-value="date"
      :key="refreshKey"
    >
      <template #day="{ day }">
        <div
          class="w-8 h-8 rounded-full flex justify-center items-center"
          :class="getClassByStatus(day.toDate('UTC'))"
          @click="selectDate(day)"
        >
          {{ day.day }}
        </div>
      </template>
    </UCalendar>
    <div class="px-4 text-center">
      <UButton
        class="flex justify-center mx-4 my-4 max-w-[400px] w-full mx-auto text-center"
        @click="signIn"
        >打卡</UButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {
  CalendarDate
} from "@internationalized/date";
import { ref } from "vue";
import { queryWords, queryTask } from "@/request/index.ts";
import { getCurrentWeekInfo } from "@/utils/date.ts";
const toast = useToast()

const { $modal } = useNuxtApp()

// 设置日期样式
function getClassByStatus(date: Date) {
  const isAfterToday = dayjs(date).isAfter(today.value, ["day"]);
  if (isAfterToday) {
    return "";
  } else {
    const hasCompleted = isCompleteTask(dayjs(date).format('YYYY-MM-DD'));
    return hasCompleted ? "bg-green-400 text-white" : "bg-gray-200";
  }
}

const today = dayjs();
const date = ref(new CalendarDate(today.year(), today.month(), today.date()));

const signInList = ref(null);
const selectedDate = ref(today.format('YYYY-MM-DD'))
const refreshKey = ref(0)

const selectDate = (day) => {
  selectedDate.value = day
}
// 打卡
const signIn = async () => {
  if (!isCompleteTask(selectedDate.value)) {
    toast.add({
      title: '先去完成任务再打卡吧',
      icon: 'i-lucide-biceps-flexed',
    })
    return;
  }
  toast.add({
    title: '打卡成功',
    icon: 'i-lucide-biceps-flexed',
  })
};

function isCompleteTask (date = dayjs().format("YYYY-MM-DD")) {
  const task = (signInList.value && signInList.value.find((item) => item.date === date)) || {};
  return task.isCompleted
}

const querySignInStatus = async () => {
  try {
    const { data } = await queryTask();
    signInList.value = data;
    refreshKey.value ++
  } catch (err) {
    console.log(err);
  }
};

querySignInStatus();

async function setTask() {
  try {
    const isoWeekStart = getCurrentWeekInfo().isoWeekStart;
    const isoWeekEnd = getCurrentWeekInfo().isoWeekEnd;
    // 1. 获取单词列表（3个复习的，2个新的）
    const { data } = await queryWords();
    // 获取当前任务周期内的日期（1周，或者1个月）
  } catch (err) {
    console.log("err", err);
  }
}
</script>