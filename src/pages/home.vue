<template>
  <view>
    <button @click="navUser">跳转到用户页</button>
    <button @click="testApi()">网络请求</button>
    <button @click="testApi(true)">网络请求Full</button>
    <view un-bg="red/20">{{ res }}</view>
  </view>
</template>

<script setup lang="ts">
import type { AjaxRequestConfig } from 'uni-ajax'
import { Api } from '@/api'
import { navTo } from '@/router'

definePage({
  style: { navigationBarTitleText: '首页' },
  type: 'home',
})
const res = ref('')
const navUser = () => navTo('user?a=1')
function testApi(fullData = false) {
  // const config: AjaxRequestConfig = { params: { code: 654028207203 } }
  const config: AjaxRequestConfig = {}
  if (fullData) config.custom = ['fullData']
  Api.get('https://jsonplaceholder.typicode.com/posts/1', undefined, config).then(response => {
    res.value = JSON.stringify(response)
  })
}
</script>
