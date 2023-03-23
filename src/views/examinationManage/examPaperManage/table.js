/*
 * @Author: kavinluo
 * @Date: 2023-02-15 11:40:35
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-21 13:45:44
 * @Description: 无
 */
export const columns = [
   {
    label: '规则名称',
    prop: 'paperName',
    slotName: 'paperName',
    minWidth:120
  }, {
    label: '考试编码',
    prop: 'categoryCode',
    slotName: 'categoryCode'
  }, {
    label: '考试模式',
    prop: 'examModel',
    slotName: 'examModel'
  }, {
    label: '计时方式',
    prop: 'recordType'
  }, {
    label: '类型',
    prop: 'examType',
    minWidth:130
  }, {
    label: '考试时长（分钟）',
    prop: 'examTimeLength',
    width: 200
  }, {
    label: '分段控制',
    prop: 'showTmType'
  }, {
    label: '试卷包导入',
    prop: 'paperPagePath',
    slotName:'paperPagePath'
  }, {
    label: '导入时间',
    prop: 'paperImportTime'
  }
]
