// pages/dataview/dataview.js
const db = wx.cloud.database()
import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    navTitle:'读书轨迹',
    pieArray:[],
    pie_Name:[],
    ec: {
      // onInit: initPie,

    }
  },
  onReady:function(){
     // 获取组件
     const pieComp= this.selectComponent('#mychart-dom-pie');
     const scatterComp= this.selectComponent('#mychart-dom-scatter');
     //拿后台数据
     db.collection('bookSheet').get().then(async res=>{
      // console.log(res.data)
      var arry=[]
      for(var i=0;i<res.data.length;i++){
        arry[i]=res.data[i].cata_name
      }
      //array=['文学','文学','艺术','IT','社科','外文']
      const cataArray = arry.reduce((obj,name)=>{
        obj[name]=obj[name] ? ++obj[name] : 1
        return obj
      },{})
      // console.log(cataArray) //cataArray={文学: 2, 艺术: 1, IT: 4, 社科: 1, 外文: 1}
      var pie_name=[]
      var pie_array=[]
      for(var obj in cataArray){
        pie_name.push(obj)
      }
      // console.log(pie_name) //["文学", "艺术", "IT", "社科", "外文"]
      for(var i = 0;i<pie_name.length;i++){
        pie_array[i]={name:pie_name[i],value:cataArray[pie_name[i]]}
      }
      // console.log(pie_array)// [{name: "文学", value: 2}, {…}, {…}, {…}, {…}]
      this.setData({pieArray:pie_array,pie_Name:pie_name})
      // console.log(this.data.pieArray)
      await pieComp.init((canvas, width, height, dpr) =>{
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);
        var options={
          title: {
            text: '阅读类型',
            left: 'center',
            textStyle:{
              fontSize:14,
              color:'#8a8a8a',
            }
        },
        backgroundColor: "#ffffff",
        legend: {
          bottom: 0,
          left: 'center',
          itemHeight:12,
          itemWidth:12,
          textStyle:{
            fontSize:10,
            color:'#8a8a8a',
          },
          data: this.data.pie_Name
      },
        color: ["#7A7AF7", "#CCDAFC", "#F9E3D9", "#EBFBFF", "#C6CAE9", "#FF9F7F"],
        series: [{
          label: {
            normal: {
              fontSize: 12,
              rich:{} //防止在手机上显示字体过小
            }
          },
          type: 'pie',
          radius : '60%',
          center: ['50%', '50%'],
          data: this.data.pieArray
        }]
      }
        chart.setOption(options);
        return chart;
      })
      await scatterComp.init((canvas, width, height, dpr) =>{
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);
      
        var data = [];
        var data2 = [];
      
        for (var i = 0; i < 10; i++) {
          data.push(
            [
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 40)
            ]
          );
          data2.push(
            [
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100)
            ]
          );
        }
      
        var axisCommon = {
          axisLabel: {
            textStyle: {
              color: '#8a8a8a'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#8a8a8a'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#8a8a8a',
              type: 'solid'
            }
          }
        };
      
        var option = {
          color: ["#FF7070", "#60B6E3"],
          backgroundColor: '#eee',
          xAxis: axisCommon,
          yAxis: axisCommon,
          legend: {
            data: ['日期', 'bbbb']
          },
          visualMap: {
            show: false,
            max: 100,
            inRange: {
              symbolSize: [20, 70]
            }
          },
          series: [{
            type: 'scatter',
            name: 'aaaa',
            data: data
          },
          {
            name: 'bbbb',
            type: 'scatter',
            data: data2
          }
          ],
          animationDelay: function (idx) {
            return idx * 50;
          },
          animationEasing: 'elasticOut'
        };
      
      
        chart.setOption(option);
        return chart;
      })
    })
  },
    
  
  

  
})