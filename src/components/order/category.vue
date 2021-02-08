<template>
  <div class="menu-left">
    <ul v-if="categoryList.length">
      <li
        v-for="category in categoryList"
        :key="category.categoryId"
        :class="category.categoryId === currentCategoryId && 'current'"
        @click="toggleCategory(category.categoryId)"
      >
        {{ category.categoryName }}
        <div class="cart_num" v-if="category.count > 0">
          {{ category.count }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'category',
  data: () => {
    return {
      sideMenu: ''
    }
  },
  computed: {
    ...mapGetters(['categoryList', 'currentCategoryId', 'categoryNum'])
  },
  mounted() {
    
  },
  beforeUpdate() {},
  methods: {
    ...mapActions(['setCurrentCategoryId']),
    toggleCategory(categoryId) {
      this.setCurrentCategoryId(categoryId)
    }
  }
}
</script>

<style scoped>
.cart_num {
  position: absolute;
  content: '';
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: #e74643;
  color: #fff;
  text-align: center;
  line-height: 0.35rem;
  right: 0.08rem;
  top: 0.12rem;
}

.menu-left {
  width: 25%;
  height: 100%;
  overflow: hidden;
  float: left;
}

.menu-left ul {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 2rem;
  background: #f1f1f1;
}

.menu-left li {
  position: relative;
  width:100%;
  height: 1rem;
  font-size: .28rem;
  color: rgba(55, 55, 55, 100);
  line-height: 1rem;
  background: #f1f1f1;
  text-align: center;
  font-weight: 500;
}

.menu-left li.current {
  color: #f37b1d;
  background: #fff;
  position: relative;
}

</style>
