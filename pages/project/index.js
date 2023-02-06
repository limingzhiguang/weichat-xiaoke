// pages/project/index.js
import API from '../../utils/API.js'
import { filterData } from '../../utils/filterData.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterData,
    orgId: null,
    inforData: {},
    setForm: {},
    isEditing: false,
    orgInfor: {},
    wordNumber:0,
    teachingRangeChecked:[],
    mainTeachingRangeChecked: [],
    teachingSubjectChecked: [],
    teachingInterestChecked: [],
    mainTeachingSubjectChecked: [],
    mainTeachingInterestChecked: [],
    teachingTypeChecked: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orgId: options.orgId,
      orgInfor: app.globalData.orgInfor,
      isIphoneX: app.globalData.isIphoneX
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
    let orgInfor = app.globalData.orgInfor
    let editPermission = (orgInfor.orgStatus == '2' && this.checkPermission('followUpCustomerPage_orgInfoPage:personnelEditButton')) || (orgInfor.orgStatus != '2' && this.checkPermission('stayDownCustomerPage_orgInfoPage:personnelEditButton'))

    this.setData({ editPermission })

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
   * 
   * 权限检查
   */
  checkPermission(per){
    const permissionList = wx.getStorageSync('permissionList') 
    let btnPermission = permissionList?permissionList:[]

    return btnPermission.includes(per) 
  },
  /**
   * 获取人员规模
   */
  getProjectInfor(){
    if(!this.data.isEditing){
      API.orgManagement(this.data.orgId).then((res)=>{        
        const data = res.data.data
        let teachingRangeChecked = [],
          mainTeachingRangeChecked = [],
          teachingSubjectChecked = [],
          teachingInterestChecked = [],
          mainTeachingSubjectChecked = [],
          mainTeachingInterestChecked = [],
          teachingTypeChecked = []
        let {
          orgTotalNum,
          middleManagementNum,
          teachingNum,
          marketingManagementNum,
          fullTimeTeacherNum,
          partTimeTeacherNum,
          teachingRange,
          mainTeachingRange,
          teachingSubject,
          teachingInterest,
          mainTeachingSubject,
          mainTeachingInterest,
          teachingType,
          remark
        } = res.data.data
       
        filterData.teachingRange.forEach((item)=>{
          teachingRangeChecked.push(teachingRange && teachingRange.includes(item))
        })
        filterData.teachingRange.forEach((item) => {
          mainTeachingRangeChecked.push( mainTeachingRange && mainTeachingRange.includes(item))
        })
        filterData.teachingSubject.forEach((item) => {
          teachingSubjectChecked.push(teachingSubject && teachingSubject.includes(item))
        })
        filterData.teachingInterest.forEach((item) => {
          teachingInterestChecked.push(teachingInterest && teachingInterest.includes(item))
        })
        filterData.teachingSubject.forEach((item) => {
          mainTeachingSubjectChecked.push(mainTeachingSubject && mainTeachingSubject.includes(item))
        })
        filterData.teachingInterest.forEach((item) => {
          mainTeachingInterestChecked.push(mainTeachingInterest && mainTeachingInterest.includes(item))
        })
        filterData.teachingType.forEach((item) => {
          teachingTypeChecked.push(teachingType && teachingType.includes(item))
        })
        
        this.setData({
          inforData: data,
          teachingRangeChecked,
          mainTeachingRangeChecked,
          teachingSubjectChecked,
          teachingInterestChecked,
          mainTeachingSubjectChecked,
          mainTeachingInterestChecked,
          teachingTypeChecked,
          wordNumber:remark?remark.length:0,
          setForm: {
            orgTotalNum,
            middleManagementNum,
            teachingNum,
            marketingManagementNum,
            fullTimeTeacherNum,
            partTimeTeacherNum,
            teachingRange: teachingRange ? teachingRange.split(','):[],
            mainTeachingRange: mainTeachingRange ? mainTeachingRange.split(',') : [],
            teachingSubject: teachingSubject ? teachingSubject.split(',') : [],
            teachingInterest: teachingInterest ? teachingInterest.split(',') : [],
            mainTeachingSubject: mainTeachingSubject ? mainTeachingSubject.split(',') : [],
            mainTeachingInterest: mainTeachingInterest ? mainTeachingInterest.split(',') : [],
            teachingType: teachingType ? teachingType.split(',') : [],
            remark
          }
        }) 
      })
    }  
  },

  /**
   * 修改
   */
  editInfor(){
    this.setData({
      isEditing:true
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
            orgTotalNum,
            middleManagementNum,
            teachingNum,
            marketingManagementNum,
            fullTimeTeacherNum,
            partTimeTeacherNum,
            teachingRange,
            mainTeachingRange,
            teachingSubject,
            teachingInterest,
            mainTeachingSubject,
            mainTeachingInterest,
            teachingType,
            remark
          } = this.data.inforData

          this.setData({
            isEditing: false,
            wordNumber:remark?remark.length:0,
            setForm: {
              orgTotalNum,
              middleManagementNum,
              teachingNum,
              marketingManagementNum,
              fullTimeTeacherNum,
              partTimeTeacherNum,
              teachingRange: teachingRange ? teachingRange.split(',') : [],
              mainTeachingRange: mainTeachingRange ? mainTeachingRange.split(',') : [],
              teachingSubject: teachingSubject ? teachingSubject.split(',') : [],
              teachingInterest: teachingInterest ? teachingInterest.split(',') : [],
              mainTeachingSubject: mainTeachingSubject ? mainTeachingSubject.split(',') : [],
              mainTeachingInterest: mainTeachingInterest ? mainTeachingInterest.split(',') : [],
              teachingType: teachingType ? teachingType.split(',') : [],
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
  changeTeachingRange(e){
    let teachingRangeChecked = []
    filterData.teachingRange.forEach((item) => {
      teachingRangeChecked.push(e.detail.value.includes(item))
    })

    this.setData({
      teachingRangeChecked,
      'setForm.teachingRange': e.detail.value
    })
  },
  /**
   * 主客户类型
   */
  changeMainTeachingRange(e) {
    let mainTeachingRangeChecked = []
    filterData.teachingRange.forEach((item) => {
      mainTeachingRangeChecked.push(e.detail.value.includes(item))
    })
    this.setData({
      mainTeachingRangeChecked,
      'setForm.mainTeachingRange': e.detail.value
    })
  },
  /**
   * 授课内容：学科
   */    
  changeTeachingSubject(e) {
    let teachingSubjectChecked = []
    filterData.teachingSubject.forEach((item) => {
      teachingSubjectChecked.push(e.detail.value.includes(item))
    })
    this.setData({
      teachingSubjectChecked,
      'setForm.teachingSubject': e.detail.value
    })
  },
  /**
   * 授课内容：兴趣类
   */
  changeTeachingInterest(e) {
    let teachingInterestChecked = []
    filterData.teachingInterest.forEach((item) => {
      teachingInterestChecked.push(e.detail.value.includes(item))
    })
    this.setData({
      teachingInterestChecked,
      'setForm.teachingInterest': e.detail.value
    })
  },
  /**
   * 主授课内容：学科
   */
  changeMainTeachingSubject(e) {
    let mainTeachingSubjectChecked = []
    filterData.teachingSubject.forEach((item) => {
      mainTeachingSubjectChecked.push(e.detail.value.includes(item))
    })
    this.setData({
      mainTeachingSubjectChecked,
      'setForm.mainTeachingSubject': e.detail.value
    })
  },
  /**
   * 主授课内容：兴趣类
   */
  changeMainTeachingInterest(e) {
    let mainTeachingInterestChecked = []
    filterData.teachingInterest.forEach((item) => {
      mainTeachingInterestChecked.push(e.detail.value.includes(item))
    })
    this.setData({
      mainTeachingInterestChecked,
      'setForm.mainTeachingInterest': e.detail.value
    })
  },
  /**
   * 授课模式
   */
  changeTeachingType(e) {
    let teachingTypeChecked = []
    filterData.teachingType.forEach((item) => {
      teachingTypeChecked.push(e.detail.value.includes(item))
    })
    this.setData({
      teachingTypeChecked,
      'setForm.teachingType': e.detail.value
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
  formSubmit(e){
    let {      
      teachingRange,
      mainTeachingRange,
      teachingSubject,
      teachingInterest,
      mainTeachingSubject,
      mainTeachingInterest,
      teachingType      
    } = this.data.setForm
    
    API.saveOrgManagementInfo({
      ...e.detail.value,
      teachingRange: teachingRange?teachingRange.join(','):null,
      mainTeachingRange: mainTeachingRange?mainTeachingRange.join(','):null,
      teachingSubject: teachingSubject?teachingSubject.join(','):null,
      teachingInterest: teachingInterest?teachingInterest.join(','):null,
      mainTeachingSubject: mainTeachingSubject?mainTeachingSubject.join(','):null,
      mainTeachingInterest: mainTeachingInterest?mainTeachingInterest.join(','):null,
      teachingType: teachingType?teachingType.join(','):null,
      orgId:this.data.orgId
    }).then((res)=>{
      this.setData({
        isEditing:false
      })
      this.getProjectInfor()
    })  
  }  
})