<template>
  <div class="menu-right">
    <div class="menu-right-content" ref="list" @touchstart="gtouchstart()" @touchmove="gtouchmove()" @touchend="gtouchend()" v-if="list.length">
      <div class="menu-panel" ref="panel" v-for="item in list" :key="item.categoryId">
        <div class="menu-tit" v-if="item.categoryId">
          <span></span>
          {{ item.categoryName }}
        </div>
        <ul class="menu-panel-content" v-if="item.productList.length">
          <li
            class="flex"
            v-for="product in item.productList"
            :key="product.productId"
          >
            <div
              class="goods-img"
              @click="toDetail(product.productId, product.haveAttribute)"
            >
              <img :src="product.img0" class="goods-img" alt="" />
            </div>
            <div class="goods-text">
              <p class="goods-name">{{ product.productName }}</p>
              <p class="goods-remarks">{{ product.remark }}</p>
              <p class="goods-monery">{{ product.activePrice }}</p>
            </div>
            <div
              class="minus-goods"
              @click="minusInCart(item, product)"
              v-if="product.count && product.haveAttribute === '0'"
            />
            <div class="goods-num" v-if="product.count && product.haveAttribute === '0'">
              {{ product.count }}
            </div>
            <div class="add-goods" @click="addInCart(item, product)"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'list',
  data() {
    return {
      cartFood: [],
      newCart: [],
      category: [],
      isScroll: false,
    }
  },
  computed: {
    ...mapGetters(['list', 'currentCategoryId', 'categoryList', 'cartProduct'])
  },
  watch: {
    '$store.state.currentCategoryId': {
      handler(val){
        if(!this.isScroll){
          for(let n=0;n<this.list.length;n++) {
            if(val == this.list[n].categoryId && this.$refs.panel) {
              this.$refs.list.scrollTop = this.$refs.panel[n].offsetTop - this.$refs.panel[0].offsetTop
            }
          }
        }
      },
      immediate: false,
    }
  },
  mounted(){
    
  },
  methods: {
    ...mapActions(['cartAdd', 'setCatProduct', 'setCategoryList','setCurrentCategoryId']),
    toDetail(productId, haveAttribute) {
      if (haveAttribute === '1') {
        this.$router.push({ path: '/detail', query: { productId } })
      }
    },
    gtouchstart(){
      this.isScroll = true;
      this.$refs.list.addEventListener('scroll', this.listenerScroll)
    },
    gtouchmove(){
    },
    gtouchend(){
       this.$refs.list.removeEventListener('scroll', this.listenerScroll)
       this.isScroll = false
    },
    listenerScroll() {
        for(let n=0;n<this.list.length;n++) {
          // this.$refs.list.scrollTop 必须 大于等于当前panel距离顶部的高度
          // this.$refs.list.scrollTop 必须 小于后一个panel距离顶部的高度
          if(
            this.$refs.panel[n].offsetTop - this.$refs.panel[0].offsetTop <= this.$refs.list.scrollTop 
            && this.$refs.panel[n+1].offsetTop - this.$refs.panel[0].offsetTop > this.$refs.list.scrollTop
            && this.currentCategoryId != this.list[n].categoryId
          ) {
            this.setCurrentCategoryId(this.list[n].categoryId)
            return false;
          }
        }
    },
    addInCart(item, product) {
      if (product.haveAttribute === '1') {
        this.$router.push({
          path: '/detail',
          query: { productId: product.productId }
        })
      } else {
        // console.log('进入购物车', productId)
        this.categoryList.forEach((item) => {
          if (item.categoryId === product.productId) {
            if (!item.count) {
              this.$set(item, 'count', 1)
            } else {
              item.count++
            }
            this.category = this.categoryList
          }
        })
        this.setCategoryList(this.category)
        this.cartFood = this.cartProduct || [];
        if (!product.count) {
          this.$set(product, 'count', 1)
          this.cartFood.push(product)
        } else {
          this.cartFood.forEach((v) => {
            if (v.productId === product.productId) {
              v.count++
            }
          })
        }
        this.setCatProduct(this.cartFood)
      }
    },
    minusInCart(item, product) {
        this.cartFood = this.cartProduct || [];
      this.categoryList.forEach((item) => {
        if (item.categoryId === product.productId) {
          if (!item.count) {
            this.$set(item, 'count', 1)
          } else {
            item.count--
          }
          this.category = this.categoryList
        }
      })
      this.setCategoryList(this.category)
      if (product.count === 1) {
        let index = 0;
        for(let n=0;n<this.cartFood.length;n++) {
          if(this.cartFood[n].productId === product.productId) {
            index = n;
          }
        }
        this.$set(product, 'count', 0)
        this.cartFood.splice(index,1)
      }else {
        this.cartFood.forEach((v) => {
          if (v.productId === product.productId) {
            v.count--
          }
        })
      }
      this.setCatProduct(this.cartFood)
    }
  }
}
</script>

<style scoped></style>
