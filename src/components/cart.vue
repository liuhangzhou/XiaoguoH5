<template>
  <div>
    <div class="mask" v-show="showCart" @click.stop="showCart=false"></div>
    <div class="settlement">
      <div class="select-settlement" v-show="showCart">
        <div class="select-head flex flex-sc flex-vc">
          <div class="select-number">
            Cart(<span>{{ cartProduct? cartProduct.length : '' }}</span
            >)
          </div>
          <div class="remove-select" @click="clearCart">{{$t("home.qinkong")}}</div>
        </div>
        <div class="settlement-client">
          <div class="settlement-client-name flex flex-vc">
            <img src="../assets/img/ic_user.png" alt="" srcset="">
            {{username}}
          </div>
        </div>
        <div class="select-content">
          <ul>
            <li
              class="flex flex-vc"
              v-for="(item,index) in cartProduct"
              :key="index"
            >
              <div class="select-img">
                <img :src="item.img0" alt="">
              </div>
              <div class="goods-text">
                <p class="goods-name">{{ item.productName }}</p>
                <p class="goods-remarks" v-if="item.haveAttribute == 0">
                  {{ item.remark }}
                </p>
                <p class="goods-remarks"  v-else>
                  <span v-for="attr in item.attributes" :key="attr.id">
                    <span v-for="(attrs,index) in attr.optionList" :key="index">
                      <span v-if="attrs">{{attrs.optionName}};</span>
                    </span>  
                  </span> 
                </p>
              </div>
              <div class="select-monery">{{ item.activePrice }}</div>
              <div class="add-remove flex flex-sc flex-vc">
                <span class="add-btn" @click="remove(item)"></span>
                <span class="add-remove-number">{{ item.count }}</span>
                <span class="remove-btn" @click="add(item)"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="settlement-tips" v-if="this.discount">
        {{ this.discount }}
      </div>
      <div class="settlement-zd">
        <div class="settlement-cart" @click="toggleCartDetail">
          <img class="cart_icon" src="../assets/img/购物车.png" />
          <div class="cart_num" v-if="this.cartTotal > 0">
            {{ this.cartTotal }}
          </div>
        </div>
        <div class="settlement-monery">{{ this.totalPrice }}</div>
        <div class="settlement-btn" @click="toOrder" >{{$t("home.quxiadan")}}</div>
      </div>
    </div>
    <alert :show.sync="alertShow" :text="$t('home.xzsp')" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'cart',

  data: () => {
    return {
      showCart: false,
      cartTotal: '',
      totalPrice: '',
      discount: null, //再买
      coupon: {
      },
      
      username: null,
      alertShow: false
    }
  },
  computed: {
    ...mapGetters(['cartProduct', 'categoryList','storeCoupons', 'list'])
  },
  beforeUpdate() {
    this.updatedCart()
  },
  mounted() {
    this.username = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).name : '未登录'
    this.updatedCart()
  },
  methods: {
    ...mapActions(['setCatProduct', 'setCategoryList']),
    clearCart() {
      this.categoryList.forEach((k, index) => {
        k.count = 0
      })
      this.list.forEach(attr=>{
        attr.productList.forEach(product=>{
          product.count = 0;
        })
      })
      // console.log(this.cartProduct, 'this.cartProduct')
      this.setCatProduct([])
      // this.cartProduct.forEach((v, index) => {
      //   console.log(v, 'vvvvvvvvvv')
      //   v.count = 0
      // })
    },
    updatedCart() {
      let num = 0
      let price = 0
      for (let i = 0; i < this.cartProduct.length; i++) {
        num += Number(this.cartProduct[i].count)
        price += Number(this.cartProduct[i].activePrice) * this.cartProduct[i].count
      }
      this.totalPrice = Math.round(price * 100) / 100
      let couponIndex = -1;
      if(this.storeCoupons.length !== 0) {
        for(let i=0;i< this.storeCoupons.length;i++){
          if(this.storeCoupons[i].leastCost < this.totalPrice) {
            couponIndex = i;
          }
        }
        if(couponIndex !== -1 && couponIndex!=this.storeCoupons.length-1) {
          this.totalPrice = (Math.round(this.totalPrice * 100) - Math.round(this.storeCoupons[couponIndex].reduceCost*100))/100
          this.discount = 
          this.$t('home.yijian') + this.storeCoupons[couponIndex].reduceCost + 
          this.$t('home.zaimai') + (this.storeCoupons[couponIndex+1].leastCost*100 - Math.round(this.totalPrice)*100)/100 + 
          this.$t('home.kejian') + this.storeCoupons[couponIndex+1].reduceCost + this.$t('home.kejianhou')
        }else if(couponIndex ==this.storeCoupons.length-1){
          this.discount = 
          this.$t('home.yijian') + this.storeCoupons[couponIndex].reduceCost 
        }else {
          this.discount = 
          this.$t('home.yijian') + 0 + 
          this.$t('home.zaimai') + (this.storeCoupons[couponIndex+1].leastCost*100 - Math.round(this.totalPrice)*100)/100 + 
          this.$t('home.kejian') + this.storeCoupons[couponIndex+1].reduceCost + this.$t('home.kejianhou')
        }
      }
      
      this.cartTotal = num
    },
    toggleCartDetail() {
      this.showCart = !this.showCart
    },
    toOrder() {
      if(this.cartProduct.length <= 0) {
        this.alertShow = true;
        return false;
      }
      this.$router.push('/order')
    },
    getCategoryId(productId) {
      let categoryId = null;
      this.list.forEach(category=> {
        category.productList.forEach(goods=>{
          if(goods.productId == productId) {
            categoryId = category.categoryId;
          }
        })
      })
      console.log(categoryId)
      return categoryId;
    },
    remove(item) {
      let productId = item.productId

      let categoryId = this.getCategoryId(productId)
      this.cartProduct.forEach((v, index) => {
        if (v.productId === productId && JSON.stringify(v.attributes) === JSON.stringify(item.attributes)) {
          v.count--
          if (v.count == 0) {
            this.cartProduct.splice(index, 1)
          }
          this.categoryList.forEach((k, index) => {
            if (k.categoryId === categoryId) {
              k.count--
            }
          })
        }
        
      })
      this.updatedCart()
    },
    add(item) {
      let productId = item.productId
      let categoryId = this.getCategoryId(productId)
      this.cartProduct.forEach((v) => {
        if (v.productId === productId && JSON.stringify(v.attributes) === JSON.stringify(item.attributes)) {
          v.count++
          this.categoryList.forEach((k, index) => {
            if (k.categoryId === categoryId) {
              k.count++
            }
          })
        }
      })
      this.updatedCart()
    }
  }
}
</script>

<style scoped>
.cart_num {
  position: absolute;
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #e74643;
  color: #fff;
  text-align: center;
  line-height: 0.5rem;
  right: 0.05rem;
  top: 0.05rem;
  font-size:22px;
}
</style>
