// pages/writeFollow/index.js
const API = require('../../utils/API.js');
var util = require('../../utils/util.js');
const recorderManager = wx.getRecorderManager();
var playTimeInterval;
var recordTimeInterval;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioDialog:false,
    switch1Checked:false,
    textareaValueIndex:0,
    //保存项
    orgId:'',
    orgName:'',
    orgPerson:'',
    followForm:'',
    followType:'',
    textareaValue:'',
    fileList:[],
    //视频地址
    videoPath:'',
    //播放录音的地址
    playRecordUrl:'',
    selectLabelIds:[],
    nextRemind:false,
    nextFollowTime:'',
    informPerson:'',
    //保存项end
    //机构页面对象
    followOrgInfo:{},
    // 1-11
    followFormList:['客户关怀','课件发送','课程邀约','客诉处理','常规咨询','业务开发','业务跟进','团队培训','常规服务','落地辅导','其他'],
    //跟进方式 1-7  其它99
    followTypeIndex:'',
    followTypeList:['电话','微信','上门拜访','公司参访','学君校参访','邮件','会议','其他'],
    filterFollowTypeList:[1,2,3,4,5,6,7,99],
    timer:'00:00:00',
    palyTimer:'00:00:00',
    //开始录音
    startRecording: false,
    // 录音中
    recording: false,
    //播放录音
    playing: false, 
    // 有录音记录 no-use
    hasRecord: false,
    // 暂停录音 no-use
    pauseRecording:false,
    //停止录音
    stopRecording:false,
    recordTime: 0,
    playTime: 0,
    currentRecordIndex:null,
    listItemRecordStatus:false,
    //标签部分
    labelList:[],
    labelIndex:null,
    labelDialog:false,
    selectLabelName:[],
    //单选标签
    singelLabelIndex:null,
    //提醒人员 
    remindUserList:[],
    remindUserIndex:null,
    submitLoading:false,
    // 之前的未提交记录
    isPrevious:false,
    isFollowPage:false
  },
  switch1Change(e){
     this.setData({
      nextRemind:e.detail.value
     })
  },

  // 获取机构名称
  getOrgName(e){

    if (this.data.isOrgDetail){
      return 
    }else{
      wx.navigateTo({
        url:'../selectOrg/index'
      })
    }  
    console.log(e);
  },

  // 获取对象
  getOrgPerson(){
    var that = this;
    if(!this.data.orgId){
      wx.showToast({
        title: '请先选择机构',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    wx.showActionSheet({
      itemList: ['机构', '联系人'],
      success (res) {
        if(res.tapIndex===0){
          that.setData({
            orgPerson:'机构'
           })
        }else if(res.tapIndex===1){
          if(that.data.isOrgDetail){
            wx.navigateTo({
              url:'../selectOrgPerson/index?isOrgDetail=1&orgId='+that.data.orgId
            })
          }else{
            wx.navigateTo({
              url:'../selectOrgPerson/index?orgId='+that.data.orgId
            })
          }            
        }
       // console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
    
  },

  // 跟进形式
  bindPickerSelectForm(e){
    this.setData({
      followForm:Number(e.detail.value)+1
    })
    //console.log(e,'eee')
  },

  // 跟进方式
  bindPickerSelectType(e){
    var index = Number(e.detail.value)
    this.setData({
      followType:this.data.filterFollowTypeList[index],
      followTypeIndex:index
    })
  },

  //上传附件
  uploadFile(){
    this.setData({
      fileList:[]
    })
    var uploadImagesList = [];
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      success: res=>{  
       // console.log(res, res.tempFiles[0]);
        let that = this;
        let tempFiles = res.tempFiles;
        let numberList =[];
        if(res.tempFiles.length>8){
          wx.showToast({
            title: '最多8张',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        wx.showLoading({ title: '图片上传中...' });
        for (let n = 0; n < res.tempFiles.length;n++){
          wx.uploadFile({
            url: `${API.baseUrl}course/file/uploadInline.do`,
            filePath: tempFiles[n].path,
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'Tk': wx.getStorageSync('token'),
              'tk': wx.getStorageSync('token')
            },
            formData: {},
            success(res2) {
              const data = JSON.parse(res2.data);
              if (data.code === '200') {
                uploadImagesList.push(data.url);
                numberList.push(n);
                if (tempFiles.length === numberList.length){
                  // that.saveImage();
                  // that.findOrgShopPic();
                  that.setData({
                    fileList:uploadImagesList
                  })
                  wx.showToast({
                    title: '图片已添加',
                    icon: 'success',
                    duration: 2000
                  })
                  wx.hideLoading();
                }
              } else {
                //token过期去登录页
                switch (data.code) {
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
                wx.hideLoading();
              }
            }
          }) 
        }             
      },
    })
  },
  
  //视频
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['camera', 'album'],
      camera: ['front', 'back'],
      maxDuration: 60,
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })

        //上传视频
        const {tempFilePath} = res;
        let token = wx.getStorageSync('token');
        wx.showLoading({ title: '视频上传中...' });
        wx.uploadFile({ 
          url: `${API.baseUrl}course/file/uploadInline.do`,
          filePath: tempFilePath,
          name:"file",
          header: {
            "Content-Type": "multipart/form-data",
            'tk': token
          },
          formData:{},
          success:function(ress){
            const data = JSON.parse(ress.data);
            //console.log(data.url,'ress.data.data')
            that.setData({
              videoPath:data.url
            });
            wx.hideLoading();
            wx.showToast({
              title: '视频已添加',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function(ress){
            wx.hideLoading();
            console.log("。。视频保存失败。。");
          }
        })
      }
    })
  },

  // 音频弹窗
  toRecording(){
    this.setData({
      audioDialog:true
    })
  },
  
  // 开始录音
  startRecord(){
    var that = this
    this.setData({
      recordTime:0
    })
    recordTimeInterval = setInterval(function () {
      var recordTime = that.data.recordTime += 1;
      if(recordTime>599990){
        that.stopRecord();    
      }
      that.setData({
        timer: util.formatTime(that.data.recordTime),
        playTime: recordTime
      })
    }, 1000);

    this.setData({
      startRecording:true,
      recording:true,
      playing:false,
      stopRecording:false
    });

    const options = {
      duration: 600000, 
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'mp3',
      frameSize: 50, 
    }
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('。。。开始录音。。。')
    });
    recorderManager.onError((res) => {
      console.log(res);
    })
  },

  // 停止录音
  stopRecord(){
    let that = this;
    clearInterval(recordTimeInterval);
    this.setData({
      startRecording:true,
      recording:false,
      playing:true,
      stopRecording:true
    });
    recorderManager.stop();
    recorderManager.onStop((res) => {
      console.log('。。停止录音。。')
      const {tempFilePath} = res;
      var token = wx.getStorageSync('token');
      console.log(token,'token',tempFilePath);

      //上传录音
      wx.uploadFile({ 
        url: `${API.baseUrl}course/file/uploadInline.do`,
        filePath: tempFilePath,
        name:"file",
        header: {
          "Content-Type": "multipart/form-data",
          'tk': token //'VlZqenljZElvV2J0MVhPTENHVHcvcWJGd2J3dDFWdTJVUEhzdU9BMDRlYz0='
        },
        formData:{},
        success:function(ress){
          const data = JSON.parse(ress.data);
          console.log(data.url,'ress.data.data')
          that.setData({
            playRecordUrl:data.url
          });
          wx.showToast({
            title: '音频已添加',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function(ress){
          console.log("。。录音保存失败。。");
        }
      })
    })
  },

  // 播放录音
  palyRecording(){
    wx.playBackgroundAudio({
      dataUrl: this.data.playRecordUrl
    })
  },

  // 取消录音
  cancerRecord(){
    this.setData({
      startRecording:false,
      recording:false,
      playing:false,
      stopRecording:false,
      playRecordUrl:'',
      timer:'00:00:00',
      palyTimer:'00:00:00',
    });
    recorderManager.stop();
    recorderManager.onStop((res) => {});
    clearInterval(recordTimeInterval);
  },

 // 关闭音频弹窗
  closeAudioDialog(){
    if(this.data.recording){
      this.cancerRecord()
    }
    this.setData({
      audioDialog:false
    })
},
  // 保存录音
  saveRecord(){
    this.setData({
      startRecording:false,
      recording:false,
      playing:false,
      stopRecording:false,
      timer:'00:00:00',
      palyTimer:'00:00:00',
      audioDialog:false
    })
    recorderManager.stop();
    recorderManager.onStop((res) => {});
    clearInterval(recordTimeInterval);
  },

  // 跟进内容
  bindTextAreaBlur(e){
    this.setData({
      textareaValueIndex:String(e.detail.value).length,
      textareaValue:e.detail.value
    })
  },

  // 选择标签
  selectLabel(e){
    this.setData({
      labelDialog:true
    })
  },

  // 选择标签信息
  selectCurrentLabel(e){
    var index = Number(e.currentTarget.dataset.labelIndex);
    this.data.labelList[index].status = !this.data.labelList[index].status
    this.setData({
      labelIndex:index,
      labelList:this.data.labelList
    })
  },

  // 关闭标签弹窗
  closeLabelDialog(){
    this.setData({
      labelDialog:false
    })
  },

  // 标签弹窗确认
  confirm(){
    var selectIdList = [];
    var selectLabelName = [];
    this.data.labelList.forEach((item)=>{
      if(item.status){
      selectIdList.push(item.labelId);
      selectLabelName.push(item.labelName);
      }
    });
    this.setData({
    selectLabelIds:selectIdList,
    labelDialog:false,
    selectLabelName:selectLabelName
    });
  },

  // 获取业绩预测标签列表
  async findPerformanceForecastLabelGroup(){
    try{
      const res = await API.findPerformanceForecastLabelGroup();
      let resData = res.data.data||[];
        resData.forEach((item)=>{
          item.status = false
        });
        this.setData({
        labelList:resData
        })  
    }catch(e){
       console.log(e)
    }
  },
  //单选标签
  bindPickerSelectLabel(e){
    this.setData({
      singelLabelIndex:Number(e.detail.value)
    })
    // console.log(e)  
  },
  // 下次跟进时间
  bindDateNextFollowTime(e){
    this.setData({
      nextFollowTime: e.detail.value
    })
  },
  //查询@人员 
  async findFollowUpRemindUser(){
    try{
      const res = await API.findFollowUpRemindUser(this.data.orgId);
      let resData = res.data.data||[];
      resData.forEach((item)=>{
        item.userNameEnCn = item.userNameEn+''+item.userNameCn
      })
      //userNameEnCn
      this.setData({
        remindUserList:resData
      })    
    }catch(e){

    }
  },
  bindPickerRemindUserList(e){
   this.setData({
    remindUserIndex:Number(e.detail.value)
   })
  },
  getRemindUserList(){
    if(!this.data.orgId){
      // wx.showToast({
      //   title: '请先选择机构!',
      //   icon: 'success',
      //   duration: 2000
      // })
      return;
    }
    this.findFollowUpRemindUser()
  },
  // 表单提交
  async formSubmit(e) {
    var that = this;
    this.setData({
      submitLoading:true
    })
    try{
      let fileObject = {};
      fileObject.annexPic2 = this.data.videoPath;
      this.data.fileList.forEach((item,index)=>{
        fileObject['annexPic'+(index+3)] = item;
      })
      // 单个标签 this.data.singelLabelIndex===null?'':this.data.labelList[this.data.singelLabelIndex].labelId,
      await API.addInsertFollowUpLog({
        orgId:this.data.orgId,
        target:this.data.orgPerson,
        form:this.data.followForm,
        type:this.data.followType,
        content:this.data.textareaValue,
        crmOrgFollowUpLogAnnexPicVo:fileObject,
        annexPic:this.data.playRecordUrl,
        labelId:this.data.selectLabelIds.join(','),
        remindTime:this.data.nextFollowTime,
        remindUserId:this.data.remindUserIndex===null?'':this.data.remindUserList[this.data.remindUserIndex].remindUserId
      });
      this.setData({
        submitLoading:false
      })
      if(that.data.isConInfo){
        that.formReset();
        wx.redirectTo({
          url:'../followUpRecord/index'
        })
      }else{
        if (that.data.isOrgDetail){
          wx.redirectTo({
            url: '/pages/detail/detail?orgId=' + that.data.orgId,
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '保存成功！，是否继续录入？',
            cancelText:'去跟进页',
            success (res) {
              if (res.confirm) {
                that.formReset()
              } else if (res.cancel) {
                that.formReset();
                wx.redirectTo({
                  url:'../followUpRecord/index'
                })
              }
            }
          })
        } 
      }
       
    }catch(e){      
      this.setData({
        submitLoading:false
      })
    }
  },
  formReset() {
   this.setData({
    orgName:'',
    orgPerson:'',
    followForm:'',
    followType:null,
    textareaValue:'',
    fileList:[],
    playRecordUrl:'',
    videoPath:'',
    selectLabelIds:[],
    selectLabelName:[],
    nextRemind:false,
    nextFollowTime:'',
    informPerson:'',
    followOrgInfo:{},
    singelLabelIndex:null,
    remindUserIndex:null,

    startRecording:false,
    recording:false,
    playing:false,
    stopRecording:false,
    timer:'00:00:00',
    palyTimer:'00:00:00',
    audioDialog:false
   })
   wx.setStorageSync('followOrgInfo', {});
   wx.setStorageSync('orgPerson', '');
   wx.setStorageSync('writeFollow', {});
  },
  
  // 之前的未提交记录
  addNewRecord(){
    this.formReset();
    this.setData({
      isPrevious:false
    })
  },
  continueEdit(){
    this.setData({
      isPrevious:false
    })
  },
  reductionData(){
    let storeData = wx.getStorageSync('writeFollow');
    let {
      orgName,
      orgPerson,
      followForm,
      followType,
      textareaValue,
      fileList,
      playRecordUrl,
      selectLabelIds,
      nextRemind,
      nextFollowTime,
      informPerson,
      followOrgInfo,
      singelLabelIndex,
      remindUserIndex
     } = storeData;
     let isNeedGetStoreData = orgName||orgPerson||followForm||
                             followType||textareaValue||fileList&&fileList.length||
                             playRecordUrl||selectLabelIds&&selectLabelIds.length||nextRemind||
                             nextFollowTime||informPerson;              
     if(isNeedGetStoreData){
      this.setData({
        isPrevious:true
      })
      let data = wx.getStorageSync('writeFollow');
      console.log('复原数据')
      this.setData(data)
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.isFollowPage,'options.isFollowPage')
    if(options.isFollowPage){
       this.setData({
        isFollowPage:true
       })
       this.reductionData();
    }else{
    var followOrgInfo = wx.getStorageSync('followOrgInfo')||{};
    var orgPerson = wx.getStorageSync('orgPerson')    
    
    if(followOrgInfo.orgId){
      this.setData({
        orgName: followOrgInfo.orgName,
        orgId: followOrgInfo.orgId,
        orgPerson:orgPerson,
        isOrgDetail:followOrgInfo.isOrgDetail,
        isConInfo:options.isConInfo        
      })
    }else if(options.orgId){
     // console.log(options,'options')
      this.setData({
        orgName: options.orgName,
        orgId: options.orgId,
        orgPerson:orgPerson,
        isOrgDetail: options.isOrgDetail,
        isConInfo:options.isConInfo       
      })
    }
    }
  },

  /**+
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.findPerformanceForecastLabelGroup();
    if(this.data.orgId){
      this.findFollowUpRemindUser()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var followOrgInfo = wx.getStorageSync('followOrgInfo')||{};
    var orgPerson = wx.getStorageSync('orgPerson')    
    let isOrgBack = wx.getStorageSync('isOrgBack');
    let isPersonBack = wx.getStorageSync('isPersonBack');
    if(isOrgBack){
      this.setData({
        orgName: followOrgInfo.orgJianName|| followOrgInfo.brandName,
        orgId: followOrgInfo.orgId,
        orgPerson:''    
      })
    }
    if(isPersonBack){
      this.setData({
        orgPerson:orgPerson
      })  
    }
    // if(!this.data.orgId){
    //   this.setData({
    //     orgName: followOrgInfo.orgJianName|| followOrgInfo.brandName,
    //     orgId: followOrgInfo.orgId     
    //   })
    // }
    console.log('显示')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(this.data.isFollowPage,'触发隐藏')
    if(this.data.isFollowPage){
      wx.setStorageSync('writeFollow', this.data);
    }
    wx.setStorageSync('isOrgBack', false);
    wx.setStorageSync('isPersonBack', false)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('触发销毁');
    console.log(this.data.isFollowPage,'触发销毁')
    if(this.data.isFollowPage){
      wx.setStorageSync('writeFollow', this.data);
    }
    wx.setStorageSync('isOrgBack', false);
    wx.setStorageSync('isPersonBack', false)
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