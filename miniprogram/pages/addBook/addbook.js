// miniprogram/pages/addBook/addbook.js

const db = wx.cloud.database();

Page({
  data: {
    navTitle:'添加图书',
    showArr: true,
    e_id:''

  },
  //获取子组件信息
  getChildComponent: function () {
    const child = this.selectComponent('#form');
    console.log(child.data)
  },
  onLoad:function(options){
    if(options.id){
      console.log(options.id)
      const that = this
      this.setData({e_id:options.id})
      var child = this.selectComponent('#form')
      console.log(child)
      this.selectComponent('#form').editInfo()
    }else{
      console.log('add new book')
    }
  },
  switchBack:function(){
    wx.navigateBack({
      delta: 0,
    })
  }
})