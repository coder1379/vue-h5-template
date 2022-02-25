<!-- page name -->
<template>
  <div class="full-screen-page">
    <div class="full-header">
      <van-icon name="arrow-left" />
    </div>
    <div class="full-content">
      <div>登录</div>
      <div>还没有账户，立即注册</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" color="linear-gradient(to right, #1989fa, #2299fa)" native-type="submit">提交</van-button>
        </div>
      </van-form>
      <a>验证码登录</a>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
  }
}
</script>
<style lang="scss" scoped>
.full-screen-page{
  background-color: #ffffff;
}
</style>
