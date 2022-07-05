<template>
  <div class="container-search-wrapper">
    <page-header
        ref="pageHeader"
        @doSearch="doSearch"
        @doReset="doReset"
    />
    <!-- 中间内容容器 -->
    <div v-loading="loading" class="loading-wrapper">
      <el-button v-has="'dataAdd'" type="primary" icon="el-icon-plus" @click="doAdd">新增</el-button>
      <el-table
          style="width: 100%;"
          tooltip-effect="dark"
          :data="tableData"
          border
          class="d2-mt-10"
      >
        <el-table-column
            prop="keyName"
            label="字典名称"
            show-overflow-tooltip
        />

        <el-table-column
            prop="dictKey"
            label="字典值"
            show-overflow-tooltip
        />

        <el-table-column
            prop="remarks"
            label="字典描述"
            show-overflow-tooltip
        />

        <el-table-column label="状态" align="center">
          <template v-slot="scope">
            <template v-if="scope.row.status !== 2">
              <i
                  v-if="appId === scope.row.appId"
                  :class="[scope.row.status === 1 ? 'el-icon-video-pause danger': 'el-icon-video-play primary', 'd2-mr-10','link']"
                  @click="statusChange(scope.row)"
              />
              {{ scope.row.status === 1 ? '已启用' : '已停用' }}
            </template>

            <template v-else>未配置</template>
          </template>
        </el-table-column>

        <el-table-column
            prop="createName"
            label="创建用户"
            show-overflow-tooltip
        />

        <el-table-column label="操作时间" align="center" width="150">
          <template v-slot="{ row }"> {{ row.updateDate || row.createDate }}</template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="150">
          <template v-slot="scope">
            <el-button
                v-has="'dataEdit'"
                type="text"
                @click="doEdit(scope.row)"
            >修改</el-button>
            <el-button
                v-has="'dataConfig'"
                type="text"
                @click="doConfig(scope.row, 1)"
            >字典配置</el-button>
            <el-button
                v-if="scope.row.status !== '1'"
                v-has="'dataDel'"
                type="text"
                @click="doDel(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增 -->
    <data-dialog
        v-model:dialog-visible="dataDialogVisible"
        :current-row-obj="currentRowObj"
        @success="getTableData"
    />

    <!-- 字典配置 -->
    <dict-config-draw
        v-model:dialog-visible="dictConfigDrawVisible"
        :current-row-obj="currentRowObj"
        @success="getTableData"
    />
    <!-- 底部分页 -->
    <footer-page
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script>
import PageHeader from './components/page-header'
import DataDialog from './components/data-dialog'
import DictConfigDraw from './components/dict-config-draw'

import { DictList, DictDel, DictStatusChange } from '@/api/system/dict'

import { getTableData } from '@/api/base'
import tableMixin from '@/mixins/tableMixin'

export default {
  name: '',
  components: {
    PageHeader,
    DataDialog,
    DictConfigDraw
  },
  mixins: [tableMixin],
  props: {},
  data() {
    return {
      // 新增、编辑开关
      dataDialogVisible: false,
      // 字典配置开关
      dictConfigDrawVisible: false,
      // 列表接口名
      getTableListSyncMethod: getTableData,
      // 当前行数据
      currentRowObj: null
    }
  },
  computed: { },
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    postDataFormat(){
      return {
        tableName: 'dictionary'
      }
    },
    /**
     * 新增
     */
    doAdd() {
      this.currentRowObj = null
      this.dataDialogVisible = true
    },
    /**
     * 编辑
     */
    doEdit(row) {
      const { dictKeyId, dictKey, keyName, remarks } = row
      this.currentRowObj = { dictKeyId, dictKey, keyName, remarks }
      this.dataDialogVisible = true
    },
    /**
     * 删除
     */
    async doDel(row) {
      await this.$myConfirm('确定要删除本条数据字典吗', this)
      try {
        const { dictKeyId } = row
        await DictDel(dictKeyId)
        this.$message.success('数据字典删除成功')
        this.getTableData()
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * 字典配置
     */
    doConfig(row) {
      this.currentRowObj = row
      this.dictConfigDrawVisible = true
    },
    /**
     * 启用禁用状态切换
     */
    async statusChange(row) {
      const { status, dictKeyId } = row
      const str = status === 0 ? '启用' : '停用'
      await this.$myConfirm(`确定要${str}本数据字典吗`, this)
      try {
        await DictStatusChange(dictKeyId)
        this.$message.success(`${str}成功`)
        this.getTableData()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>