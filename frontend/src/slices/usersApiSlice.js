import { BASE_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/${USERS_URL}/auth`,
                method:'POST',
                body:data,
                credentials:'include'

            }),keepUnusedDataFor: 5
            
        }),
        register: builder.mutation({
            query:(data) => ({
                url: `${BASE_URL}/${USERS_URL}`,
                method:'POST',
                body:data,
                credentials:'include'
            })


        }),
        logout: builder.mutation({
            query:() => ({
                url: `${BASE_URL}/${USERS_URL}/logout`,
                method:'POST'
    
            })
    
        }),
        profile:builder.mutation({
            query:(data) => ({
                url:`${BASE_URL}/${USERS_URL}/profile`,
                method:'PUT',
                body:data,
                credentials:'include'
            })
        })

    }),
    
});

export const { useLoginMutation,useLogoutMutation, useRegisterMutation, useProfileMutation} = usersApiSlice;
