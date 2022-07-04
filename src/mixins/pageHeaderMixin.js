// import { isArray } from 'lodash'

export default {
  computed: {
    /**
     * 搜索、重置按钮的可点击状态
     */
    btnDisabled() {
      // let num = 0
      // for (let variable in this.form) {
      //   if (this.form.hasOwnProperty(variable)) {
      //     const val = this.form[variable]
      //     if (
      //       !(val === '' || val === null || (isArray(val) && val.length === 0))
      //     ) {
      //       num++
      //     }
      //   }
      // }
      // return !num
      return false
    }
  },
  methods: {
    /**
     * 搜索
     */
    doSearch() {
      // 因为 pageHeader 页面是导入的组件 所以需要再往父级触发doSearch才能执行到父mixin
      this.$emit('doSearch', this.getSearchParams())
    },
    /**
     * 获取搜素参数
     */
    getSearchParams() {
      let formData = this.$clearEmptyObjAttritube(this.form) // 在原型链上添加了一个去掉空数据的方法
      if (this.formDataFormat) { // 需要格式化的时候执行
        formData = this.formDataFormat(formData)
      }
      return formData
    },
    /**
     * 重置
     */
    doReset({ type = 0 }) {
      this.$refs.form.resetFields()
      this.orgTreeData && (this.orgTreeData = [])
      this.doSearch() // 重置表单数据外加数据重新获取
    }
  }
}
