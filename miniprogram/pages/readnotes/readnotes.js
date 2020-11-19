// pages/readnotes/readnotes.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle:'日志墙',
    noteSheet:{},
    swiper1:'',
    swiper2:'',
    swiper3:'',
    title1:'',
    title2:'',
    title3:'',
    flag:false,
    search:false,
    searchInfo:[],
    attBottom:false
  },
  onPullDownRefresh: function () {
    console.log('refresh')
    //调用刷新时将执行的方法
    this.onShow();
  },

  onShow: function (options) {
    // console.log(options)
    db.collection('noteSheet').get().then(res=>{
      // console.log(res.data)
      if(res.data.length>2){
        this.setData({
          noteSheet:JSON.parse(JSON.stringify(res.data)),
          swiper1:res.data[res.data.length-1].content_html,
          title1:res.data[res.data.length-1].b_title,
          swiper2:res.data[res.data.length-2].content_html,
          title2:res.data[res.data.length-2].b_title,
          swiper3:res.data[res.data.length-3].content_html,
          title3:res.data[res.data.length-3].b_title,
        })
      }else if (res.data.length>1){
        this.setData({
          noteSheet:JSON.parse(JSON.stringify(res.data)),
          swiper1:res.data[res.data.length-1].content_html,
          title1:res.data[res.data.length-1].b_title,
          swiper2:res.data[res.data.length-2].content_html,
          title2:res.data[res.data.length-2].b_title
        })
      }else if (res.data.length>0){
        this.setData({
          noteSheet:JSON.parse(JSON.stringify(res.data)),
          swiper1:res.data[res.data.length-1].content_html,
          title1:res.data[res.data.length-1].b_title
        })
      }else{
        this.setData({
          flag:true
        })
      }
      // console.log(this.data.noteSheet)
      // console.log(this.data.length)
      // console.log(this.data.swiper1)
    })

  },
  addNote:function(){
    wx.navigateTo({
      url: '../../pages/addNote/addnote',
    })
  },
  searchNotes:function(){
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
    db.collection('noteSheet').where(_.or([//正则实现模糊查寻
      {b_title:db.RegExp({   
        regexp: this.data.searchInfo,
        option:'i'
      })
      },
      {content_text:db.RegExp({   
        regexp: this.data.searchInfo,
        option:'i'
      })}
    ])).get().then(res=>{
      // console.log(res)
      if(res.data.length > 0){
      this.setData({noteSheet:res.data})
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
  },
  onPageScroll:function(e){
    console.log(e)
    if(e.scrollTop<=260){
      this.setData({atBottom:false})
    }
  },
})