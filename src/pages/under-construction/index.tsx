import "./index.scss";

import { Link, useLocation } from "react-router-dom";

const PAGE_CONFIG: Record<string, { title: string; desc: string }> = {
    "/notes": {
        title: "随笔",
        desc: "这里将会更新生活思考、碎片记录与灵感笔记。"
    },
    "/friends": {
        title: "友链",
        desc: "这里将会上线朋友站点推荐与博主互联入口。"
    },
    "/message": {
        title: "留言",
        desc: "这里将会开放留言板，欢迎你留下建议与反馈。"
    }
};

export const UnderConstruction: React.FC = () => {
    const location = useLocation();
    const currentPage = PAGE_CONFIG[location.pathname] ?? {
        title: "页面",
        desc: "该内容区正在开发中。"
    };

    return (
        <div className="under-construction-page">
            <section className="construction-card">
                <span className="construction-badge">COMING SOON</span>
                <h1 className="construction-title">
                    {currentPage.title}
                    <span> 正在建设中</span>
                </h1>
                <p className="construction-desc">{currentPage.desc}</p>

                <div className="construction-progress">
                    <div className="progress-bar" />
                </div>

                <div className="construction-actions">
                    <Link to="/" className="action-btn ghost">
                        返回首页
                    </Link>
                    <Link to="/articles" className="action-btn primary">
                        去看文章
                    </Link>
                </div>
            </section>
        </div>
    );
};
