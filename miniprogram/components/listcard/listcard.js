// miniprogram/components/listcard/listcard.js
const db = wx.cloud.database()
Component({
  properties:{
    title:{
      type:String,
      value:''
    },
    subtitle:{
      type:String,
      value:''
    },
    details1:{
      type:String,
      value:''
    },
    details2:{
      type:String,
      value:''
    },
    details3:{
      type:String,
      value:''
    },
    indexpage:{
      type:Boolean    
    },
    thisID:{
      type:String
    }
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  methods:{
    bookInfo: function(ev){
      // console.log(ev.currentTarget.dataset.index)
      const index= ev.currentTarget.dataset.index
      wx.navigateTo({
        url: '../../pages/bookdetails/bookdetails?id='+index,
        success:function(res){
          // console.log(res)
        },
        fail:function(){
        },
        complete:function(){}
      })
    },
    noteInfo:function(ev){
      console.log(ev.currentTarget.dataset.index)
      const index= ev.currentTarget.dataset.index
      wx.navigateTo({
        url: '../../pages/noteview/noteview?id='+index,
      })
    },
    addNote:function(ev){
      // console.log(ev.currentTarget.dataset.index)
      const index= ev.currentTarget.dataset.index
      // console.log(index)
      wx.navigateTo({
        url: '../../pages/addNote/addnote?id='+index,
      })
    },
    delNote:function(ev){
      // console.log(ev.currentTarget.dataset.index)
      const id= ev.currentTarget.dataset.index
      db.collection('noteSheet').doc(id).remove(res=>{
        // console.log(res)
      }).then(
        wx.showToast({
          title: '删除成功',
        })
      ).then(
        wx.switchTab({
        url: '../../pages/readnotes/readnotes?reload=true',
      })
      )
      


    }
  }
})