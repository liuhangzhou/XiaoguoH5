<template>
  <div class="warper">
    <dining-information />
    <div class="menu">
      <category />
      <list />
    </div>
    <cart />
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'

import diningInformation from '@/components/misc/dining-information'
import category from '@/components/order/category'
import list from '@/components/order/list'
import cart from '@/components/cart'

import { get } from '@/net/http'
import api from '@/net/api'

export default {
  name: 'home',
  components: { diningInformation, category, list, cart },
  computed: {
    ...mapGetters(['list','cartProduct','categoryList']) 
  }, 
  data(){
    return {
      queryProduct: {},
      isAdd: false
    }
  },
  beforeRouteEnter (to, from, next) {
    if(from.path === '/detail') {
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.isAdd = true
      })
    }else {
      next()
    }
    
  },
  mounted() {
    if(Object.keys(this.$route.query).length && this.isAdd) {
      this.queryProduct = JSON.parse(this.$route.query.productList);
      this.addInCart()
    }
    const params = {
      // TODO
      msCode: '10001',
      tableNo: '10',
      token: '',
      lang: 'cn'
    }
    this.queryProductionList(params)
  },

  methods: {
    ...mapActions([
      'setStoreInfo',
      'setList',
      'setCategoryList',
      'setCurrentCategoryId',
      'setStoreCoupons',
      'setCatProduct'
    ]),
    async queryProductionList(params) {
      try {
        const { msCode, msName, msLogo, list, storeCoupons } = await get(
          api.queryProductionList,
          params
        )
        this.setStoreInfo({
          msCode,
          msName,
          msLogo
        })
        //
        this.setStoreCoupons(storeCoupons)
        const categoryList = []
        if(this.categoryList.length === 0) {
          this.setList(list)
          list.forEach((item, index) => {
            const { categoryId, categoryName } = item
            categoryList.push({ categoryId, categoryName })
            index === 0 && this.setCurrentCategoryId(categoryId)
          })
        }else{
          this.categoryList.forEach((item, index) => {
            const { categoryId, categoryName, count } = item
            categoryList.push({ categoryId, categoryName, count })
            index === 0 && this.setCurrentCategoryId(categoryId)
          })
        }
        this.setCategoryList(categoryList)
      } catch (e) {
        console.log('e', e)
      }
    },
    addInCart() {
      let productArray = this.cartProduct || [];
      this.list.forEach(category=> {
        category.productList.forEach(product=> {
          // 判断是否存在相同属性的商品
          let hasProduct = false;
          if(product.productId == this.queryProduct.productId) {
            this.cartProduct.forEach(cart=> {
              if(JSON.stringify(cart.attributes) === JSON.stringify(this.queryProduct.attributeList)) {
                cart.count += 1;
                productArray = this.cartProduct;
                hasProduct = true;
              }
            })
            if(!hasProduct) {
              product.attributes = this.queryProduct.attributeList
              product.count = 1;
              productArray.push(product)
            }
            this.setCatProduct(productArray)
            // 改变分类个数
            this.setCategoryCount(category.categoryId)
          }
        })
      })
    },
    setCategoryCount(categoryId) {
      let categoryList = [];
      this.categoryList.forEach((item) => {
        if (item.categoryId === categoryId) {
          if (!item.count) {
            this.$set(item, 'count', 1)
          } else {
            item.count++
          }
          categoryList = this.categoryList
        }
      })
      this.setCategoryList(categoryList)
    }
  }
}
</script>
