// pages/address/address.js
const API = require('../../utils/API.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    hadSearched:false,
    resultList:[],
    cityList: [],
    hotIndex:-1,
    provinces: [{ name: '请选择', id: 0,code:'0' }],
    citys: [{ name: '请选择', id: 0, code: '0' }],
    areas: [{ name: '请选择', id: 0, code: '0' }],
    pIndex:0,
    cIndex:0,
    aIndex:0,
    pickValue:[0,0,0],
    sliding:false,
    message:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {        
    let hotCitys = wx.getStorageSync('hotCitys');    

    // 热门城市
    // [{ name: '', code: '', pid:},]
    if (hotCitys){
      this.setData({
        cityList: hotCitys
      })
    }else{
      let cityList = [{ name: '北京', code: '1101', pid: 1 }, { name: '上海', code: '3101', pid: 9 }, { name: '广州', code: '4401', pid: 19 }, { name: '深圳', code: '4403', pid: 19 }, { name: '杭州', code: '3301', pid: 11 }, { name: '成都', code: '5101', pid: 23 }, {
        name: '南京', code: '3201', pid: 10 }, { name: '长沙', code: '4301', pid:18}]

      this.setData({
        cityList: cityList
      })

      wx.setStorageSync('hotCitys', cityList)
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取省份
    let provincesStorage = wx.getStorageSync('provinces');
    if (!provincesStorage) {
      API.getProvinceLists().then(res => {
        let provinces = this.data.provinces.concat(res.data.data)
        this.setData({
          provinces: provinces
        })
        wx.setStorageSync('provinces', provinces)
      });
    } else {
      this.setData({
        provinces: provincesStorage
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
   * 搜索框输入 
   */
  searchWriting(event){
    let val = event.detail.value;
    val = val.replace(/^\s|\s$/,'')    
    this.setData({
      searchValue:val
    })
  },

  /** 
   * 根据关键词搜索
  */
  search(){
    if (!this.data.hadSearched && this.data.searchValue){      
      this.setData({
        hadSearched: true,
        resultList:[1,23]
      })

    }else if(this.data.hadSearched){      
      this.setData({
        hadSearched: false,
        searchValue:'',
        resultList:[]
      })
    }
  },

  /**
   * 选择热门城市
   */
  selectHotCity(e){
    if(this.data.sliding) return false;
    let data = e.currentTarget.dataset;
    
    API.getCityLists(this.data.provinces[data.id].code).then(res => {
      let i = 0, resp = res.data.data;
      
      for (i; i < resp.length;i++){
        if (resp[i].code == data.code){          
          break;
        }
      }
      
      this.setData({
        citys: [{ name: '请选择', id: 0, code: '0' }].concat(resp)
      });

      API.getAreaLists(data.code).then(res => {        
        this.setData({
          areas: [{ name: '请选择', id: 0, code: '0' }].concat(res.data.data),
          hotIndex: data.index,
          pickValue: [data.id, i + 1, 0],
          pIndex: data.id,
          cIndex: i + 1,
          aIndex: 0
        })
      });

    });  
  },

  /**
   * 选择城市
   */
  changeAddress(event){
    // getAreaLists getCityLists
    let arr = event.detail.value;
    for(let i=0,len=arr.length;i<len;i++){
      if (arr[i] != this.data.pickValue[i]){
        switch(i){
          case 0:
            API.getCityLists(this.data.provinces[arr[i]].code).then(res=>{
              this.setData({
                citys: [{ name: '请选择', id: 0, code: '0' }].concat(res.data.data),
                areas: [{ name: '请选择', id: 0, code: '0' }],
                pickValue: [arr[0],0,0],
                hotIndex:-1,
                pIndex: arr[0],
                cIndex:0,
                aIndex:0
              });
            })
            break;
          case 1:
            API.getAreaLists(this.data.citys[arr[i]].code).then(res => {
              this.setData({
                areas: [{ name: '请选择', id: 0, code: '0' }].concat(res.data.data),
                pickValue: [arr[0], arr[1], 0],
                hotIndex: -1,
                pIndex: arr[0],
                cIndex: arr[1],
                aIndex:0
              })
            });
            break;
          default:
            this.setData({
              pickValue: arr,
              hotIndex: -1,
              pIndex: arr[0],
              cIndex: arr[1],
              aIndex: arr[2],
            })
        }        
      }
    }
    
  },
  changStart(){
    this.setData({
      sliding:true
    });
  },
  changeEnd(event){
    this.setData({
      sliding: false
    });    
  },
  sureAddress(){
    if (this.data.pIndex == 0){
      this.setData({
        message:'请选择省份'
      })
      return false;
    } else if (this.data.pIndex < 32 && this.data.cIndex == 0){
      this.setData({
        message: '请选择城市'
      })
      return false;
    } else if (this.data.pIndex < 32 && this.data.aIndex == 0){
      this.setData({
        message: '请选择区县'
      })
      return false;
    }

    if (this.data.pIndex > 31){
      wx.setStorageSync('address', { city: [this.data.provinces[this.data.pIndex].name], detail: '' })
    }else{

      wx.setStorageSync('address', { city: [this.data.provinces[this.data.pIndex].name, this.data.citys[this.data.cIndex].name, this.data.areas[this.data.aIndex].name],detail:''})
    }

    wx.navigateBack()
  }
})