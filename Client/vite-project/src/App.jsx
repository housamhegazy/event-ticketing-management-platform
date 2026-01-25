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
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
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
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
