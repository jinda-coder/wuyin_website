import "./index.scss"
import { Link, useNavigate } from "react-router-dom"
import avatar from "@/assets/avatar/avatar.jpg"
import { MusicPlayer } from "../music-player"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/authStore"

export const Header: React.FC = () => {

    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    // 用户登录认证态
    const { user, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    const handleAvatarClick = () => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }


    return (
        <header className={`header-container ${scrolled ? "scrolled" : ""}`}>
            {/* logo */}
            <div className="logo">
                <Link to="/" className="logo-container">WUYIN DEV</Link>
            </div>
            {/* 导航 */}
            <nav className="nav-menu">
                <Link to="/" className="nav-item active">首页</Link>
                <Link to="/articles" className="nav-item">文章</Link>
                <Link to="/notes" className="nav-item">随笔</Link>
                <Link to="/friends" className="nav-item">友链</Link>
                <Link to="/message" className="nav-item">留言</Link>
            </nav>
            {/* music-player + avatar */}
            <div className="header-right">
                <MusicPlayer />
                <div className="avatar" onClick={handleAvatarClick}>
                    {isAuthenticated ? (<img src={avatar} />) : "登录"}
                </div>
            </div>
        </header>
    )
}