<template>
  <div class="warper">
    <div class="orderstatus">
      <div class="payment-number">
        <p class="textCenter" style="font-size:.28rem;">韩国烤肉（中山公园店）</p>
      </div>
      <div class="conts">
        <!-- <p class="flex flex-vc flex-sc"><span>支付金额</span><span>129.11元</span></p>
        <p class="flex flex-vc flex-sc"><span>下单时间</span><span>2021-01-14 15:49:24</span></p>
        <p class="flex flex-vc flex-sc"><span>订单号</span><span>7542605045661696</span></p>
        <p class="flex flex-vc flex-sc"><span>状态</span><span>已支付</span></p> -->
        <p class="flex flex-vc flex-sc"><span>支付金额</span><span>{{statusData.realAmount}}元</span></p>
        <p class="flex flex-vc flex-sc"><span>总金额</span><span>{{statusData.orderAmount}}元</span></p>
        <p class="flex flex-vc flex-sc"><span>下单时间</span><span>{{statusData.tradeTime}}</span></p>
        <p class="flex flex-vc flex-sc"><span>订单号</span><span>{{statusData.orderNo}}</span></p>
        <p class="flex flex-vc flex-sc" v-if="statusData.success"><span>状态</span><span>付款成功</span></p>
        <p class="flex flex-vc flex-sc" v-if="statusData.fail"><span>状态</span><span>付款失败</span></p>
        <p class="flex flex-vc flex-sc" v-if="statusData.processing"><span>状态</span><span>进行中</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/net/http'
import api from '@/net/api'
export default {
  name: 'pay',
  data: () => {
    return {
      showCart: false,
      statusData:{}
    }
  },
   mounted() {
    const { productId } = this.$route.query
    const params = { // TODO
      orderNo: '123456'
    }
    this.queryStatus(params)
  },
  methods: {
    async queryStatus(data) {
      try {
        const data = await get(api.queryStatus, data)
        console.log(data)
      } catch (e) {
        console.log('e', e)
      }
    },
  }
 
}
</script>

<style scoped>
.conts{
    margin-top: 1rem; 
    border-top: 1px solid #bbb;
}
.conts p{
    width: 100%;
    height: .74rem;
    /* border-top: 1px solid #bbb; */
    border-bottom: 1px solid #bbb;
    /* margin-top: .4rem; */
    color: rgba(0, 0, 0, 1);
    font-size: .28rem;
    padding: 0 .46rem 0 .38rem;
}
</style>
