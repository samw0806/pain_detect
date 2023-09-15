<template>
	
  <view class="line">
  	<text class="text">VAS</text>
  </view>
  
  <view class="charts-box" style="">
    <qiun-data-charts 
      type="line"
      :opts="opts"
      :chartData="chartData1"
    />
  </view>
  
  <view class="line">
  	<text class="text">检测结果</text>
  </view>
  
  <view class="charts-box">
    <qiun-data-charts 
      type="line"
      :opts="opts"
      :chartData="chartData2"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      chartData1: {},
	  chartData2: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,10,0,15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow"
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
			chart1:{
            categories: ["2020","2021","2022","2023"],
            series: [
              {
                name: "vas",
                lineType: "dash",
                data: [2,7,4,10]
              },
              {
                name: "检测结果",
                data: [6,10,4,6]
              },
            ]
          },
			chart2:{
            categories: ["2020","2021","2022","2023"],
            series: [
              {
                name: "vas",
                lineType: "dash",
                data: [7,2,4,10]
              },
              {
                name: "检测结果",
                data: [4,10,2,6]
              },
            ]
          }
		};
        this.chartData1 = JSON.parse(JSON.stringify(res.chart1));
		this.chartData2 = JSON.parse(JSON.stringify(res.chart2));
      }, 500);
    },
  }
};
</script>

<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
	margin-top: 80rpx;
    width: 100%;
    height: 400rpx;
  }
  .line{
    height:0;
    border-top:1px solid #d3d3d3;
    text-align:center;
	margin-top: 80rpx;
  }
  .text{
    position:relative;
    top:-12px;
    background-color:#fff;
	font-size: 33rpx;
  }
</style>