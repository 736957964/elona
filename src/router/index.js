import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {  path: '/', redirect: '/system' },
    { path: '/index', name: 'index', component: famineIndex },
    { path: '/system', name: 'system', component: System,
      children:[
        { path: '/system/mode', name: 'mode', component: mode },
        { path: '/system/dictionary', name: 'dictionary', component: dictionary }
      ]
    },
  ]
})
import mode from '@/view/System/mode'
import dictionary from '@/view/System/dictionary'
// -----
import System from '@/view/System'
import famineIndex from '@/view/famine-index'


export default router