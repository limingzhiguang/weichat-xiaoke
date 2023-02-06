// components/earningsEstimate/index.js
const API = require('../../utils/API.js');
const permission = require('../../utils/permission.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:Array,
    detail:{
      type:String | Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    topStatus:false,
    isEdit:false,
    stage:'',
    number:'',
    // 1-发现需求；2-确认需求；3-解决方案；4-商务谈判；5-招标；6-赢单；7-输单；8-延期
    stageIndex:null,
    stageList:[
      {
        name:'发现需求',
        value:1
      },
      {
        name:'确认需求',
        value:2
      },
      {
        name:'解决方案',
        value:3
      },
      {
        name:'商务谈判',
        value:4
      },
      {
        name:'招标',
        value:5
      },
      {
        name:'赢单',
        value:6
      },
      {
        name:'输单',
        value:7
      },
      {
        name:'延期',
        value:8
      }
    ],
    // 权限控制按钮
    needBtnUp:false,
    needBtnDown:false,
    typeBtnUp:false,
    typeBtnDown:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 阶段修改
    rowEdit(e){
      console.log(e,'444')
      this.setData({
        isEdit:true,
        stage:e.currentTarget.dataset.stage,
        number:e.currentTarget.dataset.number
      })
    },
    toDetail(e){
      if(!this.data.detail){
        wx.navigateTo({
          url:`../detail/detail?orgId=${e.currentTarget.dataset.orgId}&orgType=${e.currentTarget.dataset.orgType}&t=1`
        })
      }  
    },
    // 编辑取消
    editCancer(){
      this.setData({
        isEdit:false
      })
    },
    // 阶段选择
    selectCurrentStage(e){
      this.setData({
        stageIndex:e.currentTarget.dataset.stageIndex,
        stage:null
      })
    },
    // 阶段修改确认
    editConfirm(){
      try{
        API.predictionUpdateStatus({
          stageContent:this.data.stageIndex===null?this.data.stage:this.data.stageList[this.data.stageIndex].value,
          yjPredictionId:this.data.number
        }).then(()=>{
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            stageIndex:null,
            isEdit:false
          })
          this.triggerEvent('updateList')
        })
      }catch(e){
        console.log(e)
      }
    },
    setPage(bool){
      console.log(bool)
      this.setData({
        topStatus:bool
      })
    },
    // 修改意向度
    changeIntent(e){
      const { type, number } = e.currentTarget.dataset
      const that = this
      const arr = ['','A','B','C','D'] 
      wx.showActionSheet({
        itemList:['请选择','A','B','C','D'],
        itemColor:'#017FFF',
        success:(res)=>{
          API.updateIntentType({
            yjPredictionId:number,
            intentType:arr[res.tapIndex]
          }).then((resp)=>{
            that.triggerEvent('updateList')
            wx.showToast({
              title: '产品意向度修改成功'
            })
          })         
        }
      })
    }
  },
  attached(){
    // var pUpBtn = permission.btnControl('followUpCustomerPage_personnelInfoPage:addButton');
    // var pDownBtn = permission.btnControl('stayDownCustomerPage_personnelInfoPage:addButton');
    let needBtnUp,needBtnDown,typeBtnUp,typeBtnDown,updateDownIntent,updateUpperIntent;
    needBtnUp = permission.btnControl('followUpCustomerPage_preIncomeInfoPage:updateStageButton');
    needBtnDown = permission.btnControl('stayDownCustomerPage_preIncomeInfoPage:updateStageButton');
    console.log(needBtnUp);
    this.setData({
      needBtnUp:needBtnUp,
      needBtnDown:needBtnDown,
      updateDownIntent:permission.btnControl('stayDownCustomerPage_preIncomeInfoPage:updateProduceIntentionButton'),
      updateUpperIntent:permission.btnControl('followUpCustomerPage_preIncomeInfoPage:updateProduceIntentionButton')
    })
    // typeBtnUp = permission.btnControl('');
    // typeBtnDown = permission.btnControl('');
    // typeBtnUp:false,
    // typeBtnDown:false

  }
})
