import { useThemeStore } from "@/stores/themeStore";
import "./index.scss";

export const ThemeToggle: React.FC = () => {
    const { resolvedMode, toggle } = useThemeStore();

    const isDark = resolvedMode === "dark";

    return (
        <button
            type="button"
            className={`theme-toggle ${isDark ? "dark" : "light"}`}
            onClick={toggle}
            aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
            title={isDark ? "切换到浅色模式" : "切换到深色模式"}
        >
            <span className="theme-toggle-track">
                <span className="theme-toggle-thumb">
                    {isDark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon">
                            <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon">
                            <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2Z" />
                            <path d="M10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15Z" />
                            <path d="M17.25 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Z" />
                            <path d="M5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10Z" />
                            <path d="M15.657 4.343a.75.75 0 0 1 0 1.06l-1.061 1.061a.75.75 0 1 1-1.06-1.06l1.06-1.061a.75.75 0 0 1 1.061 0Z" />
                            <path d="M7.636 12.364a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0Z" />
                            <path d="M15.657 15.657a.75.75 0 0 1-1.06 0l-1.061-1.06a.75.75 0 0 1 1.06-1.061l1.061 1.06a.75.75 0 0 1 0 1.061Z" />
                            <path d="M7.636 7.636a.75.75 0 0 1-1.061 0l-1.06-1.061a.75.75 0 0 1 1.06-1.061l1.061 1.06a.75.75 0 0 1 0 1.061Z" />
                            <path d="M10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                        </svg>
                    )}
                </span>
            </span>
        </button>
    );
};
