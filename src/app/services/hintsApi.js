import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = import.meta.env.VITE_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Token ${token}`,
};

export const hintsApi = createApi({
  reducerPath: "hintsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    postHints: builder.mutation({
      query: (payload) => ({
        url: `/suggest/party`,
        method: "POST",
        headers,
        body: payload,
      }),
    }),
  }),
});

export const { usePostHintsMutation } = hintsApi;
