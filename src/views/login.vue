<template>
  <div class="warper warper2">
    <div class="details-box2">
      <div class="details-zh between" >
        <span @click="toHome"><返回首页</span>
        <span style="margin-left:25%;">登录/注册</span>
        <span> &nbsp;</span>
        </div>
    </div>
    <div class="cont">
     <p><span>手机/邮箱</span><input type="text" v-model="loginData.tel" placeholder="电子邮箱或手机号码 "></p>
    <p><span>密码</span><input type="text" v-model="loginData.password"  placeholder="输入密码 "></p>
    </div>
    <p class=" center radius10" @click="goLogin" style="width:2rem;background-color: rgb(242, 133, 18);margin:0 auto;" >登录</p>
    <div class="goloign center">
      <span style="color:#000;">新来食客？</span>
      <span class="radius10" @click="goRegister">去注册</span>
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
        alert('已登录')
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
        alert('填写手机号')
         return;
      }
       if(!this.loginData.password){
        alert('填写密码')
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
