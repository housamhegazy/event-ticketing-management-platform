import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root";
import Home from "./pages/home";
import ErrorPage from "./pages/ErrorPage";
import SignUpForm from "./pages/signup";
import SigninForm from "./pages/signin";
import { useSelector } from "react-redux";
import Profile from "./pages/profile";
import AdminDashboard from "./pages/admin-dashboard";
import MyEvents from "./pages/myEvents";
import CreateEvent from "./pages/createEvent";
function App() {
  const { isAuthenticated ,user } = useSelector((state) => state.auth);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: isAuthenticated ? <Home /> : <Navigate to="/signin" />,
        },
        {
          path: "/profile",
          element: isAuthenticated ? <Profile /> : <Navigate to="/signin" />,
        },
        {
          path: "/signup",
          element: !isAuthenticated ? <SignUpForm /> : <Navigate to="/" />,
        },
        {
          path: "/signin",
          element: !isAuthenticated ? <SigninForm /> : <Navigate to="/" />,
        },
        {
          path: "/admin/dashboard",
          element: isAuthenticated && user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/signin" />,
        },
        {
          path: "/organizer/events",
          element: isAuthenticated && user?.role === "organizer" ? <MyEvents /> : <Navigate to="/signin" />,
        },
        {
          path: "/organizer/create-event",
          element: isAuthenticated && user?.role === "organizer" ? <CreateEvent /> : <Navigate to="/signin" />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
