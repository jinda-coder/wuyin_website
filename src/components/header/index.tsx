import "./index.scss"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { MusicPlayer } from "../music-player"
import { useEffect, useRef, useState } from "react"
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
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, user, logout } = useAuthStore();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleAvatarClick = () => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            setDropdownOpen(prev => !prev)
        }
    }

    const handleLogout = () => {
        logout()
        setDropdownOpen(false)
        navigate("/")
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
                <div className="avatar-wrapper" ref={dropdownRef}>
                    <div className="avatar" onClick={handleAvatarClick}>
                        {isAuthenticated ? (<img src={user?.avatar} />) : "登录"}
                    </div>
                    {isAuthenticated && dropdownOpen && (
                        <div className="avatar-dropdown">
                            <div className="dropdown-user">{user?.userName}</div>
                            <button className="dropdown-item danger" onClick={handleLogout}>退出登录</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}