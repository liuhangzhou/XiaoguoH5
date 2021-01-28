<template>
  <div>
    <div class="mask" v-show="showCart"></div>
    <div class="settlement">
      <div class="select-settlement" v-show="showCart">
        <div class="select-head flex flex-sc flex-vc">
          <div class="select-number">
            Cart(<span>{{ cartProduct? cartProduct.length : '' }}</span
            >)
          </div>
          <div class="remove-select" @click="clearCart">清空</div>
        </div>
        <div class="settlement-client">
          <div class="settlement-client-name flex flex-vc"><i></i>小叮当</div>
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
                <p class="goods-remarks" v-if="item.haveAttribute">
                  <span v-for="(attr,index) in item.attributes" :key="attr.id">{{attr.optionName}} <span v-if="index < item.attributes.length-1">/</span></span> 
                </p>
                <p class="goods-remarks"  v-else>{{ item.remark }}</p>
              </div>
              <div class="select-monery">{{ item.price }}</div>
              <div class="add-remove flex flex-sc flex-vc">
                <span class="add-btn" @click="remove(item.productId)"></span>
                <span class="add-remove-number">{{ item.count }}</span>
                <span class="remove-btn" @click="add(item.productId)"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="settlement-tips" v-if="this.discount > 0">
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
        <div class="settlement-btn" @click="toOrder">去下单</div>
      </div>
    </div>
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
      discount: 0
    }
  },
  computed: {
    ...mapGetters(['cartProduct', 'categoryList'])
  },
  beforeUpdate() {
    console.log(this.cartProduct, 'cartProduct')
    this.updatedCart()
  },
  mounted() {
    this.updatedCart()
  },
  methods: {
    ...mapActions(['setCatProduct', 'setCategoryList']),
    clearCart() {
      this.categoryList.forEach((k, index) => {
        k.count = 0
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
        price += Number(this.cartProduct[i].price) * this.cartProduct[i].count
      }
      this.totalPrice = Math.round(price * 100) / 100
      if (this.totalPrice >= 50 && this.totalPrice <= 100) {
        this.totalPrice - 5
      }
      if (this.totalPrice >= 100) {
        this.totalPrice - 10
      }
      if (this.totalPrice >= 50) {
        this.discount =
          '已减5元,再买' + Number(100 - this.totalPrice) + '可减10元'
      }
      this.cartTotal = num
    },
    toggleCartDetail() {
      this.showCart = !this.showCart
    },
    toOrder() {
      this.$router.push('/order')
    },
    remove(productId) {
      this.cartProduct.forEach((v, index) => {
        if (v.productId === productId) {
          v.count--
          if (v.count == 0) {
            this.cartProduct.splice(index, 1)
          }
          this.categoryList.forEach((k, index) => {
            if (k.categoryId === productId) {
              k.count--
            }
          })
        }
        
      })
      this.updatedCart()
    },
    add(productId) {
      this.cartProduct.forEach((v) => {
        if (v.productId === productId) {
          console.log(v)
          v.count++
          this.categoryList.forEach((k, index) => {
            if (k.categoryId === productId) {
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
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: #e74643;
  color: #fff;
  text-align: center;
  line-height: 0.7rem;
  right: 0;
  font-size: 30px;
}
</style>
