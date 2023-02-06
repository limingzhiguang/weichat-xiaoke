// components/prompt/prompt.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'标题'
    },
    isShow:{
      type:Boolean,
      value:false
    },
    btnCancel:{
      type:String,
      value:'取消'
    },
    btnTrue:{
      type:String,
      value:'确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    inputVal:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchContainer(){
      return false
    },
    showPrompt(val){      
      this.setData({
        show: true,
        inputVal:val
      })     
    },
    hidePrompt() {
      this.triggerEvent('close')
      this.setData({
        show: false
      })      
    },
    getVal(e){
      this.setData({
        inputVal:e.detail.value
      })
    },
    confirm(){
      this.triggerEvent('confirm', { value: this.data.inputVal})
      this.hidePrompt()
    }
  }
})
