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
          <div class="remove-select flex" @click="showClearCartDialog">
            <img src="../assets/img/ic_del.png" alt="" class="del-icon">
            {{$t("home.qinkong")}}
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
                <p class="select-monery">{{$t('$')}}{{ item.activePrice }}</p>
              </div>
              <div class="add-remove flex flex-sc flex-vc">
                <span class="add-btn" @click="remove(item)"></span>
                <span class="add-remove-number">{{ item.count }}</span>
                <span class="remove-btn" @click="add(item)"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="settlement-tips" v-if="discount">
        {{ this.discount }}
      </div>
      <div class="settlement-zd">
        <div class="settlement-bg flex">
          <div class="settlement-cart" @click="toggleCartDetail">
            <img class="cart_icon" src="../assets/img/ic_gwc_h.png" v-if="this.cartTotal == 0" />
            <img class="cart_icon" src="../assets/img/ic_gwc.png" v-else />
            <div class="cart_num" v-if="this.cartTotal > 0">
              {{ this.cartTotal }}
            </div>
          </div>
          <div class="settlement-monery">
            <span class="totalPrice">{{ this.totalPrice }}</span> <del>{{allPrice}}</del>
          </div>
          <div class="settlement-btn" @click="toOrder" :class="{isEmpty:this.cartTotal == 0 }" >{{$t("home.quxiadan")}}</div>
        </div>

      </div>
    </div>
    <alert :show.sync="alertShow" :text="$t('home.qkgwcm')" :comfirm="comfirm" />
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
      allPrice: 0,
      coupon: {
      },
      
      username: null,
      alertShow: false,
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
    showClearCartDialog() {
      this.alertShow = true;
    },
    comfirm() {
      this.categoryList.forEach((k, index) => {
        k.count = 0
      })
      this.list.forEach(attr=>{
        attr.productList.forEach(product=>{
          product.count = 0;
        })
      })
      this.setCatProduct([])
      this.alertShow = false;
    },
    updatedCart() {
      let num = 0
      let price = 0
      for (let i = 0; i < this.cartProduct.length; i++) {
        num += Number(this.cartProduct[i].count)
        price += Number(this.cartProduct[i].activePrice) * this.cartProduct[i].count
    
      }
      this.allPrice = price.toFixed(2);
      this.totalPrice = (Math.round(price * 100) / 100).toFixed(2);
      let couponIndex = -1;
      if(this.storeCoupons.length !== 0) {
        for(let i=0;i< this.storeCoupons.length;i++){
          if(this.storeCoupons[i].leastCost <= this.totalPrice) {
            couponIndex = i;
          }
        }
        if(couponIndex !== -1 && couponIndex!=this.storeCoupons.length-1) {
          this.totalPrice = ((Math.round(this.totalPrice * 100) - Math.round(this.storeCoupons[couponIndex].reduceCost*100))/100).toFixed(2)
          this.discount = 
          this.$t('home.yijian') + this.storeCoupons[couponIndex].reduceCost + 
          this.$t('home.zaimai') + (this.storeCoupons[couponIndex+1].leastCost*100 - Math.round(this.totalPrice)*100)/100 + 
          this.$t('home.kejian') + this.storeCoupons[couponIndex+1].reduceCost + this.$t('home.kejianhou')
        }else if(couponIndex ==this.storeCoupons.length-1){
          console.log(couponIndex,this.storeCoupons)
          this.totalPrice = ((Math.round(this.totalPrice * 100) - Math.round(this.storeCoupons[couponIndex].reduceCost*100))/100).toFixed(2)
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
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  background: #e74643;
  color: #fff;
  text-align: center;
  line-height: 0.32rem;
  right: -.2rem;
  top: 0.00rem;
  font-size:.22rem;
}



.settlement {
  width: 100%;
  background: rgba(251, 250, 250, 100);
  position: fixed;
  bottom: 50px;
  left: 0;
  z-index: 100;
  border-radius: 16px 16px 0px 0px;
  overflow: hidden;
}

.settlement-tips {
  font-size: .24rem;
  color: rgba(238, 21, 21, 100);
  background: #FFF9ED;
  width: 100%;
  height: .64rem;
  line-height: .64rem;
  text-align: center;
}

.settlement-zd {
  height: 1.4rem;
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding:0 .24rem;
}
.settlement-bg {
  margin-top: .08rem;
  position: relative;
  height: 1rem;
  background: #333333;
  border-radius: .5rem;
  overflow: hidden;
}
.settlement-btn {
  width: 2.4rem;
  height: .76rem;
  margin-top: .11rem;
  border-radius: .49rem;
  background-color: rgba(247, 133, 14, 100);
  color: rgba(251, 250, 250, 100);
  font-size: .34rem;
  line-height: .78rem;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0.13rem;
  font-weight: 500;
}

.settlement-cart {
  width: .76rem;
  height: .76rem;
  position: relative;
  margin-top: .11rem;
  margin-left: 0.11rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart_icon {
  width: .76rem;
  height: .76rem;

}

.settlement-monery {
  margin-top:.04rem;
  padding-left: .36rem;
  display: flex;
}
.settlement-monery del{
  color: #fff;
  font-size: .24rem;
  display: flex;
  align-items: center;
  margin-left: .1rem;
  margin-top: .08rem;
}
.totalPrice{
  font-weight: 600;
  color: #FFFFFF;
  font-size: .4rem;
  line-height: .52rem;
  display: flex;
  align-items: center;
  height: 100%;
}
.ship-fee {
  font-size: .2rem;
  font-weight: 500;
  color: #999999;
  line-height: .28rem;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 10;
}

.select-head {
  width: 100%;
  height: 1rem;
  background-color: rgba(237, 239, 241, 100);
  padding: 0 .5rem 0 .16rem;
}

.select-number {
  font-size: .32rem;
  font-family: PingFangSC-bold;
  font-weight: 700;
  color: rgba(16, 16, 16, 100);
}

.select-number span {
  color: rgba(242, 57, 22, 100);
}


.remove-select {
  font-size: .26rem;
  color: rgba(16, 16, 16, 100);
}

.settlement-client {
  height: .8rem;
  background-color: rgba(255, 255, 255, 100);
  padding: 0 .22rem;
}

.settlement-client-name {
  font-size: .24rem;
  line-height: .8rem;
}

.settlement-client-name img {
  width: .4rem;
  height: .4rem;
  border-radius: .5rem;
  overflow: hidden;
  margin-right: .1rem;
}

.select-content {
  padding: 0 .22rem;
  background: #fff;
  max-height: 6.8rem;
  overflow-y: scroll;
}

.select-img {
  width: 1.3rem;
  height: 1.3rem;
  background: pink;
}
.select-img img{
  width: 100%;
  height: 100%;
}

.add-remove {
  color: rgba(16, 16, 16, 100);
  font-size: .28rem;
}

.select-content li {
  border-top: 1px solid rgba(231, 231, 233, 100);
  padding: .1rem 0;
}

.add-btn {
  width: .4rem;
  height: .4rem;
  border: .04rem solid #E73822;
  background: #fff;
  position: relative;
  border-radius: 50%;
}

.remove-btn {
  width: .4rem;
  height: .4rem;
  background: #E73822;
  border: .04rem solid #E73822;
  position: relative;
  border-radius: 50%;
}

.add-btn:before {
  content: "";
  width: .2rem;
  height: .04rem;
  background: #E73822;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}

.remove-btn:before {
  content: "";
  width: .2rem;
  height: .04rem;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}

.remove-btn:after {
  content: "";
  width: .04rem;
  height: .2rem;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}

.add-remove-number {
  width: .46rem;
  text-align: center;
}

.select-content .goods-text {
  margin-left: .18rem;
  width: 4.1rem;
}

.select-content .goods-name {
  margin-top: 0;
  font-size: .3rem;
  color: #333;
  line-height: .42rem;
  font-weight: 700;
  margin-bottom: .08rem;
}
.select-content .goods-remarks {
  font-size: .24rem;
  font-weight: 400;
  color: #999999;
  line-height: .3rem;
}
.select-monery {
  font-size: .28rem;
  color: #FF3B30;
  width: 1.6rem;
  font-weight:500; 
  margin-top: .12rem;
}
.del-icon{
  width: .3rem;
  height: .36rem;
  margin-right: .1rem
}
.isEmpty{
  background: #666;
  color: #999;
}
</style>
