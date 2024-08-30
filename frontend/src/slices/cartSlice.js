import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ?JSON.parse(localStorage.getItem("cart")):{cartItems:[]};
console.log(initialState);

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action) =>{
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id)
            if(existItem){
                state.cartItems = state.cartItems.map((cartItem) => {

                    if(cartItem._id === existItem._id){
                        return item;
                    }

                })
            }
            else {
                state.cartItems = [...state.cartItems,item]

            }

            return updateCart(state);
            //Calculate price
            

        }

    }
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;