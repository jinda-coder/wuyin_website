import "./index.scss"


import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../header"
import { Footer } from "../footer"
import { Toast } from "../toast"



export const Layout: React.FC = () => {

    useEffect(() => {
        // 异步加载看板娘，避免进入首屏 bundle
        import("oh-my-live2d").then(({ loadOml2d }) => {
            loadOml2d({
                dockedPosition: "right",
                mobileDisplay: false,
                models: [
                    {
                        path: "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/mai/model.json",
                        scale: 0.35,
                        position: [0, 40],
                        stageStyle: {
                            width: 300,
                            height: 420,
                            bottom: 0,
                            right: 0
                        }
                    }
                ],
                statusBar: {
                    loadingMessage: "看板娘加载中..."
                },
                menus: {
                    items: (defaultItems) => {
                        return defaultItems.map((item, index) =>
                            index === 3 ? { ...item, onClick: () => { } } : item
                        )
                    }
                }
            })
        })
    }, [])

    return (
        <div className="layout-container">
            {/* 头部导航栏 */}
            <Header />
            {/* 全局提示 */}
            <Toast />

            <Outlet />

            <Footer />
        </div>
    )
}