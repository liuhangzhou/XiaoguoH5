<template>
<!-- 待支付订单 -->
<div class="order-wrapper" v-if="orderList.length">
  <div class="header" v-show="showMask">
    {{$t('home.xdcg')}}
    <p>{{$t('home.qdd')}}</p>
  </div>
  <div class="title-bar" v-show="!showMask" @click="goback">
    <img src="../assets/img/ic_right-black.png" alt=""> {{$t('home.wodedingdan')}}
  </div>
    <div class="warper" v-for="item in orderList" :key="item.tradeId">
    <!-- <div class="details-box "> -->
      <div class="details-zh flexBetween padding10 navBg">
        <span >{{$t('home.xdsj')}}：<i class="colorRgb">{{item.tradeTime}}</i></span>
        <span class="colorRgb">{{$t('$')}}{{item.totalAmount}}</span>
      </div>
      <ul class="details-item padding10">
        <li class="flex" v-for="(product,index) in item.productList" :key="index">
          <div class="flex">
            <div class="details-goods-img">
              <img :src="product.img" alt="">
            </div>
            <div class="details-text">
              <div class="details-text-p1">{{product.productName}}</div>
              <div class="details-text-p2" v-if="product.attribute.length ===0">
                {{product.remark}}
              </div>
              <div class="details-text-p2" v-else>
                <span v-for="attr in product.attribute" :key="attr.id">
                    <span v-for="(attrs,index) in attr.optionList" :key="index">
                      <span v-if="attrs">{{attrs.optionName}};</span>
                    </span>  
                </span> 
              </div>
              <div class="details-text-p2">x <span>{{product.count}}</span></div>
            </div>
          </div>
          <div>
            <div class="details-monery">{{$t('$')}}{{(product.price * product.count).toFixed(2)}}</div>
            
          </div>
        </li>
      </ul>
      <!-- <div class="details-youhui flex flex-sc flex-vc">
        <div class="details-youhui-text flex flex-vc"><i></i>满减优惠</div>
        <div class="details-youhui-monery">$ -5.00</div>
      </div>
      <div class="total flex flex-sc flex-vc">
        <div class="total-text">合计</div>
        <div class="total-monery">$ 213.40</div>
      </div> -->
    <!-- </div> -->
  </div>
  <!-- <div class="mask" v-if="showMask && showXiaDan">
      <div class="dailog">
        <div class="dailog-tit">{{$t('home.xdcg')}}</div>
        <div class="dailog-content">
          <div class="dailog-p1">{{$t('home.qdd')}}<br><span>{{$t('home.jiacai')}}</span></div>
        </div>
        <div class="dailog-btn" @click="clearMask">{{$t('home.queding')}}</div>
      </div>
  </div> -->
  <div class="settlement" v-if="showXiaDan">
    <div class="settlement-zd">
      <div class="settlement-bg flex">
        <div class="settlement-btn settlement-btn-left" @click="toHome()">{{$t("home.jxdc")}}</div>
        <div class="settlement-btn" @click="payNow()">{{$t("home.xzzf")}}</div>
      </div>
    </div>
  </div>
</div>
<div class="empty" v-else>
  <div class="empty-content">
    <img src="../assets/img/ic_zwdd.png" alt="">
    <p>{{$t("home.zwdd")}}</p>
  </div>
</div>
</template>

<script>
import api from '@/net/api'
import { get, post } from '@/net/http'

export default {
  name: 'my-order',
  data: () => {
    return {
      showMask: true,
      showXiaDan: true,
      orderList: [],
    }
  },
  created() {
    if(this.$route.query.source== 'pay') {
      this.showMask = false;
      this.showXiaDan = false;
    }else if(this.$route.query.source== 'myorder') {
      this.showXiaDan = true;
      this.showMask = false;
    }
  },
  mounted() {
    this.getMyOrder()
  },
  methods: {
    getMyOrder(){
      let data = {
          msCode: '10001',// 公共参数
          tableNo: '10',
          lang: 'cn',
          status: 'waiting_pay'
      }
      get(api.queryOrderList,data).then(res=> {
        res.list.forEach(element => {
          element.productList.forEach(attr=>{
            attr.attribute = attr.attribute ? JSON.parse(attr.attribute) : [];
          })
        });
        this.orderList = res.list;
      })  
    },
    clearMask() {
      this.showMask = false
    },
    toHome() {
      this.$router.push('/home?refresh=true')
    },
    goback(){
      this.$router.go(-1)
    },
    payNow() {
      let tradeIds = '';
      this.orderList.forEach(order=> {
        tradeIds += order.tradeId + ','
      })
      tradeIds = tradeIds.slice(0,tradeIds.length-1)

      let params = {
        msCode: '10001',// 公共参数
        tableNo: '10',
  //       token: '',
        lang: 'cn',
        tradeIds,
        couponId: '',
      }
      get(api.queryConfirm, params).then(res=> {
        res.count = this.orderList.length;
        res.tradeIds = params.tradeIds;
        sessionStorage.setItem('confirmData',JSON.stringify(res))
        this.$router.push('/pay')
      })

    },
  }
}
</script>

<style scoped>
.order-wrapper{
  padding-bottom: 1.4rem;
  background: #fafafa;
  overflow: hidden;
  min-height: 100vh;
}
.details-item li{
  display: flex;
  justify-content: space-between;
}
.warper{
  margin: .24rem;
  width: calc(100vw - 0.48rem);
  background: #fff;
  border-radius: .16rem;
  overflow: hidden;
}
.details-zh{
  background: #fff;
}
.settlement-btn{
  width: 50%;
  height: 100%;
  position: relative;
  line-height: 1rem;
  border-radius:0;
  margin-top: 0;
  right: 0;
}
.settlement-btn-left{
  background: #333333;
}
.header{
  background: linear-gradient(136deg, #FFC242 0%, #FF8F1F 100%);
  padding: .2rem .48rem;
  font-size: .4rem;
  font-weight: 500;
  color: #000;
}
.header p{
  font-size: .24rem;
  font-weight: 400;
}
.title-bar{
  background: linear-gradient(136deg, #FFC242 0%, #FF8F1F 100%);
  padding: .25rem .48rem;
  font-weight: 500;
  font-size: .3rem;
  color: #000;
  display: flex;
  align-items: center;
}
.title-bar img{
  width: .22rem;
  transform: rotate(-180deg);
  margin-right: .2rem;
}
.empty{
  height: 100vh;
  background: #FAFAFA;
  position: relative;
}
.empty-content{
  position: absolute;
  top: 4rem;
  left: 0;
  right: 0;
  text-align: center;
  font-size: .36rem;
  font-weight: 400;
  color: #666666;
}
.empty-content img{
  width: 3rem;
}
</style>
