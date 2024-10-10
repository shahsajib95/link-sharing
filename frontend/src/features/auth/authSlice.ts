// src/features/auth/authSlice.ts

import { UserRespone , Links} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;

  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  user: UserRespone | null;
  links: any;
  name: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: { src: any; type: string };
  };
}
export interface ErrorTypes {
  response: { data: string };
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  user: null,
  links: [],
  name: {
    firstName: "",
    lastName: "",
    email: "",
    avatar: { src: "", type: "" },
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }: PayloadAction<UserRespone>) => {
      state.isLoggedIn = true;
      state.user = payload;
      // state.token = payload
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    getLinks(state, action: PayloadAction<Links>) {
      state.links = action.payload;
    },
    getName(
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
        avatar: { src: any; type: string };
      }>,
    ) {

      state.name = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(signIn.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       signIn.fulfilled,
  //       (state, action: PayloadAction<{ user: any; token: string }>) => {
  //         state.isAuthenticated = true;
  //         state.user = action.payload.user;
  //         state.token = action.payload.token;
  //         state.loading = false;
  //         state.error = null;
  //       },
  //     )
  //     .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(logout.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //       state.isAuthenticated = false;
  //       state.user = null;
  //       state.token = null;
  //       state.loading = false;
  //       state.error = null;
  //     })
  //     .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });

  // },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
