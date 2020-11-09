// miniprogram/components/listcard/listcard.js
Component({
  properties:{
    titleName:{
      type:String,
      value:''
    },
    subTitle:{
      type:String,
      value:''
    },
    bookAuthor:{
      type:String,
      value:''
    },
    bookPub:{
      type:String,
      value:''
    },
    indexpage:{
      type:Boolean    
    }
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  methods:{
    bookInfo: function(){
      wx.navigateTo({
        url: '../../pages/bookdetails/bookdetails',
        success:function(res){
          console.log(res)
        },
        fail:function(){
        },
        complete:function(){}
      })
    },
    noteInfo:function(){
      wx.navigateTo({
        url: '../../pages/noteview/noteview',
      })
    }
  }
})