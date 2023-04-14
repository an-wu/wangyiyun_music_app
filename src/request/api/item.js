import service from "..";
// 获取歌单详情
export function getItemList(id) {
  return service({
    method: "GET",
    url: `/playlist/detail?id=${id}`,
  });
}

// 获取歌单的所有歌曲
export function getItemMusicList(id) {
  return service({
    method: "GET",
    url: `/playlist/track/all?id=${id}&limit=20&offset=0`,
  });
}

// 获取歌词
export function getLyricList(data) {
  return service({
    method: "GET",
    url: `/lyric?id=${data}`,
  });
}
