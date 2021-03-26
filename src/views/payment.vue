<template>
  <div class="warper">
    <div class="payment-main">
      <div class="payment-number">
        <!-- <p class="textCenter" style="font-size:.24rem;">韩国烤肉（中山公园店）</p> -->
        <p  class="textCenter textH4 colorRed">${{tradeData.realAmount}}</p>
      </div>
      <!-- <div class="youhuiquan flex flex-vc flex-sc">
        <p>优惠券</p>
        <p class="youhuiquan-p2">暂无可用</p>
      </div> -->
      <div class="payment-box">
  
        <div class="payment-mode flex flex-hc flex-vc">{{$t('home.zffs')}}</div>
        <div class="payment-item flex flex-vc flex-sc">
          <p><img class="pay-icon" src="../assets/img/bank.png" alt="">Credit/Debit Card</p>
          <div></div>
        </div>
        <!-- <div class="payment-url flex flex-vc flex-sc">
          <p class="flex flex-vc"><i></i>微信支付</p>
          <input type="checkbox" id="put">
          <label for="put"></label>
        </div> -->
      </div>
      <div class="payBtn textCenter" @click="goPay">{{$t('home.qrzf')}}</div>
    </div>
  </div>
</template>

<script>
import { post } from "@/net/http"
import api from "@/net/api"
import { setTimeout } from 'timers';
export default {
  name: 'pay',
  data: () => {
    return {
      tradeData: {}
    }
  },
  created(){
    this.tradeData = JSON.parse(sessionStorage.getItem('confirmData'))
    console.log(this.tradeData)
  },
  methods: {
     async queryPay(params) {
      try {
        const data = await post(api.queryPay, params)
        window.location.href = data.payinfo;
        this.$router.push('/orderStatus?orderNo='+data.orderNo)
        // const { attributeList = [] } = data
        // attributeList.forEach(attribute => {
        //   const { optionList = [] } = attribute
        //   optionList.forEach(option => this.$set(option, 'isSelected', false))
        // })
        // this.setDetailInformation(data)
      } catch (e) {
        console.log('e', e)
      }
    },
    goPay () {
      let params = {
        msCode: '10001',
        tableNo: '10',
        lang: 'cn',
        tradeIds:this.tradeData.tradeIds	,//订单号，多个以英文逗号隔开
        couponId:'',//	否 使用的优惠券id
        realAmount:this.tradeData.realAmount,//是 	用券后的实付金额
        payType:'bank',//是 bank网银支付；wechat微信支付（暂不支持）
        returnUrl	:'http://h5.menupls.ixiaoguo.com.cn/#/orderStatus',// 否	同步回调地址
        cancelUrl:'http://h5.menupls.ixiaoguo.com.cn/#/payment',//否 取消地址

      }
      this.queryPay(params)
    }
  }
}
</script>

<style scoped>

</style>
