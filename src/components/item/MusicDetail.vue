<template>
  <div>
    <div class="detailTop">
      <img :src="musicList.al.picUrl" alt="" class="bgImg" />
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="leftMarquee">
          <Vue3Marquee style="color: #fff">{{ musicList.name }}</Vue3Marquee>
          <span v-for="item in musicList.ar">
            {{ item.name }}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow">
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="img_needle"
        :class="{ img_needle_active: !isBtnShow }"
      />
      <img src="@/assets/cd.png" alt="" class="img_cd" />
      <img
        :src="musicList.al.picUrl"
        alt=""
        class="img_ar"
        @click="isLyricShow = 'true'"
        :class="{
          img_ar_rotate_active: !isBtnShow,
          img_ar_rotate_paused: isBtnShow,
        }"
      />
    </div>
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
      <p
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lyric }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yunxiazai_o"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dengpao"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-denghao"></use>
        </svg>
      </div>
      <div class="footerContent">
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-danxunhuan"></use>
        </svg>
        <!-- 上一首 -->
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-jiantou_shangyiye"></use>
        </svg>
        <!-- 播放、暂停按钮 -->
        <svg class="iconPlay"  aria-hidden="true" @click="play" v-if="isBtnShow">
          <use xlink:href="#icon-bofang2"></use>
        </svg>
        <svg class="iconPlay" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-bofangzhong"></use>
        </svg>
        <!-- 下一首 -->
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-jiantou_xiayiye"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playlistMusic"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  props: ["musicList", "isBtnShow", "play", "addDuration"],
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
    lyric() {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lyric = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lyric = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          return { min, sec, mill, lyric, time };
          // console.log(min, sec, mill, lyric);
        });
      }
      // console.log(arr);
      arr.forEach((item, i) => {
        if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
          item.pre = 100000;
        } else {
          item.pre = arr[i + 1].time;
        }
      });
      return arr;
      // console.log(arr);
    },
  },
  mounted() {
    // console.log(this.musicList);
    this.addDuration();
  },
  components: {
    Vue3Marquee,
  },
  watch: {
    currentTime(newVal) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          // console.log([]);
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newVal === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play()
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
  methods: {
    backHome() {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay(num) {
      // console.log('22');
      console.log(this.playListIndex);
      let index = this.playListIndex + num;
      // 边界情况处理
      console.log(index);

      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
};
</script>
<style scoped lang="less">
.bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.2rem;
  height: 1rem;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        color: #999;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(19deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    position: absolute;
    bottom: 3.14rem;
    border-radius: 50%;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_rotate_active {
    animation-play-state: running;
  }
  .img_ar_rotate_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  margin-top: 0.2rem;
  p {
    color: #a09b9b;
    margin-bottom: 0.4rem;
  }
  .active {
    color: #fff;
    font-size: 0.46rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop,
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      fill: rgb(245, 234, 234);
    }
    .iconPlay {
      width: 1rem;
      height: 1rem;
      fill: rgb(245, 234, 234);
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
}
</style>
