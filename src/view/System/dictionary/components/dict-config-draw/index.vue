<template lang="html">
  <el-drawer
    :title="`字典配置：${currentRowObj && currentRowObj.keyName}`"
    direction="rtl"
    size="800px"
    :wrapper-closable="false"
    :visible="dialogVisible"
    class="dict-config-draw"
    @close="close"
  >
    <div v-loading="wrapperLoading" class="draw-wrapper draw-loading-wrapper">
      <el-form ref="ruleForm" :model="{ tableData }">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="dictName"
            label="名称"
            width="140"
            align="center"
          >
            <template v-slot="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.dictName`"
                required
              >
                <el-input v-model="scope.row.dictName" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="dictValue"
            label="数值"
            width="140"
            align="center"
          >
            <template v-slot="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.dictValue`"
                required
              >
                <el-input v-model="scope.row.dictValue" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="sortBy"
            label="排序"
            width="140"
            align="center"
          >
            <template v-slot="scope">
              <el-input-number
                v-model="scope.row.sortBy"
                :min="1"
                controls-position="right"
              />
            </template>
          </el-table-column>

          <el-table-column
            prop="fa"
            label="附加字段a"
            width="140"
            align="center"
          >
            <template v-slot="scope">
              <el-input v-model="scope.row.fa" />
            </template>
          </el-table-column>

          <el-table-column
            prop="fb"
            label="附加字段b"
            width="140"
            align="center"
          >
            <template v-slot="scope">
              <el-input v-model="scope.row.fb" />
            </template>
          </el-table-column>

          <el-table-column
            prop="remarks"
            label="描述"
            width="140"
            align="center"
          >
            <template v-slot="scope">
              <el-input v-model="scope.row.remarks" />
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="70" align="center">
            <template v-slot:header>
              <el-button type="text" @click="doAdd">增加</el-button>
            </template>

            <template v-slot="scope">
              <el-button
                type="text"
                size="small"
                @click="doDel(scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <div class="d2-mt-10" flex="dir:right">
        <el-button
          type="primary"
          :loading="btnLoading"
          @click="submitData"
        >确定</el-button>
        <el-button class="d2-mr-10" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import dialogMixin from '@/mixins/dialogMixin'

import { cloneDeep } from 'lodash'

import { DictDetailAdd, DictDetail } from '@/api/system/dict'
import { getTableData_get } from '@/api/base'
export default {
  name: '',
  mixins: [dialogMixin],
  props: {
    currentRowObj: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // table数据
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    /**
     * 初始化
     */
    initForm() {
      this._DictDetail()
    },
    /**
     * 接口提交
     */
    async _DictDetailAdd() {
      try {
        this.btnLoading = true
        await DictDetailAdd({
          dictKeyId: this.currentRowObj.dictKeyId,
          dictList: this.tableData
        })
        this.$message.success('字典配置成功')
        this.$emit('success')
        this.close()
      } catch (e) {
        console.log(e)
      } finally {
        this.btnLoading = false
      }
    },
    /**
     * 提交
     */
    submitData() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this._DictDetailAdd()
        } else {
          this.$message.error('有字段没有填写完整，请检查')
          return false
        }
      })
    },
    /**
     * 详情
     */
    async _DictDetail() {
      try {
        this.wrapperLoading = true
        const { dictKey } = this.currentRowObj
        const dict = {
          tableName: 'dictionarydata',
          mysql:`dictKey=${dictKey}`
        }
        const data = await getTableData_get(dict)
        console.log('获取数据', data)
        if (data) {
          this.tableData = data.sort((a, b) => a.sortBy - b.sortBy)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.wrapperLoading = false
      }
    },
    /**
     * 删除
     */
    async doDel(index) {
      await this.$myConfirm('确定要删除本条数据吗', this)
      this.tableData.splice(index, 1)
    },
    /**
     * 新增
     */
    doAdd() {
      this.tableData.push({
        dictName: '',
        dictValue: '',
        sortBy: this.getMaxDictSort() + 1,
        fa: '',
        fb: '',
        remarks: ''
      })
    },
    /**
     * 获取当前最大的sort字段值
     */
    getMaxDictSort() {
      let maxDictSort = 0
      const { length } = this.tableData
      if (length) {
        const sortedTableData = cloneDeep(this.tableData).sort(
          (a, b) => a.sortBy - b.sortBy
        )
        maxDictSort = sortedTableData[length - 1].sortBy
      }
      return maxDictSort
    }
  }
}
</script>

<style lang="scss">
.dict-config-draw {
  .el-input-number {
    width: 118px;
  }
  .el-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
