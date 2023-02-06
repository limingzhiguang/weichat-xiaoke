// pages/upperProject/index.js
import API from '../../utils/API.js'
import { filterData } from '../../utils/filterData.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterData: JSON.parse(JSON.stringify(filterData)),
    orgId: null,
    inforData: {},
    setForm: {},
    isEditing: false,
    orgInfor: {},
    wordNumber:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orgId: options.orgId,
      orgInfor: app.globalData.orgInfor
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
    this.getProjectInfor()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
   * 获取人员规模
   */
  getProjectInfor() {
    if (!this.data.isEditing) {
      API.orgManagement(this.data.orgId).then((res) => {
        const data = res.data.data
        
        let {
          founderNum,
          partnerNum,
          middleManagementNum,
          marketingManagementNum,
          salerNum,
          researcherNum,
          teachingSubject,
          remark
        } = res.data.data
        
        this.data.filterData.upperTeachingRange.forEach((item) => {
          if (teachingSubject.includes(item.label)){
            item.checked = true
          } else {
            item.checked = false
          }      
        })        

        this.setData({
          inforData: data,      
          'filterData.upperTeachingRange': this.data.filterData.upperTeachingRange,
          setForm: {
            founderNum,
            partnerNum,
            middleManagementNum,
            marketingManagementNum,
            salerNum,
            researcherNum,
            teachingSubject: teachingSubject? teachingSubject.split(',') : [],
            remark            
          }
        })
      })
    }
  },

  /**
   * 修改
   */
  editInfor() {
    this.setData({
      isEditing: true
    })
  },
  /**
   * 取消修改
   */
  cancle() {
    wx.showModal({
      title: '',
      content: '是否放弃修改？',
      cancelColor: '#999',
      confirmColor: '#017FFF',
      success: (res) => {
        if (res.confirm) {
          let {
            founderNum,
            partnerNum,
            middleManagementNum,
            marketingManagementNum,
            salerNum,
            researcherNum,
            teachingSubject,
            remark
          } = this.data.inforData

          this.setData({
            isEditing: false,
            setForm: {
              founderNum,
              partnerNum,
              middleManagementNum,
              marketingManagementNum,
              salerNum,
              researcherNum,
              teachingSubject: teachingSubject ? teachingSubject.split(',') : [],
              remark
            }
          })
        }
      }
    })
  },
  /**
   * 客户类型
   */
  changeTeachingRange(e) {
    this.data.filterData.upperTeachingRange.forEach((item) => {
      if (e.detail.value.includes(item.label)) {
        item.checked = true
      }else{
        item.checked = false
      }
    })

    this.setData({
      'filterData.upperTeachingRange': this.data.filterData.upperTeachingRange,
      'setForm.teachingSubject': e.detail.value
    })
  },
  /**
     * 设置备注
     */
  setRemark(e) {
    this.setData({
      'setForm.remark': e.detail.value,
      wordNumber: e.detail.value.length
    })
  },
  /**
   * 保存
   */
  formSubmit(e) {
    let {
      teachingSubject
    } = this.data.setForm
    
    API.saveOrgManagementInfo({
      ...e.detail.value,
      teachingSubject: teachingSubject.join(','),
      orgId: this.data.orgId
    }).then((res) => {
      this.setData({
        isEditing: false
      })
      this.getProjectInfor()
    })
  }

})
