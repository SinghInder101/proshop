import { BASE_URL, PRODUCTS_URL,UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (data) => {
        console.log("Fetching all products from:", data);
        return {
          url: `${PRODUCTS_URL}`,
          params:{
            pageNumber:data.pageNumber,
            keyword:data.keyword
          }
        };
      },
      providesTags:['Products'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => {
        const url = `api/products/${productId}`;
        console.log("Fetching product details from:", url);
        return {
          url,
        };
      },
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query:(data) => ({
        url: `${UPLOADS_URL}`,
        method:'POST',
        body:data,
        credentials: "include",
      })
    }),
    deleteProduct: builder.mutation({
      query:(productId) => ({
        url:  `${PRODUCTS_URL}/${productId}`,
        method:'DELETE',
        credentials:'include'

      })
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url:  `${PRODUCTS_URL}/${data.productId}/reviews`,
        method:'POST',
        body:data,
        credentials:'include',
      }),
      invalidatesTags:['Product']

    }),
    getTopProducts: builder.query({
      query:() => ({
        url:  `${PRODUCTS_URL}/top`
        
      }),
      keepUnusedDataFor:5
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productsApiSlice;
