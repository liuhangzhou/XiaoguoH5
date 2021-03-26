<template>
  <div class="warper">
    <div class="container">
      <div class="payment-number">
        <!-- <p class="textCenter" style="font-size:.28rem;"></p> -->
        {{storeInfo.msName}}
      </div>
      <div class="payment-number-content">
          <ul>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.ddh')}}</p>
              <p>{{statusData.orderNo}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.zfje')}}</p>
              <p>$ {{statusData.realAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.zje')}}</p>
              <p>$ {{statusData.orderAmount}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.xdsj')}}</p>
              <p>{{statusData.tradeTime}}</p>
            </li>
            <li class="flex flex-vc flex-sc">
              <p>{{$t('home.zhuangtai')}}</p>
              <p v-if="statusData.status == 'success'">{{$t('home.fkcg')}}</p>
              <p v-if="statusData.status == 'fail'">{{$t('home.fksb')}}</p>
              <p v-if="statusData.status == 'processing'">{{$t('home.jxz')}}</p>
            </li>
            
          </ul>
        </div>
    </div>
    <div class="settlement">
      <div class="settlement-zd">
        <div class="settlement-bg flex">
          <div class="settlement-btn settlement-btn-left" @click="goHome()">{{$t("home.jxdc")}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/net/http'
import { mapGetters } from 'vuex'
import api from '@/net/api'
export default {
  name: 'pay',
  data: () => {
    return {
      showCart: false,
      statusData:{}
    }
  },
  computed: {
    ...mapGetters(['storeInfo'])
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
.warper{
  background: #FAFAFA;
  overflow: hidden;
  min-height: 100vh;
}
.settlement-btn{
  width: 100%;
  height: 100%;
  position: relative;
  line-height: 1rem;
  border-radius:0;
  margin-top: 0;
  right: 0;
}
.payment-number-content{
  border-bottom: 0;
}
.payment-number {
  font-size: .3rem;
  font-weight: 500;
  color: #999999;
  line-height: .37rem;
}
</style>
