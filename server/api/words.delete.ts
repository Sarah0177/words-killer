import { prisma } from "../../libs/prisma"

export default defineEventHandler(async (event) => {
  // 更新数据库
  const params = await readBody(event)
  console.log('params', params)
  try {
    await prisma.words.delete({
      where: { id: params.id},
    })
    return {
      code: '1',
      message: '删除成功'
    }

  } catch (err) {
    console.log('err', err)
    return {
      error: true,
      message: "sorry, something is wrong when update",
    }
  }

})