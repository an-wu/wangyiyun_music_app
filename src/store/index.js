import { createStore } from "vuex";

import { getLyricList } from "@/request/api/item";
import {
  getLogin,
  getLoginFree,
  getScodeKey,
  getScode,
} from "@/request/api/home";
getLogin;
export default createStore({
  state: {
    // 播放列表
    playList: [
      {
        al: {
          id: 126996669,
          name: "呼吸之野",
          pic: 109951168113919780,
          picUrl:
            "https://p2.music.126.net/m2PS8jiSCytmliJF27trKA==/109951168113919773.jpg",
          pic_str: "109951168113919773",
        },
        id: 1842784921,
        name: "乌鸦",
      },
    ],
    // 默认下标为0
    playListIndex: 0,
    isBtnShow: true, //暂停按钮的显示,
    detailShow: false, //详情页弹出
    lyricList: {}, //歌词
    currentTime: 0, //当前时间
    duration: 0, //歌曲总时长
    isLogin: false,
    isFooterMusic: false,
    unikey: "", // 登陆二维码key
    qrurl:'',//登陆二维码
  },
  getters: {},
  mutations: {
    updateIsBtnShow(state, value) {
      state.isBtnShow = value;
    },
    updatePlayList(state, value) {
      state.playList = value;
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList(state, value) {
      state.lyricList = value;
    },
    updateCurrentTime(state, value) {
      // console.log(state.currentTime);

      state.currentTime = value;
    },
    updateDuration(state, value) {
      state.duration = value;
    },
    pushPlayList(state, value) {
      state.playList.push(value);
    },
    updateUnikey(state, value) {
      state.unikey = value;
      // console.log(state.unikey);
    },
    updateQrurl(state,value) {
      state.qrurl = value
    } 
  },
  actions: {
    async getLyric(context, value) {
      let res = await getLyricList(value);
      // console.log(res);
      context.commit("updateLyricList", res.data.lrc);
    },
    async getLogin(context, value) {
      let res = await getLogin(value);
      console.log(res);
    },
    // 游客登陆
    async getLoginFree(context, value) {
      let res = await getLoginFree();
      // console.log(res);
    },
    async getScodeKey(context, value) {
      let res = await getScodeKey();
      context.commit("updateUnikey", res.data.data.unikey);
      // console.log(res.data.data.unikey);
    },
    async getScode(context, value) {
      console.log(value);
      let res = await getScode(value);
      console.log(res);
      this.commit('updateQrurl',res.data.data.qrurl)
    },
  },
  modules: {},
});
