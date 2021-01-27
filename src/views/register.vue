<template>
  <div class="warper warper2">
    <div class="details-box2">
      <div class="details-zh between" >
        <span style="margin:0 auto" >注册/登录</span>
        </div>
    </div>
    <div class="cont cont2">
      <p><span>姓名/称呼</span><input type="text" v-model="registerData.name" placeholder="单行输入 "></p>
      <p><span>性别</span>
      <span class="toborder" style="width:1.7rem;text-align:center;color: #1890FF;border: 1px solid  rgb(0, 118, 255);" :class="activeIndex == index ? 'active' : ''" 
        v-for="(item,index) in sexList" 
        :key="index" 
        @click="handleTap(index)">
        {{item.name}}
        </span></p>
      <p><span>手机号</span><input type="text"  v-model="registerData.tel" placeholder="单行输入 "></p>
      <p><span>验证码</span>
      <span style="width:35%;"><input type="text"  v-model="registerData.validateCode" style="width:75%;"></span>
      <span class="colorWhite"  @click="identifyclick" style="width:1.7rem;background-color:rgb(24, 144, 255);">{{ iptValue }}</span>
      </p>
      <p><span>电子邮箱</span><input type="text"  v-model="registerData.email" placeholder="单行输入 "></p>
      <p><span>密码</span><input type="text" v-model="registerData.password"  placeholder="单行输入 "></p>
      <p><span>确认密码</span><input type="text" v-model="registerData.rePassword"  placeholder="单行输入 "></p>
    </div>
    <p class=" center center2"  >
    <span class="radius10 color000 bcgWhite" style="background:#fff;border:1px solid #5b6b73;"> 取消</span><span class="radius10" @click="submit" style="background-color: rgb(242, 133, 18);"> 提交</span></p>
    <div class="goloign center">
      <span style="color:#000;">如果已是会员？</span>
      <span class="radius10" @click="gologin">去登录</span>
    </div>
  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { post } from '@/net/http'
import api from '@/net/api'
export default {
  name: 'order',
  data: () => {
    return {
      sexList: [
        {code:'1',name:'男'},
        {code:'2',name:'女'},
        ],
      registerData:{
        name:'',
        sex:'1',
        tel:'',
        validateCode:'',
        email:'',
        password:'',
        rePassword:'',
          
        },
      activeIndex : 0,
      iptValue: "获取验证码",
      verifyCode: "", //验证码
      num: 60,
    }
  },
  mounted() {
  },
  methods: {
     async querySendValidateCode(params) {
      try {
        const data = await post(api.querySendValidateCode, params)
        console.log(data,"data")
       
      } catch (e) {
        console.log('e', e)
      }
    },
    async queryRegister(params) {
      try {
        const data = await post(api.queryRegister, params)
      } catch (e) {
        console.log('e', e)
      }
    },
    gologin() {
      this.$router.push('/login')
    },
    handleTap(index) {
        this.activeIndex = index;  // 把当前点击元素的index，赋值给activeIndex
        console.log(index)
        if(this.activeIndex=='1'){
          this.registerData.sex='2'
        }else{
          this.registerData.sex='1'
        }
     },
    // 发送验证码
    identifyclick() {
      // if (this.registerData.tel == "" || this.registerData.tel.length != 11) {
      //   alert("请先输入正确的手机号");
      // } else {
        let data = {
          tel:this.registerData.tel
      }

          this.querySendValidateCode(data)
          this.num--;
          this.iptValue = `重新发送(${this.num})`;
          let timeID = setInterval(_ => {
            this.num--;
            this.iptValue = `重新发送(${this.num})`;
            if (this.num === 0) {
              this.iptValue = "获取验证码";
              this.num = 60;
              clearInterval(timeID);
            }
          }, 1000);
    },
    submit(){
      Object.keys(this.registerData).forEach((key)=>{
        if(this.registerData[key]==''){
          alert('填写完整信息')
          return;
        }
    })
    this.queryRegister(this.registerData)
      

    }
  }
}
</script>

<style scoped>

</style>
