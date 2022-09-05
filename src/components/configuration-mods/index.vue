<template>
  <div class="configuration-mods text-line-feed">
    <mods-top @success="success"/>
    <div class="content-mods">
       <div class="mod-right">
         <div class="right d2-ml-10"  style="display: flex;height: 100%">
           <div class="left-wrapper" >
             <div class="card-title" >
               <span>自定义：</span>
             </div>
             <el-card shadow="never" class="left-card">
               <div v-for="(item, index) in Object.keys(fieldsArr)" :key="index" style="display:flex;flex-wrap: wrap">
                 {{item}}:
               <draggable
                   class="left-drag-wrapper" :list="fieldsArr[item]"
                   :clone="val => domClone({ val, type: 'field' })"
                   v-bind="{ group: { name: 'ariItemLeft', pull: 'clone', put: false }, sort: false, dragClass: 'left-drag-item'}"
                   @end="dragEnd"
               >
                   <div
                       v-for="(item2, index2) in fieldsArr[item]"
                       :key="index2"
                       class="left-item "
                       @click.stop="dragClick({ item2, type: 'field' })"
                   >
                     <div class="text showEllipsis">{{ item2.COLUMN_COMMENT }}</div>
                   </div>
               </draggable>
               </div>
             </el-card>
           </div>

           <div >
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
                     <span class="text top-input-item" >{{ item.dictValue || item.dictName }}</span>
                   </div>
                 </draggable>
               </el-card>
             </div>

             <div class="bottom-wrapper" flex="dir:top" style="max-height: calc(100vh - 250px);overflow-y: auto;">
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
                       <!--终止符号-->
                       <div v-if="item.value === '3'">;</div>
                       <!-- 其他 -->
                       <div v-else class="showEllipsis">  {{ item.dictValue || item.dictName || item.COLUMN_COMMENT }} </div>
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
    <div class="btn d2-mt-20" style="position: absolute;right: 10px">
<!--      <el-button type="primary" @click="GenerateModmain(itemArr,1)">生成功能模板</el-button>-->
      <el-button type="primary" @click="GenerateModmain(itemArr,2)">生成功能指令</el-button>
    </div>
    <fun-instruction-dialog v-model:dialog-visible="testDialog" :current-row-obj="currentRowObj" @success="fnDoSuccess" />
  </div>
</template>

<script>
import { DictList } from '@/api/system/dict'
import { uuid } from '@/libs/uuid'
import { cloneDeep } from '@/libs/mUtils'
import { VueDraggableNext } from 'vue-draggable-next'
import modsTop from './components/mods-top'
import { getSqlValue } from '@/api/base'
import funInstructionDialog from '@/components/configuration-mods/components/fun-instruction-dialog'
export default {
  name: "index",
  components:{
    draggable: VueDraggableNext,
    modsTop, funInstructionDialog
  },
  data() {
    return {
      testDialog:false,
      currentRowObj:{}, // 处理好的数据
      // 表字段集合
      fieldsArr: [],
      // 中间底部数据
      itemArr: [],
      // 当前激活的id
      currentActiveId: '',
      // 公式配置文件
      formulaOptions: [
        // { "name":"+", "value":"3", customContent:' + ' }, { "name":"-", "value":"4", customContent:' - ' }
      ],
      // 公式自定义值配置文件
      formulaCustomFieldOptions: [
        { name:"String", value:"0" },
        { name:"Number", value:"1" },
        { name:"Boolean", value:"2" },
        { name:"分隔符", value:"3" }
      ],
    }
  },
  created() {
    this.initialization()
  },
  methods:{
    change(val){
      console.log(val)
    },
    async initialization(){
      const { data } = await DictList('formula')
      this.formulaOptions = data
      if(this.$route.query.isGet || this.$route.query.isClone){
        const funInstruction = JSON.parse(sessionStorage.getItem('funInstruction'))
        const { funJson, instructName, remarks, id } = funInstruction
        this.itemArr = JSON.parse(funJson) || []
        this.currentRowObj = {
          instructName, remarks,
          ...(this.$route.query.isGet ? { id } : '')
        }
      }
    },
    fnDoSuccess(){
      this.currentRowObj = {}
      this.itemArr = []
    },
    async success(val){
      let sql = "SELECT TABLE_NAME,COLUMN_NAME,DATA_TYPE,COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='elona' AND TABLE_NAME = 'si'"
      this.fieldsArr = []
      val && val.forEach((res) => {
        sql = `${sql} OR TABLE_NAME='${res}' `
        this.fieldsArr[res] = []
      })
      const { data } = await getSqlValue({ sqlValue:sql })
      data.forEach((res) => {
        !['id', 'Id'].includes(res.COLUMN_NAME) && this.fieldsArr[res.TABLE_NAME].push(res)
      })
      console.log(this.fieldsArr)
    },
    GenerateModmain(val){
      let string = ''
      let QUERY_TABLE = []
      let data = JSON.parse(JSON.stringify(val))
      data.forEach((res)=> {
        console.log(res)
        switch (true){
          case !!res.dictValue:
            switch (res.dictValue){
              case 'if':  string = string + 'if(';break
              case 'then':  string = string + '){';break
              case 'end':  string = string + '}';break
              case 'else':  string = string + '}else{';break
              case 'return false':
                if(string.charAt(string.length - 1) === '{'){ string = `${string} returns = false` }else { string = string + ';returns = false'  }
                break
              case 'return true':
                if(string.charAt(string.length - 1) === '{'){ string = `${string} returns = true`}else {  string = string + ';returns = true' }
                break
              default:string = `${string} ${res.dictValue}`
            }
            break
          case !!res.TABLE_NAME:
            string =  `${string}data.${res.TABLE_NAME}.${res.COLUMN_NAME}`
            QUERY_TABLE.push(res.TABLE_NAME)
            break
          case (!!res.customContent || res.customContent === 0):
            string = `${string} ${res.customContent}`
            break
          case res.name === '分隔符':
            string = `${string};`
            break
          default:
        }
        // console.log(string)
      })
      QUERY_TABLE = [...new Set(QUERY_TABLE)] // 去重
      const { instructName, remarks, id } = this.currentRowObj
      this.currentRowObj = {
        ...{ instructName, remarks, id },
        funJson:JSON.stringify(val), // 回显的数据
        jsEval:string, // 需要执行的指令
        QUERY_TABLE: QUERY_TABLE.join(',') // 需要进行查询的表
      }
      this.testDialog = true
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
    padding: 10px;
    .content-mods{
      padding-top: 10px;
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
        max-height: calc(100vh - 250px);
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
          height: 250px;
          overflow-y: auto;
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