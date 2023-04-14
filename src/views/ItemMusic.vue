<template>
  <div class="itemMusic">
    <ItemMusicTop :playlist="state.playlist" />
    <ItemMusicList
      :itemList="state.musicList"
      :subscribedCount="state.playlist.subscribedCount"
    />
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getItemList, getItemMusicList } from "@/request/api/item.js";
import ItemMusicTop from "../components/item/ItemMusicTop.vue";
import ItemMusicList from "../components/item/ItemMusicList.vue";
export default {
  setup() {
    const state = reactive({
      playlist: [], //歌单详情
      musicList: [], //歌单歌曲
    });

    onMounted(async () => {
      const id = useRoute().query.id;
      //   console.log(useRoute());

      //   console.log(id);
      const res = await getItemList(id);
      // console.log(res);
      state.playlist = res.data.playlist;

      const musicList = await getItemMusicList(id);
      state.musicList = musicList.data.songs;
      console.log(musicList);

      //   console.log(state.playlist);
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });

    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
};
</script>
<style lang="less" scoped>
.itemMusic{
  height: 100%;
}
</style>