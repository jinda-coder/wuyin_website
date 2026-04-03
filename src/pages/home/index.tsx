import { Autoplay, Pagination } from "swiper/modules"
import { SwiperSlide, Swiper } from "swiper/react"
import "swiper/swiper.css"
import "./index.scss"
import { useEffect, useState } from "react"
import type { RecommandArticle } from "@/api/endpoint/articles"
import { ArticleAPI } from "@/api/endpoint"
import { formatRelativeTime } from "@/utils/time"

const recentArticles = [
    { id: 1, date: "04-01", title: "Rust 异步编程详解", tag: "Rust" },
    { id: 2, date: "03-28", title: "Vite 插件开发入门", tag: "工具" },
    { id: 3, date: "03-25", title: "React Hooks 最佳实践", tag: "React" },
    { id: 4, date: "03-22", title: "前端工程化思考", tag: "工程化" },
    { id: 5, date: "03-18", title: "Web 性能监控方案", tag: "性能" }
]

export const Home: React.FC = () => {

    const [recommand, setRecommand] = useState<[article: RecommandArticle]>([]);


    useEffect(() => {
        ArticleAPI.recommand().then(res => {
            setRecommand(res.data);
            console.log(res.data);
        })
    }, [])

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
                    <h2 className="section-title">推荐文章</h2>
                    <div className="article-grid">
                        {recommand.map(article => (
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
                </section>

                {/* 最近更新 */}
                <section className="recent-articles">
                    <h2 className="section-title">最近更新</h2>
                    <div className="article-list">
                        {recentArticles.map(article => (
                            <div key={article.id} className="article-item">
                                <span className="item-date">{article.date}</span>
                                <span className="item-title">{article.title}</span>
                                <span className="item-tag">{article.tag}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}