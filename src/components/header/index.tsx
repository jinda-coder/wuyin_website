import "./index.scss"
import { Link } from "react-router-dom"
import avatar from "@/assets/avatar/avatar.jpg"
import { MusicPlayer } from "../music-player"

export const Header: React.FC = () => {
    return (
        <header className="header-container">
            {/* logo */}
            <div className="logo">
                <Link to="/" className="logo-container">WUYIN DEV</Link>
            </div>
            {/* 导航 */}
            <nav className="nav-menu">
                <Link to="/" className="nav-item active">首页</Link>
                <Link to="/blog" className="nav-item">文章</Link>
                <Link to="/projects" className="nav-item">随笔</Link>
                <Link to="/about" className="nav-item">友链</Link>
                <Link to="/about" className="nav-item">留言</Link>
            </nav>
            {/* music-player + avatar */}
            <div className="header-right">
                <MusicPlayer />
                <div className="avatar">
                    <img src={avatar} alt="avatar" />
                </div>
            </div>
        </header>
    )
}