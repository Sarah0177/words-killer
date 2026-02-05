import { prisma } from "../../libs/prisma"
import dayjs from "dayjs";
import { logger } from '../util/simple-logger'

const updateTask = async (params) => {
  let taskParams = {}
  const date = dayjs().format('YYYY-MM-DD')
  const task = await prisma.task.findUnique({
    where: {
      date
    }
  });
  
  if (!params.content) {
    const word = await prisma.words.findUnique({
      where: {
        id: params.id
      }
    });
    const completedWordsArr = (task?.completedWords && task.completedWords.split(',')) || []
    let temp = ''
    if (!completedWordsArr.includes(word.content)) {
      temp = task ? (task.completedWords + ',' + word.content) : word.content
    } else {
      temp = task ? task.completedWords : word.content
    }
    taskParams.date = date
    taskParams.completedWords = temp
    taskParams.plannedWords = task ? task.plannedWords : ''
    taskParams.isCompleted = task ? temp.split(',').length >= task.plannedNumber : false
  }
  
  // console.log('taskparams', taskParams)
  logger.info(JSON.stringify(taskParams))
  if (task) {
    await prisma.task.update({
      where: { date },
      data: {
        ...taskParams
      }
    })
    // console.log('task更新数据成功')
    logger.info('task更新数据成功')
  } else {
    await prisma.task.create({
      data: {
        ...taskParams
      }
    })
    logger.info('task创建数据成功')
    // console.log('task插入数据库成功')
  }
}

const updateWord = async (params) => {
  const wordParams = params.content ? {
    content: params.content
  } : {
    lastKillAt: new Date(),
    killTimes: { increment: 1 }
  }

  await prisma.words.update({
    where: { id: params.id },
    data: wordParams
  })
  logger.info('word 更新成功 id:' + params.id)
}

const resetWord = async (params) => {
  try {
    const ids = params.ids
    for(let i = 0; i < ids.length; i++) {
      await prisma.words.update({
        where: { id: Number(ids[i]) },
        data: {
          killTimes: 0,
          needKillTimes: 2 // 默认已经消灭过的单词，重置后需要消灭的次数为2
        }
      })
      logger.info('reset successfully')
    }
    
  } catch(err) {
    logger.error('reset word err:' + err)
    return {
      error: true,
      message: "sorry, something is wrong when reset:" + err,
    }
  }
}

export default defineEventHandler(async (event) => {
  // 更新数据库
  const params = await readBody(event)
  console.log('params', params)
  logger.info('params:' + JSON.stringify(params))

  if(params.reset) {
    try {
      await resetWord(params)
      return {
        code: '1',
        message: '重置成功'
      }
    } catch(err) {
      logger.error('err:' + err)
      return {
        error: true,
        message: "sorry, something is wrong when update:" + err,
      }
    }
  }

  if(!params.reset) {
    try {
      await updateWord(params)
      await updateTask(params)
      return {
        code: '1',
        message: '更新成功'
      }
    } catch (err) {
      logger.error('err:' + err)
      return {
        error: true,
        message: "sorry, something is wrong when update:" + err,
      }
    }
  }

})