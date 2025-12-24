import { prisma } from "../../libs/prisma"

export default defineEventHandler(async (event) => {
  // 查询数据库
  try {
    const words = await prisma.words.findMany({
      orderBy: {
        addAt: 'desc', // 按创建时间降序排列
      },
    })
    return {
      data: words
    }

  } catch (err) {
    console.log('err', err)
    return {
      error: true,
      message: "sorry, something is wrong",
    }
  }

})