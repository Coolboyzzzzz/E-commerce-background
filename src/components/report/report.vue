<template>
    <div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>数据统计</el-breadcrumb-item>
  <el-breadcrumb-item>数据报表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <div id="main"></div>
</el-card>
    </div>
</template>
<script>

import * as echarts from 'echarts'

export default {
data () {
    return {
        options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      }
    }
},
async mounted () {
var myChart = echarts.init(document.getElementById('main'))
     const { data: res } = await this.$http.get('reports/type/1')
     console.log(res.data)
      this.$message.success(res.meta.msg)
  const obj2 = Object.assign(res.data, this.options)
 obj2.xAxis.push({ boundaryGap: false })
 console.log(obj2)
 myChart.setOption(res.data)
}

}
</script>

<style lang="less" scoped>

  html,
  body {
    width: 100%;
  }
  #main {
    height: 400px;
    width: 500px;
  }
</style>
