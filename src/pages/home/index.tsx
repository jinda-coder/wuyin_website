import "./index.scss"
import avatar from "@/assets/avatar/avatar.jpg"
import { ArticleAPI } from "@/api/endpoint"
import { SEO } from "@/components/seo"
import { formatRelativeTime, formatShortDate } from "@/utils/time"
import { Loading } from "@/components/loading"
import { Link, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

export const Home: React.FC = () => {


    const navigate = useNavigate()

    // 推荐文章
    const recommandQuery = useQuery({
        queryKey: ["recommand"],
        queryFn: async () => {
           return (await ArticleAPI.recommand());
        }
    })

    // 最近更新
    const recentQuery = useQuery({
        queryKey: ["recent"],
        queryFn: async () => {
           return (await ArticleAPI.recent());
        }
    })


    const recommandList = recommandQuery.data?.data ?? [];
    const recentList = recentQuery.data?.data ?? [];


    const handleClick = (articleId: string) => {
        navigate(`/articles/${articleId}`);
    }

    return (
        <div className="home-container">
            <SEO
                title="首页"
                description="雾隐的个人博客首页，持续记录技术学习、项目实践、个人总结与近期更新。"
                canonicalPath="/"
            />

            {/* Hero 区域 */}
            <section className="hero-section">
                <div className="hero-content">
                    <p className="hero-greeting">
                        <span className="hero-wave">👋</span>
                        你好，欢迎来到我的数字花园
                    </p>
                    <h1 className="hero-title">
                        我是 <span className="hero-name">雾隐</span>，
                        <br />
                        一个热爱技术探索的开发者。
                    </h1>
                    <p className="hero-desc">
                        这里记录我的技术学习、项目实践、踩坑复盘与个人思考。
                        我相信持续输出是最好的学习方式，期待与你交流成长。
                    </p>
                    <div className="hero-actions">
                        <Link to="/articles" className="hero-btn primary">浏览文章</Link>
                        <Link to="/about" className="hero-btn secondary">了解更多</Link>
                    </div>
                    <div className="hero-status">
                        <span className="status-dot"></span>
                        <span>正在持续学习与创作中</span>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-avatar">
                        <div className="avatar-ring"></div>
                        <img src={avatar} alt="雾隐头像" />
                    </div>
                </div>
            </section>

            {/* 构建信息 */}
            <section className="hero-tech-stack">
                <h3 className="tech-title">构建信息</h3>
                <div className="tech-grid">
                    <div className="tech-card frontend">
                        <span className="tech-label">前端</span>
                        <div className="tech-items">
                            <span className="tech-item">Vite</span>
                            <span className="tech-item">React</span>
                            <span className="tech-item">TypeScript</span>
                        </div>
                    </div>
                    <div className="tech-card backend">
                        <span className="tech-label">后端</span>
                        <div className="tech-items">
                            <span className="tech-item">Rust</span>
                            <span className="tech-item">Salvo</span>
                            <span className="tech-item">PostgreSQL</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 内容区 */}
            <main className="content-section">
                {/* 推荐文章 */}
                <section className="featured-articles">
                    <div className="section-header">
                        <h2 className="section-title">推荐文章</h2>
                        <Link to="/articles" className="view-more">查看更多 →</Link>
                    </div>
                    {recommandQuery.isLoading ? (<Loading />) : (
                        <div className="article-grid">
                            {recommandList.map(article => (
                                <div key={article.articleId} className="article-card" onClick={() => handleClick(article.articleId)}>
                                    <h3 className="card-title">{article.title}</h3>
                                    <p className="card-desc">{article.summary}</p>
                                    <div className="card-meta">
                                        <span>{formatRelativeTime(article.publishedTime)}</span>
                                        <span>·</span>
                                        <span>{article.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </section>

                {/* 最近更新 */}
                <section className="recent-articles">
                    <h2 className="section-title">最近更新</h2>
                    <div className="article-list">
                        {recentQuery.isLoading ? (
                            <Loading />
                        ) : (
                            recentList.map(article => (
                                <div key={article.articleId} className="article-item" onClick={() => handleClick(article.articleId)}>
                                    <span className="item-date">{formatShortDate(article.publishedTime)}</span>
                                    <span className="item-title">{article.title}</span>
                                    <div className="item-tags">
                                        {article.tags.map((tag) => (
                                            <span key={`${article.articleId}-${tag}`} className="item-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )))}
                    </div>
                </section>
            </main>
        </div>
    )
}
