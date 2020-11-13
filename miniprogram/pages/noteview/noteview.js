// miniprogram/pages/noteview/noteview.js
const db = wx.cloud.database()
Page({

  data: {
    navTitle:'读书笔记',
    showArr:true,
    bookTitle:'',
    date:'',
    content:''
  },
  onLoad:function(options){
    // console.log(options)
    db.collection('noteSheet').doc(options.id).get().then(res=>{
      // console.log(res.data)
      this.setData({
        bookTitle:res.data.b_title,
        date:(JSON.parse(JSON.stringify(res.data)).n_date).slice(0,10),
        content:res.data.content_html 
      })
    })
  },
  switchBack:function(){
    wx.navigateBack({
      delta: 0,
    })
  }
})