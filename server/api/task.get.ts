import { prisma } from "../../libs/prisma"

const queryAllTask = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      date: 'desc', // 按创建时间降序排列
    },
  })
  return {
    data: tasks
  }
}

const queryTask = async (date) => {
  const task = await prisma.task.findUnique({
    where: {
      date, // 按创建时间降序排列
    }
  })
  let hasCompleted = false
  console.log('task', task)
  if (task) {
    hasCompleted = task.completedWords.split(',').length >= task.plannedNumber
  }
  if (hasCompleted) {
    // 更新task数据库
    await prisma.task.update({
      where: { date },
      data: {
        isCompleted: hasCompleted
      }
    })
  }
  return {
    data: task,
  }
}

export default defineEventHandler(async (event) => {
  // 查询数据库
  const request = getRequestURL(event)
  const date = request.searchParams.get('date')
  console.log('params', date)

  try {
    if (!date) {
      return queryAllTask()
    } else {
      return queryTask(date)
    }

  } catch (err) {
    console.log('err', err)
    return {
      error: true,
      message: "sorry, something is wrong",
    }
  }
})