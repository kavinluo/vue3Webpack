/*
 * @Author: kavinluo
 * @Date: 2023-02-18 14:23:37
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-13 17:45:01
 * @Description: 无
 */
import baseRules from '@/formRules/base' // 公共规则
const createSchool = {
  code: [baseRules.requiredNoEvent, { validator: baseRules.numbers, message: '编号必须是正整数' }, baseRules.inputLen(1, 50)],
  province: baseRules.requiredNoEvent,
  city: baseRules.requiredNoEvent,
  name: baseRules.requiredNoEvent,
  postCode: baseRules.number,
  contactMobile:baseRules.mobile,
}
const createUser = {
  account: baseRules.requiredNoEvent,
  schoolId: baseRules.requiredNoEvent,
  name: baseRules.requiredNoEvent,
  mobile: [baseRules.requiredNoEvent, baseRules.mobile]
}
const arrange = {
  schoolId: baseRules.requiredNoEvent,
}
export {
  createSchool,
  createUser,
  arrange
}
