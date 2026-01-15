import type { Preset } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { presetLegacyCompat } from '@unocss/preset-legacy-compat'
import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetApplet, presetRemRpx, transformerAttributify } from 'unocss-applet'

export default defineConfig({
  presets: [
    presetApplet(),
    presetRemRpx(),
    presetIcons({
      warn: true,
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        file: FileSystemIconLoader('./src/icons'),
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // 去除生成的颜色样式中的 in oklch 关键字，现在发现有些渐变色生成不符合预期
    presetLegacyCompat({ commaStyleColorFunction: true, legacyColorSpace: true }) as Preset,
  ],
  shortcuts: [
    {
      screen: 'w-screen h-screen',
      'flex-c': 'flex justify-center items-center',
      'flex-ac': 'flex justify-around items-center',
      'flex-bc': 'flex justify-between items-center',
      abtl: 'absolute top-0 left-0',
    },
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributify({
      prefixedOnly: true,
    }),
  ],
  theme: {
    colors: {},
  },
  preflights: [
    {
      getCSS: _context => '',
    },
  ],
})
