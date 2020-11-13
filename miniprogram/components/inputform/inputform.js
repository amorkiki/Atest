import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

// miniprogram/components/inputform/inputform.js
const db = wx.cloud.database()
Component({

  properties:{
    array:{
      type:Array,
      value:['文学','艺术','社科','IT','外文','自然','考试']
    },
    editId:{
      type:String
    }
  },

  data: {
    editInfo:{}
  },
  methods:{
    bindPickerChange: function (e) {
      // console.log(e.detail.value)
      // this.data就是整个picker的内容
      // console.log(this.data.array[e.detail.value])
      this.setData({
        index: e.detail.value,
      })
    },
    submitAdd: function(ev){
      console.log(ev.detail.value)
      var result = ev.detail.value
      var cate = this.properties.array[parseInt(result.cata_name)]
      // console.log(cate)
      db.collection('bookSheet').add({data:{
        b_title:result.b_title,
        author:result.author,
        publisher:result.publisher,
        isbn:parseInt(result.isbn),
        total_p:parseInt(result.total_p),
        cata_name:cate
      }}).then(res=>{
        console.log(res)
      })
      wx.navigateBack({
        delta: 0,
      })
      wx.showToast({
        title: '添加成功^_^',
      })
      
    },
    resetAdd: function(){
    },
    editInfo:function(){
      console.log(this.properties.editId)
      db.collection('bookSheet').doc(this.properties.editId).get().then(res=>{
        console.log(res.data)
        this.setData({editInfo:res.data})
      }) 
      // console.log(this.data.editInfo)
    },
    submitEdit:function(ev){
      // console.log(ev.detail.value)
      var result = ev.detail.value
      var cate = this.properties.array[parseInt(result.cata_name)]
      db.collection('bookSheet').doc(this.properties.editId).update({data:{
        b_title:result.b_title,
        author:result.author,
        publisher:result.publisher,
        isbn:parseInt(result.isbn),
        total_p:parseInt(result.total_p),
        cata_name:cate
      }}).then(res=>{
        // console.log(res)
      })
      wx.navigateBack({
        delta: 2,
      })
      wx.showToast({
        title: '修改成功^_^',
      })
    }
  }
  

  
})