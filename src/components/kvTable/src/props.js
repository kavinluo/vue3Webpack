/*
 * @Author: kevin
 * @Date: 2022-05-10 14:01:32
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-02-17 16:08:04
 * @Description: props
 */
export default {
  useTableData: {
    type: Array,
    default: () => ([])
  },
  expandRowKeys: {
    type: Array,
    default: []
  },
  propList: {
    type: Array,
    required: true,
    default: () => ([])
  },
  isRadio: { // 表格是否是单选
    type: Boolean,
    default: false
  },
  showIndexColumn: { // /是否显示 序号列
    type: Boolean,
    default: true
  },
  showSelectColumn: { // 是否显示选择列
    type: Boolean,
    default: false
  },
  showFooter: { // 是否显示页脚分页
    type: Boolean,
    default: true
  },
  pageInfo: {
    type: Object,
    default: () => ({ curPage: 1, pageSize: 10 })
  },
  useSize: {
    type: Array,
    default: () => ([10, 50, 100, 200])
  },
  listTotal: {
    type: Number,
    default: 0
  },
  tableOtherOption: {
    type: Object,
    default: () => ({})
  },
  getDataFn: { // 请求列表数据的方法
    type: Function,
    default: () => { }
  },
  params: { // 默认需要的参数
    type: Object,
    default: () => ({})
  },
  // 是否有分页参数
  hasPageSize: {
    type: Boolean,
    default: true
  },
  isAwait: { // 请求列表数据时是否需要等待
    type: Boolean,
    default: false
  },
  // isUseStoreData: { // 是否需要使用store里面的数据, 如果不使用自己请求后传递
  //   type: Boolean,
  //   default: true
  // },
  baseURL: {
    type: String,
    default: undefined
  },
  // 多选时选中的数据
  useSelectData: {
    type: Object,
    default: () => (null)
  }
}
