import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";
import { Articles } from "@/pages/articles";
import { ArticleDetail } from "@/pages/article-detail";
import { NotFound } from "@/pages/not-found";
import { Friends } from "@/pages/friends";
import { UnderConstruction } from "@/pages/under-construction";
import { GithubLogin } from "@/pages/oauth/github";
import { Login } from "@/pages/login";
import { Admin } from "@/pages/admin";
import { AdminGuard } from "@/components/admin-guard";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "articles", element: <Articles /> },
            { path: "articles/:articleId", element: <ArticleDetail /> },
            { path: "notes", element: <UnderConstruction /> },
            { path: "friends", element: <Friends /> },
            { path: "message", element: <UnderConstruction /> },
            { path: "login", element: <Login /> },
            { path: "login/github/callback", element: <GithubLogin /> },
            { path: "admin", element: <AdminGuard><Admin /></AdminGuard> },
            { path: "*", element: <NotFound /> }
        ]
    }
])

