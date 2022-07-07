import { createApp } from 'vue'
import App from '@/App.vue'
const app = createApp(App)

import d2Container from './d2-container'
// 注意 有些组件使用异步加载会有影响
app.component('d2-container', d2Container)