import type { AjaxResponse } from 'uni-ajax'
import { useEventStore } from '@/store/event'
import { hasCustomKey } from '../custom'

export function toastError(err: Error | AjaxResponse) {
  console.log('toast err', err)
  if ((err as { errMsg: string })?.errMsg === 'request:fail abort') return Promise.reject(err)
  if (!hasCustomKey(err, 'silence')) useEventStore().errToast(err)
  return Promise.reject(err)
}

export async function navLogin(res: Error | AjaxResponse) {
  const errPromise = Promise.reject(res)
  if (res instanceof Error) return errPromise
  return useEventStore()
    .navLogin(res)
    .then(() => errPromise)
}
