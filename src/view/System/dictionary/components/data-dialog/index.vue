<template>
  <el-dialog
    :title="`${currentRowObj ? '修改' : '新增'}数据字典`"
    width="500px"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :visible="dialogVisible"
    class="dialog-wrapper"
    @close="close"
  >
    <el-form
      v-if="dialogVisible"
      ref="ruleForm"
      :model="ruleForm"
      label-position="top"
      :rules="rules"
    >
      <el-form-item label="字典名称" prop="keyName">
        <el-input
          v-model="ruleForm.keyName"
          placeholder="请输入字典名称"
        />
      </el-form-item>

      <el-form-item label="字典值" prop="dictKey">
        <el-input
          v-model="ruleForm.dictKey"
          placeholder="请输入字典值"
          :disabled="!!currentRowObj"
        />
      </el-form-item>

      <el-form-item label="描述" prop="remarks">
        <el-input
          v-model="ruleForm.remarks"
          type="textarea"
          rows="4"
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
import { DictAdd, DictUpdate } from '@/api/system/dict'

import rules from './config/rules'

import dialogMixin from '@/mixins/dialogMixin'

export default {
  mixins: [dialogMixin],
  props: {
    // 当前行数据
    currentRowObj: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      ruleForm: {
        // 字典名称
        keyName: '',
        // 字典值
        dictKey: '',
        // 备注
        remarks: ''
      },
      rules
    }
  },
  computed: {},
  methods: {
    /**
     * 提交
     */
    async doSubmit() {
      try {
        await (this.currentRowObj ? DictUpdate : DictAdd)(this.ruleForm)
        this.$message.success(
          `数据字典${this.currentRowObj ? '修改' : '新增'}成功`
        )
        this.$emit('success')
        this.close()
      } catch (e) {
        console.log(e)
      } finally {
        this.btnLoading = false
      }
    },
    /**
     * 初始化弹窗
     */
    initForm() {
      if (this.currentRowObj) {
        Object.assign(this.ruleForm, this.currentRowObj)
      }
    }
  }
}
</script>
