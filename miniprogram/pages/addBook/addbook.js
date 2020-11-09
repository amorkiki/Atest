// miniprogram/pages/addBook/addbook.js
Page({
  data: {
    navTitle:'添加图书',
    showArr: true,
  },
  switchBack:function(){
    wx.navigateBack({
      delta: 0,
    })
  }

 
})