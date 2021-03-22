<template>
  <div class="app-container">
    <div class="layout-content">
      <div>layout:{{$route.meta}}</div>
      <div v-if="$route.meta.keepAlive" style="background-color: red;width: 100%;height: 20px;">
        keeplive={{$route.meta.keepAlive}}
      </div>
      <keep-alive v-if="true">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '首页',
          to: {
            name: 'Home'
          },
          icon: 'home-o'
        },
        {
          title: 'DevDemo',
          to: {
            name: 'DevDemo'
          },
          icon: 'label-o',
          badge: '9'
        },
        {
          title: '我的',
          to: {
            name: 'My'
          },
          icon: 'user-o'
        }
      ]
    }
  },
  components: {
    TabBar
  },
  methods: {
    handleChange(v) {
      console.log('tab change value:', v)
      this.setScrollPosition()
    }
  }
}
</script>
