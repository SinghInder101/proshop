import { BASE_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/${USERS_URL}/auth`,
                method:'POST',
                body:data,

            }),keepUnusedDataFor: 5
            
        }),
        register: builder.mutation({
            query:(data) => ({
                url: `${BASE_URL}/${USERS_URL}`,
                method:'POST',
                body:data,
            })


        }),
        logout: builder.mutation({
            query:() => ({
                url: `${BASE_URL}/${USERS_URL}/logout`,
                method:'POST'
    
            })
    
        })

    }),
    
});

export const { useLoginMutation,useLogoutMutation, useRegisterMutation} = usersApiSlice;
