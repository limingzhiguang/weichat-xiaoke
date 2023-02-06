// pages/addContact/index.js
const API = require('../../utils/API.js');
var util = require('../../utils/util.js');
var reg = require('../../utils/reg.js');
const form = {
  province:'',//办公地址-省
  city:'',
  area:'',
  addressDetail:'',
  birthdayDate:'',
  calendarType:'',//生日类型：1-阳历；2-农历
  certificatesPic:'',//证件图片地址
  certificatesType:'1',//证件类型：1-身份证；2-护照；3-港澳通行证；4-户口本；5-军官证
  constellation:'',//星座
  deptNo:"",//所在部门
  education:'',//学历
  email:'',//主邮箱
  endDateTime:'',//结束时间
  externalName:'',//对外姓名
  familyStatus:'',//家庭状况
  graduateSchool:'',//毕业学校
  hobby:'',//爱好
  idCard:'',//证件号码
  isKeyPerson:2,//是否关键人：1-是；2-否；
  isMainContact:2,//是否主要联系人：1-是；2-否；
  jobName:'',//担任职务
  major:'',//专业
  maritalStatus:'',//婚姻状况：1-未婚；2-已婚；3-已育；4-离异；
  mobilePhone:'',//主联系电话
  nation:'',//民族
  nativePlace:'',//籍贯
  orgId:'',//机构编号
  orgQuanName:'',//机构全称
  orgUserId:'',//机构人员ID
  policyRelation:'',//决策关系：1-关键决策；2-意见影响；3-普通；
  presentAddress:'',//现居地
  remark:'',
  secondEmail:'',
  secondPhone:'',
  secondWeixin:'',
  serviceLife:'',//在此机构工作时间
  sex:'',//性别：1-男;2-女
  socialRelationsDetail:'',//社会关系详情
  socialRelationsResources:'',//社会关系资源
  startDateTime:'',//开始时间
  userName:'',//联系人姓名
  userNameEn:'',//机构人员英文名称
  weixinId:'',//主微信号
  workStatus:1,//在职状态：1-在职；2-离职
  workingLife:'',//工作年限
  zodiac:''//生肖
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{...form},
    checkboxList: [
      { name: '医院', value: 1, checked: false},
      { name: '法院/律所', value: 2, checked: false },
      { name: '房地产', value: 3, checked: false},
      { name: '资本/银行', value: 4, checked: false},
      { name: '媒体', value: 5, checked: false },
      { name: '公立校/教育局', value: 6, checked: false },
      { name: '政府', value: 7, checked: false },
      { name: '物流', value: 8, checked: false },
      { name: '出国业务', value: 9, checked: false },
      { name: '长江', value: 10, checked: false },
      { name: '其他', value: 11, checked: false },
      { name: '国外资源', value: 12, checked: false}
    ],
    policyRelationList: [
      {
        name:'关键决策',
        value:1
      },
      {
        name:'意见影响',
        value:2
      },
      {
        name:'普通',
        value:3
      }
  ],
  certificatesTypeList:[
    {
      name:'身份证',
      value:1
    },
    {
      name:'护照',
      value:2
    },
    {
      name:'港澳通行证',
      value:3
    },
    {
      name:'户口本',
      value:4
    },
    {
      name:'军官证',
      value:5
    }
  ],
  sexList:['男','女'],
  calendarTypeList:['阳历','农历'],
  marriageList:['未婚','已婚已育','已婚未育','离异','丧偶'],
  isTwoMobile:false,
  isTwoWeiXin:false,
  isTwoEmail:false,
  submitLoading:false,
  message: '',
  toptipsType: 'error',
  isShow:false,
  isFollowPage:'',
  viewType:null
  },
  selectOrg(){
    if (!this.data.isOrgDetail && !this.data.hasOrg){
      wx.navigateTo({
        url:'../selectOrg/index?pageType=2'
      })
    }  
  },
  switch1Change(e){
    this.setData({
      'form.isMainContact':e.detail.value?1:2
    })
  },
  //姓名
  uesrName(e){
    this.setData({
      'form.userName':e.detail.value
    })
  },
  mobilePhone(e){
    if(!reg.RegexConfig.mobile.test(e.detail.value)){
      this.setData({
        message:'输入正确的手机号',
        toptipsType: 'error'
      })
      this.setData({
        'form.mobilePhone':''
      })
      return;
    }
    this.setData({
      'form.mobilePhone':e.detail.value
    })
  },
  secondPhone(e){
    if(!reg.RegexConfig.mobile.test(e.detail.value)){
      this.setData({
        message:'输入正确的手机号',
        toptipsType: 'error'
      })
      this.setData({
        'form.secondPhone':''
      })
      return;
    }
    this.setData({
      'form.secondPhone':e.detail.value
    })
  },
  weixinId(e){
    this.setData({
      'form.weixinId':e.detail.value
    })
  },
  secondWeixin(e){
    this.setData({
      'form.secondWeixin':e.detail.value
    })
  },
  email(e){
    if(!reg.RegexConfig.email.test(e.detail.value)){
      this.setData({
        message:'输入正确的邮箱',
        toptipsType: 'error'
      })
      this.setData({
        'form.email':''
      })
      return;
    }
    this.setData({
      'form.email':e.detail.value
    })
  },
  secondEmail(e){
    if(!reg.RegexConfig.email.test(e.detail.value)){
      this.setData({
        message:'输入正确的邮箱',
        toptipsType: 'error'
      })
      this.setData({
        'form.secondEmail':''
      })
      return;
    }
    this.setData({
      'form.secondEmail':e.detail.value
    })
  },
  jobName(e){
    this.setData({
      'form.jobName':e.detail.value
    })
  },
  deptNo(e){
    this.setData({
      'form.deptNo':e.detail.value
    })
  },
  idCard(e){
    let type = this.data.form.certificatesType;
    if(type==1){
      if(!reg.RegexConfig.idcard.test(e.detail.value)){
        this.setData({
          message:'请输入正确的身份证号码',
          toptipsType: 'error'
        })
        this.setData({
          'form.idCard':''
        })
        return;
      }
    }else if(type==2){
      if(!reg.RegexConfig.passportcard.test(e.detail.value)){
        this.setData({
          message:'请输入正确的护照号码',
          toptipsType: 'error'
        })
        this.setData({
          'form.idCard':''
        })
        return;
      }
    }else if(type==3){
      if(!reg.RegexConfig.macaoHongKong.test(e.detail.value)){
        this.setData({
          message:'请输入正确的港澳通行证',
          toptipsType: 'error'
        })
        this.setData({
          'form.idCard':''
        })
        return;
      }
    }else if(type==4){
      if(!reg.RegexConfig.idcard.test(e.detail.value)){
        this.setData({
          message:'请输入正确的号码',
          toptipsType: 'error'
        })
        this.setData({
          'form.idCard':''
        })
        return;
      }
    }else if(type==5){
      if(!reg.RegexConfig.officersCertificate.test(e.detail.value)){
        this.setData({
          message:'请输入正确军官证',
          toptipsType: 'error'
        })
        this.setData({
          'form.idCard':''
        })
        return;
      }
    }
    this.setData({
      'form.idCard':e.detail.value
    })
  },
  externalName(e){
    this.setData({
      'form.externalName':e.detail.value
    })
  },
  graduateSchool(e){
    this.setData({
      'form.graduateSchool':e.detail.value
    })
  },
  major(e){
    this.setData({
      'form.major':e.detail.value
    })
  },
  workingLife(e){
    this.setData({
      'form.workingLife':e.detail.value
    })
  },
  serviceLife(e){
    this.setData({
      'form.serviceLife':e.detail.value
    })
  },
  addressDetail(e){
    this.setData({
      'form.addressDetail':e.detail.value
    })
  },
  //添加联系人
  addMobile(){
    this.setData({
      isTwoMobile:true
    })
  },
  // 移除次联系人
  deleteMobile(){
    this.setData({
      isTwoMobile:false,
      'form.secondPhone':''
    })
  },
  // 添加次微信
  addTwoWeiXin(){
    this.setData({
      isTwoWeiXin:true
    })
  },
  // 移除次微信
  deleteTwoWeiXin(){
    this.setData({
      isTwoWeiXin:false,
      'form.secondWeixin':''
    })
  },
  // 添加次邮箱 
  addTwoEmail(){
    this.setData({
      isTwoEmail:true
    })
  },
  // 移除次邮箱
  deleteTwoEmail(){
    this.setData({
      isTwoEmail:false,
      'form.secondEmail':''
    })
  },
  // 决策关系
  bindPickerChangePolicy(e){
    let index = Number(e.detail.value);
     this.setData({
      'form.policyRelation':index+1 + ''
     })
  },
  // 证件类型
  bindPickerChangeIdCard(e){
    let index = Number(e.detail.value);
    this.setData({
      'form.certificatesType':index+1
    })
  },
  selectIdCard(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      success: res=>{  
        let that = this;
        let tempFiles = res.tempFiles[0].path;
        wx.uploadFile({
          url: `${API.baseUrl}course/file/uploadInline.do`,
          filePath: tempFiles,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'tk': wx.getStorageSync('token')
          },
          formData: {},
          success(res2) {
            const data = JSON.parse(res2.data);
            
            if (data.code === '200') {
              that.setData({
                'form.certificatesPic':data.url
              })
              wx.showToast({
                title: '图片已添加',
                icon: 'success',
                duration: 2000
              })
            } else {
              //token过期去登录页
              
              switch (data.code||data.status) {
                case 401:
                  wx.setStorageSync('token', '');
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                  break;
              }
              //异常提示
              wx.showToast({
                title: "网络异常或服务暂时开小差",
                icon: 'none'
              });
            }
          },
          fail(e){
            console.log(e)
          }
        })           
      },
    })
  },
  // 性别
  sexChange(e){
    let index = Number(e.detail.value);
    this.setData({
      'form.sex':index+1
    })
  },
  // 生日类型
  calendarTypeChange(e){
    let index = Number(e.detail.value);
    this.setData({
      'form.calendarType':index+1
    })
  },
  //生日 
  bindPickerBirthdayDate(e){
    this.setData({
      'form.birthdayDate':e.detail.value,
      'form.constellation':util.toConstellation(e.detail.value),
      'form.zodiac':util.toTwelve(e.detail.value)
    })
  },
  // 民族
  minzu(e){
    this.setData({
      'form.nation':e.detail.value
    })
  },
  //籍贯
  jiguan(e){
    this.setData({
      'form.nativePlace':e.detail.value
    })
  },
  //婚姻状况 
  bindPickerChangeMarriage(e){
    let index = Number(e.detail.value)+1;
    this.setData({
      'form.maritalStatus':index
     })
  },
  //家庭状况 
  bindFamilyStatus(e){
    this.setData({
      'form.familyStatus':e.detail.value
     })
  },
  //爱好
  bindHobby(e){
    this.setData({
      'form.hobby': e.detail.value
     })
  },
  // 工作地址
  officeAddress(){
    this.setData({
      isShow:true
    })
   // this.getLocation();
  },
  // 省市区地区
  confirm(e){    
    let {province,city,area} = e.detail;
    this.setData({
      'form.province':province,
      'form.city':city,
      'form.area':area,
      isShow:false
    })
  }, 
  cancer(){
    this.setData({
      isShow:false
    })
  },
  selectDetailAddress(){
    wx.getSetting({
      success:(res)=>{
        if (res.authSetting['scope.userLocation']){
          this.chooseLocation()
        }else{
          wx.showModal({
            title:'获取地理位置授权请求',
            content:'需要获取您的地理位置,去授权?',
            success:(res)=>{
              if (res.confirm){
                wx.openSetting({
                  success: (resx) => {
                    if (resx.authSetting["scope.userLocation"] == true) {
                      this.getLocation()
                    }
                  }
                })
              }
            }
          })
        }
      }
    })    
  },
  getLocation() {
		wx.chooseLocation({
			success: (res1) => {
				let detail = `${res1.address}${res1.name}`;
				wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res1.latitude},${res1.longitude}&key=F2KBZ-4EPCR-NFOWH-WU2W7-GYQWE-Z5F2Z`,
					success: (res2) => {
            let {province,city,district,street,street_number} = res2.data.result.address_component;
            this.setData({
              'form.addressDetail':street+''+street_number
            })
					}
				})
			},
      fail:(err)=>{
        this.getAddress();
      }
		})
  },
  // 社会资源
  checkboxChange: function (e) {
    this.setData({
      'form.socialRelationsResources':e.detail.value.join(',')
    })
  },
  // 社会关系详情
  bindsocialRelationsDetail(e){
    this.setData({
      'form.socialRelationsDetail':e.detail.value
    })
  },
  // 备注
  bindRemark(e){
    this.setData({
      'form.remark':e.detail.value
    })
  },
  submit(){
    let that = this;
    let message;
    let currentPage = getCurrentPages()
    let len = 0
    
    if(!this.data.form.orgQuanName){
      message = '请选择机构名称';
      this.setData({
        message,
        toptipsType: 'error'
      })
      return;
    }
    // if(!this.data.form.isMainContact){
    //   message = '请选择主联系人';
    //   this.setData({
    //     message,
    //     toptipsType: 'error'
    //   })
    //   return;
    // }
    if(!this.data.form.userName){
      message = '请输入姓名';
      this.setData({
        message,
        toptipsType: 'error'
      })
      return;
    }
    if(!this.data.form.mobilePhone){
      message = '请输入联系电话';
      this.setData({
        message,
        toptipsType: 'error'
      })
      return;
    }
    if(!this.data.form.jobName){
      message = '请输入担任职务';
      this.setData({
        message,
        toptipsType: 'error'
      })
      return;
    }
    if(!this.data.form.deptNo){
      message = '请输入所在部门';
      this.setData({
        message,
        toptipsType: 'error'
      })
      return;
    }
    if(!this.data.form.policyRelation&&this.data.viewType===2){
      message = '请选择决策关系';
      this.setData({
        message,
        toptipsType: 'error'
      })
      return;
    }
    this.setData({
      submitLoading:true
    })

    try{
      if(this.data.isFollowPage){
        this.data.form.orgUserId = '';
      }
      API.saveOrgUserInfo(util.removeEmptyString(this.data.form)).then(()=>{
        if(that.data.conInfo){
          that.clearData();
          wx.redirectTo({
            url:'../contactsList/index'
          })
        }else{
          if (that.data.isOrgDetail){   
            currentPage.forEach((item,idx)=>{
              if(item.route === 'pages/detail/detail'){
                len = idx
              }
            })
            that.clearData()
            wx.navigateBack({
              delta:currentPage.length - len-1
            })
          }else{  
            that.clearData();
            wx.redirectTo({
              url:'../contactsList/index'
            })
          } 
        }
        
        this.setData({
          submitLoading:false
        })
      })
    }catch(e){
      this.setData({
        submitLoading:false
      })
    }
  },
  clearData(){
    this.data.checkboxList.forEach((cur)=>{
      cur.checked = false
   })
    this.setData({
      form:form,
      isTwoMobile:false,
      isTwoWeiXin:false,
      isTwoEmail:false,
      submitLoading:false,
      checkboxList:this.data.checkboxList
    })
    
    wx.setStorageSync('followOrgInfo', {})
    wx.setStorageSync('addContact', form)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var followOrgInfo = wx.getStorageSync('followOrgInfo')||{};
    var addContact = wx.getStorageSync('addContact')||{};
    //console.log(addContact,'addContact');
    if(addContact.socialRelationsResources){
      addContact.socialRelationsResources.split(',').forEach(((item)=>{
         this.data.checkboxList.forEach((cur)=>{
            if(item === cur.name){
               cur.checked = true
            }
         })
      }))
    }
    
    addContact.orgQuanName = options.orgName ||followOrgInfo.orgJianName||followOrgInfo.brandName;
    addContact.orgId = options.orgId || followOrgInfo.orgId;
    addContact.workStatus = 1;
    //console.log(options,'options');
    let viewType = wx.getStorageSync('viewType');
    viewType = Number(viewType);
    
    this.setData({
      form:addContact,
      checkboxList:this.data.checkboxList,
      isOrgDetail: options.isOrgDetail,
      hasOrg:options.hasOrg,
      conInfo:options.conInfo,
      isFollowPage:options.isFollowPage,
      viewType: +options.orgType || viewType
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
    let followOrgInfo = wx.getStorageSync('followOrgInfo')||{};
    let {orgJianName,brandName,orgId} = followOrgInfo;
    let isContactOrgBack = wx.getStorageSync('isContactOrgBack');
    if(isContactOrgBack){
      this.setData({
        'form.orgQuanName':orgJianName||brandName,
        'form.orgId':orgId
      })
      console.log('触发显示');
    } 

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //wx.setStorageSync('addContact', this.data.form)  // isContactOrgBack 
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('销毁1111');
    this.data.form.isFollowPage = '';
    wx.setStorageSync('addContact', this.data.form);
    wx.setStorageSync('isContactOrgBack', false)
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

  }
})