<template>
  <div class="configuration-mods text-line-feed">
    <div class="content-mods">
       <div class="mod-right">
<!--         <div class="content-type"></div>-->
<!--         <div class="content-mark"></div>-->
<!--         <div class="content-dispose"></div>-->
         <div class="right d2-ml-10"  style="display: flex;height: 100%">
           <div class="left-wrapper" >
             <div class="card-title" >
               <span>自定义：</span>
             </div>
             <el-card shadow="never" class="left-card">
               <draggable
                   class="left-drag-wrapper" :list="fieldsArr"
                   :clone="val => domClone({ val, type: 'field' })"
                   v-bind="{ group: { name: 'ariItemLeft', pull: 'clone', put: false }, sort: false, dragClass: 'left-drag-item'}"
                   @end="dragEnd"
               >
                 <div
                     v-for="(item, index) in fieldsArr"
                     :key="index"
                     class="left-item "
                     @click.stop="dragClick({ item, type: 'field' })"
                 >
                   <div class="text showEllipsis">{{ item.name }}</div>
                 </div>
               </draggable>
             </el-card>
           </div>

           <div>
             <div class="same-right-wrapper">
               <div class="card-title" ><span>自定义值类型：</span></div>
               <el-card shadow="never" class="top-card">
                 <draggable class="same-right-drag-wrapper " v-bind="{ group: { name: 'ariItemTop', pull: 'clone', put: false },sort: false, dragClass: 'top-drag-item' }"
                            :list="formulaCustomFieldOptions"  :clone="val => domClone({ val, type: 'customField' })"  @end="dragEnd"
                 >
                   <div v-for="(item, index) in formulaCustomFieldOptions"  :key="index" class="same-right-item top-item"  @click.stop="dragClick({ item, type: 'customField' })">
                     <span class="text top-input-item" >{{ item.name }}</span>
                   </div>
                 </draggable>
               </el-card>
             </div>

             <div class="same-right-wrapper">
               <div class="card-title" flex="main:justify cross:center"><span>公式元素符：</span></div>

               <el-card shadow="never" class="top-card">
                 <draggable class="same-right-drag-wrapper"
                            v-bind="{ group: { name: 'ariItemCenter', pull: 'clone', put: false },sort: false,dragClass: 'center-drag-item'}"
                            :list="formulaOptions" :clone="val => domClone({ val, type: 'operator' })"  @end="dragEnd"
                 >
                   <div v-for="(item, index) in formulaOptions" :key="index" class="same-right-item center-item" @click.stop="dragClick({ item, type: 'operator' })">
                     <span class="text top-input-item" >{{ item.name }}</span>
                   </div>
                 </draggable>
               </el-card>
             </div>

             <div class="bottom-wrapper" flex="dir:top">
               <div class="card-title" flex="main:justify cross:center">
                 <span>公式：</span>
                 <el-button type="text" :disabled="!itemArr.length" @click="doClear"><i class="icon iconfont icon-lajitong clear" />清空</el-button>
               </div>

               <el-card shadow="never" class="bottom-card">
                 <draggable class="bottom-drag-wrapper"
                            v-bind="{ group: { name: 'ariItemBottom', put: ['ariItemLeft', 'ariItemTop', 'ariItemCenter']}, animation: 150,  ghostClass: 'sortable-ghost',dragClass: 'bottom-drag-item'}"
                            :list="itemArr" @change="dragChange" @end="dragEnd"
                 >
                   <div v-for="(item, index) in itemArr" :key="index" class="bottom-item" @click.stop="bottomClick({ index })" >
                     <div class="bottom-item-content "
                          :class="{ 'is-active': item.isActive && item.type !== 'customField', 'input-item': item.type === 'customField',
                       'is-same-right': item.type === 'operator', 'is-left': item.type === 'field'}"
                     >
                       <template v-if="item.type === 'customField'">
                         <!-- String -->
                         <el-input v-if="item.value === '0' || item.value === '100' " v-model="item.customContent" :class="item.value==='100'?'bord-color':''" />

                         <!-- Number -->
                         <el-input-number v-else-if="item.value === '1' || item.value === '101'" v-model="item.customContent" :class="item.value==='101'?'bord-color':''" controls-position="right" />

                         <!-- Boolean -->
                         <el-select v-else-if="item.value === '2' || item.value === '102'"  v-model="item.customContent" placeholder="请选择" :class="item.value==='102'?'bord-color':''" >
                           <el-option  v-for="subItem in [ { label: 'true', value: true }, { label: 'false', value: false } ]"
                                       :key="subItem.value" :label="subItem.label"  :value="subItem.value"
                           />
                         </el-select>
                       </template>

                       <!-- 其他 -->
                       <div v-else class="showEllipsis">  {{ item.name }} </div>
                     </div>
                     <svg @click.stop="doDel({ id: item.id })" t="1641541601643" class="icon el-icon-error" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2699" width="16" height="16"><path d="M512 102.4a409.6 409.6 0 1 0 409.6 409.6 409.6 409.6 0 0 0-409.6-409.6z m181.248 518.144a51.2 51.2 0 0 1-72.704 72.704L512 584.192l-108.544 109.056a51.2 51.2 0 0 1-72.704-72.704L439.808 512 330.752 403.456a51.2 51.2 0 0 1 72.704-72.704L512 439.808l108.544-109.056a51.2 51.2 0 0 1 72.704 72.704L584.192 512z" fill="" p-id="2700"></path></svg>
                   </div>
                 </draggable>

                 <div v-if="!itemArr.length" class="empty-text"  flex="main:center cross:center" >请配置公式 </div>
               </el-card>
             </div>
           </div>

         </div>
       </div>
     </div>
    <div class="btn">
      <el-button type="primary" @click="GenerateModmain(itemArr)">生成代码</el-button>
