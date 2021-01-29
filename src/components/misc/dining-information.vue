<template>
  <div class="head">
    <div class="flex flex-vc">
      <img class="logo" :src="storeInfo.msLogo" alt="" />
      <div class="head-text">
        <div class="barbecue-name">{{ storeInfo.msName }}</div>
        <div class="number-diners">{{$t("home.yongcanrenshu")}}：2</div>
      </div>
    </div>
    <div class="head-bar flex flex-vc flex-sc">
      <div class="favourable flex flex-vc" v-if="storeCoupons.length > 0">
        <img
          class="favourable-icon"
          src="../../assets/img/ic_coupons.png"
          alt=""
        />
        <li v-for="coupons in storeCoupons" :key="coupons.id">
          {{$t("home.man")}} {{ coupons.getLeastCost }}{{$t("home.jian")}} {{ coupons.getReduceCost }};
        </li>
      </div>
      <div class="my-order flex flex-vc" @click="goMyOrder">
        <img
          class="order-icon"
          src="../../assets/img/订单.png"
          alt=""
        />{{$t("home.wodedingdan")}}
      </div>
    </div>
    <div class="login flex flex-vc" v-if="username">
      <i class="login-icon"></i>{{username}}
    </div>
    <div class="login flex flex-vc" @click="aa" v-else>
      <i class="login-icon"></i>{{$t("home.weidenglu")}}
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
  data() {
    return {
      username : null
    }
  },
  created(){
    this.username = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).name : null;
  },
  methods: {
    aa() {
      this.$router.push('/login')
    },
    goMyOrder() {
      this.$router.push('/orderdetail')
    }
  }
}
</script>

<style scoped></style>
