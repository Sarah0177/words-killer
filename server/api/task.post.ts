import { prisma } from "../../libs/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('body======', body)
  const { plannedWords, date, completedWords } = body
  // 插入数据库
  let data = {
    plannedWords,
    date,
    completedWords
  }
  let params = {}
  Object.keys(data).forEach(key => {
    if (data[key]) {
      params[key] = data[key]
    }
  })

  console.log('params', params)
 
  try {
    const task = await prisma.task.findUnique({
      where: {
        date
      }
    });
    if (task) {
      await prisma.task.update({
        where: { date: params.date},
        data: params
      })
      console.log('更新数据成功')
    } else {
      await prisma.task.create({
        data: {
          ...params
        }
      })
      console.log('插入数据库成功')
    }
    return {
      received: true,
      data: "successfully",
    }

  } catch (err) {
    console.log('err', err)
    return {
      error: true,
      message: `sorry, something is wrong.${err}`,
    }
  }

})