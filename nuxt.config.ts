// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  ui: {
    fonts: false
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',
  ssr: true,
  app: {
    head: {
      titleTemplate: 'word-killer',
      title: 'word-killer',
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-cn'
      }
    },
    baseURL: '/word-killer/'
  },
  // 如果需要静态生成
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true
    },
    baseURL: '/word-killer/',
    routeRules: {
      '/**': { prerender: true }
    },
    experimental: {
      wasm: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
