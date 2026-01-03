<template>
  <div v-if="list?.length" class="p-4">
    <h1>
      共{{ list.length }}个小怪兽<UButton class="mx-4 my-4" to="/add"
        >去添加</UButton
      >
    </h1>
    <UTable :data="list" :columns="columns" class="flex-1 mb-4">
      <template #action-cell="{ row }">
        <UIcon
          name="i-lucide-edit"
          class="size-5 mr-4 text-green-400 cursor-pointer"
          @click="editHandler(row)"
        />

        <UIcon
          name="i-lucide-delete"
          class="size-5 text-red-400 cursor-pointer"
          @click="deleteHandler(row)"
        />
      </template>
    </UTable>
    <!-- 修改弹框 -->
     <UModal :open="isEditModalOpen" :overlay="false" title="修改">
      <template #body>
        <UInput placeholder="" class="w-full" v-model="row.content" />
        <div class="flex justify-end">
          <UButton
            class="my-4"
            color="neutral"
            variant="outline"
            @click="isEditModalOpen = false"
            >取消</UButton
          >
          <UButton class="ml-4 my-4" @click="editConfirm()">确认</UButton>
        </div>
      </template>
    </UModal>
    <!-- 删除弹框 -->
    <UModal :open="isDeleteModalOpen" :overlay="false" title="删除">
      <template #body>
        <h6>确认要删除{{ row?.content }}吗？</h6>
        <div class="flex justify-end">
          <UButton
            class="my-4"
            color="neutral"
            variant="outline"
            @click="isDeleteModalOpen = false"
            >取消</UButton
          >
          <UButton class="ml-4 my-4" @click="deleteConfirm()">确认</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import { ref } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { deleteWord, updateWord } from "@/request/index.ts"

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
    cell: ({ row }) =>
      `${
        isKilled(row.getValue("needKillTimes"), row.getValue("killTimes"))
          ? "已消灭"
          : "待消灭"
      }`,
  },
  // {
  //   accessorKey: "addAt",
  //   header: "诞生时间",
  //   cell: ({ row }) => `${dayjs(row.getValue("addAt")).format("YYYY-MM-DD")}`,
  // },
  {
    accessorKey: "killTimes",
    header: "被消灭次数",
    cell: ({ row }) => `${Number(row.getValue("killTimes"))}`,
  },
  {
    header: "操作",
    id: "action",
  },
];

const route = useRoute();
console.log(route.query);
const list = route.query.id ? useState("to-kill-list") : useState("to-list");

const isDeleteModalOpen = ref(false);
const isEditModalOpen = ref(false);

const row = ref(null);
const emit = defineEmits<{ close: [boolean] }>();

const isKilled = (needKillTimes, killTimes) => {
  console.log(needKillTimes, killTimes);
  return Number(needKillTimes) <= Number(killTimes);
};

const editHandler = (item:any) => {
  row.value = item.original
  isEditModalOpen.value = true
};

const editConfirm = async () => {
  console.log('edit', row.value)
  isEditModalOpen.value = false
  try {
    await updateWord(row.value)
  } catch(err) {
    console.log('err', err)
  }
}

defineShortcuts({
  o: () => (isDeleteModalOpen.value = !isDeleteModalOpen.value),
});

const deleteHandler = (item) => {
  row.value = item.original;
  isDeleteModalOpen.value = true;
};

const deleteConfirm = async () => {
  console.log("delete", row.value);
  isDeleteModalOpen.value = !isDeleteModalOpen.value;
  try {
    await deleteWord({id: row.id})
    // 列表里面删除数据
    list.value = list.value.filter(item => item.id !== row.value.id)
  } catch(err) {
    console.log('err', err)
  }
};
</script>