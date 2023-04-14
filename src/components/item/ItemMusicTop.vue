<template>
  <div>
    <div class="itemMusicTop">
      <div class="bgimg">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </div>
    <div class="itemTopContent">
      <div class="contentLeft">
        <div class="pic">
          <img :src="playlist.coverImgUrl" alt="" />
        </div>
        <span class="myIConCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span>{{ changeCount(playlist.playCount) }}</span>
        </span>
        <!-- <div class="right"></div> -->
      </div>
      <div class="contentRight">
        <div class="title">
          {{ playlist.name }}
        </div>
        <div class="author">
          <img :src="playlist.coverImgUrl" alt="" />
          <span>{{ playlist.creator.nickname }}></span>
        </div>
        <div class="info">{{ playlist.creator.nickname }}</div>
      </div>
    </div>
    <div class="itemFootet">
      <div>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-xiaoxi-zhihui"></use>
        </svg>
        <span>{{}}40</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{}}25</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-duoxuanxuanzhong"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    // console.log(props);
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }

    function changeCount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      }
      if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  position: relative;
  .bgimg {
    width: 100%;
    height: 66rem;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    margin: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      // fill: #fff;
      // color: #fff;
    }
    span {
      font-size: 0.4rem;
      // color: #fff;
    }
  }
}
.itemTopContent {
  width: 100%;
  //   height: 4rem;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .contentLeft {
    width: 35%;
    // height: 4rem;
    position: relative;
    .pic {
      width: 100%;
      //   height: 100%;
      //   display: flex;
      //   align-items: center;
      img {
        width: 100%;
        border-radius: 0.2rem;
        // height: 100%;
      }
    }
    .myIConCount {
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      // color: #fff;
      //   text-align: center;
      //   height: 0.1rem;
      display: flex;
      //   flex-direction: row-reverse;
      .icon {
        // color: #fff;
      }
    }
  }
  .contentRight {
    width: 60%;
    // height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //   align-items: center;
    .title {
      // color: #fff;
      font-size: 0.3rem;
    }
    .author {
      // width: 80px;
      // height: 10px;
      display: flex;
      // padding: .2rem;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 0.6rem;
        border-radius: 50%;
      }
      span {
        font-size: 0.3rem;
        color: #6e6a6a;
        margin-right: 0.5rem;
      }
    }
    .info {
      color: #a29a9a;
      font-size: 0.2rem;
    }
  }
}
.itemFootet {
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
