// pages/readnotes/readnotes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle:'日志墙',
    titleName:'',
    subTitle:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      titleName:'深入浅出JavaScript',
      subTitle:'我是笔记title'
    })
  }
})