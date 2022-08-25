<template>
  <d2-container class="instruct">
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
        <el-table-column prop="instructName" label="功能指令"  />
        <el-table-column prop="remarks" label="备注"  />
        <el-table-column prop="QUERY_TABLE" label="指令请求表" />
        <el-table-column prop="jsEval" label="指令代码" />
        <el-table-column label="操作" align="center" width="200">
          <template v-slot="scope">
            <el-button v-has="'dataEdit'" type="text"  @click="doEdit(scope.row)">修改</el-button>
            <el-button v-has="'dataEdit'" type="text"  @click="doClone(scope.row)">克隆</el-button>
            <el-button v-has="'dataDel'" type="text"   @click="doDel(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </d2-container>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import { deleteTableData, getTableData } from "@/api/base";
export default {
  name: "index",
  mixins: [tableMixin],
  components:{  },
  data() {
    return {
      // 列表接口名
      getTableListSyncMethod: getTableData,
      // 当前行数据
      currentRowObj: null
    }
  },
  methods:{
    postDataFormat(){
      return {
        tableName: 'funinstruction'
      }
    },
    doAdd(){
      this.currentRowObj = null
      sessionStorage.setItem('funInstruction', '')
      this.$router.push({ path: '/system/mode' })
    },
    doEdit(row){
      this.currentRowObj = row
      sessionStorage.setItem('funInstruction', JSON.stringify(row))
      this.$router.push({
        path: '/system/mode',
        query: { isGet: true }
      })
    },
    doClone(row){
      this.currentRowObj = row
      sessionStorage.setItem('funInstruction', JSON.stringify(row))
      this.$router.push({
        path: '/system/mode',
        query: { isClone: true }
      })
    },
    async doDel(row) {
      await this.$myConfirm('确定要删除本条指令吗', this)
      try {
        const { id } = row
        const data = {
          tableName: 'funinstruction',
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