//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutPage from "../layouts/LayoutPages";

// Admin Pages
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";

//Pagina de Error
import err404 from "../pages/err404";

// Pages
import Home from "../pages/Home";
import Contacts from "../pages/Contact";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true,
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true,
      },
      {
        path: "/admin/menu",
        component: AdminMenuWeb,
        exact: true,
      },
      {
        component: err404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutPage,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/contact",
        component: Contacts,
        exact: true,
      },
      {
        component: err404,
      },
    ],
  },
];

export default routes;
