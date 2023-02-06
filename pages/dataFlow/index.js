// pages/dataFlow/index.js
import API from '../../utils/API.js'
import { filterData } from '../../utils/filterData.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterData,
    pageData:null,
    orgId:null,
    orgStatus:null,
    dataType:[],
    statusLink:null,
    department:null,
    counselor:null,
    userId:null,
    servicer:null,
    canSubmit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orgId: options.orgId,
      orgStatus: options.orgStatus
    })       
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let dataType = [], statusLink
    let orgStatus = this.data.orgStatus
    let orgId = this.data.orgId
    
    let user = wx.getStorageSync('submitUser')   
    let statusLinkStorage = wx.getStorageSync('statusLink')
    
    // 获取当前页面数据
    this.getData(orgId)

    // 获取数据交互信息
    if (user){
      this.setData({
        userId: user.id,
        counselor: user.en + user.cn
      })
    }
    
    // 根据机构状态显示流转
    switch (orgStatus) {
      case '1':
      case '4':
        dataType.push(
          { value: '3', label: '待踢单客户', checked: statusLinkStorage !='6' ? true:false, explain: '数据录进系统后，必须添加一个关键决策人及其微信才能转移到待踢单环节。' },
          { value: '6', label: '死池客户', checked: statusLinkStorage=='6', explain: '确认当前客户为无效客户。' }
        )
        statusLink = statusLinkStorage != '6' ? '3' : statusLinkStorage
        break
      case '6':
        dataType.push({ value: '3', label: '待踢单客户', checked: true, explain: '数据录进系统后，必须添加一个关键决策人及其微信才能转移到待踢单环节。' })
        statusLink = '3'
        break
      case '3':
        dataType.push(
          { value: '5', label: '移交客服团队', checked: statusLinkStorage != 4 && statusLinkStorage != 7?true:false, explain: '将数据转到客户团队。' },
          { value: '4', label: '退还待下发', checked: statusLinkStorage == '4', explain: '不符合待踢单客户标准 ，没有关键决策热键人及其微信信息，踢回给市场部。' },
          { value: '7', label: '死池客户', checked: statusLinkStorage == '7', explain: '确认当前客户为无效客户。' }
        )
        statusLink = statusLinkStorage != 4 && statusLinkStorage != 7 ? '5' : statusLinkStorage
        break
      case '7':
        dataType.push({ value: '5', label: '移交客服团队', checked: true, explain: '将数据转到客户团队。' })
        statusLink = '7'
        break
    }
   
    this.setData({
      dataType,
      statusLink
    })    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorageSync('submitUser', null)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取页面数据
   */
  getData(orgId){
    API.findSubmitCustomerInfo(orgId).then((res)=>{      
      this.setData({
        pageData:res.data.data
      })

      // 判断是否可提交
      this.isEnough()
    })
  },
  /**
   * 选择池
   */
  changeLink(e){
    let statusLink = e.detail.value
    wx.setStorageSync('statusLink', statusLink)
    
    this.setData({
      statusLink
    })

    // 判断是否可提交
    this.isEnough()
  },
  /**
   * 选择城市经理
   */
  selectCounselor(){
    wx.navigateTo({
      url: '/pages/stafflist/index?title=城市经理&orgId=' + this.data.orgId + '&orgStatus=' + this.data.orgStatus
    })
  },
  /**
   * 选择客服专员
   */
  selectServicer(){
    wx.navigateTo({
      url: '/pages/stafflist/index?title=客服专员&orgId=' + this.data.orgId + '&orgStatus=' + this.data.orgStatus
    })
  },

  /**
   * 判断是否满足提交条件
   */
  isEnough(){
    let statusLink = this.data.statusLink
    let canSubmit = false
    
    switch (statusLink){
      case '3':
        canSubmit = this.data.pageData.keyPolicyMaker && this.data.pageData.weChat && this.data.userId
        break
      case '4':
      case '6':
      case '7':
        canSubmit = true
        break
      case '5':
        canSubmit = !!this.data.userId
        break
    }
    
    this.setData({
      canSubmit
    })
  },

  /**
   * 提交
   */
  submit(){
    if (this.data.canSubmit){
      let { orgStatus ,orgId ,statusLink ,userId } = this.data
      
      if(orgStatus == 1 || orgStatus == 4){
        if(statusLink == 3){
          if(!this.data.pageData.keyPolicyMaker){
            wx.showToast({
              title:'该机构暂未设置无关键决策人,不能下发至待踢单'
            })
            return false
          }

          if(!this.data.pageData.weChat){
            wx.showToast({
              title:'该机构暂关键决策人没有微信,不能下发至待踢单'
            })
            return false
          }

          API.submitCustomerToWaitingList({
            orgId,
            consultantId:userId,
            status:3
          }).then((res)=>{

          })
        }else if(statusLink == 6){
          API.submitCustomerToMarketDeadPool({
            orgId,
            status:6
          }).then((res)=>{

          })
        }
      }else if(orgStatus == 3){
        if(statusLink == 5){
          API.submitCustomerToMoveCustomerService({
            orgId,
            consultantId:userId,
            status:5
          })
        }else if(statusLink == 4){
          API.submitCustomerToBackStayDown({
            orgId,
            consultantId:this.data.pageData.userId,
            status:4
          })
        }else if(statusLink == 7){
          API.submitCustomerToConsultationDeadPool({
            orgId,
            status:7
          })
        }
      }
      // else if(orgStatus == 6){
      //   API.distributeFromMarketDeadPoolToStayDown({
      //     orgId,
      //     consultantId:userId,
      //     status:1
      //   })
      // }else if(orgStatus == 7){
      //   API.distributeFromConsultationDeadPoolToWaitingList({
      //     orgId,
      //     consultantId:userId,
      //     status:3
      //   })
      // }
      wx.removeStorageSync('statusLink')
      wx.removeStorageSync('submitUser')
      wx.redirectTo({
        url: '/pages/detail/detail?orgId='+ orgId
      })
    }else{
      return false
    }
  }
})