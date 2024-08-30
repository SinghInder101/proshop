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

                state.cartItems = state.cartItems.map((cartItem) => 
    cartItem._id === existItem._id ? item : cartItem
);
            }
            else {
                state.cartItems = [...state.cartItems,item]

            }

            return updateCart(state);
            //Calculate price
            

        },
        removeFromCart: (state,action) =>{
            const item = action.payload;
            console.log(item);

           state.cartItems.splice(state.cartItems.indexOf(item),1);
           return updateCart(state);


        }

    }
})

export const {addToCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;