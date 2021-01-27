<template>
  <div class="menu-left">
    <ul v-if="categoryList.length">
      <li v-for="category in categoryList"
          :key="category.categoryId"
          :class="category.categoryId === currentCategoryId && 'current'"
          @click="toggleCategory(category.categoryId)"
      >{{ category.categoryName }}
        <div class="cart_num" v-if=" category.count > 0 ">{{ category.count }}</div>
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
       sideMenu:''
    };
  },
  computed: {
    ...mapGetters(['categoryList', 'currentCategoryId','categoryNum'])
  },
  beforeUpdate() {
   
  },
  methods: {
    ...mapActions(['setCurrentCategoryId']),
    toggleCategory (categoryId){
      console.log(this.categoryList,"categoryList")
        this.setCurrentCategoryId(categoryId)
    }
  }
}
</script>

<style scoped>
   .cart_num{
     position: absolute;
     content: "";
     width:0.35rem;
     height:0.35rem;
     border-radius: 50%;
     background:#E74643;
     color: #fff;
     text-align: center;
     line-height:0.35rem;
     right: 0;
     top: 0;
  }
</style>
