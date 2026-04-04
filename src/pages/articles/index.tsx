import "./index.scss"

import { useEffect, useState } from "react"
import type { ArticleItem } from "@/api/endpoint/articles"
import { ArticleAPI } from "@/api/endpoint"
import { Loading } from "@/components/loading"
import { formatFullDate, formatRelativeTime } from "@/utils/time"

export const Articles: React.FC = () => {
    const DEFAULT_PAGE_SIZE = 6
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [keyword, setKeyword] = useState("")
    const [activeCategory, setActiveCategory] = useState("全部")
    const [articleList, setArticleList] = useState<ArticleItem[]>([])
    const [recommandList, setRecommandList] = useState<ArticleItem[]>([])
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        ArticleAPI.recommand()
            .then((res) => {
                setRecommandList(res.data ?? [])
            })
            .catch(() => {
                setRecommandList([])
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        ArticleAPI.page({ pageNo, pageSize })
            .then((res) => {
                const pageData = res.data
                setArticleList(pageData?.list ?? [])
                setTotal(pageData?.total ?? 0)
                setPageSize(pageData?.pageSize ?? DEFAULT_PAGE_SIZE)
                setError("")
            })
            .catch(() => {
                setError("文章加载失败，请稍后重试")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [pageNo, pageSize])

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
        setPageNo(targetPage)
    }

    return (
        <div className="articles-page">
            <section className="articles-hero">
                <p className="hero-subtitle">Article Archive</p>
                <h1 className="hero-title">文章列表</h1>
                <p className="hero-desc">按主题筛选，快速定位想看的内容。</p>
            </section>

            <section className="articles-toolbar">
                <input
                    className="search-input"
                    type="text"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="搜索标题、摘要或标签..."
                />
                <div className="category-tabs">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`tab-item ${activeCategory === category ? "active" : ""}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {loading ? (
                <Loading />
            ) : error ? (
                <section className="state-card">{error}</section>
            ) : (
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
                                    <article key={article.articleId} className="article-card">
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
                            {recommandList.slice(0, 5).map((article, index) => (
                                <article key={article.articleId} className="aside-item">
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
