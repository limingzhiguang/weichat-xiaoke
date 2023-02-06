// components/followRecord/index.js
const API = require('../../utils/API.js');
const util = require('../../utils/util.js');
Component({
  properties: {
    list: {
        type: Array,
        value: [],
    },
    detail:{
      type:String | Number
    },
    hasMore:{
      type: Boolean,
      value: true,
    },
    hideContent:{
      type:Boolean,
      value:false
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    rowContent:'',
    orgId:'',
    isEdit:false,
    filePath:'',
    isVideoPlay:false,
    isFocus:false,
    bottom:0,
    lists:[]
  },
  attached: function attached() {
    
  },

  methods: {
    toDetailPage(e){
      if(!this.data.detail){
        wx.navigateTo({
          url:`../detail/detail?orgId=${e.currentTarget.dataset.orgId}&orgType=${e.currentTarget.dataset.orgType}&t=2`
        })
      }  
    },
    rowEdit(e){
      this.setData({
        rowContent:e.currentTarget.dataset.rowContent,
        orgId:e.currentTarget.dataset.orgId,
        isEdit:true
      })
      this.triggerEvent('edit')
    },
    // 编辑取消
    editCancer(){
      this.setData({
        isEdit:false
      })
      this.triggerEvent('cancel')
    },
  
    getTextareaContent(e){
      this.setData({
        rowContent:e.detail.value
      }) 
    },
    // 键盘高度
    keyboardheight(e){
      this.setData({
        bottom:e.detail.height*2+'rpx'
      })
    },
    // 编辑确认
    editConfirm(){
      this.setData({
        isEdit:false
      })
      
     API.updateFollowContent({
        content:this.data.rowContent,
        id:this.data.orgId
      }).then(()=>{
        this.triggerEvent('updateList')
        this.triggerEvent('cancel')
      })
    },
    lookFile(e){
      //type 1图片，2视频，3文本，4音频，5 word,6 excel,7 ppt ,8 pdf

      switch(e.detail.type){
        case 1:
          wx.previewImage({
            current: e.detail.path,
            urls: [e.detail.path]
          })
        break;
        case 2:
           this.setData({
            isVideoPlay:true,
            filePath:e.detail.path
           })
        break;
        case 3:
        case 4:
          wx.playBackgroundAudio({
            dataUrl: e.detail.path,
            title: '音频播放',
            coverImgUrl: ''
          })
        break;
        case 5:
        case 6:
        case 7:
        case 8:
          wx.showModal({
            content: '此文件请在pc端预览',
            showCancel:false,
            success (res) {
  
            }
          })
        break;
      }
      // console.log(e,'4444')
    },
    
    closeVideo(e){
      //console.log(e)
      this.setData({
        isVideoPlay:false,
       })
    }
  }
})