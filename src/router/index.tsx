import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";
import { Articles } from "@/pages/articles";
import { ArticleDetail } from "@/pages/article-detail";
import { Notes } from "@/pages/notes";
import { NotFound } from "@/pages/not-found";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "articles", element: <Articles /> },
            { path: "articles/:articleId", element: <ArticleDetail /> },
            { path: "notes", element: <Notes /> },
            { path: "friends", element: <Articles /> },
            { path: "message", element: <Articles /> },
            { path: "*", element: <NotFound /> }
        ]
    }
])
