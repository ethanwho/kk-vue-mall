import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 判断新添加的商品是否已存在
            // let oldProduct = null
            // for(let item of state.cartList) {
            //     if(payload.iid === item.iid) {
            //         oldProduct = item
            //         break
            //     }
            // }
            //除了上面的for of, 也可以直接使用数组的find方法, 该方法中的回调函数为true就会直接返回遍历到的这个item
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            if(oldProduct) {
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前商品数量+1')
            }else{
                payload.count = 1   //在这里给购物车不存在的商品添加一个count属性
                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新商品')
            }
        })
    }
}