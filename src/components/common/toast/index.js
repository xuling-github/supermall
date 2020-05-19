import Toast from "./Toast";

const obj = {}
obj.install = function (Vue) {
  //使用vue.use(插件）他会自动来插件中寻找install执行他的方法，默认带Vue实例的参数
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2.new这个构造器去创建一个组件对象
  const toast = new toastContrustor()
  //3.将组件对象手动的挂载到一个元素上面，通过$mount方法
  toast.$mount(document.createElement('div'))
  //4.这样toast.$el就是这个div了，将这个div增加到body页面中，这样就可以显示Toast组件的内容了
  document.body.appendChild(toast.$el)
  //通过Vue.prototype在vue原型中增加$toast，这样就可以在任何地方使用this.$toast使用toast的方法或内容
  Vue.prototype.$toast = toast;

}
export default obj
