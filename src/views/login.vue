<template>
  <div class="warper warper2">
    <div class="details-box2">
      <div class="details-zh between" >
        <span @click="toHome">< {{$t("home.fhsy")}}</span>
        <span style="margin-left:25%;">{{$t("home.denglu")}}/{{$t("home.zhuce")}}</span>
        <span> &nbsp;</span>
        </div>
    </div>
    <div class="cont">
     <p><span>{{$t("home.shouji")}}/{{$t("home.youxiang")}}</span><input type="text" v-model="loginData.tel" :placeholder="$t('home.txsjh')"></p>
    <p><span>{{$t("home.mima")}}</span><input type="password" v-model="loginData.password"  :placeholder="$t('home.srmm') "></p>
    </div>
    <p class=" center radius10" @click="goLogin" style="width:2rem;background-color: rgb(242, 133, 18);margin:0 auto;" >{{$t('home.denglu')}}</p>
    <div class="goloign center">
      <span style="color:#000;">{{$t('home.xlsk')}}？</span>
      <span class="radius10" @click="goRegister">{{$t('home.quzhuce')}}</span>
    </div>
    <alert :show.sync="alertShow" :text="alertText" />
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
      alertShow: false,
      alertText: null,
    }
  },
  methods: {
    async queryLogin(params) {
      try {
        const data = await get(api.queryLogin, params)
        sessionStorage.setItem('user',JSON.stringify(data))
        this.$router.push('/home')
      } catch (e) {
        this.alertShow = true;
        this.alertText = this.$t('home.zhmmcw');
      }
    },
    toHome() {
      this.$router.push('/home')
    },
    goRegister() {
      this.$router.push('/register')
    },
    goLogin(){
      if(!this.loginData.tel){
        this.alertShow = true;
        this.alertText = this.$t('home.txsjh');
         return;
      }
       if(!this.loginData.password){
         this.alertShow = true;
        this.alertText = this.$t('home.txmm');
        return;
      }
       let params = {
          tel:this.loginData.tel,
          password:this.loginData.password
    }
      this.queryLogin(params)
    }
  }
}
</script>

<style scoped>

</style>
