import { d as defineEventHandler, r as readBody } from '../../_/nitro.mjs';
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

const words_put = defineEventHandler(async (event) => {
  const params = await readBody(event);
  console.log("params", params);
  try {
    await prisma.words.update({
      where: { id: params.id },
      data: {
        lastKillAt: /* @__PURE__ */ new Date(),
        killTimes: { increment: 1 }
      }
    });
    return {
      code: "1",
      message: "\u66F4\u65B0\u6210\u529F"
    };
  } catch (err) {
    console.log("err", err);
    return {
      error: true,
      message: "sorry, something is wrong when update"
    };
  }
});

export { words_put as default };
//# sourceMappingURL=words.put.mjs.map
