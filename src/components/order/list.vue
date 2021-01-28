<template>
  <div class="menu-right">
    <div class="menu-right-content" v-if="list.length">
      <div class="menu-panel" v-for="item in list" :key="item.categoryId">
        <div class="menu-tit" v-if="item.categoryId">
          <span>{{ item.categoryName }}</span>
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
              <p class="goods-monery">{{ product.price }}</p>
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
        console.log(product)
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
      console.log(item, product.haveAttribute)
    }
  }
}
</script>

<style scoped></style>
