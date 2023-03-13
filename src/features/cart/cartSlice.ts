import { createSlice, createSelector ,PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store"
import { getMemoizedNumItems } from '../../../lessons/10-create-selector-memoized/cartSlice';

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
        }
    }
})

export const { addToCart } = cartSlice.actions;
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