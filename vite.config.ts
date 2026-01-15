import type { PageContext } from '@uni-helper/vite-plugin-uni-pages'
import process from 'node:process'
import Uni from '@uni-helper/plugin-uni'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import { VitePluginUniManifest } from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniKuRoot from '@uni-ku/root'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'
import uniPolyfill from 'vite-plugin-uni-polyfill'
import openDevTools from './scripts/devtool'
import { buildTime } from './scripts/time'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('env', mode, env)
  return {
    plugins: [
      uniPolyfill(),
      VitePluginUniManifest(),
      UniPages({
        dts: 'types/uni-pages.d.ts',
        exclude: ['**/comp/**/*.*'],
        dir: 'src/pages',
        outDir: 'src',
        onBeforeWriteFile(ctx: PageContext) {
          ctx.pages.forEach(_page => {
            // console.log('pppp', page.path, page.getPageMeta())
          })
        },
      }),
      UniKuRoot(),
      Uni(),
      UnoCSS(),
      visualizer({ filename: 'generated/stats.html' }),
      Inspect({
        build: env.VITE_USER_NODE_ENV === 'production',
        outputDir: 'generated/.vite-inspect',
      }),
      autoImport({
        imports: ['vue', 'pinia', uniuseAutoImports()],
        dts: 'types/auto-import.d.ts',
      }),
      buildTime,
      openDevTools(),
      {
        name: 'fixUnocss',
        generateBundle: {
          order: 'post',
          handler(_, bundle) {
            const entity = Object.entries(bundle).find(([_, v]) => v.fileName === 'app.css' && v.type === 'asset')
            if (!entity) return
            entity[1].fileName = 'app.wxss'
          },
        },
      },
    ],
    resolve: {
      alias: { '@': '/src/' },
    },
    // https://github.com/uni-helper/uni-promises?tab=readme-ov-file#构建
    build: { target: 'es6', cssTarget: 'chrome61' },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  }
})
