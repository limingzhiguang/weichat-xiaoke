const formatTimeDate = (date,type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  // [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-')
}
const formatTimeDateTime = (d,type) => {
  if(!d){
    return '';
  }
  let date = new Date(d);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if(type===1){
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
  }else{
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatMoney = function(value){
  if(!value){
    value = 0;
  }
  value = String(value);
  let moneyArr = value.toString().split(".");
  let _moneyArr = [];
  let _mArr = moneyArr[0].split("").reverse();
  for (let i = 0; i < _mArr.length; i++) {
    if (i > 0 && i % 3 == 0) {
      _moneyArr.push(",");
    }
    _moneyArr.push(_mArr[i]);
  }
  let _money = _moneyArr.reverse().join("");
  // 返回数据带小数
  if (moneyArr.length > 1) {
    _money += "." + moneyArr[1].substring(0,2);
  }
  // 返回数据不带小数，补两位
  if(moneyArr.length===1){
    _money += ".00";
  }
  return "￥" + _money;
};

// module.exports = {
//   formatTime: formatTime,
//   formatMoney: formatMoney
// };
function timeago(dateTimeStamp){
 // console.log(dateTimeStamp);
  if(!dateTimeStamp){
      return '--';
  }
  //把分，时，天，周，半个月，一个月用毫秒表示
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let week = day * 7;
  let halfamonth = day * 15;
  let month = day * 30;
  let result = '';
  let now = new Date().getTime();
 // console.log(now)
  let diffValue = now - new Date(dateTimeStamp).getTime();//时间差
  if(diffValue < 0){
      return;
  }
  //计算时间差的分，时，天，周，月
  let minC = diffValue/minute;
  let hourC = diffValue/hour;
  let dayC = diffValue/day;
  let weekC = diffValue/week;
  let monthC = diffValue/month;
  if(monthC >= 1 && monthC <= 3){
      result = " " + parseInt(monthC) + "月前"
  }else if(weekC >= 1 && weekC <= 3){
      result = " " + parseInt(weekC) + "周前"
  }else if(dayC >= 1 && dayC <= 6){
      result = " " + parseInt(dayC) + "天前"
  }else if(hourC >= 1 && hourC <= 23){
      result = " " + parseInt(hourC) + "小时前"
  }else if(minC >= 1 && minC <= 59){
      result =" " + parseInt(minC) + "分钟前"
  }else if(diffValue >= 0 && diffValue <= minute){
      result = "刚刚"
  }else {
      result =`${new Date(dateTimeStamp).getFullYear()}-${new Date(dateTimeStamp).getMonth()+1}-${new Date(dateTimeStamp).getDate()}`;
  }
  return result;
}
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}
//今日1 昨日2 本周3 本月4  {number} num
function startDateEndDate(number){
  if(number===''||number===null||number===undefined){
      return; 
  }
  let num = Number(number);
    var startTime = '';
    var endTime = '';
    var end = new Date();
    var start = new Date();
    switch(num){
      case 1:
        startTime = formatTimeDate(new Date());
        endTime =  formatTimeDate(new Date());
      break;
      case 2:
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        end.setTime(end.getTime() - 3600 * 1000 * 24);
        startTime = formatTimeDate(new Date(start));
        endTime =  formatTimeDate(new Date(end));
      break;
      case 3:
        var day3 = new Date().getDay()-1;
        start.setTime(start.getTime() - 3600 * 1000 * 24 * day3);
        startTime = formatTimeDate(new Date(start));
        endTime =  formatTimeDate(new Date(end));
      break;
      case 4:
        var year = new Date().getFullYear();
        var month =  new Date().getMonth()+1;
        start = new Date(year,month-1,1);
        startTime = formatTimeDate(new Date(start));
        endTime =  formatTimeDate(new Date(end));
      break;
    }
    return [startTime,endTime]
}

// 本周1 下周2 本月3 下月4  {number} num
function weekMonthStartTimeEndTime(num){
  var startTime = '';
  var endTime = '';
  var end = new Date();
  var start = new Date();
  //年
  let year = new Date().getFullYear(); 
  // 月
  let month = new Date().getMonth()+1;
  // 星期几
  let day = new Date().getDay();
 
  switch(num){
    case 1:
      var day3 = new Date().getDay()-1;
      start.setTime(start.getTime() - 3600 * 1000 * 24 * day3);
      end.setTime(start.getTime() + 3600 * 1000 * 24*(9-day));
      startTime = formatTimeDate(new Date(start));
      endTime =  formatTimeDate(new Date(end));
    break;
    case 2:
      start.setTime(start.getTime() + 3600 * 1000 * 24*(8-day));
      end.setTime(end.getTime() + 3600 * 1000 * 24 *(7-day+7));
      startTime = formatTimeDate(new Date(start));
      endTime =  formatTimeDate(new Date(end));
    break;
    case 3:
      startTime = formatTimeDate(new Date(year,month-1,1));
      endTime = formatTimeDate(new Date(year,month,0));
    break;
    case 4:
      if(month===12){
        startTime = formatTimeDate(new Date(year+1,0,1));
        endTime = formatTimeDate(new Date(year+1,0,31));
      }else{
        startTime = formatTimeDate(new Date(year,month,1));
        endTime = formatTimeDate(new Date(year,month+1,0));
      }
    break;
  }
  return [startTime,endTime]
}
//筛选跟进记录图标  type 1图片，2视频，3文本，4音频，5 word,6 excel,7 ppt ,8 pdf
function filterFileType(url){
  if (/\.(jpg|jpeg|png|gif|bmp|webp|tif|exif|svg)/i.test(url)) {
      return {icon:'iconzhaopian',name:'图片附件',type:1};
  }else if (/\.(mp4|avi|rm|rmvb|mov|mtv|dat|[adw]mv|3gp|flv)/i.test(url)) {
      return {icon:'iconshipin',name:'视频附件',type:2};
  }else if (/\.(txt)/i.test(url)) {
      return {icon:'iconxingzhuang3',name:'文本附件',type:3};
  }else if (/\.(mp3|aac|wav|m4a)/i.test(url)) {
      return {icon:'iconluyin',name:'音频附件',type:4};
  }else if (/\.do(c[mx]?|tm|tx)/i.test(url)) {
      return {icon:'iconxingzhuang3',name:'word附件',type:5};
  }else if (/\.xls[mxsb]?/i.test(url)) {
    return {icon:'iconxingzhuang3',name:'excel附件',type:6};
  }else if(/\.pp([ts][x]?|[ast]m)/.test(url)){
    return {icon:'iconxingzhuang3',name:'ppt附件',type:7};
}else if (/\.(pdf)/i.test(url)) {
  return {icon:'iconxingzhuang3',name:'pdf附件',type:8};
  }else{
      return {}
  }
}
const toConstellation = (date) =>{
	let oDate = new Date(date);
	let month = oDate.getMonth();
	let day = oDate.getDate();
	//星座定义
	const constellations = [
	    {"Start":121,"End":220,"Name":"水平座"}, 
		{"Start":221,"End":320,"Name":"双鱼座"},
	    {"Start":321,"End":420,"Name":"白羊座"},  
		{"Start":421,"End":520,"Name":"金牛座"},
	    {"Start":521,"End":620,"Name":"双子座"},   
		{"Start":621,"End":720,"Name":"巨蟹座"},
	    {"Start":721,"End":820,"Name":"狮子座"},   
		{"Start":821,"End":920,"Name":"处女座"},
	    {"Start":921,"End":1020,"Name":"天秤座"},    
		{"Start":1021,"End":1120,"Name":"天蝎座"},    
	    {"Start":1121,"End":1220,"Name":"射手座"}
	];
	
	let pos = month * 100 + day;
	
	for(let i in constellations){
		if(pos >= constellations[i].Start && pos <= constellations[i].End)
		{
			return constellations[i].Name;
		}
	}
}
const toTwelve = (date) =>{
	let animals = ["子鼠","丑牛","寅虎","卯兔","辰龙","巳蛇","午马","未羊","申猴","酉鸡","戌狗","亥猪"];
	let year = new Date(date).getFullYear();
	
	return animals[(year - 1900)%12]
}
/**
 * 传入对象
 * @params {object} 
 * 遍历对象属性，将空字符串修改为null
 * @return {object}
 */
const removeEmptyString = (obj) =>{
  if(!obj) return {}
  for(let item in obj){
    if(obj[item] === ''){
      obj[item] = null
    }
  }
  return obj
}

module.exports = {
  formatTimeDate:formatTimeDate,
  formatTime: formatTime,
  timeago:timeago,
  startDateEndDate:startDateEndDate,
  formatMoney:formatMoney,
  formatTimeDateTime:formatTimeDateTime,
  filterFileType:filterFileType,
  weekMonthStartTimeEndTime:weekMonthStartTimeEndTime,
  toConstellation:toConstellation,
  toTwelve:toTwelve,
  removeEmptyString
};