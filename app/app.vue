<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
console.log('path', router)
const pageTitle = computed(() => router.currentRoute.value.path === '/' ? 'Words-killer' : '返回')

const toaster = {
  max: 1,
  position:'top-center'
}

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

const title = "Words Killer";
const description = "Start your jouney to smash the words.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <!-- <UToast> -->
    <UApp :toaster="toaster">
      <UHeader>
        <template #title>
          <span>{{ pageTitle }}</span>
        </template>
        <!-- <template #right>
          <UColorModeButton />
        </template> -->
      </UHeader>
  
      <UMain>
        <NuxtPage />
      </UMain>
    </UApp>
  <!-- </UToast> -->
</template>
