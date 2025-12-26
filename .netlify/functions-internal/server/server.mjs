export { default } from "./main.mjs";
export const config = {
  name: "server handler",
  generator: "nuxt@4.2.2",
  path: "/*",
  nodeBundler: "none",
  includedFiles: ["**"],
  excludedPath: ["/.netlify/*","/word-killer/_nuxt/builds/meta/*","/word-killer/_nuxt/builds/*","/word-killer/_nuxt/*"],
  preferStatic: true,
};