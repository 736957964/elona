<template>
  <div class="prefab-record">
    当前加载数据：{{Prefabs.length}}
    <div class="prefab-json" v-infinite-scroll="load" infinite-scroll-delay="300">
      <draggable class="transition-group" v-model="Prefabs" @end="end1" animation="300" :move="onMove"
                 :disabled="false" :options="{group:{name: 'itxst',pull:'clone'},sort: true}"  >
        <transition-group>
          <div v-for="(item, val) in Prefabs" :key="val" class="json-data" >
            <el-tooltip ref="tooltip" effect="dark" :content="item.name" placement="top" :disabled="isDisabled(val)" v-if="item.name !=='MISSING NAME'">
              <span>{{val+10}}</span>
              <span v-if="false">{{item.name}}</span>
            </el-tooltip>
            <el-tooltip ref="tooltip" effect="dark" :content="item.value" placement="top" :disabled="isDisabled(val)" v-else>
              <span>{{val+10}}</span>
              <span v-if="false">{{item.value}}</span>
            </el-tooltip>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>


<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { ref, reactive } from 'vue'
import PrefabsGather from '@/json/PrefabsGather.json'

export default {
  name: "prefab-data",
  components:{
    draggable: VueDraggableNext
  },
  setup(){
    let Prefabs = ref([]) // 定义一个默认值为0的响应式变量count
    let count = reactive(199)
    let moveId = reactive('')
    getJsonData()
    function getJsonData(){ Prefabs.value = PrefabsGather.PrefabsValue.slice(0, count) }
    function load(){ count += 60; getJsonData() }
    let isDisabled = () => {
      return true
    }

    // 左边往右边拖动时的事件
    function end1(e){
      console.log('左边往右边拖动时的事件')
      console.log(e)
    }
    function onMove(e, originalEvent){
      if (e.from.parentNode.className === 'prefab-json') {
        return false
      } else {
        return true
      }
    }

    return{
      Prefabs, PrefabsGather, count, load,
      isDisabled,
      end1, onMove
    }
  }
}
</script>

<style scoped lang="scss">
.prefab-record{
  .prefab-json{
    margin-left: 20px;
    margin-top: 20px;
    width: 40vw;
    height: 30vw;
    max-height: 400px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    .transition-group{
      display: flex;
      flex-wrap: wrap;
    }
    .json-data{
      margin: 3px;
      padding: 2px;
      display: block;
      width: 80px;
      line-height: 30px;
      font-size: 12px;
      text-align: center;
      border: 1px solid black;

      text-overflow:ellipsis;
      white-space:nowrap;
      overflow: hidden;
    }
  }
}
</style>