/*
 * @Author: 江辉 jianghui@yit.com
 * @Date: 2022-11-26 20:16:22
 * @LastEditors: 江辉 jianghui@yit.com
 * @LastEditTime: 2022-11-30 01:29:08
 * @FilePath: /take-out/src/utils/util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// ios和安卓时间处理
function formatIOSTime(date){
  // 该方法只负责处理兼容问题：当使用new Date('xx')或者Date.parse时,
  // 注意ios时间格式为 xx-xx-xx xx:xx:xx，需要处理为 xx/xx/xx xx:xx:xx
  return typeof(date) === 'string' && date.replace(/\-/ig,'/');
}

function formatDate(dateString, fmt) {
  let date = new Date(formatIOSTime(dateString));
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr((String(o[k])).length)));
    }
  }
  return fmt;
}

// 格式化金额  formatMoney(123456,2) = 123,456.00
// 参数说明：number：要格式化的数字 decimals：保留几位小数
function formatMoney(number, decimals) {
  number = (String(number)).replace(/[^0-9+-Ee.]/g, '');
  let dec_point = '.'; // 小数点符号
  let thousands_sep = ','; // 千分位符号
  let n = !isFinite(Number(number)) ? 0 : Number(number);
  let prec = !isFinite(Number(decimals)) ? 0 : Math.abs(decimals);
  let sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
  let dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
  let s = '';
  let toFixedFix = function (n, prec) {
    let k = Math.pow(10, prec);
    return String(Math.ceil(n * k) / k);
  };

  s = (prec ? toFixedFix(n, prec) : String(Math.round(n))).split('.');
  let re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2');
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};

module.exports = {
  formatDate,
  formatMoney
}
