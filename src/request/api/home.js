import service from "..";

// 获取轮播图数据
export function getBanners() {
  return service({
    method: "GET",
    url: "/banner?type=2",
  });
}
// 获取发现好歌单
export function getMusicList() {
  return service({
    method: "GET",
    url: "/personalized?limit=10",
  });
}
// 搜索
export function getSearchList(data) {
  return service({
    method: "GET",
    url: `/search?keywords=${data}`,
  });
}
// 登陆
export function getLogin(data) {
  return service({
    method: "GET",
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
  });
}
// /register/anonimous 游客登陆

export function getLoginFree(data) {
  return service({
    method: "GET",
    url: `/register/anonimous`,
  });
}
// 二维码key
export function getScodeKey() {
  return service({
    method: "GET",
    url: `/login/qr/key`,
  });
}
// 生成二维码
export function getScode(data) {
  return service({
    method: "GET",
    url: `/login/qr/create?key=${data}`,
  });
}