<!--      <el-button type="primary" @click="GenerateModmain">生成modmain</el-button>-->
    </div>
  </div>
</template>

<script>
import { uuid } from '@/libs/uuid'
import { cloneDeep } from '@/libs/mUtils'
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  name: "index",
  components:{
    draggable: VueDraggableNext
  },
  data() {
    return {
      // 表字段集合
      fieldsArr: [
        { value:"sz_12", name:"测试1", fieldType:"inputNumber" },
        { value:"srk2_13", name:"测试2", fieldType:"inputText" },
        { value:"dx_11", name:"测试3", fieldType:"radio" },
      ],
      // 中间底部数据
      itemArr: [],
      // 当前激活的id
      currentActiveId: '',
      // 公式配置文件
      formulaOptions: [
        { "name":"+", "value":"3", customContent:' + ' }, { "name":"-", "value":"4", customContent:' - ' },
        { "name":"*", "value":"5", customContent:' * ' }, { "name":"/", "value":"6", customContent:' / ' },
        { "name":"(", "value":"8", customContent:'(' }, { "name":")", "value":"9", customContent:')' },
        { "name":"and", "value":"10", customContent:' and ' }, { "name":"or", "value":"11", customContent:' or ' },
        { "name":"==", "value":"12", customContent:' == ' },
        // { "name":"includes", "value":"13" },
        { "name":"<", "value":"14", customContent:' < ' }, { "name":"<=", "value":"15", customContent:' <= ' },
        { "name":">", "value":"16", customContent:' > ' }, { "name":">=", "value":"17", customContent:' >= ' },
        { "name":"~=", "value":"18", customContent:' ~= ' }, { "name":"=", "value":"19", customContent:' = ' },
        { "name":"if", "value":"20", customContent:' if ' }, { "name":"end", "value":"21", customContent:' end ' },
        { "name":"then", "value":"21", customContent:' then ' }
      ],
      // 公式自定义值配置文件
      formulaCustomFieldOptions: [
        { name:"String", value:"0" },
        { name:"Number", value:"1" },
        { name:"Boolean", value:"2" },
        { name:"zdy-String", value:"100" },
        { name:"zdy-Number", value:"101" },
        { name:"zdy-Boolean", value:"102" }
      ],
    }
  },
  methods:{
    GenerateModmain(val){
      let string = ''
      let data = JSON.parse(JSON.stringify(val))
      console.log(data)
      data.forEach((res)=> {
        string = string + res.customContent
      })
      console.log(string)
    },
    /**
     * clone数据格式化
     */
    domClone({ val, type }) {
      const tempVal = cloneDeep(val)
      const id = uuid()
      const { value } = tempVal
      this.currentActiveId = id
      return {
        ...tempVal, id, isActive: false, type, ...this.getCustomObj({ type, value })
      }
    },
    /**
     * 获取字段对象
     */
    getCustomObj({ type, value }) {
      return (
        type === 'customField' && {
          customContent: this.setCustomContent({ value })
        }
      )
    },
    /**
     * 设置customContent的默认值
     */
    setCustomContent({ value }) {
      switch (value) {
        case '0':
          return ''
        case '1':
          return 0
        case '2':
          return true
      }
    },
    /**
     * 左侧+顶部点击事件
     */
    dragClick({ item, type }) {
      let curActiveIndex = this.itemArr.length
      this.itemArr.map((item, index) => {
        if (item.isActive) { item.isActive = false; curActiveIndex = index }
      })
      const { value } = item
      this.itemArr.splice(curActiveIndex + 1, 0, {
        ...item, id: uuid(), isActive: true, type, ...this.getCustomObj({ type, value })
      })
    },
    /**
     * 左边+顶部拖拽结束
     */
    dragEnd(evt) {
      this.itemArr.map((item, index) => {
        item.isActive = item.id === this.currentActiveId
      })
    },
    /**
     * 清空
     */
    async doClear() {
      await this.$myConfirm('确定要清空配置的公式吗', this)
      this.itemArr = []
    },
    /**
     * 底部容器的拖拽
     */
    dragChange(val) {
      const { element: { id } } = Object.values(val)[0]
      this.currentActiveId = id
    },
    /**
     * 底部删除
     */
    async doDel({ id }) {
      await this.$myConfirm('确定要删除本元素吗', this)
      for (let i = 0; i < this.itemArr.length; i++) {
        if (this.itemArr[i].id === id) { this.itemArr.splice(i, 1); break }
      }
      // 设置第一项选中
      if (this.itemArr.length) {
        this.itemArr.map((item, index) => { item.isActive = index === 0 })
      }
    },
    /**
     * 底部点击事件
     */
    bottomClick({ index: clickIndex }) {
      this.itemArr.map((item, index) => { item.isActive = clickIndex === index })
    },
  }
}
</script>

