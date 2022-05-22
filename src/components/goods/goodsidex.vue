<template>
    <div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
</el-breadcrumb>
       <el-card>
           <el-row>
               <el-col>
                   <el-button type="primary" @click='goodsAdd'>
                       添加分类
                   </el-button>
               </el-col>
           </el-row>

           <zk-table :data='cateData' :columns="columns" :selection-type='false' :expand-type='false' show-index index-text='#' border>
<template slot="likes" slot-scope="scope">
<i :class="['el-icon-error','qwhite',scope.row.cat_deleted === false ? 'el-icon-success' : '']"></i>
</template>
<template slot="sort" slot-scope="scope">
<el-tag v-if='scope.row.cat_level === 0'>一级</el-tag>
<el-tag v-if='scope.row.cat_level === 1'>二级</el-tag>
<el-tag v-if='scope.row.cat_level === 2'>三级</el-tag>
</template>
<template slot="play" slot-scope="scope">
<el-button type='primary' @click='editCategories(scope.row)'><i class="el-icon-edit "></i><span>编辑</span></el-button>
<el-button type='danger' @click='deleteCategories(scope.row)'><i class="el-icon-delete "></i><span>删除</span></el-button>
</template>
           </zk-table>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
       </el-card>
       <el-dialog
  title="提示"
  :visible.sync="goodsAddialogVisible"
  width="30%" @close='closeAdd'>
  <el-form label-width="80px" :model="goodsAddata">
  <el-form-item label="分类名称:">
    <el-input v-model="goodsAddata.cat_name"></el-input>
  </el-form-item>
  <el-form-item label="父级分类:">
    <el-cascader
    v-model="selectData"
    :options="secendgoods"
    :props="dataProps" @change="selecthandleChange" clearable
    ></el-cascader>
    </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="goodsAddialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSelect">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="提示"
  :visible.sync="editCategoriesvisible"
  width="30%">
    <el-input v-model='cat_name'></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editCategoriesvisible = false">取 消</el-button>
    <el-button type="primary" @click="submitEditcategories">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
goodsAddialogVisible: false,
editCategoriesvisible: false,
goodsAddata: {
cat_pid: '',
cat_name: '',
cat_level: ''
    },
    selectData: [],
getcate: {
    type: 3,
    pagenum: 1,
    pagesize: 5

},
total: 0,
cateData: [],
columns: [
              {
            label: '分类名称',
            prop: 'cat_name',
            width: '300px'
          },
          {
            label: '是否有效',
            prop: 'cat_deleted',
            width: '300px',
            type: 'template',
            template: 'likes'
          },
          {
            label: '排序',
            prop: 'cat_level',
            width: '300px',
            type: 'template',
            template: 'sort'
          },
          {
            label: '操作',
            width: '300px',
            type: 'template',
            template: 'play'
          }

],
dataProps: {
  expandTrigger: 'hover',
  label: 'cat_name',
  value: 'cat_id',
  children: 'children',
  checkStrictly: true
},
secendgoods: [],
cat_name: '',
thisrow: {}
        }
    },
 methods: {
async getcateList () {
const { data: res } = await this.$http.get('categories',{ params: this.getcate })
this.cateData = res.data.result
this.total = res.data.total
 },
async deleteCategories (e) {
const { data: res } = await this.$http.delete(`categories/${e.cat_id}`)
this.$message.success(res.meta.msg)
this.getcateList()
 },
editCategories (e) {
    this.thisrow = e
this.editCategoriesvisible = true
this.cat_name = this.thisrow.cat_name
 },
async submitEditcategories () {
this.editCategoriesvisible = false
console.log(this.cat_name)
 const { data: res } = await this.$http.put(`categories/${this.thisrow.cat_id}`,{ cat_name: this.cat_name })
 this.$message.success(res.meta.msg)
 this.getcateList()
 },
 selecthandleChange () {
if (this.selectData.length > 0) {
    this.goodsAddata.cat_pid = this.selectData[this.selectData.length - 1]
    this.goodsAddata.cat_level = this.selectData.length
} else {
    this.goodsAddata.cat_pid = ''
    this.goodsAddata.cat_level = ''
}
 },
 closeAdd () {
 this.goodsAddata.cat_name = ''
 this.selectData = []
 },
async goodsAdd () {
    this.goodsAddialogVisible = true
const { data: res } = await this.$http.get('categories',{ params: { type: '2' } })
this.secendgoods = res.data
 },
 handleSizeChange (newsize) {
this.getcate.pagesize = newsize
this.getcateList()
 },
 handleCurrentChange (newnum) {
this.getcate.pagenum = newnum
this.getcateList()
 },
async addSelect () {
this.goodsAddialogVisible = false
 const { data: res } = await this.$http.post('categories',this.goodsAddata)
  console.log(res)
  this.$message.success(res.meta.msg)
  this.getcateList()
 }

},
created () {
this.getcateList()
}

}
</script>

<style lang="less" scoped>
.el-breadcrumb{
    margin-bottom: 15px;
}

.qwhite{
color: green;
}
span{
   padding-right: 5px;
}
</style>
