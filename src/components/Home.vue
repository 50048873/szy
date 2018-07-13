<template>
  <div class="Home fullScreen">
    <nav class="nav">
      <router-link
        v-for="(item, index) in navData"
        :key="index"
        :to="item.to"
        :style="getBg(index)">
        <hui-icon-animated-water2 v-if="index === 0" />
        <hui-icon-animated-water3 v-if="index === 1" />
        <span class="title">{{item.title}}</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
const navData = [
  {
    title: '取水信息',
    to: '/water',
    svg: require('@/assets/svg/home-1.svg')
  },
  {
    title: '水源地',
    to: '/waterOrigin',
    svg: require('@/assets/svg/home-2.svg')
  }
]
export default {
  name: 'Home',
  methods: {
    initSingleDirectionData () {
      this.navData = navData
    },
    getBg (index) {
      return {
        backgroundImage: `url(${this.navData[index].svg})`
      }
    }
  },
  created () {
    this.initSingleDirectionData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .Home {
    background: url(/static/img/home-bg.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .nav {
      padding: 30px 15px;
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding: 40px 40px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        color: black;
        font-size: 24px;
        overflow: hidden;
      }
    }
    svg {
      width: 60px;
      height: 60px;
      fill: white;
    }
  }
</style>
