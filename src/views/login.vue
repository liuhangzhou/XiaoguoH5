<template>
  <div class="warper warper2">
    <div class="details-box2">
      <div class="details-zh between" >
        <span @click="toHome"><{{$t("home.fhsy")}}</span>
        <span style="margin-left:25%;">{{$t("home.denglu")}}/{{$t("home.zhuce")}}</span>
        <span> &nbsp;</span>
        </div>
    </div>
    <div class="cont">
     <p><span>{{$t("home.shouji")}}/{{$t("home.youxiang")}}</span><input type="text" v-model="loginData.tel" :placeholder="$t('home.txsjh')"></p>
    <p><span>{{$t("home.mima")}}</span><input type="text" v-model="loginData.password"  :placeholder="$t('home.srmm') "></p>
    </div>
    <p class=" center radius10" @click="goLogin" style="width:2rem;background-color: rgb(242, 133, 18);margin:0 auto;" >{{$t('home.denglu')}}</p>
    <div class="goloign center">
      <span style="color:#000;">{{$t('home.xlsk')}}？</span>
      <span class="radius10" @click="goRegister">{{$t('home.quzhuce')}}</span>
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
        password:''

      }
    }
  },
  methods: {
    async queryLogin(params) {
      try {
        const data = await get(api.queryLogin, params)
        sessionStorage.setItem('user',JSON.stringify(data))
        alert(this.$t('home.ydl'))
      } catch (e) {
        console.log('e', e)
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
        alert(this.$t('home.txsjh'))
         return;
      }
       if(!this.loginData.password){
        alert(this.$t('home.txmm'))
        return;
      }
       let params = {
          tel:this.loginData.tel,
          password:this.loginData.password
    }
      this.queryLogin(params)
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>
