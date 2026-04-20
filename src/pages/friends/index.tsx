import "./index.scss"
import { FriendsAPI } from "@/api/endpoint"
import { Loading } from "@/components/loading"
import { useQuery } from "@tanstack/react-query"

export const Friends: React.FC = () => {
    const friendsQuery = useQuery({
        queryKey: ["friends"],
        queryFn: async () => {
            return (await FriendsAPI.list());
        }
    })

    const friendsList = friendsQuery.data?.data ?? [];

    // 默认头像 - 使用 SVG 数据 URI
    const defaultAvatar = `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="#e0e7ff"/>
            <text x="50" y="55" text-anchor="middle" font-size="40" fill="#6366f1">友</text>
        </svg>
    `)}`;

    return (
        <div className="friends-container">
            {/* 页面头部 */}
            <header className="friends-header">
                <h1 className="page-title">友情链接</h1>
                <p className="page-subtitle">与志同道合的朋友一起，共同成长</p>
            </header>

            {/* 友链列表 */}
            <main className="friends-content">
                {friendsQuery.isLoading ? (
                    <Loading />
                ) : friendsList.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">🔗</span>
                        <p>暂无友链数据</p>
                    </div>
                ) : (
                    <div className="friends-grid">
                        {friendsList.map((friend) => (
                            <a
                                key={friend.id}
                                href={friend.websiteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="friend-card"
                            >
                                <div className="card-avatar">
                                    <img
                                        src={friend.iconUrl || defaultAvatar}
                                        alt={friend.websiteName}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = defaultAvatar;
                                        }}
                                    />
                                </div>
                                <div className="card-content">
                                    <h3 className="card-name">{friend.websiteName}</h3>
                                    <p className="card-author">
                                        <span className="author-label">作者：</span>
                                        {friend.author}
                                    </p>
                                    <p className="card-intro">{friend.websiteIntroduction}</p>
                                </div>
                                <div className="card-link">
                                    <span className="link-icon">→</span>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
