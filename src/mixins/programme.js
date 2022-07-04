// import { ref, reactive } from 'vue'
import { VueDraggableNext } from "vue-draggable-next";
export default {
  props: {
    selectPrefabs: {
      type: Array,
      default: ()=> []
    },
    currentPrefabsData: {
      type: Object,
      default: ()=> {}
    },
  },
  components:{
    draggable: VueDraggableNext
  },
  watch: {
    currentPrefabsData(val){
      this.tableData = val
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  emits:['setPrefabsData', 'selectPrefabsData'],
  methods:{
    selectPrefabsData(data){
      this.$emit('setPrefabsData', data)
    },
    downloadTxt(text, fileName) {
      let element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', fileName)
      element.style.display = 'none'
      element.click()
    },
    getData(data) {
      this.downloadTxt(data, 'modmain.lua');// 测试案例
    }
  }

}