import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routesConfig";
// import Loader from "components/ui/Loader";

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "../pages/Home"));
const Login = lazy(() =>
  import(/* webpackChunkName: "Login" */ "../pages/Login")
);
const AppLayout = lazy(() =>
  import(/* webpackChunkName: "AppLayout" */ "../components/appLayout")
);

const childRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: routes.login.path,
    element: <Login />
  },
  {
    path: "*",
    element: <h1>No Such Route</h1>,
  },
];

const route = [
  {
    path: "/",
    element: <AppLayout />,
    children: childRoutes,
    errorElement: <h1>Something went wrong; please refresh the page.</h1>,
  },
];
export const router = createBrowserRouter(route, {});
const Routes = () => {
  return (
    <Suspense /* fallback={<Loader />} */ fallback={"Loader"}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default Routes;
