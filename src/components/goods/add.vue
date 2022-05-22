    <template>
        <div>
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-alert
        title="消息提示的文案"
        type="info"
        show-icon center :closable='false'>
    </el-alert>
    <el-steps :active="activeNameTab - 0" align-center finish-status="success">
    <el-step title="基本信息" ></el-step>
    <el-step title="商品参数" ></el-step>
    <el-step title="商品属性" ></el-step>
    <el-step title="商品图片" ></el-step>
    <el-step title="商品内容" ></el-step>
    <el-step title="完成"></el-step>
    </el-steps>
    <el-form ref="form" :model="submitAddgoods" label-width="80px" label-position="top" :rules="formRules">
    <el-tabs :before-leave='tabClick' tab-position="left" style="height: 550px;"  v-model="activeNameTab">
        <el-tab-pane label="基本信息" name='0'>
        <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="submitAddgoods.goods_name"></el-input>
    </el-form-item>
    <el-form-item label="商品价格">
        <el-input v-model="submitAddgoods.goods_price"></el-input>
    </el-form-item>
    <el-form-item label="商品重量">
        <el-input v-model="submitAddgoods.goods_number"></el-input>
    </el-form-item>
    <el-form-item label="商品数量">
        <el-input v-model="submitAddgoods.goods_weight"></el-input>
    </el-form-item>
        <el-form-item label="商品分类">
    <el-cascader
        v-model="selectValue"
        :options="goodsCate"
        :props="props" @change="cascderChange"></el-cascader>
    </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name='1'>
        <el-form-item :key='i' v-for=' (item,i) in getGoodspageData' :label="item.attr_name">
    <el-checkbox-group v-model="item.attr_vals" >
        <el-checkbox :key='i' v-for=' (item,i) in item.attr_vals' :label="item" border></el-checkbox>
    </el-checkbox-group>
    </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name='2'>
        <el-form-item :key='item.attr_id' v-for='item in onlyTableData' :label="item.attr_name">
            <el-input v-model="item.attr_vals"></el-input>
        </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name='3'>
        <el-upload
    class="upload-demo"
    action="http://127.0.0.1:8888/api/private/v1/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :headers='heard' :on-success='handeleUnload'
    list-type="picture" multiple>
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name='4'>
            <quill-editor v-model='submitAddgoods.goods_introduce'></quill-editor>
            <el-button type='primary' class='butn' @click="finsh">添加商品</el-button>
        </el-tab-pane>
    </el-tabs>
    </el-form>
    </el-card>
    <el-dialog
    title="查看图片"
    :visible.sync="unloadPicturedialog"
    width="50%">
    <img :src="unloadPicture" alt="3">
    </el-dialog>
        </div>
    </template>

    <script>
    export default {
        data () {
            return {
    submitAddgoods: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pic: [],
        attrs: [],
        goods_cat: []
    },
    activeNameTab: '0',
    formRules: {
            goods_name: [{
    required: true,
    message: '请输入商品名称',
    trigger: 'blur'
    }]
    },
    props: {
    expandTrigger: 'hover',
    label: 'cat_name',
    value: 'cat_id'
    },
    selectValue: [],
    goodsCate: [],
    checkList: [],
    getGoodspageData: [],
    onlyTableData: [],
    heard: {
        Authorization: window.sessionStorage.getItem('token')
    },
    fileList: [],
    unloadPicture: '',
    unloadPicturedialog: false

            }
        },
        methods: {
            handlePreview () {
                this.unloadPicturedialog = true
            },
            handleRemove (e) {
        this.$message.success('您删除了一项')
      const i = this.submitAddgoods.pic.findIndex(item => item === e.response.data.tmp_path)
        this.submitAddgoods.pic.splice(i,1)
            },
        async  getGoodscate () {
    const { data: res } = await this.$http.get('categories')
    this.goodsCate = res.data
            },
            handeleUnload (e) {
    this.$message.success(e.meta.msg)
    this.submitAddgoods.pic.push(e.data.tmp_path)
    this.unloadPicture = e.data.url
            },
          tabClick (now) {
                if (this.selectValue.length !== 3) {
                    this.$message.error('请选择一个三级分类')
                return false
                }
                if (now === '1') {
    this.getGoodspage()
                } else if (now === '2') {
    this.$http.get(`categories/${this.cateId}/attributes`,{ params: { sel: 'only' } }).then(({ data: res }) => {
    console.log(res)
    this.onlyTableData = res.data
    })
                }
            },
            cascderChange () {
                if (this.selectValue.length !== 3) {
                    this.selectValue = []
                }
              this.submitAddgoods.goods_cat = this.selectValue
              this.submitAddgoods.goods_cat = this.submitAddgoods.goods_cat.join(',')
            },
        async  getGoodspage () {
    const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,{ params: { sel: 'many' } })
    res.data.forEach(data => {
    data.attr_vals = data.attr_vals.length ? data.attr_vals.split(',') : []
    })
    console.log(res)
    this.getGoodspageData = res.data
    console.log(this.getGoodspageData)
            },
        finsh () {
         this.getGoodspageData.forEach(item => {
             const newInfo = {
                 attr_id: item.attr_id,
                 attr_value: item.attr_vals.join(',')
             }
             this.submitAddgoods.attrs.push(newInfo)
         })
         this.onlyTableData.forEach(item => {
             const newInfo = {
                 attr_id: item.attr_id,
                 attr_value: item.attr_vals
             }
             this.submitAddgoods.attrs.push(newInfo)
         })
        console.log(this.submitAddgoods)
          this.$http.post('goods',this.submitAddgoods).then(({ data: res }) => {
console.log(res.data)
if (res.meta.status !== 201) {
    this.$message.error('提交失败')
}
this.$message.success(res.meta.msg)
this.$router.push('/goodslist')
          })
        }

        },
        created () {
    this.getGoodscate()
        },
        computed: {
            cateId () {
    if (this.selectValue.length === 3) {
        return this.selectValue[this.selectValue.length - 1]
    }
    return null
            }
        }
        }

    </script>
    <style lang="less" scoped>
    .el-checkbox{
        margin: 0 5px 0 0!important;
    }
    img{
        width: 100%;
    }
    .quill-editor{
        height: 400px;
    }
    .butn{
        margin-top: 50px;
    }
    </style>
