// pages/index/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();

// 1. 获取数据库引用
const db = wx.cloud.database()
const _ = db.command
//2，获取集合引用
// const bookSheet = db.collection('bookSheet')
Page({
  data: {
    navTitle:'图书馆',
    bookSheet:[],
    search:false,
    searchInfo:''
  },
  
  onLoad:function(){
    db.collection('bookSheet').get().then(res=>{
      console.log(res.data.length)
      app.globalData.bookNum=res.data.length
    })
    db.collection('noteSheet').get().then(res=>{
      console.log(res.data.length)
      app.globalData.notesNum=res.data.length
    })
  },
  onShow: function () {
    db.collection('bookSheet').get().then(res=>{
      // res.data 包含该记录的数据
      console.log(res.data)
      const result = res.data
      this.setData({bookSheet:result})
    })
  },


  addBook: function(event){
    console.log('addbook')
    console.log(event)
    wx.navigateTo({
      url: '../addBook/addbook',
    })
  },
  searchBook: function(){
    // console.log('searchBook')
    this.setData({
      search:true
    })
  },
  onSearch(e){
    // console.log(e.detail)
    this.setData({
      searchInfo: e.detail,
    });
    // console.log(this.data.searchInfo)
    db.collection('bookSheet').where(_.or([//正则实现模糊查寻
      {b_title:db.RegExp({   
        regexp: this.data.searchInfo,
        option:'i'
      })
      },
      {author:db.RegExp({   
        regexp: this.data.searchInfo,
        option:'i'
      })},
      {publisher:db.RegExp({   
        regexp: this.data.searchInfo,
        option:'i'
      })},
      {cata_name:db.RegExp({   
        regexp: this.data.searchInfo,
        option:'i'
      })}
    ])).get().then(res=>{
      // console.log(res)
      if(res.data.length > 0){
      this.setData({bookSheet:res.data})
      }else{
        Toast.fail('没找到呀>_<');
      }
    })
  },
  onClear(){
    this.setData({
      searchInfo:''
    })
    this.setData({search:false})
    this.onShow()
  }
})