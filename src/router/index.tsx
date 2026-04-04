import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";
import { Articles } from "@/pages/articles";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "articles", element: <Articles /> },
            { path: "articles/:articleId", element: <Articles /> }
            // { path: "notes", element: <Articles />}
            { path: "friends", element: <Articles /> },
            { path: "message", element: <Articles /> }
        ]
    }
])