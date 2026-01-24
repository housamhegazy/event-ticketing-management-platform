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
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/signup",
          element: <SignUpForm />,
        },
        {
          path: "/signin",
          element: <SigninForm />,
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
