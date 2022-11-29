export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        public: {
            baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
        },
    },
})
