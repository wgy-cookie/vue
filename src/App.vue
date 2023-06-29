<template>
  <div id="app">
    <router-view/>
    <!-- 底部导航栏 -->
    <div class="tabbar">
      <div class="tabbar-item" :class="{ active: activeIndex === 0 }" @click="toHome">
        <i class="icon-home"></i>
        <span>记账</span>
      </div>
      <div class="tabbar-item" :class="{ active: activeIndex === 1 }" @click="toAbout">
        <i class="icon-about"></i>
        <span>统计</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: 0 // 默认选中第一个按钮
    };
  },
  methods: {
    toHome() {
      this.activeIndex = 0;
      this.$router.push('/menu1');
    },
    toAbout() {
      this.activeIndex = 1;
      this.$router.push('/menu2');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.tabbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-decoration: none;
  color: #999;
  cursor: pointer;
  width: 50%;
  height: 100%;
  transition: background-color .2s ease-in-out;
}

.tabbar-item.active {
  font-weight: bold;
  color: #3ba272;
  background-color: #fff;
}

.tabbar-item:hover {
  background-color: #f4f4f4;
}

.icon-home,
.icon-about {
  font-size: 24px;
}
</style>
