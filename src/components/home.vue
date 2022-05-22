<template>

<el-container class='content'>
  <el-header>
      <div>
          <img src="" alt="">
          <span>电商管理平台</span>
      </div>

</el-header>
  <el-container>
    <el-aside :width="iscollapse ? '64px' : '200px'">
       <div @click="zhedie">|||</div>
       <el-menu :default-active="active" router :collapse='iscollapse' :collapse-transition='false' unique-opened background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span @click='getMeauList'>用户管理</span>
        </template>
          <el-menu-item @click="cunchu('users')" index="users">
        <i class="el-icon-location"></i>
          <span>用户管理</span>
              </el-menu-item>
      </el-submenu>
            <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span @click='getMeauList'>权限管理</span>
        </template>
          <el-menu-item index="asd1" @click="cunchu('asd1')" >
        <i class="el-icon-location"></i>
          <span>权限列表</span>
              </el-menu-item>
        <el-menu-item index="roles" @click="cunchu('asd')" >
        <i class="el-icon-location"></i>
          <span>角色列表</span>
              </el-menu-item>
      </el-submenu>
            <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span @click='getMeauList'>商品管理</span>
        </template>
          <el-menu-item index="goodsIndex" @click="cunchu('goodsIndex')">
        <i class="el-icon-location"></i>
          <span>商品分类</span>
              </el-menu-item>
          <el-menu-item index="goodspage" @click="cunchu('goodspage')">
        <i class="el-icon-location"></i>
          <span>分类参数</span>
              </el-menu-item>
        <el-menu-item index="goodslist"  @click="cunchu('goodslist')">
        <i class="el-icon-location"></i>
          <span>商品列表</span>
              </el-menu-item>
      </el-submenu>
            <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span @click='getMeauList'>订单管理</span>
        </template>
          <el-menu-item @click="cunchu('goodsorder')" index="goodsorder">
        <i class="el-icon-location"></i>
          <span>订单列表</span>
              </el-menu-item>
      </el-submenu>
            <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span @click='getMeauList'>数据统计</span>
        </template>
          <el-menu-item @click="cunchu('report')" index="report">
        <i class="el-icon-location"></i>
          <span>数据报表</span>
              </el-menu-item>
      </el-submenu>
    </el-menu>
        </el-aside>

    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    created () {
this.active = window.sessionStorage.getItem('current')
    },
    data () {
        return {
            iscollapse: false,
            active: ''
        }
    },
    methods: {
destory () {
    window.sessionStorage.clear()
    this.$router.push('/login')
},
async getMeauList () {
  await this.$http.get('meaus')
        },
    zhedie () {
        this.iscollapse = !this.iscollapse
    },
    cunchu (t) {
window.sessionStorage.setItem('current',t)
    }
    }
}
</script>

<style lang="less" scoped>
.el-header{
    display: flex;
    justify-content: space-between;
    background-color: #373d41;
    padding-left:0;
    align-items: center;
    color:white;
    font-size: 20px;
    >div{
        display: flex;
        align-items: center;
    }
}
.el-aside{
    background-color: #333744;
    >div{
        background-color: #4a5064;
        text-align: center;
        letter-spacing: 5px;
        font-size: 0.2em;
        line-height: 24px;
        cursor: pointer;
    }
}
.el-main{
    background-color: #eaedf1;
}
.content{
    height: 100%;
}

</style>
