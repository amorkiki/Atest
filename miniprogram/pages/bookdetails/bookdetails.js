// miniprogram/pages/bookdetails/bookdetails.js

Page({

  data: {
    navTitle:'图书详情',
    tabType:'basic',
    showArr:true
  },
  switchToBasic(){
    this.setData({
      tabType:'basic'
    })
  },
  switchToTrack(){
    this.setData({
      tabType:'track'
    })
  },
  switchBack:function(){
    wx.navigateBack({
      delta: 0,
    })
  }

  
})