import "./index.scss";

const techStack = [
    { label: "前端", items: ["Vite", "React", "TypeScript"] },
    { label: "后端", items: ["Rust", "Salvo", "PostgreSQL"] },
];

export const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-build-info">
                    <span className="build-label">构建于</span>
                    <div className="build-stack">
                        {techStack.map((group) => (
                            <span key={group.label} className="build-group">
                                <strong>{group.label}</strong>: {group.items.join(" / ")}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="footer-copyright">
                    © {new Date().getFullYear()} 雾隐 · 用热爱构建每一行代码
                </div>
            </div>
        </footer>
    );
};
