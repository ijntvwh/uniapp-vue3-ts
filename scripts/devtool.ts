import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

/**
 * 打开开发者工具
 */
function _openDevTools() {
  const { UNI_PLATFORM } = process.env //  mp-weixin, mp-alipay
  const uniPlatformText = '微信小程序'
  const projectPath = path.resolve(process.cwd(), `dist/dev/${UNI_PLATFORM}`)
  if (!fs.existsSync(projectPath)) {
    console.log(`❌ ${uniPlatformText}构建目录不存在:`, projectPath)
    return
  }

  console.log(UNI_PLATFORM)
  console.log(`🚀 正在打开${uniPlatformText}开发者工具...`)
  const command = `/Applications/wechatwebdevtools.app/Contents/MacOS/cli open --project "${projectPath}"`

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`❌ 打开${uniPlatformText}开发者工具失败:`, error.message)
      console.log(`💡 请确保${uniPlatformText}开发者工具服务端口已启用`)
      console.log(`💡 可以手动打开${uniPlatformText}开发者工具并导入项目:`, projectPath)
      return
    }

    if (stderr) {
      console.log('⚠️ 警告:', stderr)
    }

    console.log(`✅ ${uniPlatformText}开发者工具已打开`)

    if (stdout) {
      console.log(stdout)
    }
  })
}

export default function openDevTools() {
  // 首次构建标记
  let isFirstBuild = true

  return {
    name: 'uni-devtools',
    writeBundle() {
      if (isFirstBuild && process.env.UNI_PLATFORM?.includes('mp')) {
        isFirstBuild = false
        _openDevTools()
      }
    },
  }
}
