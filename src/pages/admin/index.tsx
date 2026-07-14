import "./index.scss"
import { useState } from "react"
import { SEO } from "@/components/seo"
import { UploadPanel } from "./components/upload-panel"
import { ArticleList } from "./components/article-list"

type Tab = "upload" | "list"

export const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("upload")

    return (
        <div className="admin-page">
            <SEO
                title="文章管理"
                description="博客文章管理后台"
                canonicalPath="/admin"
                robots="noindex,nofollow"
            />

            <section className="admin-hero">
                <p className="hero-subtitle">Admin Panel</p>
                <h1 className="hero-title">文章管理</h1>
            </section>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === "upload" ? "active" : ""}`}
                    onClick={() => setActiveTab("upload")}
                >
                    上传文章
                </button>
                <button
                    className={`tab-btn ${activeTab === "list" ? "active" : ""}`}
                    onClick={() => setActiveTab("list")}
                >
                    文章列表
                </button>
            </div>

            <div className="admin-content">
                {activeTab === "upload" ? <UploadPanel /> : <ArticleList />}
            </div>
        </div>
    )
}
