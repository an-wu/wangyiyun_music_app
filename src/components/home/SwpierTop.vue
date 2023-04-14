<template>
  <div id="swipeTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
// import axios from "axios";
import {getBanners} from '@/request/api/home.js'
import { reactive, onMounted } from "vue";
export default {
  setup() {
    const state = {
      images: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    };
    onMounted(async () => {
    //   axios.get("http://localhost:3000/banner?type=2").then((res) => {
    //     // console.log(res);
    //     state.images = res.data.banners;
    //   });
       const res = await getBanners()
       state.images = res.data.banners;
    //    console.log(res);
       
    });
    return { state };
  },
};
</script>
<style lang="less">
#swipeTop {
  .van-swipe {
    width: 100%;
    // height: 3rem;
    // padding: 10px;
    .van-swipe__track {
      .van-swipe-item {
        padding: 0 0.2rem;
        img {
          width: 100%;
          height: 3rem;
          border-radius: 0.2rem;
        }
      }
    }
  }
}
.van-swipe__indicator{
    background-color:rgb(13, 118, 38)
}
</style>
