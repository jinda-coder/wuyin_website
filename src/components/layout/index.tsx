import "./index.scss"


import { Outlet } from "react-router-dom"
import { Header } from "../header"
import { Toast } from "../toast"



export const Layout: React.FC = () => {
    return (
        <div className="layout-container">
            {/* 头部导航栏 */}
            <Header />
            {/* 全局提示 */}
            <Toast />

            <Outlet />
        </div>
    )
}