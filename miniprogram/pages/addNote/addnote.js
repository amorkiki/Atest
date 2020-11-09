// miniprogram/pages/addNote/addnote.js
Page({
  data: {
    navTitle:'添加读书笔记',
    showArr:true,
    bookTitle:'非洲的青山',
    prevpage:''
  },
  switchBack:function(){
    wx.navigateBack({
      delta: 0,
    })
  },
  onLoad:function(options){
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    // console.log(prevpage.route)
    this.setData({prevpage: prevpage.route})
  }
})