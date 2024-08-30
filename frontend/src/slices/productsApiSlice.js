import { BASE_URL, PRODUCTS_URL } from "../constants";
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
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
