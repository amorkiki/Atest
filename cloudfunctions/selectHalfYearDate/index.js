// 云函数入口文件
const cloud = require('wx-server-sdk')
//初始化
cloud.init()
//连接云数据库
const db =cloud.database()
const $ = db.command.aggregate
const _ = db.command 
process.env.Tz ='Asia/Shanghai'
var today = new Date().toLocaleDateString()
//获取七天前的时间戳，getTime获取当前时间戳，24即24小时，60即60分钟，60即60秒，1000即计数单位
var seventime=(new Date).getTime()-24*60*60*1000*6;
//获取二十天前的时间戳，getTime获取当前时间戳，24即24小时，60即60分钟，60即60秒，1000即计数单位
//var monthtime=(new Date).getTime()-24*60*60*1000*19;
//获取seventime传入 Date 日期对象转换为字符串，如"2020/8/4"
var sevenTime=new Date(seventime).toLocaleDateString();
// 云函数入口函数
  exports.main = async (event, context) => {
    //boss-selldata是数据库表名
    return await db.collection("boss-selldata").aggregate()
  // .where({
  //date是字段，数据类型是date对象，_.gte和_.lte这里要传入date对象，
  //使用例如2020-08-04 12:13:29格式传入
  //   date:_.and(_.gte(new Date(sevenTime+" 00:00:00")),_.lte(new Date(today+" 23:59:59")))
  //   // date:_.eq(new Date(date))
  // })
  // .get()
  //聚合操作的match相当于where
  .match({
    date:_.and(_.gte(new Date(sevenTime+" 00:00:00")),_.lte(new Date(today+" 23:59:59")))
  })
  //转换格式并新增字段
  .addFields({
    tempDate:$.dateToString({
      date: '$date',
      format:'%m-%d',
      // format:'%Y-%m-%d',
      timezone: 'Asia/Shanghai',
      onNull: 'null'
    }),
  })
  //分组求和
  .group({
    _id: '$tempDate',
    price: $.sum('$price')
  })
  //排序
  .sort({
    _id: 1
})
  .end()
}