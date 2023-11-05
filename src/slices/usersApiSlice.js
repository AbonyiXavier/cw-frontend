import { apiSlice } from './apiSlice';
const USERS_URL = '/api/v1';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/register`,
        method: 'POST',
        body: data,
      }),
    }),

    fetchClient: builder.query({
      query: () => ({
        url: `${USERS_URL}/client/user/me`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchClientQuery,
} = userApiSlice;
