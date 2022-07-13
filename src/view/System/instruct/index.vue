<template>
  <d2-container class="instruct">
<!--    <template v-slot:header>-->
<!--      <page-header-->
<!--          ref="pageHeader"-->
<!--          @doSearch="doSearch"-->
<!--          @doReset="doReset"-->
<!--      />-->
<!--    </template>-->
    <template v-slot:footer>
       <footer-page
           :page-size="pageSize"
           :current-page="currentPage"
           :total="total"
           @handleSizeChange="handleSizeChange"
           @handleCurrentChange="handleCurrentChange"
       />
    </template>
    <div v-loading="loading" class="loading-wrapper">
      <el-button type="primary" icon="Plus" @click="doAdd" style="margin-bottom: 10px">新增</el-button>
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column prop="command" label="触发指令" width="180" />
        <el-table-column prop="remarks" label="备注" width="180" />
        <el-table-column prop="mode" label="模式" width="180" />
        <el-table-column prop="textDescription" label="文本描述" width="180" />
        <el-table-column prop="imageUrl" label="签到url"  />
        <el-table-column label="操作" align="center" width="200">
          <template v-slot="scope">
            <el-button v-has="'dataEdit'" type="text"  @click="doEdit(scope.row)">修改</el-button>
            <el-button v-has="'dataConfig'" type="text" @click="doConfig(scope.row, 1)">配置</el-button>
            <el-button v-has="'dataDel'" type="text"   @click="doDel(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新增或者删除指令-->
    <command-dialog
        v-model:dialog-visible="dataDialogVisible"
        :current-row-obj="currentRowObj"
        @success="getTableData"
    />
  </d2-container>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import { deleteTableData, getTableData } from "@/api/base";

// import PageHeader from '@/components/page-header'
import commandDialog from '@/view/System/instruct/components/command-dialog'
export default {
  name: "index",
  mixins: [tableMixin],
  components:{ commandDialog },
  data() {
    return {
      // 新增、编辑开关
      dataDialogVisible: false,
      // 列表接口名
      getTableListSyncMethod: getTableData,
      // 当前行数据
      currentRowObj: null
    }
  },
  methods:{
    postDataFormat(){
      return {
        tableName: 'command'
      }
    },
    doAdd(){
      this.dataDialogVisible = true
    },
    doEdit(){

    },
    doConfig(){

    },
    async doDel(row) {
      await this.$myConfirm('确定要删除本条指令吗', this)
      try {
        const { id } = row
        const data = {
          tableName: 'command',
          deleteSqlValue:`id=${id}`
        }
        await deleteTableData(data)
        this.$message.success('指令删除成功')
        this.getTableData()
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .instruct{

  }
</style>