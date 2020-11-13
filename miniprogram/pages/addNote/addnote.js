// miniprogram/pages/addNote/addnote.js
const db = wx.cloud.database()
Page({
  data: {
    navTitle:'添加读书笔记',
    showArr:true,
    bookTitle:'',
    prevpage:''
  },
  switchBack:function(){
    wx.navigateBack({
      delta: 0,
    })
  },
  onLoad:function(options){
    // console.log(options)
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    // console.log(prevpage.route)
    this.setData({prevpage: prevpage.route})
    db.collection('bookSheet').doc(options.id).get().then(res=>{
      // console.log(res)
      this.setData({
        bookTitle:res.data.b_title
      })
    })
  }
})