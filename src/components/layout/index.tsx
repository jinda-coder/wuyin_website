import "./index.scss"


import { Outlet } from "react-router-dom"
import { Header } from "../header"



export const Layout: React.FC = () => {
    return (
        <div className="layout-container">
            {/* 头部导航栏 */}
            <Header />

            <Outlet />
        </div>
    )
}