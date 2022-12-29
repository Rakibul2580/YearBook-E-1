import { createBrowserRouter } from "react-router-dom";
import Main from "../OutLine/Main";
import Home from "../pages/Home/Home";
import SingIn from "../pages/SingIn";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  { path: "/singUp", element: <SingIn /> },
]);
