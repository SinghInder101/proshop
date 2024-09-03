import { apiSlice } from "./apiSlice";

import { ORDERS_URL, BASE_URL,PAYPAL_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${BASE_URL}/${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
        credentials: "include",
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${BASE_URL}/${ORDERS_URL}/${orderId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
        query:({orderId,details}) => ({
            url: `${BASE_URL}/${ORDERS_URL}/${orderId}/pay`,
            method:"PUT",
            credentials:'include',
            body: {...details}
        })
    }),
    getPayPalClientId: builder.query({
        query:() => ({
            url:`${BASE_URL}/${PAYPAL_URL}`
        })

    })
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery} =
  orderApiSlice;
