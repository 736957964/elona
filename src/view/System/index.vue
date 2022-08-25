<template>
  <div class="system">
    <div class="system-top">
      <div class="top-title"> ＜ 系统设置</div>
    </div>
    <div class="system-content">
      <div class="content-left">
        <div v-for="(item,val) in routerUrl" :key="val" :class="rouerIndex===val?'leftContent leftContentCor':'leftContent ContentHove'"
             @click="$router.replace(item.path);rouerIndex=val">
          <div class="leftContent-text">{{item.name}}</div>
        </div>
      </div>
      <div class="content-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "index",
  setup(){
    let rouerIndex = reactive(-1)
    let routerUrl = ref([
      { path:'/system/mode', name: '自定义',  },
      { path:'/system/dictionary', name: '字典' },
      { path:'/system/funInstruction', name: '功能指令' },
      { path:'/system/instruct', name: '指令合集' }
    ])
    return {
      routerUrl, rouerIndex
    }
  }
}
</script>

<style scoped lang="scss">
.system{
  //height: 100vh;
  background-color: $color-bg;
  .system-top{
    line-height: #{$top};
    background-color: white;
    display: flex;
    align-content: center;
    .top-title{
      cursor:pointer;
      font-size:20px;
      padding-left: 20px;
    }
  }
  .system-content{
    height: calc(100vh - 80px);
    display: flex;
    .content-left{
      min-width: 230px;
      background-color: white;
      .leftContent{
        width: 100%;
        display: flex;
        align-content: center;
        line-height: 50px;
        cursor:pointer;
        .leftContent-text{
          padding-left: 50px;
        }
      }
      .ContentHove:hover{
        background-color: $color-bg;
      }
      .leftContentCor{
        background-color: $color-cor1;
      }
    }
    .content-right{
      width: calc(100vw - 245px);
      background-color: white;
      margin-top: 10px;
      margin-left: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>