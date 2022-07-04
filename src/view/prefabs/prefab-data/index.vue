<template>
  <div class="prefab-data">
    <prefab-json v-if="false"></prefab-json>
    <prefab-record></prefab-record>
    <prefab-custimize></prefab-custimize>
  </div>
</template>

<script>
import prefabJson from './components/prefab-json'
import prefabRecord from './components/prefab-record'
import prefabCustimize from './components/prefab-customize'
import { ref } from 'vue'

export default {
  name: "prefab-data",
  components:{
    prefabJson, prefabRecord, prefabCustimize
  },
  setup(){
    let Prefabs = ref([]) // 定义一个默认值为0的响应式变量count

    return{
      Prefabs
    }
  }
}
</script>

<style scoped lang="scss">

</style>