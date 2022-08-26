<template>
  <el-dialog
        :title="`${currentRowObj ? '修改' : '新增'}指令`"
        width="700px"
        :close-on-click-modal="false"
        :destroy-on-close="true"
        :model-value="dialogVisible"
        @close="close"
        top="50px"
        class="dialog-wrapper"
    >
      <el-form
          ref="ruleForm"
          :model="ruleForm"
          label-position="left"
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
        <el-form-item label="文本描述" prop="successTextDescription" v-if="ruleForm.mode==='1'">
          <el-input v-model="ruleForm.successTextDescription" type="textarea" rows="5" placeholder="请输入文本描述"  />
        </el-form-item>
        <el-form-item label="功能指令" prop="selectFunction" >
          <select-function ref="selectFunction" @success="doSuccess"/>
        </el-form-item>
        <span v-if="ruleForm.mode!=='1'">
          <el-form-item label="成功文本描述" prop="successTextDescription" >
            <el-input v-model="ruleForm.successTextDescription" type="textarea" rows="3" placeholder="请输入成功文本描述(需选择的指令返回true)"  />
          </el-form-item>
           <el-form-item label="失败文本描述" prop="errTextDescription" >
            <el-input v-model="ruleForm.errTextDescription" type="textarea" rows="3" placeholder="请输入失败文本描述(需选择的指令返回false)"  />
          </el-form-item>
        </span>
        <el-form-item label="图片url" prop="imageUrl">
          <el-input v-model="ruleForm.imageUrl" placeholder="请输入图片url"/>
        </el-form-item>

        <el-form-item label="描述" prop="remarks">
          <el-input   v-model="ruleForm.remarks"  type="textarea"  rows="2"    placeholder="请输入描述"  />
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
import  selectFunction from '../select-function'
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
  components:{ selectFunction },
  data(){
    return{
      ruleForm: {
        command: '签到',   // 触发指令
        remarks: '签到备注', // 备注
        mode:'1', // 1普通模式 2 特殊模式
        successTextDescription: '成功描述',  // 成功文本描述
        errTextDescription:'失败描述', // 失败文本描述
        imageUrl:'签到url' // 图片的url
      },
    }
  },
  methods:{
    /**
     * 初始化弹窗
     */
    async initForm() {
      if (this.currentRowObj) {
        Object.assign(this.ruleForm, this.currentRowObj)
        await this.$nextTick()
        this.$refs.selectFunction.value = this.ruleForm.selectFunction
      }
    },
    doSuccess(val, data){
      this.ruleForm.selectFunction = val
      if(data){
        const { jsEval, QUERY_TABLE } = data
        this.ruleForm.jsEval = jsEval
        this.ruleForm.QUERY_TABLE = QUERY_TABLE
      }else {
        this.ruleForm.jsEval = ''
        this.ruleForm.QUERY_TABLE = ''
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
        case '3':ruleForm.successTextDescription = '';ruleForm.imageUrl = '';break;
        default:
      }
      let keysData = null, reviseData = null
      keys.forEach((res, index) => {
        keysData = keysData !== null ? index + 1 === keys.length ? `${keysData}${this.ruleForm[res]}'` : `${keysData}${this.ruleForm[res]}','` : index + 1 === keys.length ? `'${this.ruleForm[res]}'` : `'${this.ruleForm[res]}','`
        reviseData = reviseData !== null ? index + 1 === keys.length ? `${reviseData}${res}='${this.ruleForm[res]}'` : `${reviseData}${res}='${this.ruleForm[res]}',` : `${res}='${this.ruleForm[res]}',`
      })
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