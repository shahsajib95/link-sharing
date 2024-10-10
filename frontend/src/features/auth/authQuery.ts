import API from "@/store/services/api";
import { SignInPayload, SignUpPayload } from "@/types/auth";

const authQuery = API.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user: SignUpPayload) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      transformResponse: (response: SignUpPayload) => response,
      transformErrorResponse: ({ data }: any) => data,
    }),
    signIn: builder.mutation({
      query: (user: SignInPayload) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;
      //     localStorage.setItem(
      //       "auth",
      //       JSON.stringify({
      //         accessToken: result.data.accessToken,
      //         user: result.data.user,
      //       })
      //     );
      //     dispatch(
      //       userLoggedIn({
      //         accessToken: result.data.accessToken,
      //         user: result.data.user,
      //       })
      //     );
      //   } catch (err) {
      //     // do nothing
      //   }
      // },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),

    getSingleUser: builder.query({
      query: ({ id }) => `/auth/user/${id}`,
    }),
    getPrevieweUser: builder.query({
      query: ({ id }) => `/auth/preview/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/auth/user/${id}`,
        method: "PATCH",
        formData: true,
        body: data,
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useSignupMutation,
  useSignInMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useGetPrevieweUserQuery
} = authQuery;

export const { endpoints: signin } = authQuery;

export default authQuery;
