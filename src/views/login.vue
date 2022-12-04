<template>
  <div class="warper warper2">
    <navBar :title="$t('home.denglu') + '/' + $t('home.zhuce')" />
    <div class="login-title">{{ $t('zyddn') }}</div>
    <div class="login-text">{{ $t('hysyzhmm') }}</div>
    <div class="cont1">
      <div class="cont-input">
        <input type="text" maxlength="11" v-model="loginData.tel" :placeholder="$t('home.txsjh')">
      </div>
      <div class="cont-input flex flex-vc flex-sc">
        <input :type="showPassword ? 'password' : 'text'" maxlength="16" v-model="loginData.password"
          :placeholder="$t('home.srmm')">
        <img src="../assets/img/ic_password.png" alt="" @click="showPassword = !showPassword">
      </div>
    </div>
    <div class="login-btn center" @click="goLogin">{{ $t('home.denglu') }}</div>
    <div class="goloign center">
      <span style="color:#000;">{{ $t('home.xlsk') }}？</span>
      <span @click="goRegister">{{ $t('home.quzhuce') }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { get } from "@/net/http"
import api from "@/net/api"
export default {
  name: 'order',
  data() {
    return {
      loginData:{
        tel:'',
        password:'',
      },
      showPassword: false,
    }
  },
  methods: {
    async queryLogin(params) {
      try {
        const data = await get(api.queryLogin, params)
        sessionStorage.setItem('user',JSON.stringify(data))
        this.$router.back();
      } catch (e) {
        this.$toast(this.$t('home.zhmmcw'));
      }
    },
    toHome() {
      this.$router.back()
    },
    goRegister() {
      this.$router.push('/register')
    },
    changeAlertShow() {
      this.alertShow = false;
    },
    goLogin() {
      if (!this.loginData.tel) {
        this.$toast(this.$t('home.txsjh'));
        return;
      }
      if (!this.loginData.password) {
        this.$toast(this.$t('home.txmm'));
        return;
      }
      let params = {
        tel: this.loginData.tel,
        password: this.loginData.password
      }
      this.queryLogin(params)
    }
  }
}
</script>

<style scoped>

.login-title {
  margin: 1.2rem 0 .09rem .24rem;
  font-weight: 800;
  color: #111A34;
  font-size: .54rem;
}

.login-text {
  margin-left: .24rem;
  font-size: .26rem;
  font-weight: 400;
  color: #111A34;
}

.cont-input {
  padding: 0 .24rem;
  height: .96rem;
  border-bottom: 1px solid #EEEEEE;
}

.cont-input input {
  display: block;
  height: 100%;
  border: 0;
  font-size: .32rem;
}

.cont-input img {
  width: .42rem;
}

.cont1 {
  margin-top: .85rem;
}

.login-btn {
  width: 7rem;
  height: 1rem;
  background: #FF8F1F;
  border-radius: 8px;
  color: #fff;
  line-height: 1rem;
  padding: 0;
  font-weight: 500;
  font-size: .36rem;
}
</style>
