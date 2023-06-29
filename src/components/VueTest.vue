<template>
  <div>
    <h1>{{ msg }}</h1>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'VueTest',
  data() {
    return {
      msg: '开心记账本',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

  methods: {

    //加载列表数据
    loadTableData() {
      //发请求给后台
      this.$http.get("/account/getAllAccount", {}).then(response => {
        //打印数据在控制台
        console.log(this.tableData);
      });
    },

  },

  //钩子函数(页面初始化时，钩子函数就会被执行)
  mounted() {
    this.loadTableData();
  }

}
</script>

<style scoped>
</style>
