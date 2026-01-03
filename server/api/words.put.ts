import { prisma } from "../../libs/prisma"

export default defineEventHandler(async (event) => {
  // 更新数据库
  const params = await readBody(event)
  console.log('params', params)

  const finalParams = params.content ? {
    content: params.content
  } : {
    lastKillAt: new Date(),
    killTimes: { increment: 1 }
  }
  try {
    await prisma.words.update({
      where: { id: params.id},
      data: finalParams
    })
    return {
      code: '1',
      message: '更新成功'
    }

  } catch (err) {
    console.log('err', err)
    return {
      error: true,
      message: "sorry, something is wrong when update",
    }
  }

})