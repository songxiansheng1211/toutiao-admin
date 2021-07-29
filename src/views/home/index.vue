<template>
 <div class="home_container">
   <el-card>
    <div class="box">
       <div class="left-box">
       <div class="info-top">
         商品信息
       </div>
       <div class="left-top">
       <el-form
       :model="queryForm"
       label-position="left"
       label-width="90px"
       size="mini">
        <el-form-item label="商品名称：">
        </el-form-item>
        <el-form-item label="商品类型：">
        </el-form-item>
        <el-form-item label="商品属性：">
        </el-form-item>
        <el-form-item label="商品价格：">
        </el-form-item>
       </el-form>
       </div>
        <div class="left-medium">
          <el-form :model="queryForm">
         <el-form-item>
           <p>支付：<el-tag  effect="plain">75元</el-tag></p>
         </el-form-item>
         <el-form-item label="付款方式">
            <el-radio-group v-model="queryForm.channel">
              <el-radio label="wxpay">微信</el-radio>
              <el-radio label="alipay">支付宝</el-radio>
              <el-radio label="cashpay">现金</el-radio>
            </el-radio-group>
         </el-form-item>
         <el-form-item>
         <el-button type="primary">确认支付</el-button>
         </el-form-item>
          </el-form>
        </div>
     </div>
     <div class="right-box">
      <div class="right-search">
          <el-input placeholder="请输入商品名称" clearable></el-input>
            <el-button type="primary">搜索</el-button>
      </div>
      <!-- 列表 -->
      <el-table :data="tableData">
        <el-table-column label="商品名称" prop="goods"></el-table-column>
        <el-table-column label="商品信息" prop="type"></el-table-column>
        <el-table-column label="商品库存" prop="inventory"></el-table-column>
        <el-table-column label="商品价格" prop="prise"></el-table-column>
        <el-table-column label="商品类型" prop="col"></el-table-column>
        <el-table-column label="商品222" prop="row"></el-table-column>
        <el-table-column label="商品333" prop="must"></el-table-column>
        <el-table-column label="商品444" prop="forms"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="success" size="mini" @click="buySheet(row)">购买</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
     </div>
    </div>
   </el-card>
</div>
</template>
<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      tableData: [
        {
          goods: 'qqq',
          type: '1111',
          inventory: '221323',
          prise: '2gggg',
          col: 'xxxxx',
          row: 'xzzzzzz',
          must: 'znnnnnnn',
          forms: 'kkkkkkkkkk'
        },
        {
          goods: 'qqq',
          type: '1111',
          inventory: '221323',
          prise: '2gggg',
          col: 'xxxxx',
          row: 'xzzzzzz',
          must: 'znnnnnnn',
          forms: 'kkkkkkkkkk'
        },
        {
          goods: 'qqq',
          type: '1111',
          inventory: '221323',
          prise: '2gggg',
          col: 'xxxxx',
          row: 'xzzzzzz',
          must: 'znnnnnnn',
          forms: 'kkkkkkkkkk'
        },
        {
          goods: 'qqq',
          type: '1111',
          inventory: '221323',
          prise: '2gggg',
          col: 'xxxxx',
          row: 'xzzzzzz',
          must: 'znnnnnnn',
          forms: 'kkkkkkkkkk'
        },
        {
          goods: 'qqq',
          type: '1111',
          inventory: '221323',
          prise: '2gggg',
          col: 'xxxxx',
          row: 'xzzzzzz',
          must: 'znnnnnnn',
          forms: 'kkkkkkkkkk'
        },
        {
          goods: 'qqq',
          type: '1111',
          inventory: '221323',
          prise: '2gggg',
          col: 'xxxxx',
          row: 'xzzzzzz',
          must: 'znnnnnnn',
          forms: 'kkkkkkkkkk'
        },
        {
          goods: 'qqq',
          type: '1111',
          inventory: '221323',
          prise: '2gggg',
          col: 'xxxxx',
          row: 'xzzzzzz',
          must: 'znnnnnnn',
          forms: 'kkkkkkkkkk'
        }
      ],
      currentPage4: 1,
      queryForm: {
        name: '',
        channel: ''
      }
    }
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {},
    buySheet (row) {
      console.log(row)
    }
  }
}
</script>
<style lang="less" scoped>
.box {
 .left-box {
    float: left;
    width: 358px;
    padding-right: 10px;
  .info-top {
    font-size: 14px;
    // margin-bottom: 15px;
  }
  .left-top {
    border-bottom: 1px solid #ddd;
    .el-form-item__label {
      font-size: 14px;
    }
  }
 }
 .right-box {
    margin-left: 380px;
    border-left: 1px solid #ddd;
    padding-left: 10px;
    .right-search {
      display: flex;
     /deep/ .el-input{
        width: 320px;
      }
      .el-button {
        margin-left: 80px;
      }
    }
    .pagination {
      text-align: right;
      margin-top: 15px;
    }
 }
}

</style>
