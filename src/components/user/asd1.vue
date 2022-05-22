<template>
<div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
<template>
    <el-card>
  <el-table
    :data="rightList"
    style="width: 100%">
    <el-table-column
type='index'>
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="权限等级">
    <template slot-scope="scope">
<el-tag v-if='scope.row.level == 0'>一级</el-tag>
   <el-tag v-else-if='scope.row.level == 1'>二级</el-tag>
   <el-tag v-else-if='scope.row.level == 2'>三级</el-tag>
      </template>
    </el-table-column>
        <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
  </el-table>
  </el-card>
</template>
</div>
</template>

<script>
export default {
data () {
return {
rightList: [],
rightPower: []

}
},
methods: {
async getrightList (type) {
const { data: res } = await this.$http.get(`rights/${type}`)
this.rightList = res.data
}

},
created () {
this.getrightList('list')
}
}
</script>

<style lang="less" scoped>
.el-card{
    margin-top: 10px;
}
</style>
