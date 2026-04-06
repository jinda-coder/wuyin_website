import "./index.scss"
import "highlight.js/styles/atom-one-dark.css"

import { isValidElement, useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import { ArticleAPI } from "@/api/endpoint"
import { Loading } from "@/components/loading"
import { formatFullDate, formatRelativeTime } from "@/utils/time"

export const ArticleDetail: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { articleId = "" } = useParams()
    const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null)
    const copiedTimerRef = useRef<number | null>(null)

    const handleCopyCode = useCallback(async (codeId: string, codeText: string) => {
        try {
            await navigator.clipboard.writeText(codeText)
            setCopiedCodeId(codeId)
            if (copiedTimerRef.current) {
                window.clearTimeout(copiedTimerRef.current)
            }
            copiedTimerRef.current = window.setTimeout(() => setCopiedCodeId(null), 1600)
        } catch (error) {
            console.error("copy code failed", error)
        }
    }, [])

    useEffect(() => {
        return () => {
            if (copiedTimerRef.current) {
                window.clearTimeout(copiedTimerRef.current)
            }
        }
    }, [])

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
                        <ReactMarkdown
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                pre: ({ children, ...props }) => {
                                    const codeNode = Array.isArray(children) ? children[0] : children
                                    if (!isValidElement<{ className?: string; children?: React.ReactNode }>(codeNode)) {
                                        return <pre {...props}>{children}</pre>
                                    }

                                    const className = codeNode.props.className ?? ""
                                    const languageMatch = /language-([\w-]+)/.exec(className)
                                    const language = languageMatch?.[1] ?? "text"
                                    const codeText = String(codeNode.props.children ?? "").replace(/\n$/, "")
                                    const codeId = `${language}:${codeText.slice(0, 36)}`
                                    const isCopied = copiedCodeId === codeId

                                    return (
                                        <div className="code-block">
                                            <div className="code-block-toolbar">
                                                <span className="code-lang">{language}</span>
                                                <button
                                                    type="button"
                                                    className="code-copy-btn"
                                                    onClick={() => handleCopyCode(codeId, codeText)}
                                                >
                                                    {isCopied ? "已复制" : "复制代码"}
                                                </button>
                                            </div>
                                            <pre {...props}>{children}</pre>
                                        </div>
                                    )
                                }
                            }}
                        >
                            {detailQuery.data.contentMd || "暂无正文内容。"}
                        </ReactMarkdown>
                    </article>
                </>
            )}
        </div>
    )
}
