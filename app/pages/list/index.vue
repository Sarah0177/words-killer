<template>
  <div v-if="list?.length" class="px-4 flex flex-col h-[calc(100vh-var(--ui-header-height))]">
    <h1>
      共{{ list.length }}个小怪兽<UButton class="mx-4 my-4" to="/add">去添加</UButton>
    </h1>
    <div class="flex-1 flex flex-col h-[500px]">
      <div class="flex pt-1 pb-4 border-b border-accented">
        <UInput :model-value="table?.tableApi?.getColumn('content')?.getFilterValue() as string" class="max-w-sm"
          placeholder="搜索小怪兽" @update:model-value="table?.tableApi?.getColumn('content')?.setFilterValue($event)" />
        <UButton class="mx-4" color="error" v-if="isFromKilled" @click="resetAllHandler">一键重置</UButton>
      </div>
      <UTable 
        sticky 
        ref="table" 
        :ui="{ wrapper: 'flex-1 max-h-[400px] overflow-y-auto'}" 
        v-model:column-filters="columnFilters" 
        :data="list" 
        :columns="columns" 
        class="flex-1 mb-4"
      >
        <template #action-cell="{ row }">
          <UIcon name="i-lucide-edit" class="size-5 mr-3 text-green-400 cursor-pointer" @click="editHandler(row)" />

          <UIcon name="i-lucide-delete" class="size-5 mr-3 text-red-400 cursor-pointer" @click="deleteHandler(row)" />

          <UIcon name="i-lucide-brush-cleaning" class="size-5 text-orange-400 cursor-pointer"
            @click="resetHandler(row)" />
        </template>
      </UTable>
    </div>
    <!-- 修改弹框 -->
    <UModal :open="isEditModalOpen" :overlay="false" title="修改">
      <template #body>
        <UInput placeholder="" class="w-full" v-model="row.content" />
        <div class="flex justify-end">
          <UButton class="my-4" color="neutral" variant="outline" @click="isEditModalOpen = false">取消</UButton>
          <UButton class="ml-4 my-4" @click="editConfirm()">确认</UButton>
        </div>
      </template>
    </UModal>
    <!-- 删除弹框 -->
    <UModal :open="isDeleteModalOpen" :overlay="false" title="删除">
      <template #body>
        <h6>确认要删除{{ row?.content }}吗？</h6>
        <div class="flex justify-end">
          <UButton class="my-4" color="neutral" variant="outline" @click="isDeleteModalOpen = false">取消</UButton>
          <UButton class="ml-4 my-4" @click="deleteConfirm(row)">确认</UButton>
        </div>
      </template>
    </UModal>
    <!-- 一键重置弹框 -->
    <UModal :open="isResetModalOpen" :overlay="false" title="重置">
      <template #body>
        <h6>确认要将所有的小怪兽恢复吗？恢复后的小怪兽将要被重新击杀2次才可被消灭</h6>
        <div class="flex justify-end">
          <UButton class="my-4" color="neutral" variant="outline" @click="isResetModalOpen = false">取消</UButton>
          <UButton class="ml-4 my-4" @click="resetConfirm()">确认</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import { ref, useTemplateRef } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from 'pinia'
import { useWordsStore } from "@/stores/words"
import { deleteWord, updateWord } from "@/request/index.ts"
import { isKilled } from "@/utils/index.ts"
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
    header: "Monster",
    cell: ({ row }) => `${row.getValue("content")}`,
  },
  {
    accessorKey: "needKillTimes",
    header: "Status",
    cell: ({ row }) =>
      `${isKilled(row.getValue("needKillTimes"), row.getValue("killTimes"))
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
    header: "Times",
    // cell: ({ row }) => `${Number(row.getValue("killTimes"))}`,
  },
  {
    header: "Action",
    id: "action",
  },
];

const table = useTemplateRef('table')
const columnFilters = ref([
  {
    id: 'content',
    value: ''
  }
])

const route = useRoute();
const store = useWordsStore()
const { wordsList, hasKilledList } = storeToRefs(store)
const list = ref(initValue())
const isFromKilled = ref(route.query.type === 'killed')

function initValue() {
  const type = route.query.type
  if (type === 'killed') {
    return hasKilledList.value
  } else if (type === '') {
    return wordsList.value
  }
}

const isDeleteModalOpen = ref(false);
const isResetModalOpen = ref(false);
const isEditModalOpen = ref(false);

const row = ref(null);
const emit = defineEmits<{ close: [boolean] }>();

const editHandler = (item: any) => {
  row.value = item.original
  isEditModalOpen.value = true
};

const editConfirm = async () => {
  isEditModalOpen.value = false
  try {
    await updateWord(row.value)
  } catch (err) {
    console.log('err', err)
  }
}

const deleteHandler = (item) => {
  row.value = item.original;
  isDeleteModalOpen.value = true;
};

const deleteConfirm = async (row) => {
  console.log("delete", row);
  isDeleteModalOpen.value = !isDeleteModalOpen.value;
  try {
    await deleteWord({ id: row.id })
    // 列表里面删除数据
    list.value = list.value.filter(item => item.id !== row.id)
    // tableKey.value ++
  } catch (err) {
    console.log('err', err)
  }
};

const resetKilledWord = async (ids) => {
  try {
    console.log('ids', ids)
    const { data } = await updateWord({
      ids,
      reset: true
    })
    return data
  } catch (err) {
    console.log('err', err)
  }
}

// 重置某个单词
const resetHandler = (item) => {
  console.log('reset handler', item)
  resetKilledWord([item.original.id])
}

// 重置所有已消灭的单词
const resetAll = () => {
  const ids = list.value?.map(item => item.id) || []
  resetKilledWord(ids)
}

const resetConfirm = () => {
  isResetModalOpen.value = !isResetModalOpen.value;
  resetAll()
}

const resetAllHandler = () => {
  isResetModalOpen.value = !isResetModalOpen.value;
}
</script>