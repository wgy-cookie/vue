<template>
  <div>
    <h1>{{ msg }}</h1>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <el-button type="success" @click="addHandle">新增账目</el-button>

    <el-divider></el-divider>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      @row-click="rowClickHandle"
      style="width: 100%;margin-bottom: 100px;">
      <el-table-column
        prop="accountType"
        label="账目类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.accountType == 1" type="success">收入</el-tag>
          <el-tag v-if="scope.row.accountType == 2" type="danger">支出</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="accountDesc"
        label="账目描述">
      </el-table-column>
      <el-table-column
        prop="accountMoney"
        label="账目金额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="日期">
      </el-table-column>
    </el-table>

    <!-- 新增弹框 -->
    <el-dialog
      title="新增账目"
      :visible.sync="dialogVisible"
      width="99%">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账目类型">
          <el-select v-model="form.accountType" placeholder="请选择账目类型" style="width: 100%;">
            <el-option label="收入" :value="1"></el-option>
            <el-option label="支出" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账目金额">
          <el-input v-model="form.accountMoney"></el-input>
        </el-form-item>

        <el-form-item label="账目描述">
          <el-input type="textarea" v-model="form.accountDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <br/>

  </div>
</template>

<script>
export default {
  name: 'VueTest',
  data () {
    return {
      msg: '开心记账本',
      tableData: [],
      dialogVisible: false,
      form: {},
    }
  },

  methods: {

    //提交表单数据到后台
    onSubmit(){
      this.$http.post("/account/saveAccount", this.form).then(response =>{
        if(response.data.code == '0000'){
          this.$message({
            type: 'success',
            message: response.data.msg
          });
        }else{
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
        //隐藏弹框
        this.dialogVisible = false;
        //刷新表格数据
        this.loadTableData();
      });
    },

    //新增按钮事件
    addHandle(){
      this.dialogVisible = true;
      this.form = {};
    },

    //单击行事件
    rowClickHandle(row, column, event){
      this.$confirm('确定要删除此行记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'msgbox',
      }).then(() => {
        this.$http.delete("/account/deleteAccount/" + row.id,{}).then(response =>{
          if(response.data.code == '0000'){
            this.$message({
              type: 'success',
              message: response.data.msg
            });
          }else{
            this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
          //刷新表格数据
          this.loadTableData();
        });
      }).catch(() => {
        console.log("已取消删除操作")
      });
    },

    //加载列表数据
    loadTableData(){
      this.$http.get("/account/getAllAccount",{}).then(response =>{
        this.tableData = response.data.data;
      });
    },

  },

  //钩子函数(页面初始化时，钩子函数就会被执行)
  mounted(){
    this.loadTableData();
  }

}
</script>

<style>
@media (max-width: 720px) {
  .msgbox{
    width: 320px !important;
  }
}
</style>
