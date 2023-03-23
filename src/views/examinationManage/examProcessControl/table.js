/*
 * @Author: kavinluo
 * @Date: 2023-02-15 11:40:35
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 11:23:17
 * @Description: 无
 */
export const columns = [
  {
   label: '规则名称',
   prop: 'paperName',
   slotName: 'paperName',
 }, {
   label: '考试日期',
   prop: 'name',
   slotName: 'name'
 }, {
   label: '场次',
   prop: 'scene',
   slotName: 'scene'
 }, {
   label: '专业编码',
   prop: 'categoryCode'
 }, {
   label: '考试模式',
   prop: 'examModel',
   minWidth:130
 }, {
   label: '授权开始时间',
   prop: 'examTimeStart',
   width: 180
 }, {
   label: '授权结束时间',
   prop: 'examTimeEnd',
   width: 180
 }, {
   label: '授权状态',
   prop: 'authorizeStatus',
   slotName: 'authorizeStatus'
 }, {
  label: '授权时间',
  prop: 'authorizeTime',
  width: 180
}, {
  label: '授权码',
  prop: 'categoryExam',
  slotName: 'categoryExam'
}
]

export const listDtoColumns = [
  {
    label: '考点编号',
    prop: 'schoolsCode',
    width: '120'
},{
  label: '考点名称',
  prop: 'schoolsName'
},{
  label: '类型',
  prop: 'type',
  slotName: 'type'
},{
  label: '联系人',
  prop: 'contact'
},{
  label: '手机',
  prop: 'contactMobile'
},{
  label: '授权码',
  prop: 'authorizeCode',
  width: 200
}
]

export const examColumns = [
  {
    label: '考点名称',
    prop: 'schoolsName',
},{
  label: '考试日期-无',
  prop: 'schoolsName'
},{
  label: '系统安装',
  prop: 'systemInstall',
  slotName: 'systemInstall',
},{
  label: '考生导入',
  prop: 'examineImportNum',
  slotName: 'examineImportNum',
  maxWidth: 120
},{
  label: '开考授权获取',
  prop: 'getAuthorizeCode',
  slotName: 'getAuthorizeCode',
  maxWidth: 140

},{
  label: '试卷包导入',
  prop: 'paperPageImport',
  slotName: 'paperPageImport',
  maxWidth: 120
},{
  label: '已开考场次-无',
  prop: 'authorizeCode',
  maxWidth: 120
},{
  label: '作答数据上报',
  prop: 'scoreUploadNum',
  slotName: 'scoreUploadNum',
  maxWidth: 120
}
]

// 查询考试延迟记录
export const delayedColumns = [
  {
    label: '考点',
    prop: 'schoolsName',
  },{
    label: '类型',
    prop: 'type',
    slotName: 'type',
    width: 200
  },{
    label: '时间',
    prop: 'createTime',
    slotName: 'createTime',
    width: 200
  },{
    label: '规则名称',
    prop: 'paperName',
    width: 200
  },{
    label: '场次',
    prop: 'scene',
    width: 200
  },{
    label: '说明',
    prop: 'describe',
    slotName:'describe',
    width: 200
  },{
    label: '申请时长',
    prop: 'applyTimeLength',
    width: 200
  },{
    label: '授权码',
    prop: 'authorizeCode',
    slotName: 'authorizeCode',
    width: 200
  },{
    label: '状态',
    prop: 'authorizeStatus',
    slotName: 'authorizeStatus',
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
    maxWidth: 120
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
    maxWidth: 120
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