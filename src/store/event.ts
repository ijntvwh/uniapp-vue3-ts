import type { AjaxResponse } from 'uni-ajax'
import type { BaseResult } from '@/api/interceptors/response'
import { defineStore } from 'pinia'
import { hasCustomKey } from '@/api/custom'
import { isUnAuthorized } from '@/api/interceptors/response'
import { navTo } from '@/router'
import { showToast } from '@/utils/uni'
import { useAppStore } from './app'

export const ERROR_OVERWRITE: Record<string, string> = {
  // 重写错误代码对应的toast消息内容
  '003000': 'xx的Token',
}
export const useEventStore = defineStore('event', {
  state: () => ({}),
  actions: {
    errToast(err: Error | any) {
      const isError = err instanceof Error
      const title = isError ? err.message : ERROR_OVERWRITE[err.data?.code || ''] || err.data?.msg || '系统错误'
      setTimeout(() => showToast(title), 100)
    },
    async navLogin(res: AjaxResponse<BaseResult>) {
      if (isUnAuthorized(res?.data)) {
        useAppStore().updateToken()
        if (!hasCustomKey(res, 'anon')) navTo('login')
      }
    },
  },
})
