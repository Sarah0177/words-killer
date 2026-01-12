import { defineStore } from 'pinia'

// 定义单词项的类型接口
export interface WordItem {
  id: number
  content: string
  isKilled: boolean
  needKillTimes: number
  killTimes: number
  // 其他属性...
  [key: string]: any
}

export const useWordsStore = defineStore('words', {
  state: () => {
    return {
      wordsList: [] as WordItem[]
    }
  },
  getters: {
    toLearnList: (state) => {
      return state.wordsList.filter((item: WordItem) => item.killTimes == 0);
    },
    hasKilledList: (state) => {
      return state.wordsList.filter((item: WordItem) => {
        return Number(item.needKillTimes) <= Number(item.killTimes)
      });
    },
    toKillList: (state) => {
      return state.wordsList.filter((item: WordItem) => {
        return Number(item.needKillTimes) > Number(item.killTimes)
      });
    },
    // 依赖其他的getter
    toReviewList(): WordItem[] {
      return this.toKillList.filter((item: WordItem) => item.killTimes != 0);
    },
  },
  actions: {
    updateWordsList(list: WordItem[]) {
      this.wordsList = list
    }
  }
})