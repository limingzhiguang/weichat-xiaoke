// components/tags/index.js
import API from '../../utils/API.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orgId:{
      type:String | Number,
      value:''
    },
    isShow:{
      type:Boolean,
      value:false
    },
    extClass:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    orgId:null,
    show:false,
    tags:[],
    selectedTags:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showThis(orgId){
      API.findLabelListByLabelGroup(orgId).then((res)=>{
        const data = res.data.data
        let selectedTags = []
        if(data.length){
          data.forEach((item)=>{
            if (item.status == '1') {
              selectedTags.push(item.labelId)
            }
          })
        }
        this.setData({
          selectedTags,
          orgId,
          show:true,
          tags:data
        })
      })
    },
    toggle(e){
      let id = e.target.dataset.id
      let idx = e.target.dataset.index
      let selectedTags = this.data.selectedTags
      let item = this.data.tags[idx]
      let tag = `tags[${idx}].status`
      let status = item.status
      
      let index = selectedTags.indexOf(id)
      if (index > -1){
        selectedTags.splice(index,1)
      }else{
        selectedTags.push(id)
      }
      
      status = status == 1 ? '2' : '1'
      
      this.setData({
        selectedTags,
        [tag]: status
      })
    },
    confirm(){      
      API.insertRelationLabelInfo(this.data.orgId, this.data.selectedTags).then((res)=>{
        this.cancel()
        this.triggerEvent('confirm')
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      })
      
    },
    cancel(){
      this.setData({
        show:false
      })
    }
  }
})
