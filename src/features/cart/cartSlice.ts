import { createSlice, createSelector ,PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store"
import { getMemoizedNumItems } from '../../../lessons/10-create-selector-memoized/cartSlice';
import { Products } from '../products/Products';

export interface CartState {
    items: {[productID: string]: number}
}

const initialState: CartState = { 
    items:{} 
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state, action: PayloadAction<string>){
            const id = action.payload
            if(state.items[id]){
                state.items[id]++
            } else {
                state.items[id] = 1
            }
        },
        removeFromCart(state, action: PayloadAction<string>){
            delete state.items[action.payload]
        },
        updateQuantity(state, action: PayloadAction<{id:string, quantity:number}>){
            const {id, quantity} = action.payload
            state.items[id] = quantity
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export function getNumItems(state: RootState){

    console.log("getNumItems",)
    let numItems = 0

    for( let id in state.cart.items ){
        numItems += state.cart.items[id]
    }

    return numItems
}

export const getMemoizedNumItems = createSelector(
    
    (state: RootState) => state.cart.items,
    (items) => {
        console.log("getMemoizedNumItems")
        let numItems = 0
        for(let id in items) {
            numItems += items[id]
        }
        return numItems
    }
) 

// export const getTotalPrice = createSelector <RootState, any, any, string>(
//     (state) => state.cart.items,
//     (state) => state.products.products,
//     (items, products) => {
//         let total = 0;
//         for (let id in items){
//             total += products[id].price * items[id]
//         }
//         return total.toFixed(2)
//     }
// )

export const getTotalPrice = createSelector(
    (state: RootState) => state.cart.items,
    (state: RootState) => state.products.products,
    (items, products) => {
        let total = 0;
        for (let id in items){
            total += products[id].price * items[id]
        }
        return total.toFixed(2)
    }
)