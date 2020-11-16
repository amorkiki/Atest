// pages/index/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

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
    searchInfo:'',
    atBottom:false,
    searchShow:true,
    addShow:true
  },

  onShow: function () {
    db.collection('bookSheet').get().then(res=>{
      // res.data 包含该记录的数据
      // console.log(res.data)
      const result = res.data
      this.setData({bookSheet:result})
    })
  },
  onPageScroll:function(e){
    // console.log(e)
    if(e.scrollTop>260){
      this.setData({addShow:false,searchShow:false,search:false})
    }
    if(e.scrollTop<=260){
      this.setData({atBottom:false,searchShow:true,addShow:true})
    }
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
  },
  onReachBottom: function () {
    this.setData({
      atBottom:true
    })
  },
  backTop:function(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    this.setData({
      atBottom:false
    })
  }
})