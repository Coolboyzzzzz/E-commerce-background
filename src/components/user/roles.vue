<template>
<div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
    <el-card>
  <el-table
    :data="rightPower"
    style="width: 100%">
    <el-table-column
type='expand'>
  <template slot-scope="scope">
     <el-form label-position="left" inline class="demo-table-expand">
         <!-- 第一层 -->
        <el-row  :key='index' v-for='(item1,index) in scope.row.children' :class="['dbbottom','vcenter',index === 0 ? 'dbtop' : '']">
         <el-col  :span="5">
            <el-tag closable @close='hand(scope.row,item1.id)'>{{item1.authName}}</el-tag><i class='el-icon-caret-right'></i>
                 </el-col>
            <el-col :span='19'>
                <!-- 第二层 -->
                <el-row  :key='index' v-for='(item,index) in item1.children'   :class="['vcenter',index === 0 ? '' : 'dbtop']">
                    <el-col  :span='10'><el-tag closable @close='hand(scope.row,item.id)'>{{item.authName}}</el-tag><i class='el-icon-caret-right'></i></el-col>
             <el-col :span='14'>
                 <!-- 第三层 -->
   <el-tag closable @close='hand(scope.row,item.id)' :key='index' v-for='(item,index) in item.children'>{{item.authName}}</el-tag>
             </el-col>

                </el-row>
            </el-col>
</el-row>
        </el-form>
</template>
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述">
    </el-table-column>
        <el-table-column
      prop="path"
      label="操作">
      <template slot-scope='scope'>
      <el-button type='primary' size="small">编辑</el-button>
      <el-button type='danger' size="small">删除</el-button>
      <el-button type='warning' size="small" @click='showSetRightDialog(scope.row)'>分配权限</el-button>

    </template>
    </el-table-column>
  </el-table>
  </el-card>
        <el-dialog
  title="分配权限"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-tree ref='re' :data="rightList" :props="treeProps" show-checkbox default-expand-all node-key='id' :default-checked-keys='defKeys'></el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVi">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
export default {
data () {
 return {
    rightPower: [],
    dialogVisible: false,
    rightList: [],
    defKeys: [],
    roleid: [],
    treeProps: {
        label: 'authName',
        children: 'children'
    }
    }
},
methods: {
async getPower () {
const { data: res } = await this.$http.get(`roles`)
this.rightPower = res.data
console.log(res.data)
},
async hand (id,dataDele) {
   const removeRightID = await this.$confirm('此操作永久删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        if (removeRightID !== 'confirm') {
            return this.$message.info('取消了操作')
        }
        this.$message.info('确认了删除')
        this.deletePower(id,dataDele)
},
async deletePower (id,dataDele) {
 const { data: req } = await this.$http.delete(`roles/${id.id}/rights/${dataDele}`)
 id.children = req.data
},
handleClose (done) {
this.$confirm('确认关闭？')
    .then(_ => {
            done()
         })
          .catch(_ => {})
},
async dialogVi () {
    this.dialogVisible = false
    const memery = [...this.$refs.re.getCheckedKeys(),...this.$refs.re.getHalfCheckedKeys()]
    const newmemery = memery.join(',')
    console.log(this.roleid)
  const { data: res } = await this.$http.post(`roles/${this.roleid}/rights`,{ rids: newmemery })
  this.$message.success(res.meta.msg)
  this.getPower()
},
async showSetRightDialog (role) {
this.defKeys = []
this.roleid = role.id
this.dialogVisible = true
const { data: res } = await this.$http.get(`rights/tree`)
this.rightList = res.data
this.getList(role,this.defKeys)
},
getList (node,arr) {
if (!node.children) {
    return arr.push(node.id)
}
node.children.forEach(element => {
    this.getList(element,arr)
})
}
},
created () {
    this.getPower()
}

}
</script>

<style lang="less" scoped>
.el-tag{
    margin: 7px;
}
.dbbottom{
    border-bottom: 1px solid #eee;
}
.dbtop{
    border-top: 1px solid #eee;
}
.vcenter{
    display: flex;
    align-items: center;
}
</style>
