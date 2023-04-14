<template>
  <div class="musicList">
    <div class="musciTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="mySwipe"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: '/itemmusic', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span class="myIConCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <span>{{ changeCount(item.playCount) }}</span>
            </span>
            <span>{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { getMusicList } from "@/request/api/home.js";
import { reactive, onMounted } from "vue";
export default {
  // vue2
  //   data() {
  //     return {
  //       musicList: [],
  //     };
  //   },
  //   methods: {
  //     async getGeDan() {
  //       const res = await getMusicList();
  //       this.musicList = res.data.result;
  //       console.log(res);
  //     },
  //     changeCount(num) {
  //       if (num > 100000000) {
  //         return (num / 100000000).toFixed(1) + "亿";
  //       }
  //       if (num > 10000) {
  //         return (num / 10000).toFixed(1) + "万";
  //       }
  //     },
  //   },
  //   mounted() {
  //     this.getGeDan();
  //   },
  //   vue3
  setup() {
    const state = reactive({ musicList: [] });

    function changeCount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      }
      if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      const res = await getMusicList();
      state.musicList = res.data.result;
      //   console.log(res);
    });

    return { state, changeCount };
  },
};
</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musciTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.38rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      padding: 0 0.2rem;
      line-height: 0.6rem;
      border-radius: 0.4rem;
      //   background-color: #a39393;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    .mySwipe {
      height: 100%;
      .van-swipe-item {
        position: relative;
        margin: 0.1rem;
        img {
          width: 100%;
          height: 3rem;
          border-radius: 0.2rem;
        }
        .myIConCount {
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          color: #fff;
          //   text-align: center;
          //   height: 0.1rem;
          display: flex;
          //   flex-direction: row-reverse;
          .icon {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
