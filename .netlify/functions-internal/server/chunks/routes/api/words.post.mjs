import { d as defineEventHandler, r as readBody, a as getRequestURL } from '../../_/nitro.mjs';
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

const words_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const url = getRequestURL(event);
  console.log("url", url);
  console.log("body======", body);
  const { list } = body;
  console.log("list", list);
  try {
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      await prisma.words.create({
        data: {
          content: list[i]
        }
      });
      console.log("\u63D2\u5165\u6570\u636E\u5E93\u6210\u529F");
    }
    return {
      received: true,
      data: "add successfully"
    };
  } catch (err) {
    console.log("err", err);
    return {
      error: true,
      message: "sorry, something is wrong"
    };
  }
});

export { words_post as default };
//# sourceMappingURL=words.post.mjs.map
