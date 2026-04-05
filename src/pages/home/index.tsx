import { Autoplay, Pagination } from "swiper/modules"
import { SwiperSlide, Swiper } from "swiper/react"
import "swiper/swiper.css"
import "./index.scss"
import { ArticleAPI } from "@/api/endpoint"
import { formatRelativeTime, formatShortDate } from "@/utils/time"
import { Loading } from "@/components/loading"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

export const Home: React.FC = () => {

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

    return (
        <div className="home-container">
            {/* 轮播图 */}
            <Swiper className="carousel" modules={[Autoplay, Pagination]} autoplay={{ delay: 2000 }} pagination={{ clickable: true }} loop={true}>
                {/* 网站整体介绍 */}
                <SwiperSlide className="blog-introduction">
                    <h2 className="blog-introduction-title">欢迎来到雾隐的个人Blog</h2>
                    <ul className="blog-introduction-list">
                        <li className="blog-introduction-list-item">该网站是用来锻炼个人全栈能力实践项目</li>
                        <li className="blog-introduction-list-item">完全基于古法编程实现</li>
                        <li className="blog-introduction-list-item">记录学习心得与技术分享</li>
                        <li className="blog-introduction-list-item">持续迭代，追求更好的用户体验</li>
                    </ul>
                </SwiperSlide>
                {/* 网站构建信息 */}
                <SwiperSlide className="tech-stack">
                    <h2 className="tech-title">构建信息</h2>
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
                                <span className="tech-item">Salvo Framework</span>
                                <span className="tech-item">PostgreSQL</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

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
                                <div key={article.articleId} className="article-card">
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
                                <div key={article.articleId} className="article-item">
                                    <span className="item-date">{formatShortDate(article.publishedTime)}</span>
                                    <span className="item-title">{article.title}</span>
                                    <span className="item-tag">{article.tags}</span>
                                </div>
                            )))}
                    </div>
                </section>
            </main>
        </div>
    )
}