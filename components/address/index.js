// components/address/index.js
const API = require('../../utils/API.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow:{
      type:Boolean,
      value:false
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    province: [],
    year: '江苏省',
    city: [],
    month: '徐州市',
    area: [],
    day: 2,
    value: [0, 0, 0],
    selectVal:[0,0,0],
    address:[],
    sProvince:'',
    sCity:'',
    sArea:'',
    provinceCode:'',
    cityCode:'',
    cityCode:''
  },
  attached: function attached() {
    API.getProvinceLists().then((res) => {
      this.setData({
        province:res.data.data
      });
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindChange(e) {
      const provinceVal = e.detail.value[0]-1;
      const cityVal = e.detail.value[1]-1;
      const areaVal = e.detail.value[2]-1;
      let provinceCode = '';
      let cityCode = '';
      let areaCode = '';
      if (e.detail.value[0]>0){
        provinceCode=this.data.province[provinceVal].code;
        this.setData({
          provinceCode:provinceCode
        })
      }
      if (e.detail.value[0]===0){
        this.setData({
          city: [],
          area: []
        });
      }
      if (e.detail.value[1]===0){
        this.setData({
          area: []
        })
      }
      //触发市选择
      if (!provinceCode){
         return;
      }
      API.getCityLists(provinceCode).then((res) => {
        this.setData({
          city: res.data.data
        });
        if (e.detail.value[1] > 0) {
          cityCode = this.data.city[cityVal].code;
          this.setData({
            cityCode:cityCode
          })
          API.getAreaLists(cityCode).then((res) => {
            this.setData({
              area: res.data.data
            })
            console.log(e.detail.value);
            if(e.detail.value[2] > 0){
              areaCode = res.data.data[areaVal].code;
              this.setData({
                areaCode:areaCode
              })
            }
          });
        }
      });
    },
    cancer(){
      this.triggerEvent('cancer')
    },
    confirm(){
      console.log(this.data.sProvince,this.data.sCity,this.data.sArea);
      if(!this.data.provinceCode){
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '请选择省',
          success (res) {

          }
        })
        return;
      }
      if(!this.data.cityCode){
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '请选择城市',
          success (res) {
          
          }
        })
        return;
      }
      if(!this.data.areaCode){
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '请选择地区',
          success (res) {
           
          }
        })
        return;
      }
      let province,city,area;
      province = this.data.province.find((item)=>item.code === this.data.provinceCode).name;
      city = this.data.city.find((item)=>item.code === this.data.cityCode).name;
      area = this.data.area.find((item)=>item.code === this.data.areaCode).name;
      this.triggerEvent('confirm',{
        province:province,
        city:city,
        area:area
      })
      
      this.setData({
        provinceCode:'',
        cityCode:'',
        areaCode:''
      })
    },
  }
})
