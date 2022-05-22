<template>
 <div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>参数列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <el-alert
    title="注意只允许为三级分类设置相关参数！"
    type="warning" show-icon>
  </el-alert>
    <el-row>
        <el-col>
            <span>选择商品分类：</span>
 <el-cascader
    v-model="selectDatalist"
    :options="categoriesData"
    :props="dataList" clearable
    @change="handleChange"></el-cascader>
        </el-col>
    </el-row>
<template>
  <el-tabs v-model="activetabName" @tab-click="tabhandleClick">
    <el-tab-pane label="动态参数" name="many">
        <el-button @click="addPagehandle" :disabled='adDisabled' type='primary' size='mini'>添加参数</el-button>
<template>
  <el-table
    :data="manyTableData"
    border
    style="width: 100%">
     <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染Tag标签 -->
                <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable @close="handleClose(i, scope.row)">{{item}}</el-tag>
                <!-- 输入的文本框 -->
                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
        <el-table-column type='index'>
    </el-table-column>
    <el-table-column
      prop="attr_name"
      label="属性名称"
      >
    </el-table-column>
    <el-table-column
      label="操作"
     >
     <template>
      <el-button type='primary'><i class="el-icon-edit"></i>修改</el-button>
      <el-button type='danger'><i class="el-icon-delete"></i>删除</el-button>
     </template>
    </el-table-column>
  </el-table>
</template></el-tab-pane>
    <el-tab-pane label="静态属性" name="only">
        <el-button @click="addPagehandle" :disabled='adDisabled' type='primary' size='mini'>添加参数</el-button>
<template>
  <el-table
    :data="onlyTableData"
    border stripe
    style="width: 100%">
        <el-table-column type='index'>
    </el-table-column>
    <el-table-column
      prop="attr_name"
      label="属性名称">
    </el-table-column>
    <el-table-column
      label="操作"
      >
      <el-button type='primary'><i class="el-icon-edit"></i>修改</el-button>
      <el-button type='danger'><i class="el-icon-delete"></i>删除</el-button>
    </el-table-column>
  </el-table>
</template></el-tab-pane>
  </el-tabs>
</template>
</el-card>
<el-dialog
  :title="'添加' + titleText"
  :visible.sync="addPagedialog"
  width="30%" @closed="handleClose">
  <el-form :model="addruleForm" :rules="rulesAdd" label-width="100px" ref='formRef'>
  <el-form-item :label="titleText" prop="attr_name">
    <el-input type="text" v-model="addruleForm.attr_name"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addPagedialog = false">取 消</el-button>
    <el-button type="primary" @click="submitCate">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
export default {
    data () {
        return {
            addPagedialog: false,
            selectDatalist: [],
           categoriesData: [],
           rulesAdd: {
               attr_name: [{
required: true,
message: '请输入参数',
trigger: 'blur'
               }]
           },
           dataList: {
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_id'
           },
           activetabName: 'many',
            adDisabled: true,
          getPagetableData: [],
           manyTableData: [],
           onlyTableData: [],
addruleForm: {
    attr_name: ''

}
            }
    },
    methods: {
    async getGoodscategories () {
      const { data: res } = await this.$http.get(`categories/${this.currentid}/attributes`,{ params: { sel: this.activetabName } })
      console.log(res)
      this.getPagetableData = res.data
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        item.inputVisible = false
        item.inputValue = ''
      })
      console.log(res.data)
      if (this.activetabName === 'many') {
          this.manyTableData = res.data
      } else {
          this.onlyTableData = res.data
      }
      },
    async submitCate () {
  this.addPagedialog = false
  const { data: res } = await this.$http.post(`categories/${this.currentid}/attributes`,{ attr_name: this.addruleForm.attr_name,attr_sel: this.activetabName })
  if (res.meta.status !== 201) {
    return this.$message.error(res.meta.msg)
  }
    this.$message.success(res.meta.msg)
    this.getGoodscategories()
    },
    async  getcategories () {
    const { data: res } = await this.$http.get(`categories`)
    this.categoriesData = res.data
      },
      handleChange () {
          if (this.selectDatalist.length !== 3) {
              console.log('你当前选择层级为' + this.selectDatalist.length)
              this.manyTableData = []
              this.onlyTableData = []
              return
          }
          this.adDisabled = false
          this.getGoodscategories()
      },
      handleClose1 () {
          this.$refs.formRef.resetFields()
      },
      tabhandleClick () {
      if (this.selectDatalist.length !== 3) {
          console.log('你当前选择层级为' + this.selectDatalist.length)
              this.manyTableData = []
              this.onlyTableData = []
              return
          }
          console.log(this.activetabName)
          this.getGoodscategories()
      },
      addPagehandle () {
          this.addPagedialog = true
      },
    showInput (row) {
      row.inputVisible = true
      // 让文本框自动获得焦点
      // $nextTick 方法的作用，就是当页面上元素被重新渲染之后，才会指定回调函数中的代码
  //    this.$nextTick(_ => {
   //     this.$refs.saveTagInput.$refs.input.focus()
   //   })
    },
  handleClose (i, row) {
      row.attr_vals.splice(i, 1)
      this.saveAttrVals(row)
    },
    // 文本框失去焦点，或摁下了 Enter 都会触发
    async handleInputConfirm (row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 如果没有return，则证明输入的内容，需要做后续处理
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      // 需要发起请求，保存这次操作
    //  this.saveAttrVals(row)
    }
},

created () {
        this.getcategories()
    },
    computed: {
    currentid () {
     return this.selectDatalist[this.selectDatalist.length - 1]
    },
        titleText () {
if (this.activetabName === 'many') {
return '动态参数'
} else {
    return '静态参数'
}
        }

    }
}

</script>
<style lang="less" scoped>
.el-breadcrumb{
    margin-bottom: 15px;
}
 i{
    margin-right: 5px;
}
.el-tag{
  margin: 15px;
}
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
  }
</style>
