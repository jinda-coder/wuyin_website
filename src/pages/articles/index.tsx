import "./index.scss"

import { useMemo } from "react"
import type { ArticleItem } from "@/api/endpoint/articles"
import { ArticleAPI } from "@/api/endpoint"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "@/components/loading"
import { formatFullDate, formatRelativeTime } from "@/utils/time"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

export const Articles: React.FC = () => {
    const DEFAULT_PAGE_SIZE = 6
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    const pageNo = Math.max(1, Number(searchParams.get("pageNo") || 1))
    const pageSize = Math.max(1, Number(searchParams.get("pageSize") || DEFAULT_PAGE_SIZE))
    const keyword = searchParams.get("keyword") || ""
    const activeCategory = searchParams.get("category") || "全部"

    const pageQuery = useQuery({
        queryKey: ["articles", "page", pageNo, pageSize],
        queryFn: async () => {
            const response = await ArticleAPI.page({ pageNo, pageSize })
            return response.data
        }
    })

    const recommandQuery = useQuery({
        queryKey: ["articles", "recommand"],
        queryFn: async () => {
            const response = await ArticleAPI.recommand()
            return response.data ?? []
        }
    })

    const articleList = pageQuery.data?.list ?? []
    const total = pageQuery.data?.total ?? 0

    const categories = [
        "全部",
        ...Array.from(new Set(articleList.map((article) => article.category).filter(Boolean)))
    ]

    const normalizedKeyword = keyword.trim().toLowerCase()
    const filteredList = articleList.filter((article) => {
        const matchCategory = activeCategory === "全部" || article.category === activeCategory
        const matchKeyword = !normalizedKeyword
            || article.title.toLowerCase().includes(normalizedKeyword)
            || article.summary.toLowerCase().includes(normalizedKeyword)
            || article.tags.join(" ").toLowerCase().includes(normalizedKeyword)
        return matchCategory && matchKeyword
    })

    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const rawPageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    ).filter((page) => Math.abs(page - pageNo) <= 2 || page === 1 || page === totalPages)
    const pageItems: Array<number | "ellipsis"> = []
    rawPageNumbers.forEach((page, index) => {
        if (index > 0 && page - rawPageNumbers[index - 1] > 1) {
            pageItems.push("ellipsis")
        }
        pageItems.push(page)
    })

    const gotoPage = (targetPage: number) => {
        if (targetPage < 1 || targetPage > totalPages || targetPage === pageNo) {
            return
        }
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            next.set("pageNo", String(targetPage))
            next.set("pageSize", String(pageSize))
            return next
        })
    }

    const handleKeywordChange = (value: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            const normalized = value.trim()
            if (normalized) {
                next.set("keyword", value)
            } else {
                next.delete("keyword")
            }
            next.set("pageNo", "1")
            next.set("pageSize", String(pageSize))
            return next
        })
    }

    const handleCategoryChange = (category: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            if (category === "全部") {
                next.delete("category")
            } else {
                next.set("category", category)
            }
            next.set("pageNo", "1")
            next.set("pageSize", String(pageSize))
            return next
        })
    }

    const querySuffix = useMemo(
        () => (location.search ? location.search : ""),
        [location.search]
    )

    const handleClickArticle = (articleId: string) => {
        navigate(`/articles/${articleId}${querySuffix}`)
    }

    return (
        <div className="articles-page">
            <section className="articles-hero">
                <p className="hero-subtitle">Article Archive</p>
                <h1 className="hero-title">文章列表</h1>
                <p className="hero-desc">记录自己的知识库笔记、踩过的坑</p>
            </section>

            <section className="articles-toolbar">
                <input
                    className="search-input"
                    type="text"
                    value={keyword}
                    onChange={(event) => handleKeywordChange(event.target.value)}
                    placeholder="搜索标题、摘要或标签..."
                />
                <div className="category-tabs">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`tab-item ${activeCategory === category ? "active" : ""}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {pageQuery.isLoading ? (
                <Loading />
            ): (
                <main className="articles-layout">
                    <section className="articles-main">
                        <div className="list-header">
                            <h2>共 {total} 篇</h2>
                            <span>第 {pageNo} / {totalPages} 页</span>
                        </div>

                        <div className="article-list">
                            {filteredList.length === 0 ? (
                                <div className="state-card">没有匹配结果，试试调整关键词或分类。</div>
                            ) : (
                                filteredList.map((article) => (
                                    <article key={article.articleId} className="article-card" onClick={() => handleClickArticle(article.articleId)}>
                                        <div className="article-meta">
                                            <span>{formatFullDate(article.publishedTime)}</span>
                                            <span>·</span>
                                            <span>{formatRelativeTime(article.publishedTime)}</span>
                                            <span className="category-chip">{article.category}</span>
                                        </div>
                                        <h3 className="article-title">{article.title}</h3>
                                        <p className="article-summary">{article.summary}</p>
                                        <div className="tag-list">
                                            {article.tags.slice(0, 4).map((tag) => (
                                                <span key={tag} className="tag-item">{tag}</span>
                                            ))}
                                        </div>
                                    </article>
                                ))
                            )}
                        </div>

                        <div className="pagination">
                            <button
                                className="page-btn"
                                onClick={() => gotoPage(pageNo - 1)}
                                disabled={pageNo === 1}
                            >
                                上一页
                            </button>
                            <div className="page-number-list">
                                {pageItems.map((page, index) => page === "ellipsis" ? (
                                    <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
                                ) : (
                                    <button
                                        key={page}
                                        className={`page-number ${page === pageNo ? "active" : ""}`}
                                        onClick={() => gotoPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="page-btn"
                                onClick={() => gotoPage(pageNo + 1)}
                                disabled={pageNo === totalPages}
                            >
                                下一页
                            </button>
                        </div>
                    </section>

                    <aside className="articles-aside">
                        <h3 className="aside-title">推荐阅读</h3>
                        <div className="aside-list">
                            {(recommandQuery.data ?? []).slice(0, 5).map((article: ArticleItem, index) => (
                                <article key={article.articleId} className="aside-item" onClick={() => handleClickArticle(article.articleId)}>
                                    <span className="aside-order">0{index + 1}</span>
                                    <div className="aside-content">
                                        <h4>{article.title}</h4>
                                        <p>{formatFullDate(article.publishedTime)}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </aside>
                </main>
            )}
        </div>
    )
}
