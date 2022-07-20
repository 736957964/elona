<template>
  <el-dialog
        :title="`${currentRowObj ? '修改' : '新增'}指令`"
        width="700px"
        :close-on-click-modal="false"
        :destroy-on-close="true"
        :model-value="dialogVisible"
        @close="close"
        class="dialog-wrapper"
    >
      <el-form
          ref="ruleForm"
          :model="ruleForm"
          label-position="top"
      >
        <el-form-item label="触发指令" prop="command">
          <el-radio v-model="ruleForm.mode" label="1">普通文本模式</el-radio>
          <el-radio v-model="ruleForm.mode" label="2">特殊模式(普通文本+功能)</el-radio>
          <el-radio v-model="ruleForm.mode" label="3">高级模式(特殊文本+功能)</el-radio>
        </el-form-item>
        <el-form-item label="触发指令" prop="command">
          <el-input
              v-model="ruleForm.command"
              placeholder="触发指令"
          />
        </el-form-item>

        <el-form-item label="文本描述" prop="textDescription" v-if="ruleForm.mode!=='3'">
          <el-input
              v-model="ruleForm.textDescription"
              type="textarea"
              rows="5"
              placeholder="请输入文本描述"
          />
        </el-form-item>

        <el-form-item label="图片url" prop="imageUrl">
          <el-input
              v-model="ruleForm.imageUrl"
              placeholder="请输入图片url"
          />
        </el-form-item>

        <el-form-item label="描述" prop="remarks">
          <el-input
              v-model="ruleForm.remarks"
              type="textarea"
              rows="2"
              placeholder="请输入描述"
          />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-button @click="close">取消</el-button>
        <el-button
            type="primary"
            :loading="btnLoading"
            @click="submitData"
        >确定</el-button>
      </template>
    </el-dialog>
</template>

<script>
import dialogMixin from "@/mixins/dialogMixin";
import { insertTableData, reviseTableData } from "@/api/base";

export default {
  name: "index",
  mixins: [dialogMixin],
  props: {
    // 当前行数据
    currentRowObj: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return{
      ruleForm: {
        command: '签到',   // 触发指令
        remarks: '签到备注', // 备注
        mode:'1', // 1普通模式 2 特殊模式
        textDescription: '签到描述',  // 文本描述
        imageUrl:'签到url' // 图片的url
      },
    }
  },
  methods:{
    /**
     * 初始化弹窗
     */
    initForm() {
      if (this.currentRowObj) {
        Object.assign(this.ruleForm, this.currentRowObj)
      }
    },
    async doSubmit() {
      const ruleForm = this.ruleForm
      const { mode, id } = this.ruleForm
      let keys = Object.keys(this.ruleForm).filter((res) => {return res !== 'id'})
      console.log(mode)
      switch (mode){
        case '1':break;
        case '2':break;
        case '3':ruleForm.textDescription = '';ruleForm.imageUrl = '';break;
        default:
      }
      console.log(keys)
      let keysData = null, reviseData = null
      keys.forEach((res, index) => {
        keysData = keysData !== null ? index + 1 === keys.length ? `${keysData}${this.ruleForm[res]}'` : `${keysData}${this.ruleForm[res]}','` : index + 1 === keys.length ? `'${this.ruleForm[res]}'` : `'${this.ruleForm[res]}','`
        reviseData = reviseData !== null ? index + 1 === keys.length ? `${reviseData}${res}='${this.ruleForm[res]}'` : `${reviseData}${res}='${this.ruleForm[res]}',` : `${res}='${this.ruleForm[res]}',`
      })
      console.log(reviseData)
      let data = {
        tableName: 'command',
        ...(this.currentRowObj ? { reviseSqlValue:`${reviseData} WHERE id='${id}'` } : { sqlValue:`(${keys.join(',')}) VALUES (${keysData})` })
      }
      try {
        await (this.currentRowObj ? reviseTableData : insertTableData)(data)
        this.$message.success(`指令${this.currentRowObj ? '修改' : '新增'}成功`)
        this.$emit('success')
        this.close()
      } catch (e) {
        console.log(e)
      } finally {
        this.btnLoading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .dialog-wrapper{

  }
</style>