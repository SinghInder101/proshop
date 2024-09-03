import { apiSlice } from "./apiSlice";

import { ORDERS_URL,BASE_URL } from "../constants";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        createOrder:builder.mutation({
            query:(order) =>({
                url: `${BASE_URL}/${ORDERS_URL}`,
                method:'POST',
                body:{...order},
                credentials:'include'

            })
        }),
        getOrderDetails: builder.query({
            query:(orderId) => ({
                url: `${BASE_URL}/${ORDERS_URL}/${orderId}`,


            }),
            keepUnusedDataFor:5

        })
    })
})

export const {useCreateOrderMutation,useGetOrderDetailsQuery} = orderApiSlice;