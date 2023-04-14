<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登陆
        </van-button>
      </div>
    </van-form>
  </div>
  <!-- <p>登陆接口绕不过！</p> -->
  <!-- <img :src="$store.state.qrurl" alt=""> -->
</template>
<script>
import { showNotify } from 'vant';
export default {
  data() {
    return {
      phone: "15555655464",
      password: "ijknjkknj",
    };
  },
  methods: {
    async onSubmit(values) {
      console.log("submit", values);
      showNotify({ type: "danger", message: "登陆失败，原因：接口不开放" });
      // console.log(this.$store.state.unikey);
      //   this.$store.dispatch("getScodeKey");
      //   let unikey =this.$store.state.unikey
      //   console.log(unikey);
      //   this.$store.dispatch("getScode",unikey);
      //   console.log(res);
      //   const unikey = res.data.data.unikey;
      //   console.log(unikey);
      //   this.$store.dispatch("getLoginFree");
      //   this.$store.dispatch("getLogin", {
      //     phone: this.phone,
      //     password: this.password,
      //   });
    },
  },
};
</script>
<style scoped lang="less"></style>
