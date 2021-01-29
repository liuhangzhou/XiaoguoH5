<template>
<!-- 待支付订单 -->
<div class="order-wrapper">
    <div class="warper" v-for="item in orderList" :key="item.tradeId">
    <!-- <div class="details-box "> -->
      <div class="details-zh flexBetween padding10 navBg">
        <span >{{$t('home.xdsj')}}：<i class="colorRgb">{{item.tradeTime}}</i></span>
        <span class="colorRgb">${{item.realAmount}}</span>
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
            </div>
          </div>
          <div>
            <div class="details-monery">$ {{product.price}}</div>
            <div class="details-number">x <span>{{product.count}}</span></div>
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
  <div class="mask" v-if="showMask">
      <div class="dailog">
        <div class="dailog-tit">{{$t('home.xdcg')}}</div>
        <div class="dailog-content">
          <div class="dailog-p1">{{$t('home.qdd')}}<br><span>{{$t('home.jiacai')}}</span></div>
        </div>
        <div class="dailog-btn" @click="clearMask">{{$t('home.queding')}}</div>
      </div>
  </div>
    <div class="xiadan flex flex-vc flex-hc" v-if="showXiaDan">
      <div class="xiadan-btn-left" @click="toHome">{{$t('home.jxdc')}}</div>
      <div class="xiadan-btn-right" @click="payNow">{{$t('home.xzzf')}}</div>
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
      orderList: []
    }
  },
  created() {
    if(this.$route.query.source) {
      this.showXiaDan = false;
    }
    this.getMyOrder()
  },
  methods: {
    getMyOrder(){
      let data = {
          msCode: '10001',// 公共参数
          tableNo: '10',
//           token: '',
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
      this.$router.push('/home')
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
        tradeIds
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
  padding-bottom: .8rem;
}
</style>
