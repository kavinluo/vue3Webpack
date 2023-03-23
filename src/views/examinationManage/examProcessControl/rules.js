/*
 * @Author: kavinluo
 * @Date: 2023-03-21 11:41:46
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-21 14:27:53
 * @Description: 无
 */
import baseRules from '@/formRules/base' // 公共规则

const stuInfo = {
  examTimeStart: baseRules.required,
  examTimeEnd: baseRules.required,

}

export {
  stuInfo
}