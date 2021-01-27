<template>
<!-- 订单详情 -->
  <div class="warper">
    <div class="details-box">
      <div class="details-zh">桌号：<span>N01</span></div>
      <ul class="details-item">
        <li class="flex" v-for="item in cartProduct" :key="item.productId">
          <div class="flex">
            <div class="details-goods-img"></div>
            <div class="details-text">
              <div class="details-text-p1">{{ item.productName }}</div>
              <div class="details-text-p2">{{ item.remark }}</div>
            </div>
          </div>
          <div>
            <div class="details-monery">{{ item.price }}</div>
            <div class="details-number">x <span>{{ item.count }}</span></div>
          </div>
        </li>
        
      </ul>
      <div class="details-youhui flex flex-sc flex-vc">
        <div class="details-youhui-text flex flex-vc"><i></i>满减优惠</div>
        <div class="details-youhui-monery" v-if="this.totalPrice >=50 ">-5.00</div>
        <div class="details-youhui-monery" v-else-if="this.totalPrice >= 100 ">-10.00</div>
      </div>
      <div class="total flex flex-sc flex-vc">
        <div class="total-text">合计</div>
        <div class="total-monery">{{ this.realAmount  }}</div>
      </div>
    </div>
    <div class="xiadan-footer flex flex-vc flex-hc">
      <div class="wait-btn" @click="toHome">我再想想1</div>
      <div class="order-btn" @click="confirmOrder">确认下单</div>
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
          const data = await post(api.queryConfirm, params)
          console.log(data,"data")

        } catch (e) {
          console.log('e', e)
        }
    },
    toHome() {
      this.$router.push('/home')
    },
    confirmOrder() {
      console.log(this.cartProduct,"cartProduct")
      this.cartProduct.forEach(item => {
         let product = {
              productId:item.productId,
              selectedNum:item.count,
              attributeList:[]
         }
         this.list.push(product)
      });
      // let data = {
      //     selectedPeopleNum:'1',
      //     totalAmount:this.totalPrice,
      //     realAmount:this.realAmount,
      //     productList:''
      // }
       let data = {
          msCode: '10001',// 公共参数
          tableNo: '10',
          token: '',
          lang: 'cn',
          selectedPeopleNum:'2',//  就餐人数
          totalAmount:this.totalPrice,//总价
          realAmount:this.realAmount,//总价满减后价格
          productList:this.cartProduct,//商品json
      }

      this.confirmPayment(data)

        // this.$router.push('/orderdetail')
      // confirmOrder
    },

  }
}
</script>

<style scoped>

</style>
