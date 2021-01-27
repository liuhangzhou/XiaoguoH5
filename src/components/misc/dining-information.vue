<template>
  <div class="head">
    <div class="flex flex-vc">
      <img class="logo" :src="storeInfo.msLogo" alt="" />
      <div class="head-text">
        <div class="barbecue-name">{{ storeInfo.msName }}</div>
        <div class="number-diners">用餐人数：2人</div>
      </div>
    </div>
    <div class="head-bar flex flex-vc flex-sc">
      <div class="favourable flex flex-vc" v-if="storeCoupons.size > 0">
        <img
          class="favourable-icon"
          src="../../assets/img/ic_coupons.png"
          alt=""
        />
        <li v-for="coupons in storeCoupons" :key="coupons.id">
          满{{ coupons.getLeastCost }}减 {{ coupons.getReduceCost }};
        </li>
      </div>
      <div class="my-order flex flex-vc">
        <img
          class="order-icon"
          src="../../assets/img/订单.png"
          alt=""
        />我的订单
      </div>
    </div>
    <div class="login flex flex-vc" @click="aa">
      <i class="login-icon"></i>未登录
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dining-information',
  computed: {
    ...mapGetters(['storeInfo', 'storeCoupons'])
  },
  methods: {
    aa() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped></style>
