<template>
  <div class="px-8 py-4 mx-auto">
    <h1 class="text-lg font-bold text-success">
      欢迎回来，童童！<span>{{ now }}</span>
    </h1>
    <span
      >截止目前为止，你已经kill了<span
        class="text-success font-bold text-2xl"
        >{{ hasKilled.length }}</span
      >个小怪兽，真棒！</span
    >
    <span>还有</span
    ><span class="text-danger font-bold text-2xl">{{ toKill.length }}</span
    >个小怪兽等待你去击败，加油呀！<UButton class="mx-4 my-4" to="/kill" @click="goToKill">开启战斗之旅！</UButton>

    <h1 class="mt-4">
      小怪兽成员表<span class="ml-4">{{ list?.length }}</span
      >个<UButton class="mx-4 my-4" to="/add">去添加</UButton>
    </h1>
    <!-- 表格部分 -->
    <UTable :data="toKill" :columns="columns" class="flex-1 mb-4" />
    <UTable :data="hasKilled" :columns="columns" class="flex-1" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import dayjs from "dayjs";

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

type Words = {
  id: string;
  conent: string;
  isKilled: boolean;
  addAt: string;
  killTimes: number;
};

const columns: TableColumn<Words>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => `${row.getValue("id")}`,
  },
  {
    accessorKey: "content",
    header: "小怪兽",
    cell: ({ row }) => `${row.getValue("content")}`,
  },
  {
    accessorKey: "needKillTimes",
    header: "状态",
    cell: ({ row }) => `${isKilled(row.getValue("needKillTimes"), row.getValue('killTimes'))? "已消灭" : "待消灭"}`,
  },
  {
    accessorKey: "addAt",
    header: "诞生时间",
    cell: ({ row }) => `${dayjs(row.getValue("addAt")).format("YYYY-MM-DD")}`,
  },
  {
    accessorKey: "killTimes",
    header: "被消灭次数",
    cell: ({ row }) => `${Number(row.getValue("killTimes"))}`,
  },
];

const goToKill = () => {
   useState("to-kill", () => toKill);
}

onMounted(() => {
  getList();
});
</script>
