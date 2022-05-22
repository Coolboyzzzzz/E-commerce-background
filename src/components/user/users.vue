<template>
    <div>
   <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
</el-breadcrumb>

<el-card class="box-card">
    <el-row :gutter="20">
        <el-col :span='8'>
  <el-input placeholder="请输入内容" v-model='queryinfo.query' clearable @clear="getUserlist()">
    <el-button slot="append" icon="el-icon-search" @click="select" ></el-button>
  </el-input>
</el-col>
<el-col :span='4'>
    <el-button type="primary" @click='addusers'>添加用户</el-button>
</el-col>
    </el-row>
<template>
    <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column type='index'>
    </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
     <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="180">
    </el-table-column>
          <el-table-column
        prop="role_name"
        label="角色"
        width="180">
    </el-table-column>

      <el-table-column
      prop="mg_status"
        label="权限"
        width="180">
<template slot-scope="scope">
    <el-switch
  v-model="scope.row.mg_state"
  active-color="#13ce66"
  inactive-color="#ff4949" @change="update(scope.row)">
</el-switch>
</template>
      </el-table-column>
    <el-table-column
        label="操作"
        width="180" >
        <template slot-scope='scope'>
    <el-button icon="el-icon-search" circle @click='showEditPower(scope.row)'></el-button>
  <el-button type="primary" icon="el-icon-edit" circle @click="showEditDiag(scope.row.id)"></el-button>
  <el-button type="success" icon="el-icon-check" circle @click="deleteDiag(scope.row.id)"></el-button>
  </template>
      </el-table-column>

    </el-table>
  </template>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlecurrent"
      :current-page="queryinfo.pagenum"
      :page-sizes="[1,2,3,4]"
      :page-size="queryinfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 <table>
<tr><td><span>用户名</span></td><td><input type='text' v-model='eidtlist.username' disabled></td></tr>
<tr><td><span>id</span></td><td><input type='text' v-model='eidtlist.id' disabled></td></tr>
<tr><td><span>邮箱</span></td><td><input type='text' v-model='eidtlist.email'></td></tr>
<tr><td><span>手机号</span></td><td><input type='text' v-model='eidtlist.mobile'></td></tr>
</table>
<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="commitEdit">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="提示"
  :visible.sync="dialogVisiblePower"
  width="30%"
  :before-close="handleClose">
 <p>用户名：{{this.Role.username}}</p>
  <p>角色：{{this.Role.role_name}}</p>
   <p>
       分配角色：
        <el-select v-model="Roleselect" placeholder="请选择">
    <el-option
      v-for="item in rolelist"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
   </p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisiblePower = false">取 消</el-button>
    <el-button type="primary" @click="submitEditpeople">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="提示"
  :visible.sync="showAddusers"
  width="30%"
  :before-close="handleClose">
 <table>
<tr><td><span>用户名</span></td><td><input type='text' v-model='addusersData.username'></td></tr>
<tr><td><span>id</span></td><td><input type='text' v-model='addusersData.password'></td></tr>
<tr><td><span>邮箱</span></td><td><input type='text' v-model='addusersData.email'></td></tr>
<tr><td><span>手机号</span></td><td><input type='text' v-model='addusersData.mobile'></td></tr>
</table>

  <span slot="footer" class="dialog-footer">
    <el-button @click="showAddusers = false">取 消</el-button>
    <el-button type="primary" @click="addusersumbit">确 定</el-button>
  </span>
</el-dialog>
    </div>

</template>

<script>
export default {
data () {
    return {
queryinfo: {
    query: '',
    pagenum: 1,
    pagesize: 2
},
addusersData: {
    username: '',
    password: '',
    email: '',
    mobile: ''
},
eidtlist: [],
userlist: [],
dialogVisiblePower: false,
total: 0,
Role: {},
dialogVisible: false,
Roleselect: '',
rolelist: [],
showAddusers: false
    }
},
created () {
this.getUserlist()
},
methods: {
   async addusersumbit () {
this.showAddusers = false
const { data: res } = await this.$http.post('users',this.addusersData)
this.$message.success(res.meta.msg)
this.getUserlist()
    },
async getUserlist () {
 const { data: res } = await this.$http.get('users',{ params: this.queryinfo })
this.userlist = res.data.users
this.total = res.data.total
},
async submitEditpeople () {
this.dialogVisiblePower = false
this.Roleselect = ''
const { data: res } = await this.$http.put(`users/${this.Role.id}/role`,{ rid: this.Roleselect })
this.$message.success(res.meta.msg)
},
async showEditPower (role) {
this.dialogVisiblePower = true
this.Role = role
const { data: res } = await this.$http.get('roles')
this.rolelist = res.data
},
addusers () {
this.showAddusers = true
},
async deleteDiag (id) {
const { data: ret } = await this.$http.delete(`users/${id}`)
if (ret.meta.status !== 200) {
    return this.$message.info(ret.meta.msg)
    }
  this.$message.info(ret.meta.msg)
this.getUserlist()
},
handleSizeChange (newsize) {
this.queryinfo.pagesize = newsize
this.getUserlist()
},
handlecurrent (ss) {
this.queryinfo.pagenum = ss
this.getUserlist()
},
select () {
this.getUserlist()
},
async update (aa) {
const { data: ret } = await this.$http.put(`users/${aa.id}/state/${aa.mg_state}`)
console.log(`users/${aa.id}/state/${aa.mg_state}`,ret)
},
handleClose (done) {
 this.$confirm('确认关闭？')
     .then(_ => {
          done()
      })
   .catch(_ => {})
      },
async showEditDiag (id) {
this.dialogVisible = true
const { data: ret } = await this.$http.get(`users/${id}`)
this.eidtlist = ret.data
},
async commitEdit () {
    this.dialogVisible = false
 const { data: ret } = await this.$http.put(`users/${this.eidtlist.id}`,this.eidtlist)
 this.$message(ret)
}

}

}
</script>

<style lang="less" scoped>
.box-card{
    margin-top: 15px;

}
</style>
