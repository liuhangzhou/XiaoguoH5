<template>
  <div>
    <div
      class="food-select-panel"
      v-for="info in detailInformation.attributeList"
      :key="info.id"
    >
      <div class="food-select-head">{{ info.name }}</div>
      <div class="food-select-content" v-if="info.optionList.length">
        <ul class="flex flex-vc flex-sc">
          <li
            :class="{ current: 1 }"
            v-for="option in info.optionList"
            :key="option.id"
          >
            {{ option.optionName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'cuisine',
  computed: {
    ...mapGetters(['detailInformation'])
  }
}
</script>

<style scoped>

.food-select-head {
  width: 100%;
  height: .72rem;
  background-color: rgba(237, 239, 241, 100);
  padding-left: .68rem;
  position: relative;
  color: rgba(16, 16, 16, 100);
  font-size: .28rem;
  line-height: .72rem;
}

.food-select-head:before {
  content: "";
  width: 1px;
  height: .4rem;
  background: #F28512;
  position: absolute;
  left: .38rem;
  top: 50%;
  margin-top: -.2rem;
}

.food-select-content ul {
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  padding: .2rem .7rem .04rem;
}

.food-select-content li {
  min-width: 2.6rem;
  height: .48rem;
  border-radius: 4px;
  border: 1px solid rgba(187, 187, 187, 83);
  color: rgba(16, 16, 16, 100);
  font-size: .28rem;
  text-align: center;
  margin-bottom: .16rem;
  background: #fff;
  padding: 0 .06rem;
}

.food-select-content.tea li {
  min-width: 1.68rem;
}

.food-select-content li.current {
  background-color: rgba(249, 172, 102, 82);
  border: 1px solid rgba(242, 133, 18, 87);
}
.food-select-content li.isDisabled {
  background-color: #E4E7ED;
  border: 1px solid #E4E7ED;
}
.food-select-content li span {
  color: #EE1515;
}
</style>
