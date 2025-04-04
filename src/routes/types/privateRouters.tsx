import { createBrowserRouter } from "react-router-dom"
import { Home } from "../../pages/home"
import { AppLayout } from "../../layout/appLayout"
import Login from "../../components/auth/login"
import { Register } from "../../components/auth/register"

export const router = createBrowserRouter([{
    path: "/",
    element: <AppLayout />,
    children: [
        {
            path: "home",
            element: <Home />
        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "register",
            element: <Register />
        }
    ]
}
])