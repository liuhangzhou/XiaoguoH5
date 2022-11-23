/*
 * @Author: 江辉 jianghui@yit.com
 * @Date: 2021-01-31 23:49:36
 * @LastEditors: 江辉 jianghui@yit.com
 * @LastEditTime: 2022-11-20 23:57:28
 * @FilePath: /XiaoguoH5/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Detail from '../views/detail'
import Order from '../views/order'
import MyOrder from '../views/my-order'
import Pay from '../views/pay'
import Login from '../views/login'
import Register from '../views/register'
import Payment from '../views/payment'
import MyOrderdetail from '../views/my-orderdetail'
import OrderStatus from '../views/orderStatus'
import SelectNum from '../views/selectNum'
import myCenter from '../views/my'
import profile from '../views/profile'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'selectnum',
    component: SelectNum
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/my',
    name: 'MyOrder',
    component: MyOrder
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay
  },
  {
    path: '*',
    name: 'default',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/orderdetail',
    name: 'MyOrderdetail',
    component:MyOrderdetail
  },
  {
    path: '/orderStatus',
    name: 'OrderStatus',
    component:OrderStatus
  },
  {
    path: '/myCenter',
    name: 'myCenter',
    component:myCenter
  },
  {
    path: '/profile',
    name: 'profile',
    component:profile
  },
]

const router = new VueRouter({
  routes
})

export default router
