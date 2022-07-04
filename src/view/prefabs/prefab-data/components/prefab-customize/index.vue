<template>
  <div class="prefab-customize">
    <div class="customize-left">
      <draggable v-model="selectPrefabs" @end="end2" group="itxst" animation="300" :move="onMove" :disabled="false"
                 :class="selectPrefabs.length?'customize-group group-bgColor':'customize-group group-bgColor prompt' ">
<!--        <transition-group class="customize-group">-->
          <div v-for="(item, val) in selectPrefabs" :key="val" style="z-index:33;" @click="PrefabsIndex = val">{{item.name}}</div>
<!--        </transition-group>-->
      </draggable>
      <div class="left-bottom">
        <div style="color: rebeccapurple">当前选择方案{{setScheme+1}}</div>
        <div style="color: rebeccapurple">当前选择的预设物:{{selectPrefabs[PrefabsIndex]&&selectPrefabs[PrefabsIndex].name}}</div>
        <div :class="val === setScheme?'selectColor bot-dv':'bot-dv'"
             v-for="(item,val) in 5" :key="val" @click="setScheme = val">方案{{item}}</div>
      </div>
    </div>
    <div class="customize-content">
      <programme :selectPrefabs = "selectPrefabs" :currentPrefabsData="selectPrefabs && selectPrefabs[PrefabsIndex]" @setPrefabsData="setPrefabsData"></programme>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { ref, reactive } from 'vue'
import programme from '@/components/programme'

export default {
  name: "index",
  components:{
    draggable: VueDraggableNext, programme
  },
  setup(){
    let selectPrefabs = ref([])
    let setScheme = ref(0) // 选择的方案
    let PrefabsIndex = ref(0) // selectPrefabs中点击的index
    // 右边往左边拖动时的事件
    function end2(e){
      console.log('右边往左边拖动时的事件')
      console.log(e)
    }
    function onMove(e, originalEvent){
      return true;
    }
    function setPrefabsData(data){ // 设置 selectPrefabs[PrefabsIndex] 当前选中的prefabs的值
      selectPrefabs.value[PrefabsIndex] = data
      console.log(selectPrefabs.value[PrefabsIndex])
    }
    return {
      selectPrefabs, setScheme, PrefabsIndex,
      end2, onMove, setPrefabsData
    }
  }
}
</script>

<style scoped lang="scss">
.prefab-customize{
  margin-top: 20px;
  width: 100%;
  height: 40vh;
  display: flex;
  .customize-left{
    width: 30%;
    height: 100%;
    background-color: #cecece;
    .prompt:after{
      position: absolute;
      content:"拖拽区域";
      color: #9793ea;
      font-weight:bold;
      font-size: 2vw;
      align-content: center;
      display: flex;
      justify-content: center;
      width: 30%;
      min-height: 15vh;
    }
    .customize-group{
      min-height: 15vh;
    }
    .group-bgColor{
      background-color: #F3F3E0;
      z-index: -1;
    }

    .left-bottom{
      .bot-dv {
        line-height: 30px;
      }
      .selectColor{
        color:red;
      }
    }
  }
  .customize-content{
    width: 65%;
    height: 100%;
    background-color: aliceblue;
  }
 }
</style>