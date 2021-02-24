<template>
<!-- 订单详情 -->
  <div class="warper">
    <div class="details-zh2">{{$t('home.zhuohao')}}：<span>{{tableNo}}</span></div>
    <div class="details-box">
      <ul class="details-item">
        <li class="flex" v-for="(item,index) in cartProduct" :key="index">
          <div class="flex">
            <div class="details-goods-img">
              <img :src="item.img0" alt="">
            </div>
            <div class="details-text">
              <div class="details-text-p1">{{ item.productName }}</div>
              <div class="details-text-p2" v-if="item.haveAttribute ==0">
                {{ item.remark }}
              </div>
              <div class="details-text-p2" v-else>
                <span v-for="attr in item.attributes" :key="attr.id">
                  <span v-for="(attrs,index) in attr.optionList" :key="index">
                    <span v-if="attrs">{{attrs.optionName}}<span v-if="index < attr.optionList.length-2">/</span></span>
                  </span>
                </span>
              </div>
              <div class="details-text-p2">x <span>{{ item.count }}</span></div>
            </div>
          </div>
          <div>
            <div class="details-monery">{{ item.activePrice }}</div>
          </div>
        </li>
        
      </ul>
      <div class="details-youhui flex flex-sc flex-vc">
        <div class="details-youhui-text flex flex-vc">
          <img
          class="favourable-icon"
          src="../assets/img/ic_coupons.png"
          alt=""
          >
          {{$t('home.mjyh')}}
        </div>
        <div class="details-youhui-monery">
          -<span v-if="couponIndex !== -1">{{storeCoupons[couponIndex].reduceCost}}</span><span v-else>0</span>
        </div>
      </div>
      <div class="total flex flex-sc flex-vc">
        <div class="total-text">{{$t('home.heji')}}</div>
        <div class="total-monery">{{ this.realAmount  }}
        </div>
      </div>
    </div>
    <div class="settlement">
      <div class="settlement-zd">
        <div class="settlement-bg flex">
          <div class="settlement-btn settlement-btn-left" @click="toHome()">{{$t("home.wzxx")}}</div>
          <div class="settlement-btn" @click="confirmOrder()">{{$t("home.qrxd")}}</div>
        </div>
      </div>
    </div>
    <!-- <div class="xiadan-footer flex flex-vc flex-hc">
      <div class="wait-btn" @click="toHome">{{$t('home.wzxx')}}</div>
      <div class="order-btn" @click="confirmOrder">{{$t('home.qrxd')}}</div>
    </div> -->
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
      totalPrice:'',
      realAmount:'',
      list:[],
      couponIndex: -1,
      tableNo: sessionStorage.getItem('tableNo')
    };
  },
  computed: {
    ...mapGetters(["cartProduct", "categoryList", "storeCoupons"]),
  },
  mounted() {
      let price = 0;
      for (let i = 0; i < this.cartProduct.length; i++) {
          price += Number(this.cartProduct[i].activePrice) * this.cartProduct[i].count;
      }
      this.realAmount =  (this.totalPrice = Math.round(price * 100) / 100).toFixed(2);
      console.log(this.totalPrice,"this.totalPrice")
      for(let i=0;i< this.storeCoupons.length;i++){
        if(this.storeCoupons[i].leastCost < this.totalPrice) {
          this.couponIndex = i;
        }
      }
      if(this.couponIndex !== -1) {
        this.realAmount -= this.storeCoupons[this.couponIndex].reduceCost
        this.realAmount = this.realAmount.toFixed(2)
        // this.discount = 
        // this.$t('home.yijian') + this.storeCoupons[couponIndex].reduceCost + 
        // this.$t('home.zaimai') + (this.storeCoupons[couponIndex+1].leastCost-this.totalPrice) + 
        // this.$t('home.kejian') + this.storeCoupons[couponIndex+1].reduceCost + this.$t('home.kejianhou')
      }


      
  },
  beforeUpdate() {

  },
  methods: {
    ...mapActions(["setCatProduct", "setCategoryList"]),
    async confirmPayment(params) {
        try {
          const data = await post(api.querySubmit, params)
          if(data){
            this.$router.push('/orderdetail')
          }
        } catch (e) {
          console.log('e', e)
        }
    },
    toHome() {
      this.$router.push('/home')
    },
    confirmOrder() {
       this.cartProduct.forEach(item => {
         let product = {
              productId:item.productId,
              selectedNum:item.count,
              attributeList:[]
         }
         this.list.push(product)
      });
      let cartProductArr = [];
      this.cartProduct.forEach(product=>{
        if(product.attributes !== undefined){
          for(let n=0;n<product.attributes.length;n++) {
            let isNull = []
            for(let i=0;i<product.attributes[n].optionList.length;i++) {
              if(product.attributes[n].optionList[i] === null) {
                isNull.push(i)
              }
            }
            isNull.sort(sortNumber)
            isNull.forEach(index=>{
              product.attributes[n].optionList.splice(index,1)
            })
          }
        }
        let list = {
          productId: product.productId,
          selectedNum: product.count,
          attributeList: product.attributes,
        };
        cartProductArr.push(list);
      })
      let data = {
          msCode: '10001',// 公共参数
          tableNo: '10',
//           token: '',
          lang: 'cn',
          selectedPeopleNum:'2',//  就餐人数
          totalAmount:this.totalPrice,//总价
          realAmount:this.realAmount,//总价满减后价格
          productList:JSON.stringify(cartProductArr),//商品json
      }
      this.confirmPayment(data)
    },

  }
}
function sortNumber(a,b){//升序
    return b - a
}
</script>

<style scoped>
.details-item li{
  display: flex;
  justify-content: space-between;
}
.settlement-btn{
  width: 50%;
  height: 100%;
  position: relative;
  line-height: 1rem;
  border-radius:0;
  margin-top: 0;
  right: 0;
}
.settlement-btn-left{
  background: #333333;
}
.favourable-icon{
  width: .32rem;
  height: .32rem  ;
}
</style>
