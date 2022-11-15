import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import Catalog from "./pages/Catalog";
import Contacts from "./pages/Contacts";
import Device from "./pages/DevicePage";
import Main from "./pages/Main";
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, CATALOG_ROUTE, CONTACTS_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE } from "./utils/constans";




export const authRoutes = 
    {
        path: BASKET_ROUTE,
        Component: Basket
    };

export const adminRoutes =
    {
    path: ADMIN_ROUTE,
    Component: Admin
    };

export const publickRoutes = [
    {
        path: DEVICE_ROUTE + '/:id',
        Component: Device
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    } 
]