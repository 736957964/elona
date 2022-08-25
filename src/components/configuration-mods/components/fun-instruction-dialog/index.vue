<template>
  <el-dialog
      :title="`${!!currentRowObj.id?'修改':'添加'}指令`"
      width="800px"
      top="15vh"
      :close-on-click-modal="false"
      :model-value="dialogVisible"
      append-to-body
      class="popup-dialog"
      @close="close"
  >
    <el-form
        ref="ruleForm"
        label-suffix=":"
        label-position="right"
        :model="ruleForm"
        label-width="100px"
    >
      <el-form-item label="指令名称" prop="instructName" placeholder="请输入指令名称">
        <el-input v-model="ruleForm.instructName"  />
      </el-form-item>
      <el-form-item label="指令描述" prop="remarks">
        <el-input v-model="ruleForm.remarks" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="btnLoading" @click="submitData">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import dialogMixin from '@/mixins/dialogMixin'
import { insertTableData, reviseTableData } from '@/api/base'
export default {
  name: '',
  components: { },
  mixins: [dialogMixin],
  props: {
    currentRowObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm:{
        instructName:'',
        remarks:''
      }
    }
  },
  watch: {},
  created() {
  },
  methods: {
    // 初始化
    initForm() {
      if (!this.currentRowObj) { return }
      const { instructName, remarks, id } = this.currentRowObj
      this.ruleForm = {
        instructName, remarks, id
      }
    },
    async doSubmit() {
      try {
        const { funJson, jsEval, QUERY_TABLE, id } = this.currentRowObj
        const instructName = this.ruleForm.instructName
        const remarks = this.ruleForm.remarks
        console.log(this.currentRowObj.remarks)
        const data = {
          tableName: 'funinstruction',
          sqlValue:`(funJson,jsEval,QUERY_TABLE,instructName,remarks) VALUES ('${funJson}','${jsEval}','${QUERY_TABLE}','${instructName}','${remarks}')`,
          reviseSqlValue:`instructName='${instructName}',remarks='${remarks}' WHERE id='${id}'`
        }
        await (!!this.currentRowObj.id ? reviseTableData : insertTableData)(data)
        this.$message.success(
          `数据字典${!!this.currentRowObj.id ? '修改' : '新增'}成功`
        )
        console.log(this.$route.query.isClone)
        if(!!this.currentRowObj.id || this.$route.query.isClone){
          this.$router.push({ path: '/system/mode' })
          this.$emit('success')
        }
        this.close()
      } finally {
        this.btnLoading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>