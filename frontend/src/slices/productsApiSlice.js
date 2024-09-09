import { BASE_URL, PRODUCTS_URL,UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => {
        console.log("Fetching all products from:", PRODUCTS_URL);
        return {
          url: `${BASE_URL}/${PRODUCTS_URL}`,
        };
      },
      providesTags:['Products'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => {
        const url = `${BASE_URL}/api/products/${productId}`;
        console.log("Fetching product details from:", url);
        return {
          url,
        };
      },
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: `${BASE_URL}/${PRODUCTS_URL}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query:(data) => ({
        url: `${BASE_URL}/${UPLOADS_URL}`,
        method:'POST',
        body:data,
        credentials: "include",
      })
    }),
    deleteProduct: builder.mutation({
      query:(productId) => ({
        url:  `${BASE_URL}/${PRODUCTS_URL}/${productId}`,
        method:'DELETE',
        credentials:'include'

      })
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation
} = productsApiSlice;
