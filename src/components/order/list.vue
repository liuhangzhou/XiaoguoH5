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
              <p class="goods-remarks">月售100</p>
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
    getCategoryId(productId) {
      let categoryId = null;
      this.list.forEach(category=> {
        category.productList.forEach(goods=>{
          if(goods.productId == productId) {
            categoryId = category.categoryId;
          }
        })
      })
      return categoryId;
    },
    addInCart(item, product) {
      if (product.haveAttribute === '1') {
        this.$router.push({
          path: '/detail',
          query: { productId: product.productId }
        })
      } else {
        // console.log('进入购物车', productId)
        let categoryId = this.getCategoryId(product.productId)
        console.log(categoryId)
        this.categoryList.forEach((item) => {
          if (item.categoryId === categoryId) {
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
      let categoryId = this.getCategoryId(product.productId)
      this.categoryList.forEach((item) => {
        if (item.categoryId === categoryId) {
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

<style scoped>

.menu-right {
  float: right;
  width: 75%;
  height: 100%;
}

.menu-right-content {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  padding-bottom: 2.1rem;
}

.goods-img {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: .16rem;
  overflow: hidden;
  font-size: 0;
}

.goods-name {
  font-size: .3rem;
  color: #000;
  line-height: .4rem;
  margin-top: .08rem;
  font-weight: 500;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1; 
}

.goods-remarks {
  font-size: .24rem;
  color: #666;
  line-height: .34rem;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1; 
}

.goods-monery {
  font-size: .28rem;
  color: rgba(242, 57, 22, 100);
  line-height: .4rem;
  font-weight: 700;
}

.goods-text {
  margin-left: .24rem;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  justify-content: space-between;
  width: 3.6rem;
}

.menu-panel {
  margin-top: .28rem;
}

.menu-right .menu-panel:first-child {
  margin-top: 0;
}

.menu-panel-content li {
  position: relative;
  padding:.13rem  0 ;
  padding-left: .2rem;
}

.goods-num{
  width: .4rem;
  height: .44rem;
  overflow: hidden;
  position: absolute;
  text-align: center;
  right: 0.7rem;
  line-height: .44rem;
  font-size: .4rem;
  bottom: .2rem;
}
.minus-goods {
  width: .44rem;
  height: .44rem;
  background: #F28512;
  border-radius: .25rem;
  overflow: hidden;
  position: absolute;
  bottom: .2rem;
  right: 1.1rem;
}
.minus-goods:before {
  content: "";
  width: .3rem;
  height: .04rem;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.add-goods {
  width: .44rem;
  height: .44rem;
  background: #F28512;
  border-radius: .25rem;
  overflow: hidden;
  position: absolute;
  bottom: .2rem;
  right: .26rem;
}

.add-goods:before {
  content: "";
  width: .04rem;
  height: .3rem;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}

.add-goods:after {
  content: "";
  width: .3rem;
  height: .04rem;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.menu-tit {
  font-size: .28rem;
  min-height: 1rem;
  color: #666;
  display: flex;
  align-items: center;
  padding:0 .2rem;
  font-weight: 500;
}

</style>
