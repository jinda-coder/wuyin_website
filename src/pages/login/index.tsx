import "./index.scss"
import { useAuthStore } from "@/stores/authStore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// GitHub SVG 图标
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
)

export const Login: React.FC = () => {
    const navigate = useNavigate()
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    // 已登录则跳转首页
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate])

    const handleGithubLogin = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://127.0.0.1:5173/login/github/callback&prompt=consent&scope=user`
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="github-logo">
                        <GitHubIcon />
                    </div>
                    <h2 className="login-title">欢迎来到 WUYIN DEV</h2>
                    <p className="login-subtitle">登录后可以评论文章、参与互动</p>
                </div>

                <button className="github-login-btn" onClick={handleGithubLogin}>
                    <GitHubIcon />
                    <span>使用 GitHub 登录</span>
                </button>

                <div className="login-divider">
                    <span>其他方式</span>
                </div>
                <p className="login-other">暂不支持其他登录方式</p>
            </div>
        </div>
    )
}
