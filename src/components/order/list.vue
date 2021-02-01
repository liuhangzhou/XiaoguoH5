<template>
  <div class="menu-right">
    <div class="menu-right-content" v-if="list.length">
      <div class="menu-panel" v-for="item in list" :key="item.categoryId">
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
      category: []
    }
  },
  computed: {
    ...mapGetters(['list', 'currentCategoryId', 'categoryList', 'cartProduct'])
  },
  methods: {
    ...mapActions(['cartAdd', 'setCatProduct', 'setCategoryList']),
    toDetail(productId, haveAttribute) {
      if (haveAttribute === '1') {
        this.$router.push({ path: '/detail', query: { productId } })
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
