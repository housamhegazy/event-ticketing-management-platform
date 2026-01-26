// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const allowedBaseUrls = import.meta.env.VITE_API_URL;
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: allowedBaseUrls,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserByName: builder.query({
      query: () => `/api/users/profile`,
      providesTags: ["User"],
    }),
    // ✅ Sign up new user
    signup: builder.mutation({
      query: (body) => ({
        url: "/api/users/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // ✅ Sign in existing user
    signin: builder.mutation({
      query: (body) => ({
        url: "/api/users/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    //signout
    signOut: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetUserByNameQuery, useSignOutMutation, useSignupMutation, useSigninMutation } =
  userApi;
