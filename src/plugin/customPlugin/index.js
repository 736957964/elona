import clearEmptyObjAttritube from './clearEmptyObjAttritube'
import authCheck from "@/plugin/customPlugin/authCheck";
export default {
  // 注册
  install(Vue, options) {
    Vue.use(clearEmptyObjAttritube)
    Vue.use(authCheck)
  }
}