/*
 * @Author: kavinluo
 * @Date: 2023-02-15 11:40:35
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 11:31:20
 * @Description: 无
 */
export const columns = [
  {
   label: '规则名称',
   prop: 'paperName',
   slotName: 'paperName',
 }, {
   label: '考点编号',
   prop: 'schoolsCode',
   slotName: 'schoolsCode'
 }, {
  label: '考点',
  prop: 'schoolsName',
  slotName: 'schoolsName'
}, {
   label: '场次',
   prop: 'scene',
   slotName: 'scene'
 }, {
   label: '考试情况',
   prop: 'categoryCode'
 }, {
   label: '考生人数',
   prop: 'examineImportNum',
   minWidth:130
 }, {
   label: '作答数据',
   prop: 'examTimeStart',
   width: 180
 }, {
   label: '成绩',
   prop: 'examTimeEnd',
   width: 180
 }, {
   label: '核对',
   prop: 'authorizeStatus',
   slotName: 'authorizeStatus'
 }
]
// 成绩计算
export const resultColumns = [
  {
    label: '准考证号码',
    prop: 'examCard',
    width: '120'
},{
  label: '姓名',
  prop: 'name'
},{
  label: '性别',
  prop: 'sex',
  slotName: 'sex'
},{
  label: '专业',
  prop: 'categoryName'
},{
  label: '考试专业编码',
  prop: 'categoryCode'
},{
  label: '身份证号',
  prop: 'idCard',
  width: 200
},{
  label: '成绩',
  prop: 'totalScore',
  width: 200
}
]

export const examColumns = [
  {
    label: '考点编号',
    prop: 'schoolsCode',
    width: '120'
},{
  label: '考试日期',
  prop: 'schoolsName'
},{
  label: '系统安装',
  prop: 'type',
  slotName: 'type'
},{
  label: '考生导入',
  prop: 'contact'
},{
  label: '开考授权获取',
  prop: 'contactMobile'
},{
  label: '试卷包导入',
  prop: 'authorizeCode',
  width: 200
},{
  label: '已开考场次',
  prop: 'authorizeCode',
  width: 200
},{
  label: '作答数据上报',
  prop: 'authorizeCode',
  width: 200
}
]

// 查询考试延迟记录
export const delayedColumns = [
  {
    label: '考点',
    prop: 'authorizeCode',
    width: 200
  },{
    label: '类型',
    prop: 'type',
    slotName: 'type',
    width: 200
  },{
    label: '时间',
    prop: 'authorizeCode',
    width: 200
  },{
    label: '规则名称',
    prop: 'authorizeCode',
    width: 200
  },{
    label: '场次',
    prop: 'authorizeCode',
    width: 200
  },{
    label: '说明',
    prop: 'authorizeCode',
    width: 200
  },{
    label: '申请时长',
    prop: 'authorizeCode',
    width: 200
  },{
    label: '授权码',
    prop: 'authorizeCode',
    width: 200
  },{
    label: '状态',
    prop: 'authorizeCode',
    width: 200
  }
]
// 查询考试延迟记录
export const dataUnloadColumns = [
  {
    label: '规则名称',
    prop: 'paperName',
  },{
    label: '考点编号',
    prop: 'schoolsCode',
    width: 120
  },{
    label: '考点',
    prop: 'schoolsName',
  },{
    label: '类型',
    prop: 'type',
    width: 90,
    slotName: 'type'
  },{
    label: '考生导入',
    prop: 'examineImportNum',
  },{
    label: '开考授权码',
    prop: 'authorizeCode',
    width: 200
  },{
    label: '试卷包导入',
    prop: 'paperPageImport',
    width: 120
  },{
    label: '作答结果上传',
    prop: 'examineImportNum',
    width: 150
  },{
    label: '延迟',
    prop: 'authorizeCode',
    width: 100
  },{
    label: '卸载码',
    prop: 'uninstallCode',
    width: 150,
    slotName:'uninstallCode'
  }
]