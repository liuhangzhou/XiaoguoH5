<template>
  <div class="warper">
    <div class="orderstatus">
      <div class="payment-number">
        <!-- <p class="textCenter" style="font-size:.28rem;">韩国烤肉（中山公园店）</p> -->
      </div>
      <div class="conts">
        <!-- <p class="flex flex-vc flex-sc"><span>支付金额</span><span>129.11元</span></p>
        <p class="flex flex-vc flex-sc"><span>下单时间</span><span>2021-01-14 15:49:24</span></p>
        <p class="flex flex-vc flex-sc"><span>订单号</span><span>7542605045661696</span></p>
        <p class="flex flex-vc flex-sc"><span>状态</span><span>已支付</span></p> -->
        <p class="flex flex-vc flex-sc"><span>{{$t('home.zfje')}}</span><span>{{statusData.realAmount}}{{$t('home.yuan')}}</span></p>
        <p class="flex flex-vc flex-sc"><span>{{$t('home.zje')}}</span><span>{{statusData.orderAmount}}{{$t('home.yuan')}}</span></p>
        <p class="flex flex-vc flex-sc"><span>{{$t('home.xdsj')}}</span><span>{{statusData.tradeTime}}</span></p>
        <p class="flex flex-vc flex-sc"><span>{{$t('home.ddh')}}</span><span>{{statusData.orderNo}}</span></p>
        <p class="flex flex-vc flex-sc" v-if="statusData.status == 'success'"><span>{{$t('home.zhuangtai')}}</span><span>{{$t('home.fkcg')}}</span></p>
        <p class="flex flex-vc flex-sc" v-if="statusData.status == 'fail'"><span>{{$t('home.zhuangtai')}}</span><span>{{$t('home.fksb')}}</span></p>
        <p class="flex flex-vc flex-sc" v-if="statusData.status == 'processing'"><span>{{$t('home.zhuangtai')}}</span><span>{{$t('home.jxz')}}</span></p>
      </div>
    </div>
    <div class="payBtn textCenter" @click="goHome">{{$t('home.jxdc')}}</div>
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
    const { orderNo } = this.$route.query
    const params = { // TODO
      orderNo
    }
    this.queryStatus(params)
  },
  methods: {
    async queryStatus(params) {
      try {
        const data = await get(`${api.queryStatus}`, params)
        this.statusData = data
      } catch (e) {
        console.log('e', e)
      }
    },
    goHome() {
      this.$router.push('/home')
    }
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
