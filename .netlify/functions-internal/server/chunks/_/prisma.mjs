import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { PrismaPg } from '@prisma/adapter-pg';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as runtime from '@prisma/client/runtime/client';

const config = {
  "previewFeatures": [],
  "clientVersion": "7.1.0",
  "engineVersion": "ab635e6b9d606fa5c8fb8b1a7f909c3c3c1c98ba",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "./generated"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Words {\n  id            Int       @id @default(autoincrement())\n  content       String    @unique\n  isKilled      Boolean   @default(false)\n  addAt         DateTime  @default(now())\n  lastKillAt    DateTime?\n  killTimes     Int?      @default(0)\n  degree        String?   @default("easy")\n  needKillTimes Int?      @default(4)\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Words":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"content","kind":"scalar","type":"String"},{"name":"isKilled","kind":"scalar","type":"Boolean"},{"name":"addAt","kind":"scalar","type":"DateTime"},{"name":"lastKillAt","kind":"scalar","type":"DateTime"},{"name":"killTimes","kind":"scalar","type":"Int"},{"name":"degree","kind":"scalar","type":"String"},{"name":"needKillTimes","kind":"scalar","type":"Int"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import('node:buffer');
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import('@prisma/client/runtime/query_compiler_bg.postgresql.mjs'),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import('@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs');
    return await decodeBase64AsWasm(wasm);
  }
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

globalThis["__dirname"] = path.dirname(fileURLToPath(globalThis._importMeta_.url));
const PrismaClient = getPrismaClientClass();

var _a;
const prismaClientSingleton = () => {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
};
const globalForPrisma = globalThis;
const prisma = (_a = globalForPrisma.prisma) != null ? _a : prismaClientSingleton();

export { prisma as p };
//# sourceMappingURL=prisma.mjs.map
