// pages/readnotes/readnotes.js
const db = wx.cloud.database()
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
    flag:false
  },

  onShow: function (options) {
    console.log(options)
    db.collection('noteSheet').get().then(res=>{
      console.log(res.data)
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
  }
})