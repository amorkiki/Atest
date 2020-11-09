// miniprogram/components/inputform/inputform.js
Component({

  properties:{
    array:{
      type:Array,
      value:['1','2','3','4']
    }

  },

  data: {

  },
  methods:{
    bindPickerChange: function (e) {
      console.log(e.detail.value)
      this.setData({
        index: e.detail.value
      })
    }
  }

  
})