// 封装首页需要的网络请求
//先导入
import {request} from "./request";
//获取首页轮播图数据
export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  })
}

//获取首页商品数据
export function getHomeGoods(type,page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page
    }
  })
}
