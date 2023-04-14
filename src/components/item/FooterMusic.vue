<template>
  <div class="footMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isBtnShow">
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-bofangzhong"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xinzengdaohangliebiao"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isBtnShow="isBtnShow"
        :addDuration="addDuration"
      ></MusicDetail>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import MusicDetail from "./MusicDetail.vue";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isBtnShow", "detailShow"]),
  },
  mounted() {
    console.log(this.$refs);
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration()
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        console.log("paused");

        this.$refs.audio.play();
        this.updateIsBtnShow(false);
        this.updateTime();
      } else {
        this.$refs.audio.pause();
        this.updateIsBtnShow(true);
        clearInterval(this.interVal);
      }
    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration)
    },
    ...mapMutations([
      "updateIsBtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration"
    ]),
  },
  watch: {
    playListIndex() {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsBtnShow(false);
      }
    },
    playList() {
      if (this.isBtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsBtnShow(false);
      }
    },
  },
  components: {
    MusicDetail,
  },
};
</script>
<style scoped lang="less">
.footMusic {
  background-color: #fff;
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 7px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    span {
      color: #999;
    }
  }
  .footerRight {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>
