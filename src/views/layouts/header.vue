<template>
  <div class="app-container">
    <div class="layout-content">
      <div>header layout:{{$route.meta}}</div>
      <div> <van-button onclick="javascript:void(0);">back</van-button> header</div>
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
    }
  },
  components: {
    TabBar
  },
  methods: {
  }
}
</script>
