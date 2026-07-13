import "./index.scss"
import { Link, useLocation, useNavigate } from "react-router-dom"
import avatar from "@/assets/avatar/avatar.jpg"
import { MusicPlayer } from "../music-player"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/authStore"

const navItems = [
    { path: "/", label: "首页" },
    { path: "/articles", label: "文章" },
    { path: "/notes", label: "随笔" },
    { path: "/friends", label: "友链" },
    { path: "/message", label: "留言" },
];

export const Header: React.FC = () => {

    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // 用户登录认证态
    const { isAuthenticated } = useAuthStore();

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
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
                    >
                        {item.label}
                    </Link>
                ))}
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