// import router from 'router'
// import store from '@/store/index'
export default {
  install(Vue, options) {
    // let path = ''
    // let btnPermissionList = []
    Vue.directive('has', {
      bind: function(el, binding) {
        Vue.prototype.$_has(binding.value).then(val => {
          if (!val) {
            el.parentNode.removeChild(el)
          }
        })
      }
    })
    Vue.config.globalProperties.$_has = async value => {
      return true
    }
  }
}
/**
 * 获取权限校验按钮
 * @param  {String} str
 */
export const getBtnPermissionList = (path, menuList) => {
  let btnList = []
  for (let index = 0; index < menuList.length; index++) {
    const element = menuList[index]
    if (element.path === path) {
      btnList = element.btnPermissionList || []
      break
    } else if (element.children && element.children.length) {
      return getBtnPermissionList(path, element.children)
    }
  }
  return btnList.map(item => item.frontPerms)
}
