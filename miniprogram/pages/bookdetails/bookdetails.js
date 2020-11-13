import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import fromatTime from '../../utils/timeline'
// miniprogram/pages/bookdetails/bookdetails.js
const db=wx.cloud.database()

Page({
  data: {
    navTitle:'图书详情',
    tabType:'basic',
    showArr:true,
    bookDetail:{},
    doc:'',
    cur_p:0,
    cur_pro:0,
    curBox:false,
    timeArry:[]
  },
  onLoad:function(options){
    // console.log(options) //拿到传来的id
      db.collection('bookSheet').doc(options.id).get().then(res=>{
        // console.log(res.data)
        this.setData({
          bookDetail:res.data,
          doc:options.id,
          cur_p:res.data.cur_p,
          cur_pro:parseFloat(((res.data.cur_p/res.data.total_p)*100).toFixed(2))
        })
        // console.log(this.data.cur_pro)
      })
      
  },
  // tab栏切换
  switchToBasic(){
    this.setData({
      tabType:'basic'
    })
  },
  // tab栏切换
  switchToTrack(){
    this.setData({
      tabType:'track'
    })
    var index=this.data.bookDetail.b_title
    // console.log(index)
    // 获取时间轴信息
    db.collection('noteSheet').where({
      b_title:index
    }).get().then(res=>{
      // console.log(res.data)
      // 遍历格式化日期生成新数组
      var noteSheet = res.data
      var arry=[]
      for(var i =0;i<noteSheet.length;i++){
        arry[i]= fromatTime(noteSheet[i].n_date,"Y-M-D h:m:s")
        
      }
      this.setData({
        timeArry:arry
      })
      // console.log(this.data.timeArry)
      
    })

  },
  // 后退
  switchBack:function(){
    wx.navigateBack({
      delta: 0,
    })
  },
  // 跳转到更新表当
  updateBook:function(){
    wx.navigateTo({
      url: '../../pages/addBook/addbook?id='+this.data.doc,
    })
  },
  // 删除图书
  delBook:function(){
    console.log(this.data.doc)
    db.collection('bookSheet').doc(this.data.doc).remove({
      success: function(res) {
        console.log(res.data)
      }
    })
    wx.navigateBack({
      delta: 0,
    })
    wx.showToast({
      title: '删除成功',
    })
  },
  // 点击更新进度按钮
  updateCur:function(){
    if(this.data.curBox === false){
      this.setData({
        curBox:true
      })
    } 
  },
// 更新进度
  updateInput:function(e){
    // console.log(e.detail.value)
    this.setData({
      cur_p:parseFloat(e.detail.value)
    })
    console.log(this.data.cur_p)
    console.log(this.data.doc)

    db.collection('bookSheet').doc(this.data.doc).update({data:{
      cur_p: this.data.cur_p
    }}).then(res=>{
      console.log(res)
    })
    this.setData({
      curBox:false
    })
    this.updateProgress()
  },
  // 跟新进度条
  updateProgress:function(){
    db.collection('bookSheet').doc(this.data.doc).get().then(res=>{
      console.log(res.data)
      this.setData({
        bookDetail:res.data,
        cur_p:res.data.cur_p,
        cur_pro:parseFloat(((res.data.cur_p/res.data.total_p)*100).toFixed(2))
      })
      console.log(this.data.cur_pro)
    })
  },
  


  
})