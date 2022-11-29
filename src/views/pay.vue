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
              <p>{{$t('$')}} {{confirmData.totalAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.xiaofei')}}</p>
              <p>{{$t('$')}} {{confirmData.tipAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>
                <span class="origin">税</span>
                {{$t('home.xfs')}}
              </p>
              <p>{{$t('$')}} {{confirmData.exciseAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>
                <span>{{$t('home.jian')}}</span>
                {{$t('home.mjyh')}}
              </p>
              <p class="font-red">-{{$t('$')}} {{confirmData.redbagReduceAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>
                <img src="../assets/img/ic_coupons.png" alt="">
                {{$t('home.yhq')}}
              </p>
              <p class="font-red" style="color:red" v-if="!userToken" @click="goToLogin">{{$t('dianjidenglu')}}</p>
              <div v-else-if="chosenCoupon != -1" class="font-red" style="color:#333" @click="couponPopup = true">-{{$t('$')}}  {{couponList[chosenCoupon].buyPrice}}</div>
              <p class="font-red" style="color:#333" v-else @click="couponPopup = true">{{couponList.length}}{{$t('zhangkeyong')}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.heji')}}</p>
              <p>{{$t('$')}} {{confirmData.realAmount}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="payment-monery">
        <p>已优惠<span class="font-red">{{$t('$')}}{{confirmData.redbagReduceAmount}}</span> {{$t('home.sfje')}}{{$t('$')}}<span class="payment-real">{{confirmData.realAmount}}</span></p>
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
            <div class="settlement-monery">{{$t('$')}} {{ confirmData.realAmount }}</div>
            <div class="settlement-btn" @click="goPay()">{{$t("home.qrzf")}}</div>
          </div>
        </div>
      </div>
    </div>
    <alert :show.sync="alertShow" :text="$t('home.fksb')" :comfirm="()=>{alertShow = false}" />
    <alert :show.sync="showAlert" :text="$t('home.fkcg')" :comfirm="comfirm" />
    <van-popup v-model="couponPopup" closeable round position="bottom" v-if="couponList.length">
      <div class="popup-title">
        {{$t('xuanzeyouhuiquan')}}
      </div>
      <div class="popup-content" style="padding-bottom: 30px;" v-if="false">
        <van-empty
        class="custom-image"
        :image="require('../assets/img/ic_noCoupon.png')"
        :description="$t('zwxzyhq')"
        >
        </van-empty>
      </div>
      <div class="popup-content">
        <ul>
          <li class="flex flex-sc container" v-for="(item, index) in couponList" @click="handleClickCoupon(index)">
            <div class="flex flex-vc">
              <div class="coupon-price">
                <span>{{item.buyPrice}}</span>{{$t('home.yuan')}}
                <p>{{$t('home.yhq')}}</p>
              </div>
              <div class="coupon-info">
                <p class="coupon-name">{{item.title}}</p>
                <p class="coupon-sy">满{{item.buyPrice}}元可用</p>
                <p class="coupon-date">{{item.dateStr}} 到期</p>
              </div>
            </div>
            <div class="flex flex-vc">
              <div :class="chosenCoupon == index ? 'check-container check-container-current' : 'check-container'">
                <img src="../assets/img/ic_checked.png" alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { get, post } from '@/net/http'
import api from "@/net/api"
export default {
  name: 'pay',
  data(){
    return {
      showAlert: false,
      confirmData: {},
      alertShow: false,
      userToken: '',
      couponList: [],
      chosenCoupon: -1,
      couponPopup: false,
    }
  },
  created() {
    if(this.$route.query.status == 11) {
      this.alertShow  = true;
    }
    if(this.$route.query.status == 22) {
      this.alertShow  = true;
    }
    if(this.$route.query.status == '00') {
      this.showAlert  = true;
    }

    if(this.$route.query.tradeIds) {
      this.payNow(this.$route.query.tradeIds);
    }else{
      this.confirmData = JSON.parse(sessionStorage.getItem('confirmData'));
    }
  },
  mounted() {
    this.userToken = JSON.parse(sessionStorage.getItem('user'))?.token || '';
    if(this.userToken) {
      this.getCouponMemberList();
    }
  },
  methods: {
    getCouponMemberList(){
      get(api.couponMemberList,{
        mctCode:this.mctCode,
        msCode: this.msCode,
        type: 'nouse',
        amount: this.confirmData.realAmount
      }).then(res=>{
        res.nouseList = []
        this.couponList = res.nouseList || [];
      })
    },
    comfirm() {
      this.$router.push('/')
    },
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
        // this.$router.push('/orderStatus?orderNo='+data.orderNo)
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
        couponId: this.chosenCoupon != -1? this.couponList[this.chosenCoupon].id : '', //优惠券id
        realAmount:this.confirmData.realAmount,//是 	用券后的实付金额
        payType:'bank',//是 bank网银支付；wechat微信支付（暂不支持）
        returnUrl	:'http://h5.menupls.ixiaoguo.com.cn/#/orderStatus',// 否	同步回调地址
        cancelUrl:'http://h5.menupls.ixiaoguo.com.cn/#/pay',//否 取消地址
      }
      this.queryPay(params)
    },
    goOrderDetail () {
      this.$router.push('/orderdetail?source=pay')
    },
    goToLogin() {
      this.$router.push('/login')
    },
    handleClickCoupon(index) {
      this.chosenCoupon = index;
      this.couponPopup = false;
    },
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
.check-container{
  width: .4rem;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #CCCCCC;
  height: .4rem;
}
.check-container-current{
  background: #FF8F1F;
  border: 0;
}
.check-container img{
  width: .4rem;
  display: block;
}

.popup-content{
  padding-bottom: 30px;
}
.popup-content li {
  padding-left: .55rem;
  margin-top: .24rem;
}
.coupon-price{
  margin-right: .8rem;
  color: #F93A4A;
  font-weight: 600;
  font-size: .26rem;
}
.coupon-price span{
  font-size: .7rem;
  font-weight: bold;
}
.coupon-price p{
  font-size: .22rem;
  font-weight: 400;
  color: #333333;
  margin-top: -.05rem;
}
.coupon-info{
  color: #999;
}
.coupon-name{
  font-size: .3rem;
  font-weight: 500;
  color: #333333;
  margin-bottom: .08rem;
}
.coupon-sy{
  font-size: .26rem;
  margin-bottom: .08rem;
  font-weight: 400;
}
.coupon-date {
  font-size: .22rem;
}
</style>
