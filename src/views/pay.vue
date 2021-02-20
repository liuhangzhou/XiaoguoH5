<template>
  <div class="warper">
    <div class="payment-main">
      <div class="container">
        <div class="payment-mode">{{$t('home.zffs')}}</div>
        <div class="payment-item flex flex-vc flex-sc">
          <p>Credit/Debit Card</p>
          <div>
            <img src="../assets/img/ic_ok.png" alt="">
          </div>
        </div>
        <!-- <div class="payment-url flex flex-vc flex-sc">
        <p class="flex flex-vc"><i></i>微信支付</p>
        <input type="checkbox" id="put">
        <label for="put"></label>
      </div> -->
      </div>
      <div class="container">
        <div class="payment-number-head flex flex-sc flex-vc">
          <p>{{$t('home.gongji')}}：{{confirmData.count}} {{$t('home.xiang')}}</p>
          <div @click="goOrderDetail">{{$t('home.ddxq')}}</div>
        </div>
        <div class="payment-number">
        <div class="payment-number-content">
          <ul>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.xiaoji')}}</p>
              <p>$ {{confirmData.totalAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.xiaofei')}}</p>
              <p>$ {{confirmData.tipAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>
                <span class="origin">税</span>
                {{$t('home.xfs')}}
              </p>
              <p>$ {{confirmData.exciseAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>
                <span>{{$t('home.jian')}}</span>
                {{$t('home.mjyh')}}
              </p>
              <p class="font-red">-$ {{confirmData.redbagReduceAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>
                <img src="../assets/img/ic_coupons.png" alt="">
                {{$t('home.yhq')}}
              </p>
              <p class="font-red" style="color:#333">{{$t('home.zwky')}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.heji')}}</p>
              <p>$ {{confirmData.realAmount}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="payment-monery">
        <p>已优惠<span class="font-red">${{confirmData.redbagReduceAmount}}</span> {{$t('home.sfje')}}$<span class="payment-real">{{confirmData.realAmount}}</span></p>
      </div>
      </div>
      
      <!-- <div class="settlement">
        <div class="settlement-zd">
          <div class="settlement-monery">$ {{confirmData.realAmount}}</div>
          <div class="settlement-btn" @click="goPay">{{$t('home.qrzf')}}</div>
        </div>
      </div> -->
      <div class="settlement">
        <div class="settlement-zd">
          <div class="settlement-bg flex">
            <div class="settlement-monery">$ {{ confirmData.realAmount }}</div>
            <div class="settlement-btn" @click="goPay()">{{$t("home.qrzf")}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from '@/net/http'
import api from "@/net/api"
export default {
  name: 'pay',
  data: () => {
    return {
      confirmData: {}
    }
  },
  created() {
    if(this.$route.query.tradeIds) {
      this.payNow(this.$route.query.tradeIds);
    }else{
      this.confirmData = JSON.parse(sessionStorage.getItem('confirmData'));
    }
  },
  mounted() {
    // const params = [] //tradeIds订单号，多个以英文逗号隔开
  },
  methods: {
    payNow(tradeIds) {
      let params = {
        msCode: '10001',// 公共参数
        tableNo: '10',
        lang: 'cn',
        tradeIds
      }
      get(api.queryConfirm, params).then(res=> {
        res.count = tradeIds.split(',').length;
        res.tradeIds = params.tradeIds;
        this.confirmData = res;
      })
    },
    async queryPay(params) {
      try {
        const data = await post(api.queryPay, params)
        window.location.href = data.payinfo;
        this.$router.push('/orderStatus?orderNo='+data.orderNo)
      } catch (e) {
        console.log('e', e)
      }
    },
     
    goPay () {
      let params = {
        msCode: '10001',
        tableNo: '10',
        lang: 'cn',
        tradeIds:this.confirmData.tradeIds	,//订单号，多个以英文逗号隔开
        couponId:'',//	否 使用的优惠券id
        realAmount:this.confirmData.realAmount,//是 	用券后的实付金额
        payType:'bank',//是 bank网银支付；wechat微信支付（暂不支持）
        returnUrl	:'http://xxx.com/xxx',// 否	同步回调地址
        cancelUrl:'http://xxx.com/xxx',//否 取消地址
      }
      this.queryPay(params)
    },
    goOrderDetail () {
      this.$router.push('/orderdetail?source=pay')
    }
  }
}
</script>

<style scoped>
.settlement-monery {
  font-weight: 500;
  color: #FFFFFF;
  font-size: .38rem;
  line-height: 1rem;
  padding-left: .4rem;
}
.warper {
  background: #FAFAFA;
  overflow: hidden;
  min-height: 100vh;
}
.origin{
  background: #FF8F1F;
}
.font-red{
  color: #FF8F1F;
}
</style>
