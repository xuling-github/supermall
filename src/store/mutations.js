import {
  ADD_COUNT,
  ADD_TO_CART

} from './mutaions-types'
export default {
    //任何修改state的操作都要经过mutations
    //mutations中的每个方法完成的事情尽量单一
    [ADD_COUNT](state, payload){
      payload.count++
    },
    [ADD_TO_CART](state, payload){
      //切换选中和不选中一定要在模型里面修改
      payload.checked = true
      state.cartList.push(payload)
    }

}
