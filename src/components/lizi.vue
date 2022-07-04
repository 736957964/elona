<template>
  <div>
    <!--使用draggable组件-->
    <div class="itxst">
      <div style="padding-left:6px">clone例子,左边往右边拖动试试看</div>
      <div class="col">
        <draggable v-model="arr1"   @end="end1" :options="{group:{name: 'itxst',pull:'clone'},sort: true}"  animation="300"  :move="onMove">
          <transition-group>
            <div :class="item.id==1?'item forbid':'item'" v-for="item in arr1" :key="item.id">{{item.name}}</div>
          </transition-group>
        </draggable>
      </div>
      <div class="col">
        <draggable v-model="arr2"   @end="end2" group="itxst"  animation="300" :move="onMove">
          <transition-group>
            <div :class="item.id==12?'item2 forbid':'item2'" v-for="item in arr2" :key="item.id">{{item.name}}</div>
          </transition-group>
        </draggable>
      </div>
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
    let arr1 = ref([
      { id: 1, name: 'www.itxst.com（不允许停靠）' },
      { id: 2, name: 'www.jd.com' },
      { id: 3, name: 'www.baidu.com' },
      { id: 5, name: 'www.google.com' },
      { id: 4, name: 'www.taobao.com（不允许拖拽）' }
    ])
    let arr2 = ref([{ id: 11, name: '常用菜单' }])
    let moveId = reactive(-1)
    function end1(e){
      console.log(e)
      let items = arr2.value.filter(function(m){
        return  m.id == moveId
      })
      // 如果左边
      if(items.length < 2) return;
      arr2.value.splice(e.newDraggableIndex, 1)
    }
    function end2(e){
      console.log(e)
      var  items = arr1.value.filter(function(m){
        return  m.id == moveId
      })
      // 如果左边
      if(items.length < 2) return;
      arr1.value.splice(e.newDraggableIndex, 1)
    }
    // move回调方法
    function onMove(e, originalEvent){
      moveId = e.relatedContext.element.id;
      // 不允许停靠
      if (e.relatedContext.element.id == 1) return false;
      // 不允许拖拽
      if (e.draggedContext.element.id == 4) return false;
      if (e.draggedContext.element.id == 11) return false;
      return true;
    }
    return{
      arr1, arr2, moveId, end1, end2, onMove
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


.itxst {
  margin: 10px;
  text-align :left;
}
.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}
.col + .col {
  margin-left: 10px;
}
.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
  text-align: left;
}
.item + .item {
  border-top: none;
  margin-top: 6px;
}

.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}
.item2 {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: pink;
  text-align: left;
}
.item2 + .item2 {
  border-top: none;
  margin-top: 6px;
}

.item2:hover {
  outline: solid 1px #ddd;
  cursor: move;
}
</style>