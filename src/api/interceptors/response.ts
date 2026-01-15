import type { AjaxResponse } from 'uni-ajax'
import { hasCustomKey } from '../custom'

// TODO 通用响应判断
export interface BaseResult<T = any> {
  data: T
  code: number
  msg: string
}
const checkCustomSuccess = (data: BaseResult) => data?.code === 200
export const isUnAuthorized = (data: BaseResult) => data?.code === 401

export function extractResData(res: AjaxResponse<BaseResult>): Promise<any> {
  if (res.statusCode >= 300) return Promise.reject(res)
  if (hasCustomKey(res, 'fullData')) return Promise.resolve(res.data)
  const isFail = !checkCustomSuccess(res.data)
  return isFail ? Promise.reject(res) : Promise.resolve(res.data)
}
