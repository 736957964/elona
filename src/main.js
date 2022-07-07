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
// 公用组件
import d2Container from "@/components/d2-container/index";

const app = createApp(App)

app.config.globalProperties.$myConfirm = confirm;

app.use(Routes).use(ElementPlus).use(store).use(d2Admin)
app.mount('#app')
app.component('d2-container', d2Container)
