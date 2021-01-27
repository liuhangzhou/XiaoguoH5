<template>
  <div class="warper">
    <div class="payment-main">
      <div class="payment-number">
        <div class="payment-number-head flex flex-sc flex-vc">
          <p>共计：6 项</p>
          <div @click="goOrderDetail">订单详情</div>
        </div>
        <div class="payment-number-content">
          <ul>
            <li class="flex flex-vc flex-sc">
              <p>小计</p>
              <p>$ 218.40</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>消费税</p>
              <p>$ 218.40</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>小费</p>
              <p>$ 218.40</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>满减优惠</p>
              <p><span>$ 5</span></p>
            </li>
          </ul>
        </div>
        <div class="payment-zomgshu flex flex-vc flex-sc">
          <p>合计：</p>
          <p>$ 233.40</p>
        </div>
      </div>
      <div class="youhuiquan flex flex-vc flex-sc">
        <p>优惠券</p>
        <p class="youhuiquan-p2">暂无可用</p>
      </div>
      <div class="payment-box">
        <div class="payment-monery flex flex-vc flex-sc">
          <p>实付金额</p>
          <p><span>$ 238.40</span></p>
        </div>
        <div class="payment-mode flex flex-hc flex-vc">支付方式</div>
        <div class="payment-item flex flex-vc flex-sc">
          <p>Credit/Debit Card</p>
          <div></div>
        </div>
        <div class="payment-url flex flex-vc flex-sc">
          <p class="flex flex-vc"><i></i>微信支付</p>
          <input type="checkbox" id="put">
          <label for="put"></label>
        </div>
      </div>
      <div class="settlement">
        <div class="settlement-zd">
          <div class="settlement-monery">$ 218.40</div>
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
      showCart: false
    }
  },
  mounted() {
    const params = [] //tradeIds订单号，多个以英文逗号隔开
    this.queryConfirm(params)
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
      this.$router.push('/orderdetail')
    }
  }
}
</script>

<style scoped>

</style>
