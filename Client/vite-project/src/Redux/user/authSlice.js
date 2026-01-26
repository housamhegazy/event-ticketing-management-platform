import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "./userApi"; // استيراد الـ API

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoadingAuth: true,
  error: null, // 🧠 نضيف ده
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoadingAuth = false;
    },
    clearAuthUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoadingAuth = false;
    },
    setLoadingAuth: (state, action) => {
      state.isLoadingAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ================== get user data ================
    // ⏳ لما يبدأ الطلب (قبل ما يخلص)
    builder.addMatcher(
      userApi.endpoints.getUserByName.matchPending,
      (state) => {
        state.isLoadingAuth = true;
        state.error = null; // بنصفر أي خطأ قديم
      }
    );
    // ✅ لو الطلب نجح
    builder.addMatcher(
      userApi.endpoints.getUserByName.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoadingAuth = false;
        state.error = null; // نبدأ من غير خطأ
      }
    );
    // ❌ لو الطلب فشل
    builder.addMatcher(
      userApi.endpoints.getUserByName.matchRejected,
      (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoadingAuth = false;
        state.error = action.error?.message || "حدث خطأ أثناء جلب البيانات";
      }
    );
    //signin
    builder.addMatcher(
      userApi.endpoints.signin.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoadingAuth = false;
      }
    );
    //signup
    builder
      .addMatcher(userApi.endpoints.signup.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
         state.user = action.payload;
        state.isLoadingAuth = false;
      })

      //logout
      .addMatcher(userApi.endpoints.signOut.matchFulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setAuthUser, clearAuthUser, setLoadingAuth } = authSlice.actions;
export default authSlice.reducer;