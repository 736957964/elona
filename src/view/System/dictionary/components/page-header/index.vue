<template lang="html">
  <el-form ref="form" class="page-header" :inline="true" :model="form">
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4">
        <el-form-item prop="keyName">
          <el-input
            v-model="form.keyName"
            placeholder="请输入字典名称"
            @keyup.enter="doSearch"
          />
        </el-form-item>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4">
        <el-form-item prop="dictkey">
          <el-input
            v-model="form.dictkey"
            placeholder="请输入字典值"
            @keyup.enter="doSearch"
          />
        </el-form-item>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4">
        <el-form-item prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4">
        <div class="" style="width:188px;">
          <el-button
            type="primary"
            :disabled="btnDisabled"
            @click="doSearch"
          >搜索</el-button>
          <el-button :disabled="btnDisabled" @click="doReset">重置</el-button>

        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import pageHeaderMixin from '@/mixins/pageHeaderMixin'
export default {
  name: '',
  components: {},
  mixins: [pageHeaderMixin],
  props: {},
  data() {
    return {
      form: {
        // 字典名称
        keyName: '',
        // 字典名称
        dictkey: '',
        // 状态
        status: ''
      },
      // 状态配置文件
      statusOptions: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '停用',
          value: 0
        }
      ]

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
