/*
 * @Author: 江辉 jianghui@yit.com
 * @Date: 2021-01-28 14:11:14
 * @LastEditors: 江辉 jianghui@yit.com
 * @LastEditTime: 2022-11-20 23:46:22
 * @FilePath: /XiaoguoH5/src/net/api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const api = {
  queryProductionList: 'category/product/list', // 商品列表
  queryProductionDetail: 'category/product/detail', // 商品详情
  queryLogin: 'login/h5',//  登录
  queryRegister: 'register/h5',//  注册
  querySendValidateCode: 'sendValidateCode', // 验证码
  querySubmit: 'cart/submit',//  确认下单
  queryOrderList: 'member/order/orderList',//  待付款订单列表
  queryConfirm: 'cart/confirm',//  支付结账页
  queryPay: 'cart/pay',//  支付结账页
  queryStatus: 'member/order/status',//  支付结果查询 
  queryCenter: 'member/center', // 个人中心
}

export default api