<style scoped lang="scss">
  .configuration-mods{
    height: 100%;
    .content-mods{
      padding: 10px;
      .mod-left{
        .mod-left-content{
          width: 30%;
          height: 100%;
          border: 1px solid #C0C0C0;
        }
      }
    }
    .btn{
      //position: absolute;
      //right: 50px;
      margin-left: 50px;
    }
  }
</style>

<style lang="scss">
@mixin cardStyle($width: 50px) {
  background: #f4f6fc;
  width: $width;
  height: 30px;
  margin: 5px;
  cursor: move;
  border: 1px solid #f4f6fc;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-icon-error{
  font-size: 50px;
  color: rebeccapurple;
}
.configuration-mods {
  .mod-right {
    height: 100%;
    .left-wrapper {
      min-height: 100%;
      display: flex;
      flex-direction:column;
      flex-wrap: nowrap;
      .left-card {
        flex: 1;
        flex-shrink: 0;
        width: 240px;
        overflow-y: auto;
        .left-drag-wrapper {
          display: flex;
          flex-wrap: wrap;
          .left-item {
            font-size: 12px;
            @include cardStyle();
            flex: 0 0 calc(50% - 10px);
            &:nth-child(2n) {
              margin-left: 5px;
            }
            &:nth-child(2n + 1) {
              margin-right: 5px;
            }
            &:hover {
              color: #409eff;
              border: 1px dashed #409eff;
            }
          }
        }
      }
    }

    .right {
      flex: 1;
      .top-card {
        .same-right-drag-wrapper {
          display: flex;
          flex-wrap: wrap;
          .same-right-item {
            @include cardStyle();
            &:hover {
              color: #409eff;
              border: 1px dashed #409eff;
            }
            .top-input-item {
              font-size: 12px;
            }
          }
        }
      }

      .bottom-wrapper {
        flex: 1;
        .bottom-card {
          flex: 1;
          .el-card__body {
            min-height: 300px;
            position: relative;
            height: 100%;
            box-sizing: border-box;
            .bottom-drag-wrapper {
              min-height: 40px;
              display: flex;
              flex-wrap: wrap;
              .bottom-item {
                position: relative;
                .bottom-item-content {
                  @include cardStyle();
                  text-align: center;
                  line-height: 30px;
                  .bord-color{
                    .el-input__inner{
                      border: 1px solid red!important;
                      color: red;
                      border-radius: 2px;
                    }
                  }
                  &:not(.input-item):hover,
                  &.is-active {
                    background: #ecf5ff;
                    color: #409eff;
                    border: 1px solid #409eff;
                  }
                  &.is-same-right {
                    // 这个有些重复了
                    width: 50px;
                    font-size: 12px;
                  }
                  &.input-item {
                    width: 100px;
                    .el-input-number {
                      width: 100% !important;
                    }
                  }
                  &.is-left {
                    width: 100px;
                    font-size: 12px;
                  }
                }
                .el-icon-error {
                  position: absolute;
                  top: -2px;
                  right: -2px;
                  z-index: 1;
                  cursor: pointer;
                  display: none;
                }
                &:hover {
                  .el-icon-error {
                    display: inline;
                  }
                }
              }
            }
            .empty-text {
              position: absolute;
              right: 0;
              left: 0;
              bottom: 0;
              top: 0;
              font-size: 20px;
              color: #ccc;
            }
          }
        }
      }
    }
  }
  // 拖拽样式
  .sortable-ghost {
    &.left-item,
    &.top-item,
    &.center-item {
      background: #f56c6c;
      margin-top: 5px;
      margin-left: 5px;
      border: none;
      height: 4px;
      box-sizing: border-box;
      // 不得已才这样写，感觉没有解决问题
      overflow: hidden;
      .text {
        line-height: 2;
      }
    }

    &.left-item {
      width: 100px;
    }

    &.top-item {
      width: 100px;
    }

    &.center-item {
      width: 50px;
    }
  }
}
</style>