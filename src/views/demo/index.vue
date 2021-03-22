<!-- demo -->
<template>
  <div class="demo-container">
    <div class="warpper">
      <h1><span> VUE H5 VANT 部分DEMO</span></h1>
      <div class="demo1 demo-line">
        <img style="width: 20px;height: 20px;" src="~@/assets/logo.png" /><span>demo1 html属性中通过别名引用资源</span>
      </div>
      <div class="demo2 demo-line"><span style="margin-left: 30px;">.demo2 css通过别名引用资源</span></div>

      <div class="demo3 demo-line"><span>css demo3 使用variabless.scss变量</span></div>

      <van-button class="demo4" type="primary" size="large" @click="gotoPath('/my?id=123')">测试点击跳转路由到我的</van-button>

      <div class="demo5 demo-line"><span>css demo5 使用minin.scss 混入css </span></div>

      <div class="demo6 demo-line"><span>css demo6 使用$cdn资源 </span></div>

      <div class="demo7 demo-line">
        <img :src="this.$cdn+'/images/logo.png'" alt="" />
        demo7 html 直接使用$cdn资源,scss 嵌套写css
      </div>

      <div>
        demo8 修改vuex状态
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
      ]
    }
  },
  activated() {
  },
  mounted() {
  },

  methods: {
  }
}
</script>
<style lang="scss" scoped>
.demo-container{
  padding: 12px;
  .demo-line{
    font-size: 20px;
    padding: 5px;
  }
}

.demo2{
  background-image: url(~@assets/logo.png);
  background-size: 20px 20px;
  background-repeat: no-repeat;
}

.demo3{
  background-color: $test-background-color;
  color: #ffffff;
}

.demo4{
  margin-top: 10px;
}

.demo5{
  @include flexbox(center);
  height:100px;
  background-color: aliceblue;
  margin-top: 20px;
}

.demo6 {
  @include flexbox(center);
  height: 60px;
  background: url($cdn+'/images/logo.png') left / contain no-repeat;
  background-size: 20px 20px;
}
.demo7{
  img{
    width: 20px;
    height: 20px;
  }
}
</style>
