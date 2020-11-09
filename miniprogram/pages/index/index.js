// pages/booklist/booklist.js
Page({
  data: {
    navTitle:'图书馆',
    titleName:'',
    subTitle:'',
    bookAuthor:'',
    bookPub:''
  },

  onLoad: function () {
    this.setData({
      titleName:'前端',
      subTitle:'深入浅出JavaScript',
      bookAuthor:'author',
      bookPub:'publisher'
    })
  },


  addBook: function(event){
    console.log('addbook')
    console.log(event)
    wx.navigateTo({
      url: '../addBook/addbook',
    })
  },
  searchBook: function(event){
    console.log('searchBook')
    console.log(event)
  }

  
})