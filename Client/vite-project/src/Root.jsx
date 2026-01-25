import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router";
import Navebar from "./components/navebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "./pages/loadingPage";
import { useGetUserByNameQuery } from "./Redux/user/userApi";
import {
  setAuthUser,
  clearAuthUser,
  setLoadingAuth,
} from "./Redux/user/authSlice";
const Root = () => {
  const dispatch = useDispatch();
  const { isLoadingAuth } = useSelector((state) => state.auth);
  // ====================================== تحديث حالة المصادقة بناءً على بيانات المستخدم ======================================
  // import data from api only here and update it in authslice to all website
  const {
    data: apiuser,
    isLoading: userLoading,
    isError,
  } = useGetUserByNameQuery(); // Fetch current user
  // تحديث حالة المصادقة في الـ Redux store بناءً على نتيجة الطلب
useEffect(() => {
    dispatch(setLoadingAuth(true));
    if (userLoading) return; // لسه بيجيب من السيرفر
    if (apiuser && apiuser._id) {
      dispatch(setAuthUser(apiuser));
    } else if (isError) {
      dispatch(clearAuthUser());
    }
    dispatch(setLoadingAuth(false));
  }, [apiuser, userLoading, isError, dispatch]);

  // loading whene userloading
  if (isLoadingAuth) {
    return <LoadingPage />;
  }
// ================================================================================================================

  return (
    <Box className="root" sx={{ display: "flex", flexDirection: "column" }}>
      {/* <ScrollToTop /> */}
      <Box
        sx={{
          width: "100%",
          maxWidth: `${1500}px`,
          height: "64px",
          margin: "0 auto",
          position: "sticky",
          top: "0",
          zIndex: "1000",
        }}
      >
        <Navebar />
      </Box>
      {/* عشان خاصية ال ستيكي تشتغل لازم يكون ارتفاع الكونتينر اكبر من ارتفاع البوكس الداخلي */}
      <Grid
        container
        spacing={0}
        sx={{
          width: "100%",
          maxWidth: `${1500}px`,
          margin: "0 auto",
          minHeight: `calc(100vh - 64px)`,
          flexWrap: "nowrap",
          alignItems: "stretch",
        }}
      >
        <Grid
          size={{ xs: 0, sm: 2, md: 3 }}
          sx={{
            // border: "1px solid",
            // borderColor: "divider",
            flexShrink: 0,
            position: "sticky",
            top: "64px",
            height: "100vh",
            // backgroundColor: theme.palette.background.default,
          }}
        >
          drawer
        </Grid>

        <Grid
          size={{ xs: 12, sm: 10, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            // backgroundColor: theme.palette.background.default,
            borderRight: "1px solid",
            borderLeft: "1px solid",
            borderColor: "divider",
            flexGrow: 1,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Grid>
        <Grid
          size={{ xs: 0, sm: 0, md: 3 }}
          sx={{
            position: "sticky",
            top: "64px",
            height: "100vh",
            // backgroundColor: theme.palette.background.default,
          }}
        >
          sidebar
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </Box>
  );
};

export default Root;
