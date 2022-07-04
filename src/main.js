import { createApp } from 'vue'
import App from './App.vue'

// 路由数据
import Routes from './router'
// element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// vuex
import store from './store'

import { confirm } from '@/libs/customPlugin/confirm'
// 核心插件
import d2Admin from '@/plugin/d2admin'

const app = createApp(App)

app.config.globalProperties.$myConfirm = confirm;

app.use(Routes).use(ElementPlus).use(store).use(d2Admin)
app.mount('#app')
