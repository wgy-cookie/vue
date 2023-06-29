<template>
  <div style="padding-bottom: 50px;">
    <h1>{{ msg }}</h1>

    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 图表 -->
    <div id="echarts0" style="width: 100%;height:300px;"></div>

    <el-divider></el-divider>
    <!-- 图表 -->
    <div id="echarts1" style="width: 100%;height:300px;"></div>

    <el-divider></el-divider>
    <div id="echarts2" style="width: 100%;height:300px;"></div>
    <el-divider></el-divider>
    <br/>

  </div>
</template>

<script>

export default {
  name: 'echarts',
  data () {
    return {
      msg: '开心记账本-统计',
    }
  },

  methods: {

    //加载饼图数据
    loadPieData(){
      this.$http.get("/account/getLineData",{}).then(response =>{
        //收入数据
        let list1 = response.data.list1;
        //开支数据
        let list2 = response.data.list2;

        let myChart0 = this.$echarts.init(document.getElementById('echarts0'));
        let option0 = {
          title: {
            text: '近半年支出占比'
          },
          // legend: {
          //   top: 'bottom'
          // },
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '支出详情',
              type: 'pie',
              radius: ['40%', '80%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'inside', // 标签位置为内部
                formatter: '{b}: {c}元 ({d}%)' // 使用图例名称、数据和百分比格式化标签内容
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: list2,
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart0.setOption(option0);
        //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        window.addEventListener('resize',function() {myChart0.resize()});

      });
    },

    //加载折线图数据
    loadLineData(){
      this.$http.get("/account/getLineData",{}).then(response =>{
        let list1 = response.data.list1;
        let list2 = response.data.list2;

        //收入
        const monthArray1 = list1.map(obj => obj.name);
        const moneyArray1 = list1.map(obj => obj.value);
        let myChart1 = this.$echarts.init(document.getElementById('echarts1'));
        let option1 = {
          title: {
            text: '近半年收入走势'
          },
          tooltip: {
            trigger: 'axis', // 使用坐标轴触发提示框
            axisPointer: { // 设置触发线样式
              type: 'shadow',
              shadowStyle: {
                opacity: 0.1
              }
            },
          },
          xAxis: {
            type: 'category',
            name: '月份',
            data: monthArray1,
            axisLabel: {
              rotate: 45 // 旋转角度
            }
          },
          yAxis: {
            type: 'value',
            name: '金额',
          },
          series: [
            {
              name: '金额',
              data: moneyArray1,
              type: 'bar',
              showBackground: true,
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' 元';
                }
              },
              itemStyle: {
                color: '#00aedb'
              },
            },
            {
              name: '金额',
              type: 'line',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' 元';
                }
              },
              lineStyle: {
                color: '#f7941e'
              },
              itemStyle: {
                color: '#f7941e',
                normal: {
                  label: {
                    show: true, // 显示标签
                    position: 'top', // 标签位置
                  }
                }
              },
              data: moneyArray1
            }

          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
        //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        window.addEventListener('resize',function() {myChart1.resize()});

        //支出
        const monthArray2 = list2.map(obj => obj.name);
        const moneyArray2 = list2.map(obj => obj.value);
        let myChart2 = this.$echarts.init(document.getElementById('echarts2'));
        let option2 = {
          title: {
            text: '近半年支出走势'
          },
          xAxis: {
            type: 'category',
            name: '月份',
            data: monthArray2,
            axisLabel: {
              rotate: 45 // 旋转角度
            }
          },
          yAxis: {
            type: 'value',
            name: '金额',
          },
          series: [
            {
              data: moneyArray2,
              type: 'line',
              itemStyle: {
                normal: {
                  label: {
                    show: true, // 显示标签
                    position: 'top' // 标签位置
                  }
                }
              },
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
        //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        window.addEventListener('resize',function() {myChart2.resize()});

      });
    },

  },

  //钩子函数(页面初始化时，钩子函数就会被执行)
  mounted(){
    this.loadLineData();
    this.loadPieData();
  }

}
</script>

<style scoped>
</style>
