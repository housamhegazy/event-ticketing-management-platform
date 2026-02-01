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
import MyEvents from "./pages/myEvents";
import CreateEvent from "./pages/createEvent";
import EventDetails from "./pages/myEvents/eventDetails";
import EditEvent from "./pages/editEvent";
import MyBookedEvents from "./pages/my-booked-events";
import Ticket from "./pages/printTicket";
import AdminDashboard from "./pages/admindashboard";
import UsersManager from "./pages/admindashboard/allUsers";

function App() {
  const { isAuthenticated ,isLoadingAuth,user } = useSelector((state) => state.auth);

  // // لو لسه بنعرف المستخدم موجود ولا لأ، ما تعملش أي تحويل
  // if (isLoadingAuth) {
  //   return null; // أو صفحة لودينج بسيطة
  // }
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
          path: "/organizer/events/:id",
          element: isAuthenticated ? <EventDetails /> : <Navigate to="/signin" />,
        },
        {
          path: "/organizer/create-event",
          element: isAuthenticated && user?.role === "organizer" ? <CreateEvent /> : <Navigate to="/signin" />,
        },
        {
          path: "/organizer/edit-event/:id",
          element: isAuthenticated && user?.role === "organizer" ? <EditEvent /> : <Navigate to="/signin" />,
        },
        {
          path: "/my-booked-events",
          element: isAuthenticated ? <MyBookedEvents /> : <Navigate to="/signin" />,
        },
        {
          path: "/ticket/:id",
          element: isAuthenticated ? <Ticket /> : <Navigate to="/signin" />,
        },
        // only for admin
        {
          path: "/admin/dashboard",
          element: isAuthenticated && user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/signin" />,
        },
        // only for admin
        {
          path: "/admin/all-users",
          element: isAuthenticated && user?.role === "admin" ? <UsersManager /> : <Navigate to="/signin" />,
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
