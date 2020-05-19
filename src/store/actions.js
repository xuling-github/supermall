import {
  ADD_COUNT,
  ADD_TO_CART

} from './mutaions-types'
export default {
    addCart(context,payload){
      return new Promise((resolve, reject) =>
        {

      //判断当前购物车中是否有新添加的商品
      //1.遍历
      // let oldProduct = null;
      // for(let item of state.cartList){
      //   if (item.iid === payload.iid){
      //     oldProduct = item;
      //   }
      // }
      //2.用数组的find方法查找，如果条件满足的话就把item赋值给oldProduct
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //判断oldproduct
      if(oldProduct){
        //如果有的话他的数量+1
        //oldProduct.count += 1
        context.commit(ADD_COUNT, oldProduct)
        resolve('添加的商品数量+1')
      }else{
        //没有的话他的数量等于1
        payload.count = 1
        //state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新商品')

      }
    }

      )

    }
}
