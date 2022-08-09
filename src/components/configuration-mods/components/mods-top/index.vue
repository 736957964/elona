<template>
  <div class="mods-top">
    <el-row :gutter="20">
    <el-col :span="8" style="min-width:200px">
      <el-select
          v-model="showTablesData"
          multiple
          reserve-keyword
          width="200"
          @change="success"
          placeholder="请选择渲染的数据库表"
          :loading="loading">
        <el-option
            v-for="item in showTables"
            :key="item.Tables_in_elona"
            :label="item.Tables_in_elona"
            :value="item.Tables_in_elona">
        </el-option>
      </el-select>
    </el-col>
  </el-row>

  </div>
</template>

<script>
import { getSqlValue } from '@/api/base'
export default {
  name: "index",
  data(){
    return{
      showTables: [],
      loading:false,
      showTablesData: []
    }
  },
  created() {
    this.initializationzation()
  },
  methods:{
    async initializationzation() {
      const { data } = await getSqlValue({ sqlValue:'SHOW TABLES' })
      this.showTables = data
    },
    success(val){
      if(this.seTime){ clearInterval(this.seTime)}
      this.seTime = setTimeout(() =>{ // 节流
        this.$emit('success', val)
      }, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
  .mods-top{

  }
</style>