<template>
    <div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-row :gutter='20'>
        <el-col :span='8'>
 <el-input clearable v-model="getGoodslistParams.query" placeholder="请输入内容" @clear='searchGoods'>
     <el-button slot='append' icon='el-icon-search' @click="searchGoods"></el-button></el-input>
        </el-col>
        <el-col :span='4'>
            <el-button type='primary' @click='jumpAddgoods'>添加商品</el-button>
        </el-col>
    </el-row>
      <template>
    <el-table
      :data="goodList"
      style="width: 100%" border>
       <el-table-column type="index">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="850px" >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
         width="100px"
         >
    </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="100px"
         >
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="180px"
         >
         <template slot-scope="scope">
            {{scope.row.add_time | dataFomat}}
         </template>
      </el-table-column>
      <el-table-column>
  <template slot-scope="scope">
<el-button size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
<el-button size="mini" type="danger" @click="deleteGoodByid(scope.row)"><i class='el-icon-delete'></i></el-button>
  </template>
      </el-table-column>
    </el-table>
  </template>
    <el-pagination
      @size-change="goodhandleSizeChange"
      @current-change="goodhandleCurrentChange"
      :current-page="getGoodslistParams.pagenum"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="getGoodslistParams.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
    </div>
</template>
<script>
export default {
        data () {
            return {
    getGoodslistParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
    },
    goodList: [],
    total: 0
            }
            },
            methods: {
          async  getGoodslist () {
               const { data: res } = await this.$http.get('goods',{ params: this.getGoodslistParams })
               console.log(res)
               this.goodList = res.data.goods
               this.total = res.data.total
            },
            searchGoods () {
                this.getGoodslist()
            },
            goodhandleSizeChange (newsize) {
this.getGoodslistParams.pagesize = newsize
this.getGoodslist()
            },
            goodhandleCurrentChange (newnum) {
                this.getGoodslistParams.pagenum = newnum
                this.getGoodslist()
            },
           async deleteGoodByid (row) {
             const { data: res } = await this.$http.delete(`goods/${row.goods_id}`)
       this.$message.success(res.meta.msg)
       this.getGoodslist()
            },
            jumpAddgoods () {
                this.$router.push('/goods/add')
            }
            },
            created () {
                this.getGoodslist()
            }

    }
</script>

<style lang="less" scoped>
.el-breadcrumb{
    margin: 15px;
}
</style>
