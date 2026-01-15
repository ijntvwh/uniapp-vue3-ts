import type { AjaxResponse, ReqCustomKey } from 'uni-ajax'

export function hasCustomKey(res: Error | AjaxResponse, key: ReqCustomKey): boolean | undefined {
  if (res instanceof Error) return false
  return res?.config?.custom?.includes(key)
}
