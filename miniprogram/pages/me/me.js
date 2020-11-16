// pages/me/me.js
const db=wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    userName:'',
    bookNum:0,
    notesNum:0
  },
  shareApp:function(){
    console.log('share')
  },

  // onLoad: function(){
  //   console.log('onload')
  //   this.setData({
  //     avatarUrl:app.globalData.avatarUrl,
  //     userName:app.globalData.userName
  //   })
  // },
  onShow: function(){
    // console.log('onshow')
    this.setData({
      avatarUrl:app.globalData.avatarUrl,
      userName:app.globalData.userName
    })
    db.collection('bookSheet').get().then(res=>{
      // console.log(res.data.length)
      this.setData({
        bookNum:res.data.length
      })
    })
    db.collection('noteSheet').get().then(res=>{
      // console.log(res.data.length)
      this.setData({
        notesNum:res.data.length
      })
    })
  

  }
})