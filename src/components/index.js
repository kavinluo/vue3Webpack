/*
 * @Author: kevin
 * @Date: 2022-02-28 09:09:17
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 12:44:59
 * @Description: 组件注册
 */
import { components, plugins } from './element-ui/register-element'
import UserIcon from '@/components/kvIcon/kvIcon.js'
import modalHeader from './common/modalHeader.vue'
import keTable from '@/components/kvTable'
import remove from './common/remove.vue'
import loadBtn from './common/loadBtn.vue'
import operate from './common/operate.vue'
import myFirm from './common/MyPopconfirm.vue'
import myXlsx from './common/vue-xlsx-table.vue'
// import KvFrom from '@/components/kvform'
import kvDialog from './common/kvDialog'
import tinymce from './tinymce/index'
const concatComponent = [
  ...components,
  modalHeader,
  keTable,
  remove,
  loadBtn,
  operate,
  myFirm,
  kvDialog,
  myXlsx,
  tinymce
]
function globalRegisterComponent (app) {
  for (const component of concatComponent) {
    if (component.name === 'Menu') { // Menu组件名称和html本身标签重名
      app.component('IconMenu', component)
    }
    app.component(component.name, component)
  }
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
  const { name, kvIcon } = UserIcon
  app.component(name, kvIcon)
}

export {
  globalRegisterComponent
}
