// pages/dataview/dataview.js
import fromatTime from '../../utils/timeline'

const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate

import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    navTitle:'读书轨迹',
    pieArray:[],
    pie_Name:[],
    lineAxis:[],
    lineNum:[],
    ec: {
      // onInit: initPie,

    }
  },
  onReady:function(){
     // 获取组件
     const pieComp= this.selectComponent('#mychart-dom-pie');
     const lineComp= this.selectComponent('#mychart-dom-line');
     //拿饼图の后台数据
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
      
      // 饼图
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
      
      })
     
      //拿折现图の后台数据
      var today = new Date().toLocaleDateString()
      // console.log(today) //2020/11/13
     //获取半年的时间戳，getTime获取当前时间戳，24即24小时，60即60分钟，60即60秒，1000即计数单位
     var halfYearTime=(new Date).getTime()-24*60*60*1000*180;
     //获取halfYearTime传入 Date 日期对象转换为字符串，如"2020/8/4"
     var halfYearTime=new Date(halfYearTime).toLocaleDateString();
     console.log(halfYearTime)
      db.collection('noteSheet').where({
      // n_date是字段，数据类型是date对象，_.gte大于 和_.lte小于 这里要传入date对象，
      // 使用例如2020-08-04 12:13:29格式传入
        n_date:_.and(_.gte(new Date(halfYearTime+" 00:00:00")),_.lte(new Date(today+" 23:59:59"))),
        // n_date:_.eq(new Date(date))
      })
      .get().then(async res=>{
        console.log((res.data))
        var arr=[]
       for(var i=0;i<res.data.length;i++){
        arr[i]= fromatTime(res.data[i].n_date,"Y-M")
       }
      //  console.log(arr); //["2020-10", "2020-11", "2020-09", "2020-10", "2020-11", "2020-10", "2020-11", "2020-07", "2020-11", ······]
       arr = arr.reduce((obj,name)=>{
         obj[name]=obj[name] ? ++obj[name] :1
         return obj
       },{})
       console.log(arr); //{2020-10: 3, 2020-11: 7, 2020-09: 2, 2020-07: 2, 2020-08: 1, …}
      var arr1=[]
      var arr3=[]
      for(var obj in arr){
        arr3.push(obj)
        arr1.push(obj.slice(5,7)+'月')
      }
      this.setData({
        lineAxis: arr1.sort()
      })
      arr3=arr3.sort()
      console.log(arr3);//["2020-06", "2020-07", "2020-08", "2020-09", "2020-10", "2020-11"]
      
      console.log(this.data.lineAxis); //["06月", "07月", "08月", "09月", "10月", "11月"]
      var arr2=[]
      for (var i=0;i<arr3.length;i++){
        arr2.push(arr[arr3[i]])
      }
       console.log(arr2); // [1, 2, 1, 2, 3, 7]
      this.setData({
        lineNum:arr2
      })

      // 折线图
      await lineComp.init((canvas, width, height, dpr) =>{
       const chart = echarts.init(canvas, null, {
         width: width,
         height: height,
         devicePixelRatio: dpr // new
       });
       canvas.setChart(chart);
     
       var option = {
         title: {
           text: '读书笔记',
           subtext: '2020年',
           left: 'center',
           textStyle:{
             fontSize:14,
             color:'#8a8a8a'
           }
         },
         color: "#7A7AF7",
         legend: {
           right:20,
           data: ['篇数'],
           textStyle:{
            fontSize:10,
            color:'#8a8a8a',
          },
          },
         grid: {
          left :'10%',
          containLabel: true
         },
         tooltip: {
           show: false,
           trigger: 'axis'
         },
         xAxis: {
           type: 'category',
           boundaryGap: false,
           axisLabel:{
            show:true,
            interval: 'auto',    // {number}表示隔几个标签显示一个标签
            rotate: 30,
            nameLocation :'middle',
            textStyle: {
              fontSize:10,
              color: '#8a8a8a',
            }
          },
          // axisTick: {
          //   show: false // 去除刻度线
          // },
           data: this.data.lineAxis,
           // show: false
         },
         yAxis: {
           x: 'center',
           type: 'value',
           splitLine: {
             lineStyle: {
               type: 'solid'
             }
           },
           axisLabel:{
            show:true,
            textStyle: {
              fontSize:10,
              color: '#8a8a8a',
            }
          },
          axisTick: {
            show: false // 去除刻度线
          },
         },
         series: [{
           name: '篇数',
           type: 'line',
           smooth: true,
           areaStyle: {},
           data:this.data.lineNum
         }]
       };
     
       chart.setOption(option);
       return chart;
     })
      

      })
      
   
  
   
  


  },
    
  
  

  
})