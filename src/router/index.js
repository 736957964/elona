import { createRouter, createWebHistory } from 'vue-router'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载  require 和 import的区别
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {  path: '/', redirect: '/system' },
    { path: '/index', name: 'index', component: famineIndex },
    { path: '/system', name: 'system', component: System,
      children:[
        { path: '/system/mode', name: 'mode', component: _import('System/mode') },
        { path: '/system/dictionary', name: 'dictionary', component: _import('System/dictionary')  },
        { path: '/system/funInstruction', name: 'funInstruction', component: _import('System/funInstruction')  },
        { path: '/system/instruct', name: 'instruct', component:_import('System/instruct') }
      ]
    },
  ]
})
// import mode from '@/view/System/mode'
// import dictionary from '@/view/System/dictionary'
// import instruct from '@/view/System/instruct'
// -----
import System from '@/view/System'
import famineIndex from '@/view/famine-index'


export default router