// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const allowedBaseUrls = import.meta.env.VITE_API_URL;
// Define a service using a base URL and expected endpoints
export const createEventApi = createApi({
  reducerPath: "createEventApi",
  tagTypes: ["Event"],
  baseQuery: fetchBaseQuery({
    baseUrl: allowedBaseUrls,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // ✅ create new event
    createEvent: builder.mutation({
      query: (body) => ({
        url: "/api/events/create-event",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Event"],
    }),
    // get organizer events
    getOrganizerEvents: builder.query({
      query: () => ({
        url: "/api/events/my-events",
        method: "GET",
      }),
      providesTags: ["Event"],
    }),
    //delete event
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/api/events/delete-event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});
export const { useCreateEventMutation, useGetOrganizerEventsQuery, useDeleteEventMutation } =
  createEventApi;
