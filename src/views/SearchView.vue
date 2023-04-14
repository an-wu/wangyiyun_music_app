<template>
  <div>
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        v-model="searchKey"
        type="text"
        placeholder="许嵩"
        @keydown.enter="enterKey"
      />
    </div>
    <div class="searchHistory">
      <span class="title">历史</span>
      <span
        class="item"
        v-for="item in keyWordList"
        :key="item"
        @click="searchHistory(item)"
      >
        {{ item }}
      </span>
      <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="content" v-for="(item, i) in searchList" :key="i">
      <div class="item">
        <div class="left" @click="searchPlay(item)">
          <span>{{ i + 1 }}</span>
          <div class="musicInfo">
            <div class="name">{{ item.name }}</div>
            <div>
              <span
                class="songer"
                v-for="(item1, index) in item.artists"
                :key="index"
              >
                {{ item1.name }}
                {{''}}
                <!-- {{ item.artists.length > 1 ? "/" : "" }} -->
              </span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="video" v-if="item.mvid != 0">
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
import { getSearchList } from "@/request/api/home.js";
export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList"))
      ? JSON.parse(localStorage.getItem("keyWordList"))
      : [];
  },
  methods: {
    async enterKey() {
      //   if
      if (this.searchKey !== "") {
        this.keyWordList.unshift(this.searchKey);
        this.keyWordList = [...new Set(this.keyWordList)];
      }

      if (this.keyWordList.length > 10) {
        this.keyWordList.splice(this.keyWordList.length - 1, 1);
      }
      let res = await getSearchList(this.searchKey);
      console.log(res);
      this.searchList = res.data.result.songs;
      this.searchKey = "";

      localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
    },
    delHistory() {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    async searchHistory(item) {
      let res = await getSearchList(item);
      console.log(res);
      this.searchList = res.data.result.songs;
    },
    searchPlay(item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>
<style scoped lang="less">
.searchTop {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  padding: 0.2rem;
  input {
    width: 90%;
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #000;
    padding: 0.1rem;
  }
}
.searchHistory {
  position: relative;
  width: 100%;
  padding: 0.2rem;
  .title {
    font-weight: 700;
  }
  .item {
    background-color: #bdabab;
    padding: 0.1rem 0.2rem;
    border-radius: 0.4rem;
    margin: 0.1rem;
    display: inline-block;
  }
  .icon {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    right: 0.1rem;
    margin-left: 0.1rem;
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
        // display: flex;
        // display: inline;
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
</style>
