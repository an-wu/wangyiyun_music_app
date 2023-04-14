<template>
  <div class="itemMusicList">
    <div class="top">
      <div class="top-left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <div class="info">
          <div class="left">播放全部</div>
          <div class="right">({{ itemList.length }})</div>
        </div>
      </div>
      <div class="top-right">+收藏({{ changeCount(subscribedCount) }})</div>
    </div>
    <div class="content" v-for="(item, i) in itemList" :key="i">
      <div class="item" @click="playList(i)">
        <div class="left">
          <span>{{ i + 1 }}</span>
          <div class="musicInfo">
            <div class="name">{{ item.name }}</div>
            <div class="songer" v-for="(item1, index) in item.ar" :key="index">
              {{ item1.name }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="video" v-if="item.mv != 0">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang1"></use>
            </svg>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-liebiao"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive, computed } from "vue";
import { mapMutations } from "vuex";
export default {
  setup(props) {
    console.log(props.itemList);
    // console.log(itemList.data.data.songs);

    //   let itemList = reactive(props.itemList);
    //   // console.log(itemList.data);

    function changeCount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      }
      if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    //   const itemComputed = computed((itemList) => itemList)
    //   console.log(itemComputed);

    return { changeCount };
  },
  props: ["itemList", "subscribedCount"],
  methods: {
    playList(i) {
      this.updatePlayList(this.itemList);
      this.updatePlayListIndex(i)
    },
    ...mapMutations(["updatePlayList",'updatePlayListIndex']),
  },
};
</script>

<style lang="less" scoped>
.itemMusicList {
  height: 100%;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  // padding: 2px;
  .top {
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    .top-left {
      width: 48%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        // font-size: 20px;
      }
      .info {
        display: flex;
        align-items: center;
        // text-align: center;
        .left {
          font-size: 0.38rem;
          font-weight: 700;
        }
        .right {
          // width: 100%;
          font-size: 0.26rem;
          color: #a29999;
          height: 100%;
          line-height: 100%;
        }
      }
    }
    .top-right {
      // width: 40%;
      height: 100%;
      margin: 10px 0;
      background-color: red;
      border-radius: 9px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: -0.62rem;
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .video {
      // margin-left: 0;
      flex: 1;
    }
    .left {
      // width: 70%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .musicInfo {
        width: 100%;
        margin-left: 0.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .name {
          font-size: 0.3rem;
          width: 100%;
        }
        .songer {
          font-size: 0.2rem;
          color: grey;
        }
      }
    }
    .right {
      width: 23%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
}
</style>
