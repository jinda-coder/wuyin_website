import "./index.scss"

import { SEO } from "@/components/seo"
import { Link, useNavigate } from "react-router-dom"

export const NotFound: React.FC = () => {
    const navigate = useNavigate()

    return (
        <main className="not-found-page">
            <SEO
                title="页面不存在"
                description="你访问的页面不存在，可以返回首页或继续浏览文章列表。"
                canonicalPath="/404"
                robots="noindex,follow"
            />
            <section className="not-found-card">
                <p className="not-found-code">404</p>
                <h1 className="not-found-title">页面好像迷路了</h1>
                <p className="not-found-desc">
                    你访问的地址不存在，可能已被移动或删除。可以返回首页，或者去文章列表继续逛逛。
                </p>

                <div className="not-found-actions">
                    <button
                        className="action-btn ghost-btn"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        返回上一页
                    </button>
                    <Link to="/" className="action-btn primary-btn">回到首页</Link>
                    <Link to="/articles" className="action-btn link-btn">文章列表</Link>
                </div>
            </section>
        </main>
    )
}
