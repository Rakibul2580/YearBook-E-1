import { createBrowserRouter } from "react-router-dom";
import Main from "../OutLine/Main";
import EditProfile from "../pages/EditProfile/EditProfile";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
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
      {
        path: "/editProfile",
        element: <EditProfile />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  { path: "/singUp", element: <SingIn /> },
]);
