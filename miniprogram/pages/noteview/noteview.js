// miniprogram/pages/noteview/noteview.js
Page({

  data: {
    navTitle:'读书笔记',
    showArr:true
  },

  switchBack:function(){
    wx.navigateBack({
      delta: 0,
    })
  }
})