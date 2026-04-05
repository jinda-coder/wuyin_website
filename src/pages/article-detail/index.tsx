import "./index.scss"

import { useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { ArticleAPI } from "@/api/endpoint"
import { Loading } from "@/components/loading"
import { formatFullDate, formatRelativeTime } from "@/utils/time"

export const ArticleDetail: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { articleId = "" } = useParams()

    const detailQuery = useQuery({
        queryKey: ["articles", "detail", articleId],
        queryFn: async () => {
            const response = await ArticleAPI.detail(articleId)
            return response.data
        },
        enabled: Boolean(articleId)
    })

    return (
        <div className="article-detail-page">
            {detailQuery.isPending ? (
                <Loading />
            ) : detailQuery.isError || !detailQuery.data ? (
                <section className="detail-state">{articleId ? "文章加载失败，请稍后重试" : "文章不存在"}</section>
            ) : (
                <>
                    <section className="detail-header">
                        <button
                            className="back-btn"
                            type="button"
                            onClick={() => navigate(`/articles${location.search || ""}`)}
                        >
                            返回文章列表
                        </button>
                        <h1 className="detail-title">{detailQuery.data.title}</h1>
                        <div className="detail-meta">
                            <span>{formatFullDate(detailQuery.data.publishedTime)}</span>
                            <span>·</span>
                            <span>{formatRelativeTime(detailQuery.data.publishedTime)}</span>
                            <span className="detail-category">{detailQuery.data.category}</span>
                        </div>
                        <div className="detail-tags">
                            {detailQuery.data.tags.map((tag) => (
                                <span key={tag} className="detail-tag">{tag}</span>
                            ))}
                        </div>
                    </section>

                    <article className="markdown-body">
                        <ReactMarkdown>{detailQuery.data.contentMd || "暂无正文内容。"}</ReactMarkdown>
                    </article>
                </>
            )}
        </div>
    )
}
