<template>
  <div class="warper">
    <div class="payment-main">
      <div class="payment-number">
        <div class="payment-number-head flex flex-sc flex-vc">
          <p>共计：{{confirmData.count}} 项</p>
          <div @click="goOrderDetail">订单详情</div>
        </div>
        <div class="payment-number-content">
          <ul>
            <li class="flex flex-vc flex-sc">
              <p>小计</p>
              <p>$ {{confirmData.totalAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>消费税</p>
              <p>$ {{confirmData.exciseAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>小费</p>
              <p>$ {{confirmData.tipAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>满减优惠</p>
              <p><span>$ {{confirmData.redbagReduceAmount}}</span></p>
            </li>
          </ul>
        </div>
        <div class="payment-zomgshu flex flex-vc flex-sc">
          <p>合计：</p>
          <p>$ {{confirmData.realAmount}}</p>
        </div>
      </div>
      <div class="youhuiquan flex flex-vc flex-sc">
        <p>优惠券</p>
        <p class="youhuiquan-p2">暂无可用</p>
      </div>
      <div class="payment-box">
        <div class="payment-monery flex flex-vc flex-sc">
          <p>实付金额</p>
          <p><span>$ {{confirmData.realAmount}}</span></p>
        </div>
        <div class="payment-mode flex flex-hc flex-vc">支付方式</div>
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
      <div class="settlement">
        <div class="settlement-zd">
          <div class="settlement-monery">$ {{confirmData.realAmount}}</div>
          <div class="settlement-btn" @click="goPay">确认支付</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/net/http"
import api from "@/net/api"
export default {
  name: 'pay',
  data: () => {
    return {
      confirmData: {}
    }
  },
  created() {
    this.confirmData = JSON.parse(sessionStorage.getItem('confirmData'));
  },
  mounted() {
    // const params = [] //tradeIds订单号，多个以英文逗号隔开
    // this.queryConfirm(params)
  },
  methods: {
    async queryConfirm(params) {
      try {
        const data = await get(api.queryConfirm, params)
      } catch (e) {
        console.log('e', e)
      }
    },
     
    goPay () {
      this.$router.push('/payment')
    },
    goOrderDetail () {
      this.$router.push('/orderdetail?source=pay',)
    }
  }
}
</script>

<style scoped>

</style>
