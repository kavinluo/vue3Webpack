/*
 * @Author: kavinluo
 * @Date: 2023-01-31 14:41:15
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-15 09:21:24
 * @Description: 无
 */
import { createApp } from 'vue'
import App from './App.vue'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import router from './router/index.js'
import './assets/style/index.scss'
import './assets/style/element/element.scss'
import 'element-plus/theme-chalk/src/index.scss'

import { ElMessage } from 'element-plus'
import { globalRegisterComponent } from './components/index'
import store, { setupStore } from './store'
console.log('store', store)
const app = createApp(App)
app.use(store)
app.use(router)
setupStore() // store刷新后丢失问题

// app.config.globalProperties.$axios = axios

app.use(globalRegisterComponent) // 注册element-plus | 其他
app.mount('#app')
app.config.globalProperties.$message = ElMessage // 注册提示
