<template>
  <el-select v-model="value" placeholder="请选择" clearable>
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.instructName"
        :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
import { getTableData } from '@/api/base'
export default {
  name: "index",
  data(){
    return{
      value:'',
      options:[]
    }
  },
  created() {
    this.init()
  },
  watch:{
    value(val){
      if(!this.options.length){ return }
      const data = this.options.find((res) =>{
        return res.id === val
      })
      this.$emit('success', val, data)
    }
  },
  methods:{
    async init(){
      const data2 = {
        tableName:'funinstruction'
      }
      const { data } = await getTableData(data2)
      this.options = data
    }
  }
}
</script>

<style scoped>

</style>