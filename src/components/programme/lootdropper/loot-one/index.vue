<template>
  <found-lua @sucess="doSucess"></found-lua>
  <div class="loot-one">
    <div>{{tableData && tableData.data?'当前选择：'+tableData.name:'👈请先选择修改的预设物'}}</div>
    <div style="font-size: 10px;margin-top: 5px">
      预设物填 预设物代码 不知道的可以左侧复制，掉落概率1为100%,0.01为1% 填写值必须在0-1之间 <br/>
      请注意：所修改的预设物必须拥有 lootdropper 组件
    </div>
    <div class="addLoot">
      <el-button type="primary" icon="el-icon-edit"  @click="tableData.data.push({prefab:'',probability:0.3})">增加一列</el-button>
    </div>
    <div class="content">
      <el-table
          class="loot-content"
          :data="tableData && tableData.data"
          max-height="250">
        <el-table-column
            prop="prefab"
            label="预设物"
            width="250">
          <template v-slot="scope">
            <el-input v-model="scope.row.prefab" placeholder="请输入预设物代码"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            prop="probability"
            label="掉落概率"
            width="150">
          <template v-slot="scope">
            <el-input v-model="scope.row.probability" placeholder="请输入掉落概率(0-1之间)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template v-slot="">
            <el-button type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
import programme from "@/mixins/programme"
import foundLua from '@/components/found-lua'
export default {
  name: "index",
  mixins:[programme],
  components:{
    foundLua
  },
  methods:{
    doSucess(){
      let modmain = []
      let selectPrefabs = this.selectPrefabs
      for (let i in selectPrefabs){
        const preName = selectPrefabs[i].data
        let LootTable = `` // `{'bearger_fur',0.05},`
        for (let k = 0;k < preName.length;k++) {
          LootTable = LootTable + `{'${preName[k].prefab}',${preName[k].probability}},`
        }

        // 设置掉落表
        let SetSharedLootTable = `SetSharedLootTable('${selectPrefabs[i].value}',{ ${LootTable}})`
        // 设置预设
        let content = `${SetSharedLootTable} AddPrefabPostInit('${selectPrefabs[i].value}',function(inst)\
        if inst:AddComponent('lootdropper') then \
        inst.components.lootdropper:SetChanceLootTable('${selectPrefabs[i].value}_loot') \
        end \
        end)`
        modmain.push(content)
        console.log(modmain)
      }
      let data = []
      data = modmain.join(' ')
      console.log(data)
      this.getData(data)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .loot-one{
  //.el-table__fixed{
  //  width: 60vw;
  //}
}
  .loot-one{
    height: 100%;
    .addLoot{
      position: absolute;
      margin-top: 10px;
      right: 10vw;
    }
    .content {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      .loot-content{
        width: 60vw;
      }
    }
  }
</style>