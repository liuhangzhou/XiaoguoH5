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
  
  
]

const router = new VueRouter({
  routes
})

export default router
