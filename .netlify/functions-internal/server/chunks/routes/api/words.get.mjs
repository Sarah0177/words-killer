import { d as defineEventHandler } from '../../_/nitro.mjs';
import { p as prisma } from '../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';
import '@prisma/adapter-pg';
import 'node:url';
import '@prisma/client/runtime/client';

const words_get = defineEventHandler(async (event) => {
  try {
    const words = await prisma.words.findMany({
      orderBy: {
        addAt: "desc"
        // 按创建时间降序排列
      }
    });
    return {
      data: words
    };
  } catch (err) {
    console.log("err", err);
    return {
      error: true,
      message: "sorry, something is wrong"
    };
  }
});

export { words_get as default };
//# sourceMappingURL=words.get.mjs.map
