import FooterPage from '@/components/footer-page'
export default {
  components: {
    FooterPage
  },
  data(){
    return {
      total: 0, // 总数
      currentPage: 1, // 当前页码数
      pageSize: 10, // 一页多少条
      tableData: [], // 数据
      isPageData: true, // 是否为分页的列表
    }
  },
  methods:{

  }
}