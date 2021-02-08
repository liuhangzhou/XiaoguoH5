<template>
  <div class="head">
    <div class="header-bg">
      <img class="logo" src="../../assets/img/home-bg.png" alt="" />
    </div>
    <div class="position">
      <div class="position-wrapper">
        <div class="position-top flex flex-vc flex-sc">
          <div class="head-txt">
            <div class="barbecue-name">{{ storeInfo.msName }}</div>
            <div class="number-diners">{{$t("home.yongcanrenshu")}}：{{mealsNumber}}</div>
            <div class="iphone-number">{{$t("home.zhuohao")}}：{{tableNo}}</div>
          </div>
          <div class="head-logo">
            <img class="logo" :src="storeInfo.msLogo" alt="" />
          </div>
        </div>
        <div class="favourable flex flex-vc" >
          <li v-for="coupons in storeCoupons" :key="coupons.id">
            {{ coupons.leastCost }}{{$t("home.jian")}}{{ coupons.reduceCost }}
          </li>
          <div class="my-order" @click="goMyOrder">
            <img
              class="order-icon"
              src="../../assets/img/订单.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex flex-vc">
      <div class="head-text">
        <div class="barbecue-name">{{ storeInfo.msName }}</div>
        <div class="number-diners">{{$t("home.yongcanrenshu")}}：{{mealsNumber}}</div>
      </div>
    </div>
    <div class="head-bar flex flex-vc flex-sc">
      <div class="favourable flex flex-vc" >
        <img
          class="favourable-icon"
          src="../../assets/img/ic_coupons.png"
          alt=""
        />
        <li v-for="coupons in storeCoupons" :key="coupons.id">
          {{$t("home.man")}} {{ coupons.leastCost }}{{$t("home.jian")}} {{ coupons.reduceCost }};
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
      <img class="login-icon" src="../../assets/img/ic_user.png" alt="" srcset="">{{username}}
    </div>
    <div class="login flex flex-vc" @click="aa" v-else>
      <img class="login-icon" src="../../assets/img/ic_user.png" alt="" srcset="">{{$t("home.weidenglu")}}
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dining-information',
  computed: {
    ...mapGetters(['storeInfo', 'storeCoupons','mealsNumber'])
  },
  data() {
    return {
      username : null,
      tableNo: sessionStorage.getItem('tableNo')
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
      this.$router.push('/orderdetail?source=myorder')
    }
  }
}
</script>

<style scoped>
.header-bg{
  width: 100%;
  height: 4.5rem;
}
.header-bg img{
  width: 100%;
  height: 2.6rem;
}
.position{
  position: absolute;
  padding: 0 .24rem;
  top: 1.7rem;
  width: 100%;
}
.position-wrapper{
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius:16px;
  width: 100%;
  padding: .24rem .24rem .24rem .32rem;
  background: #fff;
}
.barbecue-name{
  font-size: .36rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #111111;
  line-height: .42rem;
  margin-bottom: .08rem;
}
.number-diners{
  font-size: .22rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: .3rem;
  margin-bottom: .08rem;
}
.iphone-number {
  font-size: .22rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: .3rem;
}
.head-logo{
  width: .94rem;
  height: .94rem;
}
.favourable{
  margin-top: .16rem;
  flex-wrap: wrap;
}
.favourable li{
  line-height: .3rem;
  border-radius: 4px;
  border: 1px solid #FF6010;
  padding: 0 .04rem;
  font-size: .22rem;
  font-weight: 400;
  color: #FF6010;
  margin-right: .2rem;
  margin-bottom: .08rem;
}
.my-order{
  position: absolute;
  right: .24rem;
}
.my-order img{
  width: .7rem
}
</style>
