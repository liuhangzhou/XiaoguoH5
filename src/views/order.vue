<template>
<!-- 订单详情 -->
  <div class="warper">
    <div class="details-box">
      <div class="details-zh">{{$t('home.zhuohao')}}：<span>N01</span></div>
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
                      <span v-if="attrs">{{attrs.optionName}};</span>
                    </span>  
                  </span> 
              </div>
            </div>
          </div>
          <div>
            <div class="details-monery">{{ item.price }}</div>
            <div class="details-number">x <span>{{ item.count }}</span></div>
          </div>
        </li>
        
      </ul>
      <div class="details-youhui flex flex-sc flex-vc">
        <div class="details-youhui-text flex flex-vc"><i></i>{{$t('home.mjyh')}}</div>
        <div class="details-youhui-monery" v-if="this.totalPrice >=50 ">-5.00</div>
        <div class="details-youhui-monery" v-else-if="this.totalPrice >= 100 ">-10.00</div>
      </div>
      <div class="total flex flex-sc flex-vc">
        <div class="total-text">{{$t('home.heji')}}</div>
        <div class="total-monery">{{ this.realAmount  }}</div>
      </div>
    </div>
    <div class="xiadan-footer flex flex-vc flex-hc">
      <div class="wait-btn" @click="toHome">{{$t('home.wzxx')}}</div>
      <div class="order-btn" @click="confirmOrder">{{$t('home.qrxd')}}</div>
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
      totalPrice:'',
      realAmount:'',
      list:[]
    };
  },
  computed: {
    ...mapGetters(["cartProduct", "categoryList"]),
  },
  mounted() {
      let price = 0;
      for (let i = 0; i < this.cartProduct.length; i++) {
          price += Number(this.cartProduct[i].price) * this.cartProduct[i].count;
      }
      this.realAmount =  this.totalPrice = Math.round(price * 100) / 100;
      console.log(this.totalPrice,"this.totalPrice")
      if(this.totalPrice >= 50){
        this.realAmount -= 5
      }
      if(this.totalPrice >= 100){
        this.realAmount - 100
      }
  },
  beforeUpdate() {

  },
  methods: {
    ...mapActions(["setCatProduct", "setCategoryList"]),
    async confirmPayment(params) {
        try {
          const data = await post(api.querySubmit, params)
          console.log(data,"data")

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
      this.$router.push('/orderdetail')
      // confirmOrder
    },

  }
}
function sortNumber(a,b){//升序
    return b - a
}
</script>

<style scoped>

</style>
