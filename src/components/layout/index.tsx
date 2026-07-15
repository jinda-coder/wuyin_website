import "./index.scss"


import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../header"
import { Footer } from "../footer"
import { Toast } from "../toast"
import { ParticleCanvas } from "../particle-canvas"



export const Layout: React.FC = () => {

    useEffect(() => {
        // 异步加载看板娘，避免进入首屏 bundle
        import("oh-my-live2d").then(({ loadOml2d }) => {
            loadOml2d({
                dockedPosition: "right",
                mobileDisplay: false,
                models: [
                    {
                        path: "/live2d/mai/model.json",
                        scale: 0.35,
                        position: [0, 40],
                        stageStyle: {
                            width: 300,
                            height: 420,
                            bottom: 0,
                            right: 0
                        },
                        motionPreloadStrategy: "IDLE"
                    }
                ],
                statusBar: {
                    loadingMessage: "小埋正在赶来的路上..."
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
            <ParticleCanvas />
            {/* 头部导航栏 */}
            <Header />
            {/* 全局提示 */}
            <Toast />

            <Outlet />

            <Footer />
        </div>
    )
}