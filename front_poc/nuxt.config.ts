// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        public: {
            apiUrl: process.env.NUXT_PUBLIC_API_URL ?? 'default value',
            contractAddress: process.env.NUXT_PUBLIC_CONTRACT_ADDRESS ?? 'default value',
        }
    },
})
