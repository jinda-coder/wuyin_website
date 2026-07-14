import "./index.scss"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { AdminAPI } from "@/api/endpoint"
import { Loading } from "@/components/loading"
import { formatFullDate } from "@/utils/time"

type StatusFilter = "all" | "published" | "draft"

const STATUS_TABS: { label: string; value: StatusFilter }[] = [
    { label: "全部", value: "all" },
    { label: "已发布", value: "published" },
    { label: "草稿", value: "draft" },
]

const PAGE_SIZE = 10

export const ArticleList: React.FC = () => {
    const [status, setStatus] = useState<StatusFilter>("all")
    const [pageNo, setPageNo] = useState(1)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin", "articles", status, pageNo],
        queryFn: async () => {
            const resp = await AdminAPI.listAdminArticles({ pageNo, pageSize: PAGE_SIZE, status })
            return resp.data
        },
    })

    const articles = data?.list ?? []
    const total = data?.total ?? 0
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

    const handleTabChange = (value: StatusFilter) => {
        setStatus(value)
        setPageNo(1)
    }

    return (
        <div className="article-list-panel">
            <div className="status-tabs">
                {STATUS_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        className={`status-tab ${status === tab.value ? "active" : ""}`}
                        onClick={() => handleTabChange(tab.value)}
                    >
                        {tab.label}
                    </button>
                ))}
                <span className="total-count">共 {total} 篇</span>
            </div>

            {isLoading ? (
                <Loading />
            ) : articles.length === 0 ? (
                <div className="empty-state">暂无文章</div>
            ) : (
                <div className="admin-article-table">
                    <div className="table-header">
                        <span className="col-title">标题</span>
                        <span className="col-status">状态</span>
                        <span className="col-category">分类</span>
                        <span className="col-tags">标签</span>
                        <span className="col-time">更新时间</span>
                    </div>
                    {articles.map((article) => (
                        <div key={article.articleId} className="table-row">
                            <span className="col-title" title={article.title}>{article.title}</span>
                            <span className="col-status">
                                <span className={`status-badge ${article.status}`}>
                                    {article.status === "published" ? "已发布" : "草稿"}
                                </span>
                            </span>
                            <span className="col-category">{article.category || "—"}</span>
                            <span className="col-tags">
                                {article.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="tag-chip">{tag}</span>
                                ))}
                            </span>
                            <span className="col-time">{formatFullDate(article.updateTime)}</span>
                        </div>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="list-pagination">
                    <button
                        className="page-btn"
                        onClick={() => setPageNo((p) => p - 1)}
                        disabled={pageNo === 1}
                    >
                        上一页
                    </button>
                    <span className="page-info">{pageNo} / {totalPages}</span>
                    <button
                        className="page-btn"
                        onClick={() => setPageNo((p) => p + 1)}
                        disabled={pageNo === totalPages}
                    >
                        下一页
                    </button>
                </div>
            )}
        </div>
    )
}
