// miniprogram/components/editor/editor.js
const db = wx.cloud.database();
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Component({

 properties:{
  b_title:{
    type:String
  }
  
 },
  data: {
    formats:{},
    readOnly: false,
    placeholder: '故事从这里开始...',
    editorHeight: 320,
    keyboardHeight: 0,
    isIOS: false
  },

  methods:{
    readOnlyChange() {
      this.setData({
        readOnly: !this.data.readOnly
      })
    },
    onLoad() {
      const platform = wx.getSystemInfoSync().platform
      const isIOS = platform === 'ios'
      this.setData({isIOS})
      const that = this
      this.updatePosition(0)
      let keyboardHeight = 0
      wx.onKeyboardHeightChange(res => {
        if (res.height === keyboardHeight) return
        const duration = res.height > 0 ? res.duration * 1000 : 0
        keyboardHeight = res.height
        setTimeout(() => {
          wx.pageScrollTo({
            scrollTop: 0,
            success() {
              that.updatePosition(keyboardHeight)
              that.editorCtx.scrollIntoView()
            }
          })
        }, duration)
      })
    },
    updatePosition(keyboardHeight) {
      const toolbarHeight = 50
      const { windowHeight, platform } = wx.getSystemInfoSync()
      let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
      this.setData({ editorHeight, keyboardHeight })
    },
    calNavigationBarAndStatusBar() {
      const systemInfo = wx.getSystemInfoSync()
      const { statusBarHeight, platform } = systemInfo
      const isIOS = platform === 'ios'
      const navigationBarHeight = isIOS ? 44 : 48
      return statusBarHeight + navigationBarHeight
    },
    onEditorReady() {
      const that = this
      //这里wx.createSelectorQuery()要换成this.createSelectorQuery()
      this.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
      }).exec()
    },
    blur() {
      this.editorCtx.blur()
    },
    //格式
    format(e) {
      let { name, value } = e.target.dataset
      if (!name) return
      console.log('format:', name, value)
      // console.log(e.target.dataset.name)
      this.editorCtx.format(name, value)
    },
    //格式按钮改变
    onStatusChange(e) {
      const formats = e.detail
      // console.log(formats instanceof Object) //true
      // console.log(formats)
      this.setData({
        formats:formats
      })
      // console.log(this.data.formats)
    },
    //插入分割线
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function () {
          // console.log('insert divider success')
        }
      })
    },
    clear() {
      this.editorCtx.clear({
        success: function (res) {
          console.log("clear success")
        }
      })
    },
    //删除格式
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    //添加今天日期
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate
      })
    },
    //添加图片
    insertImage() {
      const that = this
      wx.chooseImage({
        count: 1,
        success: function (res) {
          that.editorCtx.insertImage({
            src: res.tempFilePaths[0],
            data: {
              id: 'abcd',
              role: 'god'
            },
            width: '80%',
            success: function () {
              console.log('insert image success')
            }
          })
        }
      })
    },
    saveEditor(ev){
      this.editorCtx.getContents({
        success:(res)=>{      
        // console.log("succ：" + res.html); 
          db.collection('noteSheet').add({data:{
            n_date:new Date(),
            b_title:this.data.b_title,
            content_html:res.html,
            content_text:res.text,
            content_delta:res.delta
          }}).then(res=>{
            // console.log(res)
            Toast.success('添加成功')
          }).then(wx.navigateBack({
            delta: 0,
          }))

        // this.setData({
        //   editorInfo:res.html
        // })
        // console.log(typeof this.data.editorInfo) //string
        },
        fail:(res)=>{
        console.log("fail：" + res);
        }
        });
    }
  }
})