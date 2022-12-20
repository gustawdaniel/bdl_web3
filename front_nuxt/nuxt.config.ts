import { resolve } from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import tailwindTypography from '@tailwindcss/typography'


export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        public: {
            baseUrl: process.env.NUXT_PUBLIC_BASE_URL ?? 'https://strapi.admeal.xyz',
        },
    },
    modules: ['@nuxtjs/tailwindcss'],
    hooks: {
        // for build mode
        'vite:extendConfig'(clientConfig, { isClient }) {
            if (isClient && process.env.NODE_ENV === 'production') {
                clientConfig.resolve.alias.web3 = resolve(
                    __dirname,
                    './node_modules/web3/dist/web3.min.js'
                )
                clientConfig.resolve.alias['@walletconnect/web3-provider'] = resolve(
                    __dirname,
                    './node_modules/@walletconnect/web3-provider/dist/umd/index.min.js'
                )
            }
        },
    },
    vite: {
        // in dev mode, vite use `esbuild`,so we should add `node polyfill`
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true,
                    }),
                    NodeModulesPolyfillPlugin()
                ],
            },
        },
    },
    tailwindcss: {
        config: {
            plugins: [tailwindTypography]
        }
    }
})
