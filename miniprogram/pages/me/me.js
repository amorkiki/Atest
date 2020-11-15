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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){
    console.log('onload')
    this.setData({
      avatarUrl:app.globalData.avatarUrl,
      userName:app.globalData.userName
    })
  },
  onShow: function(){
    console.log('onshow')
    db.collection('bookSheet').get().then(res=>{
      console.log(res.data.length)
      this.setData({
        bookNum:res.data.length
      })
    })
    db.collection('noteSheet').get().then(res=>{
      console.log(res.data.length)
      this.setData({
        notesNum:res.data.length
      })
    })
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})