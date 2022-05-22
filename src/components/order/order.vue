<template>
    <div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
</el-breadcrumb>
       <el-card>
           <el-row>
               <el-col :span="10">
  <el-input placeholder="请输入内容" v-model="queryInfodata.query" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
               </el-col>
           </el-row>
      <el-table
    :data="tableDatalist"
    border
    style="width: 100%">
    <el-table-column type="index">
    </el-table-column>
    <el-table-column
      prop="order_number"
      label="订单编号"
      width="550px">
    </el-table-column>
    <el-table-column
      prop="order_price"
      label="订单价格" width="100px">
    </el-table-column>
        <el-table-column
      label="是否付款" width="100px">
      <template slot-scope="scope">
<el-tag v-if='scope.row.pay_status === "0"'>未付款</el-tag>
<el-tag v-else>已付款</el-tag>
      </template>
    </el-table-column>
        <el-table-column
      prop="is_send"
      label="是否发货" width="100px">
    </el-table-column>
    <el-table-column
      label="下单时间" width="200px">
      <template slot-scope="scope">
{{scope.row.create_time | dataFomat}}
      </template>
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button @click="editOrder(scope.row)" size='mini' type="primary"><i class='el-icon-edit'></i></el-button>
            <el-button @click="wulixinxi(scope.row)" size='mini' type='success'><i class='el-icon-location'></i></el-button>
        </template>
    </el-table-column>
  </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfodata.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfodata.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
       </el-card>
       <el-dialog
  title="提示"
  :visible.sync="editdialogVisible"
  width="30%">
  <el-form label-width="80px" :model="editOrdersdata">
  <el-form-item label="订单是否发货">
    <el-input v-model="editOrdersdata.is_send"></el-input>
  </el-form-item>
  <el-form-item label="订单支付">
    <el-input v-model="editOrdersdata.order_pay"></el-input>
  </el-form-item>
  <el-form-item label="订单价格">
    <el-input v-model="editOrdersdata.order_price"></el-input>
  </el-form-item>
  <el-form-item label="订单数量">
    <el-input v-model="editOrdersdata.order_number"></el-input>
  </el-form-item>
    <el-form-item label="支付状态">
    <el-input v-model="editOrdersdata.pay_status"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editdialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="提示"
  :visible.sync="wuliudialogVisible"
  width="30%">
<el-timeline>
    <el-timeline-item
      v-for="(activity, index) in wuliuxinxi"
      :key="index"
      :timestamp="activity.time">
      {{activity.context}}
    </el-timeline-item>
  </el-timeline>
  <span slot="footer" class="dialog-footer">
    <el-button @click="wuliudialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="wuliudialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
export default {
data () {
    return {
        queryInfodata: {
            query: '',
            pagenum: 1,
            pagesize: 5
        },
        tableDatalist: [],
        total: 0,
        editOrdersdata: {},
        editdialogVisible: false,
        wuliudialogVisible: false,
        wuliuxinxi: []

    }
},
methods: {
getOrderlist () {
    this.$http.get('orders',{ params: this.queryInfodata }).then(({ data: res }) => {
        console.log(res)
       this.total = res.data.total
this.tableDatalist = res.data.goods
console.log(this.tableDatalist)
    }).catch(err => console.log(err))
},
async wulixinxi () {
this.wuliudialogVisible = true
this.wuliuxinxi = [
    {
      time: "2018-05-10 09:39:00",
      ftime: "2018-05-10 09:39:00",
      context: "已签收,感谢使用顺丰,期待再次为您服务",
      location: ""
    },
    {
      time: "2018-05-10 08:23:00",
      ftime: "2018-05-10 08:23:00",
      context: "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
      location: ""
    },
    {
      time: "2018-05-10 07:32:00",
      ftime: "2018-05-10 07:32:00",
      context: "快件到达 [北京海淀育新小区营业点]",
      location: ""
    },
    {
      time: "2018-05-10 02:03:00",
      ftime: "2018-05-10 02:03:00",
      context: "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
      location: ""
    },
    {
      time: "2018-05-09 23:05:00",
      ftime: "2018-05-09 23:05:00",
      context: "快件到达 [北京顺义集散中心]",
      location: ""
    },
    {
      time: "2018-05-09 21:21:00",
      ftime: "2018-05-09 21:21:00",
      context: "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
      location: ""
    },
    {
      time: "2018-05-09 13:07:00",
      ftime: "2018-05-09 13:07:00",
      context: "顺丰速运 已收取快件",
      location: ""
    },
    {
      time: "2018-05-09 12:25:03",
      ftime: "2018-05-09 12:25:03",
      context: "卖家发货",
      location: ""
    },
    {
      time: "2018-05-09 12:22:24",
      ftime: "2018-05-09 12:22:24",
      context: "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
      location: ""
    },
    {
      time: "2018-05-08 21:36:04",
      ftime: "2018-05-08 21:36:04",
      context: "商品已经下单",
      location: ""
    }
  ]
},
handleSizeChange (newsize) {
this.queryInfodata.pagesize = newsize
this.getOrderlist()
},
handleCurrentChange (newnum) {
this.queryInfodata.pagenum = newnum
this.getOrderlist()
},
editOrder (row) {
this.$http.get(`orders/${row.order_id}`).then(({ data: res }) => {
    console.log(res.data)
    this.editOrdersdata = res.data
})
    this.editdialogVisible = true

// this.$http.put(`orders/${row.order_id}`)
}
},
created () {
this.getOrderlist()
}
}
</script>
<style lang="less" scoped>

</style>
