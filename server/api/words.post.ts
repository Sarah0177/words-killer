// import { getClientIP } from '../util'
import { prisma } from "../../libs/prisma"
export default defineEventHandler(async (event) => {
  // const ip = getClientIP(event)
  const body = await readBody(event)

  const url = getRequestURL(event)
  console.log('url', url)

  console.log('body======', body)
  const { list } = body
  // 插入数据库
 console.log('list', list)
  try {
    for (let i = 0; i< list.length; i++) {
      console.log(list[i])
      await prisma.words.create({
        data: {
         content: list[i]
        }
      })
      console.log('插入数据库成功')
    }
    return {
      received: true,
      data: "add successfully",
    }
    
  } catch (err) {
    console.log('err', err)
    return {
      error: true,
      message: "sorry, something is wrong",
    }
  }

})