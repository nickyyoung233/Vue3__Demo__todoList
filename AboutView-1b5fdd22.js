import { _ as t, o as s, c as n, a as e, b as o } from "./index-ee1e3d00.js";
const _ = {},
  c = { class: "about" },
  l = e("h1", null, "关于Vue Todos", -1),
  a = e(
    "p",
    null,
    [o("这是一个具备"), e("strong", null, "增删改"), o("功能的待办清单")],
    -1
  ),
  u = e(
    "p",
    null,
    [o("采用了vue3的"), e("strong", null, "Composition API"), o("特性")],
    -1
  ),
  i = e(
    "p",
    null,
    " 开发者负担不起数据库成本，利用本地缓存方式记录待办，不用担心刷新丢失，但也很容易丢失，使用时不要轻易关闭自己的浏览器😊 ",
    -1
  ),
  d = e("p", null, "点击待办即刻尝试", -1),
  r = [l, a, u, i, d];
function p(h, f) {
  return s(), n("div", c, r);
}
const x = t(_, [["render", p]]);
export { x as default };
