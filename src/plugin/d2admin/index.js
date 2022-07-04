
import customPlugin from '@/plugin/customPlugin'

export default {
  async install(Vue, options) {
    // 插件
    Vue.use(customPlugin)
  }

}
