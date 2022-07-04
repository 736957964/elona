<template>
  <div class="prefab-record">
    当前加载数据：{{Prefabs.length}} ------当前数据总数：{{PrefabsGather.PrefabsValue.length}}
    <div class="prefab-json" v-infinite-scroll="load" infinite-scroll-delay="300">
      <draggable class="transition-group" v-model="Prefabs" @end="end1" animation="300" :move="onMove" group="itxst"
                 :disabled="false" :options="{group:{name: 'itxst',pull:'clone'},sort: true}"  >
        <transition-group>
          <div v-for="(item, val) in Prefabs" :key="val" class="json-data" @click="PrefabsValue = item.value">
            <text-prompt ref="tooltip" :textData="item.name" v-if="item.name !=='MISSING NAME'"></text-prompt>
            <text-prompt ref="tooltip" :textData="item.value" v-else></text-prompt>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div class="PrefabsValue">
      <span>预设物代码：</span>
      <span style="margin-right: 10px;" id="Values">{{PrefabsValue}}</span>
      <span class="duplicate" @click="prefabCopy"> 复制 </span>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { ref, reactive } from 'vue'
import PrefabsGather from '@/json/PrefabsGather.json'
import textPrompt from '@/components/text-prompt'
export default {
  name: "prefab-data",
  components:{
    draggable: VueDraggableNext, textPrompt
  },
  setup(prop){
    let Prefabs = ref([]) // 定义一个默认值为0的响应式变量count
    let count = reactive(199)
    let moveData = reactive('') //
    let currentInstance = ''
    onMounted(() => {
      currentInstance = getCurrentInstance()
    })
    getJsonData()
    function getJsonData(){ Prefabs.value = PrefabsGather.PrefabsValue.slice(0, count) }
    function load(){ count += 30; getJsonData() }
    let isDisabled = () => {
      return true
    }
    // 左边往右边拖动时的事件
    function end1(e){
      console.log(moveData.to.className)
      let className = moveData.to.className
      if (className === 'customize-group group-bgColor' || className === 'customize-group group-bgColor prompt') {
        Prefabs.value[e.newDraggableIndex].data = []
        moveData.relatedContext.list.push(Prefabs.value[e.newDraggableIndex])
      }
      // className === 'transition-group'
      console.log(e.newDraggableIndex)
    }
    function onMove(e, originalEvent){
      // console.log(e) // customize-group group-bgColor
      moveData = e
      return false
    }
    let PrefabsValue = ref('无')
    function prefabCopy(){ // 复制功能
      let _input = document.createElement("input"); // 直接构建input
      _input.value = PrefabsValue.value; // 设置内容
      document.body.appendChild(_input); // 添加临时实例
      _input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(_input); // 删除临时实例
    }
    return{
      Prefabs, PrefabsGather, count, load, PrefabsValue,
      isDisabled, prefabCopy,
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
    max-height: 300px;
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
  .PrefabsValue{
    margin-top: 15px;
    .duplicate{
      color: red;
    }
  }
}
</style>