<template>
  <div v-if="list?.length" class="p-4">
    <h1>共{{ list.length  }}个小怪兽<UButton class="mx-4 my-4" to="/add">去添加</UButton></h1>
    <UTable :data="list" :columns="columns" class="flex-1 mb-4" />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import { ref } from "vue";
import { useRoute } from 'vue-router'
import dayjs from "dayjs";

type Words = {
  id: string;
  conent: string;
  isKilled: boolean;
  addAt: string;
  killTimes: number;
};

const route = useRoute()
console.log(route.query)
const list = route.query.id ? useState('to-kill-list') : useState("to-list")

const isKilled = (needKillTimes, killTimes) => {
  console.log(needKillTimes, killTimes);
  return Number(needKillTimes) <= Number(killTimes);
};


// const list = useState("to-list") || ref([]);
// const toKill = useState('to-kill') || ref([])
// const hasKill = useState('to-hasKilled') || ref([])

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
    cell: ({ row }) =>
      `${
        isKilled(row.getValue("needKillTimes"), row.getValue("killTimes"))
          ? "已消灭"
          : "待消灭"
      }`,
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
</script>