/*
 * @Author: kevin
 * @Date: 2022-03-08 17:55:35
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 10:07:41
 * @Description: 时间格式化
 */

import _ from 'lodash'
import { valDataType } from './util'

// /**
//  * 格式化时间戳
//  * @param useTime Number 时间戳
//  * @param useMat String   yyyy-MM-dd格式
//  */

// export function formatTimestamp (useTime, useMat) {
//   if (useTime === undefined) return ''
//   return Dayjs(useTime).format(useMat)
// }
import dateUtil from './dateUtil.js'

export const toDate = function (date) {
  return isDate(date) ? new Date(date) : null
}

export const isDate = function (date) {
  if (date === null || date === undefined) return false
  if (isNaN(new Date(date).getTime())) return false
  return true
}

export const formatDate = function (date, format) {
  date = toDate(date)
  if (!date) return ''
  return dateUtil.format(date, format || 'yyyy-MM-dd')
}
export const conductDate = (date, format) => {
  date = formatDate(date, format)
  return date
}

const yearMonthData = (date) => {
  if (typeof date != 'object') return date
  let dateTime = new Date(date)
  let year = dateTime.getFullYear()
  let month = dateTime.getMonth() + 1
  let D = date.getDate() + ''
  if (month < 10) {
    month = '0' + month
  }
  if (D < 10) {
    D = '0' + D
  }
  return year + '-' + month + '-' + D
}
/*
* 对表单数据的时间进行转换
* @params  data    obj|array  需要转换的数据源
* @parans fn        fun||string  操作的方法或字符串模板，yyyy-mm
* @parans targer   array  需要操作的对象的名
* */
export const formDate = (data, target, fn) => {
  let length = target.length
  let isObject = valDataType(data, 'Object')
  if (isObject) {
    for (let i = 0; i < length; i++) {
      if (typeof fn == 'string') {
        data[target[i]] = conductDate(data[target[i]], fn)
      } else {
        fn = fn || yearMonthData || function () {
        }
        data[target[i]] = fn(data[target[i]])
      }
    }
    return data
  }
  _.forEach(data, function (value) {
    for (let i = 0; i < length; i++) {
      if (typeof fn == 'string') {
        value[target[i]] = conductDate(value[target[i]], fn)
      } else {
        fn = fn || yearMonthData || function () {
        }
        value[target[i]] = fn(value[target[i]])
      }
    }
  })
  return data
}

export const parseDate = function (string, format) {
  return dateUtil.parse(string, format || 'yyyy-MM-dd')
}
